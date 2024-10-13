export const _junit5_and_springboot:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Le projet Junit a été en suspend pendant pas mal de temps (version 4 a été créée en 2006 et la dernière grosse mise à jour date de 2011) mais il reste une des librairies Java les plus utilisées quelque soit les projets. Quelques personnes ont repris le projet en main pour écrire une librairie offrant toutes les possibilités de Java 8 et beaucoup plus modulaire.</p>
</div>
<div class="paragraph">
<p>JUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage</p>
</div>
<div class="ulist">
<ul>
<li>
<p>JUnit Platform est le socle pour lancer des frameworks de tests sur la JVM. Une API a été définie et chacun est libre de l&#8217;implémenter. Ce module contient aussi tous les plugins pour pouvoir lancer des tests et notamment les plugins Maven et Gradle.</p>
</li>
<li>
<p>JUnit Jupiter est une implémentation de l&#8217;API définie dans JUnit Platform</p>
</li>
<li>
<p>JUnit Vintage est le projet qui permet d&#8217;assurer la rétrocompatibilité avec Junit 4 et Junit 3</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/junit5_00.png" alt="Junit dans SpringBoot">
</div>
</div>
<div class="paragraph">
<p>Nous allons voir comment utiliser cette nouvelle version dans un projet Spring Boot 2. Les sources du code montré ici, sont disponibles <a href="https://github.com/Dev-Mind/devmind-junit5">sous Github</a>.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_description_de_lexemple">Description de l&#8217;exemple</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Ce projet exemple est minimaliste et comprend un bean de propriétés qui va injecter la propriété <code><em>devmin.name</em></code> dans le code et notre test consiste à vérifier que ce bean est bien peuplé</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001802.2117"><span class="hljs-meta">@ConfigurationProperties(&quot;devmind&quot;)</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Junit5ApplicationProperties</span> {
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">getName</span><span class="hljs-params">()</span> { <span class="hljs-keyword">return</span> name; }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setName</span><span class="hljs-params">(String name)</span> { <span class="hljs-built_in">this</span>.name = name; }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001802.2117')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Ce bean est initialisé dans le bean de bootstrap de l&#8217;application</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001802.03"><span class="hljs-meta">@SpringBootApplication</span>
<span class="hljs-meta">@EnableConfigurationProperties(Junit5ApplicationProperties.class)</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Junit5Application</span> {
	<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> {
		SpringApplication.run(Junit5Application.class, args);
	}
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001802.03')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Et le test Junit 4 peut être écrit de cette manière. J&#8217;ai indiqué les packages pour que vous puissiez voir les différences plus loin</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001803.1396"><span class="hljs-keyword">import</span> org.assertj.core.api.Assertions;
<span class="hljs-keyword">import</span> org.junit.Test;
<span class="hljs-keyword">import</span> org.junit.runner.RunWith;
<span class="hljs-keyword">import</span> org.springframework.beans.factory.annotation.Autowired;
<span class="hljs-keyword">import</span> org.springframework.boot.test.context.SpringBootTest;
<span class="hljs-keyword">import</span> org.springframework.test.context.junit4.SpringRunner;

<span class="hljs-meta">@RunWith(SpringRunner.class)</span>
<span class="hljs-meta">@SpringBootTest</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Junit5ApplicationTests</span> {

	<span class="hljs-meta">@Autowired</span>
	<span class="hljs-keyword">private</span> Junit5ApplicationProperties properties;

	<span class="hljs-meta">@Test</span>
	<span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">contextLoads</span><span class="hljs-params">()</span> {
		Assertions.assertThat(properties.getName()).isEqualTo(<span class="hljs-string">&quot;Dev-Mind&quot;</span>);
	}

}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001803.1396')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Nous allons maintenant écrire ce même test avec Junit 5.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_paramétrer_gradle_pour_pouvoir_utiliser_junit_5_dans_un_projet_spring_boot">Paramétrer Gradle pour pouvoir utiliser Junit 5 dans un projet Spring Boot</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Votre descripteur de build Gradle (<code><em>build.gradle</em></code>) doit pour le moment ressembler à</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1728847001803.4858">buildscript {
	ext {
		springBootVersion = <span class="hljs-string">&#x27;2.0.0.M7&#x27;</span>
	}
	repositories {
		mavenCentral()
		maven { url <span class="hljs-string">&quot;https://repo.spring.io/milestone&quot;</span> }
	}
	dependencies {
		classpath(<span class="hljs-string">&quot;org.springframework.boot:spring-boot-gradle-plugin:@dollar@{springBootVersion}&quot;</span>)
	}
}

apply <span class="hljs-attr">plugin:</span> <span class="hljs-string">&#x27;java&#x27;</span>
apply <span class="hljs-attr">plugin:</span> <span class="hljs-string">&#x27;org.springframework.boot&#x27;</span>
apply <span class="hljs-attr">plugin:</span> <span class="hljs-string">&#x27;io.spring.dependency-management&#x27;</span>

group = <span class="hljs-string">&#x27;com.devmind&#x27;</span>
version = <span class="hljs-string">&#x27;0.0.1-SNAPSHOT&#x27;</span>
sourceCompatibility = <span class="hljs-number">1.8</span>

repositories {
	mavenCentral()
	maven { url <span class="hljs-string">&quot;https://repo.spring.io/milestone&quot;</span> }
}


dependencies {
	compile(<span class="hljs-string">&#x27;org.springframework.boot:spring-boot-starter&#x27;</span>)
	testCompile(<span class="hljs-string">&#x27;org.springframework.boot:spring-boot-starter-test&#x27;</span>)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001803.4858')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Nous allons indiquer à Gradle qu&#8217;il doit utiliser le plugin <code><em>JUnit Platform</em></code>.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1728847001803.6304">classpath(<span class="hljs-string">&quot;org.junit.platform:junit-platform-gradle-plugin:@dollar@{junitPlatformVersion}&quot;</span>)
apply <span class="hljs-attr">plugin:</span> <span class="hljs-string">&quot;org.junit.platform.gradle.plugin&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1728847001803.6304')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour être sûr de ne plus utiliser l&#8217;ancienne version de Junit, nous allons exclure la dépendance junit tirée par <code><em>spring-boot-starter-test</em></code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1728847001803.864">testCompile(<span class="hljs-string">&quot;org.springframework.boot:spring-boot-starter-test&quot;</span>) {
	exclude <span class="hljs-attr">module:</span> <span class="hljs-string">&quot;junit&quot;</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001803.864')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>ou même mieux vous pouvez le faire d&#8217;une manière globale</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1728847001803.9045">configurations {
	all {
		exclude <span class="hljs-attr">module:</span> <span class="hljs-string">&quot;junit&quot;</span>
	}
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001803.9045')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Nous devons maintenant ajouter les dépendances Junit5 pour que notre projet puisse lancer les tests</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1728847001803.9656">testCompile(<span class="hljs-string">&quot;org.junit.jupiter:junit-jupiter-api&quot;</span>)
testRuntime(<span class="hljs-string">&quot;org.junit.jupiter:junit-jupiter-engine&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001803.9656')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Votre code avec les dépendances Junit4 ne doit plus compiler! Vous pouvez maintenant lire la documentation Junit sur comment <a href="http://junit.org/junit5/docs/current/user-guide/#migrating-from-junit4">migrer de Junit4 à Junit5</a>.</p>
</div>
<div class="paragraph">
<p>Quand vous avez un gros projet vous voulez peut être faire cohabiter les 2 versions et migrer au fur et à mesure vos tests. Dans ce cas, gardez la dépendance junit pour que votre code compile et ajouter la dépendance suivante dans votre script Gradle</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1728847001803.4856">testRuntime(<span class="hljs-string">&quot;org.junit.vintage:junit-vintage-engine:4.12.2&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001803.4856')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_comment_migrer_ces_tests_junit4_à_junit5">Comment migrer ces tests Junit4 à Junit5 ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Pour la partie pure Junit, vous pouvez suivre la <a href="http://junit.org/junit5/docs/current/user-guide/#migrating-from-junit4">documentation officielle</a>. Pour résumer voici les principales évolutions</p>
</div>
<div class="sect2">
<h3 id="_renommages_et_changements_de_package">Renommages et changements de package</h3>
<div class="ulist">
<ul>
<li>
<p>Les annotations, les assertions et les hypothèses (Assumptions) ont été déplacées dans le package <code><em>org.junit.jupiter.api</em></code>. Personnellement je n&#8217;utilise pas les assertions Junit et je préfère les assertions offertes par le projet <a href="https://joel-costigliola.github.io/assertj/">AssertJ</a>. Pour les Assumptions je ne suis pas fan car je préfère qu&#8217;un test en échec soit bloquant.</p>
</li>
<li>
<p>Les annotations <code><em>@Before</em></code> et <code><em>@After</em></code> ont été remplacées par <code><em>@BeforeEach</em></code> et <code><em>@AfterEach</em></code></p>
</li>
<li>
<p>Les annotations <code><em>@BeforeClass</em></code> et <code><em>@AfterClass</em></code> ont été remplacées par <code><em>@BeforeAll</em></code> et <code><em>@AfterAll</em></code></p>
</li>
<li>
<p>L&#8217;annotation <code><em>@Ignore</em></code> a été remplacée par <code><em>@Disabled</em></code>. Petite remarque, un projet ne devrait pas avoir de test ignorés. S&#8217;ils ne sont plus valides ils doivent être supprimés.</p>
</li>
<li>
<p>Les catégories <code><em>@Category</em></code> ont été remmplacées par les <code><em>@Tag</em></code></p>
</li>
<li>
<p>L&#8217;annotation <code><em>@RunWith</em></code> est remplacée par <code><em>@ExtendWith</em></code></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Ces renommages permettent d&#8217;avoir des noms d&#8217;annotation plus parlant. Par contre vous mixez peut être des tests TestNg et des tests Junit dans vos projets ? Si c&#8217;est le cas je vous conseille aussi de migrer vos tests TestNg vers Junit. TestNg était très intéressant il y a quelques années quand il permettait de combler les manques de Junit. Aujourd&#8217;hui le projet ne bouge plus beaucoup.</p>
</div>
</div>
<div class="sect2">
<h3 id="_les_rules_junit">Les Rules Junit</h3>
<div class="paragraph">
<p>Pour les amoureux des règles Junit, elles ne sont pas encore disponibles. Pour rappel, elles permettaient de combler les manques de Junit où on ne pouvait pas faire de composition de <code><em>@RunWith</em></code>. En gros une fois que vous aviez déclaré <code><em>@RunWith(SpringRunner.class)</em></code> sur votre classe vous ne pouviez pas ajouter un <code>@RunWith(MockitoJUnitRunner.class)</code>. Les règles Junit vous offrait un moyen simple de factoriser du comportement entre les tests.</p>
</div>
<div class="paragraph">
<p>Mais Junit5 s&#8217;appuie sur Java 8 et n&#8217;est d&#8217;ailleurs pas compatible avec les versions antérieures. Depuis Java 8 des annotations peuvent être <a href="https://docs.oracle.com/javase/8/docs/api/java/lang/annotation/Repeatable.html">"Repeatable"</a>. C&#8217;est le cas de <a href="http://junit.org/junit5/docs/current/api/org/junit/jupiter/api/extension/ExtendWith.html">ExtendWith</a>. Vous pouvez maintenant écrire par exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001803.1614"><span class="hljs-meta">@ExtendWith(MockitoExtension.class)</span>
<span class="hljs-meta">@ExtendWith(SpringExtension.class)</span></code><button class="btn-copy-code" onclick="copyToClipboard('1728847001803.1614')">Copy</button></pre>
</div>
</div>
<div class="sidebarblock">
<div class="content">
<div class="paragraph">
<p>Par contre <code><em>MockitoExtension</em></code> n&#8217;existe pas encore. Vous pouvez voir cette issue <a href="https://github.com/mockito/mockito/issues/445">Github</a> et <code><em>MockitoExtension</em></code> devrait arriver avec Mockito 3.0</p>
</div>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_quen_est_il_de_la_partie_spring_boot">Qu&#8217;en est il de la partie Spring Boot ?</h3>
<div class="paragraph">
<p>Spring Boot propose plusieurs annotations pour les tests et elles sont toujours utilisables. Vous pouvez suivre la <a href="https://docs.spring.io/spring/docs/5.0.3.BUILD-SNAPSHOT/spring-framework-reference/testing.html#integration-testing-annotations-junit-jupiter">doc officielle</a> mais nous allons voir comment migrer notre exemple présenté au début de cet article.</p>
</div>
<div class="paragraph">
<p>Mon exemple devient</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001804.3877"><span class="hljs-keyword">import</span> org.assertj.core.api.Assertions;
<span class="hljs-keyword">import</span> org.junit.jupiter.api.Test;
<span class="hljs-keyword">import</span> org.junit.jupiter.api.extension.ExtendWith;
<span class="hljs-keyword">import</span> org.springframework.beans.factory.annotation.Autowired;
<span class="hljs-keyword">import</span> org.springframework.boot.test.context.SpringBootTest;
<span class="hljs-keyword">import</span> org.springframework.test.context.junit.jupiter.SpringExtension;

<span class="hljs-meta">@ExtendWith(SpringExtension.class)</span>
<span class="hljs-meta">@SpringBootTest</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Junit5ApplicationTests</span> {

	<span class="hljs-meta">@Autowired</span>
	<span class="hljs-keyword">private</span> Junit5ApplicationProperties properties;

	<span class="hljs-meta">@Test</span>
	<span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">contextLoads</span><span class="hljs-params">()</span> {
		Assertions.assertThat(properties.getName()).isEqualTo(<span class="hljs-string">&quot;Dev-Mind&quot;</span>);
	}

}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001804.3877')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si vous rencontrez des problèmes avec IntelliJ pour lancer les tests je vous laisse lire <a href="https://discuss.gradle.org/t/junit-5-gradle-and-intellij-publishing-test-events-for-tooling-api-consumers/21349">ce post</a> sur le forum de Gradle et <a href="https://blog.jetbrains.com/idea/2016/08/using-junit-5-in-intellij-idea/">celui-ci</a> sur le site de JetBrains.</p>
</div>
<div class="paragraph">
<p>Au niveau de Spring ne passez pas à côté des annotations composées qui peuvent aider à la lecture de vos tests. Par exemple si vous utilisez toujours une multitude d&#8217;annotation sur vos tests comme dans cet exemple issu de la doc de Spring</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001804.8352"><span class="hljs-meta">@ExtendWith(SpringExtension.class)</span>
<span class="hljs-meta">@ContextConfiguration({&quot;/app-config.xml&quot;, &quot;/test-data-access-config.xml&quot;})</span>
<span class="hljs-meta">@ActiveProfiles(&quot;dev&quot;)</span>
<span class="hljs-meta">@Transactional</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">OrderRepositoryTests</span> { }

<span class="hljs-meta">@ExtendWith(SpringExtension.class)</span>
<span class="hljs-meta">@ContextConfiguration({&quot;/app-config.xml&quot;, &quot;/test-data-access-config.xml&quot;})</span>
<span class="hljs-meta">@ActiveProfiles(&quot;dev&quot;)</span>
<span class="hljs-meta">@Transactional</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">UserRepositoryTests</span> { }</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001804.8352')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez créer une annotation</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001804.7412"><span class="hljs-meta">@Target(ElementType.TYPE)</span>
<span class="hljs-meta">@Retention(RetentionPolicy.RUNTIME)</span>
<span class="hljs-meta">@ExtendWith(SpringExtension.class)</span>
<span class="hljs-meta">@ContextConfiguration({&quot;/app-config.xml&quot;, &quot;/test-data-access-config.xml&quot;})</span>
<span class="hljs-meta">@ActiveProfiles(&quot;dev&quot;)</span>
<span class="hljs-meta">@Transactional</span>
<span class="hljs-keyword">public</span> <span class="hljs-meta">@interface</span> TransactionalDevTestConfig { }</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001804.7412')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>et reprendre vos tests pour ne plus avoir que</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001804.5588"><span class="hljs-meta">@TransactionalDevTestConfig</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">OrderRepositoryTests</span> { }

<span class="hljs-meta">@TransactionalDevTestConfig</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">UserRepositoryTests</span> { }</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001804.5588')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_les_fonctionnalités_sympas_de_junit_5">Les fonctionnalités sympas de Junit 5</h3>
<div class="paragraph">
<p>Après avoir vu comment migrer des tests existants, nous pouvons maintenant nous attarder sur quelques nouvelles fonctionnalités</p>
</div>
</div>
<div class="sect2">
<h3 id="_améliorer_la_lisibité_de_ses_tests_avec_nested_et_displayname">Améliorer la lisibité de ses tests avec @Nested et @DisplayName</h3>
<div class="paragraph">
<p>A force d&#8217;écrire des tests en JavaScript, j&#8217;étais toujours frustré du code écrit en Junit4. Pour avoir des rapports d&#8217;exécution lisible on essaye d&#8217;utiliser des noms à rallonge dans les méthodes des tests.</p>
</div>
<div class="paragraph">
<p>Par exemple si nous voulions tester cette interface</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001804.824"><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">CallForPaperService</span> {
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">submit</span><span class="hljs-params">(Proposal proposal)</span>;
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">accept</span><span class="hljs-params">(Proposal proposal)</span>;
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">refuse</span><span class="hljs-params">(Proposal proposal)</span>;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001804.824')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>On pourrait imaginer les tests suivants</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001805.918"><span class="hljs-keyword">class</span> <span class="hljs-title class_">CallForPaperServiceTests</span> {

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">submitShouldFailWhenRequiredDataAreAbsent</span><span class="hljs-params">()</span>{  }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">submitShouldFailWhenConfirmationMailIsNtSend</span><span class="hljs-params">()</span>{  }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">submitShouldSendEmail</span><span class="hljs-params">()</span>{  }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">acceptShouldSendEmailToSessionSpeakers</span><span class="hljs-params">()</span>{  }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">acceptShouldFailWhenSpeakerEmailCantBeSend</span><span class="hljs-params">()</span>{  }

    <span class="hljs-comment">// ... on peut imaginer des dizaines de tests supplémentaires avec des noms beaucoup plus long</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001805.918')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Ce qui donnerait le rapport suivant</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/junit5_01.png" alt="Suite de tests">
</div>
</div>
<div class="paragraph">
<p>En Javascript vous pouvez écrire</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1728847001805.2422"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;submit should fail when required data are absent&#x27;</span>, <span class="hljs-function">() =&gt;</span> { });</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001805.2422')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez migrer votre code en Kotlin qui permet de définir des méthodes avec des phrases :-)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001805.2026"><span class="hljs-meta">@Test</span>
fun <span class="hljs-meta">@backtick</span><span class="hljs-meta">@submit</span> should fail when required data are absent<span class="hljs-meta">@backtick</span>@() {  }</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001805.2026')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Maintenant avec Junit5 vous pourrez ajouter l&#8217;annotation <code><em>@DisplayName</em></code> et dissocier les messages attendus dans les rapports des noms de vos méthode. Par exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001806.0903"><span class="hljs-meta">@DisplayName(&quot;Test service CallForPaperService&quot;)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">CallForPaperServiceTests</span> {

    <span class="hljs-meta">@Test</span>
    <span class="hljs-meta">@DisplayName(&quot;submit should fail when required data are absent&quot;)</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">submitFailOnBadArgument</span><span class="hljs-params">()</span>{ }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-meta">@DisplayName(&quot;submit should fail when confirmation email is not send&quot;)</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">submitFailOnEmailError</span><span class="hljs-params">()</span>{ }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-meta">@DisplayName(&quot;submit should send email&quot;)</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">submitSendEmail</span><span class="hljs-params">()</span>{ }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-meta">@DisplayName(&quot;accept should send email to session speakers&quot;)</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">acceptSendEmailToSessionSpeakers</span><span class="hljs-params">()</span>{ }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-meta">@DisplayName(&quot;accept should fail when speaker email can&#x27;t be send&quot;)</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">acceptFailOnEmailError</span><span class="hljs-params">()</span>{ }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001806.0903')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Ce qui donnerait le rapport suivant</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/junit5_02.png" alt="Suite de tests avec DisplayName">
</div>
</div>
<div class="paragraph">
<p>Nous avons résolu un premier problème. Quand vous multipliez les tests vous ne savez pas forcément à quelle méthode de votre classe testée se réfère. En Javascript avec Jasmine, vous pouvez faire des sous suites de tests au sein d&#8217;une suite de tests. Maintenant avec @Nested vous allez pouvoir faire la même chose</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001806.4375"><span class="hljs-meta">@DisplayName(&quot;Test service CallForPaperService&quot;)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">CallForPaperServiceTests</span> {

    <span class="hljs-meta">@Nested</span>
    <span class="hljs-meta">@DisplayName(&quot;submit&quot;)</span>
    <span class="hljs-keyword">class</span> <span class="hljs-title class_">Submit</span>{
        <span class="hljs-meta">@Test</span>
        <span class="hljs-meta">@DisplayName(&quot;should fail when required data are absent&quot;)</span>
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">submitFailOnBadArgument</span><span class="hljs-params">()</span>{  }

        <span class="hljs-meta">@Test</span>
        <span class="hljs-meta">@DisplayName(&quot;should fail when confirmation email is not send&quot;)</span>
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">submitFailOnEmailError</span><span class="hljs-params">()</span>{  }

        <span class="hljs-meta">@Test</span>
        <span class="hljs-meta">@DisplayName(&quot;should send email&quot;)</span>
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">submitSendEmail</span><span class="hljs-params">()</span>{  }
    }

    <span class="hljs-meta">@Nested</span>
    <span class="hljs-meta">@DisplayName(&quot;accept&quot;)</span>
    <span class="hljs-keyword">class</span> <span class="hljs-title class_">Accept</span>{
        <span class="hljs-meta">@Test</span>
        <span class="hljs-meta">@DisplayName(&quot;should send email to session speakers&quot;)</span>
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">acceptSendEmailToSessionSpeakers</span><span class="hljs-params">()</span>{  }

        <span class="hljs-meta">@Test</span>
        <span class="hljs-meta">@DisplayName(&quot;should fail when speaker email can&#x27;t be send&quot;)</span>
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">acceptFailOnEmailError</span><span class="hljs-params">()</span>{  }
    }

}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001806.4375')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Ce code donnera en sortie</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/junit5_03.png" alt="Suite de tests avec Nested">
</div>
</div>
<div class="paragraph">
<p>Au final nous avons un code plus verbeux mais l&#8217;organisation permet d&#8217;avoir quelque chose de beaucoup plus lisible que ce soit au niveau du code même, des tests, mais ausi des rapports.</p>
</div>
</div>
<div class="sect2">
<h3 id="_répeter_les_tests">Répeter les tests</h3>
<div class="paragraph">
<p>Quand nous voulions exécuter plusieurs fois un même test pour vérifier la performance ou autre, nous devions batailler avec les anciennes versions de Junit, ou utiliser l&#8217;annotation <a href="https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/test/annotation/Repeat.html">Repeat</a> de <code><em>spring-test</em></code> ou alors écrire des tests avec d&#8217;autres frameworks comme TestNg par exemple.</p>
</div>
<div class="paragraph">
<p>Maintenant rien de plus simple vous écrivez</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001806.2207"><span class="hljs-meta">@Test</span>
<span class="hljs-meta">@DisplayName(&quot;should send email to session speakers&quot;)</span>
<span class="hljs-meta">@RepeatedTest(10)</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">acceptSendEmailToSessionSpeakers</span><span class="hljs-params">()</span>{
    assertThat(<span class="hljs-literal">true</span>).isTrue();
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001806.2207')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Et en sortie vous aurez votre test exécuté 1 fois et répeter 10 fois</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/junit5_04.png" alt="Suite de tests avec RepeatedTest">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_les_tags">Les tags</h3>
<div class="paragraph">
<p>Vous pouviez ajouter une catégorie à vos tests avec la version précédente de Junit. Par exemple</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001806.8022"><span class="hljs-meta">@Category({IntegrationTest.class, Exernal.class})</span></code><button class="btn-copy-code" onclick="copyToClipboard('1728847001806.8022')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Avec Junit 5 vous pouvez maintenant utiliser l&#8217;annotation @Tag</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001806.0286"><span class="hljs-meta">@Tag(&quot;integration&quot;)</span>
<span class="hljs-meta">@Tag(&quot;exernal&quot;)</span></code><button class="btn-copy-code" onclick="copyToClipboard('1728847001806.0286')">Copy</button></pre>
</div>
</div>
<div class="sidebarblock">
<div class="content">
<div class="paragraph">
<p>N&#8217;oubliez pas les annotation composées. Par exemple ici on pourrait créer une annotation @IntegrationTestWithExternalSystem pour jumeler ces tags</p>
</div>
</div>
</div>
<div class="paragraph">
<p>Ces tags peuvent ensuite jouer sur le runtime</p>
</div>
<div class="paragraph">
<p>Quand vous configurez Gradle et le plugin junitPlatform vous pouvez spécifier plusieurs options comme les tags exclus ou inclus</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001807.5027">junitPlatform {
    filters {
        tags {
            include <span class="hljs-string">&#x27;fast&#x27;</span>, <span class="hljs-string">&#x27;smoke&#x27;</span>
            exclude <span class="hljs-string">&#x27;slow&#x27;</span>, <span class="hljs-string">&#x27;ci&#x27;</span>
        }
        packages {
            include <span class="hljs-string">&#x27;com.sample.included1&#x27;</span>, <span class="hljs-string">&#x27;com.sample.included2&#x27;</span>
        }
        includeClassNamePattern <span class="hljs-string">&#x27;.*Spec&#x27;</span>
        includeClassNamePatterns <span class="hljs-string">&#x27;.*Test&#x27;</span>, <span class="hljs-string">&#x27;.*Tests&#x27;</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001807.5027')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Comme nous avons pu le voir vous pouvez dès aujourd&#8217;hui adopter Junit 5 dans vos projets Spring Boot ou autre projet Java. Cette refonte de Junit apporte à mon sens plein de petits plus dans l&#8217;écriture des tests. D&#8217;autres évolutions qui sont encore au stade expérimentations peuvent être utilisées par parcimonie. Mais rien ne dit si elles seront conservées ou non dans les futures versions (voir la <a href="http://junit.org/junit5/docs/current/user-guide/#api-evolution-experimental-apis">liste</a>)</p>
</div>
</div>
</div>`;