export const _mockserver:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>En jouant avec le dernier framework <a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html">WebFlux</a> de Spring et notamment <a href="https://docs.spring.io/spring-framework/docs/5.0.0.M3/javadoc-api/org/springframework/web/client/reactive/WebClient.html">Web Client</a>, j&#8217;ai découvert la librairie <a href="https://square.github.io/okhttp/">okhttp</a> écrite par la société <a href="http://square.github.io/">Square</a>. <a href="https://squareup.com/">Square</a> est spécialisé dans le paiement électronique et ils mettent à disposition des commerçants des mini lecteur de carte de crédits. Ils développement beaucoup pour toutes les plateformes mobiles et notamment pour Android et donc indirectement Java.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/mockwebserver_00.png" alt="MockServer et WebClient">
</div>
</div>
<div class="paragraph">
<p><a href="https://square.github.io/okhttp/">Okhttp</a> est un mini client HTTP et vous trouvez aussi dans ce projet un mini serveur "mockable" que vous pouvez utiliser dans vos tests.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_tester_web_client_en_junit4">Tester <a href="https://docs.spring.io/spring-framework/docs/5.0.0.M3/javadoc-api/org/springframework/web/client/reactive/WebClient.html">Web Client</a> en Junit4</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Prenons un exemple Spring WebFlux utilisant <a href="https://docs.spring.io/spring-framework/docs/5.0.0.M3/javadoc-api/org/springframework/web/client/reactive/WebClient.html">Web Client</a></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527924124.8071"><span class="hljs-meta">@Component</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ElasticMailSender</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">EmailSender</span> {

    <span class="hljs-keyword">private</span> WebClient webClient;

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">ElasticMailSender</span><span class="hljs-params">()</span> {
        webClient = WebClient.create(<span class="hljs-string">&quot;https://api.elasticemail.com&quot;</span>);
    }

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">ElasticMailSender</span><span class="hljs-params">(WebClient webClient)</span> {
        <span class="hljs-built_in">this</span>.webClient = webClient;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">send</span><span class="hljs-params">(EmailMessage email)</span> {
        <span class="hljs-type">ElasticEmailResponseDTO</span> <span class="hljs-variable">response</span> <span class="hljs-operator">=</span> webClient.post()
            .uri(String.format(<span class="hljs-string">&quot;/%s/email/send&quot;</span>, <span class="hljs-string">&quot;v2&quot;</span>))
            .body(BodyInserters
                 .fromFormData(<span class="hljs-string">&quot;apikey&quot;</span>, <span class="hljs-string">&quot;MYAPISECRET&quot;</span>)
                 .with(<span class="hljs-string">&quot;from&quot;</span>, <span class="hljs-string">&quot;guillaume@dev-mind.fr&quot;</span>)
                 .with(<span class="hljs-string">&quot;fromName&quot;</span>, <span class="hljs-string">&quot;Dev-Mind&quot;</span>)
                 .with(<span class="hljs-string">&quot;to&quot;</span>, email.getTo())
                 .with(<span class="hljs-string">&quot;subject&quot;</span>, email.getSubject())
                 .with(<span class="hljs-string">&quot;isTransactional&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
                 .with(<span class="hljs-string">&quot;body&quot;</span>, email.getContent())
            )
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(ElasticEmailResponseDTO.class)
            .block();

        <span class="hljs-keyword">if</span> (response.getSuccess() == <span class="hljs-literal">false</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(response.getError());
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731527924124.8071')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Si nous voulons tester cette classe nous devons simuler le comportement de WebClient. Nous pouvons utiliser un framework de mock mais dans ce cas là nous ne testons pas le flux HTTP. Utilisons donc un simulacre de serveur web&#8230;&#8203; C&#8217;est là que rentre en compte  <a href="https://github.com/square/okhttp/tree/master/mockwebserver">MockWebServer</a></p>
</div>
<div class="paragraph">
<p>Pour l&#8217;utiliser rien de plus simple. Commencez par insérer cette dépendance dans votre build Gradle</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527924124.4768">testCompile(<span class="hljs-string">&quot;com.squareup.okhttp3:mockwebserver:3.9.1&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1731527924124.4768')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>MockWebserver est en fait une <a href="http://javamind-fr.blogspot.fr/2014/05/junit-et-les-rules-comment-mutualiser.html#!">Rule Junit 4</a> et étend la classe <a href="http://junit.org/junit4/javadoc/4.12/org/junit/rules/ExternalResource.html">ExternalResource</a>. Votre test peut s&#8217;écrire de cette manière</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527924127.929"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ElasticMailSenderTest</span> {
    <span class="hljs-meta">@Rule</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">MockWebServer</span> <span class="hljs-variable">server</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MockWebServer</span>();
    <span class="hljs-keyword">private</span> WebClient webClient;
    <span class="hljs-keyword">private</span> ElasticMailSender elasticMailSender;

    <span class="hljs-meta">@Before</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setUp</span><span class="hljs-params">()</span>{
        <span class="hljs-built_in">this</span>.webClient = Mockito.spy(WebClient.create(<span class="hljs-built_in">this</span>.server.url(<span class="hljs-string">&quot;/&quot;</span>).toString()));
        elasticMailSender = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ElasticMailSender</span>(webClient);
    }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">send</span><span class="hljs-params">()</span> {
        prepareResponse(response <span class="hljs-meta">@LAMBDA</span> response
                .setHeader(<span class="hljs-string">&quot;Content-Type&quot;</span>, <span class="hljs-string">&quot;application/json&quot;</span>)
                .setBody(<span class="hljs-string">&quot;{ \&quot;success\&quot; : true }&quot;</span>));

        elasticMailSender.send(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmailMessage</span>(
                <span class="hljs-string">&quot;guillaume@test.fr&quot;</span>,
                <span class="hljs-string">&quot;Email test&quot;</span>,
                <span class="hljs-string">&quot;@LTh1@GTHi Guillaume@LT/h1@GT@LTp@GTWaow... you are able to send an email@LT/p@GT&quot;</span>)
        );

        verify(webClient, atLeastOnce()).post();
    }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">sendWithError</span><span class="hljs-params">()</span> {
        prepareResponse(response <span class="hljs-meta">@LAMBDA</span> response
                .setHeader(<span class="hljs-string">&quot;Content-Type&quot;</span>, <span class="hljs-string">&quot;application/json&quot;</span>)
                .setBody(<span class="hljs-string">&quot;{ \&quot;success\&quot; : false, \&quot;error\&quot; : \&quot;error expected\&quot; }&quot;</span>));

        assertThatThrownBy(() <span class="hljs-meta">@LAMBDA</span> elasticMailSender.send(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmailMessage</span>(
                <span class="hljs-string">&quot;guillaume@test.fr&quot;</span>,
                <span class="hljs-string">&quot;Email test&quot;</span>,
                <span class="hljs-string">&quot;@LTh1@GTHi Guillaume@LT/h1@GT@LTp@GTWaow... you are able to send an email@LT/p@GT&quot;</span>)))
                .isExactlyInstanceOf(RuntimeException.class)
                .hasMessage(<span class="hljs-string">&quot;error expected&quot;</span>);
    }

    <span class="hljs-keyword">private</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">prepareResponse</span><span class="hljs-params">(Consumer<span class="hljs-meta">@LTMockResponse</span><span class="hljs-meta">@GT</span> consumer)</span> {
        <span class="hljs-type">MockResponse</span> <span class="hljs-variable">response</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MockResponse</span>();
        consumer.accept(response);
        <span class="hljs-built_in">this</span>.server.enqueue(response);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731527924127.929')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Une fois que la <code><em>Rule</em></code> est créée on initialise un <code><em>WebClient</em></code> avec une URL qui sera servie par <code><em>MockWebServer</em></code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527924128.011">WebClient.create(<span class="hljs-built_in">this</span>.server.url(<span class="hljs-string">&quot;/&quot;</span>).toString())</code><button class="btn-copy-code" onclick="copyToClipboard('1731527924128.011')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Ensuite la méthode <code><em>prepareResponse()</em></code> permet de constuire une réponse qui sera renvoyée quand WebClient appelera cette URL.</p>
