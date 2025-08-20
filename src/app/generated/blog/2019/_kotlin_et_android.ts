export const _kotlin_et_android:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_kotlin_simplifie_la_syntaxe">Kotlin simplifie la syntaxe</a></li>
<li><a class="link" fragment="#_null_safety">Null safety</a></li>
<li><a class="link" fragment="#_immutabilité">Immutabilité</a></li>
<li><a class="link" fragment="#_valeurs_par_défaut">Valeurs par défaut</a></li>
<li><a class="link" fragment="#_classes">Classes</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_classes_pojo">Classes POJO</a></li>
<li><a class="link" fragment="#_classes_internes">Classes internes</a></li>
<li><a class="link" fragment="#_classes_anonymes">Classes anonymes</a></li>
</ul>
</li>
<li><a class="link" fragment="#_extensions_de_fonction">Extensions de fonction</a></li>
<li><a class="link" fragment="#_fonctions_dordre_supérieur">Fonctions d’ordre supérieur</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_exemple_dans_le_langage">Exemple dans le langage</a></li>
<li><a class="link" fragment="#_ecrire_un_dsl">Ecrire un DSL</a></li>
<li><a class="link" fragment="#_android">Android</a></li>
</ul>
</li>
<li><a class="link" fragment="#_coroutines">Coroutines</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_conclusion">Conclusion</a></li>
</ul>
</li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>En 2017 une grande annonce a été faite à <a href="https://www.youtube.com/watch?v=fPzxfeDJDzY&amp;list=PLWz5rJ2EKKc-odHd6XEaf7ykfsosYyCKp&amp;index=51&amp;t=0s">Google IO</a>. Le langage <a href="https://kotlinlang.org/">Kotlin</a> devenait le deuxième langage de référence pour développer des applications Android. <a href="https://kotlinlang.org/">Kotlin</a> a été créé par la société <a href="https://www.jetbrains.com/">JetBrains</a>, éditeur de <a href="https://developer.android.com/studio/">Android Studio</a> (IDE de référence pour le développement Android). <a href="https://www.jetbrains.com/">JetBrains</a> collabore depuis plusieurs année avec Google pour toujours améliorer ce studio de développement. Ce studio a été initialement été écrit en Java puis en Kotlin.</p>
</div>
<div class="paragraph">
<p>Pourquoi Google a t&#8217;il fait cette annonce ? Etait ce lié au procès avec la société Oracle sur l&#8217;utilisation de Java ?  Etait ce lié aux possibilités offertes par ce langage ? Etait ce lié aux possibilités offertes par cette collabiration étroite entre les deux sociétés ?</p>
</div>
<div class="paragraph">
<p>Personnellement je pense que Kotlin a été adopté pour toutes ces raisons. <a href="https://kotlinlang.org/">Kotlin</a> a essayé de mêler le meilleur de différents langages et je trouve qu&#8217;il a véritablement redonné un coup de boost aux développeurs Android (moi le premier). Deux ans après, <a href="https://android-developers.googleblog.com/2019/05/kotlin-is-everywhere-join-global-event.html">50% des développeurs Android</a> utilisent Kotlin.</p>
</div>
<div class="paragraph">
<p>En mai à Google I/O 2019, Google a <a href="https://android-developers.googleblog.com/2019/05/google-io-2019-empowering-developers-to-build-experiences-on-Android-Play.html">annoncé</a> une nouvelle étape dans l&#8217;adoption de Kotlin. Les développements Android deviennent Kotlin-first. Google conseille aux développeurs d&#8217;utiliser Kotlin pour les nouveaux développements. En interne, les librairies commencent aussi à être écrite directement en Kotlin. Comme Kotlin est 100% interopérable avec Java ce virage ne va pas pénaliser les projets existants.</p>
</div>
<div class="paragraph">
<p>Dans cet article, nous allons revenir sur les intérêts du langage pour comprendre pourquoi Kotlin est devenu le langage de référence pour les développements Android.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/kotlin_et_android.png" alt="Kotlin et Android">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_kotlin_simplifie_la_syntaxe">Kotlin simplifie la syntaxe</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Quand nous utilisons le langage Java et tout particulièrement quand nous devons écrire une application Android, nous devons écrire beaucoup de code fastidieux. Kotlin met en avant le pragmatisme et la simplicité.</p>
</div>
<div class="paragraph">
<p>La philosophie de Kotlin est :</p>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>Tout ce qui peut être déduit par le compilateur, n&#8217;a pas besoin d&#8217;être écrit par le développeur.</p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>Prenons l&#8217;exemple d&#8217;une classe Java permettant d&#8217;être exécutée et d&#8217;afficher un message <code>Hello World</code>.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669475039.3296"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">HelloWorld</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> {
        <span class="hljs-type">String</span> <span class="hljs-variable">name</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;Dev-Mind&quot;</span>;
        System.out.println(<span class="hljs-string">&quot;Hello world &quot;</span> + name);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475039.3296')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>En Kotlin vous pouvez faire la même chose en écrivant</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475039.4744"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">val</span> name = <span class="hljs-string">&quot;Dev-Mind&quot;</span>
    println(<span class="hljs-string">&quot;Hello world @dollar@name&quot;</span>)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475039.4744')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>La visibilité <code>public</code> est celle par défaut et donc plus besoin de la définir à chaque fois</p>
