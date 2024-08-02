export const _springboot_kotlin:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Je vais vous parler aujourd’hui du langage Kotlin qui est sorti dans sa version 1.0 depuis février 2016.</p>
</div>
<div class="paragraph">
<p>Kotlin est un langage de programmation créé par JetBrains qui compile le code en bytecode afin d’être exécuté sur une machine virtuelle Java. JetBrains l’a créé pour développer plus efficacement ses différents produits (IntelliJ, Webstorm…)</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/springkotlin_00.png" alt="Spring Kotlin">
</div>
</div>
<div class="paragraph">
<p>Je profite ici de l’intervention de <a href="https://twitter.com/sdeleuze">Sébastien Deleuze</a> (Pivotal) à la première session du <a href="https://twitter.com/KotlinLyon">Lyon Kotlin user groupe</a> pour parler de Kotlin dans le monde Spring.</p>
</div>
<div class="paragraph">
<p>Si vous êtes intéressé voici les supports proposés par Sébastien</p>
</div>
<div class="ulist">
<ul>
<li>
<p>les <a href="https://speakerdeck.com/sdeleuze/developing-a-geospatial-webservice-with-spring-boot-and-kotlin">slides</a> de sa session</p>
</li>
<li>
<p>son <a href="https://github.com/sdeleuze/geospatial-messenger">projet exemple</a></p>
</li>
<li>
<p>le <a href="https://github.com/sdeleuze/spring-kotlin">repository Github</a> où Spring met à disposition les extensions qui permettent de simplifier les interactions entre Spring et Kotlin</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Comme j’aime bien aussi expérimenté par moi même voici un POC assez simple mettant en oeuvre ce qui est dit dans cet article.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_présentation_du_langage">Présentation du langage</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Je vais rapidement énumérer les intérêts du langage mais pour un avis plus pertinent que le mien je vous conseille de lire l’ <a href="http://blog.ninja-squad.com/2016/05/31/first-kotlin-project/">article de Jean Baptiste Nizet</a>.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>moins verbeux que le langage Java tout en étant presque aussi performant. Le code est compilé en bytecode et profite donc des optimisations de la JVM au Runtime</p>
</li>
<li>
<p>langage fortement typé mais assez intelligent pour exploiter un maximum l’inférence de type et ne pas vous demander de saisir le type quand il est capable de le trouver tout seul</p>
</li>
<li>
<p>la définition de DTO est hyper simple</p>
</li>
<li>
<p>Null safety. Par défaut aucune valeur ne peut être nulle et le compilateur génère une exception quand une valeur nulle n’est pas gérer. Vous devez explicitement définir le comportement quand une valeur peut être nulle.</p>
</li>
<li>
<p>Kotlin propose les extensions de méthodes qui s’avère très pratique pour étendre le comportement des classes existantes même si elles sont fournies par un framework externe.</p>
</li>
<li>
<p>Vous pouvez vous passer des points virgule mais personnellement ce n’est pas la fonctionnalité qui me fait triper</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>D’après un sondage effectué sur le <a href="https://kotlinlang.slack.com/">Slack</a> de la team Kotlin, les développeurs utilisent en majorité Kotlin pour simplifier le développement des applications Android.</p>
</div>
<div class="paragraph">
<p>J’ai beaucoup apprécié la comparaison faite par Sébastien avec d’autres langages</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Kotlin apporte la même concision que Groovy mais les types statiques et le null safety est un gros plus</p>
</li>
<li>
<p>Par rapport à Scala qui est un langage peut être plus à destination de la recherche ou des uses cases scientifiques (big data…), Kotlin fait pratiquement aussi bien mais avec beaucoup moins de fonctionnalités ("Some people say Kotlin has 80% the power of Scala, with 20% of the features")</p>
</li>
<li>
<p>Swift se rapproche grandement de Kotlin sauf que la cible n’est pas la JVM mais plutôt une compilation en langage machine via LLVM</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_démarrer_un_projet_spring">Démarrer un projet Spring</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Regardons comment démarrer un projet Spring. Il est bon de noter que Kotlin fait partie des 3 langages supportés par Spring (avec Java et Groovy). J’ai lancé ici le wizard dans IntelliJ mais vous pouvez faire exactement la même chose sur <a href="http://start.spring.io/#!language=kotlin" class="bare">http://start.spring.io/#!language=kotlin</a></p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/springkotlin_01.png" alt="Démarrer un projet Spring Kotlin">
</div>
</div>
<div class="paragraph">
<p>Votre premier projet est initialisé. Nous allons créer une API REST qui permet de renvoyer le nom de société et leurs employés. Au niveau IDE j&#8217;ai utilisé IntelliJ.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_des_pojos_enfin_lisibles">Des POJOs enfin lisibles</h2>
<div class="sectionbody">
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604314798.6086"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Company</span>(
        <span class="hljs-keyword">var</span> name: String,
        <span class="hljs-keyword">var</span> id: Int? = <span class="hljs-literal">null</span>,
        <span class="hljs-keyword">var</span> workers : MutableList<span class="hljs-meta">@LTWorker</span><span class="hljs-meta">@GT</span> = mutableListOf()
)</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314798.6086')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Par défaut vous n’avez pas besoin de définir de constructeurs, de getter et de setter . Il est intéressant de souligner que le type <code><em>List</em></code> par défaut est non mutable et que vous devez utiliser <code><em>MutableList</em></code> si votre liste doit être mutable.</p>
</div>
<div class="paragraph">
<p>Si vous avez besoin que la classe mette à disposition les méthodes <code><em>hascode</em></code> et <code><em>equals</em></code> vous aller définir une <code><em>data class</em></code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604314799.2542">data <span class="hljs-keyword">class</span> <span class="hljs-title class_">Worker</span>(
        <span class="hljs-keyword">var</span> firstname: String,
        <span class="hljs-keyword">var</span> lastname: String,
        <span class="hljs-keyword">var</span> company: Company,
        <span class="hljs-keyword">var</span> id: Int? = <span class="hljs-literal">null</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314799.2542')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Notez le « ? » qui permet d’indiquer qu’une valeur peut être nulle. L’avantage de l’initialiser à null est que Kotlin mettra à disposition 2 constructeurs : un avec tous les champs obligatoires et l’autre avec l’ensemble des champs</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604314799.366"><span class="hljs-type">val</span> <span class="hljs-variable">guillaume</span> <span class="hljs-operator">=</span> Worker(<span class="hljs-string">&quot;Guillaume&quot;</span>, <span class="hljs-string">&quot;EHRET&quot;</span>)
