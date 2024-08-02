export const _do_your_blog_yourself:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Début 2017, j&#8217;ai choisi de migrer mon blog de Blogspot vers une solution personnalisée à base de Asciidoc. J&#8217;ai d&#8217;ailleurs écrit <a href="https://www.dev-mind.fr/blog/2017/nouveau_site_asciidoctor.html">un article</a> sur ce sujet. J&#8217;ai continué à faire évoluer mon site web pour enfin arriver à une solution qui me satisfait.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>utilisation d&#8217;aucun framework JS, CSS ou autre. Le but étant d&#8217;avoir peu de Javascript et de CSS</p>
</li>
<li>
<p>plus de CMS pour gérer le blog tout en gardant les principales fonctionnalités : facilité d&#8217;ajout des articles, commentaires, recherche&#8230;&#8203;</p>
</li>
<li>
<p>rendu côté serveur avec plus de contenu de pages chargé dynamiquement</p>
</li>
<li>
<p>garantir un style uniforme entre toutes les pages avec des balises title et des descriptions uniques pour chaque page du site</p>
</li>
<li>
<p>avoir un site respectant les recommandations progressive webapps</p>
</li>
<li>
<p>automatisation du déploiement</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/siteweb_00.jpg" alt="Do your blog yourself">
</div>
</div>
<div class="paragraph">
<p>Le but est d&#8217;arriver à une solution qui mèle facilité de développement et facilité de déploiement et qui permette de fournir un contenu optimisé et facilement indexable par les différents robots des principaux moteurs de recherche.</p>
</div>
<div class="paragraph">
<p>Aujourd&#8217;hui toutes ces fonctionnalités sont en place et je m&#8217;appuie pour ceci sur</p>
</div>
<div class="ulist">
<ul>
<li>
<p><a href="https://gulpjs.com/">Gulp</a> pour la gestion du cycle de vie,</p>
</li>
<li>
<p><a href="http://asciidoctor.org/">Asciidoctor.js</a> pour générer les pages du blog écrites en Asciidoc,</p>
</li>
<li>
<p><a href="https://firebase.google.com/">Firebase</a> pour gérer les commentaires et la recherche</p>
</li>
<li>
<p><a href="https://mustache.github.io/">Mustache</a> pour avoir des template de page sans dupliquer inutilement du contenu</p>
</li>
<li>
<p><a href="https://www.clever-cloud.com/">Clever Cloud</a> pour le déploiement en continu dès qu&#8217;une modification est poussée sur master</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Toutes les sources du site sont disponibles sous <a href="https://github.com/Dev-Mind/dev-mind.fr">Github</a></p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_cycle_de_vie_de_lapplication">Cycle de vie de l&#8217;application</h2>
<div class="sectionbody">
<div class="paragraph">
<p><a href="https://gulpjs.com/">Gulp</a> est une application node qui permet de lancer et d&#8217;enchaîner des tâches sur un ensemble de resources. Prenons comme exemple la tâche permettant de minifier les images</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604315397.0308">gulp.<span class="hljs-title function_">task</span>(<span class="hljs-string">&#x27;images-min&#x27;</span>, <span class="hljs-function">() =&gt;</span>
  gulp.<span class="hljs-title function_">src</span>(<span class="hljs-string">&#x27;src/images/**/*.{svg,png,jpg}&#x27;</span>)
    .<span class="hljs-title function_">pipe</span>(<span class="hljs-title function_">imagemin</span>([imagemin.<span class="hljs-title function_">gifsicle</span>(), <span class="hljs-title function_">imageminMozjpeg</span>(), imagemin.<span class="hljs-title function_">optipng</span>(), imagemin.<span class="hljs-title function_">svgo</span>()], {
      <span class="hljs-attr">progressive</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">interlaced</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">arithmetic</span>: <span class="hljs-literal">true</span>,
    }))
    .<span class="hljs-title function_">pipe</span>(gulp.<span class="hljs-title function_">dest</span>(<span class="hljs-string">&#x27;build/.tmp/img&#x27;</span>))
    .<span class="hljs-title function_">pipe</span>(@dollar@.<span class="hljs-title function_">if</span>(<span class="hljs-string">&#x27;**/*.{jpg,png}&#x27;</span>, @dollar@.<span class="hljs-title function_">webp</span>()))
    .<span class="hljs-title function_">pipe</span>(@dollar@.<span class="hljs-title function_">size</span>({<span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;images&#x27;</span>, <span class="hljs-attr">showFiles</span>: <span class="hljs-literal">false</span>}))
    .<span class="hljs-title function_">pipe</span>(gulp.<span class="hljs-title function_">dest</span>(<span class="hljs-string">&#x27;build/.tmp/img&#x27;</span>))
);</code><button class="btn-copy-code" onclick="copyToClipboard('1722604315397.0308')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Une tâche Gulp commence toujours par <code><em>gulp.src([fichiers sources])</em></code> pour spécifier un ensemble de resources et démarrrer le flux de fichiers. Elle se termine par un ou plusieurs <code><em>gulp.dest([emplacement cible des fichiers])</em></code> pour écrire le résultat des différentes étapes dans une destination donnée. Dans mon exemple, la source est constituées des images du site et ces fichiers sont envoyés à un plugin imagemin (via la fonction <code><em>pipe([action])</em></code>). Imagemin va compresser et mettre les images dans le répertoire <code><em>gulp.dest([build/.tmp/img])</em></code>. J&#8217;enchaîne une deuxième tâche à la suite pour convertir les images png et jpg au format webp (qui est un format alternatif optimisé pour Chrome).</p>
</div>
<div class="paragraph">
<p>Ce qui est interessant dans Gulp, c&#8217;est qu&#8217;il est très facile d&#8217;ajouter vos propres tâches pour agir sur ce flux de fichiers. Vous pouvez utiliser par exemple <a href="https://github.com/dominictarr/map-stream">map-stream</a>. Prenons <a href="https://github.com/Dev-Mind/dev-mind.fr/blob/master/gulp-extensions/transformers/convert-to-html.js">le code</a> que j&#8217;utilise pour convertir les fichiers .adoc en .html</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604315399.1917"><span class="hljs-keyword">const</span> map = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;map-stream&#x27;</span>);

<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = <span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">file, next</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> html = file.<span class="hljs-property">ast</span>.<span class="hljs-title function_">convert</span>();
    file.<span class="hljs-property">contents</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Buffer</span>(html);
    file.<span class="hljs-property">extname</span> = <span class="hljs-string">&#x27;.html&#x27;</span>;
    file.<span class="hljs-property">path</span> = file.<span class="hljs-property">path</span>.<span class="hljs-title function_">replace</span>(<span class="hljs-string">&#x27;.adoc&#x27;</span>, <span class="hljs-string">&#x27;.html&#x27;</span>);
    <span class="hljs-title function_">next</span>(<span class="hljs-literal">null</span>, file);
  });
};</code><button class="btn-copy-code" onclick="copyToClipboard('1722604315399.1917')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Dans ce fichier j&#8217;exporte une fonction qui utilise <a href="https://github.com/dominictarr/map-stream">map-stream</a>. Pour chaque fichier que je reçois je change l&#8217;extension et le pathname. Ceci permet d&#8217;agir sur le stream de fichier. Dans mon script gulp <a href="https://github.com/Dev-Mind/dev-mind.fr/blob/master/gulpfile.js#L13-L25">j&#8217;importe cette extension</a> sous le nom <code><em>convertToHtml</em></code>. Je peux ensuite l&#8217;utiliser dans une de mes tâches</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604315401.6023">gulp.<span class="hljs-title function_">task</span>(<span class="hljs-string">&#x27;blog-indexing&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">cb</span>) =&gt;</span> {
  gulp.<span class="hljs-title function_">src</span>(<span class="hljs-string">&#x27;src/blog/**/*.adoc&#x27;</span>)
    .<span class="hljs-title function_">pipe</span>(<span class="hljs-title function_">readAsciidoc</span>(modeDev))
    .<span class="hljs-title function_">pipe</span>(<span class="hljs-title function_">convertToHtml</span>())
    .<span class="hljs-title function_">pipe</span>(<span class="hljs-title function_">firebaseIndexing</span>(modeDev))
    .<span class="hljs-title function_">pipe</span>(<span class="hljs-title function_">convertToJson</span>(<span class="hljs-string">&#x27;blogindex.json&#x27;</span>))
    .<span class="hljs-title function_">pipe</span>(gulp.<span class="hljs-title function_">dest</span>(<span class="hljs-string">&#x27;build/.tmp&#x27;</span>))
    .<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;end&#x27;</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">cb</span>())
});</code><button class="btn-copy-code" onclick="copyToClipboard('1722604315401.6023')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Dans mon exemple ci dessus les tâches <code><em><a href="https://github.com/Dev-Mind/dev-mind.fr/blob/master/gulp-extensions/transformers/read-asciidoctor.js">readAsciidoc</a></em></code>, <code><em><a href="https://github.com/Dev-Mind/dev-mind.fr/blob/master/gulp-extensions/transformers/convert-to-html.js">convertToHtml</a></em></code>, <code><em><a href="https://github.com/Dev-Mind/dev-mind.fr/blob/master/gulp-extensions/transformers/firebase-indexing.js">firebaseIndexing</a></em></code> et <code><em><a href="https://github.com/Dev-Mind/dev-mind.fr/blob/master/gulp-extensions/transformers/convert-to-json.js">convertToJson</a></em></code> sont des scripts personnalisés qui me permettent de lire les documents Asciidoc, de les convertir en HTML, d&#8217;indexer les métadonnées dans une base Firebase puis localement dans un fichier json et d&#8217;orienter le tout dans le répertoire <code><em>build/.tmp</em></code>. Je profite de cet article pour remercier <a href="https://twitter.com/hsablonniere">Hubert Sablonière</a> qui m&#8217;a aider pour la partie AsciiDoctor.</p>
</div>
<div class="paragraph">
<p>Au final Gulp gère tout le cycle de vie du site web</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/siteweb_01.jpg" alt="Cycle de vie Gulp">
</div>
</div>
<div class="paragraph">
<p>D&#8217;autres tâches sont ajoutées lorsque le site est poussé en production : cache busting des ressources (chaque resource est suffixé par un hash pour forcer une mise à jour du cache quand la ressource change), génération des services workers et compression des ressources. Des tests d&#8217;intégration vont rapidement être ajouté pour valider le processus.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_rendering_à_la_construction">Rendering à la construction</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Ces dernières années nous avons eu tendance à déporter beaucoup de traitements dans les navigateurs Internet en les implémentant en JavaScript et ou en utilisant un framework. Mais ceci a un coût.</p>
</div>
<div class="paragraph">
<p>La majorité des internautes utilisent aujourd&#8217;hui des téléphones mobiles avec souvent des performances limitées. L&#8217;interprétation du JavaScript (chargement parsing, compilation, exécution) a un coût important. C&#8217;est pourquoi il est préférable de limiter ce JavaScript. <a href="http://webassembly.org/">Webassembly</a> qui permet de transférer un code JavaScript compilé permet de limiter ce coup mais nous ne sommes pas encore prêt à l&#8217;implémenter.</p>
</div>
<div class="paragraph">
<p>L&#8217;autre problématique concerne les moteurs de recherche. La mode de ces dernières années est de créer des applications Single Page où le contenu est chargé dynamiquement. Mais les robots d&#8217;indexation ne sont pas toujours capables d&#8217;éxécuter des scripts. Il est donc préféréable de servir du HTML pur pour avoir la meilleure indexation possible et de faire par exemple du server side rendering.</p>
</div>
<div class="paragraph">
<p>Dans le cas d&#8217;un blog nous pouvons faire beaucoup plus simple et tout générer lors de la construction du projet. Dans le cas de Dev-Mind, les pages de blog sont écrites en Asciidoc. Comme je l&#8217;ai dit dans la partie précédente, <a href="http://asciidoctor.org/">Asciidoctor.js</a> permet de lire les metadonnées de ces pages. Le processus Gulp construit un index qui permet ensuite de géréner les pages HTML (détail, liste) en appliquant un template commun via <a href="https://github.com/janl/mustache.js/">Mustache.js</a>.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/siteweb_02.jpg" alt="Génération blog">
</div>
</div>
<div class="paragraph">
<p>Ainsi les moteurs de recherche peuvent indexer sans problème les pages du site.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_déploiement_en_continu">Déploiement en continu</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Pendant longtemps mon site web était héberger chez <a href="https://www.ovh.com/fr/">OVH</a> mais je devais à chaque livraison passer par FTP pour livrer manuellement le contenu. Nous pouvons faire beaucoup mieux&#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>J&#8217;ai donc décidé de migrer l&#8217;hébergement chez un autre prestataire français <a href="https://www.clever-cloud.com/">Clever Cloud</a>. Leur créneau est de vous aider à déployer automatiquement votre projet à partir d&#8217;une branche <a href="https://github.com/Dev-Mind/dev-mind.fr">Github</a>. Dans mon cas je voulais que Clever cloud soit capable de</p>
</div>
<div class="ulist">
<ul>
<li>
<p>lancer un checkout de mon projet</p>
</li>
<li>
<p>d&#8217;éxécuter mon script Gulp de génération du site</p>
</li>
<li>
<p>de servir les pages générées via un serveur web (Apache ou autre)</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>J&#8217;ai eu quelques problèmes au départ mais le support est vraiment super et tout a pu être fait en quelques heures. Merci aussi à <a href="https://twitter.com/k33g_org">Philippe Charrière</a> pour nos échanges sur le sujet.</p>
</div>
<div class="paragraph">
<p>Voici la procédure que j&#8217;ai suivie. J&#8217;ai tout d&#8217;abord créé un compte sur le site de Clever Cloud,et j&#8217;ai ajouté une application via la console.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/siteweb_03.jpg" alt="Création application">
</div>
</div>
<div class="paragraph">
<p>Créer une application revient à pointer vers un répository Github. Par défaut Clever suit master et relancera un déploiement chaque fois qu&#8217;un nouveau commit sera poussé sur Github. Vous pouvez dans un second temps choisir une autre branche que master (ce qui peut être utile pour dissocier différents environnements développement, recette, prod&#8230;&#8203;)</p>
</div>
<div class="paragraph">
<p>Vous devez ensuite sélectionner le type d&#8217;application. Dans mon cas c&#8217;est une application statique (dernière de la liste)</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/siteweb_04.png" alt="Type application">
</div>
</div>
<div class="paragraph">
<p>Vous pouvez ensuite choisir la taille du serveur. Bien évidemment le prix mensuel dépendra des ressources utilisées</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/siteweb_05.png" alt="Choix serveur">
</div>
</div>
<div class="paragraph">
<p>Votre application peut utiliser ces propres services mais la plateforme peut aussi vous aider à ajouter des extensions pour facilement utiliser du stockage physique ou via des sources de données (MongoDB, MySql, PostgreSQL)&#8230;&#8203;.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/siteweb_06.png" alt="Variables d&#8217;environnement">
</div>
</div>
<div class="paragraph">
<p>Vous pouvez ensuite paramétrer différentes variables d&#8217;environnement. Les variables dont le nom commence par DEVMIND sont injectées dans le processus Gulp de construction</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604315403.5872"><span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-string">&quot;apiKey&quot;</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">DEVMIND_API_KEY</span>,
  <span class="hljs-string">&quot;authDomain&quot;</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">DEVMIND_AUTH_DOMAIN</span>,
  <span class="hljs-string">&quot;databaseURL&quot;</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">DEVMIND_DATABASE_URL</span>,
  <span class="hljs-string">&quot;storageBucket&quot;</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">DEVMIND_STORAGE_BUCKET</span>,
  <span class="hljs-string">&quot;user&quot;</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">DEVMIND_USER_MAIL</span>,
  <span class="hljs-string">&quot;password&quot;</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">DEVMIND_PASSWORD</span>
};</code><button class="btn-copy-code" onclick="copyToClipboard('1722604315403.5872')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>La variable d&#8217;environnement <code><em>CC_PRE_BUILD_HOOK</em></code> est importante car elle permet d&#8217;indiquer quel script est lancé à l&#8217;installation. Dans mon cas je lance un <code><em>npm install</em></code>. Npm permet de charger les différents plugins Node utilisés par Gulp et permet aussi de lancer Gulp (tâche paramétrée dans le fichier <code><em>package.json</em></code> du projet).</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604315403.5703">{
  <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;dev-mind.com&quot;</span>,
  <span class="hljs-string">&quot;repository&quot;</span>: <span class="hljs-string">&quot;https://github.com/Dev-Mind/dev-mind.com.git&quot;</span>,
  <span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;install&quot;</span>: <span class="hljs-string">&quot;gulp&quot;</span>,
    <span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;gulp serve&quot;</span>
  }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604315403.5703')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Il est intéressant de noter que vous pouvez lancer plusieurs <a href="https://www.clever-cloud.com/doc/clever-cloud-overview/hooks/">hooks</a> avant ou après l&#8217;exécution de votre script.</p>
</div>
<div class="paragraph">
<p>Pour que le serveur Apache fourni par Clever Cloud, soit capable de servir le répertoire généré, vous devez ajouter un fichier <code><em><a href="https://github.com/Dev-Mind/dev-mind.fr/blob/master/clevercloud/php.json">php.json</a></em></code> (dans un répertoire nommé <code><em>clevercloud</em></code> à la racine de votre projet), avec le contenu suivant</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604315404.0227">{
  <span class="hljs-string">&quot;deploy&quot;</span>: {
    <span class="hljs-string">&quot;webroot&quot;</span>: <span class="hljs-string">&quot;/build/dist&quot;</span>
  }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604315404.0227')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>La dernière étape consite à paramétrer votre nom de domaine. Vous devez aller sur le site sur lequel vous avez déclarez ce nom de domaine et faire pointer le DNS vers les IPS mises à dispostion par Clever Cloud. Dans la console Clever vous devez aussi déclarer vos noms de domaine</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/siteweb_07.png" alt="Variables d&#8217;environnement">
</div>
</div>
<div class="paragraph">
<p>Dans mon cas le support m&#8217;a également activé la génération automatique de certificats via <a href="https://letsencrypt.org/">Lets' Encrypt</a>.</p>
</div>
<div class="paragraph">
<p>Et maintenant je suis très content de dire que <a href="https://www.dev-mind.fr/" class="bare">https://www.dev-mind.fr/</a> est dorénavant hébergé sur Clever Cloud.</p>
</div>
</div>
</div>`;