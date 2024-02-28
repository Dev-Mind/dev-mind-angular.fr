export const _java_memoire:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a href="@link@#_le_garbage_collector">Le garbage collector</a></li>
<li><a href="@link@#_fonctionnement">Fonctionnement</a>
<ul class="sectlevel2">
<li><a href="@link@#_collecte_genérationnelle">Collecte genérationnelle</a></li>
<li><a href="@link@#_logguer_ce_que_fait_le_garbage_collector">Logguer ce que fait le garbage collector</a></li>
</ul>
</li>
<li><a href="@link@#_métriques">Métriques</a>
<ul class="sectlevel2">
<li><a href="@link@#_maximum_pause_time">Maximum Pause-Time</a></li>
<li><a href="@link@#_débit_de_lapplication_throughput">Débit de l&#8217;application (throughput)</a></li>
</ul>
</li>
<li><a href="@link@#_performances">Performances</a>
<ul class="sectlevel2">
<li><a href="@link@#_taille_de_la_heap_espace_mémoire_global">Taille de la heap (espace mémoire global)</a></li>
<li><a href="@link@#_taille_de_la_jeune_génération">Taille de la jeune génération</a></li>
</ul>
</li>
<li><a href="@link@#_serial_collector">Serial Collector</a></li>
<li><a href="@link@#_parallel_collector">Parallel Collector</a></li>
<li><a href="@link@#_garbage_first_g1">Garbage-First (G1)</a>
<ul class="sectlevel2">
<li><a href="@link@#_fonctionnement_2">Fonctionnement</a></li>
<li><a href="@link@#_principales_options">Principales options</a></li>
<li><a href="@link@#_améliorer_les_performances_du_g1">Améliorer les performances du G1</a>
<ul class="sectlevel3">
<li><a href="@link@#_full_gc">Full GC</a></li>
<li><a href="@link@#_utilisation_temps_système_incohérent">Utilisation temps système incohérent</a></li>
<li><a href="@link@#_problème_sur_les_collectes_mineures">Problème sur les collectes mineures</a></li>
<li><a href="@link@#_problème_sur_les_collectes_mixtes">Problème sur les collectes mixtes</a></li>
<li><a href="@link@#_référence_interrégionale">Référence interrégionale</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="@link@#_z_garbage_collector">Z Garbage Collector</a>
<ul class="sectlevel2">
<li><a href="@link@#_découpage_de_la_mémoire">Découpage de la mémoire</a></li>
<li><a href="@link@#_coloration_de_référence_colored_pointer">Coloration de référence (colored pointer)</a></li>
<li><a href="@link@#_barrières_gc_gc_barrier">Barrières GC (GC barrier)</a></li>
<li><a href="@link@#_cycle_de_vie">Cycle de vie</a></li>
<li><a href="@link@#_principales_options_2">Principales options</a></li>
</ul>
</li>
<li><a href="@link@#_epsilon_garbage_collector">Epsilon Garbage Collector</a></li>
<li><a href="@link@#_shenandoah_garbage_collector">Shenandoah Garbage Collector</a>
<ul class="sectlevel2">
<li><a href="@link@#_fonctionnement_3">Fonctionnement</a></li>
<li><a href="@link@#_principales_options_3">Principales options</a></li>
</ul>
</li>
<li><a href="@link@#_conclusion">Conclusion</a></li>
<li><a href="@link@#_références">Références</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Nous allons voir dans cet article, comment la mémoire est gérée sur une machine virtuelle (Java HotSpot VM).
En tant que développeur Java ou Kotlin la gestion de la mémoire est transparente et automatique, mais il existe plusieurs stratégies qui peuvent influer sur les performances de votre application.</p>
</div>
<div class="paragraph">
<p>Ces différentes stratégies ont évolué au fur et à mesure du temps et des versions.
Mon article se base sur Java 11, la <a href="https://en.wikipedia.org/wiki/Java_version_history">version LTS (Long term support) actuelle</a>.</p>
</div>
<div class="paragraph">
<p>Plusieurs termes ne seront pas traduits en français dans cet article, car la traduction a peu d&#8217;intérêt à mon sens.
J&#8217;éviterai par exemple de parler de ramasse-miettes et conserverai le terme Garbage collector :-).
Cet article est long (au moins 30 min) mais je trouvais important de décrire les différents GC au même endroit pour voir comment ils ont évolué.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2021/jvm_memory.png" alt="Mémoire Java">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_le_garbage_collector">Le garbage collector</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Le garbage collector (GC) est l&#8217;outil qui va gérer les allocations dynamiques et de la mémoire.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Lorsque l&#8217;application démarre, le garbage collector va réserver de la mémoire du système d&#8217;exploitation, et la restituer lors de son arrêt.
Les différents objets sont stockés dans un espace que l’on appelle la <code>heap</code>.</p>
</li>
<li>
<p>Quand l&#8217;application a besoin de créer des objets, le garbage collector va leur allouer des zones dédiées</p>
</li>
<li>
<p>La mémoire n&#8217;est pas infinie sur une machine.
Le garbage collector doit être capable de recycler les zones mémoires qui ne sont plus utilisées, pour pouvoir les réallouer.
Il le fait généralement en deux phases</p>
<div class="ulist">
<ul>
<li>
<p><code>Mark</code>: il identifie les objets qui sont utilisés ou non</p>
</li>
<li>
<p><code>Sweep</code>: il supprime les objets identifiés comme non utilisés lors de la phase précédente.</p>
</li>
</ul>
</div>
</li>
</ul>
</div>
<div class="paragraph">
<p>Comme je l&#8217;ai dit en introduction il existe plusieurs <a href="https://medium.com/@hasithalgamge/seven-types-of-java-garbage-collectors-6297a1418e82">garbages collectors</a> qui vont se comporter différemment.</p>
</div>
<div class="ulist">
<ul>
<li>
<p><a href="https://docs.oracle.com/en/java/javase/11/gctuning/available-collectors.html">Serial Garbage Collector</a> utilise un seul thread.
C&#8217;est le mieux adapté aux machines mono processeur.
C&#8217;est une très bonne solution pour les petites applications n&#8217;utilisant pas plus de 100Mo de mémoire.</p>
</li>
<li>
<p><a href="https://docs.oracle.com/en/java/javase/11/gctuning/parallel-collector1.html">Parallel Garbage Collector</a> est similaire au <code>Serial Collector</code> mais il est lui capable d&#8217;utiliser plusieurs threads pour essayer d&#8217;optimiser la phase de vérification des objets à supprimer.
Ce collecteur est destiné à des applications avec un ensemble de données moyen s&#8217;exécutant sur une machine multiprocesseur ou multithread.</p>
</li>
<li>
<p><a href="https://docs.oracle.com/en/java/javase/11/gctuning/concurrent-mark-sweep-cms-collector.html">CMS Garbage Collector</a> (déprécié depuis Java 9) on s&#8217;attardera plus sur son successeur le <code>Garbage-First (G1)</code></p>
</li>
<li>
<p><a href="https://docs.oracle.com/en/java/javase/11/gctuning/garbage-first-garbage-collector.html">G1 Garbage Collector</a> a été créé pour les serveurs multi multiprocesseurs avec une grande quantité de mémoire.</p>
</li>
<li>
<p><a href="https://openjdk.java.net/jeps/333">Z garbage collector</a> (expérimental en Java 11 et amené à remplacer le G1 à partir de JDK15) ZGC effectue tous les travaux coûteux simultanément, sans arrêter l&#8217;exécution des threads d&#8217;application.
Le ZGC est destiné aux applications qui nécessitent une faible latence (moins de 10ms de pauses) et/ou utilisent une très grosse <code>heap</code> (plusieurs téraoctets).</p>
</li>
<li>
<p><a href="http://openjdk.java.net/jeps/318">Epsilon Garbage Collector</a> (expérimental en Java 11) gère l&#8217;allocation de mémoire mais n&#8217;implémente aucun mécanisme de récupération de mémoire.
Une fois que le tas Java disponible est épuisé, la machine virtuelle Java s&#8217;arrête (OutOfMemory).
C&#8217;est forcément celui qui a le temps de latence le plus faible.
Il est destiné à des jobs qui vont avoir une durée de vie très courte.</p>
</li>
<li>
<p><a href="https://openjdk.java.net/jeps/189">Shenandoah Garbage Collector</a> (apparu en Java 12) a pour but de réduire les temps de pause GC en effectuant le nettoyage en même temps que les threads Java sont en cours d&#8217;exécution.
Les temps de pause avec Shenandoah sont indépendants de la taille du tas, ce qui signifie que vous aurez les mêmes temps de pause, que votre tas soit de 200Mo ou 200Go.
Par contre forcément vu que le travail est en continu le débit peut être impacté</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>La JVM essaie de s&#8217;adapter à votre environnement et votre application.
Dans la majorité des cas, elle fera les bons choix.
Mais si vous constatez des ralentissements, vous pouvez vous poser des questions et affiner éventuellement les paramètres ou le GC utilisé.</p>
</div>
<div class="paragraph">
<p>Par défaut, la JVM fait ce choix là</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>G1 Garbage Collector</code></p>
</li>
<li>
<p>Le nombre de threads utilisables par le GC est déterminé en fonction des ressources CPU disponible et de la taille de la <code>heap</code></p>
</li>
<li>
<p>Taille initiale de la <code>heap</code> : 1/64 de la mémoire physique</p>
</li>
<li>
<p>Taille maximale de la <code>heap</code> : 1/4 de la mémoire physique</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_fonctionnement">Fonctionnement</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Scanner la mémoire (<code>mark</code>) et recycler des zones (<code>sweep</code>) a un coût non négligeable.</p>
</div>
<div class="paragraph">
<p>Chaque objet instancié dans la JVM peut être lié à un ou plusieurs autres.
Ce lien est appelé une référence.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>un objet ayant une ou plusieurs références est considéré comme vivant</p>
</li>
<li>
<p>quand il n&#8217;existe plus aucune référence vers un objet, ce dernier est considéré comme mort et le GC peut le supprimer et réutiliser l&#8217;espace mémoire utilisé.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Si on voulait implémenter un garbage collector simple, on pourrait mettre en place l&#8217;algorithme suivant.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>l&#8217;application est mise en pause pour analyser chaque objet, pour éviter de recréer des objets pendant que nous essayons de faire du ménage.</p>
</li>
<li>
<p>notre GC itère sur chaque objet accessible pour voir si il est reférencé par d&#8217;autres.</p>
</li>
<li>
<p>on supprime tous les objets morts pour réutiliser leur espace mémoire</p>
</li>
<li>
<p>si on voulait bien faire, il faudrait défragmenter pour que les tous les objets utilisés soient au début de la mémoire.</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>Niveau performance cette approche va dépendre du nombre d&#8217;objets et de la taille de la mémoire.
Il deviendra vite inefficace pour une grosse application.</p>
</div>
<div class="paragraph">
<p>Les différents garbage collectors vont faire des hypothèses sur votre application (ces hyppothèses peuvent variées en fonction des paramètres que vous pouvez utiliser).
Le but est de minimiser le travail requis pour récupérer les objets inutilisés.</p>
</div>
<div class="sect2">
<h3 id="_collecte_genérationnelle">Collecte genérationnelle</h3>
<div class="paragraph">
<p>Le GC se base sur des hypothèses (générationnelles)</p>
</div>
<div class="ulist">
<ul>
<li>
<p>la majorité des objets ne survivent que pendant une courte période de temps, l&#8217;exécution d&#8217;une méthode par exemple.</p>
</li>
<li>
<p>d&#8217;autres objets beaucoup moins nombreux vont vivre tout au long de la vie d&#8217;une application jusqu&#8217;à ce que la VM se termine (exemple des objets statiques, des singletons&#8230;&#8203;).</p>
</li>
<li>
<p>entre ces deux extrêmes on va retrouver quelques objets, qui vont avoir une durée de vie variant entre la jeunesse et l&#8217;éternité.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Bien évidemment une application peut se comporter différemment, mais la très grosse majorité suivent ces hypothèses.</p>
</div>
<div class="paragraph">
<p>La <code>heap</code> (mémoire totale) va être découpée en différentes zones (générations) qui contiendront des objets d&#8217;âges différents.
Par exemple pour le <code>Serial Garbage Collector</code> nous avons le découpage suivant</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2021/jvm_memory_serial_collector.png" alt="Découpage mémoire Serial Garbage Collector">
</div>
</div>
<div class="paragraph">
<p>Le GC se lance sur une génération lorsque la zone est remplie.
Come nous avons des zones plus petites, le travail sera plus rapide.</p>
</div>
<div class="paragraph">
<p>Un objet nouvellement créé (via un new) est placé dans la <code>jeune génération</code> et plus précisément dans la sous zone <code>Eden</code>.
Lorque cet espace est plein, le GC tente de nettoyer les objets.
Cette opération est appelée une collecte mineure (Minor collection) car elle implique un nombre limité d&#8217;objets.</p>
</div>
<div class="paragraph">
<p>Il existe deux zones Survivor, et sur les deux nous en avons toujours au moins une des deux qui reste vide.
Quand le GC parcourt tous les objets des zones <code>Eden</code> et <code>Survivor</code> (celle occupée),</p>
</div>
<div class="ulist">
<ul>
<li>
<p>un objet non utilisé est supprimé</p>
</li>
<li>
<p>un objet encore en vie aura son âge incrémenté de 1 et sera copié dans la zone <code>Survivor</code> restée vide.</p>
</li>
<li>
<p>un objet du survivor qui a un âge assez grand est transféré dans la <code>vieille génération</code>.
Cet âge (seuil) est calculé par le GC</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Quand le GC doit nettoyer la vieille génération, il lance une collecte majeure sur toute la <code>heap</code> (Major collection).
Cette collecte est bien plus coûteuse qu&#8217;une collecte mineure de la jeune génération.</p>
</div>
<div class="paragraph">
<p>Sur mon image les zones virtuelles correspondent aux zones disponibles mais non encore allouées.</p>
</div>
</div>
<div class="sect2">
<h3 id="_logguer_ce_que_fait_le_garbage_collector">Logguer ce que fait le garbage collector</h3>
<div class="paragraph">
<p>Si vous suspectez des problèmes de GC, vous devez savoir ce qu&#8217;il fait.
Pour activer des logs, vous pouvez ajouter des options comme <code>-verbose:gc</code> lorsque vous lancez votre JVM. Par exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre>[1,733s][info][gc] GC(4) Pause Young (Normal) (G1 Evacuation Pause) 149M-&gt;23M(258M) 8,546ms
[1,760s][info][gc] GC(5) Pause Young (Concurrent Start) (Metadata GC Threshold) 25M-&gt;23M(258M) 12,065ms
[1,760s][info][gc] GC(6) Concurrent Cycle
[1,769s][info][gc] GC(6) Pause Remark 24M-&gt;24M(258M) 1,524ms
[1,772s][info][gc] GC(6) Pause Cleanup 24M-&gt;24M(258M) 0,034ms
[1,773s][info][gc] GC(6) Concurrent Cycle 13,448ms</pre>
</div>
</div>
<div class="paragraph">
<p>Le format est</p>
</div>
<div class="listingblock">
<div class="content">
<pre>[timestamp][niveau log][processus gc] GC(numéro identification GC) [message avec information sur la mémoire libérée]</pre>
</div>
</div>
<div class="paragraph">
<p>Par exemple <code>149M&#8594;23M(258M)</code> siginifie que 149M étaient utilisés avant l&#8217;exécution du GC et qu&#8217;il reste 23M encore utilisé après l&#8217;exécution sur une taille de heap de 258M</p>
</div>
<div class="paragraph">
<p>Pour avoir encore plus de détail vous pouvez utiliser l&#8217;option <code>-Xlog:gc*</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre>[3,526s][info][gc,start      ] GC(9) Pause Young (Concurrent Start) (Metadata GC Threshold)
[3,526s][info][gc,task       ] GC(9) Using 10 workers of 10 for evacuation
[3,534s][info][gc,phases     ] GC(9)   Pre Evacuate Collection Set: 0,1ms
[3,534s][info][gc,phases     ] GC(9)   Evacuate Collection Set: 7,3ms
[3,534s][info][gc,phases     ] GC(9)   Post Evacuate Collection Set: 0,5ms
[3,534s][info][gc,phases     ] GC(9)   Other: 0,1ms
[3,534s][info][gc,heap       ] GC(9) Eden regions: 53-&gt;0(141)
[3,534s][info][gc,heap       ] GC(9) Survivor regions: 15-&gt;12(20)
[3,534s][info][gc,heap       ] GC(9) Old regions: 23-&gt;29
[3,534s][info][gc,heap       ] GC(9) Humongous regions: 0-&gt;0
[3,534s][info][gc,metaspace  ] GC(9) Metaspace: 58647K-&gt;58647K(307200K)
[3,534s][info][gc            ] GC(9) Pause Young (Concurrent Start) (Metadata GC Threshold) 88M-&gt;39M(258M) 8,056ms
[3,534s][info][gc,cpu        ] GC(9) User=0,06s Sys=0,00s Real=0,01s
[3,534s][info][gc            ] GC(10) Concurrent Cycle
[3,534s][info][gc,marking    ] GC(10) Concurrent Clear Claimed Marks
[3,534s][info][gc,marking    ] GC(10) Concurrent Clear Claimed Marks 0,120ms
[3,534s][info][gc,marking    ] GC(10) Concurrent Scan Root Regions
[3,537s][info][gc,marking    ] GC(10) Concurrent Scan Root Regions 3,396ms
[3,537s][info][gc,marking    ] GC(10) Concurrent Mark (3,537s)
[3,537s][info][gc,marking    ] GC(10) Concurrent Mark From Roots
[3,537s][info][gc,task       ] GC(10) Using 3 workers of 3 for marking
[3,551s][info][gc,marking    ] GC(10) Concurrent Mark From Roots 13,685ms
[3,551s][info][gc,marking    ] GC(10) Concurrent Preclean
[3,551s][info][gc,marking    ] GC(10) Concurrent Preclean 0,111ms
[3,551s][info][gc,marking    ] GC(10) Concurrent Mark (3,537s, 3,551s) 13,821ms
[3,551s][info][gc,start      ] GC(10) Pause Remark
[3,553s][info][gc,stringtable] GC(10) Cleaned string and symbol table, strings: 33455 processed, 61 removed, symbols: 177525 processed, 231 removed
[3,553s][info][gc            ] GC(10) Pause Remark 43M-&gt;43M(258M) 2,309ms
[3,553s][info][gc,cpu        ] GC(10) User=0,02s Sys=0,00s Real=0,00s
[3,553s][info][gc,marking    ] GC(10) Concurrent Rebuild Remembered Sets
[3,561s][info][gc,marking    ] GC(10) Concurrent Rebuild Remembered Sets 7,794ms
[3,561s][info][gc,start      ] GC(10) Pause Cleanup
[3,561s][info][gc            ] GC(10) Pause Cleanup 44M-&gt;44M(258M) 0,046ms
[3,561s][info][gc,cpu        ] GC(10) User=0,00s Sys=0,00s Real=0,00s
[3,561s][info][gc,marking    ] GC(10) Concurrent Cleanup for Next Mark
[3,562s][info][gc,marking    ] GC(10) Concurrent Cleanup for Next Mark 0,093ms
[3,562s][info][gc            ] GC(10) Concurrent Cycle 27,936ms</pre>
</div>
</div>
<div class="paragraph">
<p>Pour éviter de polluer vos logs applicatives, vous pouvez réorienter ces logs dans un fichier à part en utilisant l&#8217;option <code>-Xlog:gc*:garbage-collection.log</code></p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_métriques">Métriques</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Les paramétrages du garbage collector permettent soit de limiter les temps de pause de l&#8217;application (maximum pause-time) soit priviligier le débit de l&#8217;application (throughput).</p>
</div>
<div class="sect2">
<h3 id="_maximum_pause_time">Maximum Pause-Time</h3>
<div class="paragraph">
<p>Quand le garbage collector doit analyser la mémoire pour libérer de l&#8217;espace, l&#8217;application est mise en pause (ce qui peut être génant pour des applications pseudo temps réel).
On parle de mode <code>stop-the-world</code></p>
</div>
<div class="paragraph">
<p>Définir un temps de pause maximal permet de fixer des limites au garbage collector.
On peut se poser la question de comment est calculé ce temps ?</p>
</div>
<div class="paragraph">
<p>Une moyenne des temps d&#8217;exécution est calculée, mais elle pondérée pour que les pauses les plus récentes comptent le plus.
Au démarrage votre mémoire est peu remplie et le passé récent est beaucoup plus intéressant.</p>
</div>
<div class="paragraph">
<p>L&#8217;objectif de temps de pause maximum est spécifié en millisecondes avec l&#8217;option <code>-XX: MaxGCPauseMillis=&lt;nnn&gt;</code>.
Si la moyenne plus la variation du temps de pause est supérieure à l&#8217;objectif de temps de pause maximum, alors le GC considère que l&#8217;objectif n&#8217;est pas atteint.</p>
</div>
<div class="paragraph">
<p>Le GC ajuste la taille de la <code>heap</code> ainsi que d&#8217;autres paramètres pour tenter de maintenir cet objectif de pause maximale.</p>
</div>
<div class="paragraph">
<p>Si on réduit le temps alloué à la collecte, le garbage collector sera lancé plus souvent, réduisant ainsi le débit global (throughput) de l&#8217;application.</p>
</div>
</div>
<div class="sect2">
<h3 id="_débit_de_lapplication_throughput">Débit de l&#8217;application (throughput)</h3>
<div class="paragraph">
<p>Un débit est un ratio entre 2 valeurs.
Le débit de l&#8217;application (throughput) est calculé en divisant le temps passé à collecter les déchets (Garbage collection overhead) et le temps passé en dehors du GC (temps réservé à l&#8217;application).</p>
</div>
<div class="paragraph">
<p>Comme pour le temps de pause maximal, vous pouvez définir un objectif pour limiter le throughput global <code>-XX: GCTimeRatio=nnn</code>.</p>
</div>
<div class="paragraph">
<p>Par exemple, si ce ratio est défini à <code>19</code>, le rapport entre le temps de garbage collection et le temps d&#8217;application est de <code>1 / (1 + 19)</code> soit 1/20eme soit 5% du temps total.</p>
</div>
<div class="paragraph">
<p>Si l&#8217;objectif de débit n&#8217;est pas atteint, le garbage peut augmenter la taille de la <code>heap</code> pour que le temps passé dans l&#8217;application puisse être plus long.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_performances">Performances</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Nous pouvons voir que l&#8217;augmentation de la mémoire peut dans les 2 cas améliorer le temps de pause maximal et le throughput.
Mais ce n&#8217;est pas magique car plus il y a de l&#8217;espace allouable plus le boulot de recyclage est important.</p>
</div>
<div class="sect2">
<h3 id="_taille_de_la_heap_espace_mémoire_global">Taille de la heap (espace mémoire global)</h3>
<div class="paragraph">
<p>Le facteur le plus important affectant les performances du GC est la mémoire totale disponible (la <code>heap</code>).
Étant donné que les collectes se produisent lorsque les générations se remplissent, le débit est inversement proportionnel à la quantité de mémoire disponible.</p>
</div>
<div class="paragraph">
<p>Les tailles de <code>heap</code> minimale et maximale que le garbage collector peut utiliser peuvent être définies à l&#8217;aide des paramètres</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>-Xms=&lt;nnn&gt;</code> taille minimale</p>
</li>
<li>
<p><code>-Xmx=&lt;mmm&gt;</code> taille maximale</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Si la valeur minimale est inférieure à la valeur maximale, tout l&#8217;espace réservé n&#8217;est pas immédiatement validé par la machine virtuelle.
Si vous regardez l&#8217;image plus haut décrivant la répartition générationnelle de la mémoire, cet espace non validé correspond aux zones virtuelles.</p>
</div>
<div class="paragraph">
<p>La machine virtuelle essaye de conserver une proportion d&#8217;espace libre définie par les paramètres</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>-XX:MinHeapFreeRatio = &lt;nnn&gt;</code> (n = 40 par défaut) si le pourcentage d&#8217;espace libre dans une génération tombe en dessous de 40%, alors elle essaie d&#8217;utiliser plus d&#8217;espace pour maintenir 40% d&#8217;espace libre, jusqu&#8217;à la taille maximale autorisée de la génération.</p>
</li>
<li>
<p><code>-XX:MaxHeapFreeRatio = &lt;nnn&gt;</code> (n = 70 par défaut) si l&#8217;espace libre dépasse 70%, alors la génération libère de l&#8217;espace pour ne pas utiliser plus de 70%, sous réserve de la taille minimale de la génération.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Les recommandations faites par Oracle sur cette <code>heap</code> sont les suivantes</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Essayez d&#8217;allouer autant de mémoire que possible à la machine virtuelle.
La taille par défaut est souvent trop petite.
Bien sur ceci est vrai si vous ne rencontrez pas de problèmes avec les pauses.</p>
</li>
<li>
<p>Si vous avez des <code>OutOfMemoryException</code> (plus d&#8217;espace) vous avez certainement une fuite mémoire mais vous pouvez compenser en augmentant la taille mémoire</p>
</li>
<li>
<p>Respecter les limites de la machine pour ne pas avoir de swap et éviter les exceptions page faults</p>
</li>
<li>
<p>Définir -Xms et -Xmx avec la même valeur est une bonne pratique et limite le travail de la JVM car elle n&#8217;aura pas besoin de re-dimensionner.
Mais quand vous le faites, la machine virtuelle est alors incapable de compenser si vous avez choisi des mauvaises valeurs.</p>
</li>
<li>
<p>En général, il faut augmenter la mémoire au fur et à mesure que vous augmentez le nombre de processeurs, car l&#8217;allocation peut être effectuée en parallèle.</p>
</li>
<li>
<p>Quand vous avez un espace mémoire limité (embarqué) vous pouvez minimiser la taille de la <code>heap</code> mais aussi jouer les ration <code>MinHeapFreeRatio</code> et <code>MaxHeapFreeRatio</code></p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_taille_de_la_jeune_génération">Taille de la jeune génération</h3>
<div class="paragraph">
<p>Après la mémoire totale disponible, le deuxième facteur le plus influent sur les performances, est la proportion de la <code>heap</code> consacrée à la jeune génération: plus cet espace est grand, moins les collectes mineures sont fréquentes.
Mais, si la taille maximale de la <code>heap</code> est limitée, la vieille génération sera moins grande et donc la fréquence des collectes majeures sera plus haute.</p>
</div>
<div class="paragraph">
<p>Le choix optimal dépend un peu de la nature de l&#8217;application.
Les paramètres pour jouer sur cette taille sont les suivants</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>-XX:NewRatio=&lt;nnn&gt;</code> si nnn=3 ce ratio permet de dire que la jeune génération utilisera 1 et la vieille génération 3 (soit 1/4 de la <code>heap</code>)</p>
</li>
<li>
<p><code>-XX:NewSize=&lt;nnn&gt;</code> taille minimale jeune génération</p>
</li>
<li>
<p><code>-XX:MaxNewSize=&lt;nnn&gt;</code> taille maximale jeune génération</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>La jeune generation est sous découpée en une zone Eden et deux zones Survivor.
L&#8217;option</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>-XX:SurvivorRatio=&lt;nnn&gt;</code> permet de régler la taille des zones Survivor.
Si vous choisissez un ratio à 8 la taille d&#8217;un Survivor sera 1/8 de la zone Eden et donc 1/10 de la jeune génération (nous avons 2 zones Survicor).</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Si ces espaces Survivor sont trop petits, le GC transfert plus vite les objets vers la vieille génération.
Si ces espaces sont trop grands, ils sont inutilement vides.</p>
</div>
<div class="paragraph">
<p>Les recommandations faites par Oracle sur cette <code>jeune génération</code> sont les suivantes</p>
</div>
<div class="ulist">
<ul>
<li>
<p>N&#8217;affinez cet espace que lorsque vous avez définis une taille maximale de la <code>heap</code> (<code>-Xmx = &lt;mmm&gt;</code>)</p>
</li>
<li>
<p>Augmenter la taille de la jeune génération nécessite de réduire la taille de la vieille génération.
Faite attention que la zone vieille génération garde suffisamment d&#8217;espace pour contenir toutes les données de l&#8217;application à un instant t, plus une certaine marge de manoeuvre (10 à 20% ou plus).</p>
</li>
<li>
<p>Augmentez la taille de la jeune génération à mesure que vous augmentez le nombre de processeurs, car l&#8217;allocation peut être parallélisée.</p>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_serial_collector">Serial Collector</h2>
<div class="sectionbody">
<div class="paragraph">
<p>En fait nous avons déjà décrit son comportement plus haut avec le comportement des générations et les différentes options disponibles</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2021/jvm_memory_serial_collector.png" alt="Découpage mémoire Serial Garbage Collector">
</div>
</div>
<div class="paragraph">
<p>Pour l&#8217;activer utilisez l&#8217;option <code>-XX:+UseSerialGC</code></p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_parallel_collector">Parallel Collector</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Le fonctionnement est très similaire au <a href="java-memoire.html#_serial_collector">Serial Collector</a>.
La différence est que la phase de collecte est répartie sur plusieurs threads.
Sur une machine mono processeur, le collecteur parallèle ne fonctionnera probablement pas aussi bien que le Serial Collector en raison de la surcharge requise pour l&#8217;exécution parallèle (par exemple, la synchronisation).</p>
</div>
<div class="paragraph">
<p>Mais plus vous aurez de processeur plus ce garbage collector deviendra avantageux.
L&#8217;exécution en parallèle, devrait raccourcir les temps de pauses des collectes.</p>
</div>
<div class="paragraph">
<p>Dans les collectes mineures, cette exécution multi thread peut amener une certaine fragmentation lors de la copie dans la vieille génération.
Réduire le nombre de threads de ramasse-miettes et augmenter la taille de l&#8217;ancienne génération réduira cet effet de fragmentation.</p>
</div>
<div class="paragraph">
<p>Vous pouvez ajuster le nombre de thread ou d&#8217;autres options avec les paramètres suivants</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>-XX:+UseParallelGC</code> activation du <code>Parallel Collector</code></p>
</li>
<li>
<p><code>-XX:ParallelGCThreads=&lt;N&gt;</code> nombre de thread utilisé</p>
</li>
<li>
<p><code>-XX:YoungGenerationSizeIncrement=&lt;N&gt;</code> pourcentage utilisé quand la jeune génération doit être augmentée (par défaut 20%)</p>
</li>
<li>
<p><code>-XX:TenuredGenerationSizeIncrement=&lt;N&gt;</code> pourcentage utilisé quand la vielle génération doit être augmentée (par défaut 20%)</p>
</li>
<li>
<p><code>-XX:AdaptiveSizeDecrementScaleFactor=&lt;N&gt;</code> pourcentage utilisé quand une génération doit être réduite (par défaut 5%)</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Les générations sont organisées légérement différement.
Par défaut la jeune géneration fait un tiers de la taille totale du tas.
Si vous n&#8217;avez pas surchargé les paramètres de la taille maximale ou minimale les valeurs par défaut sont les suivantes</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>-Xms 1/64e de la mémoire physique</code> taille minimale</p>
</li>
<li>
<p><code>-Xmx 1/4 de la mémoire physique</code> taille maximale</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2021/jvm_memory_parallel_collector.png" alt="Découpage mémoire Parallel Garbage Collector">
</div>
</div>
<div class="paragraph">
<p>Une exception de type <code>OutOfMemoryError</code> sera levée si plus de 98% du temps total est passé dans la phase de collecte et que moins de 2% du tas est récupéré.
Si nécessaire, cette fonctionnalité peut être désactivée en ajoutant l&#8217;option <code>-XX: -UseGCOverheadLimit</code> à la ligne de commande mais ce n&#8217;est pas conseillé.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_garbage_first_g1">Garbage-First (G1)</h2>
<div class="sectionbody">
<div class="paragraph">
<p><code>Garbage-First (G1)</code> et <code>Concurrent Mark Sweep (CMS)</code> avant lui, vont réaliser une partie de leur travail en même temps que l&#8217;application (mode concurrent, simultané).
Le <code>Serial collector</code> et le <code>Parallel collector</code> fonctionnent en mode <code>stop-the-world</code>, c&#8217;est à dire que l&#8217;exécution de l&#8217;application est complètement suspendue pendant la collecte.
En mode concurrent le débit de l&#8217;application est forcément impacté mais les temps de pause sont considérablement réduit.</p>
</div>
<div class="paragraph">
<p>Le G1 a été créé pour les applications qui utilisent un grand espace mémoire (plusieurs giga).
C&#8217;est très souvent le garbage utilisé par défaut par la JVM. S&#8217;il n&#8217;est pas activé vous pouvez utiliser l&#8217;option <code>-XX:+UseG1GC</code>.</p>
</div>
<div class="sect2">
<h3 id="_fonctionnement_2">Fonctionnement</h3>
<div class="paragraph">
<p>Le G1 découpe la heap en un ensemble de petites zones de même taille.
A tout moment, chacune de ces régions peut être vide (gris clair), ou attribuée à une génération particulière (eden, survivor, old).
Au fur et à mesure que les demandes de mémoire arrivent, le gestionnaire de mémoire distribue des régions libres.
Comme pour les autres GC, les efforts de récupération d&#8217;espace se concentrent sur la jeune génération là où il est le plus efficace de le faire, avec parfois bien évidemment des récupérations d&#8217;espace dans les anciennes générations.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2021/jvm_memory_g1_collector.png" alt="Découpage mémoire Garbage First Collector">
</div>
</div>
<div class="paragraph">
<p>Lors de la phase de marquage, le G1 va identifié les zones qui contiennent le moins d&#8217;objets vivants et les traiter en premier (d&#8217;où son nom Garbage First!).
A chaque fois qu&#8217;il va nettoyer une zone il va la vider et recopier les objets restants dans une nouvelle zone disponible.
Cette copie peut être une copie</p>
</div>
<div class="ulist">
<ul>
<li>
<p>de Eden à Survivor,</p>
</li>
<li>
<p>de Survivor à une zone ancienne génération</p>
</li>
<li>
<p>d&#8217;une zone ancienne génération à une nouvelle zone ancienne génération</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Ceci permet de limiter la fragmentation et de recompacter les données en mémoire.
De plus il ne traite pas toute la mémoire d&#8217;un coup, il va procéder en mode incrémental pour respecter ses objectifs de temps de pause quelque soit la taille de la <code>heap</code>.</p>
</div>
<div class="paragraph">
<p>G1 alterne entre deux phases.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>une phase avec des collectes des jeunes générations qui remplissent progressivement les zones d&#8217;ancienne génération.</p>
</li>
<li>
<p>une phase de récupération d&#8217;espace où le G1 récupère progressivement l&#8217;espace de l&#8217;ancienne génération, en plus de gérer la jeune génération.</p>
</li>
<li>
<p>ensuite le cycle redémarre en ne traitant que des zones de type Eden</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Si la taille d&#8217;un objet est supérieure à 50% d&#8217;une zone, il est considéré comme gigantesque et alloué directement dans une ou plusieurs zones continues de l&#8217;ancienne génération en fonction de la taille.
Ces objets ne passent pas par les jeunes générations pour limiter les copies.</p>
</div>
</div>
<div class="sect2">
<h3 id="_principales_options">Principales options</h3>
<div class="paragraph">
<p>Voici les principales options du G1 avec leur valeur par défaut.
Quand la valeur est <code>ergonomics</code>, la JVM va ajuster la valeur au cours de l&#8217;exécution de l&#8217;application en fonction de son comportement.
Si vous surchargé cette valeur vous perdrez ce paramètrage dynamique</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>-XX:MaxGCPauseMillis=200</code> objectif pour le temps de pause</p>
</li>
<li>
<p><code>-XX:GCPauseTimeInterval=&lt;ergonomics&gt;</code> objectif pour l&#8217;intervalle de temps de pause maximal.</p>
</li>
<li>
<p><code>-XX:ParallelGCThreads=&lt;ergonomics&gt;</code> nombre maximum de threads utilisés pour le parallélisme pendant les pauses de récupération.</p>
</li>
<li>
<p><code>-XX:ConcGCThreads=&lt;ergonomics&gt;</code> nombre maximum de threads utilisés pour le travail en cours (normalement 1/4 de <code>ParallelGCThreads</code>)</p>
</li>
<li>
<p><code>-XX:+G1UseAdaptiveIHOP -XX:InitiatingHeapOccupancyPercent=45</code> IHOP (Initiating Heap Occupancy Percent) est le seuil à partir duquel un marquage est déclenché et il est défini comme un pourcentage de la taille de l&#8217;ancienne génération.
Ces paramétres indiquent que la détermination adaptative de cette valeur est activée, et que pour les premiers cycles de collecte, G1 utilisera un seuile fixé à 45%</p>
</li>
<li>
<p><code>-XX:G1HeapRegionSize=&lt;ergonomics&gt;</code> taille des régions.
Cette taille dépend des tailles initiales et maximales de la heap.</p>
</li>
<li>
<p><code>-XX:G1NewSizePercent=5 -XX:G1MaxNewSizePercent=60</code> taille de la jeune génération qui varie entre ces deux valeurs (qui sont un pourcentage de la heap en cours d&#8217;utilisation)</p>
</li>
<li>
<p><code>-XX:G1HeapWastePercent=5</code> quantité acceptable d&#8217;espace non récupéré lors d&#8217;une collecte.</p>
</li>
<li>
<p><code>-XX:G1MixedGCCountTarget=8</code> longueur attendue de la phase de récupération d&#8217;espace</p>
</li>
<li>
<p><code>-XX:G1MixedGCLiveThresholdPercent=85</code> les régions de l&#8217;ancienne génération avec plus de 85% d&#8217;objets encore vivants ne sont pas collectés dans cette phase</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_améliorer_les_performances_du_g1">Améliorer les performances du G1</h3>
<div class="paragraph">
<p>Nous allons nous attarder sur le G1 qui est le GC par défaut.
Dans cette section je me base sur les <a href="https://docs.oracle.com/en/java/javase/11/gctuning/garbage-first-garbage-collector-tuning.html">recommandations</a> faites par Oracle.</p>
</div>
<div class="paragraph">
<p>G1 est conçu pour être efficace sans qu&#8217;il soit nécessaire de spécifier des options supplémentaires.
Cependant, il existe des cas où les configurations par défaut peuvent être améliorées.
Pour constater les problèmes activer les logs comme indiqué dans le chapitre dédié plus haut.</p>
</div>
<div class="sect3">
<h4 id="_full_gc">Full GC</h4>
<div class="paragraph">
<p>Une collecte majeure (Full GC) prend souvent beaucoup de temps.
Elles sont provoquées par une occupation de la <code>heap</code> trop élevée.
Si vous avez trop de full GC, les mots <code>Pause Full (Allocation Failure)</code> sont visibles dans les logs.</p>
</div>
<div class="paragraph">
<p>Les full GC se produisent quand l&#8217;application alloue trop d&#8217;objets qui ne peuvent pas être récupérés assez rapidement.
Souvent, la phase de marquage n&#8217;a pas le temps de se terminer à temps pour démarrer une phase de récupération d&#8217;espace.
La probabilité de se heurter à un Full GC peut être aggravée par l&#8217;attribution de nombreux objets gigantesques.
En raison de la façon dont ces objets sont alloués dans G1, ils peuvent prendre beaucoup plus de mémoire que prévu.
Pour laisser plus de temps à la phase de marquage, vous pouvez diminuer le taux d&#8217;allocation dans l&#8217;ancienne génération ou vous pouvez accorder plus de temps au marquage simultané.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>pour voir le nombre de régions occupées par des objets gigantesques dans la <code>heap</code>, augmentez le niveau de log <code>-Xlog:gc=debug</code>.
Les lignes <code>Humongous regions: X&#8594;Y</code> vous donne la quantité de régions occupées par des objets gigantesques.
Si ce nombre est élevé par rapport au nombre d&#8217;anciennes régions, la meilleure option est d&#8217;essayer de réduire ce nombre d&#8217;objets, en augmentant la taille des régions à l&#8217;aide de l&#8217;option <code>-XX: G1HeapRegionSize</code>.
Pour connaître La taille de région actuelle, reportez vous au au début des logs</p>
</li>
<li>
<p>augmenter la taille du tas Java permet d&#8217;augmenter le temps accordé au marquage</p>
</li>
<li>
<p>augmenter le nombre de threads de marquage simultanés <code>-XX: ConcGCThread</code> est aussi une option.</p>
</li>
<li>
<p>une autre option est de forcer G1 à commencer le marquage plus tôt.
Le seuil IHOP (Initiating Heap Occupancy Percent) est déterminé automatiquement en fonction du comportement antérieur de l&#8217;application.
Si le comportement de l&#8217;application change, ces prédictions peuvent être erronées.
Vous pouvez désactiver le calcul adaptatif de l&#8217;IHOP en le définissant manuellement à l&#8217;aide de -XX: -G1UseAdaptiveIHOP et-XX: InitiatingHeapOccupancyPercent.</p>
</li>
</ul>
</div>
</div>
<div class="sect3">
<h4 id="_utilisation_temps_système_incohérent">Utilisation temps système incohérent</h4>
<div class="paragraph">
<p>Chaque pause du GC (<code>stop-the-world</code>), peut se retrouver dans les logs.
Vous trouverez une ligne similaire à celle ci</p>
</div>
<div class="listingblock">
<div class="content">
<pre>[3,553s][info][gc,cpu        ] GC(10) User=0,19s Sys=0,00s Real=0,01s</pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>le temps utilisateur est le temps passé dans le code dans la VM.</p>
</li>
<li>
<p>le temps système est le temps passé dans le système d&#8217;exploitation.</p>
</li>
<li>
<p>le temps réel est le temps absolu passé pendant la pause</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Il peut y avoir plusieurs causes si le temps système est relativement élevé</p>
</div>
<div class="ulist">
<ul>
<li>
<p>La VM qui alloue ou restitue de la mémoire à partir de la mémoire du système d&#8217;exploitation peut entraîner des retards inutiles.
Faites en sorte de fixer le dimensionnement au démarrage de la VM en utilisant les options <code>-Xms</code> et <code>-Xmx</code> et utilisez l&#8217;option <code>-XX:+AlwaysPreTouch</code> pour allouer toute la mémoire physique utilisé par la <code>heap</code> à l’initialisation.</p>
</li>
<li>
<p>Sous Linux, <a href="https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html">Transparent Huge Pages (THP)</a> peut bloquer les processus aléatoirement.
Comme la VM alloue et conserve beaucoup de mémoire, il existe un risque que le processus de la VM se bloque pendant une longue période.
Reportez-vous à la documentation de votre système d&#8217;exploitation pour savoir comment désactiver cette fonctionnalité.</p>
</li>
<li>
<p>L&#8217;écriture des logs peut aussi être un souci si des tâches bloquent les I/0</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Si le temps réel est démesurément grand, cela peut indiquer que la VM n&#8217;a pas eu assez de temps CPU pour faire son travail (peut arriver sur un machine surchargée)</p>
</div>
</div>
<div class="sect3">
<h4 id="_problème_sur_les_collectes_mineures">Problème sur les collectes mineures</h4>
<div class="paragraph">
<p>Les collectes mineures sur les jeunes générations doivent prendre un temps proportionnel à la taille de ces générations, ou plus précisément au nombre d&#8217;objets vivants qui doivent être copiés ans une zone Survivor.</p>
</div>
<div class="paragraph">
<p>Si cette copie est trop longue vous pouvez diminuez la taille minimale de la jeune génération avec le paramètre <code>-XX:G1NewSizePercent</code>.
Vous aurez normalement des pauses potentiellement plus courtes.</p>
</div>
<div class="paragraph">
<p>Si les performances de l&#8217;application, et en particulier la quantité d&#8217;objets survivant à une collecte, changent soudainement, vous pouvez avoir des pics dans les temps de pause du GC. Il peut être utile de réduire la taille maximale de la jeune génération en utilisant <code>-XX:G1MaxNewSizePercent</code> afin de limiter le nombre d&#8217;objets à traiter pendant une pause.</p>
</div>
</div>
<div class="sect3">
<h4 id="_problème_sur_les_collectes_mixtes">Problème sur les collectes mixtes</h4>
<div class="paragraph">
<p>Les collectes mixtes sont faites durant la phase 2 du G1 quand les anciennes et les jeunes générations sont traitées en parallèle.
Elles permettent au final de récupérer de l&#8217;espace dans l&#8217;ancienne génération.</p>
</div>
<div class="paragraph">
<p>Vous pouvez obtenir des informations sur les temps d&#8217;évacuation des zones (jeunes ou vieilles) en activant le mode verbose lors de la configuration des logs.
Nous avons vu dans le chapitre précédent comment améliorer les choses pour les jeunes générations.
Pour réduire la contribution des zones de l&#8217;ancienne génération au temps de pause, G1 propose trois options:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>augmenter <code>-XX:G1MixedGCCountTarget</code> (nombre de collectes mixtes lancées après un cycle de marquage) pour répartir la récupération des régions de l&#8217;ancienne génération sur plus de collectes.</p>
</li>
<li>
<p>jouer sur <code>-XX:G1MixedGCLiveThresholdPercent</code> (limite supérieure sur le nombre d&#8217;anciennes régions à collecter pendant une collecte mixte).
Dans de nombreux cas, les régions très occupées prennent beaucoup de temps à nettoyer.</p>
</li>
<li>
<p>arrêter plus tôt la récupération de l&#8217;espace sur les anciennes générations en augmentant <code>-XX:G1HeapWastePercent</code> pour que G1 récupère moins de régions surchargées.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Ces deux dernièrs paramètres vont diminuer la quantité de régions candidates aux collectes.
Il ne faut pas aller trop loin pour que G1 puisse être en mesure de récupérer suffisamment d&#8217;espace dans l&#8217;ancienne génération.</p>
</div>
</div>
<div class="sect3">
<h4 id="_référence_interrégionale">Référence interrégionale</h4>
<div class="paragraph">
<p>Une référence interrégionale est une référence entre 2 objets qui sont dans 2 régions différentes.
Chaque région possède un sous ensemble de ces références (on parle de remembered set RS) qui sera mis à jour lors du déplacement du contenu vers une autre région.
Cette mise à jour se fait en simultané.</p>
</div>
<div class="paragraph">
<p>Pour des raisons de performance, G1 ne met met pas immédiatement à jour l&#8217;ensemble mémorisé d&#8217;une région lorsque l&#8217;application crée une nouvelle référence interrégionale entre deux objets.
Ces demandes de mise à jour sont retardées et regroupées pour plus d&#8217;efficacité.</p>
</div>
<div class="paragraph">
<p>L&#8217;ajustement de la taille des régions à l&#8217;aide de l&#8217;option <code>-XX:G1HeapRegionSize</code> affecte le nombre de références interrégionales ainsi que la taille de l&#8217;ensemble mémorisé.
La gestion des ensembles mémorisés pour les régions peut être une partie importante du travail du GC, ce qui a donc un effet direct sur le temps de pause maximal réalisable.
Les grandes régions ont tendance à avoir moins de références interrégionales, ce qui limite le temps consacré à leur traitement, même si en même temps, des régions plus grandes peuvent signifier plus d&#8217;objets vivants à évacuer, augmentant le temps pour les autres phases.</p>
</div>
<div class="paragraph">
<p>G1 essaie de planifier le traitement simultané des mises à jour de l&#8217;ensemble mémorisé afin que la phase de mise à jour RS respecte le pourcentage <code>-XX:G1RSetUpdatingPauseTimePercent</code> du temps de pause maximal autorisé.
En diminuant cette valeur, G1 effectuera plus de mises à jour de l&#8217;ensemble mémorisé en simultané.</p>
</div>
<div class="paragraph">
<p>Des temps de mise à jour de l&#8217;ensemble mémorisé élevés peuvent être causés par une optimisation qui tente de réduire le travail de mise à jour simultanée des ensembles mémorisés en les regroupant.
Si trop de mise à jour sont reportées et qu&#8217;une collecte se produit, cette phase va être allourdie car on a besoin de connaître ces références.
Utilisez <code>-XX:-ReduceInitialCardMarks</code> pour désactiver ce comportement.</p>
</div>
<div class="paragraph">
<p>G1 essaie de compresser les références mémorisées pour maintenir une taille de stockage faible.
Plus l&#8217;ensemble mémorisé est compacté en mémoire, plus il faut de temps pour récupérer les valeurs stockées.
Activez l&#8217;option <code>-XX:G1SummarizeRSetStatsPeriod</code> en combinaison avec <code>gc+remset=trace</code> au niveau des logs pour voir si vous avez ce problème.
Vous devez avoir une section <code>Before GC Summary</code> avec une ligne <code>Did &lt;X&gt; coarsenings</code>.
Si la valeur de X est élevée, vous pouvez être dans ce cas.
Augmenter significativement <code>-XX:G1RSetRegionEntries</code> peut diminuer ce phénomène.
Une fois résolu, revenez à un niveau de log normal, car la collecte de ces données peut prendre un temps considérable.</p>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_z_garbage_collector">Z Garbage Collector</h2>
<div class="sectionbody">
<div class="paragraph">
<p><a href="https://wiki.openjdk.java.net/display/zgc">Garbage Collector Z (ZGC)</a> est un garbage collector évolutif à faible latence.
Il est le successeur programmé de G1 (JDK15).
ZGC effectue tous les travaux coûteux en simultané, en limitant au maximum les pauses (arrêt exécution des threads d&#8217;application)</p>
</div>
<div class="paragraph">
<p>Pour l&#8217;activer vous devez utiliser les paramètres <code>-XX:+UseZGC -XX:+UnlockExperimentalVMOptions</code></p>
</div>
<div class="paragraph">
<p>Les principaux objectifs de ZGC sont:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>ne pas avoir de temps de pause du GC supérieur à 10 ms.</p>
</li>
<li>
<p>être capable de gérer une <code>heap</code> allant de quelques kilooctets à une mémoire de plusieurs téraoctets sans augmenter les temps de pause</p>
</li>
<li>
<p>les petits temps de pause sont limités à l&#8217;analyse des données racines (voir description plus loin)</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>ZGC exécute les les tâches suivantes simultanément</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Marquage</p>
</li>
<li>
<p>Traitement des références</p>
</li>
<li>
<p>Sélection du jeu de relocalisation</p>
</li>
<li>
<p>Relocalisation / Compactage</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Deux nouveaux concepts les pointeurs colorés (<code>colored pointers</code>) et les barrières de charge (<code>load barriers</code>) sont introduits pour pouvoir exécuter ces tâches en parallèle de l&#8217;application.
La tâche n&#8217;est pas simple.
Le GC doit copier des objets vers d&#8217;autres emplacements mémoire en même temps qu&#8217;un autre thread pourrait lire ou écrire dans l&#8217;ancien objet.
Si la copie réussit, il peut avoir encore de nombreuses références arbitraires quelque part dans la <code>heap</code> vers l&#8217;ancienne adresse d&#8217;objet qui doivent être mises à jour vers la nouvelle adresse.</p>
</div>
<div class="sect2">
<h3 id="_découpage_de_la_mémoire">Découpage de la mémoire</h3>
<div class="paragraph">
<p>G1 sépare la <code>heap</code> en différentes régions de taille égale (Eden, Survivor, Old).
Un objet ne s&#8217;étend généralement pas sur plusieurs régions, à l&#8217;exception des grands objets qui ne rentrent pas dans une seule région.</p>
</div>
<div class="paragraph">
<p>ZGC reprend ce principe mais les régions sont appelées des pages.
Elles ne se basent pas sur des hypothèses générationnelles mais sur la taille des objets.
Les pages peuvent avoir des tailles différentes (mais toujours un multiple de 2 Mo) :</p>
</div>
<div class="ulist">
<ul>
<li>
<p>petite (taille 2 Mo) qui contient les petits objets (jusqu&#8217;à 256 Ko)</p>
</li>
<li>
<p>moyenne (taille 32 Mo) qui contient les objets allant jusqu&#8217;à 4 Mo</p>
</li>
<li>
<p>grande (taille &gt; 4Mo, multiple de 2 Mo) qui contient les objets de plus de 4 Mo.
Une grande page ne peut stocker qu&#8217;un seul objet, contrairement aux autres (une grande page peut au final être plus petite qu&#8217;une page moyenne).</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2021/jvm_memory_zgc_collector.png" alt="Découpage mémoire ZGC">
</div>
</div>
<div class="paragraph">
<p>Quand ZGC essaie de recycler une page, il va recopier les objets toujours en vie dans une nouvelle page.
Ce mécanisme évite d&#8217;avoir une trop grosse fragmentation de la mémoire.</p>
</div>
</div>
<div class="sect2">
<h3 id="_coloration_de_référence_colored_pointer">Coloration de référence (colored pointer)</h3>
<div class="paragraph">
<p>ZGC a une phase appelée marquage, où le principe est toujours le même, identifier les objets qui ne sont plus utilisés (les objets n&#8217;ayant plus de référence).</p>
</div>
<div class="paragraph">
<p>G1 stocke ces références dans chaque zone dans un ensemble appelé remembered set (RS).
Mais le maintien des données à jour dans cet ensemble est très coûteux en temps et nécessite souvent des pauses.</p>
</div>
<div class="paragraph">
<p>ZGC utilise une approche différente en stockant l&#8217;état dans un bit de référence : on parle de coloration de référence (<code>colored pointer</code>).
Une partie de la mémoire utilisée pour stocker l&#8217;objet est utilisée pour stocker l&#8217;état.
Voici un bloc mémoire de 64 bits (ZGC n&#8217;est pas utilisable sur des architectures 32 bits).
Le matériel actuel limite une référence à 48 bits pour les <a href="https://en.wikipedia.org/wiki/X86-64#Virtual_address_space_details">adresses de mémoire virtuelle</a>.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2021/jvm_memory_zgc_colored-pointers.png" alt="colored pointer ZGC">
</div>
<div class="title">Figure 1. <a href="http://hg.openjdk.java.net/zgc/zgc/file/59c07aef65ac/src/hotspot/os_cpu/linux_x86/zGlobals_linux_x86.hpp#l59">source</a></div>
</div>
<div class="paragraph">
<p>ZGC réserve les 42 premiers bits pour l&#8217;adresse réelle de l&#8217;objet.
Les bits restants sont utilisés pour spécifier des metadata :</p>
</div>
<div class="ulist">
<ul>
<li>
<p>0001 = <code>Marked0</code>  (utilisé pour marquer les objets accessibles)</p>
</li>
<li>
<p>0010 = <code>Marked1</code>  (utilisé pour marquer les objets accessibles)</p>
</li>
<li>
<p>0100 = <code>Remapped</code>  (la référence est à jour et pointe vers l&#8217;emplacement actuel de l&#8217;objet)</p>
</li>
<li>
<p>1000 = <code>Finalizable</code> (objet est uniquement accessible via un finaliseur)</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_barrières_gc_gc_barrier">Barrières GC (GC barrier)</h3>
<div class="paragraph">
<p>Quand on fait de la programmation parallèle, une <a href="https://en.wikipedia.org/wiki/Barrier_(computer_science)">barrière</a> signifie que tout thread ou processus doit s&#8217;arrêter à ce stade et ne peut pas continuer tant que tous les autres threads ou processus n&#8217;ont pas atteint cette barrière (c&#8217;est un type de méthode de synchronisation).</p>
</div>
<div class="paragraph">
<p>Une <a href="https://en.wikipedia.org/wiki/Memory_barrier">barrière de mémoire</a> est un type d&#8217;instruction qui oblige un CPU ou un compilateur à appliquer une contrainte sur les opérations de mémoire émises avant et après l&#8217;instruction de barrière (lecture ou écriture).</p>
</div>
<div class="paragraph">
<p>Cela signifie généralement que les opérations émises avant la barrière sont garanties d&#8217;être exécutées avant les opérations émises après la barrière.</p>
</div>
<div class="paragraph">
<p>ZGC s&#8217;appuie sur les barrières de lecture (<code>load barrier</code>) pour la lecture d&#8217;une référence dans la <code>heap</code>.
En gros quand l&#8217;application a besoin d&#8217;accéder à un objet (chargement d&#8217;une référence), elle déclenche une barrière de lecture, qui suit les étapes suivantes pour renvoyer la référence correcte:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Vérifie si le bit de référence a la valeur <code>Remapped</code>.
Si tel est le cas, cela signifie que la référence est à jour, nous pouvons donc la renvoyer en toute sécurité.</p>
</li>
<li>
<p>Si on est dans la phase de déplacement des objets (<code>relocation</code>), l&#8217;ensemble contenant les données à déplacer est analysé.
Si l&#8217;objet n&#8217;est pas concerné le bit de référence prend la valeur <code>Remapped</code> (pour ne pas refaire ce contrôle) et la référence est renvoyée</p>
</li>
<li>
<p>Nous savons ici que l&#8217;objet auquel nous voulons accéder a été la cible d&#8217;un déplacement.
La seule question est de savoir si ce dernier est effectué ou non ?
Si l&#8217;objet n&#8217;a pas été déplacé, la barrière de lecture va le déplacer et mettre à jour une table de transfert pour stocker la nouvelle adresse de l&#8217;objet déplacé.
Après cela, nous passons à l&#8217;étape suivante.</p>
</li>
<li>
<p>Nous savons maintenant que l&#8217;objet a été déplacé.
Nous mettons à jour cette référence au nouvel emplacement de l&#8217;objet en fonction de la valeur dans la table de transfert, le bit de référence prend la valeur <code>Remapped</code> et la référence est retournée</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Avec ce mécanisme, nous sommes assurés que chaque fois que nous essayons d&#8217;accéder à un objet, nous obtenons la référence la plus récente.
L&#8217;opération peut diminuer les performances lorsqu&#8217;on essaie d&#8217;accéder la première fois à un objet déplacé.
Mais c&#8217;est le prix à payer pour pouvoir réaliser les opérations de déplacement sans stopper l&#8217;exécution de l&#8217;application.</p>
</div>
</div>
<div class="sect2">
<h3 id="_cycle_de_vie">Cycle de vie</h3>
<div class="paragraph">
<p>Un cycle GC est découpé en 2 phases majeures : le marquage et la relocalisation (déplacement des objets encore en vie).
Ces phases sont en fait elle même découpées en plusieurs étapes décrites dans les <a href="http://hg.openjdk.java.net/zgc/zgc/file/59c07aef65ac/src/hotspot/share/gc/z/zDriver.cpp#l301">sources du ZGC</a>.
Même si la majorité des étapes sont faites en parallèle de l&#8217;application, 3 étapes nécessitent encore des pauses</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2021/jvm_memory_zgc_clifecycle.png" alt="ZGC lifecycle">
</div>
</div>
<div class="paragraph">
<p>Un cycle GC commence par la phase de marquage, qui marque tous les objets accessibles.
À la fin de cette phase, nous savons quels objets sont encore vivants et lesquels sont des déchets.
ZGC stocke ces informations si l&#8217;objet à l&#8217;index donné est fortement accessible et / ou final (pour les objets avec une méthode finalize), dans un ensemble propre à chaque page.</p>
</div>
<div class="paragraph">
<p>Pendant la phase de marquage, la barrière de lecture dans les threads d&#8217;application pousse les références non marquées dans un buffer local au thread.
Dès que ce buffer est plein, les threads GC se l&#8217;approprient et parcourent de manière récursive tous les objets accessibles.
Le marquage dans un thread d&#8217;application pousse simplement la référence dans un buffer, les threads GC sont responsables de parcourir le graphe des objets et de mettre à jour les informations.</p>
</div>
<div class="paragraph">
<p>Une fois le marquage fini, ZGC détermine quelles pages vont être évacuées en fonction de certains critères (comme par exemple, les pages contenant le plus de déchets).
Ces pages définissent l&#8217;ensemble de relocalisation.
Un objet est déplacé par un thread GC ou un thread d&#8217;application (voir le chapitre précédent).
ZGC crée une table de transfert pour chaque page concernée par une relocalisation.
Cette table contient la nouvelle adresse de chaque objet déplacé.</p>
</div>
<div class="paragraph">
<p>Les threads GC parcourent parcourent les objets de l&#8217;ensemble de relocalisation et déplacent tous les objets qui n&#8217;ont pas encore été déplacés.
Si un thread d&#8217;application et un thread GC essaient de déplacer le même objet en même temps, le premier thread à déplacer l&#8217;objet l&#8217;emporte.</p>
</div>
<div class="paragraph">
<p>Il existe 2 bits de marquage (Marked0 et Marked1).
Après la phase de relocalisation, il se peut qu&#8217;il y ait encore des références dans l&#8217;ensemble de relocalisation qui n&#8217;ont pas été remappées et qui ont donc toujours le bit du dernier cycle de marquage défini.
Chaque cycle alterne entre ces 2 bits.
Si la nouvelle phase de marquage utilise le même bit de marquage, la barrière de lecture détecte cette référence comme déjà marquée</p>
</div>
</div>
<div class="sect2">
<h3 id="_principales_options_2">Principales options</h3>
<div class="paragraph">
<p>Voici les options principales</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>-XX:ConcGCThreads=&lt;number&gt;</code> définit la quantité de temps processeur à affecter aux threads ZGC. Ce paramètre permet de contrôler la fréquence à laquelle le GC va rentrer en action.
Une valeur plus élevée laissera moins de temps CPU pour votre application.
Une valeur trop basse peut être problématique car votre application peut générer plus de déchets que ce qui est collecté par ZGC.</p>
</li>
<li>
<p><code>-XX:+UseLargePages</code> active la gestion de grandes pages</p>
</li>
<li>
<p><code>-XX:+UseNUMA</code> est capable d&#8217;utiliser NUMA (Non-uniform memory access) un moyen de configurer un cluster de microprocesseurs afin que la mémoire puisse être partagée localement et que les performances puissent être améliorées et la capacité du système étendue.</p>
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
<h2 id="_epsilon_garbage_collector">Epsilon Garbage Collector</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Ce chapitre va être très rapide car l&#8217;idée de <a href="https://openjdk.java.net/jeps/318">Epsilon Garbage Collector</a> est de proposé un GC qui gère l&#8217;allocation de mémoire mais n&#8217;implémente aucun mécanisme de récupération de mémoire.
Une fois que la <code>heap</code> est pleine et n&#8217;a plus de place, la JVM s&#8217;arrête avec un <code>OutOfMemoryError</code>.</p>
</div>
<div class="paragraph">
<p>Ce GC a été mis à disposition pour avoir un débit applicatif optimal sur une période limitée.
Il est destiné à différents tests mais également aux applications qui sont utilisées très peu de temps.
Nous pouvons prendre l&#8217;exemple de <a href="https://www.jbang.dev/">jbang</a> la solution pour écrire simplement vos scripts en Java plutôt qu&#8217;en shell.
Un script est amené a être exécuté qu&#8217;une seule fois et la récupération de la mémoire peut ne pas être importante</p>
</div>
<div class="paragraph">
<p>Pour l&#8217;activer vous devez utiliser les paramètres <code>-XX:+UseEpsilonGC -XX:+UnlockExperimentalVMOptions</code></p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_shenandoah_garbage_collector">Shenandoah Garbage Collector</h2>
<div class="sectionbody">
<div class="paragraph">
<p>En introduction, j&#8217;ai précisé que je ne m&#8217;attardais que sur la version LTS de Java, la version 11. Mais comme la prochaine version LTS n&#8217;est plus très loin, je vais tout de même abordé le GC <a href="https://wiki.openjdk.java.net/display/shenandoah">Shenandoah</a>.
La particularité de ce dernier est de ne pas avoir été poussé par Oracle mais par RedHat.
Au final Shenandoah est un projet OpenJDK qui est devenu une partie de la distribution OpenJDK 12 et comme RedHat est beaucoup impliqué dans la maintenance des versions LTS, il a été rétroporté <a href="https://wiki.openjdk.java.net/display/shenandoah/Main#Main-JDKSupport">vers JDK 8 et 11</a>.</p>
</div>
<div class="paragraph">
<p>Il été conçu</p>
</div>
<div class="ulist">
<ul>
<li>
<p>en reprenant le concept des régions introduites avec le G1 (sans reprendre les générations),</p>
</li>
<li>
<p>utilise comme G1 un marquage en mode concurrent,</p>
</li>
<li>
<p>mais contrairement à G1, Shenandoah relocalise (déplacement + compactage) les données en mode concurrent afin de pouvoir traiter plus de zones.
Pour respecter des temps de pause correct, G1 recycle une sous sélection des zones en essayant de traiter celles qui permettent de libérer le plus de mémoire.
Shenandoah n&#8217;a pas cette limite.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Le concept des <a href="java-memoire.html#_barrières_gc_gc_barrier">barrières de lecture</a>, et des <a href="java-memoire.html#_coloration_de_référence_colored_pointer">réferences colorées</a> introduites dans le chapitre ZGC ont été repris dans Shenandoah depuis les mises à jour <a href="https://developers.redhat.com/blog/2019/06/27/shenandoah-gc-in-jdk-13-part-1-load-reference-barriers/">JDK13</a> et <a href="https://developers.redhat.com/blog/2020/03/04/shenandoah-gc-in-jdk-14-part-1-self-fixing-barriers/">JDK14</a>.</p>
</div>
<div class="paragraph">
<p>Pour l&#8217;activer vous devez utiliser les paramètres <code>-XX:+UseShenandoahGC -XX:+UnlockExperimentalVMOptions</code></p>
</div>
<div class="sect2">
<h3 id="_fonctionnement_3">Fonctionnement</h3>
<div class="paragraph">
<p>Shenandoah découpe la heap en différentes régions de même taille mais ne reprend pas les générations (jeune ou vieille).</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2021/jvm_memory_shenandoah_collector.png" alt="Shenandoah region">
</div>
</div>
<div class="paragraph">
<p>La plupart des phases sont non bloquantes mais il reste des étapes qui nécessite d&#8217;arrêter l&#8217;application</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2021/jvm_memory_shenandoah_clifecycle.png" alt="Shenandoah life cycle">
</div>
</div>
<div class="ulist">
<ul>
<li>
<p><code>Init Mark</code> prépare la <code>heap</code> et les threads d&#8217;application pour le marquage, puis analyse l&#8217;ensemble des données racines.
Cette analyse des objets de base du graphe des objets de l&#8217;application a besoin de se faire en mode stop-the-world.
L&#8217;ensemble des données racines comprend: les variables locales, les références intégrées dans le code généré, les chaînes de caractères, les références issues du class loader, les références finales statiques, les références JNI, les références JVMTI&#8230;&#8203;</p>
</li>
<li>
<p><code>Mark</code> Le marquage parcourt la <code>heap</code> et identifie les objets vivants.
Cette phase se déroule parallèlement à l&#8217;application et sa durée dépend du nombre d&#8217;objets vivants et de la structure du graphe d&#8217;objets.
Puisque l&#8217;application est libre d&#8217;allouer de nouvelles données pendant cette phase, l&#8217;occupation de la <code>heap</code> augmente pendant le marquage simultané.</p>
</li>
<li>
<p><code>Final Mark</code> termine le marquage en vidant toutes les files d&#8217;attente de marquage et en réanalysant l&#8217;ensemble des données racine.
C&#8217;est aussi dans cette phase que les régions à évacuer (ensemble de collecte) sont déterminées.
Shenandoah sélectionne toutes les régions les plus fructueuses, c&#8217;est-à-dire les régions qui ont très peu d&#8217;objets vivants ou, au contraire, beaucoup d&#8217;espace mort.</p>
</li>
<li>
<p><code>Concurrent Cleanup</code> récupère les régions où plus aucun objet actif n&#8217;est présent</p>
</li>
<li>
<p><code>Concurrent Evacuation</code> copie les objets de l&#8217;ensemble de collecte vers d&#8217;autres régions sans interrompre l&#8217;application qui est donc libre d&#8217;allouer.
Les objets sont alloués avec un espace réservé pour un pointeur d&#8217;indirection.
Lorsque les threads Java accèdent à l&#8217;objet, ils lisent d&#8217;abord le pointeur d&#8217;indirection pour voir si l&#8217;objet s&#8217;est déplacé.
Lorsque le garbage collector déplace un objet, il met à jour le pointeur d&#8217;indirection pour qu&#8217;il pointe vers le nouvel emplacement.
Les nouveaux objets sont alloués avec un pointeur d&#8217;indirection qui pointe vers eux-mêmes.
Ce pointeur d&#8217;indirection n&#8217;est pas gratuit.
La lecture du pointeur et la recherche de l&#8217;emplacement actuel de l&#8217;objet ont un coût en temps et en espace.</p>
</li>
<li>
<p><code>Init Update Refs</code> initialise la phase de mise à jour des références en s&#8217;assurant que tous les threads du GC et les threads de l&#8217;application ont terminé l&#8217;évacuation.
Cette étape de synchronisation se fait en mode stop-the-world mais cette phase est très courte.</p>
</li>
<li>
<p><code>Update Refs</code> le GC parcourt la <code>heap</code> et met à jour les références des objets qui ont été déplacés.</p>
</li>
<li>
<p><code>Finalize Update Refs</code> remet à jour les données racines.
Il recycle également les régions de l&#8217;ensemble de collecte, car la <code>heap</code> ne contient désormais plus de références aux objets plus utilisés.
Il s&#8217;agit de la dernière pause du cycle et sa durée dépend de la taille des données racines.</p>
</li>
<li>
<p><code>Cleanup</code> récupère les régions de l&#8217;ensemble de collecte, qui n&#8217;ont maintenant plus de référence.</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_principales_options_3">Principales options</h3>
<div class="paragraph">
<p>Les principales options JVM recommandées sont:</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>-XX:+AlwaysPreTouch</code> : active la mise en mémoire des pages dans la <code>heap</code> permet de réduire la latence</p>
</li>
<li>
<p><code>-Xms</code> et <code>-Xmx</code>: rendre la <code>heap</code> non redimensionnable avec <code>-Xms=-Xmx</code> réduit les temps lié au redimensionnement.</p>
</li>
<li>
<p><code>-XX:+UseLargePages</code> l&#8217;utilisation de grandes pages améliore considérablement les performances sur les grandes <code>heap</code>. <code>-XX:+UseTransparentHugePages</code> l&#8217;active de manière transparente.</p>
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
<p>Les GC sont de plus en plus performants mais aussi de plus en plus complexes.
Si vous avez des problèmes de performance vous devez</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Activer les logs du GC</p>
</li>
<li>
<p>Mesurer et identifier ce qui bloque</p>
</li>
<li>
<p>Expérimenter les paramétrages du GC sélectionné par la JVM. Si ce dernier n&#8217;est pas satisfaisant vous pouvez en utiliser un autre</p>
</li>
<li>
<p>Gardez à l&#8217;esprit que la JVM s&#8217;adapte au runtime à votre application.
Si vous fixez des paramètres vous pouvez empêcher cette adaptation car la JVM essaiera de remplir le contrat que vous lui avez spécifier</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>Très souvent quand une application a des problèmes de performance, on incrimine très (trop) vite la base de données, le GC&#8230;&#8203; alors que le problème est dans le code de l&#8217;application.</p>
</div>
<div class="paragraph">
<p>Je n&#8217;ai pas non plus été exhaustif sur tous les paramètres disponibles pour chaque GC. Consultez la documentation liée à la JVM que vous utilisez.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_références">Références</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Voici un résumé des liens que j&#8217;ai utilisés dans les différents chapitre et qui m&#8217;on servi de références pour écrire cet article</p>
</div>
<div class="ulist">
<ul>
<li>
<p><a href="https://en.wikipedia.org/wiki/Java_version_history">Les différentes versions de Java</a></p>
</li>
<li>
<p><a href="https://medium.com/@hasithalgamge/seven-types-of-java-garbage-collectors-6297a1418e82">Les différents GC</a> article écrit sur medium</p>
</li>
<li>
<p><a href="https://docs.oracle.com/en/java/javase/11/gctuning/available-collectors.html">Doc Oracle sur Serial Collector</a></p>
</li>
<li>
<p><a href="https://docs.oracle.com/en/java/javase/11/gctuning/parallel-collector1.htm">Doc Oracle sur Parallel Collector</a></p>
</li>
<li>
<p><a href="https://docs.oracle.com/en/java/javase/11/gctuning/concurrent-mark-sweep-cms-collector.html">Doc Oracle sur CMS</a></p>
</li>
<li>
<p><a href="https://docs.oracle.com/en/java/javase/11/gctuning/garbage-first-garbage-collector.html">Doc Oracle sur G1</a></p>
</li>
<li>
<p><a href="https://www.oracle.com/technetwork/java/javase/tech/memorymanagement-whitepaper-1-150020.pdf">Memory whitepaper</a> un vieux document Oracle qui parle des ergonomics (chap13)</p>
</li>
<li>
<p><a href="https://openjdk.java.net/jeps/333">JEP introduisant Z garbage collector</a></p>
</li>
<li>
<p><a href="https://wiki.openjdk.java.net/display/zgc">Garbage Collector Z (ZGC)</a> : wiki Open JDK</p>
</li>
<li>
<p><a href="https://openjdk.java.net/jeps/318">JEP introduisant Epsilon garbage collector</a></p>
</li>
<li>
<p><a href="https://openjdk.java.net/jeps/189">JEP introduisant Shenandoah garbage collector</a></p>
</li>
<li>
<p><a href="https://wiki.openjdk.java.net/display/shenandoah">Garbage Collector Shenandoah</a> : wiki Open JDK</p>
</li>
<li>
<p><a href="https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html">Transparent Hugepage Support</a></p>
</li>
<li>
<p><a href="https://en.wikipedia.org/wiki/X86-64#Virtual_address_space_details">Virtual address space details</a></p>
</li>
<li>
<p><a href="http://hg.openjdk.java.net/zgc/zgc/file/59c07aef65ac/src/hotspot/os_cpu/linux_x86/zGlobals_linux_x86.hpp#l59">Colored pointer</a> : fichier en AsciiArt dispo sur OpenJDK (ZGC)</p>
</li>
<li>
<p><a href="http://hg.openjdk.java.net/zgc/zgc/file/59c07aef65ac/src/hotspot/share/gc/z/zDriver.cpp#l301">Code source ZGC</a> décrit les phases de ZGC</p>
</li>
<li>
<p>Les <a href="https://en.wikipedia.org/wiki/Barrier_(computer_science)">barrières</a> et <a href="https://en.wikipedia.org/wiki/Memory_barrier">Barrière de mémoire</a> utilisées dans ZGC et Shenandoah</p>
</li>
<li>
<p><a href="https://developers.redhat.com/blog/2019/06/27/shenandoah-gc-in-jdk-13-part-1-load-reference-barriers/">Blog Redhat</a> amélioration shenandoah dans JDK13</p>
</li>
<li>
<p><a href="https://developers.redhat.com/blog/2020/03/04/shenandoah-gc-in-jdk-14-part-1-self-fixing-barriers/">Blog Redhat</a> amélioration shenandoah dans JDK14</p>
</li>
</ul>
</div>
</div>
</div>`;