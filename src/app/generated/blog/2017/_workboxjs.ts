export const _workboxjs:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Après avoir présenter ce qu&#8217;<a href="https://www.dev-mind.fr/blog/2017/service_worker.html">était un service worker</a> et comment <a href="https://www.dev-mind.fr/blog/2017/creer_service_worker.html">en ajouter un dans votre application</a>, nous allons aujourd&#8217;hui nous attarder sur la nouvelle toolbox <a href="https://workboxjs.org/">Workbox</a> présentée à Google IO/2017.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_pourquoi_un_nouveau_projet">Pourquoi un nouveau projet ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>On peut se poser la question de pourquoi Google met en place un nouveau projet alors que des solutions comme <a href="https://github.com/GoogleChrome/sw-precache">sw-precache</a> et <a href="https://github.com/GoogleChrome/sw-toolbox">sw-toolbox</a> existent (voir <a href="https://www.dev-mind.fr/blog/2017/creer_service_worker.html">mon dernier article</a> sur le sujet). En fait il y a eu pas mal de modifications dans le code depuis la mise en place de ces solutions et <a href="https://github.com/GoogleChrome/sw-toolbox">sw-toolbox</a> n&#8217;adresse pour le moment qu&#8217;une partie de ce que vous pouvez faire avec des services workers (exclusivement du cache de ressources). Comme beaucoup de personnes utilisent déjà ces projets il était difficile de faire de gros changements sans mettre en péril la compatibilité ascendante.</p>
</div>
<div class="paragraph">
<p><a href="https://workboxjs.org/">Workbox</a> a été pensé de manière modulaire pour éviter ces problèmes à l&#8217;avenir. Vous pouvez choisir de n&#8217;utiliser que les éléments dont vous avez besoin. Quand vous voulez créer des sites performants, il est important de n&#8217;embarquer que les ressources vraiment nécéssaires pour limiter un maximum la taille de votre site.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/workbox_00.png" alt="Workbox" width="70%">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_quest_ce_que_workbox">Qu&#8217;est ce que Workbox ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Le but de <a href="https://workboxjs.org/">Workbox</a> est de vous fournir un maximum d&#8217;outils pour transformer votre application en <a href="https://www.dev-mind.fr/blog/2017/service_worker.html">progressive webapp</a>. <a href="https://workboxjs.org/">Workbox</a> se base sur différentes API JavaScript</p>
</div>
<div class="ulist">
<ul>
<li>
<p>les services workers <a href="https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API">api</a> / <a href="https://caniuse.com/#search=service%20worker">caniuse</a></p>
</li>
<li>
<p>Broadcast Channel <a href="https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API">api</a> / <a href="https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API#Browser_compatibility">caniuse</a></p>
</li>
<li>
<p>Background Sync <a href="https://developers.google.com/web/updates/2015/12/background-sync">api</a> / <a href="https://github.com/WICG/BackgroundSync">caniuse</a></p>
</li>
<li>
<p>..</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Bien évidemment toutes ces API ne sont pas encore disponibles sous tous les navaigateurs. <a href="https://workboxjs.org/">Workbox</a> vous aide à générer les fichiers de configuration et met à disposition différents scénarios éprouvés.</p>
</div>
<div class="paragraph">
<p>Utiliser les services workers est assez sensible au niveau sécurité et au niveau de la gestion du cache des ressources. Il est à mon sens important d&#8217;utiliser une librairie externe qui évolue sans cesse et où les bug fix sont résolus rapidement.</p>
</div>
<div class="paragraph">
<p>Comme je le disais plus haut <a href="https://workboxjs.org/">Workbox</a> a vraiment été pensé de manière modulaire. C&#8217;est un peu comme un magasin dans lequel vous allez pouvoir faire votre marché, parmi plusieurs librairies ou outils faiblement couplés les uns avec les autres.</p>
</div>
<div class="sect2">
<h3 id="_outils_de_générations">Outils de générations</h3>
<div class="paragraph">
<p>Avant de voir en détail les modules bas niveau nous allons regarder comment utiliser ceux de plus haut niveau. <a href="https://workboxjs.org/">Workbox</a> a été créé pour vous faciliter la configuration et peut facilement s&#8217;intégrer dans le build de votre application. Il existe différents clients</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Client pour webpack : <a href="https://workboxjs.org/get-started/webpack.html">workbox-webpack-plugin</a></p>
</li>
<li>
<p>Client pour npm : <a href="https://workboxjs.org/get-started/npm-script.html">workbox-cli</a></p>
</li>
<li>
<p>Client pour Gulp : <a href="https://workboxjs.org/get-started/gulp.html">workbox-build</a></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Il est intéressant de noter qu&#8217;il n&#8217;y a pas de client direct pour le moment pour <a href="https://gruntjs.com/">Grunt</a>.</p>
</div>
<div class="paragraph">
<p>Vous pouvez directement créer votre fichier service worker en vous basant sur <a href="https://workboxjs.org/reference-docs/latest/module-workbox-sw.html">workbox-sw</a> mais il est plutôt fortement recommandé de générer votre service worker avec les clients évoqués ci dessus. Voici un exemple de script Gulp pour générer la configuration</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1734011713915.7876">gulp.<span class="hljs-title function_">task</span>(<span class="hljs-string">&#x27;bundle-sw&#x27;</span>, <span class="hljs-function">() =&gt;</span> {

  <span class="hljs-keyword">return</span> wbBuild.<span class="hljs-title function_">generateSW</span>({
    <span class="hljs-attr">cacheId</span>: <span class="hljs-string">&#x27;dev-mind&#x27;</span>,
    <span class="hljs-attr">globDirectory</span>: <span class="hljs-string">&#x27;./build/dist&#x27;</span>,
    <span class="hljs-attr">swDest</span>: <span class="hljs-string">&#x27;build/.tmp/sw.js&#x27;</span>,
    <span class="hljs-attr">staticFileGlobs</span>: [<span class="hljs-string">&#x27;**\/*.{js,html,css,png,jpg,json,gif,svg,webp,eot,ttf,woff,woff2,gz}&#x27;</span>]
    <span class="hljs-attr">clientsClaim</span>: <span class="hljs-literal">true</span>
  })
    .<span class="hljs-title function_">then</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Service worker generated.&#x27;</span>);
    })
    .<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;[ERROR] This happened: &#x27;</span> + err);
    });
});</code><button class="btn-copy-code" onclick="copyToClipboard('1734011713915.7876')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si vous ouvrez ce fichier vous allez voir quelque chose de similaire à</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1734011713916.7542">importScripts(<span class="hljs-string">&#x27;workbox-sw.prod.v1.0.1.js&#x27;</span>);

<span class="hljs-keyword">const</span> fileManifest = [
  {
    <span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;/404.html&quot;</span>,
    <span class="hljs-string">&quot;revision&quot;</span>: <span class="hljs-string">&quot;529851a7efdb7576b4568154f84f87dd&quot;</span>
  },
  <span class="hljs-comment">// ...</span>
];

<span class="hljs-keyword">const</span> workboxSW = <span class="hljs-keyword">new</span> self.<span class="hljs-title class_">WorkboxSW</span>({
  <span class="hljs-string">&quot;cacheId&quot;</span>: <span class="hljs-string">&quot;dev-mind&quot;</span>,
  <span class="hljs-string">&quot;clientsClaim&quot;</span>: <span class="hljs-literal">true</span>
});
workboxSW.<span class="hljs-title function_">precache</span>(fileManifest);</code><button class="btn-copy-code" onclick="copyToClipboard('1734011713916.7542')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez consulter les <a href="https://github.com/Dev-Mind/dev-mind.com">sources</a> de mon site web pour voir un exemple complet d&#8217;utilisation. Nous allons maintenant nous attarder sur les modules bas niveau si vous voulez passer outre la génération automatique</p>
</div>
</div>
<div class="sect2">
<h3 id="_le_cache_de_ressources">Le cache de ressources</h3>
<div class="paragraph">
<p>Si vous utilisiez <a href="https://github.com/GoogleChrome/sw-precache">sw-precache</a>  et <a href="https://github.com/GoogleChrome/sw-toolbox">sw-toolbox</a> nous allons tout d&#8217;abord regarder les modules qui reproduisent le comportement de ces librairies.</p>
</div>
<div class="sect3">
<h4 id="_workbox_build"><a href="https://workboxjs.org/reference-docs/latest/module-workbox-build.html">workbox-build</a></h4>
<div class="paragraph">
<p>Ce module node s&#8217;intègre facilement à votre processus de build Gulp ou Webpack ou autre&#8230;&#8203; Il permet de générer votre fichier service worker ou un fichier manifest.</p>
</div>
<div class="paragraph">
<p>Le but est de générer la liste des ressources qui peuvent être "précachées" par un service worker. Un hash est associé à chacune des ressources afin de pouvoir mettre à jour intelligemment le cache et supprimer les ressources qui ne seraient plus à jour. Cette librairie permet soit de</p>
</div>
<div class="ulist">
<ul>
<li>
<p>générer un service worker avec la liste des ressources à mettre dans le cache</p>
</li>
<li>
<p>générer un fichier manifest pour ensuite l&#8217;injecter dans votre application pour pouvoir accéder aux URL et au détail des modificatons des ressources</p>
</li>
<li>
<p>injecter un fichier manifest dans un service worker existant. Vous controlez l&#8217;écriture de votre service worker tout en bénéficiant du précaching automatique</p>
</li>
</ul>
</div>
</div>
<div class="sect3">
<h4 id="_workbox_routing"><a href="https://workboxjs.org/reference-docs/latest/module-workbox-routing.html">workbox-routing</a></h4>
<div class="paragraph">
<p>Le service worker est à l&#8217;écoute des requêtes sortantes (fetch event). Nous avons besoin de définir des comportements différents selon les requêtes. Ce module permet d&#8217;appliquer différentes stratégies sur des sous ensembles de requêtes. Nous définissons des routes.</p>
</div>
<div class="paragraph">
<p>Une route met en relation</p>
</div>
<div class="ulist">
<ul>
<li>
<p>un matcher : élément permettant de définir un sous ensemble de requêtes.</p>
</li>
<li>
<p>un handler : définissant la stratégie à appliquer à la réponse</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Il existe différents types de routes qui vont vous permettre d&#8217;utiliser des matchers différents</p>
</div>
<div class="paragraph">
<p>La communauté JS aime beaucoup ExpressJS et notamment la manière de définir des URL. <a href="https://workboxjs.org/reference-docs/latest/module-workbox-routing.ExpressRoute.html#main">ExpressRoute</a> a été créé dans ce sens. Une autre manière de définir des routes est d&#8217;utiliser des expressions régulières. Vous pouvez utiliser dans ce cas une route de type <a href="https://workboxjs.org/reference-docs/latest/module-workbox-routing.RegExpRoute.html">RegExpRoute</a>.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1734011713918.933"> <span class="hljs-keyword">const</span> assetRoute = <span class="hljs-keyword">new</span> <span class="hljs-title class_">RegExpRoute</span>({
   <span class="hljs-attr">regExp</span>: <span class="hljs-regexp">/assets/</span>,
   <span class="hljs-attr">handler</span>: <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">runtimeCaching</span>.<span class="hljs-title class_">StaleWhileRevalidate</span>(),
 });
 <span class="hljs-keyword">const</span> imageRoute = <span class="hljs-keyword">new</span> <span class="hljs-title class_">RegExpRoute</span>({
   <span class="hljs-attr">regExp</span>: <span class="hljs-regexp">/images/</span>,
   <span class="hljs-attr">handler</span>: <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">runtimeCaching</span>.<span class="hljs-title class_">CacheFirst</span>(),
 });
 <span class="hljs-keyword">const</span> expressRoute = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">routing</span>.<span class="hljs-title class_">ExpressRoute</span>({
  <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;https://example.com/path/to/:file&#x27;</span>
 });

 <span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">routing</span>.<span class="hljs-title class_">Router</span>();
 router.<span class="hljs-title function_">registerRoutes</span>({<span class="hljs-attr">routes</span>: [assetRoute, imageRoute, expressRoute]});
 router.<span class="hljs-title function_">setDefaultHandler</span>({
   <span class="hljs-attr">handler</span>: <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">runtimeCaching</span>.<span class="hljs-title class_">NetworkFirst</span>(),
 });</code><button class="btn-copy-code" onclick="copyToClipboard('1734011713918.933')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Dans l&#8217;exemple ci dessus vous pourriez implémenter vos propres handlers mais il est préférable d&#8217;utiliser les handlers Workbox. Nous allons d&#8217;ailleurs regarder dès maintenant le module les mettant à disposition.</p>
