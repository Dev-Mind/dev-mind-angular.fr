export const _http:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Dernier chapitre dans la présentation du web. Nous allons parler du protocole HTTP (HyperText Transfer Protocol), sur lequel se base le web. Ce protocole permet d’échanger des documents hypermédia entre un client (un navigateur Internet) et un serveur. Le client ouvre une connexion, émet une requête et attend une réponse. Nous parlerons aussi des organismes gérant le web.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_un_petit_historique">Un petit historique</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_http_1_1_1">HTTP 1 &amp; 1.1</h3>
<div class="paragraph">
<p>Le protocole a beaucoup évolué depuis ses débuts. Au départ (en 1991), http ne pouvait transférer que des fichiers. Depuis  la version 1.0 (1996) le protocole permet de  transférer tout type de fichiers comme des images, vidéos, scripts, feuilles de styles… Le type de la ressource est précisé dans l’entête de la requête ou de la réponse, via le type MIME (Multipurpose Internet Mail Extensions).</p>
</div>
<div class="paragraph">
<p>En 1997 nous avons une nouvelle version, la version 1.1. Elle permettait entre autre d’améliorer les performances en permettant de réutiliser la même connexion. C’est la version la plus répandue aujourd’hui.</p>
</div>
</div>
<div class="sect2">
<h3 id="_http_2">HTTP 2</h3>
<div class="paragraph">
<p>Le protocole est largement améliorable mais il aura fallu attendre pratiquement 20 ans, avant que les différents acteurs s’entendent sur une nouvelle version du protocole. La version 2 a été finalisée en 2015 et est en cours de déploiement.</p>
</div>
<div class="paragraph">
<p>Cette nouvelle mouture se veut tout d’abord à 100% rétrocompatible, afin de ne pas à avoir à changer le code des différentes applications utilisant les versions anciennes du protocole. En gros les méthodes, statuts, codes erreur sont conservés.</p>
</div>
<div class="paragraph">
<p>Le but principal de HTTP2 est de rendre les requêtes moins coûteuses en ressources, afin d’améliorer les performance sur des devices où la qualité du réseau varie beaucoup. HTTP2 permet le multiplexage pour échanger différents messages en même temps et utilise la compression des entêtes.</p>
</div>
<div class="paragraph">
<p>HTTP décrit comment les messages sont échangés avec un serveur mais au niveau plus bas HTTP se base sur les protocoles TCP et IP. Actuellement HTTP peut ouvrir plusieurs connexions TCP en parallèles ce qui peut congestionné le réseau. Avec HTTP 2 le but est de regrouper ces échanges sur la même connexion TCP.
HTTP 2 n’impose pas de sécuriser les échanges en cryptant les informations via un chiffrement TLS (SSL). HTTP limite le surcoût dans le chiffrement car en 2017 tous les échnges réseaux devraiênt être cryptés.</p>
</div>
<div class="paragraph">
<p>Aujourd’hui quand vous ouvrez une page web, le code HTML arrive, il est parsé, on charge ensuite les styles, les images. Quand on regarde le nombre de requêtes lors de l’ouverture d’une page d’un navigateur, ce dernier peut être très important. Maintenant grace au multipexage, les différents éléments pourront être envoyés en même temps.</p>
</div>
<div class="paragraph">
<p>En HTTP2 un client peut maintenir une connexion même si l’utilisateur clique sur un bouton ou choisit de fermer une connexion. Ceci permet au serveur de pouvoir faire du push.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/web_00.png" alt="Web">
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_appel_http">Appel HTTP</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Comme je l’ai indiqué en entête de ce chapitre, le client est à l’initiative des échanges. Nous avons toujours 3 étapes.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Ouverture d’une session le plus souvent HTTP (surcouche de TCP)</p>
</li>
<li>
<p>Envoie d’une requête</p>
</li>
<li>
<p>Le serveur interprète la requête et renvoie un statut (un code) ainsi que les données éventuelles.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Une requête HTTP est assez simple. L’écriture est masqué par les logiciels clients comme votre navigateur web. Mais il est important de comprendre comment marche le protocole. Pour celà nous allons invoquer manuellement un serveur HTTP</p>
</div>
<div class="paragraph">
<p>Lancez une commande telnet en invoquant un serveur web. Je prends dans mon exemple le site web <code><em>dev-mind</em></code> et je précise le port (80 est le port par défaut d’un serveur web)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731601747287.3425">telnet www.google.fr <span class="hljs-number">80</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731601747287.3425')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>On écrit ensuite la requête. Vous devez indiquer plusieurs informations</p>
</div>
<div class="paragraph">
<p>Une première ligne avec
* la méthode a appelé (GET, POST, DELETE…),
* La ressource à charger (dans mon exemple ci dessous c’est / qui pointe vers défaut vers la page index.html)
* Le protocole utilisé
* Et d’autres lignes avec les différents paramètres placés dans le header</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731601747288.4363">GET / HTTP/<span class="hljs-number">1.1</span>
Host: www.google.fr
Accept-Language: fr</code><button class="btn-copy-code" onclick="copyToClipboard('1731601747288.4363')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Je demande ici de charger la ressource accessible à la racine du serveur de google. Le serveur HTTP me renvoie en réponse la page index.html</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731601747289.3093">HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">200</span> OK
Date: Tue, <span class="hljs-number">12</span> Jul <span class="hljs-number">2016</span> <span class="hljs-number">07</span>:<span class="hljs-number">10</span>:<span class="hljs-number">23</span> GMT
Expires: -<span class="hljs-number">1</span>
Cache-Control: <span class="hljs-keyword">private</span>, max-age=<span class="hljs-number">0</span>
Content-Type: text/html; charset=ISO-<span class="hljs-number">8859</span>-<span class="hljs-number">1</span>
P3P: CP=<span class="hljs-string">&quot;This is not a P3P policy! See https://www.google.com/support/accounts/answer/151657?hl=en for more info.&quot;</span>
Server: gws
X-XSS-Protection: <span class="hljs-number">1</span>; mode=block
X-Frame-Options: SAMEORIGIN
Set-Cookie: NID=<span class="hljs-number">81</span>=UHO0sJ4yG6qTdp-5kdQO1YwAJbfrH-YBS0I3XnYdZQXuwXd1kK_Eo7PWlD6y33DVZG-MvuJfsqH7lmj7EOgcdaYXCRWCk-7fmD0bymGa-4qf3ILt8pBJdwNHWADYyn6R; expires=Wed, <span class="hljs-number">11</span>-Jan-<span class="hljs-number">2017</span> <span class="hljs-number">07</span>:<span class="hljs-number">10</span>:<span class="hljs-number">23</span> GMT; path=/; domain=.google.fr; HttpOnly
Accept-Ranges: none
Vary: Accept-Encoding
Transfer-Encoding: chunked

