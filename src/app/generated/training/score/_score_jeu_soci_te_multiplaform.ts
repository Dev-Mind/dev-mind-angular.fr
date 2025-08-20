export const _score_jeu_soci_te_multiplaform:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_gérer_les_joueurseuses">Gérer les joueurs·euses</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_ajout_des_joueurseuses">Ajout des joueurs·euses</a></li>
<li><a class="link" fragment="#_contrainte_dunicité">Contrainte d&#8217;unicité</a></li>
<li><a class="link" fragment="#_suppression_des_joueurseuses">Suppression des joueurs·euses</a></li>
</ul>
</li>
<li><a class="link" fragment="#_commencer_une_partie_les_jeux_pré_enregistrés">Commencer une partie : Les jeux pré-enregistrés</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_les_jeux_disponibles">Les jeux disponibles :</a></li>
<li><a class="link" fragment="#_et_si_mon_jeu_nest_pas_dans_la_liste">Et si mon jeu n&#8217;est pas dans la liste ?</a></li>
</ul>
</li>
<li><a class="link" fragment="#_paramètres_de_la_partie">Paramètres de la partie</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_nom_de_la_partie">Nom de la partie</a></li>
<li><a class="link" fragment="#_le_calcul_du_ou_de_la_vainqueur">Le calcul du ou de la vainqueur</a></li>
<li><a class="link" fragment="#_limiter_le_score">Limiter le score</a></li>
<li><a class="link" fragment="#_le_nombre_de_manches">Le nombre de manches</a></li>
<li><a class="link" fragment="#_équilibrer_les_points">Équilibrer les points</a></li>
</ul>
</li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>J&#8217;ai créé cette application pour tenir les scores quand je joue à des jeux de société en famille ou entre ami·e·s.  L&#8217;application est disponible sur Android et iOS (merci Kotlin). Elle est conçue pour être simple et rapide à utiliser, tout en offrant des fonctionnalités avancées pour les passionné·e·s de jeux sans vous polluer de pub ni échanger vos données.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_gérer_les_joueurseuses">Gérer les joueurs·euses</h2>
<div class="sectionbody">
<div class="paragraph">
<p>L&#8217;application vous permet de gérer les participant·e·s de vos parties de manière simple et rapide.</p>
</div>
<div class="sect2">
<h3 id="_ajout_des_joueurseuses">Ajout des joueurs·euses</h3>
<div class="paragraph">
<p>Vous pouvez ajouter autant de joueurs·euses que vous le souhaitez pour une partie. Chaque joueur·euse est identifié·e par un nom ou un surnom unique.</p>
</div>
</div>
<div class="sect2">
<h3 id="_contrainte_dunicité">Contrainte d&#8217;unicité</h3>
<div class="paragraph">
<p>Il est impossible d&#8217;avoir deux joueurs·euses avec le même nom. Cela permet d&#8217;éviter toute confusion et de garantir des scores corrects.</p>
</div>
</div>
<div class="sect2">
<h3 id="_suppression_des_joueurseuses">Suppression des joueurs·euses</h3>
<div class="paragraph">
<p>Si vous supprimez un·e joueur·euse, toutes ses manches sont automatiquement supprimées de toutes les parties. Si une partie se retrouve sans aucun joueur·euse après une suppression, elle sera également effacée.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_commencer_une_partie_les_jeux_pré_enregistrés">Commencer une partie : Les jeux pré-enregistrés</h2>
<div class="sectionbody">
<div class="paragraph">
<p>L&#8217;application a pour but de vous faire gagner du temps. En choisissant un jeu dans la liste, vous pouvez lancer une partie en quelques secondes sans avoir à configurer de nombreuses options.</p>
</div>
<div class="sect2">
<h3 id="_les_jeux_disponibles">Les jeux disponibles :</h3>
<div class="paragraph">
<p>Une variété de jeux populaires sont déjà inclus, comme le Yams, la Belote, le Tarot, le Uno, le Seven Wonders, le 6 qui prend, le Skyjo, le Mölkky et le Barbu.</p>
</div>
</div>
<div class="sect2">
<h3 id="_et_si_mon_jeu_nest_pas_dans_la_liste">Et si mon jeu n&#8217;est pas dans la liste ?</h3>
<div class="paragraph">
<p>Vous pouvez utiliser le mode personnalisé. Ce mode vous permet de créer une partie sur mesure, avec plusieurs options adaptables à n&#8217;importe quel jeu de société.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_paramètres_de_la_partie">Paramètres de la partie</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Pour les jeux préenregistrés , les paramètres de la partie sont prédéfinis. Cependant, vous pouvez toujours les modifier si nécessaire en mode personnalisé.</p>
</div>
<div class="sect2">
<h3 id="_nom_de_la_partie">Nom de la partie</h3>
<div class="paragraph">
<p>Après avoir choisi un jeu, vous pouvez donner un nom à votre partie. Cela permet de l&#8217;identifier facilement dans la liste des parties en cours.
Par défaut le nom de la partie est le nom du jeu sélectionné, mais vous pouvez le modifier à votre convenance.</p>
</div>
</div>
<div class="sect2">
<h3 id="_le_calcul_du_ou_de_la_vainqueur">Le calcul du ou de la vainqueur</h3>
<div class="paragraph">
<p>Dans le mode personnalisé, vous avez la possibilité de choisir comment la victoire est déterminée.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Le·a joueur·euse avec le plus de points gagne : C&#8217;est le mode par défaut et il est adapté à la plupart des jeux, comme la Belote, le Tarot ou le 6 qui prend.</p>
</li>
<li>
<p>Le·a joueur·euse avec le moins de points gagne : Ce mode est idéal pour les jeux où l&#8217;objectif est d&#8217;avoir le score le plus bas possible.</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_limiter_le_score">Limiter le score</h3>
<div class="paragraph">
<p>Dans le mode personnalisé, vous pouvez définir une limite de score pour la partie. C&#8217;est l&#8217;un des moyens d&#8217;arrêter le jeu.</p>
</div>
<div class="paragraph">
<p>Score maximum : La partie s&#8217;arrête automatiquement dès qu&#8217;un joueur atteint ou dépasse le nombre de points que vous avez défini. C&#8217;est idéal pour des jeux comme le 6 qui prends (66 points) ou le Skyjo (100 points), où un certain seuil met fin à la partie.</p>
</div>
</div>
<div class="sect2">
<h3 id="_le_nombre_de_manches">Le nombre de manches</h3>
<div class="paragraph">
<p>Dans le mode personnalisé, vous pouvez décider du nombre de manches à créer dès le début de la partie. Cela vous permet d&#8217;avoir votre grille de score prête à l&#8217;emploi.</p>
</div>
</div>
<div class="sect2">
<h3 id="_équilibrer_les_points">Équilibrer les points</h3>
<div class="paragraph">
<p>Cette option, notamment utile pour des jeux comme le Tarot, permet de s&#8217;assurer que les points sont correctement répartis. Dans ces jeux, les points gagnés par certains joueurs sont perdus par d&#8217;autres. L&#8217;application vérifie en temps réel que la somme des points de la manche est égale à zéro.</p>
</div>
</div>
</div>
</div>`;