</div>
</div>
<div class="sect3">
<h4 id="_workbox_runtime_caching"><a href="https://workboxjs.org/reference-docs/latest/module-workbox-runtime-caching.html">workbox-runtime-caching</a></h4>
<div class="paragraph">
<p>Cette librairie implémente les différentes stratégies de cache. Comme je vous l&#8217;avais indiqué dans l&#8217;article précédent vous pouvez lire le <a href="https://jakearchibald.com/2014/offline-cookbook/">offline cookbook</a> de <a href="https://twitter.com/jaffathecake">Jake Archibald</a> qui décrit ces différentes stratégies.</p>
</div>
<div class="ulist">
<ul>
<li>
<p><em>networkFirst</em> : essaye de lancer la requête en mode connecté. Si le réseau répond la réponse est stockée dans le cache et servie. Si la réponse dépasse un timeout défini ou si le réseau est inaccessible le SW retourne la ressource si elle est présente dans le cache. Cette stratégie est intéressante quand vous voulez afficher les données les plus récentes.</p>
</li>
<li>
<p><em>cacheFirst</em> : si la ressource est dans le cache elle est directment renvoyée. Sinon on charge la ressource. Cette stratégie est utilisée pour des éléments qui ne changent pas (sinon vous devez mettre en place une stratégie pour mettre à jour ces ressources quand elles changent).</p>
</li>
<li>
<p><em>cacheOnly</em> : on ne regarde que dans le cache. Si la ressource n&#8217;est pas là nous avons une erreur. Intéressant sur mobile par exemple pour préserver la batterie quand elle commence à faiblir.</p>
</li>
<li>
<p><em>networkOnly</em> : inverse on interroge toujours le réseau. Cette stratégie est un peu inutile vu qu&#8217;il se passe la même chose si vous n&#8217;utilisez pas de services workers</p>
</li>
<li>
<p><em>staleWhileRevalidate</em> : on lance 2 requêtes en parallèle (une dans le cache une sur le réseau). La version en cache étant plus rapide à répondre, elle est affichée. Mais cette version sera remplacée par le résultat de la requête lancée sur le réseau (si cette dernière s&#8217;est bien passée).</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Vous pouvez voir des exemples de déclaration dans le paragraphe précédent</p>
</div>
</div>
<div class="sect3">
<h4 id="_workbox_cache_expiration"><a href="https://workboxjs.org/reference-docs/latest/module-workbox-cache-expiration.html#workbox-cache-expiration">workbox-cache-expiration</a></h4>
<div class="paragraph">
<p>Quand vous utilisez des services workers ou plus généralement du cache de ressources dans le navigateur web vous avez toujours la hantise que votre cache soit mal configuré et que les ressources ne soient jamais mise à jour.</p>
</div>
<div class="paragraph">
<p>Grâce à cette librairie vous pouvez</p>
</div>
<div class="ulist">
<ul>
<li>
<p>limiter la taille du cache en limitant le nombre de requêtes pouvant être "cachée"</p>
</li>
<li>
<p>définir une date d&#8217;expiration</p>
</li>
</ul>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1734011713919.2883"><span class="hljs-keyword">const</span> requestWrapper = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">runtimeCaching</span>.<span class="hljs-title class_">RequestWrapper</span>({
  <span class="hljs-attr">cacheName</span>: <span class="hljs-string">&#x27;runtime-cache&#x27;</span>,
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// The cache size will be capped at 10 entries.</span>
    <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">cacheExpiration</span>.<span class="hljs-title class_">Plugin</span>({<span class="hljs-attr">maxEntries</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">maxAgeSeconds</span>: <span class="hljs-number">10</span>})
  ]
});

