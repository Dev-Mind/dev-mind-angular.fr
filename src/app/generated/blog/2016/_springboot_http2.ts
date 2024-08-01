export const _springboot_http2:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Le web se base sur le protocole HTTP (HyperText Transfer Protocol). Ce protocole permet d’échanger des documents hypermédia entre un client (un navigateur Internet) et un serveur. Le client ouvre une connexion, émet une requête et attend une réponse.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/springhttp2_00.png" alt="Spring boot HTTP/2">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_http_1_1_1">HTTP 1 &amp; 1.1</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Au départ (en 1991), HTTP ne pouvait transférer que des fichiers. Le protocole a ensuite vite évolué (version 1.0 en 1996) pour permettre le transfert de tout type de fichiers comme des images, vidéos, scripts, feuilles de styles… La version 1.1 a permis d’améliorer les performances en permettant de réutiliser la même connexion. C’est la version la plus répandue aujourd’hui alors qu’elle date de pratiquement 20 ans. Il aura fallu attendre tout ce temps pour que les différents acteurs s’entendent sur une nouvelle version du protocole.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_http_2">HTTP 2</h2>
<div class="sectionbody">
<div class="paragraph">
<p>La version 2 a été finalisée en 2015 et est en cours de déploiement. Cette nouvelle mouture se veut tout d’abord à 100% rétrocompatible afin de ne pas à avoir à changer le code des différentes applications utilisant les versions anciennes du protocole. En gros les méthodes, statuts, codes erreur sont conservés.</p>
</div>
<div class="paragraph">
<p>Le but principal de HTTP2, est de rendre les requêtes moins coûteuses en ressources, afin d’améliorer les performances sur des devices où la qualité du réseau varie beaucoup.</p>
</div>
<div class="paragraph">
<p>HTTP se base sur les protocoles TCP et IP. Actuellement HTTP peut ouvrir plusieurs connexions TCP en parallèle ce qui peut congestionner le réseau. Les navigateurs mettent des garde fous en limitant ce nombre de requêtes et si votre site doit charger beaucoup de ressources, les temps de chargement peuvent être assez longs.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/springhttp2_01.png" alt="Spring boot HTTP 1">
</div>
</div>
<div class="paragraph">
<p>Avec HTTP 2 le but est de regrouper ces échanges sur la même connexion TCP.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/springhttp2_01.png" alt="Spring boot HTTP 2">
</div>
</div>
<div class="paragraph">
<p>HTTP 2 n’impose pas de sécuriser les échanges en cryptant les informations via un chiffrement TLS. Mais il va par contre limiter le surcoût dans le chiffrement. Certaines implémentations comme nous allons le voir plus loin et vous imposent des échanges sécurisés.</p>
</div>
<div class="paragraph">
<p>HTTP 2 permet le multiplexage pour échanger différents messages en même temps. Une connexion TCP est aujourd’hui clôturée à la fin d’un échange. En HTTP 2 un client pourra maintenir une connexion même si l’utilisateur clique sur un bouton ou choisit de fermer une connexion. Ceci permet au serveur de pouvoir faire du push.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_spring_boot_et_http_2">Spring Boot et HTTP 2</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Regardons maintenant comment migrer une application Spring Boot pour que cette dernière puisse bénéficier de HTTP 2. Ces problématiques ne sont d’ailleurs pas liées à Spring mais au container dans lequel l&#8217;application sera déployée.</p>
</div>
<div class="paragraph">
<p>Par défaut une application Spring Boot utilise un Tomcat embarqué. Tomcat n’implémente HTTP 2 que depuis la version 8.5, Jetty depuis 9.3 et Undertow depuis sa version 1.2.</p>
</div>
<div class="paragraph">
<p>Vous pouvez consulter l’exemple de <a href="https://twitter.com/brianclozel?lang=fr">Brian Clozel</a> (Pivotal) sous <a href="https://github.com/bclozel/http2-experiments">Github</a> fait pour Jetty en HTTP 2. Je vous conseille aussi vivement de suivre le talk de Brian sur <a href="https://www.infoq.com/fr/presentations/mix-it-brian-clozel-http2-pour-le-developpeur-web">HTTP 2  à Mix-IT</a> en 2016.</p>
</div>
<div class="paragraph">
<p>Dans cet article nous allons détailler comment mettre en place undertow</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_changer_les_dépendances">Changer les dépendances</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Dans la première étape nous allons changer le build pour utiliser undertow à la place de Tomcat</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722519596792.9448">compile(<span class="hljs-string">&quot;org.springframework.boot:spring-boot-starter-web&quot;</span>) {
    exclude <span class="hljs-keyword">module</span>: <span class="hljs-string">&quot;spring-boot-starter-tomcat&quot;</span>
}
compile <span class="hljs-string">&quot;org.springframework.boot:spring-boot-starter-undertow&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722519596792.9448')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_configuration_tls">Configuration TLS</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Vous pouvez créer votre propre keystore (.jks). Le but est de le référencer ensuite dans la configuration Spring</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722519596793.595"><span class="hljs-attr">server</span>:
  <span class="hljs-attr">ssl</span>:
    key-<span class="hljs-attr">store</span>: <span class="hljs-attr">classpath</span>:perf.<span class="hljs-property">jks</span>
    key-store-<span class="hljs-attr">password</span>: <span class="hljs-title class_">DevMind</span>
    key-<span class="hljs-attr">password</span>: <span class="hljs-title class_">DevMind</span>
    <span class="hljs-attr">protocol</span>: <span class="hljs-title class_">TLSv1</span><span class="hljs-number">.2</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722519596793.595')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Dans le cadre de vos tests vous pouvez générer une keystore simple avec cette ligne de commande. Pour de la prod vous pouvez passer par exemple par du <a href="https://letsencrypt.org/">let&#8217;s encrypt</a></p>
