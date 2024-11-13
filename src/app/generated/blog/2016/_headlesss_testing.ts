export const _headlesss_testing:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Quel moteur JavaScript utilisez-vous pour exécuter vos tests unitaires et vos tests end-to-end écrits en JavaScript ? Vous avez le choix&#8230;&#8203; Pour les tests unitaires vous pouvez soit utiliser un navigateur classique (Chrome, Firefox&#8230;&#8203;) soit un navigateur headless (sans interface graphique) comme <a href="http://phantomjs.org/">PhantomJS</a>.</p>
</div>
<div class="paragraph">
<p><a href="http://phantomjs.org/">PhantomJS</a> utilise le moteur Javascript <a href="https://webkit.org/">WebKit</a> et c’est l’idéal pour exécuter des tests sur un serveur où aucun écran n’est branché (plateforme d’intégration continue par exemple). Par contre vous ne pouvez pas utiliser ce type de navigateur pour vos tests end-to-end car vous avez besoin d’interagir avec l’interface.</p>
</div>
<div class="paragraph">
<p>Quand vous faites des tests <a href="http://www.seleniumhq.org/">Selenium</a> (ou <a href="http://www.protractortest.org/#/">Protractor</a>) vous avez la possibilité d&#8217;utiliser les services <a href="https://saucelabs.com/">SauceLabs</a> pour déporter l’exécution des tests sur leurs serveurs. Mais le coût n’est pas anodin. L’autre solution est d’essayer d’utiliser une solution de virtualisation de serveur X sur votre plate-forme qui exécute les tests et vous pourrez ainsi utiliser n’importe quel navigateur.</p>
</div>
<div class="paragraph">
<p>Nous allons donc voir comment installer <a href="https://www.x.org/archive/X11R7.6/doc/man/man1/Xvfb.1.xhtml">Xvfb</a> sur un serveur Linux.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/testheadless_00.png" alt="Test headless">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_un_projet_exemple">Un projet exemple</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Vous pouvez consulter l&#8217;exemple de projet sous <a href="https://github.com/Dev-Mind/devmind-xvfb">mon Github</a>. Ce projet est une petite application AngularJS comportant des tests unitaires lancés via Karma et des tests end-to-end exécutés via Protractor. Dans les deux cas j’utilise Firefox.</p>
</div>
<div class="paragraph">
<p>Vous pouvez bien évidemment utiliser d’autres versions de navigateur, utiliser une autre stack technique. Ce qui est dit dans cet article restera vrai. Si vous voulez vérifier l’exécution le projet contient également un DockerFile permettant de lancer un conteneur sous CentOS 6.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_xvfb">Xvfb</h2>
<div class="sectionbody">
<div class="paragraph">
<p><a href="https://www.x.org/archive/X11R7.6/doc/man/man1/Xvfb.1.xhtml">Xvfb</a> (X virtual framebuffer) est un serveur X virtuel. Xvfb implémente le protocole de serveur d’affichage X11. Les requêtes, les événements, les erreurs sont les mêmes mais rien n’est affiché, tout se passe en mémoire.</p>
</div>
<div class="paragraph">
<p>Nous pouvons utiliser cette solution sur un serveur qui n’a aucun écran. La seule chose qui est utilisé c’est la couche réseau.</p>
</div>
<div class="paragraph">
<p>Sur CentOS vous devrez installer les packages suivants</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527923266.5864">yum install -y Xvfb libXfont Xorg firefox</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923266.5864')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si vous lancez firefox vous avez le message d’erreur suivant</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527923266.9626">Error: no display specified</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923266.9626')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Utilisons maintenant Xvfb. Pour pouvoir lancer une commande dans un serveur X virtualisé Xvfb vous pouvez utiliser le wrapper <a href="http://manpages.ubuntu.com/manpages/xenial/man1/xvfb-run.1.html">xvfb-run</a> qui simplifie la configuration du serveur X et de votre processus</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527923267.6245">xvfb-run -a firefox</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923267.6245')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Permet de lancer votre navigateur cette fois sans erreur. Si vous utilisez le conteneur Docker que je vous ai fourni vous pouvez lancer l’exécution des tests unitaires via Gulp</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527923267.512">gulp unit
⇒ error

