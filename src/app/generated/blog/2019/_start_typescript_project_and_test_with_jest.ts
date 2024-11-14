export const _start_typescript_project_and_test_with_jest:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_etape_1_nodejs">Etape 1 : NodeJS</a></li>
<li><a class="link" fragment="#_etape_2_créer_un_projet">Etape 2 : Créer un projet</a></li>
<li><a class="link" fragment="#_etape_2_installer_typescript">Etape 2 : Installer typescript</a></li>
<li><a class="link" fragment="#_etape_3_ecrire_du_code_en_typescript">Etape 3 : Ecrire du code en TypeScript</a></li>
<li><a class="link" fragment="#_etape_4_tester_notre_code_avec_jest">Etape 4 : Tester notre code avec Jest</a></li>
<li><a class="link" fragment="#_conclusion">Conclusion</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Si vous êtes un développeur web, vous avez forcément entendu parler de <a href="https://www.typescriptlang.org">TypeScript</a>. Ce langage se définit comme un sur-ensemble de <a href="https://www.javascript.com/">JavaScript</a>. Votre code est compilé en JavaScript standard pour pouvoir être exécuté sur un moteur JavaScript (node, navigateur).</p>
</div>
<div class="paragraph">
<p><a href="https://www.typescriptlang.org">TypeScript</a> comble beaucoup de manque du langage <a href="https://www.javascript.com/">JavaScript</a>, en introduisant les types et bien d&#8217;autres fonctionnalités. Avec <a href="https://www.typescriptlang.org">TypeScript</a> vous bénéficiez d&#8217;une meilleure expérience de développement avec une meilleure complétion, une remontée des erreurs plus rapide&#8230;&#8203; De nombreux frameworks l&#8217;ont adopté (<a href="https://angular.io/">Angular</a>, <a href="https://aurelia.io/">Aurelia</a>, <a href="https://www.nativescript.org/">NativeScript</a>&#8230;&#8203;) car comme pour les langages C# ou Java le langage a un réel avantage en entreprise.</p>
</div>
<div class="paragraph">
<p>Dans cet article, nous allons voir comment lancer un projet <a href="https://www.typescriptlang.org">TypeScript</a>, le compiler, éxécuter des tests via <a href="https://jestjs.io/">Jest</a>. Il existe pas mal de ressources sur le web sur ce sujet mais très souvent les choses sont complexifiées.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/laissez_tomber_javascript1.png" alt="laissez_tomber_javascript">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_etape_1_nodejs">Etape 1 : NodeJS</h2>
<div class="sectionbody">
<div class="paragraph">
<p><a href="https://www.javascript.com/">JavaScript</a> est un langage qui est exécuté sur un moteur JavaScript. Les navigateurs Internet intègrent tous aujourd&#8217;hui des moteurs JavaScript. Quand vous voulez créer une application en dehors d&#8217;un navigateur, vous allez utiliser NodeJs qui fournit un moteur JavaScript autonome.</p>
</div>
<div class="paragraph">
<p><a href="https://nodejs.org/">NodeJS</a> est disponible pour toutes les plateformes <a href="https://nodejs.org/en/download/" class="bare">https://nodejs.org/en/download/</a></p>
</div>
<div class="paragraph">
<p><a href="https://nodejs.org/">NodeJS</a> fourni un gestionnaire de paquet <code>npm</code> qui permet de télécharger et mettre à jour les dépendances d&#8217;un projet.</p>
</div>
<div class="paragraph">
<p>Une fois que vous avez installé NodeJs vous lancer dans un terminal <code>npm</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731601745952.5051">@dollar@ npm

Usage: npm &lt;command&gt;

where &lt;command&gt; is one of:
    access, adduser, audit, bin, bugs, c, cache, ci, cit,
    clean-install, clean-install-test, completion, config,
    create, ddp, dedupe, deprecate, dist-tag, docs, doctor,
    edit, explore, get, help, help-search, hook, i, init,
    install, install-ci-test, install-test, it, link, list, ln,
    login, logout, ls, org, outdated, owner, pack, ping, prefix,
    profile, prune, publish, rb, rebuild, repo, restart, root,
    run, run-script, s, se, search, set, shrinkwrap, star,
    stars, start, stop, t, team, test, token, tst, un,
    uninstall, unpublish, unstar, up, update, v, version, view,
    whoami

