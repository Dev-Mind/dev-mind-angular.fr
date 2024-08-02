export const _highcharts_stackedarea:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Il existe plusieurs librairies pour faire des graphiques sur un site web. En ce moment j&#8217;utilise <a href="https://www.highcharts.com/">highcharts</a>. Cette librairie a l&#8217;avantage de proposer un site avec beaucoup d&#8217;exemples et une bonne description de l&#8217;API.</p>
</div>
<div class="paragraph">
<p>Mais les options de paramétrages sont très nombreuses et il n&#8217;est pas toujours simple de faire un graphique qui colle à notre use case. Je vais prendre un exemple que j&#8217;ai rencontré récemment. Je devais créer un graphique composé de zones empilées (staked area) représentant des valeurs négatives et positives. Forcément si j&#8217;écris cet article, c&#8217;est que tout n&#8217;a pas été tout rose.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_créer_un_grapique_de_type_stacked_area">Créer un grapique de type <em>stacked area</em></h2>
<div class="sectionbody">
<div class="paragraph">
<p>Prenons un exemple (les sources présentées ici sont disponibles sous <a href="https://github.com/javamind/stackedarea">Github</a>) dans lequel nous essayons d&#8217;afficher des mesures temporelles</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604314935.0598">{
   <span class="hljs-attr">source</span>: <span class="hljs-string">&quot;Captor 1&quot;</span>,
   <span class="hljs-attr">measures</span>: [
     {
        <span class="hljs-attr">instant</span>: <span class="hljs-number">1495587600000</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-number">7390</span>
     },
     {
        <span class="hljs-attr">instant</span>: <span class="hljs-number">1495591200000</span>,
        <span class="hljs-attr">value</span>: -<span class="hljs-number">5670</span>
     },
     <span class="hljs-comment">//...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314935.0598')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si je regarde l&#8217;exemple de <a href="https://www.highcharts.com/demo/area-stacked" class="bare">https://www.highcharts.com/demo/area-stacked</a> je peux écrire</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604314940.4102">  <span class="hljs-keyword">function</span> <span class="hljs-title function_">_createSeries</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-variable constant_">MEASURES</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">serie</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;area&#x27;</span>,
        <span class="hljs-attr">name</span>: serie.<span class="hljs-property">source</span>,
        <span class="hljs-attr">data</span>: serie.<span class="hljs-property">measures</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">measure</span>) =&gt;</span> {
          <span class="hljs-keyword">return</span> {<span class="hljs-attr">x</span>: measure.<span class="hljs-property">instant</span>, <span class="hljs-attr">y</span>: measure.<span class="hljs-property">value</span>}
        })
      }
    });
  }

  <span class="hljs-title class_">Highcharts</span>.<span class="hljs-title function_">setOptions</span>({
    <span class="hljs-attr">title</span>: {<span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Stack area in Highchart&#x27;</span>},
    <span class="hljs-attr">xAxis</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;datetime&#x27;</span>,
    },
    <span class="hljs-attr">plotOptions</span>: {
      <span class="hljs-attr">area</span>: {
        <span class="hljs-attr">stacking</span>: <span class="hljs-string">&#x27;normal&#x27;</span>,
      }
    }
  });

  <span class="hljs-keyword">new</span> <span class="hljs-title class_">Highcharts</span>.<span class="hljs-title class_">Chart</span>({<span class="hljs-attr">chart</span>: {<span class="hljs-attr">renderTo</span>: <span class="hljs-string">&#x27;myChart&#x27;</span>}, <span class="hljs-attr">series</span>: <span class="hljs-title function_">_createSeries</span>()})</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314940.4102')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si les valeurs sont toutes positives ou toutes négatives vous n&#8217;avez aucun problème. Par contre si vous avez un mix, <a href="https://www.highcharts.com/">Highcharts</a> n&#8217;est pas capable d&#8217;afficher correctement les données comme nous pouvons le voir ci dessous.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/highcharts_stackedarea_01.png" alt="Exemple ne marchant pas">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_dissocier_les_valeurs_positives_et_négatives">Dissocier les valeurs positives et négatives</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Pour contourner le problème nous allons n&#8217;afficher que des courbes qui contiennent que des valeurs positives ou que des valeurs positives. Pour chaque jeu de données, chaque série du graphe nous allons en créer deux</p>
</div>
<div class="ulist">
<ul>
<li>
<p>une avec des valeurs positives et des 0 à la place des valeurs négatives</p>
</li>
<li>
<p>une avec des valeurs négatives et des 0 à la place des valeurs positives</p>
</li>
</ul>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604314946.3845">  <span class="hljs-keyword">function</span> <span class="hljs-title function_">evaluator</span>(<span class="hljs-params">measure</span>) {
    <span class="hljs-keyword">if</span> (measure.<span class="hljs-property">value</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">return</span> positive ? measure.<span class="hljs-property">value</span> : <span class="hljs-number">0</span>;
    }
    <span class="hljs-keyword">return</span> positive ? <span class="hljs-number">0</span> : measure.<span class="hljs-property">value</span>;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">_createSeries</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-variable constant_">MEASURES</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">serie</span> =&gt;</span> [
      <span class="hljs-title function_">_createSerie</span>(serie, color, <span class="hljs-literal">true</span>),
      <span class="hljs-title function_">_createSerie</span>(serie, color, <span class="hljs-literal">false</span>)
    ])
    .<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">acc, val</span>) =&gt;</span> acc.<span class="hljs-title function_">concat</span>(val));
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">_createSerie</span>(<span class="hljs-params">serie, positive</span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;area&#x27;</span>,
      <span class="hljs-attr">stack</span>: positive ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>,
      <span class="hljs-attr">showInLegend</span>: positive,
      <span class="hljs-attr">name</span>: serie.<span class="hljs-property">source</span>,
      <span class="hljs-attr">data</span>: serie.<span class="hljs-property">measures</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">measure</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> {<span class="hljs-attr">x</span>: measure.<span class="hljs-property">instant</span>, <span class="hljs-attr">y</span>: positive !== <span class="hljs-literal">null</span> ? evaluator(measure) : measure.<span class="hljs-property">value</span>}
      })
    }
  }</code><button class="btn-copy-code" onclick="copyToClipboard('1722604314946.3845')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour éviter d&#8217;avoir une double légende nous utilisons la propriété <code><em>showInLegend: positive</em></code>. Plus important pour avoir un graphique valable, nous devons indiquer à <a href="https://www.highcharts.com/">Highcharts</a> que nous avons 2 manières d&#8217;empiler les données (une pour les valeurs positives et une pour les négatives). Nous l&#8217;indiquons avec la propriété <code><em>stack: positive ? 1 : 0</em></code>. Les valeurs sont peut importantes elles doivent juste être distinctes dans les 2 cas.</p>