<span class="hljs-comment">// ce &#x27;RequestWrapper&#x27; peut être ajouté au cache handler d&#x27;une route</span>
<span class="hljs-keyword">const</span> route = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">routing</span>.<span class="hljs-title class_">RegExpRoute</span>({
  <span class="hljs-attr">match</span>: <span class="hljs-function">(<span class="hljs-params">{url}</span>) =&gt;</span> url.<span class="hljs-property">domain</span> === <span class="hljs-string">&#x27;dev-mind.fr&#x27;</span>,
  <span class="hljs-attr">handler</span>: <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">runtimeCaching</span>.<span class="hljs-title class_">StaleWhileRevalidate</span>({requestWrapper})
});</code><button class="btn-copy-code" onclick="copyToClipboard('1734011713919.2883')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_aller_plus_loin">Aller plus loin</h3>
<div class="paragraph">
<p><a href="https://workboxjs.org/">Workbox</a> a l&#8217;ambition d&#8217;apporter plus que du cache de ressources.</p>
</div>
<div class="sect3">
<h4 id="_workbox_background_sync"><a href="https://workboxjs.org/reference-docs/latest/module-workbox-background-sync.html">workbox-background-sync</a></h4>
<div class="paragraph">
<p>Les services workers vous permettent de servir votre site web si le réseau est défaillant ou absent. Si un utilisateur lance une action et que le réseau n&#8217;est pas accessible cette dernière est perdue. Cette librairie va vous aider à empiler les demandes dans une queue et ces demandes seront exécutées quand le réseau sera à nouveau disponible (cette librairie se base sur l&#8217;API JavaScript Background Sync).</p>
</div>
<div class="paragraph">
<p>Le principe est d&#8217;instancier une <a href="https://workboxjs.org/reference-docs/latest/module-workbox-background-sync.QueuePlugin.html">QueuePlugin</a> et de la passer au RequestWrapper</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1734011713921.6995"><span class="hljs-keyword">let</span> bgQueue = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">backgroundSync</span>.<span class="hljs-title class_">QueuePlugin</span>({
  <span class="hljs-attr">callbacks</span>: {
    <span class="hljs-attr">onResponse</span>: <span class="hljs-title function_">async</span>(hash, res) =&gt; {
      <span class="hljs-comment">// une notification sera affichée quand tout est OK</span>
      self.<span class="hljs-property">registration</span>.<span class="hljs-title function_">showNotification</span>(<span class="hljs-string">&#x27;Background sync demo&#x27;</span>, {
        <span class="hljs-attr">body</span>: <span class="hljs-string">&#x27;Product has been purchased.&#x27;</span>,
        <span class="hljs-attr">icon</span>: <span class="hljs-string">&#x27;/images/shop-icon-384.png&#x27;</span>,
       });
    },
    <span class="hljs-attr">onRetryFailure</span>: <span class="hljs-function">(<span class="hljs-params">hash</span>) =&gt;</span> {},
  },
});

