export const _server_side_rendering:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<a class="link" fragment="#_pourquoi_le_ssr">Pourquoi le SSR ?</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_comment_fonctionne_le_ssr">Comment fonctionne le SSR ?</a></li>
<li><a class="link" fragment="#_inconvénients_du_ssr">Inconvénients du SSR</a></li>
</ul>

<a class="link" fragment="#_mettre_en_place_le_ssr_dans_une_application_angular">Mettre en place le SSR dans une application Angular</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_comment_procéder">Comment procéder ?</a></li>
</ul>

<a class="link" fragment="#_conclusion">Conclusion</a>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Le Server Side Rendering (SSR ou rendu côté serveur) consiste à générer le code HTML d&#8217;une page web sur le serveur, avant de l&#8217;envoyer au navigateur de l&#8217;utilisateur.</p>
</div>
<div class="paragraph">
<p>Cette technique n&#8217;est pas récente. Plusieurs langages de programmation (PHP&#8230;&#8203;) ou librairies de templating (JSP, Thymeleaf, Mustache,&#8230;&#8203;) peuvent être utilisées depuis très longtemps. Cependant le terme SSR, est utilisé depuis l&#8217;avènement des frameworks Javascript tels que React, Angular et NodeJS.</p>
</div>
<div class="paragraph">
<p>Je vais vous expliquer comment fonctionne le SSR, ses avantages et inconvénients, et dans quels cas il est recommandé de l&#8217;utiliser. Nous verrons enfin comment l&#8217;utiliser dans une application Angular.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2024/ssr_intro.png" alt="SSR ou CSR?" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_pourquoi_le_ssr">Pourquoi le SSR ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>React ou Angular ont popularisé le concept de Single Page Application (SPA) où le code HTML est généré côté client. On parle de Client Side Rendering (CSR ou rendu côté client). Ceci permet de créer des applications web plus réactives et dynamiques, mais cela peut poser des problèmes de référencement et de performance.</p>
</div>
<div class="paragraph">
<p>Prenons l&#8217;exemple d&#8217;une application Angular, vous avez un fichier index.html qui va charger les styles et les fichiers Javascript qui vont ensuite être capables de générer les pages de votre application. Mais plus votre application est conséquente, plus la taille, et donc le temps de chargement seront importants.</p>
</div>
<div class="paragraph">
<p>Le deuxième problème est le référencement. Quand vous voulez faire un site public, c&#8217;est certainement le principal problème car vous serez transparents sur le web. Les moteurs de recherche comme Google utilisent des robots d&#8217;indexation pour parcourir les pages web et les ajouter à leur index. Ces robots ne sont pas toujours  capables d&#8217;exécuter le Javascript. Pour eux votre site se résume à un fichier HTML pratiquement vide.</p>
</div>
<div class="paragraph">
<p>Le SSR benéficie aussi aux robots d&#8217;exploration des réseaux sociaux (crawlers) qui n&#8217;exécutent pas le Javascript. Un crawler, explore automatiquement le web pour extraire des informations à partir des pages visitées. Sur les réseaux sociaux ils sont utilisés quand vous partagez un lien pour générer un aperçu de la page.</p>
</div>
<div class="sect2">
<h3 id="_comment_fonctionne_le_ssr">Comment fonctionne le SSR ?</h3>
<div class="paragraph">
<p>Le mieux est d&#8217;utiliser un schéma pour expliquer le fonctionnement du SSR.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2024/SSR.png" alt="Comment fonctionne le SSR ?" width="800">
</div>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>(1)</strong> L&#8217;utilisateur clique sur un lien ou saisit une URL dans son navigateur.</p>
</li>
<li>
<p><strong>(2)</strong> Le navigateur envoie une requête HTTP au serveur.</p>
</li>
<li>
<p><strong>(3)</strong> Le serveur reçoit la requête et utilise un langage de templating ou un moteur de rendu pour générer le code HTML de la page demandée. Le HTML peut inclure des données dynamiques provenant de bases de données ou d&#8217;autres sources.</p>
</li>
<li>
<p><strong>(4)</strong> Le serveur envoie la réponse HTTP au navigateur, qui contient le code HTML complet de la page.</p>
</li>
<li>
<p><strong>(5)</strong> Le navigateur reçoit la réponse HTTP et affiche la page web à l&#8217;utilisateur.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Grâce au SSR, le navigateur reçoit le code HTML complet de la page dès la première réponse HTTP, ce qui permet d&#8217;afficher la page plus rapidement car il peut le faire avant le chargement du Javascript. Un contenu pur HTML est beaucoup plus facile à parser pour un robot d&#8217;indexation.</p>
</div>
</div>
<div class="sect2">
<h3 id="_inconvénients_du_ssr">Inconvénients du SSR</h3>
<div class="paragraph">
<p>Le rendu côté serveur peut générer plus de charge sur le serveur, car il doit générer chaque page web à chaque requête.</p>
</div>
<div class="paragraph">
<p>Les pages web rendues côté serveur peuvent aussi être moins réactives que les pages rendues côté client, car les interactions de l&#8217;utilisateur nécessitent généralement des requêtes HTTP supplémentaires vers le serveur.</p>
</div>
<div class="paragraph">
<p>Le SSR peut également poser des problèmes de performances si la page web utilise beaucoup de JavaScript, car le JavaScript doit être chargé et exécuté par le navigateur avant que la page ne soit interactive.</p>
</div>
<div class="paragraph">
<p>Il peut parfois être compliqué de mettre en place le SSR dans une application web existante, en particulier si elle a été conçue pour le rendu côté client.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_mettre_en_place_le_ssr_dans_une_application_angular">Mettre en place le SSR dans une application Angular</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Angular Universal est un outil qui permet de mettre en place le SSR dans une application Angular. Il utilise Node.js pour générer le code HTML des pages web côté serveur.</p>
</div>
<div class="paragraph">
<p>Ce site web a d&#8217;ailleurs été migré dernièrement pour utiliser Angular Universal. Ceci m&#8217;a permi de supprimer ma stack technique que j&#8217;étais le seul à maitriser pour une stack Angular que tout le monde connait.</p>
</div>
<div class="sect2">
<h3 id="_comment_procéder">Comment procéder ?</h3>
<div class="paragraph">
<p>Pour générer un nouveau projet Angular avec SSR, vous pouvez générer un nouveau projet avec Angular CLI en utilisant la commande suivante :</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1722519597708.3948">ng new my-ssr-app</code><button class="btn-copy-code" onclick="copyToClipboard('1722519597708.3948')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Angular CLI vous pose plusieurs questions pour la configuration de votre projet. Vous pouvez choisir d&#8217;ajouter Angular Universal en répondant "yes" à la question suivante :</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1722519597708.4731">@dollar@ ng new my-ssr-app
? Which stylesheet format would you like to use? Sass (SCSS)     [
https://sass-lang.com/documentation/syntax#scss                ]
? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)?
(y/N)</code><button class="btn-copy-code" onclick="copyToClipboard('1722519597708.4731')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour ajouter Angular Universal à un projet Angular existant, vous pouvez utiliser la commande suivante :</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1722519597708.546">ng add @nguniversal/express-engine</code><button class="btn-copy-code" onclick="copyToClipboard('1722519597708.546')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Une fois installer plusieurs scripts seront ajoutés à votre <code>package.json</code>.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-json" id="1722519597709.225"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-ssr-app&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;ng&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ng&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;start&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ng serve&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ng build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;watch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ng build --watch --configuration development&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ng test&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;serve:ssr:example&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node dist/example/server/server.mjs&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  ...
<span class="hljs-punctuation">}</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722519597709.225')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez lancer la compilation incrémentale de votre application avec la commande suivante dans un terminal:</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1722519597709.3457">npm run watch</code><button class="btn-copy-code" onclick="copyToClipboard('1722519597709.3457')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Et en parallèle dans un navigateur, lancez votre application en mode serveur avec la commande suivante :</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1722519597709.806">npm run  serve:ssr:example</code><button class="btn-copy-code" onclick="copyToClipboard('1722519597709.806')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez maintenant accéder à votre application Angular avec SSR en ouvrant un navigateur et en saisissant l&#8217;URL suivante : <code><a href="http://localhost:4000" class="bare">http://localhost:4000</a></code>.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Lors de mes premiers tests il y a quelques années j&#8217;avais rencontré plusieurs erreurs et j&#8217;avais abandonné. Aujourd&#8217;hui, la mise en place est beaucoup plus simple et je vous encourage à tester Angular Universal pour vos applications Angular.</p>
</div>
<div class="paragraph">
<p>Mais le SSR n&#8217;est pas la solution à tous les problèmes. Il peut être utile dans certains cas, mais il peut aussi poser des problèmes de performances et de réactivité. Il est important de peser le pour et le contre avant de décider d&#8217;utiliser le SSR dans une application web.</p>
</div>
<div class="paragraph">
<p>Le SSR est une bonne option pour les sites web statiques qui ne changent pas souvent de contenu. Mon site web est un excellent exemple. Il est composé de pages statiques générées en Asciisdoc et le travail se fait à la compilation.</p>
</div>
</div>
</div>`;