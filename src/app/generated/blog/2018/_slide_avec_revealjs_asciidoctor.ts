export const _slide_avec_revealjs_asciidoctor:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Je ne sais pas si vous faites souvent des présentations avec des slides. Pour du one shot j&#8217;utilise beaucoup Google Drive ou Impress (Libre office). Mais ces solutions sont limitées si je souhaite</p>
</div>
<div class="ulist">
<ul>
<li>
<p>afficher des exemples de code sans avoir à me battre avec le formatage</p>
</li>
<li>
<p>lancer mes slides en local quand je n&#8217;ai pas de réseau</p>
</li>
<li>
<p>avoir les sources de mes slides au format texte pour faciliter le suivi des mises à jour dans Git, et faciliter le mode collaboratif</p>
</li>
<li>
<p>générer des slides en HTML et pouvoir exécuter des exemples de code en JavaScript dans mes slides</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/reveal_00.png" alt="Reveal.js">
</div>
</div>
<div class="paragraph">
<p>Depuis plusieurs mois j&#8217;ai testé plusieurs générateurs de Slides avant de tomber sur <a href="https://github.com/hakimel/reveal.js">Reveal.js</a>. Il existe de nombreuses solutions mais elles ne sont pas toujours personnalisables. <a href="https://github.com/hakimel/reveal.js">Reveal.js</a> a l&#8217;aventage d&#8217;offrir un bon nombre de fonctionnalités : navigation, customisation, notes speakers, API pour étendre l&#8217;utilisation, export PDF&#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>Vous pouvez tester les possibilités  <a href="http://revealjs.com/">en ligne</a>. Reveal.js est un script que vous importez dans votre page HTML pour que votre page s&#8217;affiche sous forme de Slides. Si comme moi vous n&#8217;êtes pas fan du côté verbeux de HTML, et des classes CSS à apprendre, vous pouvez utiliser du markdown et le générateur de page HTML. Et encore mieux vous pouvez écrire vos slides en Asciidoctor avec ce  <a href="https://github.com/asciidoctor/asciidoctor-reveal.js/">plugin asciidoctor</a>.</p>
</div>
<div class="paragraph">
<p>Maintenant que nous avons une solution il nous reste à la personnaliser. L&#8217;outil vient avec pleins d&#8217;options mais il me manquait plusieurs choses, comme la possibilité</p>
</div>
<div class="ulist">
<ul>
<li>
<p>d&#8217;avoir des bandeaux en haut et en bas avec des informations générales</p>
</li>
<li>
<p>de changer un peu les styles pour sortir du moule Reveal.js et rester original</p>
</li>
<li>
<p>d&#8217;exécuter des scripts à l&#8217;intérieur de mes slides</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Vous pouvez trouver plein d&#8217;informations sur les pages Github <a href="https://github.com/hakimel/reveal.js">Reveal.js</a> et du  <a href="https://github.com/asciidoctor/asciidoctor-reveal.js/">plugin asciidoctor</a>. Mon but n&#8217;est pas de répéter ce qui est dit sur ces pages. Je vais essayer de compléter ces informations en m&#8217;appuyant sur l&#8217;abstract que j&#8217;utilise pour créer mes slides. Ce dernier est libre d&#8217;accès sous <a href="https://github.com/Dev-Mind/devmind-revealjs">Github</a> et vous pouvez le reprendre pour le personnaliser</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_comment_écrire_vos_slides">Comment écrire vos slides</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Revenons sur la syntaxe utilisée. Voici un exemple de présentation écrit en asciidoctor dans laquelle je vais avoir</p>
</div>
<div class="ulist">
<ul>
<li>
<p>un titre &#8658; Title Slide</p>
</li>
<li>
<p>plusieurs propriétés Reveal.js surchargées dans les métadata Asciidoc : <em>thème utilisé, higlighter utilisé pour la mise en forme du code source), affichage barre de progression et du numéro des slides, le thème custom qui me permet de surcharger le thème par défaut</em></p>
</li>
<li>
<p>un premier slide avec une liste d&#8217;éléments et des notes speakers</p>
</li>
<li>
<p>un second slide avec du texte simple et des notes speakers</p>
</li>
<li>
<p>un troisième slide ou je surcharge la couleur de fond par défaut</p>
</li>
<li>
<p>un quatrième slide qui affiche une image en plein écran sans titre</p>
</li>
<li>
<p>un cinquième slide ou on change la transition et on applique un effet zoom</p>
</li>
<li>
<p>un sixième slide ou on change la vitesse de transition</p>
</li>
<li>
<p>un septième slide ou les éléments de la liste sont affichés dynamiquement à chaque fois que vous avancez</p>
</li>
<li>
<p>un huitième slide avec du code affiché</p>
</li>
<li>
<p>un neuvième slide qui contient un sous slide que l&#8217;on peut lancer via la flêche bas. C&#8217;est un exemple de double navigation</p>
</li>
<li>
<p>un dixième slide avec une animation JavaScript.</p>
</li>
</ul>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-adoc" id="1734011714163.1013"><span class="hljs-section">= Title Slide</span>
<span class="hljs-meta">:source-highlighter:</span> highlightjs
<span class="hljs-meta">:revealjs_theme:</span> league
<span class="hljs-meta">:revealjs_progress:</span> true
<span class="hljs-meta">:revealjs_slideNumber:</span> true
<span class="hljs-meta">:revealjs_history:</span> true
<span class="hljs-meta">:revealjs_customtheme:</span> css/dm_league.css