</li>
<li>
<p>Vous pouvez écrire des fonctions non attachées à une classe (le compilateur le fera pour vous)</p>
</li>
<li>
<p>Les points virgules ne sont plus nécéssaires</p>
</li>
<li>
<p>Kotlin fait beaucoup d&#8217;inférence de type et vous n&#8217;avez pas besoin de définir le type si le compilateur peut le déduire (exemple du name)</p>
</li>
<li>
<p>Vous pouvez utiliser des templates de String et directement accéder au contenu d&#8217;une variable avec <code>@dollar@</code></p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_null_safety">Null safety</h2>
<div class="sectionbody">
<div class="paragraph">
<p>L&#8217;erreur la plus courante pour un développeur Java, est de se retrouver avec un programme qui plante suite à une exception <code>Null Pointer Exception</code>. En Java, un objet non alloué à une référence nulle. En Kotlin le null est interdit. Vous aurez une erreur de compilation si vous déclarer un objet et que ce dernier n&#8217;est pas initilialisé. Si vraiment vous voulez gérer une valeur nulle, tout le système de type a été doublé et vous pouvez ajouter <code>?</code> à un type pour dire qu&#8217;une valeur peut être nulle</p>
</div>
<div class="paragraph">
<p>Par exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475039.3179"><span class="hljs-keyword">var</span> name:String         <span class="hljs-comment">// Erreur de compilation</span>
<span class="hljs-keyword">var</span> name:String = <span class="hljs-literal">null</span>  <span class="hljs-comment">// Erreur de compilation</span>
<span class="hljs-keyword">var</span> name = <span class="hljs-string">&quot;Dev-Mind&quot;</span>   <span class="hljs-comment">// Valide et pas besoin de définir un type car le compilateur peut le deviner</span>
<span class="hljs-keyword">var</span> name:String? = <span class="hljs-literal">null</span> <span class="hljs-comment">// Valide car on utilise le type String? qui veut dire String nullable</span></code><button class="btn-copy-code" onclick="copyToClipboard('1755669475039.3179')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Au premier abord, cette fonctionnalité peut paraître contraignante mais c&#8217;est un réel plaisir à l&#8217;utiliser et ceci évite bon nombre de bugs d&#8217;inadvertance.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_immutabilité">Immutabilité</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Une autre force de Kotlin est de préconiser l&#8217;immutabilité. Quand vous définissez une valeur avec le mot clé <code>val</code> elle est non mutable. Si vous voulez changer une référence plus tard vous devrez utiliser le mot clé <code>var</code>.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475039.118"><span class="hljs-keyword">val</span> name = <span class="hljs-string">&quot;Dev-Mind&quot;</span>
name = <span class="hljs-string">&quot;Guillaume&quot;</span>      <span class="hljs-comment">// Erreur de compilation car immutable</span>

