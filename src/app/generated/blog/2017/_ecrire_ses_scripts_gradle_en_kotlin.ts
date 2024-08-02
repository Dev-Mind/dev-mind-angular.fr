export const _ecrire_ses_scripts_gradle_en_kotlin:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>En mai 2016 Gradle annonçait qu’il était maintenant possible d’écrire des scripts (build.gradle) et des plugins en Kotlin. Ce choix pouvait paraître étonnant alors que Gradle avait depuis ces débuts beaucoup investi sur le langage Groovy.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/ecrire_ses_scripts_gradle_en_kotlin_01.png" alt="Gradle Kotlin">
</div>
</div>
<div class="paragraph">
<p>Le langage Kotlin à l’avantage d’être statique et typé et son utilisation permet de considérablement enrichir l’expérience des développeurs dans les IDE</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Auto-complétion et aide contextuel</p>
</li>
<li>
<p>Navigation à la source</p>
</li>
<li>
<p>Refactoring</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Je vous conseille de lire le très bon article de blog de Cédric Champeau (ancien de la core team Groovy embauché par Gradle) qui explique beaucoup mieux que moi les avantages.</p>
</div>
<div class="paragraph">
<p>Ce qui m’intéresse dans cet article c’est plutôt vous montrer comment paramétrer un cas concret. Je vous conseille pour cela d’utiliser la dernière version de Gradle (3.3). Le repo Github contenant les sources du projet “Gradle Script Kotlin” comprend plusieurs exemples.</p>
</div>
<div class="paragraph">
<p>Dans cet article je me base sur le script de construction build.gradle.kts du site Mix-IT 2017. Ce script permet de construire une application Spring Boot écrite en Kotlin et ce qui est plutôt sympa c’est que Kotlin est du coup utilisé sur toute la chaîne. Vous pouvez comparer ce script avec celui utilisé dans l’ancienne version du site.</p>
</div>
<div class="paragraph">
<p>Mon objectif est d&#8217;essayer de vous montrer les différences entre un script Groovy et Kotlin en essayant de paramétrer le plugin gradle-node-plugin. Ce plugin permet de piloter Gulp (appli node.js) via Gradle pour avoir une seule manière de construire notre application Java ou Kotlin. A noter que ce plugin permet l&#8217;utilisation de npm ou yarn pour gérer vos dépendances JavaScript. Dans notre cas nous avons opté pour yarn.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_paramétrage_du_build">Paramétrage du build</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Dans un script Gradle nous avons une partie utilisée pour paramétrer le build lui même. En Groovy on écrit</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609005627.764">buildscript {
    ext {
        nodePluginVersion = <span class="hljs-string">&#x27;1.0.1&#x27;</span>
    }
    repositories {
        mavenCentral()
        jcenter()
        maven {
            url <span class="hljs-string">&quot;https://plugins.gradle.org/m2/&quot;</span>
        }
    }
    dependencies {
        classpath <span class="hljs-string">&quot;com.moowork.gradle:gradle-node-plugin:@dollar@{nodePluginVersion}&quot;</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609005627.764')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>En Kotlin</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1722609005627.5496">buildscript {
    ext {
        nodePluginVersion = <span class="hljs-string">&#x27;1.0.1&#x27;</span>
    }
    repositories {
        mavenCentral()
        jcenter()
        maven {
            url <span class="hljs-string">&quot;https://plugins.gradle.org/m2/&quot;</span>
        }
    }
    dependencies {
        classpath <span class="hljs-string">&quot;com.moowork.gradle:gradle-node-plugin:@dollar@{nodePluginVersion}&quot;</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609005627.5496')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous me direz jusque là pas beaucoup de changement. Déclarons maintenant les plugins utilisés par notre projet</p>
</div>
<div class="paragraph">
<p>En Groovy</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1722609005628.3096">apply <span class="hljs-attr">plugin:</span> <span class="hljs-string">&#x27;idea&#x27;</span>
apply <span class="hljs-attr">plugin:</span> <span class="hljs-string">&#x27;com.moowork.node&#x27;</span>
apply <span class="hljs-attr">plugin:</span> <span class="hljs-string">&#x27;com.moowork.gulp&#x27;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722609005628.3096')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>En Kotlin</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609005628.982">apply {
    plugin(<span class="hljs-string">&quot;idea&quot;</span>)
    plugin(<span class="hljs-string">&quot;kotlin&quot;</span>)
    plugin(<span class="hljs-string">&quot;kotlin-noarg&quot;</span>)
    plugin(<span class="hljs-string">&quot;com.moowork.node&quot;</span>)
    plugin(<span class="hljs-string">&quot;com.moowork.gulp&quot;</span>)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609005628.982')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_configuration_du_plugin_gradle_node_plugin">Configuration du plugin gradle-node-plugin</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Les plugins (c’est le cas de gradle-gulp-plugin) peuvent avoir une partie configuration (les points d’extensions)</p>
</div>
<div class="paragraph">
<p>En Groovy</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1722609005628.5088">node {
    version = <span class="hljs-string">&#x27;6.9.2&#x27;</span>
    download = <span class="hljs-literal">true</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609005628.5088')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>En Kotlin</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609005629.095"><span class="hljs-keyword">import</span> com.moowork.gradle.node.NodeExtension

<span class="hljs-symbol">configure@</span><span class="hljs-symbol">LTNodeExtension@</span>GT {
    version = <span class="hljs-string">&quot;6.9.2&quot;</span>
    download = <span class="hljs-literal">true</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609005629.095')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Notez que vous devez importer le point d’extension pour être capable de surcharger les paramètres par défaut d’un plugin. Ceci demande de connaître un peu le fonctionnement de Gradle et de ces plugins (voir mon article ou encore mieux la doc :-) ).</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_définir_une_tâche">Définir une tâche</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Regardons maintenant comment configurer une tâche et l’intégrer dans le cycle de vie Gradle</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1722609005629.304">task gulpBuild(<span class="hljs-attr">type:</span> GulpTask, <span class="hljs-attr">dependsOn:</span> yarnInstall) {
  inputs.dir <span class="hljs-string">&#x27;src/main/sass&#x27;</span>  inputs.files(npmInstall.outputs)
  outputs.dir <span class="hljs-string">&quot;src/main/static/css&quot;</span>  args = [<span class="hljs-string">&quot;default&quot;</span>]
}

processResources {
  dependsOn gulpBuild
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609005629.304')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>En Kotlin</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609005629.9402"><span class="hljs-keyword">import</span> com.moowork.gradle.gulp.GulpTask
<span class="hljs-keyword">import</span> com.moowork.gradle.node.yarn.YarnInstallTask

<span class="hljs-symbol">task@</span><span class="hljs-symbol">LTGulpTask@</span>GT(<span class="hljs-string">&quot;gulpBuild&quot;</span>) {
  dependsOn(YarnInstallTask.NAME)
  inputs.dir(<span class="hljs-string">&quot;src/main/sass&quot;</span>)
  inputs.dir(<span class="hljs-string">&quot;build/.tmp&quot;</span>)
  outputs.dir(<span class="hljs-string">&quot;src/main/static/css&quot;</span>)
  args = listOf(<span class="hljs-string">&quot;default&quot;</span>)
}

tasks.getByName(<span class="hljs-string">&quot;processResources&quot;</span>).dependsOn(<span class="hljs-string">&quot;gulpBuild&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1722609005629.9402')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Je n’ai exposé ici que les cas les plus courants utilisés dans Gradle. Vous pouvez toujours programmer vos tâches en Groovy ou Kotlin dans vos scripts. Pour plus d’info je vous réoriente vers les exemples officiels et la page Stackoverflow (qui n’est pas encore très riche sur le sujet).</p>
</div>
<div class="paragraph">
<p>Nous verrons dans les mois qui viennent si Kotlin prend la main sur Groovy dans les scripts de configuration Gradle. Pour le moment le manque de documentation sur Gradle Script Kotlin est vraiment problématique.</p>
</div>
</div>
</div>`;