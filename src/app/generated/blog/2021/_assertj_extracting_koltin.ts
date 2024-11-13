export const _assertj_extracting_koltin:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_méthode_extracting_en_java">Méthode <code>extracting</code> en Java</a></li>
<li><a class="link" fragment="#_méthode_extracting_en_kotlin">Méthode <code>extracting</code> en Kotlin</a></li>
<li><a class="link" fragment="#_le_langage_kotlin_à_la_rescousse">Le langage Kotlin à la rescousse</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Lorsque je veux faire des assertions dans mes tests unitaires en Java, j&#8217;utilise la librairie <a href="https://assertj.github.io/doc/">AssertJ</a>.
Cette librairie offre une "fluent API" pour rendre lisible vos tests unitaires.</p>
</div>
<div class="paragraph">
<p>Je vais me focaliser aujourd&#8217;hui sur la méthode <code>extracting</code> de AssertJ qui permet de tester les propriétés d&#8217;un objet ou d&#8217;une liste d&#8217;objets.
Je vais surtout parler des limitations quand on veut utiliser cette méthode sur des tests écrits en Kotlin</p>
</div>
<div class="paragraph">
<p>Si par exemple nous avons un objet Talk avec un identifiant, un nom et une liste d&#8217;identifiants de speaker.
En Kotlin cet objet se définit de cette manière</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731527923899.9033"><span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Talk</span>(<span class="hljs-keyword">val</span> id: <span class="hljs-built_in">Long</span>, <span class="hljs-keyword">val</span> name: String, <span class="hljs-keyword">val</span> speakerIds: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTLong@</span>GT)</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923899.9033')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_méthode_extracting_en_java">Méthode <code>extracting</code> en Java</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Regardons maintenant comment utiliser cette méthode dans un test écrit en Java</p>
</div>
<div class="paragraph">
<p>Exemple pour un objet</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731527923900.2615"><span class="hljs-meta">@Test</span>
void extractPropertyOnObject() {
    Talk talk = new Talk(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, asList(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>));
    assertThat(talk)
        .extracting(Talk::getId, Talk::getName, Talk::getSpeakerIds)
        .containsExactly(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, asList(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>));
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923900.2615')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Exemple pour une liste d&#8217;objets</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731527923902.5"><span class="hljs-meta">@Test</span>
void extractPropertyOnList() {
    <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTTalk@</span>GT talks = asList(
        new Talk(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, asList(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>)),
        new Talk(<span class="hljs-number">2L</span>, <span class="hljs-string">&quot;Other talk&quot;</span>, asList(<span class="hljs-number">14L</span>))
    );
    assertThat(talks).extracting(Talk::getId, Talk::getName, Talk::getSpeakerIds)
        .containsExactly(
            Tuple.tuple(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, asList(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>)),
            Tuple.tuple(<span class="hljs-number">2L</span>, <span class="hljs-string">&quot;Other talk&quot;</span>, asList(<span class="hljs-number">14L</span>))
        );
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923902.5')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_méthode_extracting_en_kotlin">Méthode <code>extracting</code> en Kotlin</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Passons maintenant à Kotlin, le compilateur limite l&#8217;utilisation des références de fonction à cause de l&#8217;API.
En effet si nous voulons utiliser plusieurs référence de fonction nous avons une erreur "None of the following functions can be called with the arguments supplied" Le problème est référencé <a href="https://github.com/assertj/assertj-core/issues/1499">ici</a> mais il ne sera pas résolu.</p>
</div>
<div class="paragraph">
<p>La solution était de de passer par le nom des propriétés.
Mais cette solution n&#8217;est pas très viable car si une propriété change de nom, vous n&#8217;aurez pas d&#8217;erreur de compilation.</p>
</div>
<div class="paragraph">
<p>Exemple pour un objet</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731527923903.055"><span class="hljs-meta">@Test</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> @backtick@should extract property on <span class="hljs-keyword">object</span>@backtick@<span class="hljs-params">()</span></span> {
        <span class="hljs-keyword">val</span> talk = Talk(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, listOf(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>))
        assertThat(talk).extracting(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;speakerIds&quot;</span>)
            .containsExactly(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, listOf(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>))
    }</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923903.055')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Exemple pour une liste d&#8217;objets</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731527923904.0068"><span class="hljs-meta">@Test</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> @backtick@should extract property on list@backtick@<span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">val</span> talks = listOf(
        Talk(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, listOf(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>)),
        Talk(<span class="hljs-number">2L</span>, <span class="hljs-string">&quot;Other talk&quot;</span>, listOf(<span class="hljs-number">14L</span>))
    )
    assertThat(talks)
        .extracting(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;speakerIds&quot;</span>)
        .containsExactly(
            tuple(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, listOf(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>)),
            tuple(<span class="hljs-number">2L</span>, <span class="hljs-string">&quot;Other talk&quot;</span>, listOf(<span class="hljs-number">14L</span>))
        )
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923904.0068')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Suite à l&#8217;écriture de la première version de cet article j&#8217;ai pu tester les dernières versions d&#8217;AssertJ.
Contrairement à ce qui avait été dit l&#8217;API a évolué à partir de la version 3.18 et vous pouvez maintenant écrire</p>
</div>
<div class="paragraph">
<p>Exemple pour un objet</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731527923905.29"><span class="hljs-meta">@Test</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> @backtick@should extract property on <span class="hljs-keyword">object</span>@backtick@<span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">val</span> talk = Talk(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, listOf(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>))
    assertThat(talk)
        .extracting(Talk::id, Talk::name, Talk::speakerIds)
        .containsExactly(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, listOf(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>))
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923905.29')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Exemple pour une liste d&#8217;objets</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731527923906.5898"><span class="hljs-meta">@Test</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> @backtick@should extract property on list@backtick@<span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">val</span> talks: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTTalk@</span>GT = listOf(
        Talk(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, listOf(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>)),
        Talk(<span class="hljs-number">2L</span>, <span class="hljs-string">&quot;Other talk&quot;</span>, listOf(<span class="hljs-number">14L</span>))
    )
    assertThat(talks).extracting(Talk::id, Talk::name, Talk::speakerIds)
        .containsExactly(
            Tuple.tuple(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, listOf(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>)),
            Tuple.tuple(<span class="hljs-number">2L</span>, <span class="hljs-string">&quot;Other talk&quot;</span>, listOf(<span class="hljs-number">14L</span>))
        )
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923906.5898')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_le_langage_kotlin_à_la_rescousse">Le langage Kotlin à la rescousse</h2>
<div class="sectionbody">
<div class="paragraph">
<p>AssertJ a été écrit pour faciliter les tests en Java.
En Kotlin, le langage est beaucoup plus souple et le langage lui même est souvent une réponse simple à un problème.
Au lieu d&#8217;utiliser la méthode <code>extracting</code>, vous pouvez par exemple transformer vos éléments en tuple</p>
</div>
<div class="paragraph">
<p>Exemple pour un objet avec un let</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731527923907.5203"><span class="hljs-meta">@Test</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> @backtick@should extract property on <span class="hljs-keyword">object</span>@backtick@<span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">val</span> talk = Talk(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, listOf(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>))
    assertThat(talk.let { tuple(it.id, it.name, it.speakerIds) })
        .isEqualTo(tuple(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, listOf(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>)))
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923907.5203')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Exemple pour une liste d&#8217;objets avec un map</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731527923908.1704"><span class="hljs-meta">@Test</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> @backtick@should extract property on list@backtick@<span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">val</span> talks = listOf(
        Talk(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, listOf(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>)),
        Talk(<span class="hljs-number">2L</span>, <span class="hljs-string">&quot;Other talk&quot;</span>, listOf(<span class="hljs-number">14L</span>))
    )
    assertThat(talks.map { tuple(it.id, it.name, it.speakerIds) })
        .containsExactly(
            tuple(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Fabulous talk&quot;</span>, listOf(<span class="hljs-number">12L</span>, <span class="hljs-number">13L</span>)),
            tuple(<span class="hljs-number">2L</span>, <span class="hljs-string">&quot;Other talk&quot;</span>, listOf(<span class="hljs-number">14L</span>))

        )
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923908.1704')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Voici la fin de cet article que je voulais partagé après avoir perdu pas mal de temps avec des anciennes versions de AssertJ pour migrer du code de test Java en Kotlin.</p>
</div>
</div>
</div>`;