<span class="hljs-section">== Slide One</span>

<span class="hljs-bullet">* </span>Foo
<span class="hljs-bullet">* </span>Bar
<span class="hljs-bullet">* </span>World

<span class="hljs-meta">[NOTE.speaker]</span>
<span class="hljs-bullet">--
</span><span class="hljs-section">this my notes
--</span>

<span class="hljs-section">== Slide Two</span>

Hello World - How are you ?

<span class="hljs-meta">[NOTE.speaker]</span>
<span class="hljs-bullet">--
</span><span class="hljs-section">Nothing to say
--</span>

<span class="hljs-meta">[background-color=&quot;#25b5f7&quot;]</span>
<span class="hljs-section">== Slide Three</span>

With another background color

<span class="hljs-meta">[%notitle]</span>
<span class="hljs-section">== Slide Four</span>

image::<span class="hljs-link">https://www.dev-mind.fr/img/logo/logo_1500.png</span>[<span class="hljs-string">canvas,size=contain</span>]


<span class="hljs-meta">[transition=zoom, %notitle]</span>
<span class="hljs-section">== Slide Five</span>

This slide will override the presentation transition and zoom!

<span class="hljs-meta">[transition-speed=fast, %notitle]</span>
<span class="hljs-section">== Slide Six</span>

Choose from three transition speeds: default, fast or slow!

<span class="hljs-section">== Slide Seven</span>

<span class="hljs-meta">[%step]</span>
<span class="hljs-bullet">* </span>this
<span class="hljs-bullet">* </span>is
<span class="hljs-bullet">* </span>revealed
<span class="hljs-bullet">* </span>gradually

<span class="hljs-section">== Slide Height</span>

Uses highlighted code

<span class="hljs-meta">[source, python]</span>
<span class="hljs-code"> ----</span>
print &quot;Hello World&quot;
<span class="hljs-code"> ----</span>

<span class="hljs-section">== Slide Nine</span>

Top slide

<span class="hljs-section">=== Slide Nine.One</span>

This is a vertical subslide

<span class="hljs-meta">[state=dynamic]</span>
<span class="hljs-section">== Slide Ten js...</span></code><button class="btn-copy-code" onclick="copyToClipboard('1734011714163.1013')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si vous voulez voir le rendu, vous pouvez faire un clone du projet <a href="https://github.com/Dev-Mind/devmind-revealjs">Github</a> et lancer les commandes (ces scripts s&#8217;appuient sur nodeJS que vous devez avoir sur votre poste ainsi que de yarn et de gulp)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight">yarn install
gulp serve</pre>
</div>
</div>
<div class="paragraph">
<p>Ce document sera converti par Asciidoctor en une page HTML important le script reveal.js. Comme pour tout document Asciidoc vous écrivez de manière hiérachique votre contenu.</p>
</div>
<div class="paragraph">
<p>Le document est converti via cette commande</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight">     <span class="hljs-keyword">const</span> attributes = {<span class="hljs-string">&#x27;revealjsdir&#x27;</span>: <span class="hljs-string">&#x27;node_modules/reveal.js@&#x27;</span>};
     <span class="hljs-keyword">const</span> options = {<span class="hljs-attr">safe</span>: <span class="hljs-string">&#x27;safe&#x27;</span>, <span class="hljs-attr">backend</span>: <span class="hljs-string">&#x27;revealjs&#x27;</span>, <span class="hljs-attr">attributes</span>: attributes};
     asciidoctor.<span class="hljs-title function_">convertFile</span>(filepath, options);</pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez utiliser l&#8217;application Asciidoctor en Ruby ou la nouvelle version en JavaScript.</p>
</div>
<div class="paragraph">
<p>Les notes speakers sont à mon sens très bien réussies. Si vous cliquez sur la touche s, elles apparaissent dans une nouvelle fenêtre. La navigation dans cette fenêtre est syncronisée avec l&#8217;autre et chose pratique, vou disposez d&#8217;un compteur pour afficher le temps</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/reveal_speaker.png" alt="Speaker note">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_un_outil_pour_automatiser_la_construction">Un outil pour automatiser la construction</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Pour me simplifier l&#8217;utilisation de ces outils, j&#8217;utilise Gulp. Gulp me permet de</p>
</div>
<div class="ulist">
<ul>
<li>
<p>convertir mes fichiers asciidoctor en HTML à la sauce "Reveal.js"</p>
</li>
<li>
<p>packager les dépendances</p>
</li>
<li>
<p>générer un mini site avec les fichiers HTML générés, mes images, mes styles personnalisés</p>
</li>
<li>
<p>injecter mes scripts Javascript personnalisés pour les slides dynamiques</p>
</li>
<li>
<p>lancer un serveur web qui recharge à la volée les pages quand je fais des modifications à l&#8217;intérieur</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Ce script est disponible sous <a href="https://github.com/Dev-Mind/devmind-revealjs/blob/master/gulpfile.js">Github</a></p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_personnaliser_les_styles">Personnaliser les styles</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Dans les metadata de la page vous pouvez spécifier un thème à la présentation : black (défaut), white, league, beige, sky, night, serif, simple, solarized. Si les thèmes ne vous conviennent pas, vous pouvez surcharger les propriétés dans un fichier externe. Les metadata peuvent être les suivantes</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-adoc" id="1734011714164.5789"><span class="hljs-meta">:revealjs_theme:</span> league
<span class="hljs-meta">:revealjs_customtheme:</span> css/custom.css</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714164.5789')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Voici ce que vous pouvez faire dans ce fichier custom.css</p>
</div>
<div class="sect2">
<h3 id="_utiliser_sa_propre_police_décriture">Utiliser sa propre police d&#8217;écriture</h3>
<div class="paragraph">
<p>Le mieux est de télécharger une police via un CDN. Nous faisons un import de cette police d&#8217;écriture dans la feuille de style. C&#8217;est une mauvaise pratique sur un site grand public mais dans notre cas nous voulons simplement exécuter notre présentation en local</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-css" id="1734011714164.0845"><span class="hljs-keyword">@import</span> url(<span class="hljs-attribute">https</span>://fonts.googleapis.com/css?family=<span class="hljs-attribute">Roboto</span>:<span class="hljs-number">400</span>,<span class="hljs-number">700</span>,<span class="hljs-number">400</span>italic,<span class="hljs-number">700</span>italic);
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#52a83b</span>;
  <span class="hljs-attribute">font-family</span>: Roboto, Arial, sans-serif;
}

<span class="hljs-selector-class">.reveal</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">&quot;Lato&quot;</span>, sans-serif;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">font-weight</span>: normal;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#eee</span>; }</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714164.0845')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_ajouter_des_bandeaux_en_haut_et_en_bas_de_chaque_slide">Ajouter des bandeaux en haut et en bas de chaque slide</h3>
<div class="paragraph">
<p>Quand je fais des slides j&#8217;aime beaucoup ajouter des informations dans des bandeaux en haut et ou en bas des slides, comme sur l&#8217;image ci dessous</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/reveal_bandau.png" alt="Bandeau en haut et en base de chaque page">
</div>
</div>
<div class="paragraph">
<p>On ne peut pas le faire avec Reveal.js mais c&#8217;est très facile de le faire en css</p>
</div>
<div class="paragraph">
<p>Le code ci dessous permet d&#8217;ajouter un bandeau en bas de chaque slide avec un copyright (<code><em>body:before</em></code>), et une image flottante à gauche avec dans mon cas mon logo (<code><em>body:before</em></code>).</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-css" id="1734011714165.7756"><span class="hljs-selector-tag">body</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">&#x27; &#x27;</span>;
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">6em</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">8em</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">../images/logo.svg</span>);
  <span class="hljs-attribute">background-size</span>: <span class="hljs-number">6em</span>;
  <span class="hljs-attribute">background-repeat</span>: no-repeat;
  <span class="hljs-attribute">background-position</span>: <span class="hljs-number">3%</span> <span class="hljs-number">96%</span>; }