</div>
<div class="paragraph">
<p>Nous optenons</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/highcharts_stackedarea_02.png" alt="Exemple ne marchant pas beaucoup plus">
</div>
</div>
<div class="paragraph">
<p>Est ce mieux ? Les valeurs positives et négatives sont maintenant justes en cumulées. Mais si nous zoomon et regardons par exemple le troisième pas de temps et notamment les enchaînnements entre les points :</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/highcharts_stackedarea_03.png" alt="OK en cumulé">
</div>
</div>
<div class="paragraph">
<p>Le dessin du graphe est faux quand nous passons d&#8217;une valeur positive à négative. Si nous n&#8217;affichons qu&#8217;une série nous pouvons voir le problème</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/highcharts_stackedarea_04.png" alt="référence à 0">
</div>
</div>
<div class="paragraph">
<p>Comme nous faisons une référence à 0 le tracé est faux.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_quelle_solution_choisir">Quelle solution choisir ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Il n&#8217;y a pas de solution idéale. Si vous voulez des zones empilées le tracé de courbe sera faux. Visuellement les défauts sont atténués si vous n&#8217;avez pas de grandes variations des valeurs et si ces valeurs sont nombreuses.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/highcharts_stackedarea_05.png" alt="plus de valeurs">
</div>
</div>
<div class="paragraph">
<p>L&#8217;autre solution est de ne pas utiliser ce type de graphique si vous voulez cumuler des valeurs positives et négatives. Vous pouvez par exemple utiliser le type <code><em>column</em></code></p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/highcharts_stackedarea_06.png" alt="type column">
</div>
</div>
</div>
</div>`;