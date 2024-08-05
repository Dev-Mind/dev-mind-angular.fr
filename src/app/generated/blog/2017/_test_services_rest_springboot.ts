export const _test_services_rest_springboot:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Je voulais faire un focus dans cet article sur les possibilités offertes par SpringBoot (version 1.4.x) pour écrire des tests simples, lisibles et rapides de vos services REST. Niveau performance, le chargement du contexte est encore un peu long mais ceci devrait être encore amélioré dans les futures versions.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2017/test_services-rest-springboot_01.png" alt="Test avec SpringBoot">
</div>
</div>
<div class="paragraph">
<p>Prenons un exemple de controller REST.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722865739787.3787"><span class="hljs-meta">@RestController</span>
<span class="hljs-meta">@RequestMapping(&quot;/api/session&quot;)</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SessionController</span> {

    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">private</span> SessionService sessionService;

    <span class="hljs-meta">@GetMapping</span>
    <span class="hljs-keyword">public</span> List<span class="hljs-meta">@LTSession</span><span class="hljs-meta">@GT</span> findAll() {
        <span class="hljs-keyword">return</span> sessionService.findAll();
    }

    <span class="hljs-meta">@GetMapping((&quot;/{id}&quot;))</span>
    <span class="hljs-keyword">public</span> ResponseEntity<span class="hljs-meta">@LTSession</span><span class="hljs-meta">@GT</span> findOne(<span class="hljs-meta">@PathVariable(&quot;id&quot;)</span> String id) {
        <span class="hljs-type">Session</span> <span class="hljs-variable">session</span> <span class="hljs-operator">=</span> sessionService.findOne(id);

        <span class="hljs-keyword">if</span> (session == <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">return</span> notFound().build();
        }
        <span class="hljs-keyword">return</span> ok(session);
    }


    <span class="hljs-meta">@PostMapping</span>
        <span class="hljs-keyword">public</span> ResponseEntity<span class="hljs-meta">@LTSession</span><span class="hljs-meta">@GT</span> save(<span class="hljs-meta">@Valid</span> <span class="hljs-meta">@RequestBody</span> Session session) {
        <span class="hljs-keyword">return</span> ok(sessionService.save(session));
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722865739787.3787')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez noter qu’au lieu d’utiliser des annotations <code><em>@RequestMapping</em></code> sur toutes vos méthodes vous pouvez maintenant utilisez les annotations propres à chacun des verbes HTTP : <code><em>@GetMapping</em></code>, <code><em>@PostMapping</em></code> &#8230;&#8203;</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_valider_la_validité_des_arguments">Valider la validité des arguments</h2>
<div class="sectionbody">
<div class="paragraph">
<p>On veut souvent automatiser les contrôles de premier niveau des objets que nous envoyons à nos services REST. Pour celà vous pouvez utiliser la norme Bean Validation. Pour rappel vous avez besoin de rajouter 2 dépendances (une vers l’API, une vers une implémentation de cette dernière)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722865739788.383">compile <span class="hljs-string">&quot;javax.validation:validation-api:1.1.0.Final&quot;</span>
compile <span class="hljs-string">&quot;org.hibernate:hibernate-validator:1.1.0.Final&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722865739788.383')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Concrètement vous pouvez ensuite utiliser l’annotation <code><em>@Valid</em></code> devant les paramètres de votre service (voir la méthode save) et annoter votre DTO.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722865739789.7764"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Session</span> {
    <span class="hljs-keyword">private</span> String id;
    <span class="hljs-meta">@NotEmpty</span>
    <span class="hljs-keyword">private</span> String title;
    <span class="hljs-meta">@NotNull</span>
    <span class="hljs-meta">@Min(1)</span>
    <span class="hljs-meta">@Max(500)</span>
    <span class="hljs-keyword">private</span> Integer maxAttendees;
    <span class="hljs-comment">// ...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722865739789.7764')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_ecrire_un_test">Ecrire un test</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Oups&#8230;&#8203;Je voulais faire un article sur les tests et je n’en ai encore pas parlé… allez c’est parti nous allons créer une classe de test</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722865739789.8"><span class="hljs-meta">@RunWith(SpringRunner.class)</span>
<span class="hljs-meta">@WebMvcTest(SessionController.class)</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SessionControllerTest</span> {
    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">private</span> MockMvc mvc;

    <span class="hljs-meta">@MockBean</span>
    <span class="hljs-keyword">private</span> SessionService sessionService;

    <span class="hljs-keyword">private</span> <span class="hljs-type">ObjectMapper</span> <span class="hljs-variable">mapper</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ObjectMapper</span>();

}</code><button class="btn-copy-code" onclick="copyToClipboard('1722865739789.8')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez noter que vous pouvez maintenant utiliser l’annotation <code><em>@WebMvcTest(SessionController.class)</em></code> pour ne tester qu’un seul controller sans à avoir à charger toute l’application Spring Boot et donc gagner en rapidité d&#8217;exécution.</p>
</div>
<div class="paragraph">
<p>L’objet MockMvc du projet spring-test va nous permettre d’invoquer notre API Rest tout en moquant les collaborateurs. Les mocks vont être créés par spring-boot-test qui apporte une encapsulation de Mockito (annotation <code><em>@MockBean</em></code>).</p>
</div>
<div class="paragraph">
<p>Le dernier élément est le mapper qui va permettre de convertir nos données en JSON lorsque nous voulons invoquer notre API comme le ferait par exemple un client JavaScript.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_un_premier_exemple_de_test_méthode_get">Un premier exemple de test méthode GET</h2>
<div class="sectionbody">
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722865739791.9067"><span class="hljs-meta">@Test</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldFindAllSessions</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {

    given(<span class="hljs-built_in">this</span>.sessionService.findAll())
            .willReturn(asList(
                    <span class="hljs-keyword">new</span> <span class="hljs-title class_">Session</span>().withId(<span class="hljs-string">&quot;1&quot;</span>).withTitle(<span class="hljs-string">&quot;title1&quot;</span>),
                    <span class="hljs-keyword">new</span> <span class="hljs-title class_">Session</span>().withId(<span class="hljs-string">&quot;2&quot;</span>).withTitle(<span class="hljs-string">&quot;title2&quot;</span>)));

    <span class="hljs-built_in">this</span>.mvc.perform(get(<span class="hljs-string">&quot;/api/session&quot;</span>))
            .andExpect(status().isOk())
            .andExpect(jsonPath(<span class="hljs-string">&quot;@dollar@.length()&quot;</span>, is(<span class="hljs-number">2</span>)))
            .andExpect(jsonPath(<span class="hljs-string">&quot;@dollar@.[0].title&quot;</span>, is(<span class="hljs-string">&quot;title1&quot;</span>)));
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722865739791.9067')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Dans ce test nous commençons par définir le comportement de notre collaborateur (sessionService) via Mockito (j’utilise la syntaxe BDD qui est poussée par l’équipe de Mockito).</p>
</div>
<div class="paragraph">
<p>La fluent API de mockMVC et les différents builders permettent d’écrire des tests concis et clairs. En gros ici j’appelle via un GET l’URL <code><em>/api/session</em></code> et j’attends en retour un code statut à 200 (<code><em>status().isOk()</em></code>)</p>
</div>
<div class="paragraph">
<p>Vous pouvez utiliser différents matchers pour vérifier le contenu de la réponse. Ici j’utilise JsonPath qui me permet de parser le résultat de l’appel.</p>
</div>
<div class="paragraph">
<p>Une petite astuce si vous utilisez SpringSecurity. Vous pouvez utiliser un <code><em>RequestPostProcessor</em></code> mis à disposition dans le projet <code><em>spring-security-test</em></code>. Mon appel devient</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722865739791.5857"><span class="hljs-built_in">this</span>.mvc.perform(get(<span class="hljs-string">&quot;/api/session&quot;</span>).with(httpBasic(<span class="hljs-string">&quot;admin&quot;</span>, <span class="hljs-string">&quot;password&quot;</span>)))
            .andExpect(status().isOk())
            .andExpect(jsonPath(<span class="hljs-string">&quot;@dollar@.length()&quot;</span>, is(<span class="hljs-number">2</span>)))
            .andExpect(jsonPath(<span class="hljs-string">&quot;@dollar@.[0].title&quot;</span>, is(<span class="hljs-string">&quot;title1&quot;</span>)));</code><button class="btn-copy-code" onclick="copyToClipboard('1722865739791.5857')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez aussi choisir de désactiver la sécurité en utilisant la propriété secure de l&#8217;annotation <code><em>@WebMvcTest</em></code> :</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722865739791.524"><span class="hljs-meta">@WebMvcTest(value = SessionController.class, secure = false)</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722865739791.524')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Nous avons vu comment tester un GET. Tester une méthode POST n’est pas très différent.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_exemple_de_test_méthode_post">Exemple de test méthode POST</h2>
<div class="sectionbody">
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722865739792.2395"><span class="hljs-meta">@Test</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldCreateSession</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {

    <span class="hljs-type">Session</span> <span class="hljs-variable">session</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Session</span>().withTitle(<span class="hljs-string">&quot;My Spring session&quot;</span>).withMaxAttendees(<span class="hljs-number">10</span>);

    given(<span class="hljs-built_in">this</span>.sessionService.save(any(Session.class)))
           .willReturn(session.withId(<span class="hljs-string">&quot;id&quot;</span>));

    <span class="hljs-built_in">this</span>.mvc.perform(
            post(<span class="hljs-string">&quot;/api/session&quot;</span>)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(session))
    )
            .andExpect(status().isOk())
            .andExpect(jsonPath(<span class="hljs-string">&quot;@dollar@.id&quot;</span>, is(<span class="hljs-string">&quot;id&quot;</span>)))
            .andExpect(jsonPath(<span class="hljs-string">&quot;@dollar@.title&quot;</span>, is(<span class="hljs-string">&quot;My Spring session&quot;</span>)));
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722865739792.2395')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Quand vous envoyez vos données via un POST à un service REST vous devez spécifier le content type et sérialiser vos données en JSON sous forme d’une chaine de caractère.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_exemple_de_test_avec_validation">Exemple de test avec validation</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Regardons maintenant ce qu’il se passe si les données ne correspondent pas aux contraintes spécifiées par Bean Validation (voir plus haut). Si tout va bien une erreur 400 est retournée</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722865739793.7544"><span class="hljs-meta">@Test</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldNotCreateSessionWhenBeanInvalid</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {

    <span class="hljs-type">Session</span> <span class="hljs-variable">session</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Session</span>();

    <span class="hljs-built_in">this</span>.mvc.perform(
            post(<span class="hljs-string">&quot;/api/session&quot;</span>)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(session))
                    .with(httpBasic(<span class="hljs-string">&quot;admin&quot;</span>, <span class="hljs-string">&quot;password&quot;</span>))
    )
            .andExpect(status().isBadRequest());
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722865739793.7544')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Voila j’espère vous avoir montré par cet exemple que les tests de vos services REST peuvent être simples à écrire.</p>
</div>
</div>
</div>`;