export const _application_web_typescript:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_etape_1_mettre_en_place_un_serveur_web">Etape 1 : Mettre en place un serveur web</a></li>
<li><a class="link" fragment="#_etape_2_servir_des_ressources_statiques">Etape 2 : Servir des ressources statiques</a></li>
<li><a class="link" fragment="#_etape_3_une_classe_pour_gérer_nos_données">Etape 3 : Une classe pour gérer nos données</a></li>
<li><a class="link" fragment="#_etape_4_mettre_en_place_des_règles_de_routage_et_un_système_de_templating">Etape 4 : Mettre en place des règles de routage et un système de templating</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_template_de_pages">Template de pages</a></li>
<li><a class="link" fragment="#_routes">Routes</a></li>
<li><a class="link" fragment="#_mise_à_jour_de_la_configuration">Mise à jour de la configuration</a></li>
<li><a class="link" fragment="#_créer_todoroute">Créer TodoRoute</a></li>
<li><a class="link" fragment="#_les_templates_handlebars">Les templates handlebars</a></li>
</ul>
</li>
<li><a class="link" fragment="#_conclusion">Conclusion</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Nous avons vu dans l&#8217;<a href="https://dev-mind.fr/blog/2019/start_typescript_project_and_test_with_jest.html">article précédent</a>, comment démarrer un nouveau projet en TypeScript et le tester avec Jest. Essayons d&#8217;aller plus loin et de mettre en place une application web.</p>
</div>
<div class="paragraph">
<p>Pour illustrer cet article, nous allons mettre en place une application permettant de gérer une liste de tâches à faire (todo list). Le code illustrant cet article est disponible sous <a href="https://gitlab.com/javamind/typescript-web">Gitlab</a>.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/web_typescript0.png" alt="Webapp en TypeScript">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_etape_1_mettre_en_place_un_serveur_web">Etape 1 : Mettre en place un serveur web</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Ma solution se base sur <a href="https://expressjs.com/fr/">ExpressJS</a>. Pour plus d&#8217;informations, vous pouvez lire <a href="https://dev-mind.fr/blog/2018/objectif_clever_cloud_js.html">mon article</a>, dans lequel j&#8217;explique comment démarrer avec <a href="https://expressjs.com/fr/">ExpressJS</a>, comment le configurer pour la production et comment déployer votre application sur <a href="https://www.clever-cloud.com/en/">Clever Cloud</a>. Aujourd&#8217;hui le but est de reprendre la même chose mais en TypeScript.</p>
</div>
<div class="paragraph">
<p>Commençons par le début : créons un serveur ExpressJs et créons un handler de requête qui affichera un message <code>Hello World</code>.</p>
</div>
<div class="paragraph">
<p>On initie le projet en créant l&#8217;arborescence, et en lançant le client <code>npm</code> pour configurer notre nouveau projet <a href="https://nodejs.org/en/">NodeJS</a></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1755673436018.668">mkdir -p myproject/src/main/typescript
mkdir -p myproject/src/test/typescript
cd myproject
npm init</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436018.668')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Nous pouvons maintenant installer les dépendances avec <code>npm</code>.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1755673436018.5557">npm install typescript
npm install express @types/express serve-static
npm install errorhandler @types/errorhandler express-handlebars @types/express-handlebars</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436018.5557')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour information nous chargeons aussi les fichiers descriptor TypeScript (<code>@types/&#8230;&#8203;</code>) qui permettent d&#8217;utiliser des sources JavaScript dans votre projet. Ces fichiers décrivent les types, les classes et les méthodes utilisées dans un fichier JavaScript. Ainsi le compilateur peut trouver les différents types définis dans les librairies JS, les IDEs peuvent proposer de la complétion&#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>Configurons maintenant TypeScript. Lançons la commande <code>./node_modules/.bin/tsc --init</code> pour initialiser un fichier <code>tsconfig.json</code>. Le contenu du fichier peut être recopié de l&#8217;<a href="https://dev-mind.fr/blog/2019/start_typescript_project_and_test_with_jest.html">article précédent</a>.</p>
</div>
<div class="paragraph">
<p>Nous allons créer une classe qui représentera notre application Express dans le fichier <code>express.ts</code> et le répertoire <code>src/main/typescript</code>. Nous créons aussi une interface qui décrit les paramètres attendus par notre classe</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-typescript" id="1755673436023.7212"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> errorHandler = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;errorhandler&quot;</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ServerOptions</span> {
    <span class="hljs-comment">// Path contenant toutes les ressources statiques (css, js...)</span>
    <span class="hljs-attr">static</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-comment">// Port de votre serveur</span>
    <span class="hljs-attr">port</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Express</span> {

    <span class="hljs-keyword">public</span> <span class="hljs-attr">app</span>: express.<span class="hljs-property">Application</span>;

    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">public</span> options: ServerOptions</span>) {
        <span class="hljs-comment">//create expressjs application</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">app</span> = <span class="hljs-title function_">express</span>();
        <span class="hljs-comment">//configure application</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">config</span>();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">app</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;port&#x27;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-property">port</span>);
    }

    <span class="hljs-comment">/**
     * Configure application
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">config</span>(<span class="hljs-params"></span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">app</span>
            .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> res.<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Hello World!&#x27;</span>))
            .<span class="hljs-title function_">use</span>(<span class="hljs-title function_">errorHandler</span>());
    }

    <span class="hljs-comment">/**
     * Bootstrap the application.
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-title function_">bootstrap</span>(<span class="hljs-attr">options</span>: <span class="hljs-title class_">ServerOptions</span>): <span class="hljs-title class_">Express</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Try to start server&quot;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Express</span>(options);
    }

}</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436023.7212')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour le moment le contenu de cette classe est simplifiée et le but est d&#8217;enrichir la méthode <code>config()</code> au fur et à mesure de l&#8217;avancée de cet article. Dans ce premier exemple, nous avons défini un handler http associé à l&#8217;URL <code>/</code> et retournant <code>Hello World</code>.</p>
</div>
<div class="paragraph">
<p>Nous pouvons maintenant créer un fichier <code>app.ts</code> qui sera utilisé pour démarrer notre serveur (le mettre au même niveau)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-typescript" id="1755673436024.6223"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">Express</span>, <span class="hljs-title class_">ServerOptions</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./express&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> http <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;http&#x27;</span>;

<span class="hljs-keyword">const</span> options = {
    <span class="hljs-attr">static</span>: <span class="hljs-meta">@backtick</span><span class="hljs-meta">@src</span>/main/<span class="hljs-keyword">static</span><span class="hljs-meta">@backtick</span>@,
    <span class="hljs-attr">port</span>: <span class="hljs-number">8081</span>
} <span class="hljs-keyword">as</span> <span class="hljs-title class_">ServerOptions</span>;

<span class="hljs-keyword">const</span> server = <span class="hljs-title class_">Express</span>.<span class="hljs-title function_">bootstrap</span>(options).<span class="hljs-property">app</span>;

http.<span class="hljs-title function_">createServer</span>(server)
    .<span class="hljs-title function_">listen</span>(options.<span class="hljs-property">port</span>)
    .<span class="hljs-title function_">on</span>(<span class="hljs-string">&quot;listening&quot;</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">debug</span>(<span class="hljs-string">&#x27;Listening on &#x27;</span> + options.<span class="hljs-property">port</span>));</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436024.6223')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour simplifier le lancement de l&#8217;application, la propriété <code>script</code> du fichier <code>package.json</code> peut contenir une entrée <code>start</code> qui lancera la compilation TypeScript via <code>tsc</code> et exécutera le fichier JS compilé</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-json" id="1755673436024.8206"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;devmind-typescript&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;start&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc; node ./build/app.js&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-comment">// ...</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span></code><button class="btn-copy-code" onclick="copyToClipboard('1755673436024.8206')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Gràce à ce nouveau paramétrage, l&#8217;application peut être lancée via la commande <code>npm run start</code>. Vous pouvez tester : un message <code>Listening on 8081</code> doit s&#8217;afficher dans la concole et l&#8217;URL <code><a href="http://localhost:8081/" class="bare">http://localhost:8081/</a></code> retourne un message <code>Hello world</code>.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_etape_2_servir_des_ressources_statiques">Etape 2 : Servir des ressources statiques</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Un site web a souvent besoin de servir des ressources statiques : des fichiers HTML, JavaScript, CSS&#8230;&#8203; Nous allons modifier la configuration de notre serveur pour que les ressources du répertoire <code>src/main/static</code> soient exposées. Notez que nous avons défini plus haut ce chemin dans l&#8217;interface de configuration <code>ServerOptions</code>.</p>
</div>
<div class="paragraph">
<p>Modifions la méthode <code>config()</code> de notre classe Express</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-typescript" id="1755673436024.076"><span class="hljs-variable language_">this</span>.<span class="hljs-property">app</span>
  .<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">static</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-property">static</span>))
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> res.<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Hello World!&#x27;</span>))
  .<span class="hljs-title function_">use</span>(<span class="hljs-title function_">errorHandler</span>());</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436024.076')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour améliorer la mise en forme des pages de l&#8217;application, nous téléchargeons <a href="https://getbootstrap.com/docs/4.3/getting-started/download/">Bootstrap</a> dans <code>src/main/static</code>. Ces ressources CSS peuvent être utilisées dans une page <code>hello.html</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1755673436024.2744">@LThtml@GT
@LThead@GT
    @LTlink rel=&quot;stylesheet&quot; href=&quot;css/bootstrap.min.css&quot;@GT
@LT/head@GT
@LTbody@GT
    @LTh1@GTHello TypeScript@LT/h1@GT
@LT/body@GT
@LT/html@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436024.2744')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_etape_3_une_classe_pour_gérer_nos_données">Etape 3 : Une classe pour gérer nos données</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Dans un futur article je vous expliquerai comment utiliser une base de données. Pour le moment nous allons gérer les données d&#8217;une manière triviale et proposer un DAO qui gérera une liste de données en mémoire</p>
</div>
<div class="paragraph">
<p>Créons un fichier <code>todo.dao.ts</code> qui contiendra le type <code>Todo</code> (tâche à faire), objet de base de notre application. Les données seront stockées pour notre exemple en mémoire dans un tableau <code>TODO_DATA</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-typescript" id="1755673436025.254"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">Todo</span> {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">checked</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">let</span> sequence = <span class="hljs-number">1</span>;
<span class="hljs-keyword">const</span> <span class="hljs-attr">TODO_DATA</span>: <span class="hljs-title class_">Todo</span>[] = [
    {<span class="hljs-attr">id</span>: sequence++, <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Ecrire un article&#x27;</span>, <span class="hljs-attr">checked</span>: <span class="hljs-literal">true</span>},
    {<span class="hljs-attr">id</span>: sequence++, <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Veille techno sur TypeScript&#x27;</span>, <span class="hljs-attr">checked</span>: <span class="hljs-literal">false</span>},
    {<span class="hljs-attr">id</span>: sequence++, <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Voir la dernière release de ExpressJS&#x27;</span>, <span class="hljs-attr">checked</span>: <span class="hljs-literal">false</span>}
];</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436025.254')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>La classe permettant de manipuler les données peut avoir cette forme</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-typescript" id="1755673436026.4124"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">TodoDao</span> {

    <span class="hljs-title function_">findAll</span>(): <span class="hljs-title class_">Todo</span>[] {
        <span class="hljs-keyword">return</span> <span class="hljs-variable constant_">TODO_DATA</span>;
    }

    <span class="hljs-title function_">findById</span>(<span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>): <span class="hljs-title class_">Todo</span> {
        <span class="hljs-keyword">const</span> todos = <span class="hljs-variable constant_">TODO_DATA</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">elt</span> =&gt;</span> elt.<span class="hljs-property">id</span> === id);
        <span class="hljs-keyword">return</span> todos.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span> ? todos[<span class="hljs-number">0</span>] : <span class="hljs-literal">undefined</span>;
    }

    <span class="hljs-title function_">save</span>(<span class="hljs-attr">todo</span>: <span class="hljs-title class_">Todo</span>): <span class="hljs-title class_">Todo</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-attr">updated</span>: <span class="hljs-title class_">Todo</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findById</span>(todo.<span class="hljs-property">id</span>) || {<span class="hljs-attr">id</span>: ++sequence} <span class="hljs-keyword">as</span> <span class="hljs-title class_">Todo</span>;
        updated.<span class="hljs-property">label</span> = todo.<span class="hljs-property">label</span>;
        updated.<span class="hljs-property">checked</span> = todo.<span class="hljs-property">checked</span> !== <span class="hljs-literal">undefined</span>;
        <span class="hljs-keyword">if</span> (!<span class="hljs-variable constant_">TODO_DATA</span>.<span class="hljs-title function_">find</span>(<span class="hljs-function"><span class="hljs-params">elt</span> =&gt;</span> elt.<span class="hljs-property">id</span> === todo.<span class="hljs-property">id</span>)){
            <span class="hljs-variable constant_">TODO_DATA</span>.<span class="hljs-title function_">push</span>(updated);
        }
        <span class="hljs-keyword">return</span> updated;
    }

    <span class="hljs-title function_">deleteById</span>(<span class="hljs-params">id: <span class="hljs-built_in">number</span></span>) {
        <span class="hljs-keyword">const</span> index = <span class="hljs-variable constant_">TODO_DATA</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">elt</span> =&gt;</span> elt.<span class="hljs-property">id</span>).<span class="hljs-title function_">indexOf</span>(id);
        <span class="hljs-keyword">if</span> (index &gt;= <span class="hljs-number">0</span>) {
            <span class="hljs-variable constant_">TODO_DATA</span>.<span class="hljs-title function_">splice</span>(index, <span class="hljs-number">1</span>);
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436026.4124')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_etape_4_mettre_en_place_des_règles_de_routage_et_un_système_de_templating">Etape 4 : Mettre en place des règles de routage et un système de templating</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Il est temps d&#8217;aller plus loin et de paramétrer des routes et des templates de page.</p>
</div>
<div class="sect2">
<h3 id="_template_de_pages">Template de pages</h3>
<div class="paragraph">
<p>Quand nous créons une application nous ne voulons pas dupliquer la structuration des pages HTML (headers, footer, mise en forme générale&#8230;&#8203;.). Nous voulons aussi par exemple passer des valeurs dynamiques : par exemple envoyer une liste d&#8217;éléments à une page pour afficher le détail.</p>
</div>
<div class="paragraph">
<p>La solution est d&#8217;utiliser un sytème de template. Dans cet exemple nous utiliserons <a href="https://handlebarsjs.com/">handlebars</a>.</p>
</div>
</div>
<div class="sect2">
<h3 id="_routes">Routes</h3>
<div class="paragraph">
<p>Nous allons aussi mettre en place un sytème de routage "intelligent" permettant de naviguer dans l&#8217;application. Le système de routage est aussi capable d&#8217;aller récupérer des arguments dans les URL. Pour chaque route vous pouvez donner la méthode HTTP (GET, POST&#8230;&#8203;) qui l&#8217;active.</p>
</div>
<div class="paragraph">
<p>Dans notre exemple, nous allons mettre en place ce sytème de routes.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>GET <code>/todos</code> renverra la liste des todos</p>
</li>
<li>
<p>GET <code>/todos/:id</code> affichera le détail du todo ayant l&#8217;identifiant <code>id</code></p>
</li>
<li>
<p>POST <code>/todos/:id/delete</code> supprimera le todo ayant l&#8217;identifiant <code>id</code></p>
</li>
<li>
<p>GET <code>/todos/create</code> affichera</p>
</li>
<li>
<p>POST <code>/todos</code> permettra de créer un nouveau todo</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Nous n&#8217;utilisons que les méthodes GET et POST car nous n&#8217;allons faire que des formulaires HTML et en HTML, ce sont les seules méthodes acceptées par la balise <code>@LTform@GT</code>.</p>
</div>
</div>
<div class="sect2">
<h3 id="_mise_à_jour_de_la_configuration">Mise à jour de la configuration</h3>
<div class="paragraph">
<p>Modifions notre configuration Express (la classe TodoRoute sera créée plus tard)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-typescript" id="1755673436027.3057"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> handlebars <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express-handlebars&#x27;</span>;
<span class="hljs-keyword">import</span> errorHandler = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;errorhandler&quot;</span>);
<span class="hljs-keyword">import</span> {<span class="hljs-title class_">TodoRoute</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./todo.route&quot;</span>;
<span class="hljs-keyword">import</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;body-parser&quot;</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Express</span> {

  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">public</span> <span class="hljs-title function_">config</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> router = express.<span class="hljs-title class_">Router</span>();

    <span class="hljs-title class_">TodoRoute</span>.<span class="hljs-title function_">create</span>(router);

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">app</span>
        .<span class="hljs-title function_">engine</span>(<span class="hljs-string">&#x27;handlebars&#x27;</span>, <span class="hljs-title function_">handlebars</span>())
        .<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;view engine&#x27;</span>, <span class="hljs-string">&#x27;handlebars&#x27;</span>)
        .<span class="hljs-title function_">enable</span>(<span class="hljs-string">&#x27;view cache&#x27;</span>)
        .<span class="hljs-title function_">enable</span>(<span class="hljs-string">&#x27;trust proxy&#x27;</span>)
        .<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;views&#x27;</span>, <span class="hljs-meta">@backtick</span>@<span class="hljs-meta">@dollar</span>@{__dirname}/../src/main/views/<span class="hljs-meta">@backtick</span>@)
        .<span class="hljs-title function_">use</span>(<span class="hljs-title function_">bodyParser</span>())
        .<span class="hljs-title function_">use</span>(router)
        .<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">static</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">options</span>.<span class="hljs-property">static</span>))
        .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> res.<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Hello World!&#x27;</span>))
        .<span class="hljs-title function_">use</span>(<span class="hljs-title function_">errorHandler</span>());
  }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436027.3057')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p><code>handlebars</code> est configurer pour aller chercher les templates de pages dans le répertoire <code>src/main/views</code>.</p>
</li>
<li>
<p>bodyParser() permet à Express de parser les requêtes HTTP pour lire les paramètres envoyés dans le corps de la requête</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_créer_todoroute">Créer TodoRoute</h3>
<div class="paragraph">
<p>Nous devons maintenant créer nos premières routes. Elle seront définies dans le fichier <code>todo.route.ts</code> dans le répertoire <code>src/main/typescript</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-typescript" id="1755673436030.9065"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">Request</span>, <span class="hljs-title class_">Response</span>, <span class="hljs-title class_">Router</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;express&quot;</span>;
<span class="hljs-keyword">import</span> {<span class="hljs-title class_">Todo</span>, <span class="hljs-title class_">TodoDao</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./todo.dao&quot;</span>;


<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">TodoRoute</span>{

    <span class="hljs-attr">dao</span>:<span class="hljs-title class_">TodoDao</span>;

    <span class="hljs-title function_">constructor</span>(<span class="hljs-params">dao: TodoDao</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">dao</span> = dao;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-title function_">create</span>(<span class="hljs-params">router: Router</span>) {
        <span class="hljs-keyword">const</span> route = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TodoRoute</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">TodoDao</span>());
        router.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;/todos&quot;</span>, <span class="hljs-function">(<span class="hljs-params">req: Request, res: Response</span>) =&gt;</span> route.<span class="hljs-title function_">findAll</span>(req, res));
        router.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;/todos/:id&quot;</span>, <span class="hljs-function">(<span class="hljs-params">req: Request, res: Response</span>) =&gt;</span> route.<span class="hljs-title function_">findById</span>(req, res, (req.<span class="hljs-property">params</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">id</span>));
        router.<span class="hljs-title function_">post</span>(<span class="hljs-string">&quot;/todos/:id/delete&quot;</span>, <span class="hljs-function">(<span class="hljs-params">req: Request, res: Response</span>) =&gt;</span> route.<span class="hljs-title function_">deleteById</span>(req, res, (req.<span class="hljs-property">params</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">id</span>));
        router.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;/todos/create&quot;</span>, <span class="hljs-function">(<span class="hljs-params">req: Request, res: Response</span>) =&gt;</span> route.<span class="hljs-title function_">findById</span>(req, res, <span class="hljs-literal">undefined</span>));
        router.<span class="hljs-title function_">post</span>(<span class="hljs-string">&quot;/todos&quot;</span>, <span class="hljs-function">(<span class="hljs-params">req: Request, res: Response</span>) =&gt;</span> route.<span class="hljs-title function_">save</span>(req, res, req.<span class="hljs-property">body</span>));
    }

    <span class="hljs-keyword">private</span> <span class="hljs-title function_">viewOne</span>(<span class="hljs-params">req: Request, res: Response, todo:Todo</span>){
        res.<span class="hljs-property">locals</span>[<span class="hljs-string">&#x27;title&#x27;</span>] = todo.<span class="hljs-property">id</span> ? <span class="hljs-string">&#x27;Modification Todo&#x27;</span> : <span class="hljs-string">&#x27;Ajout Todo&#x27;</span>;
        res.<span class="hljs-property">locals</span>[<span class="hljs-string">&#x27;todo&#x27;</span>] = <span class="hljs-variable language_">this</span>.<span class="hljs-property">dao</span>.<span class="hljs-title function_">findById</span>(todo.<span class="hljs-property">id</span>) || {} <span class="hljs-keyword">as</span> <span class="hljs-title class_">Todo</span>;
        res.<span class="hljs-title function_">render</span>(<span class="hljs-string">&#x27;todo_view&#x27;</span>);
    }

    <span class="hljs-keyword">private</span> <span class="hljs-title function_">viewAll</span>(<span class="hljs-params">req: Request, res: Response, todos:Todo[]</span>){
        res.<span class="hljs-property">locals</span>[<span class="hljs-string">&#x27;title&#x27;</span>] = <span class="hljs-string">&#x27;Liste des todos&#x27;</span>;
        res.<span class="hljs-property">locals</span>[<span class="hljs-string">&#x27;todos&#x27;</span>] = todos;
        res.<span class="hljs-title function_">render</span>(<span class="hljs-string">&#x27;todo_list_view&#x27;</span>);
    }

    <span class="hljs-keyword">private</span> <span class="hljs-title function_">findAll</span>(<span class="hljs-params">req: Request, res: Response</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">viewAll</span>(req, res, <span class="hljs-variable language_">this</span>.<span class="hljs-property">dao</span>.<span class="hljs-title function_">findAll</span>());
    }

    <span class="hljs-keyword">private</span> <span class="hljs-title function_">findById</span>(<span class="hljs-params">req: Request, res: Response, id: <span class="hljs-built_in">number</span></span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">viewOne</span>(req, res, <span class="hljs-variable language_">this</span>.<span class="hljs-property">dao</span>.<span class="hljs-title function_">findById</span>(id) || {} <span class="hljs-keyword">as</span> <span class="hljs-title class_">Todo</span>);
    }

    <span class="hljs-keyword">private</span> <span class="hljs-title function_">deleteById</span>(<span class="hljs-params">req: Request, res: Response, id: <span class="hljs-built_in">number</span></span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">dao</span>.<span class="hljs-title function_">deleteById</span>(id);
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findAll</span>(req, res);
    }

    <span class="hljs-keyword">private</span> <span class="hljs-title function_">save</span>(<span class="hljs-params">req: Request, res: Response, todo: Todo</span>) {
        <span class="hljs-keyword">if</span>(!todo.<span class="hljs-property">label</span>){
            res.<span class="hljs-property">locals</span>[<span class="hljs-string">&#x27;errors&#x27;</span>] = {
                <span class="hljs-attr">has</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Le libellé est obligatoire&#x27;</span>
            };
            <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">viewOne</span>(req, res, todo);
        }
        <span class="hljs-keyword">else</span>{
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">dao</span>.<span class="hljs-title function_">save</span>(todo);
            <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findAll</span>(req, res);
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436030.9065')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Dans la première partie, nous créons les associations entre les méthodes HTTP, les chemins et les méthodes qui vont gérér l&#8217;affichage.</p>
</div>
<div class="paragraph">
<p>Les méthodes <code>view&#8230;&#8203;</code> permettent d&#8217;afficher un template <code>handlebar</code> via la méthode render. Pour envoyer des paramètres à ce template nous ajoutons des valeurs dans le tableau <code>res.locals</code> de l&#8217;objet <code>response</code> (correspond à la réponse HTTP qui sera retournée par le serveur).</p>
</div>
<div class="paragraph">
<p>Les autres méthodes font simplement appel à notre DAO défini plus haut.</p>
</div>
</div>
<div class="sect2">
<h3 id="_les_templates_handlebars">Les templates handlebars</h3>
<div class="paragraph">
<p>Dans la classe définie dans le paragraphe précédent, deux templates sont appelés : <code>todo_view</code> et <code>todo_list_view</code>. Les extensions des fichiers (<code>.handlebars</code>) n&#8217;ont pas besoin d&#8217;être précisées dans la classe <code>TodoRoute</code>.</p>
</div>
<div class="paragraph">
<p>Pour configurer <code>handlebars</code> un premier template <code>main.handlebars</code> définissant la structure générale de la page doit être créé dans le répertoire <code>src/main/views/layouts</code>.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1755673436030.428">@LT!DOCTYPE html@GT
@LThtml@GT
@LThead@GT
  @LTtitle@GT{{ title }}@LT/title@GT
  @LTlink rel=&quot;stylesheet&quot; href=&quot;/css/bootstrap.min.css&quot;@GT
@LT/head@GT
@LTbody@GT
  @LTdiv class=&quot;container&quot;@GT
    @LTh1@GT{{ title }}@LT/h1@GT
    @LThr@GT
    {{{body}}}
  @LT/div@GT
@LT/body@GT
@LT/html@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436030.428')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p><code>handlebars</code> utilise des moustaches <code>{{ &#8230;&#8203; }}</code> pour afficher le contenu de variables quand le template est compilé en HTML. <code>{{ title }}</code> est passé dans le code du routeur plus haut et <code>{{ body }}</code> fait référence au template à afficher. Par exemple quand on veut gérer la liste des todos, nous allons créer un fichier <code>todo_list_view.handlebars</code> dans le répertoire <code>src/main/views</code>.</p>
</div>
<div class="paragraph">
<p>Ce template peut avoir cette forme</p>
</div>
<div class="ulist">
<ul>
<li>
<p>un lien pour créer un nouveau todo</p>
</li>
<li>
<p>une itération sur la liste des todos passée en paramètre <code>{{#todos}}&#8230;&#8203;{{/todos}}</code></p>
</li>
<li>
<p>vérifier si une valeur est valorisée <code>{{#checked}}&#8230;&#8203;{{/checked}}</code> ou non valorisée <code>{{^checked}}&#8230;&#8203;{{/checked}}</code></p>
</li>
<li>
<p>des liens pour modifier ou supprimer des todos existants</p>
</li>
</ul>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1755673436030.2373">@LTa href=&quot;/todos/create&quot; class=&quot;btn btn-dark&quot;@GTCréer Todo@LT/a@GT
@LTbr@GT
@LTtable class=&quot;table&quot;@GT

    @LTthead@GT
    @LTtr@GT
        @LTth@GTLibellé@LT/th@GT
        @LTth width=&quot;25%&quot;@GTActions@LT/th@GT
    @LT/tr@GT
    @LT/thead@GT
    @LTtbody@GT
    {{#todos}}
        @LTtr@GT
            @LTtd@GT
                {{#checked}}@LTs@GT{{label}}@LT/s@GTAAA{{/checked}}
                {{^checked}}{{label}}{{/checked}}
            @LT/td@GT
            @LTtd@GT
                @LTform action=&quot;/todos/{{id}}/delete&quot; method=&quot;post&quot; onsubmit=&quot;return confirm(&#x27;Voulez vous vraiment supprimer ce todo ? &#x27;)&quot;@GT
                    @LTa href=&quot;/todos/{{id}}&quot; class=&quot;btn btn-dark&quot;@GT
                        Modifier
                    @LT/a@GT
                    @LTbutton class=&quot;btn btn-dark&quot;@GT
                        Supprimer
                    @LT/button@GT
                @LT/form@GT
            @LT/td@GT
        @LT/tr@GT
    {{/todos}}
    @LT/tbody@GT
@LT/table@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436030.2373')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Et le template pour modifier ou créer un nouveau Todo aura cette forme</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1755673436030.083">@LTform action=&quot;/todos&quot; method=&quot;post&quot;@GT
{{#errors.has}}
@LTdiv class=&quot;alert alert-danger&quot;@GTVous avez une erreur dans votre formulaire@LT/div@GT{{/errors.has}}

    @LTinput type=&quot;hidden&quot; name=&quot;id&quot; value=&quot;{{todo.id}}&quot;@GT

    @LTdiv class=&quot;form-group row&quot;@GT
        @LTlabel for=&quot;label&quot; class=&quot;col-sm-3 col-form-label&quot;@GTLibellé@LT/label@GT
        @LTdiv class=&quot;col-sm-9&quot;@GT
            @LTinput type=&quot;text&quot; placeholder=&quot;Libellé du todo&quot; name=&quot;label&quot; id=&quot;label&quot; value=&quot;{{todo.label}}&quot;
                   class=&quot;form-control {{#errors.label}}is-invalid{{/errors.label}}&quot;@GT
            @LTsmall class=&quot;invalid-feedback&quot;@GT{{errors.label}}@LT/small@GT
        @LT/div@GT
    @LT/div@GT
    @LTdiv class=&quot;form-group row&quot;@GT
        @LTlabel for=&quot;checked&quot; class=&quot;col-sm-3 col-form-label&quot;@GTTâche effectuée@LT/label@GT
        @LTdiv class=&quot;col-sm-9&quot;@GT
            @LTdiv class=&quot;form-check&quot;@GT
                @LTinput class=&quot;form-check-input&quot; type=&quot;checkbox&quot;  id=&quot;checked&quot; name=&quot;checked&quot;
                       {{#todo.checked}}checked{{/todo.checked}}@GT
            @LT/div@GT
        @LT/div@GT
    @LT/div@GT
    @LTdiv style=&quot;display: inline-flex&quot;@GT
        @LTbutton class=&quot;btn btn-dark&quot;@GTSave@LT/button@GT<span class="hljs-symbol">&amp;amp;</span>nbsp;<span class="hljs-symbol">&amp;amp;</span>nbsp;
        @LTa class=&quot;btn btn-outline-secondary&quot; href=&quot;/todos&quot;@GTCancel@LT/a@GT
    @LT/div@GT
@LT/form@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1755673436030.083')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez relancer votre serveur pour tester l&#8217;application.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/web_typescript1.png" alt="Ecran liste des todos">
</div>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/web_typescript2.png" alt="Modifier un todo">
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Cet article était un peu long mais j&#8217;ai essayé de vous montrer beaucoup de code. Comme je le disais plus haut, le code est disponible sous <a href="https://gitlab.com/javamind/typescript-web">Gitlab</a>.</p>
</div>
<div class="paragraph">
<p>J&#8217;espère vous avoir donné les bases pour démarrer une application web rapidement en TypeScript. Personnellement j&#8217;ai utilisé cette techno pour gérer ce site web. Le code est d&#8217;ailleurs libre si vous voulez vous en inspirer <a href="https://github.com/Dev-Mind/dev-mind.fr" class="bare">https://github.com/Dev-Mind/dev-mind.fr</a></p>
</div>
</div>
</div>`;