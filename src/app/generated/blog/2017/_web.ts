export const _web:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Après avoir parlé du <a href="https://www.dev-mind.fr/blog/2017/internet.html">réseau Internet</a>, il est temps de parler des applications utilisant Internet. Au début le mail était celle qui prédominait, mais aujourd’hui c’est sans contexte le World Wide Web (www) plus communément appelé le web.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/web_00.png" alt="Internet">
</div>
</div>
<div class="paragraph">
<p>Le web est une application qui permet de consulter une ressource via un logiciel (navigateur internet) et de naviguer vers d’autres ressources en cliquant sur des liens hypertextes. Une ressource peut aussi bien être une page, une vidéo, une image…. Les transferts se font via le protocole HTTP.</p>
</div>
<div class="paragraph">
<p>Le maillage des ressources web peut être vu comme une immense toile d’araignée (Spider Web). C’est de là qu’est issu le nom World Wide Web (www).</p>
</div>
<div class="paragraph">
<p>Au fur et à mesure de leurs évolutions, les technologies Web ont permis aux développeurs de rendre le Web de plus en plus captivant.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_création_du_web">Création du web</h2>
<div class="sectionbody">
<div class="paragraph">
<p>En 1989 Tim Berners-Lee décide de créer au CERN (Centre Européen de la Recherche sur le Nucléaire) un système distribué au sein du réseau du centre de recherche pour faciliter l’échange des documents entre les différents collaborateurs. Robert Cailliau rejoint très vite le projet pour aider à son développement.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/web_01.png" alt="Tim Berners-Lee">
</div>
<div class="title">Figure 1. Tim Berners-Lee</div>
</div>
<div class="paragraph">
<p>En 1993 le CERN renonce aux droits d’auteur sur les logiciels écrits pour leur World Wide Web. Ce projet devient alors utilisable par tous. La même année un laboratoire américain NCSA, sort</p>
</div>
<div class="ulist">
<ul>
<li>
<p>le premier navigateur nommé Mosaic (il servira de sources d’inspiration ensuite à Netscape Navigator puis plus tard à Mozilla Firefox).</p>
</li>
<li>
<p>le serveur NCSA HTTPd qui deviendra plus tard le serveur HTTP Apache.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>La révolution est en marche le web peut devenir le plus grand système d’information.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_fonctionnement">Fonctionnement</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Le web permet de mettre à disposition différentes ressources (image, pages, video…) qui sont situées sur des serveurs distants.</p>
</div>
<div class="paragraph">
<p>Pour accéder à ces ressources vous avez besoin</p>
</div>
<div class="ulist">
<ul>
<li>
<p>D’un device connexté à Internet  (on parle d’un hôte)</p>
</li>
<li>
<p>D’un logiciel sur ce device qui permet d’afficher les ressources : le navigateur Internet</p>
</li>
<li>
<p>D’un logiciel sur le serveur distant qui permet d’indiquer et d’envoyer les ressources mises à disposition : le serveur HTTP</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Le protocole d’échange se nomme le HTTP (HyperText Transfer Protocole). Nous le verrons en détail un peu plus loin.</p>
</div>
<div class="paragraph">
<p>Le nombre de sites Web augmente fortement et il est nécéssaire de pouvoir les retrouver rapidement. En 1994 le premier moteur de recherche Yahoo, est mis en ligne. Depuis le nombre de sites web et le nombre d’internautes ne fait que bondir</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/web_03.png" alt="Nombre site web">
</div>
<div class="title">Figure 2. <a href="http://www.internetlivestats.com/total-number-of-websites/" class="bare">http://www.internetlivestats.com/total-number-of-websites/</a></div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_langages">Langages</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Les sites web sont écrits avec plusieurs langages qui sont interprétés par un logiciel le navigateur sur le poste client</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/web_02.png" alt="Les langages du Web">
</div>
<div class="title">Figure 3. Les langages du Web</div>
</div>
<div class="sect2">
<h3 id="_html_hypertext_markup_pour_décrire_le_contenu">HTML HyperText markup pour décrire le contenu</h3>
<div class="paragraph">
<p>Le HTML est un langage descriptif permettant de décrire et d’organiser le contenu de vos pages</p>
</div>
<div class="paragraph">
<p>La première version est sortie en 1993 et très vite le langage a été enrichi de nouvelles balises : 1.2 en 1994, 3 en 1995, 3.2 en 1997 et version 4 en 1998. La version 5 (version actuelle) n’est apparue qu’en 2008</p>
</div>
</div>
<div class="sect2">
<h3 id="_le_javascript_pour_apporter_du_dynamisme">Le JavaScript pour apporter du dynamisme.</h3>
<div class="paragraph">
<p>Il a été mis en place en 1995 par Netscape. En 1996 Microsoft emboite le pas en créant son propre langage le Jscript. Heureusement le langage a été normalisé pour permettre sa globalisation. Malheureusement la norme n’est pas toujours complètement implémentée par les éditeurs des navigateurs Internet et certains ont toujours du retard.</p>
</div>
<div class="paragraph">
<p>Pour savoir si un élément est correctement implémenté dans un navigateur vous pouvez utiliser le site <a href="https://caniuse.com" class="bare">https://caniuse.com</a></p>
</div>
</div>
<div class="sect2">
<h3 id="_le_css_cascading_style_sheet_pour_le_coup_de_pinceau">Le CSS (Cascading Style Sheet) pour le coup de pinceau</h3>
<div class="paragraph">
<p>Dès 1994 CSS est mis en place pour externaliser les aspects graphiques des pages écrites en HTML.</p>
</div>
<div class="paragraph">
<p>Le but est de pouvoir simplifié l’écriture de ces pages et de facilité la mise en place d’une ergonomie uniforme sur tout votre site.</p>
</div>
<div class="paragraph">
<p>Les versions normalisées sont sorties en 1996 (CSS 1),  1997 (CSS2), 1998 à aujourd’hui (CSS3). CSS est très puissant mais le board a du mal à finaliser une version définitive de la spécification. Les navigateurs peinent donc dans la mise en oeuvre. Aujourd’hui il existe de grosses disparités dans l’implémentation.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_les_moteurs_de_recherche_et_le_dark_web">Les moteurs de recherche et le dark web</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Nous avons aujourd’hui plus de 1 milliards de site web qui peuvent recenser des dizaines (et parfois beaucoup plus) de liens hypertextes vers d’autres pages ou des ressources statiques (images, documents, vidéos…). Ce site <a href="http://www.internetlivestats.com/" class="bare">http://www.internetlivestats.com/</a> permet de suivre les statistiques.</p>
</div>
<div class="paragraph">
<p>Le web peut être représenté par un graphe orienté possédant des cycles. Pour aider la recherche d’information, des applications web, les moteurs de recherche ont été mises en place afin d’indexer le maximum de pages et de fournir des points d’entrée sur les ressources Web. Mais il existe de nombreuses pages ou ressources qui sont présentes sur le web et qui restent non indexées (pages sécurisées, non accessible via les protocoles standard, ressources excluses des robots, pages générées par des scripts…).</p>
</div>
<div class="paragraph">
<p>On parle alors de web invisible ou de web profond ou du dark web. Certaines études montre que cette partie invisible représentait plus de 99% du web. C’est pourquoi on retrouve aujourd’hui des sociétés spécialisés dans la recherche de ces ressources masquées.</p>
</div>
<div class="paragraph">
<p>Mais ce n’est pas le but de ce chapitre. Lorsque l’on est une entreprise notre but est d’appraître dans les moteurs de recherche afin que nos potentiels clients puissent nous trouver.</p>
</div>
<div class="paragraph">
<p>Au lancement du premier moteur de recherche en 1996, les pages étaient organisées comme un annuaire par thème. Les développeurs de site devaient soumettre leur site web via un simple formulaire.</p>
</div>
<div class="paragraph">
<p>Aujourd’hui nous pouvons faire des recherches en tapant ou en dictant des mots clés. Le début du web sémantique nous permet aussi de poser de véritables questions. Les moteurs de recherche commencent également à être capable de faire des recherches en fonction des images que vous lui donnez, le texte que vous dictez&#8230;&#8203;.</p>
</div>
<div class="paragraph">
<p>Ces moteurs de recherche nous affichent des ressources qui peuvent être des pages, des images, des vidéos, des newsgroup… Chaque ressource est indexée afin de la retrouver en fonction de mot clés.</p>
</div>
<div class="paragraph">
<p>Le classement des résultats de recherche est de plus en plus complexe. Initialement amélioré pour fournir des résutats pertinents aux utilisateurs (vérification que le site contient bien les mots clés, que le site est rapide à charger, qu’il est sécurisé….), ce classement est plutôt aujourd’hui dominé par la publicité.</p>
</div>
<div class="paragraph">
<p>Les entreprises achètent des mots clés pour apparaître en premier.</p>
</div>
<div class="paragraph">
<p>L’indexation des ressources ne se fait plus de manière manuelle mais elle est effectuée par des robots (les bots) qui parcourent les sites à intervalles réguliers et qui recensent les liens en fonction des instructions laissées par les développeurs.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_les_adresses_web">Les adresses web</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Comme nous l’avons vu, le web est constitué de différentes ressources que nous avons besoin de retrouver facilement. Un mécanisme d’adressage a donc été mis en place. Ce sont les URL (Uniform Resource Locator).</p>
</div>
<div class="paragraph">
<p>Une URL peut être saisi dans un logiciel comme votre navigateur Internet ou dans le code d’une page. Par exemple en HTML</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>@LTa href="mon_url"@GTLien hypertexte@LT/a@GT</code> permet de définir un lien vers une autre page</p>
</li>
<li>
<p><code>@LTimg src="mon_url"@GT</code> permet de charger une image</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Lorsque vous voulez accéder à une ressource vous pouvez soit utiliser une adresse complète (on parlera d’adresse absolue) soit d’une adresse définie par rapport à la ressource courante (on parle d’adresse relative)</p>
</div>
<div class="sect2">
<h3 id="_les_adresses_relatives">Les adresses relatives</h3>
<div class="paragraph">
<p>Quand vous chargez une page dans votre navigateur, les URL définies à l’intérieur peuvent être définies de manière relatives à ce document.</p>
</div>
<div class="paragraph">
<p>Par exemple si le document chargé a cette URL : <code><a href="https://dev-mind.fr/test/mapage.html" class="bare">https://dev-mind.fr/test/mapage.html</a></code></p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>./mapage2.html</code> désignera la page dans le répertoire courant   <code><a href="https://dev-mind.fr/html/test/mapage2.html" class="bare">https://dev-mind.fr/html/test/mapage2.html</a></code></p>
</li>
<li>
<p><code>../mapage2.html</code> désignera la page  dans le répertoire parent  <code><a href="https://dev-mind.fr/html/mapage2.html" class="bare">https://dev-mind.fr/html/mapage2.html</a></code></p>
</li>
<li>
<p><code>/mapage2.html</code> désignera la page  dans le dossier racine <code><a href="https://dev-mind.fr/mapage2.html" class="bare">https://dev-mind.fr/mapage2.html</a></code></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Il est recommandé de passer par ces adresses relatives dans vos pages afin de simplifier la mise à jour quand vos URL changent (un cas courant est par exemple le passage d’un site d’un serveur de test à un serveur de production), et le travail des robots indexers de vos pages qui essayent de contruire une arborescence de votre site web quand il l’analyse.</p>
</div>
</div>
<div class="sect2">
<h3 id="_les_adresses_absolues">Les adresses absolues</h3>
<div class="paragraph">
<p>Une adresse absolue va être composé de la mnière suivante</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011713900.381">protocol::<span class="hljs-comment">//user:password@server:port/path/resource?param1=value1&amp;amp;param2=value2</span></code><button class="btn-copy-code" onclick="copyToClipboard('1734011713900.381')">Copy</button></pre>
</div>
</div>
<div class="sect3">
<h4 id="_protocol">Protocol</h4>
<div class="paragraph">
<p>Protocol permet de définir le protocole de communication utilisé. Le cas le plus courant dans le web est d’utiliser le http ou https (http securisé) mais vous pouvez aussi pointer vers une adresse mail (protocol = mailto), un fichier local (protocol = file), une ressource ftp (protocol = ftp)</p>
</div>
</div>
<div class="sect3">
<h4 id="_user_password">User / password</h4>
<div class="paragraph">
<p>Vous pouvez dans de rare cas passer un identifiant et un mot de passe dans l’URL pour accéder à une ressource. Normalement les aspects de sécurité sont définis d’une manière plus efficace à un autre endroit que dans l’URL.</p>
</div>
<div class="paragraph">
<p>Dans la majorité des cas votre URL aura plutôt cette forme :</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011713900.7517">protocol::<span class="hljs-comment">//server/path/resource?param1=value1&amp;amp;param2=value2</span></code><button class="btn-copy-code" onclick="copyToClipboard('1734011713900.7517')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_server_port">Server / port</h4>
<div class="paragraph">
<p>Vous devez définir l’identifiant de votre serveur. A la base c’est une adresse IP. Mais si vous achetez un nom de domaine vous pourrez utiliser cet alias. Par exemple Dev-Mind possède le nom de domaine appelé dev-mind défini dans le domaine de premier niveau .fr</p>
</div>
<div class="paragraph">
<p>Comme nous l’avons vu plus haut il existe plusieurs DNS qui font les corrélations entre une adresse IP et un nom plus facile à retenir.</p>
</div>
<div class="paragraph">
<p>Quand vous tapez <code>www.dev-mind.fr</code> le</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>.fr</strong> désigne le nom de domaine de premier niveau. L’ensemble des noms de domaine de premier niveau sont supervisés par l’ICANN et la gestion des .fr est délégué à l’AFNIC. Mais quand vous voulez mettre en place un site web, la déclaration est généralement faite via un prestataire. Par exemple le site web <code>dev-mind</code> est hébérgé sur des serveurs OVH et OVH propose un service pour gérer les noms de domaine.</p>
</li>
<li>
<p><strong>dev-mind</strong> est le nom de domaine de deuxième niveau qui va identifier une marque, un concept&#8230;&#8203;</p>
</li>
<li>
<p><strong>www</strong> est un sous domaine. Quand vous avez un nom de domaine vous pouvez spécifier plusieurs sous domaines si vous avez par exemple différents serveurs web.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Pour compléter vous pouvez préciser le numéro de port utilisé par votre serveur web. Si ce dernier utilise le port par défaut, le port 80 vous n’êtes pas obligé de le préciser.</p>
</div>
</div>
<div class="sect3">
<h4 id="_localisation_de_la_ressource">Localisation de la ressource</h4>
<div class="paragraph">
<p>L’étape suivante consiste à indiquer l’emplacement de votre ressource sur le serveur web. Ce dernier détient un ensemble de fichier hierarchisé. Vous devez spécifier le répertoire et le nom.</p>
</div>
<div class="paragraph">
<p>Par exemple <code>img/logo.jpg</code> permet de désigner l’image <code>logo.jpg</code> dans le répertoire <code>img</code></p>
</div>
</div>
<div class="sect3">
<h4 id="_paramètres_optionnels">Paramètres optionnels</h4>
<div class="paragraph">
<p>Vous pouvez passer des paramètres dans l’URL. Comme nous le verrons un peut plus tard il existe différentes actions possibles quand vous utiliser un protocole. Par exemple une action GET via le protocole HTTP accèpte des paramètres définis dans l’URL</p>
</div>
<div class="paragraph">
<p>Quand vous avez un ou plusieurs paramètres vous devez l’indiquer dans l’URL.</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>?</strong> permet d’indiquer que vous avez des paramètres</p>
</li>
<li>
<p><strong>&amp;</strong> permet de séparer la définition de plusieurs paramètres</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Quand vous voulez ajouter un paramètre vous définissez le nom et la valeur. Par exemple ci dessous j’accède à un service distant à qui je passe le paramètre name = Mix-IT</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011713901.1538">https:<span class="hljs-comment">//www.dev-mind.fr/api/conference?name=Mix-IT</span></code><button class="btn-copy-code" onclick="copyToClipboard('1734011713901.1538')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_les_signets">Les signets</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Le HTML permet de définir des liens vers des ressources externes mais aussi de faire des liens vers une partie du document courant</p>
</div>
<div class="paragraph">
<p>Par exemple si vous avez le code suivant</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1734011713901.8914"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;”part1”&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- code --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- code --&gt;</span>
</code><button class="btn-copy-code" onclick="copyToClipboard('1734011713901.8914')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>L’URL <code>#part2</code> chargera le document courant et scrollera vers l’élément HTML ayant l’identifiant <code>part2</code>.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_prochain_article">Prochain article</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Dans le prochain article nous finirons la présentatin du web en parlant tu protocole HTTP et des différents organismes de régulation.</p>
</div>
</div>
</div>`;