npm &lt;command&gt; -h  quick help on &lt;command&gt;
npm -l            display full usage info
npm help &lt;term&gt;   search for help on &lt;term&gt;
npm help npm      involved overview&lt;/term&gt;&lt;/term&gt;</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745952.5051')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez lancer la commande <code>node</code> qui permet de lancer une console node</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731601745957.07">@dollar@ node
<span class="hljs-meta prompt_">&gt; </span><span class="language-bash">const name = <span class="hljs-string">&#x27;Guillaume&#x27;</span></span>
undefined
<span class="hljs-meta prompt_">&gt; </span><span class="language-bash">console.log(name)</span>
Guillaume
<span class="hljs-meta prompt_">&gt;</span><span class="language-bash">
(To <span class="hljs-built_in">exit</span>, press ^C again or <span class="hljs-built_in">type</span> .<span class="hljs-built_in">exit</span>)</span>
<span class="hljs-meta prompt_">&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731601745957.07')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_etape_2_créer_un_projet">Etape 2 : Créer un projet</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Nous allons commencer par créer l&#8217;arborescence de notre projet <code>myproject</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731601745958.1697">mkdir -p myproject/src/main/typescript
mkdir -p myproject/src/test/typescript</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745958.1697')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Nous allons utiliser NodeJS dans notre projet pour bénéficier du gestionnaire de paquet <code>npm</code> mais aussi exécuter notre code. Pour initialiser notre projet nous allons utiliser le client fournit avec <code>npm</code>. Le client va générer un fichier <code>package.json</code> à la racine de votre projet en fonction des réponses que vous aurez donné</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731601745958.285">@dollar@ cd myproject
@dollar@ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See @backtick@npm help json@backtick@ for definitive documentation on these fields
and exactly what they do.

Use @backtick@npm install &lt;pkg&gt;@backtick@ afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (myproject)
version: (1.0.0)
description: My first example in TypeScript
entry point: (index.js)
test command:
git repository:
keywords:
author: Guillaume EHRET
license: (ISC) MIT
About to write to /home/devmind/Workspace/web/myproject/package.json:

{
  &quot;name&quot;: &quot;myproject&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;My first example in TypeScript&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;author&quot;: &quot;Guillaume EHRET&quot;,
  &quot;license&quot;: &quot;MIT&quot;
}&lt;/pkg&gt;</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745958.285')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p><code>npm</code> permet d&#8217;installer des packages et des librairies. Par exemple pour installer typescript vous lancerez</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731601745958.1929">npm install typescript</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745958.1929')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Cettte commande va ajouter un bloc <code>dependencies</code> dans le fichier <code>package.json</code>. Comme vous n&#8217;avez pas spécifier de version <code>npm</code> prend la dernière disponible. <code>npm</code> utilise les numéros de version sémantique. Dans l&#8217;exemple ci dessous le <code>^</code> (caret) indique que <code>npm</code> téléchargera au moins une version @GT= 3.5.3 et @LT 4.0.0</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-json" id="1731601745959.1206"><span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;typescript&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^3.5.3&quot;</span>
<span class="hljs-punctuation">}</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731601745959.1206')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si vous utilisez un <code>~</code> à la place de <code>^</code>, <code>npm</code> ne pourra télécharger que les versions @GT= 3.5.3 et @LT 3.6.0
Si vous n&#8217;utilisez aucune marque <code>npm</code> chargera la version spécifiée.</p>
</div>
<div class="paragraph">
<p>Il existe plusieurs autres possibilités et vous trouverez plus d&#8217;informations sur <a href="https://semver.org/" class="bare">https://semver.org/</a></p>
</div>
<div class="paragraph">
<p><code>npm</code> télécharge les librairies dans le répertoire <code>node_modules</code> de votre projet. Ce répertoire <code>node_modules</code> ne doit jamais être commité dans git car il peut être très volumineux et on préférera le réinstaller lors d&#8217;un clone d&#8217;un projet via</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731601745959.9614">npm install</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745959.9614')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_etape_2_installer_typescript">Etape 2 : Installer typescript</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Nous avons utilisé <code>npm</code> dans l&#8217;étape précédente pour installer TypeScript.</p>
</div>
<div class="paragraph">
<p>Nous pouvons personnaliser la configuration TypeScript en ajoutant un fichier <code>tsconfig.json</code>. Pour celà vous pouvez exécuter <code>./node_modules/.bin/tsc --init</code>. Les différentes valeurs possibles sont définies sur cette <a href="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html">page</a>.</p>
</div>
<div class="paragraph">
<p>Par exemple dans notre cas nous allons préciser plusieurs options de compilation</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-json" id="1731601745962.0212"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-comment">/* Specify ECMAScript target version: &#x27;ES3&#x27; (default). Here ES5 to be compatible with all web browsers */</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ES5&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-comment">/* Specify module code generation: &#x27;commonjs&#x27;, &#x27;amd&#x27;, &#x27;system&#x27;, &#x27;umd&#x27; or &#x27;es2015&#x27;. */</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;commonjs&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-comment">/* Specify library files to be included in the compilation:  */</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-string">&quot;esnext&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-string">&quot;dom&quot;</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-comment">/* We want to generate a sourcemap  */</span>
    <span class="hljs-attr">&quot;sourceMap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-comment">/* All files will be compiled in build directory  */</span>
    <span class="hljs-attr">&quot;outDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./build&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-string">&quot;src/**/*&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;node_modules&quot;</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731601745962.0212')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>En gros avec cette configuration, nous indiquons au compilateur de prendre les fichiers TypeScript dans le répertoire <code>src</code> et les compiler en EcmaScript 5 dans le répertoire <code>build  en utilisant @backtick@commonjs</code> comme gestionnaire de modules.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_etape_3_ecrire_du_code_en_typescript">Etape 3 : Ecrire du code en TypeScript</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Le système de types est la caractéristique essentielle du langage. Si vous avez une fonction</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-typescript" id="1731601745964.5159"><span class="hljs-title function_">great</span>(<span class="hljs-params">name: <span class="hljs-built_in">string</span></span>){
    <span class="hljs-keyword">return</span> <span class="hljs-meta">@backtick</span><span class="hljs-meta">@Hi</span>, <span class="hljs-meta">@dollar</span>@{name}<span class="hljs-meta">@backtick</span>@;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745964.5159')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>En Javascript vous pourriez écrire</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1731601745965.102"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">great</span>(<span class="hljs-number">123</span>));</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745965.102')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Mais en TypeScript le compilateur va retourner l&#8217;erreur "Argument type 123 is not assignable to type string". Dans les IDE vous allez avoir l&#8217;erreur au moment ou vous écrivez votre code (ceci évite bon nombre de bugs). TypeScript fait aussi de l&#8217;inférence de type. Dans le code ci dessous le langage déduit que le type de la variable <code>age</code> est un numérique et donc il va vous empêcher de lui attribuer une autre valeur. Vous aurez également une erreur de type sur la deuxième ligne</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-typescript" id="1731601745965.1604"><span class="hljs-keyword">let</span> age = <span class="hljs-number">42</span>;
