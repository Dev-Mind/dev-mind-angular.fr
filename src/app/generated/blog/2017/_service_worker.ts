export const _service_worker:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Si vous suivez l&#8217;actualité Dev-Mind (<a href="https://www.dev-mind.fr/formation_optimiser.html">formation</a> ou <a href="https://www.dev-mind.fr/experience.html#conferences">conférence</a> sur les performances web), j&#8217;ai introduit à plusieurs occasions le concept des <a href="https://developers.google.com/web/progressive-web-apps/">progressive webaps</a> et des <a href="https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API">service workers</a>.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/service_worker_00.png" alt="Services workers">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_progressive_webapp_et_service_worker">Progressive Webapp et service worker</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Revenons un peu à la base si vous ne connaissez pas ces termes.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Les <strong>progressive webapps</strong> (PWA) sont un concept poussé par Google. Le but est de pousser les développeurs à créer des applications web modernes facilitant la navigation des utilisateurs. Les évolutions des standards du web, font que les applications proposées au sein d&#8217;un navigateur se rapprochent de plus en plus, de ce que l&#8217;on peut faire avec des applications natives. Une application web, doit s&#8217;adapter aux tailles des écrans des utilisateurs, être rapide à charger, doit marcher quand le réseau est faible ou inexistant, doit pouvoir faire des notifications sur un téléphone&#8230;&#8203;</p>
</li>
<li>
<p>Les <strong>services workers</strong> sont un moyen technique pour arriver à mettre en place certains concepts d&#8217;une progressive webapp comme le fonctionnement hors ligne ou sur un réseau défaillant. Il n&#8217;y a pas de magie, les services workers permettent simplement de recharger les données déjà chargées et qui ont été persistées dans un cache local. Les services workers permettent de faire ce travail de l&#8217;ombre et de charger en tâche de fond les ressources dont vous avez besoin sur votre site et de les servir pour améliorer les performances ou lorsque vous n&#8217;avez pas de réseau.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Je vais revenir un peu plus en détail sur les services workers juste après mais il est important de savoir que toutes ses fonctionalités peuvent aujourd&#8217;hui être mises en place dans les navigateurs modernes.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/service_worker_01.png" alt="Can I Use service worker">
</div>
</div>
<div class="paragraph">
<p>Gros bémol pour Safari (navigateur Apple) qui traîne à implémenter les normes et qui est aujourd&#8217;hui le pire navigateur pour surfer sur le web. Mais ces nouvelles fonctionnalités peuvent tout de même être ajoutées à votre site. Elles ne s&#8217;activeront tout simplement pas sur les navigateurs à la traîne. Sur Edge ils ne sont pas encore actifs par défaut mais ça devrait arriver</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_les_workers">Les workers</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Tous les navigateurs implémentent aujourd&#8217;hui l&#8217;API des web workers. Par défaut JavaScript est mono thread et tout s&#8217;exécute dans un thread principal. Bien évidemment si vous multipliez les traitements dans cet unique thread vous risquez d&#8217;avoir des problèmes de performance. L&#8217;api <a href="https://developer.mozilla.org/fr/docs/Utilisation_des_web_workers">Web Worker</a> permet de déporter des traitements dans un thread en arrière plan. Ce thread ne peut pas accéder à toutes les API. Par exemple, vous ne pouvez pas manipuler le DOM, mais vous pouvez utiliser d&#8217;autres API comme WebSocket, IndexedDB&#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>Les échanges entre un worker et votre thread principal ne peut se faire que par échange de messages. Le mieux pour comprendre ce concept est de prendre un exemple. Dans le code ci dessous je déclare un worker dans le thread principal. J&#8217;ajoute ensuite un listener qui sera à l&#8217;écoute des messages envoyés par le worker.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604315040.6252"><span class="hljs-comment">// Création du worker</span>
<span class="hljs-keyword">var</span> worker = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-string">&#x27;doWork.js&#x27;</span>);

<span class="hljs-comment">// On crée un event listener pour intercepter les messages envoyés par le worker</span>
worker.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
   <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Worker said: &#x27;</span>, e.<span class="hljs-property">data</span>);
}, <span class="hljs-literal">false</span>);

