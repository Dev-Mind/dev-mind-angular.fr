export const _installer_xps_ubuntu:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Un bon artisan doit avoir les bons outils. En tant que développeur j&#8217;ai décidé de changer mon portable pour avoir un peu plus de mémoires et de CPU. Mon choix c&#8217;est porté sur un XPS15. Voici ce que j&#8217;ai du faire pour le mettre sous Ubuntu</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_quelle_machine_choisir">Quelle machine choisir ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>J&#8217;utilisais au quotidien un XPS 15 depuis plus de 3 ans. Je me suis donc logiquement porté sur la même gamme.</p>
</div>
<div class="paragraph">
<p>Mon premier choix portait sur un Core i9. Ce choix n&#8217;a pas été très opportun car ces toutes dernières machines ne sont pas capable de supporter des processeurs aussi rapide. Quand vous utilisez votre portable 10h par jour en lançant beaucoup de compilations, le CPU a tendance à être utilisé&#8230;&#8203; au final au bout de 2 jours d&#8217;utilisation le portable se mettait en sécurité car le CPU chauffait&#8230;&#8203; 2 jours plus tard l&#8217;alimentation a grillé&#8230;&#8203; et donc retour à l&#8217;envoyeur.</p>
</div>
<div class="paragraph">
<p>Pour ma deuxième tentative je me suis rabattu sur XPS15 core i7. La machine se comporte beaucoup mieux malgré quelques problèmes avec le Wifi qui devraient être résolus rapidement.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/ubuntun00.png" alt="Installer Ubuntu sous XPS15">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_quel_os_choisir">Quel OS choisir ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>En tant que développeur, je trouve que l&#8217;OS le plus intéressant est Linux. Malheureusement Dell ne livre pas de PC de cette gamme sous Linux. Comme la gamme XPS 13 comporte une machine sur Ubuntu, j&#8217;ai choisi d&#8217;utiliser la même édition afin de bénéficier des drivers pour les composants communs aux XPS13 et XPS15.</p>
</div>
<div class="paragraph">
<p>Vous pouvez écraser le disque et n&#8217;installer qu&#8217;un Ubuntu. Mais si vous avez un problème matériel, le support Dell ne maîtrise que les outils installés sous Windows. J&#8217;ai fait le choix de faire cohabiter les deux systèmes</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_comment_installer_ubuntu">Comment installer Ubuntu ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Je ne vais pas vous décrire la procédure ici car vous trouverez de nombreux forum vous expliquant comment installer <a href="http://releases.ubuntu.com/18.04/">Ubuntu 18.04</a> sur votre laptop. Je vais plutôt revenir sur les commandes "non standards" que j&#8217;ai du faire pour installer Ubuntu à côté de Windows.</p>
</div>
<div class="paragraph">
<p>En effet les postes sont packagés pour Windows et le mode Secure Boot est activé pour bloquer tout élément étranger au système (comme un autre système d’exploitation). Autre problème, votre système est configuré pour protéger votre disque et le disque dur n&#8217;est pas visible par défaut quand vous lancez un live CD pour l&#8217;installation à partir d&#8217;une clé ou d&#8217;un disque externe.</p>
</div>
<div class="paragraph">
<p>Si vous ête dans le même cas que moi, voici la procédure à suivre</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_préparer_windows_à_accepter_un_petit_nouveau">Préparer Windows à accepter un petit nouveau ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Pour pouvoir installer Ubuntu sur le disque système, il faut lui faire de la place! Pour le moment, 100% de l’espace disque est occupé par Windows et ses partitions : une partition EFI, une partition MSR, une partition Système et une partition Windows. Ce qu’on va faire, c’est réduire la taille de la partition Windows afin qu’Ubuntu puisse s’installer dans l’espace libre désormais disponible.</p>
</div>
<div class="paragraph">
<p>Vous devez pour celà</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>lancer le gestionnaire de disque Windows,</p>
</li>
<li>
<p>sélectionner le disque C, réduire l&#8217;espace</p>
</li>
</ol>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/ubuntun02.png" alt="Changer taille partition C:">
</div>
</div>
<div class="paragraph">
<p>Normalement après cette opération vous avez la taille nécéssaire à l&#8217;installation de Ubuntu</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/ubuntun01.png" alt="Changer taille partition C:">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_modifier_les_options_de_démarrage">Modifier les options de démarrage</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Ubuntu ne sait pas encore accéder aux disques en technologie <a href="https://fr.wikipedia.org/wiki/RAID_%28informatique%29">RAID</a> souvent utilisés par windows. Il faut donc casser ce mode d&#8217;accès. Démarrez sous Windows et ouvrez une console PowerShell en mode admin (clic droit sur l&#8217;icône windows en bas à gauche)</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/ubuntun03.png" alt="Ouvrir console PowerShell">
</div>
</div>
<div class="paragraph">
<p>Vous devez lancer la commande suivante</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714077.3982">bcdedit /set &quot;&quot;{current}&quot; safeboot minimal</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714077.3982')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Il faut ensuite rebooter et aller dans les options dans le bios de votre machine (F2) et choisir option AHCI</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/ubuntun04.png" alt="BIOS désactiver RAID">
</div>
</div>
<div class="paragraph">
<p>Vous pouvez aussi en profiter pour désactiver le SecureBoot</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/ubuntun05.png" alt="BIOS désactiver SecureBoot">
</div>
</div>
<div class="paragraph">
<p>Booter ensuite sous Windows et lancez dans une console PowerShell en mode admin la commande</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714077.7227">bcdedit /deletevalue &quot;{current}&quot; safeboot</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714077.7227')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez redémarrer votre machine pour vérifier que tout est opérationnel.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_installer_ubuntu">Installer Ubuntu</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Vous pouvez maintenant installer Ubuntu via ue clé USB. Pour pouvoir la lancer n&#8217;oubliez pas de changer le boot sequence. Dans mon cas j&#8217;ai passé mon disque USB Toshiba en premier</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/ubuntun06.png" alt="Changer boot sequence">
</div>
</div>
<div class="paragraph">
<p>Vous n&#8217;avez plus qu&#8217;à suivre les instructions de Ubuntu pour installer votre systême</p>
</div>
</div>
</div>`;