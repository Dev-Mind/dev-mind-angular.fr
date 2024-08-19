export const _objectif_clever_cloud_js:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Une application web est constituée de ressources, d&#8217;images, de fichiers JavaScript, de feuilles de styles&#8230;&#8203; Pour pouvoir répondre à des requêtes HTTP nous avons besoin d&#8217;un serveur Web. Les plus connus sont peut être <a href="http://httpd.apache.org/">Apache</a> et <a href="http://nginx.org/">nginx</a>. Souvent, nous avons besoin de coupler à nos sites, une application côté serveur (pour gérer la sécurité, stocker des données, lancer des traitements&#8230;&#8203;). Nous devons mettre en place un serveur d&#8217;application, qui jouera double rôle : serveur web gérant les ressources statiques et application effectuant des actions et générant des réponses à la volée en fonction des actions utilisateurs.</p>
</div>
<div class="paragraph">
<p>Dans cet article, j&#8217;explique comment écrire ce serveur en JS et comment déployer le tout sur <a href="https://www.clever-cloud.com">Clever Cloud</a>. Vous pouvez voir un exemple concret avec mon <a href="https://github.com/Dev-Mind/dev-mind.fr">site web</a>. Nous verrons également les aspects  sécurité et optimisation des performances.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/objectif_clever_cloud_00.png" alt="Conférence">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_serveur_application_javascript">Serveur application JavaScript</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Le JavaScript s&#8217;exécute sur une machine virtuelle qui est présente dans votre navigateur Internet. Quand on fait du JavaScript côté serveur, nous avons aussi besoin d&#8217;une machine virtuelle JavaScript. Nous pouvons utiliser la plateforme <a href="https://nodejs.org">Node.js</a> qui se base sur le moteur <a href="https://v8.dev/">V8</a> de Google Chrome. Il fournit également plusieurs librairies pour répondre aux besoins des développeurs côté serveur. Nous avons notamment l&#8217;intégration de la librairie <a href="https://nodejs.org/api/http.html">http</a> qui permet de gérer un serveur Web</p>
</div>
<div class="paragraph">
<p>Le code suivant permet de lancer un serveur sur le port 8080 et d&#8217;afficher un message <code>HelloWorld</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1724055770367.7761"><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;http&#x27;</span>);

