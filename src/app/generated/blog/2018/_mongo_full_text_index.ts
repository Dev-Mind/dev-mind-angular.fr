export const _mongo_full_text_index:string = `<div class="sect1">
<h2 id="_recherche_fulltext">Recherche fulltext</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Une recherche fulltext essaye de rechercher un ou plusieurs mots clés dans un ensemble de documents. J&#8217;emploie le terme "essaye" car l&#8217;opération n&#8217;est pas toujours facile. Une recherche fulltext est similaire aux recherches que vous pouvez lancer sur un moteur de recherche tel que Google ou Qwant. Nous pouvons avoir des ambiguïtés dans les résultats. Par exemple si vous cherchez le mot <code><em>serveur</em></code>, il peut désigner une machine pour un informaticien et un employé de restaurant pour le commun des mortels.</p>
</div>
<div class="paragraph">
<p>Les recherches full text se distinguent des recherches classiques pour essayer de limiter ces ambiguïtés.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>En fonction des languages certains mots de liaison sont très fréquents et non pertinents dans une recherche. Ils sont tout simplement filtrés. En français nous pouvons avoir (le, la, un, une&#8230;&#8203;).</p>
</li>
<li>
<p>Une recherche ne doit pas être sensible à la casse. Un utilisateur qui tape <em>@backtick@Cheval@backtick@</em>, <em>@backtick@CHEVAL@backtick@</em> ou <em>@backtick@cheval@backtick@</em> devra avoir les mêmes résultats</p>
</li>
<li>
<p>La recherche peut être vaste il est important d&#8217;avoir un système de scoring qui permet de noter les résultats selon la pertinence.</p>
</li>
<li>
<p>L&#8217;utilisateur peut être plus ou moins précis quand il tape un mot clé : utilisation ou non d&#8217;un accent, singulier/plueriel, faute d&#8217;orthographe, utilisation d&#8217;un verbe conjugué. Le stemmming permet de réduire les mots à leur racine et de répondre à ce besoin</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Aujourd&#8217;hui la plupart des bases de données du marché propose des réponses à ce besoin. Certes les résultats ne sont pas toujours aussi bon que lorsque vous utilisez des vrais moteurs d&#8217;indexation et de recherche comme Lucene et Elastic, mais ils sont une solution à moindre coût car vous n&#8217;avez qu&#8217;à utiliser des fonctionnalités de votre base de données existantes.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_comment_faire">Comment faire ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Si vous voulez faire des recherches pertinentes sur un grand nombre de documents, des solutions comme <a href="https://www.elastic.co/">Elastic Search</a> ou <a href="http://lucene.apache.org/solr/">Solr</a> sont certainement les plus pertinentes. Mais ces solutions introduisent de la complexité (notamment sur votre architecture applicative).</p>
</div>
<div class="paragraph">
<p>L&#8217;autre solution est d&#8217;utiliser les fonctionnalités offertes par votre solution de base de données. Les résultats seront peut être moins bon ou plus long, mais vous pouvez ainsi répondre à un besoin de recherche fulltext rapidement en utilisant votre infrastructure en place. Cette solution <em>naïve</em> peut être un bon point de départ avant de faire plus compliqué.</p>
</div>
<div class="paragraph">
<p>Il est temps de prendre un exemple concret. Pour celà je vais me baser sur du code Kotlin et une base de données MongoDb. Comme je participe au développement du site de la conférence MiXiT, notre use case est tout trouver : rechercher des mots clés dans le descriptif des conférences ou dans les bios des speakers&#8230;&#8203;. Le code est Open Source est est disponible sous <a href="https://github.com/mixitconf/mixit">Github</a>.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/mongo_full_text_index_00.png" alt="Recherche full text avec MongoDB">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_mongodb">MongoDB</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Dans le cadre du site MiXiT, nous avons choisi MongoDB pour plusieurs raisons. MongoDB</p>
</div>
<div class="ulist">
<ul>
<li>
<p>est une bases de données NoSQL reconnue, offrant de bonnes performances, souple niveau schéma et offrant des capacités d&#8217;indexation.</p>
</li>
<li>
<p>propose un driver Java non bloquant permettant dand notre cas d&#8217;avoir une application réactive non bloquante du client jusqu&#8217;à la base de données. Ce n&#8217;est pas le sujet de cet artile mais nous avons utilisé le nouveau framework <a href="https://docs.spring.io/spring/docs/5.0.4.RELEASE/spring-framework-reference/web-reactive.html#spring-webflux">WebFlux</a> de Spring.</p>
</li>
<li>
<p>permet de lancer des recherches full text depuis la version 2.4.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Nous allons nous focaliser sur cette dernière fonctionnalité. Pour la recherche fulltext, MongoDB</p>
</div>
<div class="ulist">
<ul>
<li>
<p>permet d&#8217;indexer différents champs en vous laissant la possibilité de définir des poids (weighting) qui seront utilisés pour calculer un score pour les résultats retournés</p>
</li>
<li>
<p>supporte différents langages comme français, anglais, allemand, espagnol&#8230;&#8203;</p>
</li>
<li>
<p>permet d&#8217;utiliser des requêtes avancées similaires à ce que vous pouvez faire dans google. Par exemple <em>+chat</em> <em>-cheval</em> cherchera les champs qui contiennent chat et non cheval.</p>
</li>
<li>
<p>implémente le stemming (voir le premier paragraphe) pour être souple dans les recherches</p>
</li>
<li>
<p>supprime les mots fréquents du langage (Stop words).</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>La commande ci dessous, permet de créer un index sur la collection <em>conference</em> sur le champ <em>description</em></p>
</div>
<div class="literalblock">
<div class="content">
<pre>db.conferences.createIndex( { description: "text" } )</pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez définir plusieurs champs et des poids. Les poids sont utilisés pour classer par pertinence les résultats. Pour chaque champ indexé MongoDB applique un poids par défaut de 1. Le score est la somme des points d&#8217;un document.</p>
</div>
<div class="literalblock">
<div class="content">
<pre>db.blog.createIndex(
   {
     content: "text",
     keywords: "text",
     about: "text"
   },
   {
     weights: {
       content: 10,
       keywords: 5
     }
   }
 )</pre>
</div>
</div>
<div class="paragraph">
<p>Pour plus d&#8217;information sur les possibilités offertes par MongoDB sur l&#8217;indexation, je vous laisse vous reporter à la <a href="https://docs.mongodb.com/manual/core/index-text/">documentation officielle</a>. Nous allons voir maintenant comment gérer l&#8217;interaction dans notre code Java ou Kotlin. Le tout via le framework Spring.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_utiliser_spring_data_mongo">Utiliser Spring Data Mongo</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Le projet <a href="https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/">Spring Data MongoDB</a> permet de simplifier les interactions entre votre base de données MongoDB et votre application Spring.</p>
</div>
<div class="paragraph">
<p>Commençons par ajouter les dépendances dans le script de configuration Gradle. Nous ajoutons des dépendances pour utiliser SpringBoot, WebFlux, SpringData pour Mongo et MongoDb</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450930.9092">compile(<span class="hljs-string">&quot;org.springframework.boot:spring-boot-starter-webflux&quot;</span>)
compile(<span class="hljs-string">&quot;org.springframework.boot:spring-boot-starter-data-mongodb-reactive&quot;</span>)
runtime(<span class="hljs-string">&quot;de.flapdoodle.embed:de.flapdoodle.embed.mongo&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450930.9092')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Comme vous pouvez le voir nous avons fait le choix en développement d&#8217;utiliser <code><em>de.flapdoodle.embed.mongo</em></code> qui est une base de données embarquée. Cette solution vous évite de devoir installer une base de données avant de faire des tests. Comme nous utilisons Spring Boot, vous n&#8217;avez pas plus de paramètres à donner. En effet la classe <code><em>org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration</em></code> va automatiquement configurer la base de données en appliquant les conventions de base.</p>
</div>
<div class="paragraph">
<p>Vous pouvez maintenant définir un document MongoDb (équivalent d&#8217;une table si nous devions faire un parallèle avec une base de données relationnelles classique)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912450930.372"><span class="hljs-meta">@Document</span>
<span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Talk</span>(
        <span class="hljs-keyword">val</span> format: TalkFormat,
        <span class="hljs-meta">@TextIndexed(weight = 10F)</span> <span class="hljs-keyword">val</span> title: String,
        <span class="hljs-meta">@TextIndexed(weight = 5F)</span> <span class="hljs-keyword">val</span> summary: String,
        <span class="hljs-keyword">val</span> speakerIds: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTString@</span>GT = emptyList(),
        <span class="hljs-keyword">val</span> language: Language = Language.FRENCH,
        <span class="hljs-meta">@TextIndexed</span> <span class="hljs-keyword">val</span> description: String? = <span class="hljs-literal">null</span>,
        <span class="hljs-keyword">val</span> start: LocalDateTime? = <span class="hljs-literal">null</span>,
        <span class="hljs-keyword">val</span> end: LocalDateTime? = <span class="hljs-literal">null</span>,
        <span class="hljs-meta">@Id</span> <span class="hljs-keyword">val</span> id: String? = <span class="hljs-literal">null</span>
)</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450930.372')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>L&#8217;annotation <code><em>@TextIndexed</em></code> permet de définir les champs qui devront être indexés par MongoDB. Vous pouvez préciser un poids à chaque champ. Dans cet exemple, je donne plus de poids quand le texte recherché est trouvé dans le titre d&#8217;une session.</p>
</div>
<div class="paragraph">
<p>Il ne reste plus qu&#8217;à lancer une requête fullText via MongoDB. Spring Data propose une abstraction pour lancer des requêtes</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912450931.5168"><span class="hljs-meta">@Repository</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">TalkRepository</span>(<span class="hljs-keyword">private</span> <span class="hljs-keyword">val</span> template: ReactiveMongoTemplate) {

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findOne</span><span class="hljs-params">(id: <span class="hljs-type">String</span>)</span></span> = template.<span class="hljs-symbol">findById@</span><span class="hljs-symbol">LTTalk@</span>GT(id)

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findFullText</span><span class="hljs-params">(criteria: <span class="hljs-type">List</span>@<span class="hljs-type">LTString</span>@<span class="hljs-type">GT</span>)</span></span>: <span class="hljs-symbol">Flux@</span><span class="hljs-symbol">LTTalk@</span>GT {
        <span class="hljs-keyword">val</span> textCriteria = TextCriteria()
        criteria.forEach { textCriteria.matching(it) }

        <span class="hljs-keyword">val</span> query = TextQuery(textCriteria).sortByScore()
        <span class="hljs-keyword">return</span> template.find(query)
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450931.5168')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>En quelques lignes nous venons de voir comment lancer une recherche fullText dans une applicaton Spring Boot Kotlin. Le code en Java est très similaire de ce qui a été montré ici.</p>
</div>
</div>
</div>`;