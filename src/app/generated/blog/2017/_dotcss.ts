export const _dotcss:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Dans cet article je reviens sur la conférence dotCSS qui a eu lieu à Paris le 30 novembre 2017.  Si vous voulez suivre les talks ils vont très rapidement être publiés sur la chaîne <a href="https://www.youtube.com/user/dotconferences">Youtube</a>  et via le <a href="https://www.2017.dotcss.io/">site web</a> .</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/dotcss_00.jpg" alt="Dot CSS">
</div>
</div>
<div class="paragraph">
<p>Dans ce compte rendu je ne parle pas de toutes les sessions. Je n’ai sélectionné que celles qui m’ont vraiment fait ressortir des idées ou des concepts applicables dans mon quotidien proche ou futur.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/dotcss_01.jpg" alt="Dot CSS">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_tim_carry"><a href="https://twitter.com/pixelastic">Tim Carry</a></h2>
<div class="sectionbody">
<div class="paragraph">
<p>Avant de venir à la conférence, Tim était le seul speaker que je connaissais. Tim était venu l’an dernier à <a href="https://mixitconf.org">MiXiT</a> donner un talk sur le CSS intitulé <a href="https://mixitconf.org/2017/compagnonnage-css-et-vexillologie"><em>Compagnonnage, CSS et Vexillologie</em></a>.</p>
</div>
<div class="paragraph">
<p>Tim aime apprendre le CSS en essayant de trouver des projets concrets. Il avait fait sensation dans les conférences, en montrant projet sur les drapeaux entièrement créés en CSS. Allez jeter un cou d’oeil à <a href="http://pixelastic.github.io/css-flags/">CSS Flags</a>.</p>
</div>
<div class="paragraph">
<p>Son nouveau délire était de créer un moteur de recherche exclusivement en CSS. Certes le langage CSS est assez limité pour gérer les conditions, les boucles, les fonctions… Mais il est très performant pour sélectionner des éléments dans le DOM via les selectors. Et les combinateurs permettent d’ajuster les styles à un sous ensemble d’éléments.</p>
</div>
<div class="paragraph">
<p>Si vous n’êtes pas familier avec cette notion, les sélecteurs sont en fait des blocs de déclaration CSS pour identifier les parties spécifiques à mettre en forme dans un document HTML. Si vous avez déja ajouté du code dans une feuille de style CSS, vous connaissez forcément les sélecteurs</p>
</div>
<div class="ulist">
<ul>
<li>
<p>sélecteurs de type permettant de sélectionner des balises du langages HTML</p>
</li>
</ul>
</div>
<div class="listingblock">
<div class="content">
<pre>h1 {
   font-size: 1.5em;
}</pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>Sélecteur de classes permettant de sélectionner des éléments via les valeurs définies dans les propriétés HTML de type class</p>
</li>
</ul>
</div>
<div class="listingblock">
<div class="content">
<pre>.devmind_title{
   font-size: 1.1em;
   color: #2c2c2c;
}</pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>Sélecteur d’identifiant permettant de sélectionner l’élément défini avec un id particulier</p>
</li>
</ul>
</div>
<div class="listingblock">
<div class="content">
<pre>#welcome{
   text-transform: uppercase;
}</pre>
</div>
</div>
<div class="paragraph">
<p>Les sélecteurs d’attribut sont moins connus. Ils permettent de sélectionner les éléments HTML en fonction de leurs attributs et des valeurs de ces derniers. Un sélecteur d’attribut s’écrit avec des crochets "[]", dans lesquels on place le nom de l&#8217;attribut et éventuellement une condition sur la valeur de l&#8217;attribut.</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code><em>[attr]</em></code> : sélectionne tous les éléments avec l&#8217;attribut <code><em>attr</em></code>, quelque soit sa valeur.</p>
</li>
<li>
<p><code><em>[attr=val]</em></code> : sélectionne tous les éléments avec l&#8217;attribut <code><em>attr</em></code>, mais seulement si la valeur est égale à <code><em>val</em></code>.</p>
</li>
<li>
<p><code><em>[attr|=val]</em></code> : sélectionne tous les éléments dont l&#8217;attribut <code><em>attr</em></code> vaut val ou commence par <code><em>val</em></code></p>
</li>
<li>
<p><code><em>[attr^=val]</em></code> : sélectionne tous les éléments dont la valeur de l&#8217;attribut <code><em>attr</em></code> commence par <code><em>val</em></code></p>
</li>
<li>
<p><code><em>[attr@dollar@=val]</em></code> : sélectionne tous les éléments dont la valeur de l&#8217;attribut <code><em>attr</em></code> finit avec <code><em>val</em></code></p>
</li>
<li>
<p><code><em>[attr*=val]</em></code> : sélectionne tous les éléments dont la valeur de l&#8217;attribut <code><em>attr</em></code> contient la chaîne <code><em>val</em></code></p>
</li>
<li>
<p><code><em>[attr~=val]</em></code>: sélectionne tous les éléments avec l&#8217;attribut <code><em>attr</em></code>, seulement si la valeur <code><em>val</em></code> correspond à une des valeurs <code><em>attr</em></code>, séparées par des espaces.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Au delà des sélecteurs il est intéressant aussi de s’attarder sur les combinateurs qui permettent de sélectionner des voisins à un sélecteur donné.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Combinateur <code><em>‘+’</em></code> (voisin direct) permet de sélectionner les éléments qui suivent immédiatement un élément donné. Par exemple <code><em>p + span</em></code> permettra de cibler n’importe quel élément span qui suit un élémént  p</p>
</li>
<li>
<p>Combinateur <code><em>‘~’</em></code> (voisins) permet de sélectionner les nœuds qui suivent un élément et qui ont le même parent. Par exemple : <code><em>p ~ span</em></code> cible tous les spans d’un élement</p>
</li>
<li>
<p>Combinateur <code><em>‘@GT’</em></code> (enfants directs) permet de sélectionner les nœuds qui les fils directs d&#8217;un élément donné.</p>
</li>
<li>
<p>Combinateur <code><em>‘ ‘</em></code> (blanc) permet de sélectionner les nœuds qui sont des descendants (pas nécessairement des fils directs) d&#8217;un élément donné.</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_benjamin_de_cock"><a href="https://twitter.com/bdc">Benjamin De Cock</a></h2>
<div class="sectionbody">
<div class="paragraph">
<p>Benjamin travaille pour la société <a href="https://stripe.com/fr">Stripe</a>. Sa présentation avait pour but de faire un focus sur la puissance de la propriété CSS <a href="https://developer.mozilla.org/fr/docs/Web/CSS/display">display</a> et notamment de <a href="https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Grid_Layout">CSS Grid</a>  et dans une moinde mesure de CSS Flexbox.</p>
</div>
<div class="paragraph">
<p>Contrairement à quelques années en arrière, vous avez tous les outils aujourd’hui pour disposer facilement des éléments (selon une direction donnée via les flexbox) ou en découpant l’écran en zone (grid). Les flexbox sont utilisables partout</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/dotcss_03.png" alt="Flexbox">
</div>
<div class="title">Figure 1. Can i use flexbox</div>
</div>
<div class="paragraph">
<p>Et les CSS grid bientôt</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/dotcss_04.png" alt="CSS Grid">
</div>
<div class="title">Figure 2. Can i use CSS Grid</div>
</div>
<div class="paragraph">
<p>Sur les Flexbox je vous laisse lire <a href="https://www.dev-mind.fr/blog/2016/flexbox_layouts_faciles.html">mon article</a> sur le sujet. Il contient un lien vers la très bonne vidéo de <a href="https://twitter.com/hsablonniere">Hubert Sablonière</a> sur le sujet.</p>
</div>
<div class="paragraph">
<p>Chez Stripe, Benjamin a mis en place des feuilles de style à base de grilles (CSS grid) pour définir le layout commun à tous les écrans. Les animations sont ensuite appliquées sur ce layout complet et ceci a considérablement simplifier leur code.</p>
</div>
<div class="paragraph">
<p>Je ferai certainement un article sur CSS GRid prochainement mais voici un exemple simple. Si vous avez le HTML suivant</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1755673435894.26"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;one&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;two&quot;</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;three&quot;</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;four&quot;</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;five&quot;</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;six&quot;</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1755673435894.26')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez utiliser CSS grid pour indiquer que ce code s’affiche sous forme de grille. Cette spécification permet de définir les contraintes
* sur les colonnes et les lignes (nombre total et tailles minimales ou maximales) et
* sur chacune des cellules pour indiquer où les placer sur la grille et sur combien de colonnes ou de lignes</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-css" id="1755673435899.3352"><span class="hljs-selector-class">.grid</span>{
		<span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(<span class="hljs-number">3</span>, <span class="hljs-number">1</span>fr);
    <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">grid-auto-rows</span>: <span class="hljs-built_in">minmax</span>(<span class="hljs-number">100px</span>, auto);

	}
  <span class="hljs-selector-class">.grid</span> &gt; <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid <span class="hljs-built_in">rgb</span>(<span class="hljs-number">24</span>,<span class="hljs-number">111</span>,<span class="hljs-number">198</span>);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(<span class="hljs-number">33</span>,<span class="hljs-number">150</span>,<span class="hljs-number">243</span>,.<span class="hljs-number">5</span>);
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">1em</span>;
   }
	<span class="hljs-selector-class">.one</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span>;
  }
  <span class="hljs-selector-class">.two</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span> / <span class="hljs-number">4</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;
  }
  <span class="hljs-selector-class">.three</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span> / <span class="hljs-number">5</span>;
  }
  <span class="hljs-selector-class">.four</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">3</span>;
  }
  <span class="hljs-selector-class">.five</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">4</span>;
  }
  <span class="hljs-selector-class">.six</span> {
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">4</span>;
  }</code><button class="btn-copy-code" onclick="copyToClipboard('1755673435899.3352')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Ce qui donnera le visuel suivant</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/dotcss_02.png" alt="CSS Grid example">