<span class="hljs-keyword">const</span> requestWrapper = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">runtimeCaching</span>.<span class="hljs-title class_">RequestWrapper</span>({
  <span class="hljs-attr">plugins</span>: [bgQueue],
});

<span class="hljs-keyword">const</span> route = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">routing</span>.<span class="hljs-title class_">RegExpRoute</span>({
  <span class="hljs-attr">regExp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">RegExp</span>(<span class="hljs-string">&#x27;^https://jsonplaceholder.typicode.com&#x27;</span>),
  <span class="hljs-attr">handler</span>: <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">runtimeCaching</span>.<span class="hljs-title class_">NetworkOnly</span>({requestWrapper}),
});

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">routing</span>.<span class="hljs-title class_">Router</span>();
router.<span class="hljs-title function_">registerRoute</span>({route});</code><button class="btn-copy-code" onclick="copyToClipboard('1734011713921.6995')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_workbox_cacheable_response"><a href="https://workboxjs.org/reference-docs/latest/module-workbox-cacheable-response.html">workbox-cacheable-response</a></h4>
<div class="paragraph">
<p>Cette librairie vous permet de paramétrer finement quels objets doivent être mis en cache ou non. Pour celà vous pouvez intercepter le statut de la réponse ou les entêtes de cette réponse.</p>
</div>
<div class="paragraph">
<p>Un petit exemple dans lequel nous ne voulons mettre en cache que les réponses avec le statut 0 ou 200</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1734011713922.809"><span class="hljs-keyword">const</span> cacheablePlugin = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">cacheableResponse</span>.<span class="hljs-title class_">Plugin</span>({
  <span class="hljs-attr">statuses</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">200</span>]
});

