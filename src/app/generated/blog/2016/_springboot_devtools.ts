export const _springboot_devtools:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Je vais vous parler d&#8217;un ensemble d&#8217;outils mis à disposition par Spring pour améliorer le quotidien des développeurs des applications Spring Boot. Les <a href="http://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html">DevTools</a> permettent d’automatiser le redémarrage et le rechargement de votre application lorsque les fichiers sources sont recompilés ou modifiés.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/springdevtools_00.png" alt="Spring devtools">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_configuration">Configuration</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Pour installer DevTools vous devez simplement ajouter la dépendance à votre projet SpringBoot. Par exemple avec Gradle vous ajoutez</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001681.7917">compile <span class="hljs-string">&quot;org.springframework.boot:spring-boot-devtools&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1728847001681.7917')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Il est préférable d’utiliser ces fonctionnalités uniquement en développement et non en production. Si vous oubliez d’enlever la dépendance, il y a tout de même une désactivation “automatique”. Spring Boot considère que vous êtes en production quand le jar de l’application est lancé via java -jar ou lorsque le classpath est personnalisé.</p>
</div>
<div class="paragraph">
<p>En mode développement DevTools est capable de désactiver certaines propriétés de cache susceptible d’être utilisées par des librairies Spring, notamment celles de templating (voir la <a href="https://github.com/spring-projects/spring-boot/blob/v1.3.5.RELEASE/spring-boot-devtools/src/main/java/org/springframework/boot/devtools/env/DevToolsPropertyDefaultsPostProcessor.java">liste des propriétés</a>)</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_projet_exemple">Projet exemple</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Avant d’aller plus loin il est toujours intéressant de se baser sur un exemple concret. Vous pouvez utiliser un de vos projets ou vous pouvez récupérer sous Github  <a href="https://github.com/Dev-Mind/devmind-devtools">cet exemple (SpringBoot / ES6)</a>. Ce starter utilise Gradle pour le packaging Java et Gulp/npm pour toute la partie Javascript. Vous avez peut être d’autres manières de faire mais personnellement j’aime bien découpler complètement les développements front et back de mes applications.</p>
</div>
<div class="paragraph">
<p>Si vous voulez tester ce projet sur votre poste vous pouvez le cloner et lancer la commande</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001681.4844">./gradlew bootRun</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001681.4844')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Spring Boot va démarrer un serveur d’application Tomcat, et servir l’application sur <a href="http://localhost:8080" class="bare">http://localhost:8080</a>.</p>
</div>
<div class="paragraph">
<p>L’application est découpée en 2 modules</p>
</div>
<div class="ulist">
<ul>
<li>
<p>dm-client : pour la partie cliente initiée via <a href="https://github.com/google/web-starter-kit">Google WebKit Starter</a> (la configuration a été légèrement changée pour ne pas utiliser de framework CSS et faire de l’ES6)</p>
</li>
<li>
<p>dm-server : la partie backend est écrite en Java et utilise Spring Boot</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Pour la petite histoire je ne voulais pas rentrer dans la guerre des frameworks côté front et j’ai développé une application en utilisant JavaScript ES6 (ES2015) ainsi que l’API fetch pour charger des ressources web ou REST. Les scripts sont transpilés via Babel en ES5.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_redémarrage_automatique">Redémarrage automatique</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Lorsque DevTools est ajouté à votre projet Spring, la compilation d&#8217;un fichier source va déclencher un redémarrage pour vous aider à tester au plus vite votre modification. La compilation n&#8217;est pas toujours automatique dans un IDE. Sous IntelliJ vous devez faire <code><em>Ctrl+F9</em></code> ou aller dans le menu <code><em>Build</em></code> @GT <code><em>Make project</em></code>.</p>
</div>
<div class="paragraph">
<p>Super mais quand est il de ma partie Javascript ?</p>
</div>
<div class="paragraph">
<p>Vous pouvez ajouter différentes propriétés pour surveiller d’autres ressources que des fichiers Java.</p>
</div>
<div class="paragraph">
<p>Voici un exemple en YAML</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1728847001682.677"><span class="hljs-attr">spring</span>:
  <span class="hljs-attr">profiles</span>: dev
  <span class="hljs-attr">resources</span>:
    <span class="hljs-keyword">static</span>-<span class="hljs-attr">locations</span>:
      - <span class="hljs-attr">file</span>:../dm-client/app/
      - <span class="hljs-attr">file</span>:../dm-client/build/.<span class="hljs-property">tmp</span>/
  <span class="hljs-attr">devtools</span>:
    <span class="hljs-attr">restart</span>:
      additional-<span class="hljs-attr">paths</span>:
        - ../dm-client/app/
        - ../dm-client/build/.<span class="hljs-property">tmp</span>/
      additional-<span class="hljs-attr">exclude</span>: <span class="hljs-string">&quot;**/*.js, **/*.css, **/*.html&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1728847001682.677')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Ici je surcharge les emplacements par défaut des ressources statiques via la propriété <code><em>spring.resources.static-locations</em></code>. J&#8217;indique mes répertoires utilisés en développement : <code><em>../dm-client/app/</em></code> et <code><em>../dm-client/build/.tmp/</em></code>.</p>
</div>
<div class="paragraph">
<p>Le second répertoire est le répertoire de travail dans lequel sont placés les fichiers ES6 transpilés en ES5 et les fichiers SASS compilés en CSS.</p>
</div>
<div class="paragraph">
<p>Par défaut SpringBoot sert toutes les ressources trouvées dans les répertoires <code><em>classpath:/META-INF/resources/, classpath:/resources/, classpath:/static/, classpath:/public/</em></code>.</p>
</div>
<div class="paragraph">
<p>Quand vous packagez votre application pour la production vous pouvez les placer dans un de ces répertoires compressés dans un jar (voir <a href="https://github.com/Dev-Mind/devmind-devtools/blob/master/dm-client/build.gradle">un exemple</a>).</p>
</div>
<div class="paragraph">
<p>J’indique à DevTools que les répertoires contenant mes ressources web doivent être scrutés (propriété devtools.restart.additional-paths) mais que les resources js, css ou html ne doivent pas déclencher un redémarrage complet (propriété devtools.restart.additional-exclude). Un simple reload des ressources suffit. En fait DevTools embarque un serveur LiveReload sans aucune configuration de votre part.</p>
</div>
<div class="paragraph">
<p>Vous n’avez qu’à ajouter une extension dans votre navigateur (exemple <a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?utm_source=chrome-app-launcher-info-dialog">extension</a> pour chrome) et vos ressources statiques surveillées sont automatiquement rechargées dans votre navigateur dès qu’elles ont modifiées.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_des_petits_trucs_à_savoir_sur_mon_exemple">Des petits trucs à savoir sur mon exemple</h2>
<div class="sectionbody">
<div class="paragraph">
<p>La surcharge des propriétés n’est activée que pour le profil dev. En production ceci serait inutile et je préfère servir les ressources préparées à cet effet (minifiées, concaténées, compressées….)</p>
</div>
<div class="paragraph">
<p>Dans IntelliJ vous pouvez spécifier le profil par défaut dans le lanceur SpringBoot</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/springdevtools_01.png" alt="IntelliJ lanceur SpringBoot">
</div>
</div>
<div class="paragraph">
<p>Dans mon exemple j’utilise des langages qui nécéssitent une compilation (SASS) ou une transpilation (ES6). Je souhaite donc que le répertoire .tmp contenant les ressources compilées avant traitement pre prod (minification, concaténation…) soient mises à jour dès que je modifie une ressource. Pour automatiser cette mise à jour j’utilise Gulp et ses watchers</p>
</div>
<div class="paragraph">
<p>Dans mon exemple vous pouvez lancer la tâche</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1728847001682.2517">gulp watch</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001682.2517')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Voici la configuration</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1728847001683.3904">gulp.<span class="hljs-title function_">task</span>(<span class="hljs-string">&#x27;watch&#x27;</span>, [<span class="hljs-string">&#x27;scripts&#x27;</span>, <span class="hljs-string">&#x27;styles&#x27;</span>, <span class="hljs-string">&#x27;html-template&#x27;</span>], <span class="hljs-function">() =&gt;</span> {
  gulp.<span class="hljs-title function_">watch</span>([<span class="hljs-string">&#x27;app/**/*.html&#x27;</span>], [<span class="hljs-string">&#x27;html-template&#x27;</span>, reload]);
  gulp.<span class="hljs-title function_">watch</span>([<span class="hljs-string">&#x27;app/src/**/*.{scss,css}&#x27;</span>], [<span class="hljs-string">&#x27;styles&#x27;</span>, reload]);
  gulp.<span class="hljs-title function_">watch</span>([<span class="hljs-string">&#x27;app/**/*.js&#x27;</span>], [<span class="hljs-string">&#x27;lint&#x27;</span>, <span class="hljs-string">&#x27;scripts&#x27;</span>]);
  gulp.<span class="hljs-title function_">watch</span>([<span class="hljs-string">&#x27;app/images/**/*&#x27;</span>], reload);
});</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001683.3904')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Au final en développement je lance SpringBoot via IntelliJ  et un gulp watch. Je peux ensuite commencer à travailler sans me soucier du redémarrage de l’application ou de son rafraîchissement quand je modifie les sources de mon projet.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_comment_ça_marche">Comment ça marche ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Le mécanisme repose sur l’utilisation de 2 classloaders.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Les classes contenues dans les librairies sont placées dans un premier classloader.</p>
</li>
<li>
<p>Les classes que vous êtes susceptible de changer (celles dans votre IDE) sont elles chargées dans un second classloader qu’on appelera “restart classloader”</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Quand votre application est redémarrée seul le “restart classloader” est pris en compte. Il est supprimé et recréé. Ce mode de fonctionnement permet d’avoir des temps de démarrage plus rapide qu’un redémarrage complet.</p>
</div>
<div class="paragraph">
<p>Le redémarrage peut être coûteux mais DevTools a un avantage par rapport à <a href="http://zeroturnaround.com/software/jrebel/">JRebel</a> ou <a href="https://github.com/spring-projects/spring-loaded">Spring Loaded</a>, c’est qu’il n’a pas besoin d’ajouter des plugins aux IDE et en plus il est gratuit.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_a_vous_de_jouer">A vous de jouer&#8230;&#8203;</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Voila je vais m’arrêter ici mais DevTools fournit également différents outils pour manipuler votre application si elle est déployée sur un serveur distant. Comme je ne l’ai pas encore mis en pratique je vous réoriente vers la <a href="http://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html#using-boot-devtools-remote">documentation</a>.</p>
</div>
<div class="paragraph">
<p>La configuration est vraiment minimale pour les bénéfices et les gains de productivité apportés. Quand vous switchez de contexte et que vous n’avez pas ce genre d’outils, ils vous manquent vite.</p>
</div>
<div class="paragraph">
<p>J’avais envie d’écrire un article depuis un bon moment sur le sujet mais je n’avais jamais trouvé le temps. Le fait de regarder la vidéo de <a href="https://twitter.com/snicoll?lang=fr">Stephan Nicoll</a> et <a href="https://twitter.com/brianclozel?lang=fr">Brian Clozel</a> sur Spring pour le web a fini de me motiver.</p>
</div>
<div class="videoblock">
<div class="content">
<iframe src="https://www.youtube.com/embed/sR8PyhJa-Zw?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</div>
</div>`;