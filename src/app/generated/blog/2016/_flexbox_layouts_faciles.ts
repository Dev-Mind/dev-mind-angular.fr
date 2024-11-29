export const _flexbox_layouts_faciles:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Etes vous plus <a href="https://www.google.com/design/spec/material-design/introduction.html">Material Design</a>, <a href="http://getbootstrap.com/">Boostrap</a>, <a href="http://purecss.io/">Pure CSS</a>, <a href="http://foundation.zurb.com/sites.html">Fundation</a> ? Pourquoi passez-vous par un framework CSS ?</p>
</div>
<div class="paragraph">
<p>Je pensais au début qu’ils allaient me faire gagner du temps mais au final je suis toujours obligé d’apprendre de nouvelles classes de style. Si j’avais investi autant de temps dans l’apprentissage de CSS j’aurai perdu moins de temps. Aujourd’hui nous pouvons faire beaucoup plus simple avec de simples notions basiques de CSS. Certes j&#8217;accentue le trait pour vous faire réagir car les frameworks CSS peuvent avoir un intérêt lorsque nous construisons une application d&#8217;entreprise.</p>
</div>
<div class="paragraph">
<p>En CSS le plus gros problème reste la disposition des éléments. Vous devez connaître quelques astuces pour arriver à vos fins. C’est pourquoi la grosse majorité des développeurs (et moi le premier) galèrent parfois à placer les éléments les uns par rapport aux autres.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/flexbox_layouts_faciles_01.png" alt="Flexbox">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_les_flexbox">Les flexbox</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Nous allons voir dans cet article comment nous pouvons disposer simplement des éléments dans une page web avec quelques propriétés CSS. Et pour celà je vais m’appuyer sur les <a href="https://www.w3.org/TR/2012/CR-css3-flexbox-20120918/">flexbox</a>. Si vous regardez les navigateurs supportant cette feature, je pense que vous pouvez maintenant l’utiliser dans la plupart des cas.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/flexbox_layouts_faciles_02.png" alt="Can i use Flexbox ?">
</div>
</div>
<div class="paragraph">
<p>Mon but est de montrer comment répondre à 2 problématiques</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Mettre en place un layout avec un header et un footer fixes, et un corps de page qui prend le reste de l’espace et permet de scroller si besoin</p>
</li>
<li>
<p>Disposer des éléments sous forme de grille avec potentiellement des zones plus grandes que d’autres</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Les flexbox (flexible box) permettent via quelques règles de disposer des élements dans un élément parent (position, alignment, espacement…). Le but de cette spécification est d’essayer d’optimiser l’espace disponible dans l’élément parent. Nous pouvons définir via quelques propriétés le comportement lors d’un redimensionnement (extension des box ou réduction).</p>
</div>
<div class="paragraph">
<p>Quand on utilise les flexbox nous n’avons pas de notion de droite/gauche, haut/bas. Nous pouvons définir une disposition selon un axe : ligne ou colonne.</p>
</div>
<div class="paragraph">
<p>Pour disposer les éléments sous forme de grille, une autre spécification, <a href="https://www.w3.org/TR/css-grid-1/">Grid</a> est en cours d’adoption mais elle loin d’être utilisable sous tous les devices. C’est pourquoi j’utiliserai aussi les flexbox pour apporter une réponse à ce problème</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/flexbox_layouts_faciles_03.png" alt="Can i use Grid ?">
</div>
</div>
<div class="paragraph">
<p>Il est temps de prendre un exemple. Nous allons construire cette page</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/flexbox_layouts_faciles_04.png" alt="Exemple de page" width="50%" height="auto">
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1732912450691.8635"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Exemple de flexbox<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;style.css&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;icon&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;favicon.ico&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;image/x-icon&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;link&quot;</span> <span class="hljs-attr">fragment</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>Link 1 <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;link&quot;</span> <span class="hljs-attr">fragment</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>Link 2 <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;link&quot;</span> <span class="hljs-attr">fragment</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>Link 3 <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;logo&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;assets/img/logo_1500.png&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;img-responsive&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">grid</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;extended&quot;</span>&gt;</span>Column 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Column 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Column 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Column 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">grid</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
        All right reserved - @2016 Guillaume EHRET
    <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1732912450691.8635')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour le moment le rendu est assez basique</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/flexbox_layouts_faciles_05.png" alt="Page au début" width="50%" height="auto">