<span class="hljs-type">val</span> <span class="hljs-variable">guillaume</span> <span class="hljs-operator">=</span> Worker(<span class="hljs-string">&quot;Guillaume&quot;</span>, <span class="hljs-string">&quot;EHRET&quot;</span>, Company(<span class="hljs-string">&quot;Dev-Mind&quot;</span>))</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314799.366')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_mise_en_place_dun_service_rest">Mise en place d’un service REST</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Nous allons essayer d’exposer un service REST qui expose la liste des travailleurs. Avant de commencer il est important de se pencher sur une spécificité du langage Kotlin. Toutes les classes par défaut sont définies comme final et ne peuvent donc pas être étendues. Si vous ne voulez pas qu’elles soient final vous devez explicitement déclarer des classes préfixées par le mot clé open.</p>
</div>
<div class="paragraph">
<p>Cette spécificité engendre pas mal de souci quand vous voulez utiliser des proxy (ce que Spring fait beaucoup). Quand vous ajoutez des interfaces à vos classes, Spring utilise les proxies fournis par le langage Java et ne rencontre pas de problème. Pour toutes les autres classes, Spring utilise Cglib pour créer des proxies et si la classe n’est pas open, la magie Spring ne pourra pas opérer.</p>
</div>
<div class="paragraph">
<p>Pivotal et JetBrains sont en discussion pour simplifier ces limitations et aider le travail des frameworks. Voici comment déclarer votre application SpringBoot</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604314800.535"><span class="hljs-meta">@SpringBootApplication</span><span class="hljs-meta">@EnableTransactionManagement</span>
open <span class="hljs-keyword">class</span> <span class="hljs-title class_">DevmindKotlinApplication</span>{
    <span class="hljs-meta">@Bean</span>
    open fun <span class="hljs-title function_">transactionManager</span><span class="hljs-params">(dataSource: DataSource)</span> = SpringTransactionManager(dataSource)
}