<span class="hljs-comment">//create a server object which listens on port 8080</span>
http.<span class="hljs-title function_">createServer</span>((req, res) @<span class="hljs-variable constant_">ARROW</span> {
  <span class="hljs-comment">//write a response to the client</span>
  res.<span class="hljs-title function_">write</span>(<span class="hljs-string">&#x27;Hello World!&#x27;</span>);
  <span class="hljs-comment">//end the response</span>
  res.<span class="hljs-title function_">end</span>();
}).<span class="hljs-title function_">listen</span>(<span class="hljs-number">8080</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1724055770367.7761')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour lancer ce script (appelé par exemple <code>app.js</code>) vous pouvez lancer la commande et ensuite ouvrir http:localhost:8080 dans votre navigateur Internet</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1724055770367.6072">node app.js</code><button class="btn-copy-code" onclick="copyToClipboard('1724055770367.6072')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Le module <a href="https://nodejs.org/api/http.html">http</a> est un peu minimaliste. Quand nous voulons écrire une application nous avons besoin de plus de fonctionnalités. <a href="http://expressjs.com/">Express JS</a> fournit plusieurs utilitaires pour</p>
</div>
<div class="ulist">
<ul>
<li>
<p>étendre ce serveur <a href="https://nodejs.org/api/http.html">http</a>  de base</p>
</li>
<li>
<p>ajouter des routes et exécuter un traitement en fonction de cette route</p>
</li>
<li>
<p>servir des ressources statiques</p>
</li>
<li>
<p>facilement exécuter des traitements sur les requêtes entrantes et sortantes. En Java dans le monde des servlets, nous parlons de <code>filters</code>. En express nous utilisons plutôt le terme de <code>middlewares</code></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Modifiez le premier exemple de cette manière</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1724055770369.7715"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;express&#x27;</span>);

<span class="hljs-title function_">express</span>()
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, (req, res) @<span class="hljs-variable constant_">ARROW</span> res.<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Hello World!&#x27;</span>)) <span class="hljs-comment">// (1)</span>
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/users/:userName&#x27;</span>, (req, res) @<span class="hljs-variable constant_">ARROW</span> res.<span class="hljs-title function_">send</span>(@backtick@<span class="hljs-title class_">Hello</span> @dollar@{req.<span class="hljs-property">params</span>.<span class="hljs-property">userName</span>}!@backtick@)) <span class="hljs-comment">// (2)</span>
  .<span class="hljs-title function_">listen</span>(<span class="hljs-number">8085</span>); <span class="hljs-comment">// (3)</span></code><button class="btn-copy-code" onclick="copyToClipboard('1724055770369.7715')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1). le message <code>Hello World!</code> s&#8217;affiche quand vous lancez <code><a href="http://localhost:8085" class="bare">http://localhost:8085</a></code></p>
</li>
<li>
<p>(2). on peut récupérer des élements dans la route spécifiée. Ici on affichera <code>Hello Guillaume!</code> quand <code><a href="http://localhost:8085/users/Guillaume" class="bare">http://localhost:8085/users/Guillaume</a></code> sera utilisée</p>
</li>
<li>
<p>(3). permet de spécifier le port d&#8217;écoute</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Si vous voulez servir un répertoire contenant des ressources statiques (ressources CSS, JS, HTML&#8230;&#8203;) vous pouvez ajouter</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1724055770370.1873">.<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">static</span>(@backtick@build/dist@backtick@))</code><button class="btn-copy-code" onclick="copyToClipboard('1724055770370.1873')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_comment_assurer_les_performances_de_son_serveur_web">Comment assurer les performances de son serveur web</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Nous venons de voir comment paramétrer un serveur JS de base. Mais si vous voulez mettre votre application en production vous allez devoir en faire plus.</p>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>Si vous n&#8217;êtes pas familier avec les performances d&#8217;une application Web vous pouvez suivre <a href="https://www.dev-mind.fr/formation_optimiser.html">la formation Dev-Mind</a> ou suivre la vidéo de mon intervention à <a href="https://www.youtube.com/watch?time_continue=2&amp;v=9PRPPJFaF_o">Devoxx 2017</a>.</p>
</div>
</blockquote>
</div>
<div class="sect2">
<h3 id="_mesurer_les_performances">Mesurer les performances</h3>
<div class="paragraph">
<p>Si vous utilisez Chrome, vous pouvez utiliser Lighthouse qui est intégré aux ChromeDevTools (Ctrl+Shift+I)</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/objectif_clever_cloud_01.png" alt="Lighthouse">
</div>
</div>
<div class="paragraph">
<p>Lighthouse va analyser votre site sur mobile ou desktop et vous proposer des rapports de performance. Il vous indique ce qui est bon ou moins bon, et propose des chemins de résolution quand des problèmes sont détectés. Par exemple</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/objectif_clever_cloud_02.png" alt="Rapport Lighthouse">
</div>
</div>
<div class="paragraph">
<p>Il existe d&#8217;autres outils en ligne comme <a href="https://developers.google.com/speed/pagespeed/insights/">PageSpeed</a>, <a href="https://www.webpagetest.org/">WebpageTest</a>&#8230;&#8203;</p>
</div>
</div>
<div class="sect2">
<h3 id="_la_compression">La compression</h3>
<div class="paragraph">
<p>Le plus gros problème sur un site web est la taille des ressources. La taille moyenne des ressources utilisées sur une page, ne fait que grossir depuis des années. Pour limiter la quantité de données à envoyer, vous pouvez faire de la compression. Les pages HTML, CSS ou JS sont écrites au format texte qui est facilement compressable. De plus tous les navigateurs aujourd&#8217;hui acceptent des ressources compressées.</p>
</div>
<div class="paragraph">
<p>Pour activer la compression avec express.js, vous pouvez utiliser le middleware  <a href="https://www.npmjs.com/package/compression">compression</a></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1724055770374.384"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;express&#x27;</span>);
<span class="hljs-keyword">const</span> compression = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;compression&#x27;</span>);

<span class="hljs-title function_">express</span>()
  .<span class="hljs-title function_">use</span>(<span class="hljs-title function_">compression</span>())
  .<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">static</span>(@backtick@build/dist@backtick@))
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, (req, res) @<span class="hljs-variable constant_">ARROW</span> res.<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Hello World!&#x27;</span>))
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/users/:userName&#x27;</span>, (req, res) @<span class="hljs-variable constant_">ARROW</span> res.<span class="hljs-title function_">send</span>(@backtick@<span class="hljs-title class_">Hello</span> @dollar@{req.<span class="hljs-property">params</span>.<span class="hljs-property">userName</span>}!@backtick@))
  .<span class="hljs-title function_">listen</span>(<span class="hljs-number">8085</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1724055770374.384')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_le_cache">Le cache</h3>
<div class="paragraph">
<p>Comme le dit <a href="https://twitter.com/addyosmani">Addy Osmani</a>, la ressource web la plus optimisée est celle que l&#8217;on ne transfert pas du serveur au client web. Pour mettre en place cette magie, vous devez activer le cache de ressources, et donner des informations au navigateur sur la durée de validité de chaque fichier.</p>
</div>
<div class="paragraph">
<p>Voici par exemple la configuration utilisée sur mon site</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1724055770384.63"><span class="hljs-keyword">const</span> nocache = (res) @<span class="hljs-variable constant_">ARROW</span> {
  res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Cache-Control&#x27;</span>, <span class="hljs-string">&#x27;private, no-cache, no-store, must-revalidate&#x27;</span>);
  res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Expires&#x27;</span>, <span class="hljs-string">&#x27;-1&#x27;</span>);
  res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Pragma&#x27;</span>, <span class="hljs-string">&#x27;no-cache&#x27;</span>);
};

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CACHE_MIDDLEWARE</span> = (res, path) @<span class="hljs-variable constant_">ARROW</span> {
  <span class="hljs-keyword">switch</span>(serveStatic.<span class="hljs-property">mime</span>.<span class="hljs-title function_">lookup</span>(path)){
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;application/xhtml+xml&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;text/html&#x27;</span>:
      <span class="hljs-title function_">nocache</span>(res);
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;text/javascript&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;application/x-javascript&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;application/javascript&#x27;</span>:
      <span class="hljs-keyword">if</span>(path.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">&#x27;sw.js&#x27;</span>) @<span class="hljs-variable constant_">GT</span>= <span class="hljs-number">0</span>){
        <span class="hljs-title function_">nocache</span>(res);
      }
      <span class="hljs-keyword">else</span>{
        res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Cache-Control&#x27;</span>, <span class="hljs-string">&#x27;private, max-age=14400&#x27;</span>);
      }
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;text/css&#x27;</span>:
      <span class="hljs-keyword">if</span>(process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;prod&#x27;</span>){
        res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Cache-Control&#x27;</span>, <span class="hljs-string">&#x27;private, max-age=14400&#x27;</span>);
      }
      <span class="hljs-keyword">else</span>{
        <span class="hljs-title function_">nocache</span>(res);
      }
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;image/gif&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;image/jpg&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;image/jpeg&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;image/png&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;image/tiff&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;image/svg+xml&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;image/webp&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;image/vnd.microsoft.icon&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;image/icon&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;image/ico&#x27;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;image/x-ico&#x27;</span>:
      res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Cache-Control&#x27;</span>, <span class="hljs-string">&#x27;public, max-age=691200&#x27;</span>);
      <span class="hljs-keyword">break</span>;

    <span class="hljs-attr">default</span>:
  }
};</code><button class="btn-copy-code" onclick="copyToClipboard('1724055770384.63')">Copy</button></pre>
</div>
</div>
<div class="olist arabic small">
<ol class="arabic">
<li>
<p>il est important de ne pas mettre vos pages HTML en cache. Une page HTML est le point d&#8217;entrée de votre site et il est important que les utilisateurs puissent charger les dernières versions. Contrairement aux autres ressources, avec lesquelles vous pouvez faire du cache busting, le nom des pages HTML doit être fixe. Si ce n&#8217;est pas le cas, les robotos ne pourront pas indexé votre site. Pour optimiser le chargement vous pouvez passer par les services workers</p>
</li>
<li>
<p>pour le JS vous pouvez mettre une durée de cache de quelques heures. Par contre il est important de ne pas mettre de cache sur votre fichier de configuration des services workers. Ce fichier est très sensible et il vaut mieux que le navigateur essaie de le recharger tout le temps afin de récupérer les dernières mises à jour. Les services workers viennent avec un autre système de cache</p>
</li>
<li>
<p>en production plusieurs optimisations sont faites quand la variable d&#8217;environnement <code>NODE_ENV</code> a la valeur <code>prod</code>. Dans mon cas j&#8217;ajoute un cache sur les ressources CSS</p>
</li>
<li>
<p>pour les images vous pouvez mettre une durée de cache plus longue.</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>Avec Express.js vous pouvez indiquer dans la configuration, l&#8217;emplacement de vos ressources statiques et indiquer la politique de cache. Dans mon cas elles sont dans <code>build/dist</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1724055770385.0388">.<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">static</span>(@backtick@build/dist@backtick@, {<span class="hljs-attr">setHeaders</span>: <span class="hljs-variable constant_">CACHE_MIDDLEWARE</span>}))</code><button class="btn-copy-code" onclick="copyToClipboard('1724055770385.0388')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_autres_optimisations">Autres optimisations</h3>
<div class="paragraph">
<p>Pour plus d&#8217;informations vous pouvez suivre la <a href="http://expressjs.com/fr/advanced/best-practice-performance.html">page dédiée aux performances</a> de express.js. Vous pouvez aussi mettre en place des services workers. Si vous ne savez pas comment faire, vous pouvez suivre <a href="https://www.dev-mind.fr/blog/2017/workboxjs.html">cet article</a></p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_comment_sécuriser_son_serveur_web">Comment sécuriser son serveur web</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_connaître_les_problèmes">Connaître les problèmes</h3>
<div class="paragraph">
<p>Comme pour les performances, avant de faire quelque chose, il faut savoir qu&#8217;elles sont les problèmes de votre site. Je vous conseille d&#8217;utiliser le site de Mozilla <a href="https://observatory.mozilla.org/" class="bare">https://observatory.mozilla.org/</a>. Cet outil en ligne parse votre site et vérifie le paramétrage</p>
</div>
<div class="ulist">
<ul>
<li>
<p>des redirections</p>
</li>
<li>
<p>des cookies</p>
</li>
<li>
<p>de l&#8217;HTTPS</p>
</li>
<li>
<p>des différents headers</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Il existe plusieurs solutions pour simplifier cette configuration. Je suis parti sur le middleware <a href="https://github.com/helmetjs/helmet">helmet</a> qui</p>
</div>
<div class="ulist">
<ul>
<li>
<p>contrôle la prélecture DNS du navigateur (<a href="https://helmetjs.github.io/docs/dns-prefetch-control">dnsPrefetchControl</a>)</p>
</li>
<li>
<p>prémunit votre site du clickjacking (<a href="https://helmetjs.github.io/docs/frameguard/">frameguard</a>)</p>
</li>
<li>
<p>supprime l&#8217;en-tête X-Powered-By (<a href="https://helmetjs.github.io/docs/hide-powered-by">hidePoweredBy</a>)</p>
</li>
<li>
<p>contrôle HTTPS (<a href="https://helmetjs.github.io/docs/hsts/">hsts</a>)</p>
</li>
<li>
<p>définit les options de téléchargement pour IE8 (<a href="https://helmetjs.github.io/docs/ienoopen">ieNoOpen</a>)</p>
</li>
<li>
<p>empêche les clients de renifler le type MIME (<a href="https://helmetjs.github.io/docs/dont-sniff-mimetype">noSniff</a>)</p>
</li>
<li>
<p>ajoute quelques petites protections XSS (<a href="https://helmetjs.github.io/docs/xss-filter">xssFilter</a>)</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Par exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1724055770389.189"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;express&#x27;</span>);
<span class="hljs-keyword">const</span> helmet = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;helmet&#x27;</span>);

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">SECURITY_POLICY</span> = {
  <span class="hljs-attr">directives</span>: {
    <span class="hljs-attr">defaultSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
    <span class="hljs-comment">// We have to authorize inline CSS used to improve firstload</span>
    <span class="hljs-attr">styleSrc</span>: [<span class="hljs-string">&quot;&#x27;unsafe-inline&#x27;&quot;</span>, <span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
    <span class="hljs-comment">// We have to authorize data:... for SVG images</span>
    <span class="hljs-attr">imgSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>, <span class="hljs-string">&#x27;data:&#x27;</span>, <span class="hljs-string">&#x27;https:&#x27;</span>],
    <span class="hljs-comment">// We have to authorize inline script used to load our JS app</span>
    <span class="hljs-attr">scriptSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>, <span class="hljs-string">&quot;&#x27;unsafe-inline&#x27;&quot;</span>, <span class="hljs-string">&#x27;https://www.google-analytics.com/analytics.js&#x27;</span>,
      <span class="hljs-string">&quot;https://storage.googleapis.com/workbox-cdn/*&quot;</span>,
      <span class="hljs-string">&quot;https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-core.prod.js&quot;</span>]
  }
};

<span class="hljs-title function_">express</span>()
  .<span class="hljs-title function_">use</span>(<span class="hljs-title function_">helmet</span>())
  .<span class="hljs-title function_">use</span>(helmet.<span class="hljs-title function_">contentSecurityPolicy</span>(<span class="hljs-variable constant_">SECURITY_POLICY</span>))
  <span class="hljs-comment">// Reste de la config</span>
  .<span class="hljs-title function_">listen</span>(<span class="hljs-number">8085</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1724055770389.189')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez et vous devez encore aller plus loin. Si vous utilisez de l&#8217;authentification vous devez préciser comment les cookies seront gérés lorsqu&#8217;une session sera ouverte</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1724055770394.5327"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;express&#x27;</span>);
<span class="hljs-keyword">const</span> session = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;express-session&#x27;</span>);

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>()
  .<span class="hljs-title function_">enable</span>(<span class="hljs-string">&#x27;trust proxy&#x27;</span>)
  .<span class="hljs-title function_">use</span>(<span class="hljs-title function_">session</span>({
      <span class="hljs-attr">secret</span>: <span class="hljs-string">&#x27;zezaeazezaeza&#x27;</span>,
      <span class="hljs-comment">// A session life is 3h</span>
      <span class="hljs-attr">duration</span>: <span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>,
      <span class="hljs-comment">// We don&#x27;t authorize a session resave</span>
      <span class="hljs-attr">resave</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">saveUninitialized</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// Secured cookies are only set in production</span>
      <span class="hljs-attr">cookie</span>: {
        <span class="hljs-attr">secure</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;prod&#x27;</span>,
        <span class="hljs-attr">maxAge</span>: <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>,
        <span class="hljs-attr">sameSite</span>: <span class="hljs-literal">true</span>
      },
      <span class="hljs-comment">// User by default is empty</span>
      <span class="hljs-attr">user</span>: {}
    })
  <span class="hljs-comment">// Reste de la config</span>
  .<span class="hljs-title function_">listen</span>(<span class="hljs-number">8085</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1724055770394.5327')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez aussi réorienter les utilisateurs qui n&#8217;utilisent pas le HTTPS, paramétrer le CORS, ouvrir une page 404 quand un utilisateur essaye d&#8217;accéder à une mauvaise ressource</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1724055770404.4744"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;express&#x27;</span>);

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>()
  .<span class="hljs-title function_">enable</span>(<span class="hljs-string">&#x27;trust proxy&#x27;</span>)
  <span class="hljs-comment">// Reorientation pour ceux qui ne font pas de HTTPS</span>
  .<span class="hljs-title function_">use</span>((req, res, next) @<span class="hljs-variable constant_">ARROW</span> {
         <span class="hljs-keyword">const</span> httpInForwardedProto = req.<span class="hljs-property">headers</span> &amp;amp;&amp;amp; req.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;x-forwarded-proto&#x27;</span>] &amp;amp;&amp;amp; req.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;x-forwarded-proto&#x27;</span>] === <span class="hljs-string">&#x27;http&#x27;</span>;
         <span class="hljs-keyword">const</span> httpInReferer = req.<span class="hljs-property">headers</span> &amp;amp;&amp;amp; req.<span class="hljs-property">headers</span>.<span class="hljs-property">referer</span> &amp;amp;&amp;amp; req.<span class="hljs-property">headers</span>.<span class="hljs-property">referer</span>.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">&#x27;http://&#x27;</span>) @<span class="hljs-variable constant_">GT</span>=<span class="hljs-number">0</span>;
         <span class="hljs-keyword">const</span> isHtmlPage = req.<span class="hljs-property">url</span>.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">&quot;.html&quot;</span>) @<span class="hljs-variable constant_">GT</span>= <span class="hljs-number">0</span>;

         <span class="hljs-keyword">if</span>((isHtmlPage || req.<span class="hljs-property">url</span> === <span class="hljs-string">&#x27;/&#x27;</span>)  &amp;amp;&amp;amp; (httpInForwardedProto || httpInReferer)){
           <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;User is not in HTTP, he is redirected&#x27;</span>);
           res.<span class="hljs-title function_">redirect</span>(<span class="hljs-string">&#x27;https://dev-mind.fr&#x27;</span> + req.<span class="hljs-property">url</span>);
         }
         <span class="hljs-keyword">else</span>{
           <span class="hljs-title function_">next</span>();
         }
     })
  <span class="hljs-comment">// Paramétrage CORS</span>
  <span class="hljs-title function_">use</span>((req, res, next) @<span class="hljs-variable constant_">ARROW</span> {
          res.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;Access-Control-Allow-Origin&#x27;</span>, <span class="hljs-string">&#x27;*&#x27;</span>);
          res.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;Access-Control-Allow-Headers&#x27;</span>, <span class="hljs-string">&#x27;Origin, X-Requested-With, Content-Type, Accept&#x27;</span>);
          <span class="hljs-title function_">next</span>();
        })
  <span class="hljs-comment">// Reste de la config</span>
  <span class="hljs-comment">// En dernier on dit que pour toutes les autres requêtes on ouvre une page 404</span>
  .<span class="hljs-title function_">all</span>(<span class="hljs-string">&#x27;*&#x27;</span>, (req, res) @<span class="hljs-variable constant_">ARROW</span> res.<span class="hljs-title function_">redirect</span>(@backtick@/<span class="hljs-number">404.</span>html@backtick@));
  .<span class="hljs-title function_">listen</span>(<span class="hljs-number">8085</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1724055770404.4744')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_déployer_sur_clever_cloud">Déployer sur Clever Cloud</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Maintenant que notre application fonctionne, nous pouvons la déployer sur clever cloud. Pour celà vous devez identifier les scripts qui seront lancés par la plateforme dans le fichier <code>package.json</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1724055770406.472">{
  <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;dev-mind.com&quot;</span>,
  <span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;install&quot;</span>: <span class="hljs-string">&quot;gulp&quot;</span>,
    <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;node app.js&quot;</span>,
    <span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;gulp serve&quot;</span>
  },
  <span class="hljs-string">&quot;dependencies&quot;</span>: { }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1724055770406.472')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Sur Clever Cloud vous deveez créer une application Node.js</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/objectif_clever_cloud_03.png" alt="Node JS">
</div>
</div>
<div class="paragraph">
<p>Vous n&#8217;avez qu&#8217;à suivre les instructions par contre il est important de paramétrer les variables d&#8217;environnement suivantes</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1724055770407.7893"><span class="hljs-variable constant_">NODE_BUILD_TOOL</span>=yarn
<span class="hljs-variable constant_">NODE_ENV</span>=prod
<span class="hljs-variable constant_">PORT</span>=<span class="hljs-number">8080</span></code><button class="btn-copy-code" onclick="copyToClipboard('1724055770407.7893')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>La première ligne permet d&#8217;indiquer à la plateforme que vous utilisez Yarn plutôt que Npm pour charger les dépendances Node.</p>
</li>
<li>
<p>Vous devez ensuite activer le mode <code>prod</code> et</p>
</li>
<li>
<p>démarrer votre application sur le port 8080. Si vous n&#8217;utilisez pas ce port votre application ne fonctionnera pas.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Voila c&#8217;est à vous de jouer&#8230;&#8203;</p>
</div>
</div>
</div>`;