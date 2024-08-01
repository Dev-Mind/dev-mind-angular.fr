export const _ngeurope_angular_cli:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p><a href="https://twitter.com/hanslatwork">Hans Larsen</a> (Software Engineer <a href="https://twitter.com/Google">@Google</a>) est venu à ngeurope pour parler de angular cli et du futur de cet outil de génération d&#8217;application.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/ngeurope/ngeurope-angularcli00.jpg" alt="Angular cli">
</div>
</div>
<div class="paragraph">
<p>Revenons un peu à la version 1 de Angular. Lorsque vous démarrez un projet vous allez écrire un fichier index.html, puis vos composants en JS, potentiellement ajouter des tests unitaires, les paramétrer, puis des tests e2e…</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_que_faire_pour_démarrer">Que faire pour démarrer ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Soit vous êtes un adepte du DIY (do it yourself) et vous passez pas mal de temps à chaque fois à apprendre chaque outil de tooling ainsi que les différentes manières de les paramétrer.
Vous pouvez aussi utiliser un projet seed mais il vous sera difficile d’appliquer les mises à jour.</p>
</div>
<div class="paragraph">
<p>L’autre solution est d’utiliser un générateur tel que Yeoman mais vous risquez en fonction des plugins d’avoir pas mal de boilerplate loin de la simplicité préconisé par la team Google
A chaque fois vous êtes dépendants de une ou plusieurs solutions techniques (npm, bower, yo, gulp, webpack…). <a href="https://cli.angular.io/">Angular CLI</a> a vraiment été pensé pour être l’unique point d’entrée de votre projet et il est amené à évoluer avec votre projet.</p>
</div>
<div class="paragraph">
<p>Pour le moment <a href="https://cli.angular.io/">Angular CLI</a> se base sur webpack et malgré des dizaines de demandes pour accéder au fichier de configuration webpack utilisé par <a href="https://cli.angular.io/">Angular CLI</a> (ce qui permettrait de le personnaliser à la volée), l&#8217;équipe Angular est restée ferme. <a href="https://cli.angular.io/">Angular CLI</a> se veut comme une abstraction de différents outils bas niveaux. Le but est de pouvoir remplacer facilement webpack ou un autre outil par des solutions qui sont susceptibles d&#8217;arriver prochainement.</p>
</div>
<div class="paragraph">
<p>Tout le monde sait que le monde JS est rempli de projets qui deviennent la norme en à peine une semaine. Le dernier en date est <a href="https://yarnpkg.com/">Yarn</a>, inconnu avant mi-octobre et qui se retrouve parachuter dans tous les projets.</p>
</div>
<div class="paragraph">
<p>La philosophie <a href="https://cli.angular.io/">Angular CLI</a> c&#8217;est de préciser nos intentions et l’outil transforme notre projet pour matcher à nos besoins.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_quelques_commandes">Quelques commandes</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Angular CLI permet de gérer le cycle de vie de votre application</p>
</div>
<div class="paragraph">
<p>Initialisation d’un nouveau projet</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722519596670.2341">  ng <span class="hljs-keyword">new</span> <span class="hljs-variable constant_">PROJECT_NAME</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722519596670.2341')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Déploiement de l’application pour des tests manuels</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722519596670.5986">  ng serve</code><button class="btn-copy-code" onclick="copyToClipboard('1722519596670.5986')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Lancer les tests unitaires</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722519596670.5044">  ng test</code><button class="btn-copy-code" onclick="copyToClipboard('1722519596670.5044')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Lancer les tests e2e</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722519596670.8687">  ng e2e</code><button class="btn-copy-code" onclick="copyToClipboard('1722519596670.8687')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Packager l’application</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722519596670.714">  ng build --target=production --environment=prod (distinction des environnements dev et prod)</code><button class="btn-copy-code" onclick="copyToClipboard('1722519596670.714')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Génération d’un objet Angular 2 : component, directive, pipe, service, class, interface, route, module</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722519596671.0264">  ng g component my-<span class="hljs-keyword">new</span>-component</code><button class="btn-copy-code" onclick="copyToClipboard('1722519596671.0264')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Le projet <a href="https://github.com/angular/angular-cli" class="bare">https://github.com/angular/angular-cli</a> s’enrichit de jour en jour de nouvelles fonctionnalités.</p>
</div>
<div class="paragraph">
<p>Quand votre application Angular 2 est lancée, elle va afficher des templates de composants dans vos pages en fonction de la route sélectionnée. Les templates sont compilés par le framework par défaut au moment ou vous en avez besoin (compilation JIT just in time). Un autre mode, la compilation AoT (Ahead of Time) permet de les précompiler les templates pour simplifier le travail d’Angular lorsqu’il aura besoin d’un template. Angular CLI  vos permet de le faire</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722519596671.7268">ng build --prod --aot</code><button class="btn-copy-code" onclick="copyToClipboard('1722519596671.7268')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Angular CLI n’en est qu’à ces débuts. Plusieurs améliorations sont en cours d’écriture et devrait arriver plus ou moins rapidement</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Correction de bug</p>
</li>
<li>
<p>Installation plus rapide et plus légère</p>
</li>
<li>
<p>Utilisation de yarn à la place de npm</p>
</li>
<li>
<p>Une séparation CLI et du toolkit</p>
</li>
<li>
<p>Permettre l’ajout de add-ons sur le cycle de vie</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Fournir des capacités de migration automatique vers une version supérieure de CLI ou même de votre projet Angular 2 en cas d’évolution du framework vers une version 3, 4…</p>
</div>
<div class="videoblock">
<div class="title">Voir la vidéo</div>
<div class="content">
<iframe src="https://www.youtube.com/embed/LN2xvQqAo-g?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</div>
</div>`;