</div>
</div>
<div class="paragraph">
<p>Pas très responsive tout ça…. Nous allons compléter au fur et à mesure notre feuille de style</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_définir_un_layout_principal">Définir un layout principal</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Pour commencer nous devons dire que notre page occupera 100% de l’espace. Vous pouvez le faire en définissant le code ci dessous (on le déclare à la fois pour la balise <code><em>html</em></code> et <code><em>body</em></code> car tous les navigateurs ne gèrent pas cette définitition de la même manière)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-css" id="1732912450691.0183"><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">max-height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450691.0183')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Nous indiquons que notre espace principal est une flexbox via l’attribut <code><em>display</em></code>. Nous définissons aussi la direction de l’axe via la propriété <code><em>flex-direction</em></code> (la propriété par défaut est en ligne mais là nous voulons une orientation en colonne)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-css" id="1732912450692.8977"><span class="hljs-attribute">display</span>: flex;
<span class="hljs-attribute">flex-direction</span>: column;</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450692.8977')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Nous pouvons également indiquer comment les élements sont affichés</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Au niveau de notre axe x via la propriété <code><em>justify-content</em></code> (<code><em>flex-start</em></code> [défaut], <code><em>flex-end</em></code>, <code><em>center</em></code>)</p>
</li>
<li>
<p>Au niveau de l’axe y via la proprité <code><em>align-items</em></code></p>
</li>
<li>
<p>Au niveau du contenu des éléments, propriété <code><em>align-content</em></code></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Si vous voulez tester les différentes possibilités je vous conseille le site <a href="http://flexbox.help/" class="bare">http://flexbox.help/</a> ou <a href="http://codepen.io/osublake/pen/dMLQJr/" class="bare">http://codepen.io/osublake/pen/dMLQJr/</a></p>
</div>
<div class="paragraph">
<p>Dans notre header on veut afficher les élements à droite de l’axe x et au milieu de l’axe y. Nous commençons par dire que notre header est elle même une flexbox</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1732912450692.1936">header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450692.1936')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Les 3 principales propriétés pour les éléments d’une flexbox sont</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code><em>flex-grow</em></code> : on indique comment un élément occupe l’espace en définissant un poids (par défaut 0). Si tous les éléments ont le même poids l’espace est découpé équitablement</p>
</li>
<li>
<p><code><em>flex-shrink</em></code> : indique si un élément peut se réduire quand la place vient à manquer. Par défaut la valeur est 1 pour indiquer que oui.</p>
</li>
<li>
<p><code><em>flex-basis</em></code> : permet de définir la taille par défaut d’un élément avant que les 2 autres propriétés soient appliquées avant de répartir l’espace restant</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Ces 3 propriétés peuvent être jumelées dans la propriété <code><em>flex</em></code>. Tous les élements d’une flexbox ont par défaut une propriété <code><em>flex : 0 1 auto</em></code></p>
</div>
<div class="paragraph">
<p>Maintenant que nous savons tout ça nous pouvons indiquer comment l’espace se répartit entre le header, la zone main et le footer. Le header et le footer ne doivent pas bouger en cas de redimensionnement et nous pouvons imposer une taille de 64px à notre header</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1732912450692.4182">header {
    flex: 0 0 64px;
}
main {
    flex: 1 1 auto;
}
footer {
    flex: 0 1;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450692.4182')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_définir_une_grille">Définir une grille</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Pour mes besoins de grille nous avons déjà tout vu plus haut et au final notre code CSS ressemblera à ça</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1732912450692.2517">grid {
    display: flex;
}

grid &gt; div {
    flex: 1;
    margin: 10px;
    padding: 1em;
    text-align: center;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450692.2517')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Notre page commence à prendre forme</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_au_final">Au final</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Les éléments sont disposés correctement mais notre page n’est pas très jolie. On peut rajouter rapidement quelques propriétés pour embellir notre page et la rendre plus harmonieuse</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Une font un peu plus sympa</p>
</li>
<li>
<p>Des couleurs pour distinguer le footer et le header</p>
</li>
<li>
<p>Une ombre sur le header pour montrer qu’il est surélevé et fixe</p>
</li>
<li>
<p>Une scrollbar dans la partie centrale</p>
</li>
<li>
<p>Rendre l’image responsive</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Les flexbox permettent vraiment de nous simplifier la vie lorsque l’on veut disposer nos élements les uns par rapport aux autres. Sur le sujet je vous conseille le site <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">css-tricks</a> ou la <a href="https://www.youtube.com/watch?v=5F_ngjHDcJQ">vidéo</a> dans laquelle <a href="https://twitter.com/hsablonniere">Hubert Sablonnière</a> explique comment marche les flexbox à Devoxx France 2016.</p>
</div>
<div class="videoblock">
<div class="title">La vidéo de Hubert sur les Flexbox</div>
<div class="content">
<iframe src="https://www.youtube.com/embed/5F_ngjHDcJQ?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez retrouver les sources complètes sous Github</p>
</div>
</div>
</div>`;