<span class="hljs-comment">// Vous pouvez à tout moment envoyé un message au worker</span>
worker.<span class="hljs-title function_">postMessage</span>(<span class="hljs-string">&#x27;Hello World&#x27;</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1722604315040.6252')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Au final le code du worker <em>doWork.js</em> sera</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604315041.1145"><span class="hljs-comment">// On crée un listener pour recevoir les messages du thread principal</span>
self.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>,<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
   <span class="hljs-comment">// la méthode postMessage permet de renvoyer un message</span>
   self.<span class="hljs-title function_">postMessage</span>(e.<span class="hljs-property">data</span>);
}, <span class="hljs-literal">false</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1722604315041.1145')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_les_services_workers">Les services workers</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Les services workers sont des workers. Il n&#8217;ont donc pas d&#8217;accès au DOM, et s&#8217;exécutent dans une tâche de fond différente de celle du thread principal de votre application. Ils sont donc non-bloquants. Dans un web worker tout est asynchrone et le nombre d&#8217;API utilisable est plus restreint.</p>
</div>
<div class="paragraph">
<p>Un service worker peut être vu comme un proxy, qui va se mettre entre votre site et le serveur. Il est capable d&#8217;intercepter tous les requêtes qui rentrent ou qui sortent pour les modifier. Les ressources prises en charge par le service worker sont définies dans un fichier de configuration JavaScript.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/service_worker_02.png" alt="Service worker = proxy">
</div>
</div>
<div class="paragraph">
<p>Plutôt sensible et critique non ? C&#8217;est pourquoi les services workers ne fonctionnent qu&#8217;en HTTPS. Le service worker vient aussi avec un cache de ressources. Il faut être vigilant dans votre configuration, si vous ne voulez pas que vos ressources ne soient jamais raffraîchies.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_le_cycle_de_vie">Le cycle de vie</h2>
<div class="sectionbody">
<div class="paragraph">
<p>L&#8217;activation des services workers va se faire en plusieurs étapes que nous allons décrire rapidement.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/service_worker_05.png" alt="Cycle de vie">
</div>
</div>
<div class="paragraph">
<p>Quand votre site se charge vous pouvez réserver une section de votre code pour paramétrer le service worker. C&#8217;est là que vous pourrez tester que votre navigateur prend bien en charge cette API.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604315042.08"><span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;serviceWorker&#x27;</span> <span class="hljs-keyword">in</span> navigator){
    <span class="hljs-comment">// ..</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604315042.08')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>La première étape consiste à enregistrer votre service worker via <code><em>serviceWorkerContainer.register('sw.js')</em></code></p>
</li>
<li>
<p>Si tout se passe bien le service worker (<em>sw.js</em> dans notre exemple) est exécuté dans un thread séparé. Il passe à l&#8217;état REGISTERED</p>
</li>
<li>
<p>Une fois que vous essayez d&#8217;accéder à une ressource gérée par le service worker, ce dernier va tenter de s&#8217;installer. Si tout se passe bien l&#8217;événement <code><em>oninstall</em></code> est déclenché. C&#8217;est dans ce listener que nous pouvons par exemple utiliser l&#8217;API IndexedDB pour mettre en cache nos ressources.</p>
</li>
<li>
<p>Le service worker va ensuite essayé de s&#8217;activer en envoyant l&#8217;événement <code><em>onactivate</em></code>. Le listener associé est généralement utilisé pour faire le ménage dans le cache et supprimer les ressources qui ne sont plus nécéssaires</p>
</li>
<li>
<p>Les pages qui sont à ce moment ouvertes seront contrôlées par le service worker. Vous pouvez intercepter dans le script de votre service worker les événements <code><em>push</em></code>, <code><em>fetch</em></code> et <code><em>sync</em></code></p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_ecriture_du_service_worker">Ecriture du service worker</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Nous venons de voir comment fonctionnait un service worker. Regardons maintenant comment se passe la mise en place. Pour celà rendez vous dans l&#8217;article <a href="https://www.dev-mind.fr/blog/2017/creer_service_worker.html">créer un service worker</a>.</p>
</div>
</div>
</div>`;