export const _utiliser_api_envoi_email:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Qui installe encore ces propres serveurs de mail pour envoyer les mails de ces applications ? Il existe aujourd&#8217;hui plusieurs services en ligne qui sont très simples à utiliser. Regardons comment le faire dans une application Java Spring Boot.</p>
</div>
<div class="paragraph">
<p>Tous le code source montré ci dessous, peut être récupéré sous <a href="https://github.com/Dev-Mind/devmind-email">Github</a>. Nous allons voir différentes manières d&#8217;écrire un service qui implémente l&#8217;interface ci dessous</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714176.393"><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">EmailSender</span> {
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">send</span><span class="hljs-params">(EmailMessage email)</span>;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714176.393')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Un <code><em>EmailMessage</em></code> est un bean Java comportant trois propriétés : destinataire, sujet et contenu du mail.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/email_00.png" alt="Envoi mail">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_the_old_way_smtp">The old way : SMTP</h2>
<div class="sectionbody">
<div class="paragraph">
<p>SMTP (Simple Mail Transfer Protocol) porte bien son nom car il permet d&#8217;envoyer simplement des mails. Nous verrons plus loin que cette simplicité se retrouve aussi dans les autres moyens de faire. Pour limiter les spams et monétier leur service, les fournisseurs de mails peuvent mettre certaines limites. Par exemple Gmail limite le nombre de mails quotidien envoyés via SMTP à 500. Pour en envoyer plus vous devez passer par leur API et payer un abonnement en fonction de vos besoins.</p>
</div>
<div class="paragraph">
<p>Revenons à nos moutons. Pour ajouter la gestion des mails dans une application Spring Boot, vous devez ajouter le module Gradle ou Maven <code><em>spring-boot-starter-mail</em></code>. Par exemple en Gradle</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714176.4526">  compile(<span class="hljs-string">&#x27;org.springframework.boot:spring-boot-starter-mail&#x27;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714176.4526')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez ensuite paramétrer les accès SMTP dans les paramètres de l&#8217;application. Par exemple dans le fichier <code><em>application.yml</em></code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714177.3687">spring:
  mail:
    protocol: smtp
    host: smtp.gmail.com
    port: <span class="hljs-number">587</span>
    username: guillaume<span class="hljs-meta">@dev</span>-mind.fr
    password: mypassword
    properties:
      mail:
        smtp:
          auth: <span class="hljs-literal">true</span>
          starttls:
            enable: <span class="hljs-literal">true</span></code><button class="btn-copy-code" onclick="copyToClipboard('1734011714177.3687')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez maintenant injecter un objet <code><em>JavaMailSender</em></code> dans votre code et votre service peut s&#8217;écrire tout simplement de cette manière</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714177.7969"><span class="hljs-meta">@Component</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">GmailSender</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">EmailSender</span> {

    <span class="hljs-keyword">private</span> JavaMailSender javaMailSender;

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">GmailSender</span><span class="hljs-params">(JavaMailSender javaMailSender)</span> {
        <span class="hljs-built_in">this</span>.javaMailSender = javaMailSender;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">send</span><span class="hljs-params">(EmailMessage email)</span> {
        <span class="hljs-keyword">try</span> {
            <span class="hljs-type">MimeMessage</span> <span class="hljs-variable">message</span> <span class="hljs-operator">=</span> javaMailSender.createMimeMessage();
            <span class="hljs-type">MimeMessageHelper</span> <span class="hljs-variable">helper</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MimeMessageHelper</span>(message, <span class="hljs-literal">true</span>, <span class="hljs-string">&quot;UTF-8&quot;</span>);
            helper.setTo(email.getTo());
            helper.setSubject(email.getSubject());
            helper.setFrom(<span class="hljs-string">&quot;guillaume@dev-mind.fr&quot;</span>);
            message.setContent(email.getContent(), <span class="hljs-string">&quot;text/html&quot;</span>);
            javaMailSender.send(message);
        }
        <span class="hljs-keyword">catch</span> (MessagingException e) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(e);
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714177.7969')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_utiliser_lapi_send_grid">Utiliser l&#8217;API Send Grid</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Depuis que tout se déploie dans le Cloud il existe un grand nombre d&#8217;API qui nous permettent de simplifier considérablement notre développement. Elles sont facilement intégrables dans tout type d&#8217;application car elles proposent souvent des accès HTTP via une clé d&#8217;API.</p>
</div>
<div class="paragraph">
<p><a href="https://sendgrid.com/">Sendgrid</a> est un des acteurs les plus connus pour envoyer des mails. SendGrid vous permet de gérer des templates afin de mettre en forme les emails envoyés. Vous disposez également de nombreuses statisiques permettant de suivre les mails envoyés, ouvert ou non&#8230;&#8203;.</p>
</div>
<div class="paragraph">
<p>Vous bénéficiez d&#8217;un quota gratuit de 100 emails/jour (soit 3.000 emails par mois). Si vous déployez votre application sur <a href="https://www.cloudfoundry.org/">CloudFoundry</a>, les quotas gratuits sont plus élevés (25.000 emails par mois).</p>
</div>
<div class="paragraph">
<p>Dans tous les cas vous devrez aller sur leur site pour activer votre clé d&#8217;API</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/email_01.png" alt="Console Send Grid">
</div>
</div>
<div class="paragraph">
<p>Une fois que vous avez votre clé d&#8217;API vous devez intégrer dans votre application la dépendance Send Grid</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714177.7417">  compile(<span class="hljs-string">&#x27;com.sendgrid:sendgrid-java:4.1.2&#x27;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714177.7417')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Spring Boot contient un auto configurer pour SendGrid quand la dépendance est ajoutée à votre projet. Vous pouvez déclarer la clé dans votre fichier <code><em>application.yml</em></code> sous cette forme</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714177.4216">spring:
  sendgrid:
      api-key: <span class="hljs-meta">@dollar</span>@{SENDGRID_APIKEY:Bar12345Bar12345}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714177.4216')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez maintenant utiliser l&#8217;objet <code><em>SendGrid</em></code> dans votre code</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714178.0605"><span class="hljs-meta">@Component</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SendgridSender</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">EmailSender</span> {

    <span class="hljs-keyword">private</span> SendGrid sendGrid;

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">SendgridSender</span><span class="hljs-params">(SendGrid sendGrid)</span> {
        <span class="hljs-built_in">this</span>.sendGrid = sendGrid;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">send</span><span class="hljs-params">(EmailMessage email)</span> {
        <span class="hljs-type">Mail</span> <span class="hljs-variable">mail</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Mail</span>(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">Email</span>(<span class="hljs-string">&quot;guillaume@dev-mind.fr&quot;</span>, <span class="hljs-string">&quot;Dev-Mind&quot;</span>),
                email.getSubject(),
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">Email</span>(email.getTo()),
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">Content</span>(<span class="hljs-string">&quot;text/html&quot;</span>, email.getContent()));

        <span class="hljs-keyword">try</span> {
            <span class="hljs-type">Request</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Request</span>();
            request.setMethod(Method.POST);
            request.setEndpoint(<span class="hljs-string">&quot;mail/send&quot;</span>);
            request.setBody(mail.build());
            sendGrid.api(request);
        }
        <span class="hljs-keyword">catch</span> (IOException ex) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(ex);
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714178.0605')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez voir que ce n&#8217;est pas plus compliqué que précédemment.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_utiliser_une_autre_api_de_mail_dans_une_application_web_flux">Utiliser une autre API de mail dans une application web flux</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Dans la dernière partie nous allons utiliser un autre service en ligne similaire à SendGRid qui se nomme <a href="https://elasticemail.com/">Elastic email</a>. L&#8217;avantage est que vous disposez d&#8217;un quota gratuit un peu plus important(150.000 emails par mois).</p>
</div>
<div class="paragraph">
<p>Le but est surtout de vous montrer comment faire un appel HTTP tout simple en utilisant <a href="https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html">RestTemplate</a> dans une application spring-web, ou <a href="https://docs.spring.io/spring-framework/docs/5.0.0.M3/javadoc-api/org/springframework/web/client/reactive/WebClient.html">WebClient</a> dans une application réactive spring-web-flux. Je vais vous montrer ici l&#8217;utilisation de WebClient.</p>
</div>
<div class="paragraph">
<p>Dans le fichier Gradle nous allons importer le starter webflux</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714178.1702">compile(<span class="hljs-string">&quot;org.springframework.boot:spring-boot-starter-webflux&quot;</span>)
testCompile(<span class="hljs-string">&quot;com.squareup.okhttp3:mockwebserver:3.9.1&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714178.1702')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>La deuxième librairie importée <a href="https://square.github.io/okhttp/">okhttp</a> est un client HTTP minimaliste que nous allons utiliser dans nos tests. En effet le projet spring-test doit encore intégrer de nouveaux utilitaires pour tester facilement WebClient (voir <a href="https://jira.spring.io/browse/SPR-15286">ticket ouvert</a>).</p>
</div>
<div class="paragraph">
<p>J&#8217;ajoute la configuration Elastic Mail (clé d&#8217;API) dans mon fichier application.yml</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714178.8123">devmind:
  elasticmail:
    apikey: <span class="hljs-meta">@dollar</span>@{ELASTICMAIL_APIKEY:Bar12345Bar12345}
    host: <span class="hljs-meta">@dollar</span>@{ELASTICMAIL_HOST:https:<span class="hljs-comment">//api.elasticemail.com}</span>
    version: <span class="hljs-meta">@dollar</span>@{ELASTICMAIL_VERSION:v2}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714178.8123')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Et je peux écrire mon service</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714179.9531"><span class="hljs-meta">@Component</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ElasticMailSender</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">EmailSender</span> {

    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">private</span> EmailProperties properties;
    <span class="hljs-keyword">private</span> WebClient webClient;

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">ElasticMailSender</span><span class="hljs-params">()</span> {
        webClient = WebClient.create(properties.getElasticmail().getHost());
    }

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">ElasticMailSender</span><span class="hljs-params">(EmailProperties properties, WebClient webClient)</span> {
        <span class="hljs-built_in">this</span>.properties = properties;
        <span class="hljs-built_in">this</span>.webClient = webClient;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">send</span><span class="hljs-params">(EmailMessage email)</span> {
        <span class="hljs-type">ElasticEmailResponseDTO</span> <span class="hljs-variable">response</span> <span class="hljs-operator">=</span> webClient.post()
            .uri(String.format(<span class="hljs-string">&quot;/%s/email/send&quot;</span>, properties.getElasticmail().getVersion()))
            .body(BodyInserters
                .fromFormData(<span class="hljs-string">&quot;apikey&quot;</span>, properties.getElasticmail().getApikey())
                .with(<span class="hljs-string">&quot;from&quot;</span>, <span class="hljs-string">&quot;guillaume@dev-mind.fr&quot;</span>)
                .with(<span class="hljs-string">&quot;fromName&quot;</span>, <span class="hljs-string">&quot;DEv-Mind&quot;</span>)
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
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714179.9531')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p><code><em>ElasticEmailResponseDTO</em></code> est un bean Java comprenant deux propriétés : succes (boolean) et error (message d&#8217;erreur éventuel). Le constructeur avec deux arguments est utilisés pour les tests afin de sucharger le Webclient. Voici la classe de test de ce service</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714180.7666"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ElasticMailSenderTest</span> {

    <span class="hljs-meta">@Rule</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">MockitoRule</span> <span class="hljs-variable">rule</span> <span class="hljs-operator">=</span> MockitoJUnit.rule();

    <span class="hljs-meta">@Mock</span>
    <span class="hljs-keyword">private</span> EmailProperties properties;

    <span class="hljs-keyword">private</span> MockWebServer server;
    <span class="hljs-keyword">private</span> WebClient webClient;
    <span class="hljs-keyword">private</span> ElasticMailSender elasticMailSender;

    <span class="hljs-meta">@Before</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setUp</span><span class="hljs-params">()</span>{
        <span class="hljs-type">ExternalApi</span> <span class="hljs-variable">api</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ExternalApi</span>();
        api.setApikey(<span class="hljs-string">&quot;mykey&quot;</span>);
        given(properties.getElasticmail()).willReturn(api);

        <span class="hljs-built_in">this</span>.server = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MockWebServer</span>();
        <span class="hljs-built_in">this</span>.webClient = Mockito.spy(WebClient.create(<span class="hljs-built_in">this</span>.server.url(<span class="hljs-string">&quot;/&quot;</span>).toString()));
        elasticMailSender = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ElasticMailSender</span>(properties, webClient);
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

    <span class="hljs-keyword">private</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">prepareResponse</span><span class="hljs-params">(Consumer<span class="hljs-meta">@LT</span> MockResponse<span class="hljs-meta">@GT</span> consumer)</span> {
        <span class="hljs-type">MockResponse</span> <span class="hljs-variable">response</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MockResponse</span>();
        consumer.accept(response);
        <span class="hljs-built_in">this</span>.server.enqueue(response);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714180.7666')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Comme je le disais plus haut l&#8217;ensemble du code est disponible sous <a href="https://github.com/Dev-Mind/devmind-email">Github</a>. J&#8217;espère vous avoir montrer qu&#8217;il était assez simple d&#8217;envoyer un mail dans une application Java.</p>
</div>
</div>
</div>`;