<span class="hljs-keyword">const</span> requestWrapper = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">runtimeCaching</span>.<span class="hljs-title class_">RequestWrapper</span>({
  <span class="hljs-attr">cacheName</span>: <span class="hljs-string">&#x27;runtime-cache&#x27;</span>,
  <span class="hljs-attr">plugins</span>: [
    cacheablePlugin
  ]
});

<span class="hljs-keyword">const</span> route = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">routing</span>.<span class="hljs-title class_">RegExpRoute</span>({
  <span class="hljs-attr">match</span>: <span class="hljs-function">(<span class="hljs-params">{url}</span>) =&gt;</span> url.<span class="hljs-property">domain</span> === <span class="hljs-string">&#x27;example.com&#x27;</span>,
  <span class="hljs-attr">handler</span>: <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">runtimeCaching</span>.<span class="hljs-title class_">StaleWhileRevalidate</span>({requestWrapper})
});</code><button class="btn-copy-code" onclick="copyToClipboard('1734011713922.809')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_workbox_broadcast_cache_update"><a href="https://workboxjs.org/reference-docs/latest/module-workbox-broadcast-cache-update.html">workbox-broadcast-cache-update</a></h4>
<div class="paragraph">
<p>Cet utilitaire utilise l&#8217;API JavaScript Broadcast Channel et permet d&#8217;effectuer une action quand une entrée dans le cache a été mise à jour.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1734011713924.0164"><span class="hljs-keyword">const</span> requestWrapper = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">runtimeCaching</span>.<span class="hljs-title class_">RequestWrapper</span>({
  <span class="hljs-attr">cacheName</span>: <span class="hljs-string">&#x27;text-files&#x27;</span>,
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">broadcastCacheUpdate</span>.<span class="hljs-title class_">BroadcastCacheUpdatePlugin</span>(
      {<span class="hljs-attr">channelName</span>: <span class="hljs-string">&#x27;cache-updates&#x27;</span>})
  ],
});