fun <span class="hljs-title function_">main</span><span class="hljs-params">(args: Array<span class="hljs-meta">@LTString</span><span class="hljs-meta">@GT</span>)</span> {
    SpringApplication.run(DevmindKotlinApplication::class.java, *args)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314800.535')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Au niveau du service REST voici un exemple qui montre encore le gain au niveau lisibilité du code</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604314801.685"><span class="hljs-meta">@RestController</span><span class="hljs-meta">@RequestMapping(&quot;/companies&quot;)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">CompanyController</span>(val companyRepository: CompanyRepository){

    <span class="hljs-meta">@GetMapping</span>    fun <span class="hljs-title function_">list</span><span class="hljs-params">()</span> = companyRepository.findAll();

    <span class="hljs-meta">@GetMapping(&quot;/{id}&quot;)</span>
    fun <span class="hljs-title function_">findById</span><span class="hljs-params">(<span class="hljs-meta">@PathVariable</span> id: Int)</span> = companyRepository.findById(id);

    <span class="hljs-meta">@PostMapping</span>    fun <span class="hljs-title function_">create</span><span class="hljs-params">(<span class="hljs-meta">@RequestBody</span> company: Company)</span> = companyRepository.create(company)

    <span class="hljs-meta">@PutMapping(&quot;/{id}&quot;)</span>
    fun <span class="hljs-title function_">update</span><span class="hljs-params">(<span class="hljs-meta">@PathVariable</span> id: Int, <span class="hljs-meta">@RequestBody</span> company: Company)</span> = companyRepository.update(id, company);
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314801.685')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Notez ici que les types de retour ne sont pas forcément déclarés mais déduits des appels des méthodes du Repository.</p>
</div>
<div class="paragraph">
<p>Vous n’avez plus besoin depuis Spring 4.3 de déclarer un @Autowired quand vous faites une injection par constructeur. Dans notre cas le workerRepository est directement injecté par Spring à la création de la classe.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_les_arguments_par_défaut">Les arguments par défaut</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Je n’ai pas encore parlé d’une fonctionnalité importante du langage. Vous pouvez définir des valeurs par défaut et utiliser des paramètres nommés lors de l’appel</p>
</div>
<div class="paragraph">
<p>Si je déclare la fonction suivante</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722604314809.75"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">formatDate</span><span class="hljs-params">(string: <span class="hljs-type">Date</span>, format: <span class="hljs-type">String</span> = <span class="hljs-string">&quot;yyyy-MM-dd&quot;</span>, addDay: <span class="hljs-type">Int</span> =<span class="hljs-number">0</span>)</span></span> : String</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314809.75')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Il existe différentes manières d’appeler cette méthode formatDate</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722604314809.8677">formatDate(Date())
formatDate(Date(), <span class="hljs-string">&quot;yyyy&quot;</span>)
formatDate(Date(), addDay = <span class="hljs-number">2</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314809.8677')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_et_si_on_essayait_autre_chose_que_jpa">Et si on essayait autre chose que JPA</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Super mais maintenant quand est il de la persistance ? La majorité des projets stockent leurs données dans une base de données. Vous pouvez utiliser pour cela les librairies mises à disposition par Spring pour faire du JPA (ex Spring Data).</p>
</div>
<div class="paragraph">
<p>Mais la stack JPA est parfois assez lourde, utilise pas mal de mémoire, retarde le démarrage de votre application. JPA vous limite aussi dans l’utilisation des fonctions natives des bases de données. Le seul avantage reste le changement de base de données qui n’arrive pas vraiment dans la vie d’un projet.</p>
</div>
<div class="paragraph">
<p>Le use case le plus fréquent est d’utiliser une base différente en test. Mais il est plutôt conseillé d’exécuter les tests sur le même type de base de données que la cible et vous pouvez toujours mettre en place des parades pour les tests.</p>
</div>
<div class="paragraph">
<p>Nous allons donc voir comment faire directement du JDBC. Kotlin propose la librairie <a href="https://github.com/JetBrains/Exposed">exposed</a>. Cette librairie apporte un DSL pour décrire les tables de votre modèle et faciliter le requêtage.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722604314810.5442"><span class="hljs-keyword">object</span> Companies : Table() {
    <span class="hljs-keyword">val</span> id = integer(<span class="hljs-string">&quot;id&quot;</span>).autoIncrement().primaryKey()
    <span class="hljs-keyword">val</span> name = varchar(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-number">50</span>)
}
<span class="hljs-keyword">object</span> Workers : Table() {
    <span class="hljs-keyword">val</span> id = integer(<span class="hljs-string">&quot;id&quot;</span>).autoIncrement().primaryKey()
    <span class="hljs-keyword">val</span> firstname = varchar(<span class="hljs-string">&quot;firstname&quot;</span>, length = <span class="hljs-number">150</span>)
    <span class="hljs-keyword">val</span> lastname = varchar(<span class="hljs-string">&quot;lastname&quot;</span>, length = <span class="hljs-number">150</span>)
    <span class="hljs-keyword">val</span> companyId = integer(<span class="hljs-string">&quot;company_id&quot;</span>) references Companies.id}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314810.5442')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Nous pouvons créer une interface pour nos DAO.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722604314812.017"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">CrudRepository</span><span class="hljs-meta">@LTT</span>, <span class="hljs-type">K@GT</span> {
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">createTable</span><span class="hljs-params">()</span></span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">create</span><span class="hljs-params">(m: <span class="hljs-type">T</span>)</span></span>: T    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">update</span><span class="hljs-params">(id: <span class="hljs-type">K</span>, m: <span class="hljs-type">T</span>)</span></span>: K    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findById</span><span class="hljs-params">(id: <span class="hljs-type">K</span>)</span></span>: T    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findAll</span><span class="hljs-params">()</span></span>: <span class="hljs-symbol">Iterable@</span><span class="hljs-symbol">LTT@</span>GT
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">deleteAll</span><span class="hljs-params">()</span></span>: <span class="hljs-built_in">Int</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314812.017')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Voici par exemple comment écrire les méthodes CRUD en utilisant le DSL de la librairie exposed.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722604314815.2646"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">CompanyRepository</span> : <span class="hljs-type">CrudRepository@LTCompany</span>, <span class="hljs-type">Int@GT</span>

<span class="hljs-meta">@Repository</span><span class="hljs-meta">@Transactionalclass</span> DefaultCompanyRepository : CompanyRepository {

    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">createTable</span><span class="hljs-params">()</span></span> = SchemaUtils.create(Companies);

    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">create</span><span class="hljs-params">(company: <span class="hljs-type">Company</span>)</span></span>: Company {
        company.id = Companies.insert(toRow(company)).generatedKey        <span class="hljs-keyword">return</span> company
    }

    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">update</span><span class="hljs-params">(id: <span class="hljs-type">Int</span>, company: <span class="hljs-type">Company</span>)</span></span>: <span class="hljs-built_in">Int</span> = Companies.update({ Companies.id eq id}) { toRow(company) }

    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findById</span><span class="hljs-params">(id: <span class="hljs-type">Int</span>)</span></span>: Company = Companies.select({ Companies.id eq id}).map { fromRow(it) }.first()

    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findAll</span><span class="hljs-params">()</span></span>: <span class="hljs-symbol">Iterable@</span><span class="hljs-symbol">LTCompany@</span>GT = Companies.selectAll().map { fromRow(it) }
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">deleteAll</span><span class="hljs-params">()</span></span> = Companies.deleteAll()

    <span class="hljs-keyword">private</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">toRow</span><span class="hljs-params">(company: <span class="hljs-type">Company</span>)</span></span>: Companies.(<span class="hljs-symbol">UpdateBuilder@</span>LT*<span class="hljs-meta">@GT</span>) <span class="hljs-meta">@LAMBDA</span> <span class="hljs-built_in">Unit</span> = {        it[name] = company.name        <span class="hljs-keyword">if</span> (company.id != <span class="hljs-literal">null</span>) it[id] = company.id    }
    <span class="hljs-keyword">private</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">fromRow</span><span class="hljs-params">(result: <span class="hljs-type">ResultRow</span>)</span></span> =
            Company(result[Companies.name],
                    result[Companies.id])

}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314815.2646')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Sébastien nous a montré également comment utiliser Kotlin pour écrire vos scripts Gradle. Kotlin va faciliter le travail des éditeurs, qui vont pouvoir faire de l&#8217;auto complétion et de la validation.</p>
</div>
<div class="paragraph">
<p>Les exemples exposés ici sont disponible dans ce projet Github mais n’hésitez pas à vous référer aux ressources que j’ai exposées au début de cet article et notamment le projet exemple de Sébastien qui lui utilise un script Gradle en Kotlin</p>
</div>
</div>
</div>`;