</div>
<div class="paragraph">
<p>Jusque là tout va bien mais que ce passe t&#8217;il si nous voulons passer à Junit 5 ?</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_tester_web_client_en_junit5">Tester <a href="https://docs.spring.io/spring-framework/docs/5.0.0.M3/javadoc-api/org/springframework/web/client/reactive/WebClient.html">Web Client</a> en Junit5</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Si vous souhaitez utiliser Junit 5 dans votre application vous pouvez commencer par lire <a href="https://www.dev-mind.fr/blog/2018/junit5_and_springboot.html">mon article</a> sur le sujet :-).  Pour ne plus avoir de dépendance vers des anciennes versions de Junit, vous pouvez ajouter à votre projet Gradle cette configuration</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527924128.008">configurations {
	all {
		exclude <span class="hljs-keyword">module</span>: <span class="hljs-string">&quot;junit&quot;</span>
	}
}
testCompile(<span class="hljs-string">&quot;org.junit.jupiter:junit-jupiter-api&quot;</span>)
testRuntime(<span class="hljs-string">&quot;org.junit.jupiter:junit-jupiter-engine&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1731527924128.008')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Mais dans ce cas là vous ne pourrez plus utiliser la librairie précédente car elle a besoin de Junit 4 pour compiler. Il faut savoir que les versions 5 et 4 ne sont pas rétrocompatibles et les Rule Junit4 ont été remplacées par des extensions dans Junit 5.</p>
</div>
<div class="paragraph">
<p>Junit 5 a été réécrit pour profiter pleinement de Java 8. Le <a href="https://developer.android.com/studio/write/java8-support.html">support Java 8</a> est encore à ses débuts dans Android, et Square ne va pas faire évoluer tout de suite sa librairie pour être compatible Junit 5. Pour palier à ce problème vous pouvez utiliser le fork mis en place par <a href="https://github.com/Dev-Mind/mockwebserver">Dev-Mind</a>. Ce projet utilise le projet <a href="https://square.github.io/okhttp/">okhttp</a> mais ne dépend pas de Junit 4, et propose deux extensions pour vos tests.</p>
</div>
<div class="paragraph">
<p>Vous pouvez charger cette librairie sur <a href="http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22fr.dev-mind%22">Maven Central</a>. Pour l&#8217;utiliser dans un projet Gradle vous pouvez déclarer cette dépendance</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527924128.9238">testCompile(<span class="hljs-string">&quot;com.devmind:mockwebserver:0.1.0&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1731527924128.9238')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>La première extension <code><em>MockWebServerExtension</em></code> se charge d&#8217;instancier un serveur web, de le démarrer et de l&#8217;arrêter avant et après chaque test.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527924130.9224"><span class="hljs-meta">@ExtendWith(MockWebServerExtension.class)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MySpringWebfluxServiceTest</span> {

    <span class="hljs-keyword">private</span> MockWebServer server;
    <span class="hljs-keyword">private</span> WebClient webClient;
    <span class="hljs-keyword">private</span> MySpringWebfluxService service;

    <span class="hljs-meta">@BeforeEach</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setup</span><span class="hljs-params">(MockWebServer server)</span> {
        <span class="hljs-built_in">this</span>.webClient = WebClient.create(server.url(<span class="hljs-string">&quot;/&quot;</span>).toString());
        <span class="hljs-built_in">this</span>.service = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MySpringWebfluxService</span>(webClient);
        <span class="hljs-built_in">this</span>.server = server;
    }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">mytest</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {
        prepareResponse(response <span class="hljs-meta">@LAMBDA</span> response
                .setHeader(<span class="hljs-string">&quot;Content-Type&quot;</span>, <span class="hljs-string">&quot;application/json&quot;</span>)
                .setBody( <span class="hljs-string">&quot;{\n&quot;</span> +
                          <span class="hljs-string">&quot;  \&quot;error_message\&quot; : \&quot;The provided API key is invalid.\&quot;,\n&quot;</span> +
                          <span class="hljs-string">&quot;  \&quot;predictions\&quot; : [],\n&quot;</span> +
                          <span class="hljs-string">&quot;  \&quot;status\&quot; : \&quot;REQUEST_DENIED\&quot;\n&quot;</span> +
                          <span class="hljs-string">&quot;}&quot;</span>));

        StepVerifier.create(service.myMethod())
                .expectComplete()
                .verify(Duration.ofSeconds(<span class="hljs-number">3</span>));
    }

    <span class="hljs-keyword">private</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">prepareResponse</span><span class="hljs-params">(Consumer consumer)</span> {
        <span class="hljs-type">MockResponse</span> <span class="hljs-variable">response</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MockResponse</span>();
        consumer.accept(response);
        <span class="hljs-built_in">this</span>.server.enqueue(response);
    }

}</code><button class="btn-copy-code" onclick="copyToClipboard('1731527924130.9224')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Avec la deuxième extension <code><em>MockSimpleWebServerExtension</em></code> plus basique, vous gérez vous même l&#8217;arrêt relance du serveur. Ceci permet par exemple de lancer le serveur avant le lancement de tous les tests et de l&#8217;arrêter à la fin de l&#8217;exécution</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731527924133.9138"><span class="hljs-meta">@ExtendWith(MockSimpleWebServerExtension.class)</span>
<span class="hljs-meta">@TestInstance(TestInstance.Lifecycle.PER_CLASS)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MySpringWebfluxServiceTest</span> {

    <span class="hljs-keyword">private</span> MockWebServer server;
    <span class="hljs-keyword">private</span> WebClient webClient;
    <span class="hljs-keyword">private</span> MySpringWebfluxService service;

    <span class="hljs-meta">@BeforeAll</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">init</span><span class="hljs-params">(MockWebServer server)</span> <span class="hljs-keyword">throws</span> IOException {
        server.start();
        <span class="hljs-built_in">this</span>.server = server;
    }

    <span class="hljs-meta">@AfterAll</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">tearDown</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> IOException {
        server.shutdown();
    }

    <span class="hljs-meta">@BeforeEach</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setup</span><span class="hljs-params">(MockWebServer server)</span> {
        <span class="hljs-built_in">this</span>.webClient = WebClient.create(server.url(<span class="hljs-string">&quot;/&quot;</span>).toString());
        <span class="hljs-built_in">this</span>.service = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MySpringWebfluxService</span>(webClient);
    }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">mytest</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {
        prepareResponse(response <span class="hljs-meta">@LAMBDA</span> response
                .setHeader(<span class="hljs-string">&quot;Content-Type&quot;</span>, <span class="hljs-string">&quot;application/json&quot;</span>)
                .setBody( <span class="hljs-string">&quot;{\n&quot;</span> +
                          <span class="hljs-string">&quot;  \&quot;error_message\&quot; : \&quot;The provided API key is invalid.\&quot;,\n&quot;</span> +
                          <span class="hljs-string">&quot;  \&quot;predictions\&quot; : [],\n&quot;</span> +
                          <span class="hljs-string">&quot;  \&quot;status\&quot; : \&quot;REQUEST_DENIED\&quot;\n&quot;</span> +
                          <span class="hljs-string">&quot;}&quot;</span>));

        StepVerifier.create(service.myMethod())
                .expectComplete()
                .verify(Duration.ofSeconds(<span class="hljs-number">3</span>));
    }

    <span class="hljs-keyword">private</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">prepareResponse</span><span class="hljs-params">(Consumer<span class="hljs-meta">@LTMockResponse</span><span class="hljs-meta">@GT</span> consumer)</span> {
        <span class="hljs-type">MockResponse</span> <span class="hljs-variable">response</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MockResponse</span>();
        consumer.accept(response);
        <span class="hljs-built_in">this</span>.server.enqueue(response);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731527924133.9138')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Voila vous n&#8217;avez plus d&#8217;excuse pour ne pas tester vos services Spring utilisant WebClient en Junit 5. Le fork proposé par Dev-Mind peut être utilisé en attendant que Square mette à jour sa librairie.</p>
</div>
</div>
</div>`;