export const _comprendre_programation_android:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_ecosystème_android">Ecosystème Android</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_android_los_le_plus_utilisé">Android l&#8217;OS le plus utilisé</a></li>
<li><a class="link" fragment="#_principe_de_la_programmation_mobile">Principe de la programmation mobile</a></li>
</ul>
</li>
<li><a class="link" fragment="#_plateforme_android">Plateforme Android</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_noyau_linux">Noyau Linux</a></li>
<li><a class="link" fragment="#_couche_dabstraction_hardware">Couche d&#8217;abstraction hardware</a></li>
<li><a class="link" fragment="#_langages_de_programmation">Langages de programmation</a></li>
<li><a class="link" fragment="#_sécurité">Sécurité</a></li>
</ul>
</li>
<li><a class="link" fragment="#_la_fragmentation">La fragmentation</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_fragmentation_au_niveau_des_versions">Fragmentation au niveau des versions</a></li>
<li><a class="link" fragment="#_fragmentation_au_niveau_des_écrans">Fragmentation au niveau des écrans</a></li>
<li><a class="link" fragment="#_fragmentation_au_niveau_matériel">Fragmentation au niveau matériel</a></li>
</ul>
</li>
<li><a class="link" fragment="#_conclusion">Conclusion</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Mon objectif est de vous montrer comment développer une application Android de A à Z en utilisant les dernières préconisations de Google. Il y a beaucoup de choses à écrire sur le sujet et je le ferai dans plusieurs articles. Dans cette première partie nous allons parler de l&#8217;écosystème Android et de la plateforme : chose essentielle si vous voulez comprendre les spécificités du développement Android.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_pf_00.png" alt="Comprendre la programmation Android">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_ecosystème_android">Ecosystème Android</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_android_los_le_plus_utilisé">Android l&#8217;OS le plus utilisé</h3>
<div class="paragraph">
<p>Il y a deux acteurs majeurs dans le monde du mobile : Apple (<a href="https://www.apple.com/fr/ios/">iOS</a>) et Google (<a href="https://www.android.com/">Android</a>). Android est aujourd&#8217;hui l&#8217;OS sur mobile le plus utilisé dans le monde. Près de 70% des utilisateurs dans les pays occidentaux utilisent cette plateforme. En Afrique ou en Asie, la politique tarifaire d&#8217;Apple, fait que les parts de marché Android sont encore plus fortes et continuent à grimper.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_eco_01.png" alt="Répartition des OS mobiles">
</div>
<div class="title">Répartition des OS mobiles (source statscounter 2019)</div>
</div>
<div class="paragraph">
<p>Faire de la programmation mobile a un intérêt. L&#8217;accès à l&#8217;informatique (web ou autre) se fait de plus en plus avec des mobiles et tablettes. Android est devenu l&#8217;OS le plus utilisé au niveau mondial tout systême confondu</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_eco_03.png" alt="Desktop vs mobile">
</div>
<div class="title">Répartition mobile vs desktop (source statscounter 2019)</div>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_eco_02.png" alt="Répartition des OS">
</div>
<div class="title">Répartition des OS (source statscounter 2019)</div>
</div>
</div>
<div class="sect2">
<h3 id="_principe_de_la_programmation_mobile">Principe de la programmation mobile</h3>
<div class="paragraph">
<p>La mobilité a transformé les devices que nous utilisons. Quand vous êtes sur un PC fixe ou un portable vous avez toujours à peu près les mêmes composants : CPU, carte graphique, disque dur, lecteur carte photo, ports d&#8217;entrée/sortie. Sur un mobile vous allez avoir plus de composants pour vous aider dans ce contexte de mobilité : GPS, caméra, appareil photo, accélomètre, podomètre&#8230;&#8203; Nous avons de plus en plus de capteurs pour interpréter le contexte d&#8217;utilisation du device</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_eco_04.png" alt="Capteurs des devices mobiles">
</div>
<div class="title">Capteurs des devices mobiles</div>
</div>
<div class="paragraph">
<p>La spécificité de la programmation mobile, est de proposer des applications qui récupérent et aggrègent les données émises par les différents capteurs pour répondre à un besoin utilisateur. Quand vous voulez vous interfacer avec ces capteurs, apporter de la réactivité dans vos application, le développement natif est la solution.</p>
</div>
<div class="paragraph">
<p>Créer une application mobile pour simplement afficher du contenu statique n&#8217;a pas de sens. Pour ce besoin, on préférera les applications web responsives (PWA) qui sont beaucoup plus optimales et moins coûteuses. Une application native doit être dynamique et profiter des API et des capteurs exposés par les devices.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_plateforme_android">Plateforme Android</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Voici une image simplifiée de la plateforme Android</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_pf_01.png" alt="Android se base sur Linux">
</div>
</div>
<div class="sect2">
<h3 id="_noyau_linux">Noyau Linux</h3>
<div class="paragraph">
<p>Android a été construit sur un <a href="https://www.kernel.org/">noyau Linux</a>. Mais Android n&#8217;est pas totalement Open Source. Seule une <a href="https://source.android.com/">partie</a> est libre de droit.</p>
</div>
<div class="paragraph">
<p>Android s&#8217;appuie sur les forces de Linux pour fournir un OS stable et fiable : gestion de la mémoire, gestion des processus, sécurité&#8230;&#8203;</p>
</div>
</div>
<div class="sect2">
<h3 id="_couche_dabstraction_hardware">Couche d&#8217;abstraction hardware</h3>
<div class="paragraph">
<p>Android définit une couche abstraite pour s&#8217;interfacer avec les différents capteurs ou élements de bas niveau d&#8217;un device :  HAL (Hardware Abstraction Layer). Les différents constructeurs de mobile doivent implémenter cette couche pour que leur téléphone puisse fonctionner. Ils doivent également prouver que leurs téléphones sont capables de répondre aux exigences de tests demandées par Google. Il existe des tests de compatibilités avec une version de l&#8217;OS (<a href="https://source.android.com/compatibility/cts">CTS compatibility test suite</a>) et des d&#8217;autres tests complémentaires (<a href="https://source.android.com/compatibility/vts">VTS Vendor test suite</a>).</p>
</div>
<div class="paragraph">
<p>Ces développements peuvent être longs et coûteux. C&#8217;est pour cette raison, que les constructeurs ne font pas évoluer leurs téléphones. Leur but est de vendre toujours plus de nouveaux devices, et non de maintenir les anciens. Ces problèmes de mises à jour entraînent une grosse fragmentation dans l&#8217;utilisation des versions de l&#8217;OS. Cette fragmentation liée aux versions du système d&#8217;exploitation, est moins présente dans le monde iOS. Comme Apple est à la fois éditeur et constructeur, tout est fait pour que chaque nouvelle version soit supportée par les anciens devices (troll: sauf quand ils introduident de l&#8217;obsolescence programmée).</p>
</div>
</div>
<div class="sect2">
<h3 id="_langages_de_programmation">Langages de programmation</h3>
<div class="paragraph">
<p>Le coeur d&#8217;Android est écrit en <a href="http://www.open-std.org/jtc1/sc22/wg21/">C ou C++</a> et plusieurs librairies natives sont accessibles (<a href="https://developer.android.com/ndk/">NDK Native development kit</a>). Vous pouvez écrire vos applications en C mais pour faciliter la mise en place d&#8217;applications, Google a poussé les développeurs à utiliser le langage Java depuis les débuts. Java est parfois verbeux mais il a l&#8217;avantage d&#8217;être simple et d&#8217;amener un cadre de développement.</p>
</div>
<div class="sect3">
<h4 id="_machine_virtuelle">Machine virtuelle</h4>
<div class="paragraph">
<p>Android propose donc une machine virtuelle pour exécuter du bytecode. Ce n&#8217;est pas une JVM classique. Les ingénieurs de chez Google ont essayé de travailler sur un bytecode avec une plus faible empreinte mémoire. En Android le compilateur va créer des fichier .dex (Dalvik executable). <a href="https://javamind-fr.blogspot.com/2012/10/dalvik-la-vm-android.html">Dalvik</a> était le premier compilateur utilisé sur la plateforme. Comme les JVM actuelles, Dalvik transformait le bytecode en langage machine à l&#8217;exécution : compilation Just In Time (JIT).</p>
</div>
<div class="paragraph">
<p>Aujourd&#8217;hui cette machine virtuelle a été remplacée par <a href="http://javamind-fr.blogspot.com/2014/06/art-nouvelle-machine-virtuelle-java.html">ART (Android Runtime)</a>. La transformation en langage machine est faite à l&#8217;installation de l&#8217;application : compilation AOT (ahead of time). Comme le bytecode est compilé plus tôt en langage machine, les applications se lancent plus vite et le CPU est moins solliciter lors de l&#8217;exécution (et donc préservation de votre batterie).</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_pf_02.png" alt="Android compilation">
</div>
</div>
<div class="paragraph">
<p>J&#8217;ai volontairement fait un abus de langage en indiquant que le bytecode était transformé en langage machine. Ce n&#8217;est pas vraiment le cas. Si nous avions vraiment du langage machine nous n&#8217;aurions plus besoin de VM. En fait à l&#8217;installation le bytecode est transformé en un format intermédiaire : fichiers .oat (ahead of time). La VM est nécessaire car elle va gérer les allocations mémoires et la libération de l&#8217;espace avec le Garbage collector. Même si la compilation n&#8217;est plus Just In Time, des optimisations sont toujours faites à l&#8217;exécution pour que le code s&#8217;exécute le plus vite possible.</p>
</div>
<div class="paragraph">
<p>Vous trouverez plus d&#8217;informations dans la <a href="https://source.android.com/devices/tech/dalvik/index.html">documentation</a>.</p>
</div>
<div class="paragraph">
<p>Toutes ces adaptations par rapport à une machine virtuelle Java sont au coeur du procès entre Google et Oracle. Oracle n&#8217;a pas racheté Java à Sun pour se lancer dans l&#8217;Open Source. Ils l&#8217;ont surtout racheté en pensant faire payer des licences à Google pour chaque appareil vendus. Cette guerre commerciale est en train à mon sens de tuer l&#8217;utilisation de Java sur la plateforme. Mais pour une fois c&#8217;est aussi dans l&#8217;intérêt des développeurs car l&#8217;aspect financier a certainement été un catalyseur pour l&#8217;adoption de Kotlin.</p>
</div>
</div>
<div class="sect3">
<h4 id="_langage_kotlin">Langage Kotlin</h4>
<div class="paragraph">
<p>En 2017 une grande annonce a été faite à Google IO. Le langage <a href="https://kotlinlang.org/">Kotlin</a> devenait le deuxième langage de référence pour développer des applications. 2 ans après 50% des développeurs utilisent Kotlin et Google a <a href="https://android-developers.googleblog.com/2019/05/google-io-2019-empowering-developers-to-build-experiences-on-Android-Play.html">annoncé à Google I/O 2019</a> que la plateforme devenait Kotlin-first. Ils préconisent de démarrer les nouveaux développements en Kotlin.</p>
</div>
<div class="paragraph">
<p>Si vous voulez en savoir plus sur le langage Kotlin et les avantages à l&#8217;utiliser sur la plateforme Android, vous pouvez lire <a href="https://dev-mind.fr/blog/2019/kotlin_et_android.html">mon article</a> sur le sujet.</p>
</div>
</div>
<div class="sect3">
<h4 id="_studio_de_développement">Studio de développement</h4>
<div class="paragraph">
<p>Initialement le studio de développement préconisé était Eclipse mais plus les fonctionnalités s&#8217;enrichissaient, plus l&#8217;IDE était long et devenait inutilisable. Google a donc travaillé en partenariat avec <a href="https://www.jetbrains.com/">JetBrains</a> (éditeur de Webstorm, IntelliJ, Kotlin) pour adapter leur version Open Source et créer <a href="https://developer.android.com/studio/">Android Studio</a>.</p>
</div>
<div class="paragraph">
<p>Vous trouverez à l&#8217;intérieur de cet IDE toutes les fonctionnalités nécéssaires aux développements. Vous avez des utilitaires pour</p>
</div>
<div class="ulist">
<ul>
<li>
<p>vérifier votre code</p>
</li>
<li>
<p>gérer les différentes versions du SDK Android</p>
</li>
<li>
<p>lancer un device virtuel sur votre machine pour tester manuellement ou automatiquement votre code</p>
</li>
<li>
<p>monitorer et debugguer votre application</p>
</li>
<li>
<p>packager votre application afin de la publier sur le store Google</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_sécurité">Sécurité</h3>
<div class="paragraph">
<p>Comme Android est basé sur un noyau Linux, la plateforme bénéficie de la sécurité implémentée au niveau du noyau.</p>
</div>
<div class="paragraph">
<p>Quand une application est installée, Android lui assigne un user ID. Chaque application est lancée dans un processus séparé et utilise sa propre instance d’ART (machine virtuel). Les droits d’exécution sont propres à cet utilisateur applicatif. L’application n’a pas de notion de cet ID. Ainsi une application ne peut pas accéder aux données d’une autre application car tout est bouclé par cet artifice. C’est la même chose pour les applications natives.</p>
</div>
<div class="paragraph">
<p>Chaque application est donc isolée des autres et possèdent ses propres ressources CPU, mémoire&#8230;&#8203;.</p>
</div>
<div class="paragraph">
<p>Au dessus de cette sécurité "bas niveau", Android a ajouté au fil du temps un niveau de sécurité plus "haut niveau". Chaque action externe pouvant être demandée par votre application doit être déclarée dans un fichier manifest. Par exemple</p>
</div>
<div class="ulist">
<ul>
<li>
<p>lire les contacts,</p>
</li>
<li>
<p>prendre une photo,</p>
</li>
<li>
<p>accéder à Internet</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Un utilisateur peut choisir de laisser les droits demandés à l&#8217;installation, mais il peut aussi choisir d&#8217;enlever certains droits. Personnellement je limite le nombre d&#8217;application pouvant se connecter au réseau, pouvant utiliser mes contacts, mes fichiers&#8230;&#8203;. (sur un Android sans surcouche vous devez aller dans les paramètres dans le menu "Appli et notifications", dans les options avancées et sur l&#8217;entrée "Autorisation des applications").</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_la_fragmentation">La fragmentation</h2>
<div class="sectionbody">
<div class="paragraph">
<p>La fragmentation est un réel problème sur la plateforme et en tant que développeur vous devrez faire des choix en fonction de votre cible utilisateur.</p>
</div>
<div class="paragraph">
<p>Android est un OS utilisable par n&#8217;importe quel fabricant de téléphone (on mettra à part le cas <a href="https://www.frandroid.com/marques/huawei/595661_huawei-android-google-et-les-etats-unis-toutes-les-reponses-a-vos-questions">Huawei</a>). Comme je l&#8217;ai dit plus haut, le coup pour adapter une version à un device n&#8217;est pas négligeable. C&#8217;est pour cette raison  que les constructeurs limitent ces mises à jour. Leur intérêt est de vendre de nouveaux devices et non de les maintenir.</p>
</div>
<div class="paragraph">
<p>La fragmentation n&#8217;est pas liée qu&#8217;aux versions de l&#8217;OS mais nous avons également une fragmentation liée aux devices et à leurs composants. En fonction des gammes de prix, chaque device peut avoir des caractéristiques techniques différentes.</p>
</div>
<div class="sect2">
<h3 id="_fragmentation_au_niveau_des_versions">Fragmentation au niveau des versions</h3>
<div class="paragraph">
<p>Depuis quelques années, Google sort une nouvelle version d&#8217;Android par an. Généralement les développeurs peuvent commencer à tester et faire des retours sur le second et troisième trimestre et la version est mise à disposition au dernier trimestre d&#8217;une année civile.</p>
</div>
<div class="paragraph">
<p>Chaque nouvelle version est associée à une lettre (qui s&#8217;incrémente à chaque version) et à un dessert (choisi par l&#8217;équipe Android).</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_fg_01.png" alt="Versions Android">
</div>
</div>
<div class="paragraph">
<p>Vous pouvez voir que certains de ces desserts sont des desserts français. Depuis les débuts, l&#8217;équipe Android comprend plusieurs français. Vous connaissez peut être <a href="https://twitter.com/romainguy">Romain Guy</a> qui est régulièrement présent dans les conférences.</p>
</div>
<div class="paragraph">
<p>Quand vous démarrez un nouveau développement vous devez faire un choix de version. En fait vous devez faire deux choix</p>
</div>
<div class="ulist">
<ul>
<li>
<p>définir une version cible : généralement vous devez toujours choisir la dernière version de l&#8217;OS</p>
</li>
<li>
<p>définir une version minimale : vous définissez quelle est la version minimale de l&#8217;OS supportée. Le compilateur est capable de vous alertez quand vous essayez d&#8217;utiliser une API qui n&#8217;est pas supportée</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_fg_02.png" alt="Choix de la version Android">
</div>
</div>
<div class="paragraph">
<p>Les statistiques d&#8217;utilisation des versions sont publiées régulièrement sur <a href="https://developer.android.com/about/dashboards/">ce tableau de bord</a> qui compile les données remontées par Google Store (la source officielle des applications Android).</p>
</div>
<div class="paragraph">
<p>Dans le monde du web, vous pouvez utiliser des polyfills pour utiliser les dernières nouveautés du langage dans des navigateurs qui n&#8217;implémentent pas encore ces fonctionnalités. Dans le monde Android, Google vous propose aussi d&#8217;utiliser des objets particuliers qui gèrent cette rétrocompatibilité. La classe de base pour développer un écran est <code>android.app.Activity</code>, mais dans la pratique nous utiliserons toujours <code>androidx.appcompat.app.AppCompatActivity</code> qui a été développée pour porter les dernières nouveautés sur les anciennes releases Android.</p>
</div>
</div>
<div class="sect2">
<h3 id="_fragmentation_au_niveau_des_écrans">Fragmentation au niveau des écrans</h3>
<div class="paragraph">
<p>Après les versions, la plus grosse différence entre les devices concerne la qualité et la taille de l&#8217;écran.</p>
</div>
<div class="paragraph">
<p>Pour rappel</p>
</div>
<div class="ulist">
<ul>
<li>
<p>la <strong>résolution d&#8217;un écran</strong> représente le nombre de pixels en horizontal multiplé par le nombre de pixel en vertical. Par exemple (800 x 600)</p>
</li>
<li>
<p>la <strong>taille d&#8217;un écran</strong> est le nombre de pouce de la diagonale de l&#8217;écran</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Android propose une classification liée à la largeur d&#8217;un écran.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_fg_03.png" alt="taille ecran Android">
</div>
</div>
<div class="paragraph">
<p>Comme dans le monde du web, vous devez adpater votre UI soit en utilisant des composants et layout redimensionnable, soit en utilisant des layouts différents en fonction de la taille (en Android vous pouvez utiliser des fragments)</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_fg_04.png" alt="UI flexible sous Android">
</div>
</div>
<div class="paragraph">
<p>La <strong>densité de pixels</strong> est le nombre de points par pouce (dot per inch &#8658; dpi). La densité est importante sur un device. Par exemple si vous affichez une image exprimée en pixel sur 2 écrans de densité différentes vous n&#8217;aurez pas le même rendu</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_fg_05.png" alt="Densité sous Android avec image en px">
</div>
</div>
<div class="paragraph">
<p>Si on affiche les mêmes images exprimées avec l&#8217;unité <strong>dp</strong> (density-independent pixels) vous aurez le rendu suivant</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_fg_06.png" alt="Densité sous Android avec image en dp">
</div>
</div>
<div class="paragraph">
<p>La règle est de ne <strong>jamais exprimer des tailles en px dans une application mais toujours en dp</strong> (dans le monde du web on utilisera l&#8217;unité em). Pour exprimer la taille des polices d&#8217;écriture, vous utiliserez plutôt l&#8217;unité <strong>sp</strong> (scalable pixels) qui a l&#8217;avantage de grossir en fonction des paramètres d&#8217;accessibilité utilisateur.</p>
</div>
<div class="paragraph">
<p>Vous allez pouvoir créer des ressources différentes en fonction de la taille. Quand vous avez un bel écran avec une bonne résolution, une forte densité, vous attendrez des images de qualité. Ces mêmes images n&#8217;ont aucun intérêt sur des écrans qui ne sont pas capables de les afficher.</p>
</div>
</div>
<div class="sect2">
<h3 id="_fragmentation_au_niveau_matériel">Fragmentation au niveau matériel</h3>
<div class="paragraph">
<p>Nous nous sommes arrếtés sur les 2 plus grosses différences entre device mais on pourrait aller plus loin car vous avez aussi une grosse différence de qualité et de performances au niveau des composants de base d&#8217;un mobile ou d&#8217;une tablette. Vous n&#8217;avez pas les mêmes composants dans les devices d&#8217;entrée de gamme et ceux plus luxueux</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_fg_07.png" alt="Fragmentation matérielle">
</div>
</div>
<div class="paragraph">
<p>Pour offrir une bonne expérience utilisateur, vous pouvez appliquer quelques règles simples</p>
</div>
<div class="paragraph">
<p>Comme vos utilisateurs peuvent et ont pour la plupart des ressources limitées essayer de</p>
</div>
<div class="ulist">
<ul>
<li>
<p>limiter les appels réseaux qui consomment beaucoup de ressources et donc usent la batterie,</p>
</li>
<li>
<p>veiller à avoir un livrable d&#8217;une taille raisonnable. Si vous intégrez beaucoup d&#8217;images faites plusieurs archives avec des cibles différentes en fonction de la qualité des devices</p>
</li>
<li>
<p>éviter de stocker trop de données sur le téléphone de vos utilisateurs (que ce soit sur le disque ou dans la base de données partagées). Si vous devez stocker des éléments prévoyer de purger les éléments inutiles</p>
</li>
<li>
<p>privilégier des UI sombres qui préservent la batterie</p>
</li>
<li>
<p>appliquer le principe KISS (keep it simple, stupid)</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Nous venons de voir comment la plateforme a été construite et les problèmes liés à la fragementation. Dans le prochain article nous rentrerons dans le concret et nous regarderons comment développer une première application Android.</p>
</div>
<div class="paragraph">
<p>Si la plateforme vous intéresse je vous conseille de suivre quelques passionnés (Googlers ou non) : <a href="https://twitter.com/chethaase">Chet Haase</a>, <a href="https://twitter.com/JakeWharton">Jake Wharton</a>, <a href="https://twitter.com/romainguy">Romain Guy</a>, <a href="https://twitter.com/cyrilmottier">Cyril Mottier</a></p>
</div>
<div class="paragraph">
<p>Si vous voulez plus d&#8217;informations vous pouvez consulter <a href="https://developer.android.com" class="bare">https://developer.android.com</a> et si vous êtes fan de podcast en français je vous conseille de suivre <a href="http://androidleakspodcast.com/" class="bare">http://androidleakspodcast.com/</a></p>
</div>
</div>
</div>`;