</div>
<div class="literalblock">
<div class="content">
<pre>keytool -genkeypair -alias mycert -keyalg RSA -sigalg MD5withRSA -keystore perf.jks -storepass DevMind -keypass DevMind -validity 9999</pre>
</div>
</div>
<div class="paragraph">
<p>HTTP 2 utilise un nouveau protocole appelé TLS ALPN (TLS application-layer protocol negotiation). Nous avons préciser la version dans le fichier de paramètres juste ci dessus (TLSv1.2). En attendant que le JDK intègre ce protocole en standard, nous devons ajouter dans le classpath une librairie lors du lancement de l’application (voir la liste)</p>
</div>
<div class="literalblock">
<div class="content">
<pre>java -Xbootclasspath/p:&lt;path_to_alpn_boot_jar&gt; …</pre>
</div>
</div>
<div class="paragraph">
<p>Dans mon exemple j’utilise Java 1.8.0_101 et la version de la librairie est alpn-boot-8.1.9.v20160720 (voir la <a href="http://www.eclipse.org/jetty/documentation/current/alpn-chapter.html#alpn-versions">liste</a>)</p>
</div>
<div class="paragraph">
<p>Pour mes tests voici mon launcher dans IntelliJ</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/springhttp2_03.png" alt="Spring boot HTTP/2">
</div>
</div>
<div class="paragraph">
<p>Maintenant tout est prêt pour faire de l’HTTP 2.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_références">Références</h2>
<div class="sectionbody">
<div class="paragraph">
<p>J&#8217;espère vous avoir montré que nous pouvons passer dès maintenant à HTTP 2. Voici quelques références qui m&#8217;ont servi à écrire cet article. Les sources sont disponibles sous Github.</p>
</div>
<div class="ulist">
<ul>
<li>
<p><a href="http://www.eclipse.org/jetty/documentation/current/alpn-chapter.html#alpn-versions" class="bare">http://www.eclipse.org/jetty/documentation/current/alpn-chapter.html#alpn-versions</a></p>
</li>
<li>
<p><a href="https://github.com/bclozel/http2-experiments" class="bare">https://github.com/bclozel/http2-experiments</a></p>
</li>
<li>
<p><a href="http://undertow.io/" class="bare">http://undertow.io/</a></p>
</li>
</ul>
</div>
</div>
</div>`;