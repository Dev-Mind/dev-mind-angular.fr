export const _ngeurope_keynote_misko_hevery:string = `<div class="paragraph">
<p>Quoi de mieux dans une conférence Angular qu’une keynote de <a href="https://twitter.com/mhevery">Miško Hevery</a>, fondateur du framework.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/ngeurope/ngeurope-keynote-misko-hevery00.jpg" alt="Miško Hevery">
</div>
</div>
<div class="paragraph">
<p>Angular peut être vu comme une véritable plateforme. On peut utiliser Angular pour faire des applications web destinées au desktop, au mobile, et même faire des applications natives.</p>
</div>
<div class="paragraph">
<p>Angular est construit sur différentes briques de bases</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Compilation : le code et les templates sont compilés pour avoir un code optimisé. Vous pouvez utiliser plusieurs langages comme ES6, Dart mais surtout TypeScript</p>
</li>
<li>
<p>Synchronisation entre vos formulaires et les objets JavaScript (binding)</p>
</li>
<li>
<p>Rendu (navigateur, natif,&#8230;&#8203;)</p>
</li>
<li>
<p>Injection de dépendances</p>
</li>
<li>
<p>Décorateurs : si on faisait un parallèle ils ressemblent beaucoup aux annotations Java et permettent d’injecter du comportement à la compilation rendant le code moins fastidieux</p>
</li>
<li>
<p>Zones elles représentent des contextes d’utilisation</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Des modules annexes vont vous aider à construire des applications (i18n, animation, router).</p>
</div>
<div class="paragraph">
<p>Sur ces briques de base on va retrouver les composants <a href="https://github.com/angular/material2">Material</a> pour construire des applications, le <a href="https://mobile.angular.io/">Mobile Web Kit</a>, <a href="https://github.com/angular/universal">Universal</a> qui permet de faire du rendering côté serveur&#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>Mais la grande force d’Angular est d’avoir proposé une solution très performante. Tout est fait pour qu’une application soit à la fois rapide au premier chargement et aussi au refresh. Les tests de performance montrent qu’Angular est 5 fois plus rapide que Angular 1.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/ngeurope/ngeurope-keynote-01.png" alt="Fonctionnement Angular">
</div>
</div>
<div class="paragraph">
<p>Des efforts ont été fait pour transmettre moins de données</p>
</div>
<div class="ulist">
<ul>
<li>
<p>La taille de la librairie est maintenant plus petite</p>
</li>
<li>
<p>Vous pouvez faire du lazy loading avec le nouveau système de module et le router</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Angular 2 utilise aussi les Web Workers pour ne pas surcharger le thread principal dédié au rendu. Pour accélérer le premier rendu vous pouvez utiliser Angular Universal pour déporter cette première phase sur le serveur.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/ngeurope/ngeurope-keynote-02.png" alt="Fonctionnement Angular">
</div>
</div>
<div class="paragraph">
<p>Dans Angular 1 nous avions des problèmes de performance liées au databinding (mécanisme permettant de synchroniser automatiquement les données de la page et des données liées à un contrôleur JavaScript) et au dirty checking. Les données de la page sont liées à un ou plusieurs objets. Chaque fois qu’une propriété est changée l’arbre des objets est parcouru pour détecter les modifications (phase <a href="https://docs.angularjs.org/api/ng/type/@dollar@rootScope.Scope#@dollar@digest">digest</a>). Comme cet arbre est cyclique nous pouvons avoir plusieurs parcours.</p>
</div>
<div class="paragraph">
<p>En Angular 2 un composant ne peut accéder qu’à ces fils (la communication dans l’autre sens se fait par événements). L’arbre des objets n’est donc parcouru qu’une seule fois pour détecter les modifications (du haut vers le bas).</p>
</div>
<div class="paragraph">
<p>Pour simplifier le démarrage d’un projet vous pouvez utiliser <a href="https://github.com/angular/angular-cli">angular cli</a>. Dans cette optique de simplifier le travail des développeurs un gros effort a été fait pour que les IDE puissent proposer facilement de la complétion, de la détection d’erreur, des stacks d’erreur&#8230;&#8203; Un module <a href="https://augury.angular.io/">Augury</a> développé par la communauté peut également être ajouté au Chrome DevTools pour inspecter les données de votre page liées à des composants Angular.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/ngeurope/ngeurope-keynote-03.png" alt="Fonctionnement Angular">
</div>
</div>
<div class="videoblock">
<div class="title">Voir la vidéo</div>
<div class="content">
<iframe src="https://www.youtube.com/embed/wpxnU62mNJ4?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>`;