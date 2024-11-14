export const _nouveau_site_asciidoctor:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Je suis rédacteur du blog <a href="http://javamind-fr.blogspot.fr">JavaMind</a> depuis maintenant 7 ans. Quand j&#8217;ai lancé le blog, j&#8217;ai choisi un CMS en ligne (Blogger) qui m&#8217;offrait de la souplesse mais qui n&#8217;était pas très personnalisable. Depuis un bon moment maintenant je cherchais une solution de remplacement simple et intégrable facilement dans mon site web.</p>
</div>
<div class="paragraph">
<p>Je suis très heureux d&#8217;annoncer que vous retrouverez dorénavant mes articles directement sur le site <a href="https://www.dev-mind.fr" class="bare">https://www.dev-mind.fr</a>. Je vais essayer d&#8217;expliquer pourquoi et comment j&#8217;ai choisi de changer ma manière de publier mes articles pour passer d&#8217;un blog sous Blogger à un blog généré via node et Asciidoctor.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/nouveau_site_asciidoctor_001.png" alt="Nainformaticien" width="800px">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_remontons_dans_le_temps">Remontons dans le temps</h2>
<div class="sectionbody">
<div class="paragraph">
<p>J&#8217;ai toujours eu du mal à retenir les choses si je ne les écrivais pas. Dès la fin de mes études, j&#8217;ai essayé de mettre au format numérique mes notes pour les retrouver plus facilement. Je n&#8217;ai pas retrouvé les sources de mon premier site perso mis en ligne en 1999 (merci Free).  En 2001 j&#8217;ai lancé mon site <code><em>nainformaticien.fr</em></code> pour expliquer comment fonctionnait Internet, parler de programmation, et exposer mes photos de vacances&#8230;&#8203;</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/nouveau_site_asciidoctor_02.png" alt="Nainformaticien" width="400px">
</div>
</div>
<div class="paragraph">
<p>Bon forcément peu de personne ont lu ces pages hormis moi :-) Mais elles avaient le mérite d&#8217;être mon pense bête en ligne. C&#8217;est vrai qu&#8217;à cette époque, le site <a href="https://www.developpez.com">developpez.com</a> lancé en même temps en 1999 avait déjà beaucoup plus de succès et mes photos de vacances n&#8217;intéressaient que moi.</p>
</div>
<div class="paragraph">
<p>Après cette prise de conscience, j&#8217;ai beaucoup moins publié sur Internet. Je souffrais un peu du syndrôme de l&#8217;imposteur. Je n&#8217;ai pas pour autant arrêté de documenter les sujets techniques que j&#8217;explorais mais je le faisais en interne pour le compte de l&#8217;entreprise où je travaillais à l&#8217;époque.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_et_dun_point_de_vue_technique">Et d&#8217;un point de vue technique</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_premiers_essais">Premiers essais</h3>
<div class="paragraph">
<p>Au départ mon blog était constitué d&#8217;une suite de pages. A chaque modification de structure il fallait repasser sur toutes les pages. Je suis passé par les iframes, la génération de code en JavaScript&#8230;&#8203; Mais je n&#8217;étais pas satisfait.</p>
</div>
</div>
<div class="sect2">
<h3 id="_non_pas_de_cms">Non pas de CMS&#8230;&#8203;</h3>
<div class="paragraph">
<p>Les premiers CMS sont apparus mais en tant que développeur je n&#8217;avais pas envie d&#8217;aller vers des solutions toute prêtes. Avec les hébergements PHP gratuits, je me suis créé un petit framework MVC en PHP utilisant des templates, et qui me facilitait la création de pages. Je ne dénigre pas le langage PHP mais je n&#8217;ai jamais été vraiment fan. J&#8217;ai donc essayé de générer mon blog en Java. Mais je me suis rendu compte que des langages comme PHP ou Java ne simplifiaient pas grand chose et que mes solutions étaient un peu lourde pour servir quelques pages statiques&#8230;&#8203;</p>
</div>
</div>
<div class="sect2">
<h3 id="_eh_ben_si_un_cms">Eh ben si un CMS&#8230;&#8203;</h3>
<div class="paragraph">
<p>Comme mes différents essais étaient non concluants je me suis résigné à utiliser un CMS en 2010. J&#8217;aurai pu mettre en place un site <a href="https://fr.wordpress.org/">WordPress</a> mais je voulais aller vite. J&#8217;ai donc choisi de publier mes articles sur un CMS en ligne et je me suis rabattu sur <a href="https://www.blogger.com" class="bare">https://www.blogger.com</a>. Certes la personnalisation est limitée mais ces outils visuels permettent de vite publier du contenu, de faciliter le référencement, de générer les liens pour relayer les articles sur les réseaux sociaux&#8230;&#8203;</p>
</div>
</div>
<div class="sect2">
<h3 id="_mais_je_veux_mieux_faire">Mais je veux mieux faire</h3>
<div class="paragraph">
<p>Ce cadre imposé par les CMS m&#8217;a laissé insatisfait. Je préfère coder que paramétrer. J&#8217;ai donc continué d&#8217;expérimenter. J&#8217;ai créé des maquettes de blog écrites en Angular qui avaient le mérité d&#8217;être full stack web, de proposer des templates&#8230;&#8203; Mais là je me suis heurté aux problèmes de référencements&#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>J&#8217;ai testé <a href="https://jekyllrb.com/">Jekyll</a> notamment via l&#8217;intégration sous <a href="https://pages.github.com/">Github pages</a>. Ecrire des articles au format markdown est sympa, on se rapproche d&#8217;une solution qui me plait. Mais j&#8217;aimerai une solution que je puisse intégrer facilement à mon site institutionnel en modifiant simplement mon process de build existant&#8230;&#8203;</p>
</div>
</div>
<div class="sect2">
<h3 id="_ma_solution_idéale">Ma solution idéale</h3>
<div class="paragraph">
<p>Toutes ces expérimentations m&#8217;ont en fait permis de savoir ce que je voulais, qu&#8217;elle était ma solution idéale. Je parle de MA solution idéale car vous avez le droit de ne pas être d&#8217;accord avec moi.</p>
</div>
<div class="paragraph">
<p>Une solution idéale pour mettre en place un blog ou un site perso doit à mon sens proposer les choses suivantes</p>
</div>
<div class="ulist">
<ul>
<li>
<p>ne suivre que les technos standards du Web : HTML, JS et CSS. Si vous voulez un contenu indexé, lisible par tous, rapide à charger il est préférable d&#8217;implémenter des choses simples</p>
</li>
<li>
<p>avoir une solution de templating pour avoir la possibilité de changer facilement. Quand vous faites un site marketing le visuel doit évoluer pour montrer votre dynamisme</p>
</li>
<li>
<p>gérer le cycle de vie du site comme on gère un projet JS en 2017 avec un task builder. Pour ma part Gulp</p>
</li>
<li>
<p>écrire mes articles au format texte car c&#8217;est à mon sens le mieux pour pouvoir éditer, corriger, ajouter du contenu en ligne notamment via github. Par contre je souhaite que le formatage du contenu soit simple (texte, exemple de code, vidéos, images, tableau&#8230;&#8203;)</p>
</li>
<li>
<p>ne pas avoir de bases de données mais être capable d&#8217;indexer les articles afin de créer un écran de recherche de navigation entre mes articles</p>
</li>
<li>
<p>pouvoir héberger mon site sur un environnement mutualisé peu coûteux</p>
</li>
<li>
<p>être capable de dupliquer facilement le concept pour les différents sites associatifs que je gère (gestion technique et non éditoriale)</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>En 2015 la keynote de <a href="https://mixitconf.org/2015/dan-allen-write-in-asciidoc&#8212;&#8203;publish-everywhere-">Dan Allen à MiXiT</a> m&#8217;a inspiré. Mais comme beaucoup de personnes qui font de la veille technique j&#8217;ai incrit <a href="http://asciidoctor.org/">Asciidoctor</a> tout en bas de ma liste des choses à creuser et comme ce sujet n&#8217;était pas prioritaire, je l&#8217;ai un peu oublié. En 2016 je me suis réveillé lors de l&#8217;intervention de <a href="https://twitter.com/hsablonniere">Hubert Sablonière</a> au <a href="http://www.lyonjug.org/evenements/asciidoc">Lyon Jug</a>. Il était venu présenter l&#8217;écosystème Asciidoctor et il a réveillé mon besoin de mettre à jour mon site et mon blog. Je dois dire que j&#8217;ai eu un peu de mal pour démarrer car je ne pouvais facilement mettre en place mes templates avec Asciidoctor ni exploiter les métadonnées des documents.</p>
</div>
<div class="paragraph">
<p>Et là c&#8217;est la magie d&#8217;avoir des gens hyper réactifs et motivés sur des projets Open Source comme <a href="http://asciidoctor.org/">Asciidoctor</a>. On branche un membre de la team</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/nouveau_site_asciidoctor_03.png" alt="Twitter" width="300px">
</div>
</div>
<div class="paragraph">
<p>En quelques jour j&#8217;avais tout pour démarrer à implémenter le blog de mes rêves dans mon site <a href="https://www.dev-mind.fr" class="bare">https://www.dev-mind.fr</a></p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_mon_blog_via_asciidoctor">Mon blog via Asciidoctor</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Maintenant que j&#8217;ai expliqué le cheminement (le "pourquoi") je vais pouvoir parler un peu plus du "comment" arriver à ce résultat. Vous pouvez consulter les sources de mon site sur <a href="https://github.com/Dev-Mind/dev-mind.com">Github</a>.</p>
</div>
<div class="sect2">
<h3 id="_ecrire_les_articles">Ecrire les articles</h3>
<div class="paragraph">
<p>Voici un exemple d&#8217;article en Asciidoc</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-adoc" id="1731613730498.1816">----_
<span class="hljs-meta">:doctitle:</span> Créer son blog via Asciidoctor
<span class="hljs-meta">:description:</span> Migrer son blog de blogger vers un blog généré via Asciidoctor
<span class="hljs-meta">:keywords:</span> Web, Blog, Asciidoctor, CMS
<span class="hljs-meta">:revdate:</span> 2017-05-09
<span class="hljs-meta">:teaser:</span> Pourquoi et comment j\<span class="hljs-emphasis">&#x27;ai choisi de changer ma manière de publier mes articles en passant de Blogger à un blog généré via Asciidoctor.
:imgteaser: ../../img/blog/unknown.png</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731613730498.1816')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Je suis rédacteur du blog <a href="http://javamind-fr.blogspot.fr">JavaMind</a> depuis maintenant 7 ans. Quand j&#8217;ai lancé le blog, j&#8217;ai choisi un CMS en ligne (Blogger) qui m&#8217;offrait de la souplesse mais qui n&#8217;était pas très personnalisable. Depuis un bon moment maintenant je cherchais une solution de remplacement simple et intégrable facilement dans mon site web.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_remontons_dans_le_temps_2">Remontons dans le temps</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Si vous voulez en savoir plus sur la syntaxe Asciidoc vous pouvez consulter la <a href="http://asciidoctor.org/docs/asciidoc-syntax-quick-reference/">documentation</a>.</p>
</div>
<div class="sect2">
<h3 id="_cycle_de_vie_de_mon_site">Cycle de vie de mon site</h3>
<div class="paragraph">
<p>Pour comprendre le cycle de vie de mon site web vous pouvez consulter le fichier de description du <a href="https://raw.githubusercontent.com/Dev-Mind/dev-mind.com/master/gulpfile.js">build Gulp</a>. Les principales tâches sont</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>styles</strong> : compilation Sass en CSS, utilisaton de autoprefixer et minification des feuilles de styles</p>
</li>
<li>
<p><strong>blog</strong> : compilation des fichiers Asciidoc et indexation des différents fichiers (je reviens plus tard sur le détail)</p>
</li>
<li>
<p><strong>html</strong> : parsing des fichiers HTML de l&#8217;application (fichiers n&#8217;ayant pas un format article comme la page d&#8217;accueil) et utilisation de Handlebar pour appliquer des templates et générer le HTML</p>
</li>
<li>
<p><strong>scripts</strong> : transpilation des scripts en ES5 puis minification</p>
</li>
<li>
<p><strong>images</strong> : amélioration des images et convertion en format alternatif comme webp</p>
</li>
<li>
<p><strong>service-worker</strong> : génération d&#8217;un service worker avec sw-precache et sw-toolbox pour les connexions dégradées ou le mode offline</p>
</li>
<li>
<p><strong>compress</strong> : compression au format gzip des ressources statiques</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_génération_du_blog">Génération du blog</h3>
<div class="paragraph">
<p>Regardons un peu plus en détail la partie de génération du blog</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1731613730504.9453">gulp.<span class="hljs-title function_">task</span>(<span class="hljs-string">&#x27;blog-indexing&#x27;</span>, <span class="hljs-function">() =&gt;</span>
  gulp.<span class="hljs-title function_">src</span>(<span class="hljs-string">&#x27;src/blog/**/*.adoc&#x27;</span>)
    .<span class="hljs-title function_">pipe</span>(<span class="hljs-title function_">asciidoctorRead</span>())
    .<span class="hljs-title function_">pipe</span>(<span class="hljs-title function_">asciidoctorConvert</span>())
    .<span class="hljs-title function_">pipe</span>(<span class="hljs-title function_">asciidoctorIndexing</span>(<span class="hljs-string">&#x27;blog-index.json&#x27;</span>))
    .<span class="hljs-title function_">pipe</span>(gulp.<span class="hljs-title function_">dest</span>(<span class="hljs-string">&#x27;build/dist/blog&#x27;</span>))
);

gulp.<span class="hljs-title function_">task</span>(<span class="hljs-string">&#x27;blog&#x27;</span>, [<span class="hljs-string">&#x27;blog-indexing&#x27;</span>], <span class="hljs-function">() =&gt;</span>
  gulp.<span class="hljs-title function_">src</span>(<span class="hljs-string">&#x27;src/blog/**/*.adoc&#x27;</span>)
    .<span class="hljs-title function_">pipe</span>(<span class="hljs-title function_">asciidoctorRead</span>())
    .<span class="hljs-title function_">pipe</span>(<span class="hljs-title function_">asciidoctorConvert</span>())
    .<span class="hljs-title function_">pipe</span>(<span class="hljs-title function_">applyTemplate</span>(<span class="hljs-string">&#x27;src/templates/blog.hbs&#x27;</span>))
    .<span class="hljs-title function_">pipe</span>(<span class="hljs-title function_">highlightCode</span>({<span class="hljs-attr">selector</span>: <span class="hljs-string">&#x27;pre.highlight code&#x27;</span>}))
    .<span class="hljs-title function_">pipe</span>(gulp.<span class="hljs-title function_">dest</span>(<span class="hljs-string">&#x27;build/.tmp/blog&#x27;</span>))
    .<span class="hljs-title function_">pipe</span>(@dollar@.<span class="hljs-title function_">htmlmin</span>(<span class="hljs-variable constant_">HTMLMIN_OPTIONS</span>))
    .<span class="hljs-title function_">pipe</span>(gulp.<span class="hljs-title function_">dest</span>(<span class="hljs-string">&#x27;build/dist/blog&#x27;</span>))
);</code><button class="btn-copy-code" onclick="copyToClipboard('1731613730504.9453')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>La tâche <code><em>blog-indexing</em></code> permet de construire un index au format Json qui sera interrogeable via un simple <a href="https://raw.githubusercontent.com/Dev-Mind/dev-mind.com/master/src/js/blog.js">fichier JS</a> pour naviguer ou retrouver facilement un article de blog. La tâche <code><em>blog</em></code> convertit quand à elle, les articles Asccidoctor en HTML en utilisant les templates Handlebar.</p>
</div>
<div class="paragraph">
<p><code><em>asciidoctorRead</em></code>, <code><em>asciidoctorConvert</em></code>, <code><em>asciidoctorIndexing</em></code>, &#8230;&#8203; sont des extensions à notre build Gulp ou des scripts permettant de transformer les flux de données lus.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/nouveau_site_asciidoctor_04.png" alt="Gulp extension" width="50%">
</div>
</div>
<div class="paragraph">
<p>Si le code JS de ces extensions vous intéresse je vous laisse consulter les sources sous <a href="https://github.com/Dev-Mind/dev-mind.com/tree/master/gulp-extensions">Github</a>. Le plus intéressant à exposer est la philosophie derrière</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code><em>asciidoctorRead</em></code> lit le stream des documents asciidoctor et interprète ces documents pour extraire le contenu HTML et les différentes metadata. Ce qui est super intéressant c&#8217;est que vous pouvez facilement ajouter vos propres métadonnées à vos documents.</p>
</li>
<li>
<p><code><em>asciidoctorConvert</em></code> convertit les documents <code><em>adoc</em></code> en <code><em>html</em></code></p>
</li>
<li>
<p><code><em>asciidoctorIndexing</em></code> écrit les métadonnées dans un fichier (ici <code><em>blog-index.json</em></code>). Si votre site grossis vous pourriez par exemple mettre ces informations en base de données</p>
</li>
<li>
<p><code><em>applyTemplate</em></code> utilisation de moustache pour insérer le contenu et les métadata dans un template de page (dans la première version j&#8217;avais utilisé Handlebar mais Mustache à l&#8217;intérêt de proposer de l&#8217;héritage entre les templates)</p>
</li>
<li>
<p><code><em>highlightCode</em></code> mise en forme des blocs de code dans les pages avec highlight</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Les principales technologies utilisées sont les suivantes</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Asciidoctor <code><em>1.5.6-preview.1</em></code> (en cours de développement)</p>
</li>
<li>
<p>Node @GT 7</p>
</li>
<li>
<p>Yarn</p>
</li>
<li>
<p>Gulp</p>
</li>
<li>
<p>Mustache pour les templates</p>
</li>
<li>
<p>Sass pour la définition des styles</p>
</li>
<li>
<p>Babel pour la transpilation ES5</p>
</li>
<li>
<p>highlights pour la mise en forme du code</p>
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
<h2 id="_pour_finir">Pour finir</h2>
<div class="sectionbody">
<div class="paragraph">
<p>La solution que j&#8217;ai mise en place peut être encore améliorée notamment au niveau de la recherche de mes articles, de l&#8217;ajout de commentaires, &#8230;&#8203; Mais Asciidoctor JS m&#8217;a permis de résoudre ma problématique assez facilement. Si vous avez des questions vous pouvez me contacter directement.</p>
</div>
</div>
</div>`;