export const _java8_et_les_lambda_stream:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Je vais revenir sur l&#8217;intervention de Jose Paumard au Lyon Jug pour nous parler de la grosse nouveauté de Java 8, les lambdas et l&#8217;API stream. José est maître de conférence à l&#8217;université Paris 13, où il enseigne tout ce qui tourne autour de la sphère Java depuis 1998. Il a également une activité en tant qu&#8217;indépendant qui lui permet d&#8217;apporter son expertise aux entreprises. Au delà de ces aspects José fait aussi parti des co-organisateurs de la conférence Devoxx France. L&#8217;article est assez long mais j&#8217;ai préféré ne pas le découper.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_pourquoi_les_lambdas">Pourquoi les lambdas ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>On peut se demander pourquoi les lambdas ont été introduites dans Java 8 ? Le mieux est de prendre un exemple. Considérons une classe Person</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450520.1702"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-type">int</span> age;
    <span class="hljs-keyword">public</span> String name;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450520.1702')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Le but est ici d&#8217;agir sur un ensemble de personnes (une Collection) et de calculer la moyenne d&#8217;âge de toutes les personnes de plus de 20 ans. En Java on fait généralement de la programmation impérative où l&#8217;on décrit les différentes instructions qui seront exécutées par la machine pour modifier des états. Par exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450521.2144"><span class="hljs-type">int</span> <span class="hljs-variable">sum</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
<span class="hljs-type">int</span> <span class="hljs-variable">average</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
<span class="hljs-type">int</span> <span class="hljs-variable">nb</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span> (Person p : persons) {
    <span class="hljs-keyword">if</span> (p.getAge() &gt;= <span class="hljs-number">20</span>) {
        sum += p.getAge();
        nb++;
    }
}
<span class="hljs-keyword">if</span> (!persons.isEmpty()) {
    average = sum / nb;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450521.2144')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si on essaye de décomposer les opérations pour obtenir le résultat nous avons plusieurs phases</p>
</div>
<div class="ulist">
<ul>
<li>
<p>map : on recupère la donnée qui nous intéresse, la liste des âges des personnes</p>
</li>
<li>
<p>filter : on filtre les âges  des personnes de plus de 20 ans</p>
</li>
<li>
<p>reduce :  on calcule la somme des âges qui nous permettra ensuite de sortir une moyenne</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>On aimerait faire du  fonctionnel et repenser notre code mais en Java 7 ceci est difficile. La base serait de définir des interfaces du style</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450523.315"><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">Mapper</span><span class="hljs-meta">@LTO</span>, P<span class="hljs-meta">@GT</span> {
    P <span class="hljs-title function_">map</span><span class="hljs-params">(O o)</span>;
}
<span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">Predicate</span><span class="hljs-meta">@LTO</span><span class="hljs-meta">@GT</span> {
    <span class="hljs-type">boolean</span> <span class="hljs-title function_">filter</span><span class="hljs-params">(O t)</span>;
}
<span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">Reducer</span><span class="hljs-meta">@LTR</span><span class="hljs-meta">@GT</span> {
    R <span class="hljs-title function_">reduce</span><span class="hljs-params">(R r1, R r2)</span>;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450523.315')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>et des implémentations&#8230;&#8203;</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450524.8743">Mapper<span class="hljs-meta">@LTPerson</span>, Integer<span class="hljs-meta">@GT</span> mapper = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Mapper</span><span class="hljs-meta">@LTPerson</span>, Integer<span class="hljs-meta">@GT()</span> {
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> Integer <span class="hljs-title function_">map</span><span class="hljs-params">(Person o)</span> {
        <span class="hljs-keyword">return</span> o.getAge();
    }
};
Predicate<span class="hljs-meta">@LTInteger</span><span class="hljs-meta">@GT</span> filter = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Predicate</span><span class="hljs-meta">@LTInteger</span><span class="hljs-meta">@GT()</span> {
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">boolean</span> <span class="hljs-title function_">filter</span><span class="hljs-params">(Integer t)</span> {
        <span class="hljs-keyword">return</span> t<span class="hljs-meta">@GT</span>=<span class="hljs-number">20</span>;
    }
};
Reducer<span class="hljs-meta">@LTInteger</span><span class="hljs-meta">@GT</span> reducer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Reducer</span><span class="hljs-meta">@LTInteger</span><span class="hljs-meta">@GT()</span> {
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> Integer <span class="hljs-title function_">reduce</span><span class="hljs-params">(Integer r1, Integer r2)</span> {
        <span class="hljs-keyword">return</span> r1+r2;
    }
};</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450524.8743')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>On pourrait aussi utiliser la programmation fonctionnelle à la sauce  Guava  mais cette librairie ne permet pas de faire la dernière opération de reduce. On devrait écrire</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450525.8396">List<span class="hljs-meta">@LTInteger</span><span class="hljs-meta">@GT</span> agesPersons = FluentIterable
        .from(persons)
        .filter(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Predicate</span><span class="hljs-meta">@LTPerson</span><span class="hljs-meta">@GT()</span> {
            <span class="hljs-meta">@Override</span>
            <span class="hljs-keyword">public</span> <span class="hljs-type">boolean</span> <span class="hljs-title function_">apply</span><span class="hljs-params">(Person person)</span> {
                <span class="hljs-keyword">return</span> person.getAge()<span class="hljs-meta">@GT</span>=<span class="hljs-number">20</span>;
            }
        })
        .transform(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Function</span><span class="hljs-meta">@LTPerson</span>, Integer<span class="hljs-meta">@GT()</span> {
            <span class="hljs-meta">@Override</span>
            <span class="hljs-keyword">public</span> Integer <span class="hljs-title function_">apply</span><span class="hljs-params">(Person person)</span> {
                <span class="hljs-keyword">return</span> person.getAge();
            }
        })
        .toList();