xvfb-run -a gulp unit
⇒ OK</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923267.512')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Il en est de même pour les tests end-to-end</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527923267.1938">gulp e2e
⇒ error

xvfb-run -a gulp e2e
⇒ OK</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923267.1938')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>La configuration des tests est tout à fait classique et je vous laisserai consulter les sources du projet exemple si vous voulez plus d’informations. Ce qui est intéressant de noter c’est que sans changer la moindre configuration dans votre projet vous êtes maintenant capable d’exécuter des tests sur n’importe quel serveur qu’il dispose d’un écran ou non.</p>
</div>
<div class="paragraph">
<p>Vous avez peut être remarqué l’option <code><em>-a</em></code> que j’ai ajouté à la commande <code><em>xvfb-run</em></code>. Quand vous lancez une commande Xvfb vous pouvez spécifier plusieurs options</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Un numéro de serveur : c’est utile quand vous lancez plusieurs commandes en parallèles. Sur un serveur d’intégration continue on lance souvent plusieurs jobs concurrents</p>
</li>
<li>
<p>Un écran : vous pouvez choisir quel écran est lancé et quelle résolution il a</p>
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
<pre class="highlight"><code class="language-java" id="1731527923267.0042">Xvfb :<span class="hljs-number">1</span> -screen <span class="hljs-number">0</span> 1600x1200x32</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923267.0042')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Le serveur écoutera les connexions sur le serveur numéro 1, l’écran numéro 0 ayant une résolution de 1600x1200 et une profondeur de 32</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527923268.5442">Xvfb :<span class="hljs-number">45</span> -screen <span class="hljs-number">1</span> 1600x1200x16</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923268.5442')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Le serveur écoutera les connexions sur le serveur numéro 45, l’écran numéro 1 ayant une résolution de 1600x1200 et une profondeur de 16</p>
</div>
<div class="paragraph">
<p>L’option <code><em>-a</em></code> de la commande <code><em>xvfb-run</em></code> permet d’allouer un numéro de serveur non utilisé. Xvfb utilise par défaut l’écran 0 et ce dernier a une résolution de 640x480x8. Si vous voulez une autre taille d’écran dans les tests end-to-end vous pouvez par exemple utiliser la commande</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527923268.134">xvfb-run -a --server-args=<span class="hljs-string">&quot;-screen 0 1024x768x24&quot;</span> gulp e2e</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923268.134')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_configuration_jenkins">Configuration Jenkins</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Comment faciliter l’exécution de vos jobs Jenkins ? C’est un peu dur de passer par la commande <code><em>xvf-run</em></code>&#8230;&#8203; Rassurez vous comme je l’ai dit plus haut,  xvf-run n’est qu’un wrapper qui vous simplifie l&#8217;interaction avec Xvfb.</p>
</div>
<div class="paragraph">
<p>Dans Jenkins vous pouvez utiliser le <a href="https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin">plugin</a> dédié qui lancera un serveur avant l’exécution de votre job et le fermera à la fin.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/testheadless_01.png" alt="Jenkins Test headless">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_les_ressources">Les ressources</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Cet article m’a été inspiré par la lecture du <a href="https://gist.github.com/addyosmani/5336747">Gist</a> partagé par <a href="https://twitter.com/addyosmani">Addy Osmani</a> et lorsque je voulais savoir comment <a href="https://docs.travis-ci.com/user/gui-and-headless-browsers/">Travis CI</a> se débrouillait sur leurs serveurs.</p>
</div>
<div class="paragraph">
<p>Vous trouverez ici un <a href="https://gist.github.com/nwinkler/f0928740e7ae0e7477dd">article</a> expliquant comment piloter Xvfb via Grunt</p>
</div>
<div class="paragraph">
<p>Pour finir la page du <a href="https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin">plugin Jenkins</a>.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Vous avez maintenant toutes les ressources pour utiliser les navigateurs que vous voulez sur vos serveurs d’intégration continue tournant sous Linux. Personnellement j’ai de plus en plus d’erreur d’installations avec PhantomJS, des difficultés pour savoir quelle est la bonne version à utiliser&#8230;&#8203; et au final je préfère être au plus près de l’utilisateur final et  tester les applications sur les navigateurs cibles.</p>
</div>
</div>
</div>`;