<span class="hljs-keyword">var</span> name2 = <span class="hljs-string">&quot;Dev-Mind&quot;</span>
name2 = <span class="hljs-string">&quot;Guillaume&quot;</span>     <span class="hljs-comment">// OK car mutable</span></code><button class="btn-copy-code" onclick="copyToClipboard('1755669475039.118')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Kotlin implémente les API Java pour les listes mais distingue les listes mutables et non mutables. Par défaut tout est immutable. Si vous voulez une liste mutable vous devez le préciser</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475039.5935"><span class="hljs-keyword">val</span> names = listOf(<span class="hljs-string">&quot;Dev-Mind&quot;</span>, <span class="hljs-string">&quot;Guillaume&quot;</span>)
names.add(<span class="hljs-string">&quot;NewName&quot;</span>)    <span class="hljs-comment">// Erreur de compilation car add n&#x27;existe pas sur une liste immutable</span>


<span class="hljs-keyword">val</span> names = mutableListOf(<span class="hljs-string">&quot;Dev-Mind&quot;</span>, <span class="hljs-string">&quot;Guillaume&quot;</span>)
names.add(<span class="hljs-string">&quot;NewName&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475039.5935')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Même si Kotlin distingue les listes mutables et non mutables, Kotlin n&#8217;a pas réinventé de nouvelles classes pour gérer les listes. Kotlin s&#8217;appuie sur les types existants Java.</p>
</div>
<div class="paragraph">
<p>Kotlin vous pousse à appliquer des principes de la programmation fonctionnelle (dont l&#8217;immutabilité) pour le plus grand bien de votre code.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_valeurs_par_défaut">Valeurs par défaut</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Kotlin vous permet de préciser des valeurs par défaut à vos différents paramètres de vos méthodes</p>
</div>
<div class="paragraph">
<p>Par exemple avec le code suivant,</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475039.3606"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">formatDate</span><span class="hljs-params">(string: <span class="hljs-type">Date</span>, format: <span class="hljs-type">String</span> = <span class="hljs-string">&quot;yyyy-MM-dd&quot;</span>, addDay: <span class="hljs-type">Int</span> =<span class="hljs-number">0</span>)</span></span> : String</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475039.3606')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>vous pouvez avoir différentes manières d&#8217;appeler cette méthode</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475040.8186">formatDate(Date())              <span class="hljs-comment">// On ne précise pas les valeurs si celles par défaut sont suffisantes</span>
formatDate(Date(), <span class="hljs-string">&quot;yyyy&quot;</span>)      <span class="hljs-comment">// Dans mon cas je ne change que la deuxième valeur</span>
formatDate(Date(), addDay = <span class="hljs-number">2</span>)  <span class="hljs-comment">// Si je veux préciser une valeur particulière je peux u tiliser les paramètres nommés</span></code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.8186')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Les paramètres nommés (comme sur la dernière ligne de notre exemple) sont très pratiques quand vous voulez apporter plus de lisibilité à votre code. Par exemple si vous avez la méthode suivante</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475040.4468"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findSpeaker</span><span class="hljs-params">(firstname: <span class="hljs-type">String</span>, lastname: <span class="hljs-type">String</span>)</span></span>: Speaker</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.4468')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Quand vous appelez votre méthode sans nommer les paramètres vous ne savez jamais si c&#8217;est le nom ou prénom qui est en premier. Il suffit que votre collègue change la signature et inverse l&#8217;ordre des paramètres et vous avez un bug totalement transparent.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475040.3154"><span class="hljs-keyword">val</span> speaker1 = findSpeaker(<span class="hljs-string">&quot;Chet&quot;</span>, <span class="hljs-string">&quot;Haase&quot;</span>)
<span class="hljs-keyword">val</span> speaker1 = findSpeaker(firstname = <span class="hljs-string">&quot;Chet&quot;</span>, lastname = <span class="hljs-string">&quot;Haase&quot;</span>)  <span class="hljs-comment">// les paramètres nommés amènent plus de lisibilité</span></code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.3154')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_classes">Classes</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Les classes sont bien évidemment disponible en Kotlin. Prenons un exemple pour regarder les différences avec les classes Java.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669475040.7556"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Parent</span>{ }</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.7556')">Copy</button></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669475040.6147"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Parent</span>{}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.6147')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>En Java ces deux classes publiques doivent être définies dans 2 fichiers .java différent. En Kotlin vous pouvez écrire le tout dans un seul fichier</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475040.428"><span class="hljs-keyword">open</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Parent</span>

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Child</span> : <span class="hljs-type">Parent</span>()</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.428')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Notez que la classe mère doit être précédée du mot clé <code>open</code>. Par défaut les classes Kotlin sont définies comme <code>public final</code>. Si vous voulez ouvrir une classe à la surcharge, vous devrez le préciser.</p>
</div>
<div class="sect2">
<h3 id="_classes_pojo">Classes POJO</h3>
<div class="paragraph">
<p>Un POJO (Plain Old Java Object) est une simple classe qui va contenir des données. Généralement sur ce type d&#8217;objet</p>
</div>
<div class="ulist">
<ul>
<li>
<p>nous définissons des propriétés private</p>
</li>
<li>
<p>nous générons des constructeurs avec les valeurs obligatoires</p>
</li>
<li>
<p>nous générons des méthodes pour lire et modifier ces propriétés: getter, setter</p>
</li>
<li>
<p>nous générons des méthodes hashcode, equals, copy</p>
</li>
<li>
<p>et parfois nous écrivons aussi des builders pour créer rapidement et partiellement une instance de notre objet</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Si j&#8217;essaie de créer une classe <code>Speaker</code> avec 4 propriétés <code>id</code>, <code>firstname</code>, <code>lastname</code> et <code>age</code> je vais me retrouver avec une classe d&#8217;environ 100 lignes.</p>
</div>
<div class="paragraph">
<p>Kotlin propose les <code>data class</code> pour lesquelles le compilateur va faire tout ce travail de génération pour vous. Le Pojo speaker se résume au code suivant</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475040.3218"><span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Speaker</span>(<span class="hljs-keyword">val</span> firstname: String,
                   <span class="hljs-keyword">val</span> lastname: String,
                   <span class="hljs-keyword">val</span> age: <span class="hljs-built_in">Int</span>? = <span class="hljs-literal">null</span>,
                   <span class="hljs-keyword">val</span> id: String = UUID.randomUUID().toString())</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.3218')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Quand votre classe a un seul constructeur vous pouvez le préciser dans la signature de la classe (comme dans notre classe Speaker). La suppression de tout le code inutile améliore la libilité.</p>
</div>
<div class="paragraph">
<p>Revenons à notre exemple, vous pouvez ainsi écrire</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475040.7432"><span class="hljs-keyword">val</span> s1 = Speaker(<span class="hljs-string">&quot;Chet&quot;</span>, <span class="hljs-string">&quot;Haase&quot;</span>)
<span class="hljs-keyword">val</span> s2 = Speaker(firstname = <span class="hljs-string">&quot;Chet&quot;</span>, lastname = <span class="hljs-string">&quot;Haase&quot;</span>)
<span class="hljs-keyword">val</span> s3 = Speaker(firstname = <span class="hljs-string">&quot;Chet&quot;</span>, lastname = <span class="hljs-string">&quot;Haase&quot;</span>, id = <span class="hljs-string">&quot;123&quot;</span>)

<span class="hljs-keyword">val</span> s4 = s1.copy(age = <span class="hljs-number">999</span>)
<span class="hljs-keyword">val</span> s5 = s1.copy()</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.7432')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Le langage propose aussi la surcharge des opérateurs. L&#8217;opérateur <code>==</code> est surchargé et fait appel à la méthode <code>equals</code>.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475040.0835">s1 == s5   <span class="hljs-comment">// @ARROW renvoie true car Kotlin fait appel à la méthode equals</span>
s1 === s5  <span class="hljs-comment">// @ARROW renverra faux car === permet de comparer des références</span></code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.0835')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_classes_internes">Classes internes</h3>
<div class="paragraph">
<p>Quand vous programmez une application Android en Java, vous utilisez très souvent des classes internes.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475040.4006"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">HelloWorld</span> {

    <span class="hljs-keyword">public</span> String name(){
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;Dev-Mind&quot;</span>;
    }

    <span class="hljs-keyword">class</span> <span class="hljs-title class_">A</span> {
        <span class="hljs-keyword">public</span> void hello(){
            System.<span class="hljs-keyword">out</span>.println(<span class="hljs-string">&quot;Hello world&quot;</span> + name()); <span class="hljs-comment">// NE COMPILE PAS car la méthode name() n&#x27;est pas visible</span>
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.4006')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Les classes internes en Java (<code>inner class</code>) sont non statiques par défaut et vous pouvez donc utiliser les méthodes ou attributs globaux de la classe englobante dans la classe interne. Par exemple dans la classe <code>A</code> je peux utiliser la méthode <code>name()</code> de ma classe englobante <code>HelloWorld</code>.</p>
</div>
<div class="paragraph">
<p>Une classe interne non statique a une référence vers sa classe englobante. Si cette dernière n&#8217;est plus utilisée, le garbage collector ne peut pas faire son travail et la supprimer. En effet elle considérée active (utilisée par la classe interne). Dans un serveur d&#8217;application, quand nous utilisons des singletons ce concept ne pose pas de problème. Dans le monde Android, sur un device avec des ressources limitées, c&#8217;est plus problématique. Surtout si nous utilisons des classes internes dans des objets qui sont très souvent détruits et reconstruits (les activités sont supprimées et recréées après chaque changement de configuration). De nombreux développeurs se font avoir et introduisent des fuites mémoires de cette manière dans leurs applications</p>
</div>
<div class="paragraph">
<p>En Java pour éviter le problème vous devez utiliser des <code>static inner class</code>. En Kotlin quand vous créez une nested class vous n&#8217;avez pas accès aux variables et méthodes de la classe (équivalent d&#8217;une classe interne statique)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475040.0151"><span class="hljs-keyword">class</span> <span class="hljs-title class_">HelloWorld</span> {

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">name</span><span class="hljs-params">()</span></span> = <span class="hljs-string">&quot;Dev-Mind&quot;</span>

    <span class="hljs-keyword">class</span> <span class="hljs-title class_">A</span> {
        <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">hello</span><span class="hljs-params">()</span></span> {
            println(<span class="hljs-string">&quot;Hello world&quot;</span> + name())
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.0151')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez tout de même créer l&#8217;équivalent d&#8217;une inner class en utilisant la syntaxe <code>internal inner class</code>. Une fois encore le langage a pris le parti de simplifier le cas d&#8217;utilisation le plus courant.</p>
</div>
</div>
<div class="sect2">
<h3 id="_classes_anonymes">Classes anonymes</h3>
<div class="paragraph">
<p>En Android nous écrivons souvent des classes anonymes. Par exemple à chaque fois que nous écrivons un listener d&#8217;événement. Nous avons le même problème de référence entre la classe englobante et la classe anonyme.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475040.2732">button.setOnClickListener{
      <span class="hljs-comment">// votre code</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.2732')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Kotlin ne propose pas de solution dans ce cas, mais vous devez garder conscience que vous devrez toujours casser cette référence à la classe englobante quand l&#8217;objet sera arrêté ou recyclé.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475040.4348"><span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onStop</span><span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">super</span>.onStop()
    button.setOnClickListener(<span class="hljs-literal">null</span>)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475040.4348')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_extensions_de_fonction">Extensions de fonction</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Quand nous programmons nous utilisons de nombreuses librairies externes sur lesquelles nous n&#8217;avons pas la main. Prenons un cas d&#8217;utilisation. Nous somme l&#8217;INSEE et nous devons faire des statistiques par âge</p>
</div>
<div class="paragraph">
<p>Un citoyen est défini par la data class suivante</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475041.3638"><span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Citizen</span>(<span class="hljs-keyword">val</span> inseeNumber: String,
                   <span class="hljs-keyword">val</span> firstname: String,
                   <span class="hljs-keyword">val</span> lastname: String,
                   <span class="hljs-keyword">val</span> sexe: Sexe,
                   <span class="hljs-keyword">val</span> birthdate: LocalDate)</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475041.3638')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour déterminer l&#8217;âge vous pouvez écrire une classe utilitaire</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475041.4832"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">getAge</span><span class="hljs-params">(date: <span class="hljs-type">LocalDate</span>)</span></span> = LocalDate.now().year - date.year</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475041.4832')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Avec Kotlin vous pouvez aussi étendre la classe <code>LocalDate</code> et créer une nouvelle méthode (extension de fonction) qui vous sera propre et que vous pourrez utiliser dans tout votre projet. Par exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475041.916"><span class="hljs-function"><span class="hljs-keyword">fun</span> LocalDate.<span class="hljs-title">getAge</span><span class="hljs-params">()</span></span> = LocalDate.now().year - <span class="hljs-keyword">this</span>.year

<span class="hljs-comment">// Ce qui permet d&#x27;écrire</span>
LocalDate.parse(<span class="hljs-string">&quot;1977-01-01&quot;</span>).getAge()</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475041.916')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Mieux au lieu d&#8217;exposer une fonction vous pouvez exposer une propriété</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475041.76"><span class="hljs-keyword">val</span> LocalDate.age
    <span class="hljs-keyword">get</span>() = LocalDate.now().year - <span class="hljs-keyword">this</span>.year

<span class="hljs-comment">// Ce qui permet d&#x27;écrire</span>
LocalDate.parse(<span class="hljs-string">&quot;1977-01-01&quot;</span>).age</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475041.76')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Prenons un autre exemple lié à Android. Très souvent quand nous créons une application, nous surchargeons l&#8217;objet <code>Application</code> Android pour créer notre propre instance. Pour éviter les cast à répétition dans les activités vous pouvez écrire</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475041.4617"><span class="hljs-keyword">class</span> <span class="hljs-title class_">DevMindApplication</span> : <span class="hljs-type">Application</span>() {
   <span class="hljs-comment">// code...</span>
}
<span class="hljs-keyword">val</span> AppCompatActivity.devmindApp
    <span class="hljs-keyword">get</span>() = <span class="hljs-keyword">this</span>.application <span class="hljs-keyword">as</span> DevMindApplication</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475041.4617')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Ainsi dans vos activités vous pouvez directement faire appel à votre instance de l&#8217;application en utilisant <code>devmindApp</code>.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_fonctions_dordre_supérieur">Fonctions d’ordre supérieur</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Une fonction d&#8217;ordre supérieure est une fonction qui prend une fonction comme argument.</p>
</div>
<div class="paragraph">
<p>Dans ce cas vous n&#8217;avez pas besoin de passer une lambda lors de l&#8217;appel à la méthode mais vous pouvez ajouter un bloc d&#8217;exécution juste après l&#8217;appel de la méthode</p>
</div>
<div class="paragraph">
<p>Dit comme ça vous devez être perdu et c&#8217;est normal</p>
</div>
<div class="sect2">
<h3 id="_exemple_dans_le_langage">Exemple dans le langage</h3>
<div class="paragraph">
<p>Kotlin s&#8217;est servi des fonctions d&#8217;ordre supérieur (et des extension) pour simplifier l&#8217;utilisation des stream Java</p>
</div>
<div class="listingblock">
<div class="title">Issu de kotlin.collections</div>
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475041.4924"><span class="hljs-keyword">public</span> <span class="hljs-keyword">inline</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> @LTT@GT Iterable@LTT@GT.<span class="hljs-title">find</span><span class="hljs-params">(predicate: (<span class="hljs-type">T</span>) @<span class="hljs-type">LAMBDA</span> <span class="hljs-type">Boolean</span>)</span></span>: T? {
    <span class="hljs-keyword">return</span> firstOrNull(predicate)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475041.4924')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si nous avons une collection de speakers nous pouvons sélectionner le premier qui a le prénom Guillaume via ce code</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475041.9282"><span class="hljs-keyword">val</span> guillaume = speakers.firstOrNull {
    it.firstname == <span class="hljs-string">&quot;Guillaume&quot;</span>  <span class="hljs-comment">// it correpond à l&#x27;item en cours</span>
}

<span class="hljs-comment">// Vous auriez pu aussi écrire</span>
<span class="hljs-keyword">val</span> guillaume = speakers.firstOrNull { speaker <span class="hljs-meta">@LAMBDA</span>
    speaker.firstname == <span class="hljs-string">&quot;Guillaume&quot;</span>
}

<span class="hljs-comment">// Ici la syntaxe Java (où vous passez une lambda provoque une erreur de compilation)</span>
<span class="hljs-keyword">val</span> guillaume = speakers.firstOrNull(speaker <span class="hljs-meta">@LAMBDA</span> speaker.firstname == <span class="hljs-string">&quot;Guillaume&quot;</span>) <span class="hljs-comment">// ne compile pas</span></code><button class="btn-copy-code" onclick="copyToClipboard('1755669475041.9282')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>En Java, pour rappel vous auriez écrit</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475041.248"><span class="hljs-keyword">val</span> guillaumeSpeakers = speakers.stream()
                                .filter(s <span class="hljs-meta">@LAMBDA</span> s.getFirstname().equals(<span class="hljs-string">&quot;Guillaume&quot;</span>))
                                .findFirst()
                                .orElse(<span class="hljs-literal">null</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475041.248')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>L&#8217;API Stream Java est très agréable à utiliser, mais les collections et les fonctions d&#8217;extensions Kotlin le sont encore plus.</p>
</div>
</div>
<div class="sect2">
<h3 id="_ecrire_un_dsl">Ecrire un DSL</h3>
<div class="paragraph">
<p>Kotlin est de plus en plus connu pour la souplesse offerte pour écrire un DSL avec un typage fort. <a href="https://github.com/gradle/kotlin-dsl">Gradle</a> est en train par exemple de remplacer Groovy par Kotlin pour avoir un DSL plus puissant</p>
</div>
<div class="paragraph">
<p>Un exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475041.362"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Cell</span>(<span class="hljs-keyword">val</span> content: String)

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Row</span>(<span class="hljs-keyword">val</span> cells: <span class="hljs-symbol">MutableList@</span><span class="hljs-symbol">LTCell@</span>GT = mutableListOf()) {
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">cell</span><span class="hljs-params">(adder: () @<span class="hljs-type">LAMBDA</span> <span class="hljs-type">Cell</span>)</span></span>: Row {
        cells.add(adder())
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
    }
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Table</span>(<span class="hljs-keyword">val</span> rows: <span class="hljs-symbol">MutableList@</span><span class="hljs-symbol">LTRow@</span>GT = mutableListOf()) {
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">row</span><span class="hljs-params">(adder: () @<span class="hljs-type">LAMBDA</span> <span class="hljs-type">Row</span>)</span></span>: Table {
        rows.add(adder())
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475041.362')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Dans ma classe <code>Table</code> j&#8217;ai ajouté une fonction <code>row</code> (avec une fonction en argument) qui permet d&#8217;ajouter une ligne. La même chose a été faite dans la classe <code>Row</code> pour une cellule. Du coup je peux écrire</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475041.97"><span class="hljs-keyword">val</span> table = Table()
    .row { Row().cell { Cell(<span class="hljs-string">&quot;Test&quot;</span>) }}
    .row { Row().cell { Cell(<span class="hljs-string">&quot;Test2&quot;</span>) }}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475041.97')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_android">Android</h3>
<div class="paragraph">
<p>Android bénéficie beaucoup des fonctions d&#8217;ordre supérieur et des extensions. Ces fonctionnalités du langage ont permis de considérablement simplfier le langage. Prenons des exemples</p>
</div>
<div class="paragraph">
<p>Ecriture d&#8217;un listener d&#8217;événement</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475041.6387">itemView.setOnClickListener {
     <span class="hljs-comment">// Code du listener directement</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475041.6387')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Quand vous devez itérer et enchainer l&#8217;appel à plusieurs setters d&#8217;un objet</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475041.9307">holder.speakerName.text = user.fullname
holder.speakerBio.text = user.descriptionFr
holder.speakerBirthday.text = user.birthday

<span class="hljs-comment">// @ARROW devient</span>
holder.apply {
    speakerName.text = user.fullname
    speakerBio.text = user.descriptionFr
    speakerBirthday.text = user.birthday
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475041.9307')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Et il y a des dizaines d&#8217;autres exemples.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_coroutines">Coroutines</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Une coroutine est un bloc de traitement qui permet d&#8217;exécuter du code non bloquant en asynchrone. C&#8217;est un thread allégé. Vous pouvez lancer plein de couroutines sur un même thread. Vous pouvez aussi démarrer un traitement sur un thread et finir son exécution sur un autre.</p>
</div>
<div class="paragraph">
<p>Commençons par faire un rappel sur le développement Android. Quand une application est lancée, elle est lancée sur un thread principal. On parle de main thread ou UI thread. En effet le rendering, les événements, les appels systèmes sont gérés sur ce thread.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2019/android_thread.png" alt="Android Main Thread">
</div>
</div>
<div class="paragraph">
<p>Si vous lancez un traitement métier plus ou moins long (calcul, récupération de données, accès à une base), vous ne devez pas encombrer ce thread principal pour ne pas bloquer l&#8217;utilisateur. Par exemple si vous lancez une requête base de données, tout est figé tant que la réponse n&#8217;est pas traitée. Android est d&#8217;ailleurs intolérable la dessus. Si votre application bloque le thread principal, le système killera votre application.</p>
</div>
<div class="paragraph">
<p>Sans Kotlin, vous devez lancer tous les traitements plus ou moins longs dans un autre thread. Et quand vous avez un résultat vous devez interagir avec la vue dans le thread principal pour que les données soient actualisées. Niveau code vous devez écrire un bon nombre de ligne pour écrire tout ça.</p>
</div>
<div class="paragraph">
<p>En Kotlin vous pouvez passer par les Coroutines. Dans l&#8217;exemple si dessous nous déclarons une activité qui va lancé un accès à la base dans une coroutine et quand le résultat est là nous nous raccrochons au thread principal pour mettre à jour la vue.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669475042.4768"><span class="hljs-comment">// Votre activité implemente l&#x27;interface CoroutineScope</span>
<span class="hljs-keyword">open</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MyActivity</span> : <span class="hljs-type">AppCompatActivity</span>(), CoroutineScope {

   <span class="hljs-comment">// Si vous lancez votre coroutine vous devez indiquer dans quel thread elle sera lancé. Par défaut un nouveau</span>
   <span class="hljs-keyword">override</span> <span class="hljs-keyword">val</span> coroutineContext: CoroutineContext
       <span class="hljs-keyword">get</span>() = Dispatchers.Default

   <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
       <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)

       <span class="hljs-comment">// ...</span>

       <span class="hljs-comment">// Lancement de la coroutine</span>
       launch {

          <span class="hljs-comment">// Vous faites un traitement plus ou moins long (appel base de données)</span>
		  <span class="hljs-keyword">val</span> speaker = speakerDao.readOne(speakerUiid)

          <span class="hljs-comment">// Quand vous avez un résultat vous vous rattachez au thread principal</span>
          <span class="hljs-comment">// pour mettre à jour la vue</span>
		  withContext(Dispatchers.Main){
             speaker.apply {
                  speakerLastname.text = speaker.lastname
                  speakerCountry.text = speaker.country
             }
          }
 	   }
   }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669475042.4768')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Les couroutines simplifient tous les appels acynchrones, ou les appels synchrones pouvant être longs de votre application. Le code est plus restreint, plus lisible mais aussi plus performant car les couroutines sont beaucoup plus légères qu&#8217;un thread.</p>
</div>
<div class="sect2">
<h3 id="_conclusion">Conclusion</h3>
<div class="paragraph">
<p>J&#8217;ai essayé de vous montrer dans cet article pourquoi Kotlin est bien plus qu&#8217;une alternative à Java pour l&#8217;écriture des applications Android.</p>
</div>
<div class="paragraph">
<p>Je vous conseille cette <a href="https://www.youtube.com/watch?v=UhDtYFt64HM">vidéo</a> de Jean Baptiste Nizet qui montre l&#8217;intérêt de ce que je viens de dire en livecoding (sauf l&#8217;aspect coroutine).</p>
</div>
<div class="paragraph">
<p>Personnellement je pense que le langage Java va petit à petit disparaître sur Android. Si vous voulez utiliser Kotlin en dehors d&#8217;Android vous pouvez le faire sans problème. Kotlin fait aussi partie des langages supportés par le framework Spring.</p>
</div>
<div class="paragraph">
<p>Pour plus d&#8217;informations sur Kotlin &amp; Android vous pouvez aller sur <a href="https://developer.android.com/kotlin/" class="bare">https://developer.android.com/kotlin/</a></p>
</div>
</div>
</div>
</div>`;