<span class="hljs-keyword">if</span>(!agesPersons.isEmpty()) {
    <span class="hljs-type">double</span> <span class="hljs-variable">sum</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (Integer age : agesPersons) {
        sum += age;
    }
    <span class="hljs-type">double</span> <span class="hljs-variable">moyenne</span> <span class="hljs-operator">=</span> sum / agesPersons.size();
    System.out.println(moyenne);
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450525.8396')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>On peut voir que le code est assez verbeux et que notre boucle for initiale est beaucoup simple. Passons maintenant à  Java8 et utilisons les lambdas expressions pour simplifier l&#8217;écriture des implémentations de nos interfaces.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450526.2227">Mapper<span class="hljs-meta">@LTPerson</span>, Integer<span class="hljs-meta">@GT</span> mapper = (Person person) <span class="hljs-meta">@LAMBDA</span> person.getAge();
<span class="hljs-comment">//ou</span>
mapper = Person::getAge;

Predicate<span class="hljs-meta">@LTInteger</span><span class="hljs-meta">@GT</span> filter = i <span class="hljs-meta">@LAMBDA</span> i<span class="hljs-meta">@GT</span>=<span class="hljs-number">20</span>;

Reducer<span class="hljs-meta">@LTInteger</span><span class="hljs-meta">@GT</span> reducer = (r1, r2) <span class="hljs-meta">@LAMBDA</span> r1+r2;</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450526.2227')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_comment_le_compilateur_gère_les_lambdas">Comment le compilateur gère les lambdas ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>On peut se placer à la place du compilateur. Comment savoir quelle lambda expression utiliser ? Il le sait par rapport au type que vous avez déclaré d&#8217;où certaines contraintes</p>
</div>
<div class="ulist">
<ul>
<li>
<p>il ne faut qu&#8217;une seule méthode dans le contrat d&#8217;interface</p>
</li>
<li>
<p>il faut une cohérence entre les paramètres d&#8217;entrée et de sortie et au niveau des exceptions (cette condition est remplie de fait dans une interface)</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Comme vous pouvez le voir j&#8217;ai utilisé plusieurs écritures possibles pour les lambdas expressions
* <code><em>(Person person) &#8594; person.getAge()</em></code> : ici je précise le type de la donnée en entrée mais je peux m&#8217;en passer car le navigateur peut le deviner (inférence de type). C&#8217;est la première fois depuis le début de Java que l&#8217;on n&#8217;est pas obligé de préciser le type
* <code><em>Person::getAge</em></code> est possible si la méthode getAge n&#8217;accepte pas de paramètre</p>
</div>
<div class="paragraph">
<p>Une lambda apparaît comme une autre façon d&#8217;écrire une classe anonyme. Une lambda est une instance d&#8217;une interface fonctionnelle qui peut être définie à l&#8217;aide de l&#8217;annotation @FunctionalInterface. Par défaut toute interface ne définissant qu&#8217;une seule méthode est fonctionnelle. Ceci permet de vous fournir la fonctionnalité même si vous utilisez des librairies écrites avant Java8. Par contre l&#8217;annotation est utile car elle permet de verrouiller votre interface. L&#8217;ajout d&#8217;une nouvelle méthode provoquera une erreur.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_est_ce_quune_lambda_expression_est_un_objet">Est ce qu&#8217;une lambda expression est un objet ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Comme vous pouvez le voir dans l&#8217;exemple que j&#8217;ai donné plus haut une lambda peut être stockée dans une variable. Cette manière de faire est naturelle pour des personnes habituée au javascript, mais en Java c&#8217;est nouveau.</p>
</div>
<div class="paragraph">
<p>Mais alors est ce qu&#8217;une lambda expression est une classe ? Eh bien non car comme vous pouvez le voir nous n&#8217;utilisons pas le mot clé new. Nous n&#8217;avons pas besoin de demander à la JVM la création d&#8217;un objet qui sera ensuite nettoyé par le garbage. Une lambda expression est un nouveau type d&#8217;objet, une sorte de classe sans état. Les lambdas permettent donc à la JVM de faire des gains de performance. Comme ce n&#8217;est pas un objet, si vous utilisez le this vous faites référence au conteneur et non à la lambda elle même.</p>
</div>
<div class="paragraph">
<p>Java 8 arrive avec 43 nouvelles interfaces fonctionnelles mises à disposition dans le package <a href="http://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html">java.util.function</a>. On peut découper en 4 catégories</p>
</div>
<div class="ulist">
<ul>
<li>
<p>suppliers : fournit un objet</p>
</li>
<li>
<p>functions : prend un objet et renvoie un autre objet</p>
</li>
<li>
<p>consumers : consomme un objet sans rien renvoyer</p>
</li>
<li>
<p>predicate : prend un objet et renvoie un booléan</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_utiliser_des_lambdas_sur_des_collections">Utiliser des lambdas sur des collections ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Revenons à notre exemple. Pour le moment les lambdas n&#8217;ont pas permis de répondre à notre besoin intial. Pour cela il faudrait que l&#8217;API Collection fournissent des classes utilitaires permettant d&#8217;effectuer ces fonctions de base pour manipuler ces listes. Ça donnerait par exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450526.15">List<span class="hljs-meta">@LTInteger</span><span class="hljs-meta">@GT</span> ages = Lists.map(persons, person <span class="hljs-meta">@LAMBDA</span> person.getAge());
List<span class="hljs-meta">@LTInteger</span><span class="hljs-meta">@GT</span> ages20 = Lists.filter(ages, age <span class="hljs-meta">@LAMBDA</span> age<span class="hljs-meta">@GT</span>=<span class="hljs-number">20</span>);
<span class="hljs-type">int</span> <span class="hljs-variable">sum</span> <span class="hljs-operator">=</span> Lists.reduce(ages20, (r1, r2) <span class="hljs-meta">@LAMBDA</span> r1+r2);</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450526.15')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Mais si on regarde de plus près nous pourrions avoir des problèmes de performance si la liste initiale des personnes est très grande. En effet nous manipulons plusieurs fois  une liste complète. Mais alors que faire ? C&#8217;est là que l&#8217;API Stream rentre en jeu.</p>
</div>
<div class="paragraph">
<p>Une <a href="http://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html">java.util.Stream</a> représente une séquence d&#8217;éléments sur lesquels une ou plusieurs opérations peuvent être effectuées. On trouve plusieurs types d&#8217;opérations, des opérations intermédiaires (map, filter&#8230;&#8203;) qui retournent le stream et des opérations terminales comme reduce, count&#8230;&#8203; qui retourne un résultat. Toutes les opérations intermédiaires ne déclenchent pas de calcul, elles placent différents indicateurs pour indiquer si la collection est triée, absence de doublon, taille&#8230;&#8203; pour faciliter le travail ultérieur.</p>
</div>
<div class="paragraph">
<p>Une Stream peut être définie de plusieurs manières</p>
</div>
<div class="ulist">
<ul>
<li>
<p>à partir d&#8217;une Collection <a href="http://docs.oracle.com/javase/8/docs/api/java/util/Collection.html#stream--">voir api</a></p>
</li>
<li>
<p>à partir d&#8217;un tableau <a href="http://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html#stream-long:A-">voir api</a></p>
</li>
<li>
<p>de la factory Stream (exemple Stream.of("a","b","c")</p>
</li>
<li>
<p>d&#8217;une String <a href="http://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html#chars--">voir api</a></p>
</li>
<li>
<p>d&#8217;un BufferedReader <a href="http://docs.oracle.com/javase/8/docs/api/java/io/BufferedReader.html#lines--">voir api</a></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Si on revient à notre besoin initial de vouloir calculer la moyenne d&#8217;âge des personnes de plus de 20 ans on peut écrire le code suivante</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450527.1753"><span class="hljs-type">double</span> <span class="hljs-variable">moyenne</span> <span class="hljs-operator">=</span> persons.stream()
                        .filter(person <span class="hljs-meta">@LAMBDA</span> person.getAge() <span class="hljs-meta">@GT</span>= <span class="hljs-number">20</span>)
                        .mapToInt(person <span class="hljs-meta">@LAMBDA</span> person.getAge())
                        .average()
                        .getAsDouble();</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450527.1753')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_paralléliser_les_traitements_pas_aussi_simple">Paralléliser les traitements pas aussi simple ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Sur l&#8217;API Collection vous pouvez utiliser soit la méthode stream() soit parallelStream() pour lancer des traitements en parallèle.</p>
</div>
<div class="paragraph">
<p>Il faut faire attention à ce que les opérations de réductions soient bien associatives . Aie&#8230;&#8203; des souvenirs de math&#8230;&#8203; Pour faire simple une opération <strong>õ</strong> est associative si
@backtick@<em>(x õ y) õ z = x õ (y  õ z)@backtick@</em>. Par exemple l&#8217;addition est associative mais le carré d&#8217;un nombre ne l&#8217;est pas.</p>
</div>
<div class="paragraph">
<p>Comme nous n&#8217;avons aucune erreur de compilation et que le résultat est aléatoire nous pouvons avoir des surprises. Au niveau de la parallélisation il faut également faire attention aux états.</p>
</div>
<div class="paragraph">
<p>En fonction des traitements que vous effectuez, les paralléliser peut entraîner une dégradation des performances plutôt qu&#8217;une amélioration.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_les_méthodes_par_défaut_dans_les_interfaces">Les méthodes par défaut dans les interfaces</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Un peu plus haut j&#8217;ai indiqué que nous trouvions une nouvelle méthode dans l&#8217;API Collection au niveau de l&#8217;interface principale. Mais si on ajoute une méthode toutes les implémentations doivent implémenter cette méthode&#8230;&#8203; En faisant cela, on viole une règle de base de Java assurant une rétrocompatibilité.</p>
</div>
<div class="paragraph">
<p>Il a fallu inventer un nouveau concept, les default methods. Elles permettent de déclarer une méthode dans une interface et proposer une implémentation par défaut qui sera exécutée si elle n&#8217;est pas surcharger. Prenons par exemple l&#8217;interface Collection on trouve une nouvelle méthode</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450527.4453"><span class="hljs-keyword">default</span> Stream<span class="hljs-meta">@LTE</span><span class="hljs-meta">@GT</span> stream() {
    <span class="hljs-keyword">return</span> StreamSupport.stream(spliterator(), <span class="hljs-literal">false</span>);
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450527.4453')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si on réfléchit, par ce principe on est train d&#8217;introduire l&#8217;héritage multiple dans le langage&#8230;&#8203; Prenons l&#8217;exemple de deux interfaces et une implémentation</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450527.0823"><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">A</span> {
    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">a</span><span class="hljs-params">()</span>;
}
<span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">A</span> {
    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">a</span><span class="hljs-params">()</span>;
}
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">C</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">A</span>,B {
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">a</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450527.0823')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Dans ce cas nous n&#8217;avons pas de problème mais si on transforme la méthode en default method que ce passe t&#8217;il pour la classe C si la méthode n&#8217;est pas surchargée ?</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450528.8574"><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">A</span> {
    <span class="hljs-keyword">default</span> <span class="hljs-keyword">public</span> String <span class="hljs-title function_">a</span><span class="hljs-params">()</span> { <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;a&quot;</span>;}
}
<span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">B</span> {
    <span class="hljs-keyword">default</span> <span class="hljs-keyword">public</span> String <span class="hljs-title function_">a</span><span class="hljs-params">()</span> { <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;b&quot;</span>;}
}

