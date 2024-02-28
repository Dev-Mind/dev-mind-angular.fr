export const _creer_service_worker:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Dans <a href="https://www.dev-mind.fr/blog/2017/service_worker.html">l&#8217;article précédent</a> je vous ai expliqué comment fonctionnait les services workers et comment ils nous permettaient d&#8217;enrichir nos progressive webapps en offrant une expériene offline. Nous allons aujourd&#8217;hui voir comment ajouter un service worker dans votre application web.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_rôle_dun_service_worker">Rôle d&#8217;un service worker</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Reprenons le graphique présentant le cycle de vie d&#8217;un service worker</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/service_worker_05.png" alt="Cycle de vie">
</div>
</div>
<div class="paragraph">
<p>Dans le cas courant un service worker peut</p>
</div>
<div class="ulist">
<ul>
<li>
<p>référencer toutes les ressources prises en compte par le SW</p>
</li>
<li>
<p>écrire un listener sur l&#8217;événement <em>install</em> pour ajouter des dépendances ou pour commencer à peupler des éléments dans le cache</p>
</li>
<li>
<p>écrire un listener sur l&#8217;événement <em>activate</em> pour nettoyer le cache des ressources qui ne sont plus utilisées. Il est important d&#8217;ailleurs que l&#8217;id cache de votre service worker soit toujours le même. Sinon ce travail de nettoyage ne pourra pas être effectué. On reviendra un peu plus tard sur les problèmes éventuels avec le cache</p>
</li>
<li>
<p>écrire un listener sur l&#8217;événement <em>fetch</em> pour interagir avec les requêtes effectuées par l&#8217;utilisateur. Vous pouvez définir des stratégies pour privilégier des ressources de votre cache plutôt que les ressources présentes sur votre serveur</p>
</li>
<li>
<p>écrire un listener sur l&#8217;événement <em>push</em> pour que votre service worker intervienne quand votre serveur <a href="https://developer.mozilla.org/en-US/docs/Web/API/PushEvent">pousse</a> de l&#8217;information. Vous pouvez par exemple faire de la notification</p>
</li>
<li>
<p>écrire un listener sur l&#8217;événement <em>sync</em> pour se <a href="https://github.com/WICG/BackgroundSync/blob/master/explainer.md">synchroniser</a> avec le serveur quand vous retrouvez une connexion Internet</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>L&#8217;écriture du service worker en soit peut être assez fastidieuse et source d&#8217;erreur si les choses sont mal faites. Dans les cas les plus courants, le code est toujours à peu près le même. Google propose plusieurs librairies pour vous aider dans la mise en place des services workers.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_contrôler_un_service_worker_en_local">Contrôler un service worker en local</h2>
<div class="sectionbody">
<div class="paragraph">
<p>La règle de base est de disposer d&#8217;un site sécurisé en HTTPS. Si vous voulez tester en local vous pouvez aussi lancer Chrome en désactivant ce contrôle.</p>
</div>
<div class="literalblock">
<div class="content">
<pre>google-chrome --user-data-dir=/tmp/foo --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://localhost</pre>
</div>
</div>
<div class="paragraph">
<p>Mais attention aux surprises. Un service worker s&#8217;enregistre sur le domaine. Si vous le faites sur localhost, il risque de s&#8217;activer chaque fois que vous lancez une page en local. Après rien de grave vous pouvez à tout moment contrôler les services workers via les <em>Chrome Dev Tools</em>.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/creer_service_worker_01.png" alt="Chrome Dev Tools">
</div>
</div>
<div class="paragraph">
<p>Les <em>Chromes Dev Tools</em> permettent de simuler des événements (Update, Push, Sync..) mais aussi de déréférencer un service worker. Vous pouvez également nettoyer les caches, les services workers via la section <em>Clear Storage</em></p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/creer_service_worker_02.png" alt="Chrome Dev Tools">
</div>
</div>
<div class="paragraph">
<p>Un service ne peut être enregistré que sur la même origine que votre application. Si votre origine est <em>dev-mind.fr</em> vous ne pouvez pas enregistrer un service worker d&#8217;un autre site.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_créer_enregistrer_et_interagir_avec_un_sw">Créer, enregistrer et interagir avec un SW</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Vous devez déclarer votre service worker dans votre script principal</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript"><span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;serviceWorker&#x27;</span> <span class="hljs-keyword">in</span> navigator) {
  navigator.<span class="hljs-property">serviceWorker</span>.<span class="hljs-title function_">register</span>(<span class="hljs-string">&#x27;sw.js&#x27;</span>, <span class="hljs-attr">scope</span>: <span class="hljs-string">&#x27;/subcontent&#x27;</span>)
    .<span class="hljs-title function_">then</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">registration</span>) {
      <span class="hljs-comment">// registration worked</span>
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Registration succeeded. Scope is &#x27;</span> + reg.<span class="hljs-property">scope</span>);
    })
    .<span class="hljs-title function_">catch</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Error during service worker registration:&#x27;</span>, e);
    });
}</code></pre>
</div>
</div>
<div class="paragraph">
<p>Quand vous enregistrer un service worker vous pouvez ajouter un scope pour spécifier un sous ensemble de votre site qui sera contrôlé par ce service worker.</p>
</div>
<div class="paragraph">
<p>Un service worker contrôle plusieurs pages. Chaque fois qu&#8217;une page de votre scope est chargée, le service worker est installé ou réactivé.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_générer_un_service_worker_the_old_way">Générer un service worker (the old way)</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Vous pouvez vous appuyer sur 2 outils fournit par Google</p>
</div>
<div class="paragraph">
<p><a href="https://github.com/GoogleChrome/sw-precache">sw-precache</a> est un plugin que vous pouvez intégrer à votre processus de buid (Gulp, Grunt) et qui va générer toute la configuration de vos services workers.</p>
</div>
<div class="paragraph">
<p><a href="https://github.com/GoogleChrome/sw-toolbox">sw-toolbox</a> est une librairie que vous pouvez intégrer à votre site et qui va proposer plusieurs utilitaires pour votre service worker. Cette librairie fournit un mini routeur qui permet de définir des stratégies de cache en fonction de routes définies (au format expressJs).</p>
</div>
<div class="paragraph">
<p>Avec <a href="https://github.com/GoogleChrome/sw-toolbox">sw-toolbox</a> vous pouvez par exemple définir les stratégies suivantes (basées sur le <a href="https://jakearchibald.com/2014/offline-cookbook/">offline cookbook</a> de <a href="https://twitter.com/jaffathecake">Jake Archibald</a>)</p>
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
<p><em>fastest</em> : deux requêtes sont lancées en parallèle et la première qui arrive est prise en compte. Avec la latence réseau et les temps de chargement le cache gagne toujours. Cette solution est intéressante pour lancer une mise à jour en tâche de fond d&#8217;une ressource. Stratégie qui est au final plus souple que <em>cacheFirst</em></p>
</li>
<li>
<p><em>cacheOnly</em> : on ne regarde que dans le cache. Si la ressource n&#8217;est pas là nous avons une erreur. Intéressant sur mobile par exemple pour préserver la batterie quand elle commence à faiblir.</p>
</li>
<li>
<p><em>networkOnly</em> : inverse on interroge toujours le réseau. Cette stratégie est un peu inutile vu qu&#8217;il se passe la même chose si vous n&#8217;utilisez pas de services workers</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Voici la configuration à appliquer par exemple dans votre build <em>Gulp</em> pour générer un service worker utilisant sw-toolbox.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript">gulp.<span class="hljs-title function_">task</span>(<span class="hljs-string">&#x27;generate-service-worker&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">cb</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> config = {
    <span class="hljs-attr">cacheId</span>: <span class="hljs-string">&#x27;dev-mind&#x27;</span>,
    <span class="hljs-attr">runtimeCaching</span>: [{
      <span class="hljs-attr">urlPattern</span>: <span class="hljs-string">&#x27;/(.*)&#x27;</span>,
      <span class="hljs-attr">handler</span>: <span class="hljs-string">&#x27;networkFirst&#x27;</span>,
      <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">networkTimeoutSeconds</span>: <span class="hljs-number">3</span>,
        <span class="hljs-attr">maxAgeSeconds</span>: <span class="hljs-number">7200</span>
      }
    }],
    <span class="hljs-attr">staticFileGlobs</span>: [<span class="hljs-string">&#x27;build/dist/**/*.{js,html,css,png,jpg,json,gif,svg,webp,eot,ttf,woff,woff2,gz}&#x27;</span>],
    <span class="hljs-attr">stripPrefix</span>: <span class="hljs-string">&#x27;build/dist&#x27;</span>,
    <span class="hljs-attr">verbose</span>: <span class="hljs-literal">true</span>
  };

  swPrecache.<span class="hljs-title function_">write</span>(<span class="hljs-string">&#x27;build/dist/service-worker.js&#x27;</span>, config, cb);
});</code></pre>
</div>
</div>
<div class="paragraph">
<p>Vous devez indiquer à <em>swPrecache</em> où le service worker est généré. Au niveau de la configuration vous devez spécifier</p>
</div>
<div class="ulist">
<ul>
<li>
<p>un <em>id</em> pour le cache : omme je le disais plus haut c&#8217;est important de toujours garder le même identifiant pour que le service worker généré soit capable de nettoyer le cache quand ce dernier comporte des éléments plus utilisés</p>
</li>
<li>
<p>une ou plusieurs configuration de cache (<em>runtimeCaching</em>): vous définisser des URLs au format ExpressJS afin d&#8217;indiquer quels fichiers seront pris en compte par cette configuration (ici je prends toutes les URL du site). Vous pouvez ensuite choisir la stratégie de cache à appliquer et ajouter des options. J&#8217;utilise ici 2 options intéressantes. La première <em>networkTimeoutSeconds</em> permet de privilégier le cache si le timeout est dépassé (vous permet de servir votre site quand la qualité du réseau est très fluctuante. L&#8217;option <em>maxAgeSeconds</em> permet de définir une durée de vie dans le cache</p>
</li>
<li>
<p><em>staticFileGlobs</em> vous permet de définir quels fichiers serons gérés par votre service worker</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Pour limiter les problèmes de cache je vous conseil également de faire du <em>cache busting</em>.
Le <em>Cache busting</em> consiste à utiliser un nom unique pour vos ressources. En gros dans votre processus de build vous renommer chacune de vos ressources en mettant un numéro de révision. Cette manière de faire force le navigateur à recharger des ressources quand celles ci changent. Par contre vous devez vous assurer que votre point d&#8217;entrée de votre application (index.html) soit</p>
</div>
<div class="paragraph">
<p>Je ne vais pas m&#8217;attarder sur cette solution car Google a annoncé à <a href="https://events.google.com/io/">Google IO 2017</a> la sortie de <a href="https://workboxjs.org">Workboxjs</a> une nouvelle toolbox pour vous aider à écrire des applications progressives&#8230;&#8203;. Si vous utilisez swPrecache et swToolbox pas d&#8217;affolement, Google maintient toujours ces solutions.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_utiliser_workboxjs_et_vérifier_le_fonctionnement">Utiliser Workboxjs et vérifier le fonctionnement</h2>
<div class="sectionbody">
<div class="paragraph">
<p>C&#8217;est ce que nous verrons dans le prochain article sur les services workers</p>
</div>
</div>
</div>`;