</div>
<div class="title">Figure 3. Exemple CSS Grid</div>
</div>
<div class="paragraph">
<p>Vous pouvez voir le <a href="https://jsfiddle.net/devmindfr/awgo1u11/">JsFiddle</a></p>
</div>
<div class="paragraph">
<p>Une astuce intéressante a été montrée pendant le talk. Il est important de gérer les navigateurs qui ne savent pas interpréter une version trop récente d’une spécification CSS. Vous pouvez par exemple charger une feuille de style de fallback dynamiquement en JavaScript si votre navigateur n&#8217;implémente pas encore les CSS Grid. Par exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1755673435900.0486"><span class="hljs-keyword">if</span>(!<span class="hljs-string">&#x27;grid&#x27;</span> <span class="hljs-keyword">in</span> <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">style</span>){
  <span class="hljs-keyword">var</span> head  = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementsByTagName</span>(<span class="hljs-string">&#x27;head&#x27;</span>)[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">var</span> link  = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
  link.<span class="hljs-property">rel</span>  = <span class="hljs-string">&#x27;stylesheet&#x27;</span>;
  link.<span class="hljs-property">type</span> = <span class="hljs-string">&#x27;text/css&#x27;</span>;
  link.<span class="hljs-property">href</span> = <span class="hljs-string">&#x27;styles/fallbax.css&#x27;</span>;
  head.<span class="hljs-title function_">appendChild</span>(link);
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755673435900.0486')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_adam_detrick"><a href="https://twitter.com/akdetrick">Adam Detrick</a></h2>
<div class="sectionbody">
<div class="paragraph">
<p>Adam travaille chez <a href="https://www.meetup.com">Meetup</a>. Lorsqu’un projet commence à grossir, à avoir plusieurs équipes, le CSS suit la même tendance, il grossit sans cesse. Comme le disait Melvin Conway, “organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations”&#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>Le CSS augmente et il est de plus en plus compliqué à lire. Nous avons tendance à ne pas réutiliser les styles existants car nous avons toujours peur de casser quelque chose… Malheureusement on en crée de nouveaux, faisant encore grandir la complexité. Au bout d’un moment, quand on arrive à ne plus avoir ce que l’on veut à l’écran, on introduit les <code><em>!important</em></code>.  Pour rappel cette propriété indique que nous cassons l’héritage des styles, et là nous commençons à toucher le fond.</p>
</div>
<div class="paragraph">
<p>Mais il faut garder à l’esprit que le CSS est une ressource bloquante. Le navigateur doit l’interpréter pour être capable d’afficher les éléments à l’écran.  Plus vos feuilles de style seront grosses et complexes plus les pages seront longues à s’afficher.</p>
</div>
<div class="paragraph">
<p>Il est important de maîtriser les styles que l’on défini. Le problème n’est pas technique mais humain.</p>
</div>
<div class="paragraph">
<p>Plusieurs pistes</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Bannir le <code><em>!important</em></code></p>
</li>
<li>
<p>Définir une nomenclature de styles en utilisant des noms de style ni trop précis ni trop abstrait</p>
</li>
<li>
<p>Mettre en place une documentation des styles utilisés. Il existe plusieurs outils pour générer automatiquement cette documentation.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Niveau nomenclature Adam proposait d’utiliser la notation suivante</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1755673435900.042">.<span class="hljs-property">at</span>[<span class="hljs-title class_">Breakpoint</span>]_[property]--[variant]</code><button class="btn-copy-code" onclick="copyToClipboard('1755673435900.042')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Les breakpoint correspondent aux changements d’affichage au niveau des media queries. Par exemple</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/dotcss_05.png" alt="Nommage">
</div>
</div>
<div class="paragraph">
<p>Vous pouvez par exemple définir un style <code><em>.atLarge_margin&#8212;&#8203;center</em></code>. Il est important de définir des règles simples que tout le monde peut retrouver ou partager.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_florian_rivoal"><a href="https://twitter.com/frivoal">Florian Rivoal</a></h2>
<div class="sectionbody">
<div class="paragraph">
<p>Florian est membre du CSS working group et il est venu nous parler des prochaines évolutions du langage, et plus précisément des dernières évolutions sur les Media Queries.</p>
</div>
<div class="paragraph">
<p>Pour rappel une media query (ou requête média) définit un type de média et permet d’appliquer un ensemble de styles différents en fonction des particularités du média : largeur, hauteur, couleurs&#8230;&#8203;.</p>
</div>
<div class="paragraph">
<p>Les media queries ont connu plusieurs évolutions</p>
</div>
<div class="ulist">
<ul>
<li>
<p>CSS 2.1 : introduction de <code><em>@media screen</em></code> (écran), <code><em>@media print</em></code> (imprimante)</p>
</li>
<li>
<p>Le niveau 3 a permi de définir des caractéristiques du media afin d’être plus générique (largeur minimale, maximale….)</p>
</li>
<li>
<p>Les niveaux 4 et 5 arrivent et vont permettre de simplifier la syntaxe</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Par exemple aujourd’hui on écrit</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-css" id="1755673435900.0962"><span class="hljs-keyword">@media</span> (<span class="hljs-attribute">min-width</span>: <span class="hljs-number">20em</span>) <span class="hljs-keyword">and</span> (<span class="hljs-attribute">max-width</span>: <span class="hljs-number">40em</span>){
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755673435900.0962')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Demain nous écrirons</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-css" id="1755673435901.388"><span class="hljs-keyword">@media</span> (<span class="hljs-number">20em</span> &lt;= <span class="hljs-attribute">width</span> &lt;=<span class="hljs-string">&quot;40em){&quot;</span> }&lt; code&gt;&lt;/=&gt;</code><button class="btn-copy-code" onclick="copyToClipboard('1755673435901.388')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Autre exemple, nous pouvons aujourd’hui cumuler les déclarations pour être plus précis. Les déclarations peuvent être illisible comme par exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-css" id="1755673435901.6301"><span class="hljs-keyword">@media</span> (<span class="hljs-attribute">min-width</span>: <span class="hljs-number">20em</span>), <span class="hljs-keyword">not</span> all <span class="hljs-keyword">and</span> (<span class="hljs-attribute">min-height</span>: <span class="hljs-number">40em</span>){
   <span class="hljs-keyword">@media</span> <span class="hljs-keyword">not</span> all <span class="hljs-keyword">and</span> (<span class="hljs-attribute">pointer</span>:none){
   }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755673435901.6301')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Alors que demain nous pourrons simplement écrire</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-css" id="1755673435901.09"><span class="hljs-keyword">@media</span> ((<span class="hljs-attribute">width</span> &gt;= <span class="hljs-number">20em</span>) <span class="hljs-keyword">or</span> (<span class="hljs-attribute">height</span> &lt; <span class="hljs-number">40em</span>)) <span class="hljs-keyword">and</span> (<span class="hljs-keyword">not</span> (<span class="hljs-attribute">pointer</span>:none)){
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755673435901.09')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Voici le récapitulatif des propriétés</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/dotcss_06.png" alt="Media queries">
</div>
<div class="title">Figure 4. Media queries level 3, 4 and 5</div>
</div>
<div class="paragraph">
<p>Malheureusement ceci n’est pas encore implémenté dans les navigateurs et nous devrons encore attendre avant de les utiliser.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_laurence_penney"><a href="https://twitter.com/lorp">Laurence Penney</a></h2>
<div class="sectionbody">
<div class="paragraph">
<p>Laurence est venu nous parler de l’utilisation des fonts dans une application web. Quand nous voulons utiliser une police d’écriture (par exemple Lato), nous avons plusieurs niveaux de personnalisation.</p>
</div>
<div class="paragraph">
<p>Par exemple quand voulez utilisez la police d’écriture Lato vous déclarez dans votre page que vous utilisez la famille Lato</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-css" id="1755673435901.8633">&lt;link href=&quot;https://fonts.googleapis.com/css?family=Lato<span class="hljs-string">&quot; rel=&quot;</span>stylesheet<span class="hljs-string">&quot;&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1755673435901.8633')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Mais derrière si vous téléchargez cette famille vous avez plusieurs fichiers (dont la taille peut être non négligeable) en fonction des styles</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/dotcss_07.png" alt="Fonts">
</div>
<div class="title">Figure 5. Fonts de la famille Lato</div>
</div>
<div class="paragraph">
<p>Les possibilités de déclinaison sont énormes et nous pouvons définir des dizaines de dimension
* Taille
* Couleur
* Espacement
* Style
* Poids : Largeur du trait de thin à bold
* …</p>
</div>
<div class="paragraph">
<p>Avec les dernière versions de OpenType (2016 v1.8) le but est de définir un seul fichier et de définir à l’intérieur les variations autorisées. Ces variations sont personnalisables en CSS via les <code><em>font-variation-settings</em></code></p>
</div>
<div class="paragraph">
<p>Malheureusement pour le moment peu de navigateur permettent leur utilisation</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/dotcss_08.png" alt="font-variation-settings">
</div>
<div class="title">Figure 6. Can i use font-variation-settings</div>
</div>
<div class="paragraph">
<p>Si vous voulez tester les possibilités vous pouvez aller sur le site <a href="http://www.axis-praxis.org/specimens/dunbar">AxisPraxis</a>, développé par Laurence</p>
</div>
<div class="paragraph">
<p>A la fin de sa présentation Laurence nous a montré des travaux effectués sur des fonts contenant des icônes pour montrer que les fonts pourraient même servir dans un futur proche à créer des animations</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/dotcss_09.jpg" alt="DotCSS">
</div>
</div>
<div class="paragraph">
<p>Merci à toute la team dotCSS pour l&#8217;organisation de cet event</p>
</div>
</div>
</div>`;