<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">C</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">A</span>,B {

}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450528.8574')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Dans ce cas nous aurons une erreur de la part du compilateur afin de lever toute ambiguïté. Vous devrez soit surcharger la méthode dans la classe C et appeler celle que vous voulez, soit faire hériter A de B.</p>
</div>
<div class="paragraph">
<p>Nous avions déjà de l&#8217;héritage multiple au niveau des types. Cette nouvelle fonctionnalité l&#8217;amène au niveau des implémentations. Mais Java n&#8217;ira pas au delà et il n&#8217;y aura pas d&#8217;héritage multiple au niveau des états.</p>
</div>
<div class="paragraph">
<p>Les default method ont un réel intérêt quand vous définissez une API. Prenons les exemples des Listeners ou bien souvent nous sommes obligés de définir des implémentations de base pour éviter de surcharger le code. Tout ces artifices pourront être contournés</p>
</div>
<div class="paragraph">
<p>Vous pouvez aussi à partir de Java 8 définir des méthodes static dans les interfaces. Ceci facilitera la mise à disposition de classe Helper dans une API. Par exemple si je prends l&#8217;interface Stream</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450529.4956"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span><span class="hljs-meta">@LTT</span><span class="hljs-meta">@GT</span> Stream<span class="hljs-meta">@LTT</span><span class="hljs-meta">@GT</span> empty() {
    <span class="hljs-keyword">return</span> StreamSupport.stream(Spliterators.<span class="hljs-meta">@LTT</span><span class="hljs-meta">@GTemptySpliterator()</span>, <span class="hljs-literal">false</span>);
}
<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span><span class="hljs-meta">@LTT</span><span class="hljs-meta">@GT</span> Stream<span class="hljs-meta">@LTT</span><span class="hljs-meta">@GT</span> of(T t) {
    <span class="hljs-keyword">return</span> StreamSupport.stream(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Streams</span>.StreamBuilderImpl<span class="hljs-meta">@LT</span><span class="hljs-meta">@GT(t)</span>, <span class="hljs-literal">false</span>);
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450529.4956')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_optional">Optional</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Les optionals sont un nouveau concept pour éviter les NullPointerException. Optional est un simple conteneur qui contiendra soit une valeur, soit null.</p>
</div>
<div class="paragraph">
<p>Par exemple quand vous faites une réduction d&#8217;un ensemble</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450529.6387">Optional<span class="hljs-meta">@LTInteger</span><span class="hljs-meta">@GT</span> sum =  persons.stream()
                                .map(person <span class="hljs-meta">@LAMBDA</span> person.getAge())
                                .filter(age <span class="hljs-meta">@LAMBDA</span> age<span class="hljs-meta">@GT</span>=<span class="hljs-number">20</span>)
                                .reduce((age1, age2) <span class="hljs-meta">@LAMBDA</span> age1+age2);</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450529.6387')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_variables_ou_paramètres_préfixées_par_final">Variables ou paramètres préfixées par final</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Avec Java 8 vous n&#8217;avez plus besoin de déclarer vos variables ou paramètres en final si vous les utiliser dans une classe interne. Ceci vous évitera de vous poser la question de savoir s&#8217;il faut mettre un final ou non.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_collectors">Collectors</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Pour terminer ce voyage dans les arcanes de Java 8 il est important de parler des Collectors. Les Collectors offrent tout un tas d&#8217;utilitaire pour effectuer des réductions d&#8217;ensemble un peu plus avancées. Prenons plusieurs exemples</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450530.7507"><span class="hljs-comment">//Age moyen des personnes de plus de 20 ans</span>
<span class="hljs-type">double</span> <span class="hljs-variable">moyenne</span> <span class="hljs-operator">=</span> persons.stream()
        .filter(person <span class="hljs-meta">@LAMBDA</span> person.getAge() <span class="hljs-meta">@GT</span>= <span class="hljs-number">20</span>)
        .collect(Collectors.averagingInt(Person::getAge));</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450530.7507')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>donnera 42.5</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450530.0684"><span class="hljs-comment">//map repartissant les personnes par age</span>
Map<span class="hljs-meta">@LTInteger</span>, List<span class="hljs-meta">@LTPerson</span><span class="hljs-meta">@GT</span><span class="hljs-meta">@GT</span> repartition =  persons.stream()
        .filter(person <span class="hljs-meta">@LAMBDA</span> person.getAge() <span class="hljs-meta">@GT</span>= <span class="hljs-number">20</span>)
        .collect(Collectors.groupingBy(Person::getAge));</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450530.0684')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>donnera {50=[com.javamind.domain.Person@122bbb7, com.javamind.domain.Person@1a4555e], 70=[com.javamind.domain.Person@30f1c0], 60=[com.javamind.domain.Person@1ed3c8d]}</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912450530.8835"><span class="hljs-comment">//map repartissant les personnes par age selon leur nom</span>
        Map<span class="hljs-meta">@LTInteger</span>, List<span class="hljs-meta">@LTString</span><span class="hljs-meta">@GT</span><span class="hljs-meta">@GT</span> repartition2 =  persons.stream()
                .filter(person <span class="hljs-meta">@LAMBDA</span> person.getAge() <span class="hljs-meta">@GT</span>= <span class="hljs-number">20</span>)
                .collect(Collectors.groupingBy(Person::getAge,
                    Collectors.mapping(
                       person<span class="hljs-meta">@LAMBDAperson</span>.getName(), Collectors.toList())));</code><button class="btn-copy-code" onclick="copyToClipboard('1732912450530.8835')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>donnera {50=[Elysabeth, François], 20=[Sophie], 70=[Paul], 25=[Céline], 60=[Robert], 30=[Emilie]}</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>L&#8217;objectif principal de Java 8 est le gain de performance. Cette nouvelle version va vraiment révolutionner la manière de programmer et l&#8217;apport sera aussi grand que ce que les generics ont pu apporter en Java5. De nombreuses équipes ont migré vers Java 6 ou Java 7, sans vraiment changer ni leur code existant, ni leurs habitudes de programmation. Là, le travail ne va pas être simple pour les développeurs expérimentés car il va falloir “désapprendre” ce que l’on sait, et à apprendre de nouvelles manières de faire les choses.</p>
</div>
<div class="paragraph">
<p>Si vous voulez suivre José en video plusieurs supports sont disponibles sur le site de Youtube. Vous pouvez aussi lire son interview réalisée par les <a href="http://www.duchess-france.org/le-lambda-tour-de-jose-paumard/">DuchessFrance</a>. José met également à disposition différents exemples sur son compte <a href="https://github.com/JosePaumard/jdk8-lambda-tour">github</a>.</p>
</div>
</div>
</div>`;