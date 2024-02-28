export const _ngeurope_rxjs_angular2:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>RxJS s’est retrouvé dans plusieurs conférences. Comme pour le backend la programmation reactive est très présente dans les conférences JavaScript</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_angular_rxjs">Angular &amp; RxJS</h2>
<div class="sectionbody">
<div class="paragraph">
<p><code><em>by <a href="https://twitter.com/robwormald">Rob Wormald</a> : javascripter. googler. developer advocate for angular.</em></code></p>
</div>
<div class="paragraph">
<p>Rob nous a parlé de RxJS et comment l’utiliser dans Angular avec les Observables. Ce sujet pourtant assez complexe pour mon oeil de novice est devenu beaucoup plus clair au fur et à mesure de la journée.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/ngeurope_rxjs_angular2_01.jpg" alt="Rob Wormald">
</div>
<div class="title">photo de Philippe Chatel</div>
</div>
<div class="paragraph">
<p>Les librairies Rx (reactive extensions) permettent de faire de la programmation asynchrone basée sur des événements. Les données peuvent être assez diverses. On peut retrouver un flux de données transmis par un fichier, un appel REST, une série d’événement utilisateurs, des notifications du système.</p>
</div>
<div class="paragraph">
<p>Avec Rx ces données apparaissent comme des données observables. Votre application peut ensuite s’abonner à ces séquences observables afin de pouvoir exécuter un traitement quand de nouvelles informations arrivent (en asynchrone donc).</p>
</div>
<div class="paragraph">
<p>RxJS est une implémentation en JS (sans dépendance) qui peut à la fois interagir avec des flux de données synchrones (objets Iterable) ou des données asynchrones (objets Promise). Vous pouvez utiliser l’extension rx.angular pour bénéficier de ces possibilités dans Angular 1.</p>
</div>
<div class="paragraph">
<p>Voici un exemple Angular utilisant les observables pour récupérer des données</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AppComponent</span> {
  myControl = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FormControl</span>();
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">http:Http</span>){
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">myControl</span>.<span class="hljs-property">valueChanges</span>
      .<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> <span class="hljs-string">&#x27;http://api.com?q=@dollar@{text}&#x27;</span>)
      .<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">url</span> =&gt;</span> http.<span class="hljs-title function_">get</span>(url), <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">subscribe</span>(<span class="hljs-function"><span class="hljs-params">results</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results));
  }
}</code></pre>
</div>
</div>
<div class="videoblock">
<div class="title">Le talk de Rob en vidéo</div>
<div class="content">
<iframe src="https://www.youtube.com/embed/WWR9nxVx1ec?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_you_will_learn_rxjs">You will learn RxJS</h2>
<div class="sectionbody">
<div class="paragraph">
<p><code><em>by <a href="https://twitter.com/andrestaltz">André Staltz</a> : Reactive programming expert, <a href="https://twitter.com/cyclejs">@cyclejs</a> creator and <a href="https://twitter.com/reactivex">@reactivex</a> addict..</em></code></p>
</div>
<div class="paragraph">
<p>Alors cette conférence était pour moi une des meilleures. Live coding oblige… André est arrivé pour nous parler de RxJS et des Observables que l’on retrouve aussi maintenant dans Angular. Son but était de repartir de 0 pour montrer les concepts de base qui sont parfois mal appréhendés.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/ngeurope_rxjs_angular2_02.jpg" alt="André Staltz">
</div>
<div class="title">photo de Philippe Chatel</div>
</div>
<div class="paragraph">
<p>Aujourd’hui quand vous manipulez une collection en mode synchrone vous utilisez un callback (ici j’affiche les éléments du tableau <code><em>[1, 2, 3]</em></code>)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">elt</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(elt));</code></pre>
</div>
</div>
<div class="paragraph">
<p>Quand vous faites un appel distant asynchrone vous utilisez 2 callbacks</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript"><span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;api/sponsors&#x27;</span>).<span class="hljs-title function_">then</span>(
  <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(response.<span class="hljs-title function_">json</span>()),
  <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(error)
);</code></pre>
</div>
</div>
<div class="paragraph">
<p>D’autres fonctions peuvent avoir 3 callbacks. Mais en gros nous sommes toujours sur le même schéma</p>
</div>
<div class="ulist">
<ul>
<li>
<p>un callback pour savoir quoi faire après (next)</p>
</li>
<li>
<p>un callback à exécuter en ca d’erreur (error)</p>
</li>
<li>
<p>un callback à exécuter quand tout est terminé (complete)</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Tout peut être considéré comme un stream (un flux en français mais je préfère garder le terme anglais dans mon article), un tableau, des événements pouvant survenir dans le temps (par exemple clic sur un bouton), une vidéo en streaming, une API Rest…</p>
</div>
<div class="paragraph">
<p>Un stream peut être vu comme l’objet qui va être scruté de près quand il changera (objet Observable). Les observables peuvent être surveillés par un ou plusieurs observateurs (Observer que nous avons vu avant et qui prend trois méthodes next, error et complete).</p>
</div>
<div class="paragraph">
<p>Un Observable peut se créer de cette manière</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript">myEventStream = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Observable</span>(<span class="hljs-function"><span class="hljs-params">observer</span> =&gt;</span> {
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    observer.<span class="hljs-title function_">next</span>(<span class="hljs-number">42</span>);
  }, <span class="hljs-number">1000</span>);

  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    observer.<span class="hljs-title function_">next</span>(<span class="hljs-number">43</span>);
  }, <span class="hljs-number">2000</span>);

  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    observer.<span class="hljs-title function_">complete</span>();
  }, <span class="hljs-number">3000</span>);
});</code></pre>
</div>
</div>
<div class="paragraph">
<p>En gros je vais recevoir de manière asynchrone des données toutes les secondes. Le stream sera terminé au bout de 3. Cet observable va ensuite être lié à un Observer via la méthode suscribe. Un Observer implémentera en gros les 3 callbacks de tout à l&#8217;heure</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript"><span class="hljs-keyword">let</span> values = [];
<span class="hljs-keyword">let</span> subscription = myEventStream.<span class="hljs-title function_">subscribe</span>(
  <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> values.<span class="hljs-title function_">push</span>(val),
  <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(error),
  <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;done&#x27;</span>)
);</code></pre>
</div>
</div>
<div class="paragraph">
<p>André nous a ensuite expliqué comment rajouter des opérateurs sur les Observable (map, filter&#8230;&#8203;). Je vous conseille <a href="https://gist.github.com/staltz/868e7e9bc2a7b8c1f754">un de ces articles</a> qui est très bien pour expliquer le fonctionnement de Rx.</p>
</div>
<div class="videoblock">
<div class="title">Le talk de André en vidéo</div>
<div class="content">
<iframe src="https://www.youtube.com/embed/uQ1zhJHclvs?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_reactive_music_apps_in_angular_and_rxjs">Reactive Music Apps in Angular and RxJS</h2>
<div class="sectionbody">
<div class="paragraph">
<p><code><em>by <a href="https://twitter.com/teropa">Tero Parviainen</a> : Independent contractor, programmer, writer.</em></code></p>
</div>
<div class="paragraph">
<p>Certainement la conférence arrivant en tête à l’applaudimètre. C’était très bien mais mieux qu’un résumé écrit par mes soins voici <a href="http://teropa.info/blog/2016/07/28/javascript-systems-music.html">un article de Tero</a> qui explique ce qu’il a montré</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/ngeurope_rxjs_angular2_03.jpg" alt="Tero Parviainen">
</div>
<div class="title">photo de Philippe Chatel</div>
</div>
<div class="videoblock">
<div class="title">Le talk de Tero en vidéo</div>
<div class="content">
<iframe src="https://www.youtube.com/embed/-fPyfSAEZgk?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</div>
</div>`;