age = <span class="hljs-string">&quot;inconnu&quot;</span>;</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745965.1604')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Nous allons créer deux fichiers dans <code>src/main/typescript</code>. Le premier <code>person.ts</code> contiendra la définition d&#8217;une interface <code>Person</code> (qui est exportée pour pouvoir l&#8217;utiliser dans d&#8217;autres fichiers). En TypeScript vous pouvez définir des <a href="https://www.typescriptlang.org/docs/handbook/interfaces.html">interfaces</a> et des types customs. Ceci est très pratique pour étendre le système de types. Nous définissons aussi une <a href="https://www.typescriptlang.org/docs/handbook/classes.html">classe</a>  <code>Greater</code> exposant une méthode pour saluer une personne</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-typescript" id="1731601745968.0828"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">Person</span> {
    <span class="hljs-attr">firstName</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">lastName</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">GreaterService</span> {
    <span class="hljs-title function_">great</span>(<span class="hljs-params">person: Person</span>){
        <span class="hljs-keyword">return</span> <span class="hljs-meta">@backtick</span><span class="hljs-meta">@Hi</span>, <span class="hljs-meta">@dollar</span>@{person.<span class="hljs-property">firstName</span>} <span class="hljs-meta">@dollar</span>@{person.<span class="hljs-property">lastName</span>}<span class="hljs-meta">@backtick</span>@;
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745968.0828')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez maintenant créer un second fichier <code>index.ts</code> dans lequel nous allons importer ce que nous venons de créer et l&#8217;appeler</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-typescript" id="1731601745970.6572"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">GreaterService</span>, <span class="hljs-title class_">Person</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./person&quot;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-attr">person</span>:<span class="hljs-title class_">Person</span> = {
    <span class="hljs-attr">firstName</span>: <span class="hljs-string">&#x27;Guillaume&#x27;</span>,
    <span class="hljs-attr">lastName</span>: <span class="hljs-string">&#x27;EHRET&#x27;</span>
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">GreaterService</span>().<span class="hljs-title function_">great</span>(person));</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745970.6572')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Il ne nous reste plus qu&#8217;à compiler (via <code>tsc</code>) notre projet et lancer <code>index.js</code> qui résulte de cette compilation (dans notre fichier de configuration TypeScript nous avon préciser que le répertoire de compilation était <code>build</code>).</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731601745970.0835">@dollar@ tsc
@dollar@ node build/index.js</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745970.0835')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Cet exemple est simpliste mais permet de voir rapidement comment le langage fonctionne. Pour démarrer sur TypeScript je vous conseille la <a href="https://www.typescriptlang.org/docs/home.html">documentation officielle</a> qui n&#8217;est pas trop mal faite à mon sens.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_etape_4_tester_notre_code_avec_jest">Etape 4 : Tester notre code avec Jest</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Il existe de nombreuses librairies pour écrire des tests de votre code JavaScript ou TypeScript. <a href="https://jestjs.io/">Jest</a> a été créé par Facebook pour ses projets <a href="https://reactjs.org/">React</a> et le but est d&#8217;être le plus simple possible tout en étant le plus performant. Au final vous pouvez utiliser Jest dans d&#8217;autres projets que des projets React et c&#8217;est ce que nous allons faire.</p>
</div>
<div class="paragraph">
<p>Nous allons écrire des tests unitaires pour vérifier le comportement de chaque partie de notre code. Quand une portion de code a des dépendances vers d&#8217;autres parties nous allons utiliser des mocks pour simuler le fonctionnement de ces dépendances.</p>
</div>
<div class="paragraph">
<p><strong>Comment installer Jest</strong></p>
</div>
<div class="paragraph">
<p>Nous devons installer le package principal et celui dédié à TypeScript</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731601745970.1624">npm install jest @types/jest ts-jest -D</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745970.1624')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour paramétrer Jest nous allons utiliser le client</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731601745970.9382">jest --init

✔ Would you like to use Jest when running &quot;test&quot; script in &quot;package.json&quot;? … yes
✔ Choose the test environment that will be used for testing › node
✔ Do you want Jest to add coverage reports? … yes
✔ Automatically clear mock calls and instances between every test? … yes


✏️  Modified /home/devmind/Workspace/web/dev-mind.fr/package.json
📝  Configuration file created at /home/devmind/Workspace/web/dev-mind.fr/jest.config.js</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745970.9382')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Jest a été conçu pour exécuter par défaut du JavaScript. Pour paramétrer vos tests en TypeScript vous allez devoir modifier le fichier de configuration <code>jest.config.js</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-json" id="1731601745971.8345"><span class="hljs-punctuation">[</span>source<span class="hljs-punctuation">,</span> shell<span class="hljs-punctuation">,</span> subs=<span class="hljs-string">&quot;none&quot;</span><span class="hljs-punctuation">]</span>
transform<span class="hljs-punctuation">:</span>  <span class="hljs-punctuation">{</span>
<span class="hljs-attr">&quot;\\.(ts)@dollar@&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ts-jest&quot;</span>
<span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731601745971.8345')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si vous voulez lancer les tests via <code>yarn test</code> ou <code>npm run test</code> vous pouvez modifier votre fichier <code>package.json</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-json" id="1731601745972.3643"><span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;jest&quot;</span>
<span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731601745972.3643')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p><strong>Utiliser Jest</strong></p>
</div>
<div class="paragraph">
<p>Nous allons tester le code typescript que nous avons écrit plus haut. Pour celà créons <code>person.spec.ts</code> dans le répertoire <code>src/test/typescript</code>. La syntaxe jasmine est disponible si vous souhaitez par exemple migrer votre suite de tests existantes. Mais les <a href="https://jestjs.io/docs/en/using-matchers">assertions</a> sont légéèrement différentes</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-typescript" id="1731601745975.1301"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">GreaterService</span>, <span class="hljs-title class_">Person</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../../main/typescript/person&quot;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Test person.ts&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">let</span> <span class="hljs-attr">service</span>: <span class="hljs-title class_">GreaterService</span>;

    <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> service = <span class="hljs-keyword">new</span> <span class="hljs-title class_">GreaterService</span>());

    <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;should say&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-attr">person</span>: <span class="hljs-title class_">Person</span> = {
            <span class="hljs-attr">firstName</span>: <span class="hljs-string">&#x27;Guillaume&#x27;</span>,
            <span class="hljs-attr">lastName</span>: <span class="hljs-string">&#x27;EHRET&#x27;</span>
        };
        <span class="hljs-title function_">expect</span>(service.<span class="hljs-title function_">great</span>(person)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Hi, Guillaume EHRET&#x27;</span>);
    })
});</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745975.1301')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez maintenant la lancer la commande <code>jest</code> pour exécuter vos tests. Jest permet aussi de <a href="https://jestjs.io/docs/en/mock-functions.html">mocker</a> les dépendances d&#8217;une classe. Vous pouvez également appeler du code <a href="https://jestjs.io/docs/en/asynchronous">asynchrone</a> dans vos tests.</p>
</div>
<div class="paragraph">
<p><strong>Couverture du code par les tests</strong></p>
</div>
<div class="paragraph">
<p>Jest comprend tout ce qu&#8217;il faut pour vérifier que votre code est bien tester. Vous pouvez ajouter l&#8217;option <code>--coverage</code> ppour générer un rapport</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731601745976.1816">devmind@devmind:~/Workspace/web/myproject@dollar@ jest --coverage
PASS  src/test/typescript/person.spec.ts
Test person.ts
✓ should say (4ms)

-----------|----------|----------|----------|----------|-------------------|
File       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------|----------|----------|----------|----------|-------------------|
All files  |      100 |      100 |      100 |      100 |                   |
person.ts  |      100 |      100 |      100 |      100 |                   |
-----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.358s, estimated 2s
Ran all test suites.</code><button class="btn-copy-code" onclick="copyToClipboard('1731601745976.1816')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Vous pouvez donc maintenant commencer à coder en <a href="https://www.typescriptlang.org/docs/home.html">TypeScript</a> et tester votre code avec Jest. Je vous ai laissé les différents points d&#8217;entrée si vous voulez aller plus loin.</p>
</div>
<div class="paragraph">
<p>Au niveau des tests unitaires <a href="https://jestjs.io/">Jest</a> est beaucoup plus rapide que Karma car les tests ne sont pas lancés dans un navigateur headless ou non</p>
</div>
<div class="paragraph">
<p>Si vous voulez plus d&#8217;infos vous pouvez consulter ce repo <a href="https://gitlab.com/javamind/typescript-starter">Gitlab</a></p>
</div>
</div>
</div>`;