<span class="hljs-keyword">const</span> route = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">routing</span>.<span class="hljs-title class_">RegExpRoute</span>({
  <span class="hljs-attr">regExp</span>: <span class="hljs-regexp">/\.txt@dollar@/</span>,
  <span class="hljs-attr">handler</span>: <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">runtimeCaching</span>.<span class="hljs-title class_">StaleWhileRevalidate</span>({requestWrapper}),
});

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> workbox.<span class="hljs-property">routing</span>.<span class="hljs-title class_">Router</span>();
router.<span class="hljs-title function_">registerRoute</span>({route});</code><button class="btn-copy-code" onclick="copyToClipboard('1734011713924.0164')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Ensuite dans votre code vous pouvez écouter l&#8217;événement du même nom</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1734011713924.3135"><span class="hljs-keyword">const</span> updateChannel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BroadcastChannel</span>(<span class="hljs-string">&#x27;cache-updates&#x27;</span>);
updateChannel.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Cache updated: @dollar@{event.data.payload.updatedUrl}&#x27;</span>);
});</code><button class="btn-copy-code" onclick="copyToClipboard('1734011713924.3135')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_autres_fonctionnalités">Autres fonctionnalités</h4>
<div class="paragraph">
<p>Le but de cet article n&#8217;est pas d&#8217;être exhaustif. Je vous laisse consulter le site <a href="https://workboxjs.org/">Workbox</a> pour plus d&#8217;exemples. Des nouvelles fonctionnalités devraient apparaître prochainement.</p>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_vérifier_le_fonctionnement_de_votre_site">Vérifier le fonctionnement de votre site</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Une fois que vous avez mis en ligne votre site, vous pouvez vérifier son comportement et la qualité en utilisant l&#8217;outil open source <a href="https://developers.google.com/web/tools/lighthouse/">Lighthouse</a>. Il vérifie les aspects liés à la performance, l&#8217;accessibilité, le comportement offline, si votre site est responsive&#8230;&#8203; Vous pouvez utiliser soit le client node disponible sous npm, soit le <a href="https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk">plugin Chrome</a>.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/workbox_03.png" alt="Lighthouse">
</div>
</div>
<div class="paragraph">
<p>Pour lancer un audit du site <a href="https://www.dev-mind.fr/">dev-mind.fr</a> vous devez aller sur le site et lancer le plugin Chrome qui va générer le rapport suivant. Je vous conseille de désactiver les différentes extensions de votre navigateur avant car certaines ont tendance à fausser les rapports en ajoutant des scripts à votre site.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/workbox_04.png" alt="Rapport Lighthouse">
</div>
</div>
<div class="paragraph">
<p>Le rapport expose différents indicateurs et propose des solutions pour optimiser votre page (lien vers les docs correspondantes).</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Ainsi s&#8217;achève notre voyage au pays des services workers. Avec ces 3 articles je souhaitais montrer qu&#8217;il était simple et rapide d&#8217;exposer des fonctionnalités hors ligne ou sur un réseau dégradé. Pour conclure je rappelerai juste quelques conseils</p>
</div>
<div class="ulist">
<ul>
<li>
<p>utilisez une librairie pour générer vos services workers</p>
</li>
<li>
<p>faites du cache busting, en intégrant un numéro de révision dans le nom de vos ressources afin de vous prémunir des problèmes de cache</p>
</li>
<li>
<p>utiliser un nom unique pour votre cache ou zone de cache. Ce nom est utilisé pour épurer les ressources quand votre service worker est mis à jour</p>
</li>
<li>
<p>paramétrer toujours une date d&#8217;expiration de vos ressources dans le cache</p>
</li>
<li>
<p>vérifier régulièrement le comportement de votre site sur les différents navigateurs du marché qui n&#8217;implémentent pas les normes à la même vitesse.</p>
</li>
</ul>
</div>
</div>
</div>`;