<span class="hljs-meta">@LT</span>!doctype html<span class="hljs-meta">@GT</span><span class="hljs-meta">@LThtml</span> itemscope=<span class="hljs-string">&quot;&quot;</span> itemtype=<span class="hljs-string">&quot;http://schema.org/WebPage&quot;</span> lang=<span class="hljs-string">&quot;fr&quot;</span><span class="hljs-meta">@GT</span><span class="hljs-meta">@LThead</span><span class="hljs-meta">@GT</span><span class="hljs-meta">@LTmeta</span> content=<span class="hljs-string">&quot;text/html; charset=UTF-8&quot;</span> http-equiv=<span class="hljs-string">&quot;Content-Type&quot;</span><span class="hljs-meta">@GT</span><span class="hljs-meta">@LTmeta</span> content=<span class="hljs-string">&quot;/images/branding/googleg/1x/googleg_standard_color_128dp.png&quot;</span> itemprop=<span class="hljs-string">&quot;image&quot;</span><span class="hljs-meta">@GT</span>
<span class="hljs-comment">//………..</span>
<span class="hljs-meta">@LT</span>/html<span class="hljs-meta">@GT</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731601747289.3093')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>La première ligne contient le statut de la requête : un code et un libellé. Quand tout se passe bien vous obtenez un code 200 et le libellé OK.</p>
</div>
<div class="paragraph">
<p>Vous avez ensuite plusieurs informations dans le header de cette réponse comme le <em>content type</em>, des données d’identification, les informations pour savoir si la ressource peut être mise en cache ou non….</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_les_méthodes_http_utilisables_dans_les_requêtes">Les méthodes HTTP utilisables dans les requêtes</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Le protocole HTTP permet d’exécuter différents types d’action sur le serveur. Voici les principales méthodes disponibles.</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code><em>GET</em></code> : permet de récupérer une ressource sur le serveur. Suivant l’implémentation, le serveur HTTP peut prendre en compte les paramètres placés dans l’entête de la requête (par exemple <code><em>If-Modified-Since:</em></code>, <code><em>If-Unmodified-Since:</em></code>, …)</p>
</li>
<li>
<p><code><em>HEAD</em></code> : identique à <code><em>GET</em></code> mais ne contient aucun message</p>
</li>
<li>
<p><code><em>PUT</em></code> : permet de mettre à jour une ressource sur le serveur</p>
</li>
<li>
<p><code><em>POST</em></code> : effectue une action comme une création ou un envoi de données d’un formulaire HTML</p>
</li>
<li>
<p><code><em>DELETE</em></code> : suprime une ressource</p>
</li>
<li>
<p><code><em>OPTIONS</em></code> : permet de vérifier si le serveur implémente ou accepte différentes actions. Cette méthode est par exemple utilisée pour régler les problèmes <code><em>CORS (requêtes multi origines)</em></code> et faire une preflighted cross-origin request</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_code_http_retournés_dans_les_réponses">Code HTTP retournés dans les réponses</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Pour chacun des appels une réponse est retournée au client pour lui dire si ça requête a pu êre réalisée ou non. Cette réponse contient un code constitué de 3 digits. Il existe de nombreux codes répartis en 5 catégories (le premier permet de définir cette catégorie)</p>
</div>
<div class="sect2">
<h3 id="_1xx_information">1xx Information</h3>
<div class="paragraph">
<p>Par exemple un code 100 (Continue) est renvoyé pour indiquer que le client peut continuer à envoyer sa requête</p>
</div>
</div>
<div class="sect2">
<h3 id="_2xx_succès">2xx Succès</h3>
<div class="paragraph">
<p>Le code le plus courant est 200 (OK). Il est envoyé lorsqu’une requête est exécutée avec succès. Vous pouvez parfois avoir un code retour 206 (Partial Content) pour vous indiquer que d’autres paquets seront envoyés plus tard mais que linformation peut commencer à être affichée (code utilisé lors du chargement des images et des vidéos par exemple).</p>
</div>
</div>
<div class="sect2">
<h3 id="_3xx_redirection">3xx Redirection</h3>
<div class="paragraph">
<p>Les codes @GT= 300 permettent d’indiquer que la requête était valide mais qu’aucune ressource ne sera renvoyé. Un code 301 (Moved Permanently) indique que la ressource a été déplacée. Un code 304 (Not Modified)  est renvoyé quand le client posède déjà la dernière version de la ressource.</p>
</div>
</div>
<div class="sect2">
<h3 id="_4xx_erreur_côté_client">4xx Erreur côté client</h3>
<div class="paragraph">
<p>Ce code est renvoyé quand la requête envoyée est invalide 400 (Bad Request), incomplète, ou que la ressource demandée n’a pas été trouvée : 404 (Not Found). Les code 4xx sont aussi utilisés pour les problèmes de sécurité : 401 (Unauthorized), 403 (Forbidden)</p>
</div>
</div>
<div class="sect2">
<h3 id="_5xx_erreur_côté_serveur">5xx Erreur côté serveur</h3>
<div class="paragraph">
<p>Les erreurs côté serveurs renvoient un code en 5xx. Par exemple l’erreur 500 (Internal Server Error) est la plus générique.</p>
</div>
<div class="paragraph">
<p>Voici un bon moyen mnémotechnique (tiré d&#8217;une conférence de <a href="https://twitter.com/glaforge">Guillaume Laforge</a>) pour vous souvenir des catégories</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/web_05.png" alt="Cde retour HTTP">
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_les_headers_http">Les headers HTTP</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Afin d’affiner les requêtes et les réponses, des paramètres peuvent être ajouté dans l’entête des message. Vous pouvez ajouter vos propres données dans ces headers. Le principe est de pouvoir transférer des informations entre le client et le serveur.</p>
</div>
<div class="paragraph">
<p>Je pourrai lister tous les entêtes standards interprétés par les navigateurs mais l’intérêt est limité. Vous pouvez trouver la liste sur le site de <a href="http://www.iana.org/assignments/message-headers/message-headers.xhtml">Iana</a> (Internet Assigned Numbers Authority) antenne de l’ICANN.</p>
</div>
<div class="paragraph">
<p>Ce qu’il est intéressant de savoir c’est qu’il en existe différents pour traiter automatiquement certaines problématiques. Le site <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers">développeur web (MDN)</a> de Mozilla propose une classification intéressante : authentification, cache, CORS…</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_organismes_de_régulation">Organismes de régulation</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_des_initiatives_locales">Des initiatives locales</h3>
<div class="paragraph">
<p>Je parle de régulation car ce terme est dans la bouche de toutes les autorités dans le monde. Le web a été créé pour être un espace libre mais l’argent et les données personnelles sont de tel enjeux que privés et gouvernants font tout pour prendre le contrôle.</p>
</div>
<div class="paragraph">
<p>Heureusement ce n’est pas simple. Mais Internet devient de moins en moins un espace de liberté. Chaque pays mais en place des autorités de régulation quand il n’y a pas de la censure ou autre mécanisme pour contrôler les internautes.</p>
</div>
</div>
<div class="sect2">
<h3 id="_le_w3c">Le W3C</h3>
<div class="paragraph">
<p>Après ce petit apparté je vais parler de l’organisme qui devrait être le seul maître à bord. Il s’agit du <a href="https://www.w3.org/">W3C</a> acronyme de World Wide Web Consortium. Cette association fondée en 1994 par <a href="https://fr.wikipedia.org/wiki/Tim_Berners-Lee">Tim Berners-Lee</a> a pour leitmotiv : “un seul web partout et pour tous”.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/web_04.png" alt="W3C">
</div>
</div>
<div class="paragraph">
<p>Le <a href="https://www.w3.org/">W3C</a> est l’organisme qui s’occupe de la standardisation des technologies utilisées dans le web : HTML, CSS mais aussi XML, XSL, SVG, PNG…. Le consortium regroupe un peu moins de 400 entreprises et a plusieurs antennes aux Etats Unis en Europe, en Asie…</p>
</div>
<div class="paragraph">
<p>Le <a href="https://www.w3.org/">W3C</a> planche sur des recommandations. Voici par exemple la recommandation définissant HTML5  <a href="https://www.w3.org/TR/html5/" class="bare">https://www.w3.org/TR/html5/</a>. Les fabricants peuvent suivre ou non les recommandations et par conséquent nous pouvons avoir parfois de grosses différences d’implémentations.</p>
</div>
<div class="paragraph">
<p>Une recommandation peut passer par les états suivants
* Working Draft (WD) (brouillon de travail),
* Last Call Working Draft (dernier appel),
* Candidate Recommendation (CR) (candidat à la recommandation),
* Proposed Recommendation (PR) (recommandation proposée),
* W3C Recommendation (REC) (recommandation du W3C)</p>
</div>
</div>
<div class="sect2">
<h3 id="_le_whatwg">Le WHATWG</h3>
<div class="paragraph">
<p><a href="https://whatwg.org/">WHATWG</a> (Web Hypertext Application Technology Working Group) est une communauté de personnes dont le but est de faire évoluer le web. Cette fondation a été créée par des mécontents du W3C en 2004. On retrouve la fondation Mozilla, Opéra, des personnes de chez Apple.</p>
</div>
<div class="paragraph">
<p>Le but est de répondre à la lenteur du W3C sur certains sujets comme HTML, les web workers,&#8230;&#8203; Au final les 2 organisations travaillent ensemble pour faire avancer le web.</p>
</div>
</div>
</div>
</div>`;