<span class="hljs-selector-tag">body</span><span class="hljs-selector-pseudo">:before</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">&#x27;© Dev-Mind 2018&#x27;</span>;
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#424242</span>;
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.9rem</span>;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714165.7756')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si vous voulez ajouter un bandeau en haut vous ne pouvez plus surcharger le style de la balise body vu qu&#8217;on vient de le faire juste avant. Ce n&#8217;est pas très grave car chaque page correspond à une section d&#8217;une page HTML ayant une classe de style nommée <code>reveal</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-css" id="1734011714166.185"><span class="hljs-selector-class">.reveal</span><span class="hljs-selector-pseudo">:before</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">&#x27;Reveal.js par la pratique&#x27;</span>;
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#424242</span>;
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.9rem</span>;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714166.185')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez vous amuser à surcharger ou ajouter d&#8217;autres choses dans les styles. Mais si CSS peut être obscur, il permet en quelques lignes de personnaliser le contenu de n&#8217;importe qu&#8217;elle page HTML.</p>
</div>
</div>
<div class="sect2">
<h3 id="_ajouter_une_touche_de_dynamisme">Ajouter une touche de dynamisme</h3>
<div class="paragraph">
<p>Il reste un use case qui n&#8217;est pas couvert par la documentation officielle. Ajouter une ou plusieurs pages dynamiques pour une démo web par exemple. Si vous faites du reveal.js pur en écrivant du HTML, vous n&#8217;avez pas trop de souci car vous pouvez simplement importer vos propres scripts dans vos pages. Avec le plugin asciidoctor, vous devrez ruser un peu plus</p>
</div>
<div class="paragraph">
<p>Commencez par ajouter un état au slide concerné. Par exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-adoc" id="1734011714166.7449"><span class="hljs-meta">[state=dynamic-example]</span>
<span class="hljs-section">== Slide Ten js...</span></code><button class="btn-copy-code" onclick="copyToClipboard('1734011714166.7449')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>L&#8217;API reveal.js permet d&#8217;interagir avec cet état. Lorsque le slide sera chargé un événement portant le même nom que l&#8217;état sera émis</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-adoc" id="1734011714166.5708">Reveal.addEventListener( <span class="hljs-emphasis">&#x27;dynamic-example&#x27;</span>, function() {
<span class="hljs-code">    //</span>
}, false );</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714166.5708')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez écrire un fichier javascript <code>js/custom.js</code>. Pour agir avec le slide, vous pouvez utiliser l&#8217;id généré à partir du titre que vous avez défini. Dans l&#8217;exemple ci dessous, je crée en Javascript une page avec deux boutons, et le clic sur un bouton change la couleur du paragraphe. Un innerHTML permet de peupler le HTML final</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1734011714168.0325"><span class="hljs-title class_">Reveal</span>.<span class="hljs-title function_">addEventListener</span>( <span class="hljs-string">&#x27;dynamic&#x27;</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {

  <span class="hljs-keyword">const</span> html = @backtick@
    &lt;h1&gt;<span class="hljs-title class_">Dynamic</span> slide&lt;/h1&gt;
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>My paragraph<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;myparagraph&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>Choose a color<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;document.getElementById(&#x27;myparagraph&#x27;).style.color =&#x27;red&#x27;&quot;</span>&gt;</span>Red<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;document.getElementById(&#x27;myparagraph&#x27;).style.color =&#x27;blue&#x27;&quot;</span>&gt;</span>Blue<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
  @backtick@;

  <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;slide_ten_js&#x27;</span>).<span class="hljs-property">innerHTML</span> = html;
}, <span class="hljs-literal">false</span> );</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714168.0325')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Malheureusement je n&#8217;ai pas trouvé le moyen d&#8217;indiquer à Asciidoctor qu&#8217;il fallait prendre en compte ce fichier Javascript. Mais Gulp peut nous aider. Dans mon cas je rajoute le chargement du script après la convertion asciidoctor &#8594; HTML</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1734011714169.2354">gulp.<span class="hljs-title function_">task</span>(<span class="hljs-string">&#x27;copy-html&#x27;</span>, <span class="hljs-function">() =&gt;</span>
  gulp.<span class="hljs-title function_">src</span>(<span class="hljs-string">&#x27;src/**/*.html&#x27;</span>)
    .<span class="hljs-title function_">pipe</span>(@dollar@.<span class="hljs-title function_">tap</span>(<span class="hljs-function">(<span class="hljs-params">file, cb</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> newFile = file.<span class="hljs-property">contents</span>.<span class="hljs-title function_">toString</span>();
      <span class="hljs-keyword">const</span> newContents = newFile.<span class="hljs-title function_">replace</span>(<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&lt;script src=&quot;js/custom.js&quot;&gt;&lt;/script&gt;&#x27;</span>);
      file.<span class="hljs-property">contents</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Buffer</span>(newContents);
      <span class="hljs-keyword">return</span> file;
    }))
    .<span class="hljs-title function_">pipe</span>(gulp.<span class="hljs-title function_">dest</span>(<span class="hljs-string">&#x27;build/dist&#x27;</span>))
);</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714169.2354')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez utiliser ce hack pour introduire tous les scripts que vous souhaitez, comme par exemple inclure votre framework favori que vous présentez dans vos slides.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Je pourrai encore décrire d&#8217;autres cas d&#8217;utilisations plus courants mais je ne souhaite pas copier les documentations officielles <a href="https://github.com/hakimel/reveal.js">Reveal.js</a> ou du  <a href="https://github.com/asciidoctor/asciidoctor-reveal.js/">plugin asciidoctor</a>. Elles sont beaucoup plus complètes que cet article et je vous laisse les parcourir</p>
</div>
</div>
</div>`;