export const _spring_security:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_introduction">Introduction</a></li>
<li><a class="link" fragment="#_cors">CORS</a></li>
<li><a class="link" fragment="#_authentication">Authentication</a></li>
<li><a class="link" fragment="#_authorization">Authorization</a></li>
<li><a class="link" fragment="#_how_to_install">How to install ?</a></li>
<li><a class="link" fragment="#_flask_security_level_1"><span class="icon">[flask&#93;</span> : Security level 1</a></li>
<li><a class="link" fragment="#_how_it_works">How it works ?</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_web_filter">Web filter</a></li>
<li><a class="link" fragment="#_architecture">Architecture</a></li>
</ul>
</li>
<li><a class="link" fragment="#_configuration">Configuration</a></li>
<li><a class="link" fragment="#_get_the_user">Get the user</a></li>
<li><a class="link" fragment="#_check_permission">Check permission</a></li>
<li><a class="link" fragment="#_flask_personalize_your_configuration"><span class="icon">[flask&#93;</span> : Personalize your configuration</a></li>
<li><a class="link" fragment="#_unit_tests">Unit tests</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_resolve_error_401">Resolve error 401</a></li>
<li><a class="link" fragment="#_resolve_error_403">Resolve error 403</a></li>
<li><a class="link" fragment="#_on_a_web_application">On a web application</a></li>
</ul>
</li>
</ul>
</div>
<div class="sect1">
<h2 id="_introduction">Introduction</h2>
<div class="sectionbody">
<div class="paragraph">
<p><a href="https://docs.spring.io/spring-security/reference/index.html">Spring Security</a> provides comprehensive support for authentication, authorization, and protection against <a href="https://docs.spring.io/spring-security/reference/features/exploits/index.html">common exploits</a>.</p>
</div>
<div class="paragraph text-center">
<p><span class="image"><img src="../../img/training/spring-security.png" alt="spring security" width="800"></span></p>
</div>
<div class="paragraph">
<p>The security is a complex subject. We retrieve this complexity in Spring Security</p>
</div>
<div class="paragraph">
<p>But Spring Security and Spring Boot come with an abstraction to make easier the integration with the main tools and concepts : SSO, OpenID, Oauth, NTLM, LDAP, Kerberos</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_cors">CORS</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Today browsers forbid a website to access to resources served by another website defined on a different domain.</p>
</div>
<div class="paragraph">
<p>If you want to call your API on <a href="http://localhost:8080" class="bare">http://localhost:8080</a> from a webapp exposed on a different port you should have this error.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><span class="hljs-title class_">Access</span> to fetch at <span class="hljs-string">&#x27;http://localhost:8080/api/rooms&#x27;</span> <span class="hljs-keyword">from</span> origin <span class="hljs-string">&#x27;null&#x27;</span> has been blocked by <span class="hljs-variable constant_">CORS</span> <span class="hljs-attr">policy</span>: <span class="hljs-title class_">No</span> <span class="hljs-string">&#x27;Access-Control-Allow-Origin&#x27;</span> header is present on the requested resource. <span class="hljs-title class_">If</span> an opaque response serves your needs, set the request<span class="hljs-string">&#x27;s mode to &#x27;</span>no-cors<span class="hljs-string">&#x27; to fetch the resource with CORS disabled.</span></pre>
</div>
</div>
<div class="paragraph">
<p><a href="https://en.wikipedia.org/wiki/Cross-origin_resource_sharing">Cross-Origin Resource Sharing</a> is a mechanism that allows this dialog</p>
</div>
<div class="paragraph">
<p>To resolve this problem you have to manage CORS headers or you install a proxy.</p>
</div>
<div class="paragraph">
<p>As we won&#8217;t install a web proxy we will manage CORS in our app</p>
</div>
<div class="paragraph">
<p>Add annotation <code>@CrossOrigin</code> to your <code>@RestController</code> to open your API to all other apps</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604316537.369"><span class="hljs-meta">@CrossOrigin</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722604316537.369')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If your Vue.js app is launched on <a href="http://localhost:3010" class="bare">http://localhost:3010</a> ou can open your API only for this app</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604316537.9812"><span class="hljs-meta">@CrossOrigin(origins = { &quot;http://localhost:3010&quot; }, maxAge = 3600)</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722604316537.9812')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_authentication">Authentication</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Authentication is how we verify the identity of who is trying to access a particular resource.</p>
</div>
<div class="paragraph text-center">
<p><span class="image"><img src="../../img/training/spring-security/authentication.png" alt="authentication" width="800"></span></p>
</div>
<div class="paragraph">
<p>A common way to authenticate users is to force them to enter a username and password. If user is unknown, app will return a 401 error (Bad authentication)</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_authorization">Authorization</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Once authentication is performed we know the identity and can perform authorization.</p>
</div>
<div class="paragraph text-center">
<p><span class="image"><img src="../../img/training/spring-security/authorization.png" alt="authorization" width="800"></span></p>
</div>
<div class="paragraph">
<p>If user has no access to a resource, he will receive a 403 error (Forbidden)</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_how_to_install">How to install ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>You can use the Spring Boot starters (one for the main libs and one for tests)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604316537.5894">implementation(<span class="hljs-string">&quot;org.springframework.boot:spring-boot-starter-security&quot;</span>)
testImplementation(<span class="hljs-string">&quot;org.springframework.security:spring-security-test&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316537.5894')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>With nothing else, Spring Security will add a basic auth to your application and you can configure the default user in <code>application.properties</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre>spring.security.user.name=user
spring.security.user.password=password</pre>
</div>
</div>
<div class="paragraph">
<p>Spring generate this page for you</p>
</div>
<div class="paragraph text-center">
<p><span class="image"><img src="../../img/training/spring-security/authent_screen.png" alt="authent screen" width="600"></span></p>
</div>
<div class="paragraph">
<p>You can logout when you try to call
<a href="http://localhost:8080/logout" class="bare">http://localhost:8080/logout</a></p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_security_level_1"><span class="icon">[flask&#93;</span> : Security level 1</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Update your project to be able to secure you app with the default security form (follow the given steps above)</p>
</div>
<div class="paragraph">
<p>At this step you can connect to your app but several things must be set to continue to use Swagger and run your controller tests. We will fix these problems in the next lab.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_how_it_works">How it works ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>On a Spring web application, Spring Security support is based on Servlet Filters, so it is helpful to look at the role of Filters generally first.</p>
</div>
<div class="sect2">
<h3 id="_web_filter">Web filter</h3>
<div class="paragraph">
<p>When a request is sent to call a controller, the HTTP request is sent to a chain of filters. Activated filters and servlets depend on the path of the request URI.</p>
</div>
<div class="paragraph text-center">
<p><span class="image"><img src="../../img/training/spring-security/filter.png" alt="filter" width="900"></span></p>
</div>
<div class="paragraph">
<p>In a Spring MVC application you have only one Servlet. This Servlet is an instance of DispatcherServlet. The servlet can handle a single HttpServletRequest and HttpServletResponse.</p>
</div>
<div class="paragraph">
<p>Filters can read the request and stop the filter chain if we have a problem and the filter can also update the response</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604316538.752"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">doFilter</span><span class="hljs-params">(
        ServletRequest request,
        ServletResponse response,
        FilterChain chain)</span> {
	  <span class="hljs-comment">// do something before the rest of the application</span>
    chain.doFilter(request, response); <span class="hljs-comment">// invoke the rest of the application</span>
    <span class="hljs-comment">// do something after the rest of the application</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316538.752')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Filters can be activated only on a given path URI and you can add different filter chain depending on this path</p>
</div>
<div class="paragraph text-center">
<p><span class="image"><img src="../../img/training/spring-security/filter2.png" alt="filter2" width="900"></span></p>
</div>
<div class="paragraph">
<p>Spring Security add several filters. And Spring filter will throw an exception if user is not authenticated or if he has no right to access to a resource</p>
</div>
<div class="paragraph text-center">
<p><span class="image"><img src="../../img/training/spring-security/filter3.png" alt="filter3" width="900"></span></p>
</div>
</div>
<div class="sect2">
<h3 id="_architecture">Architecture</h3>
<div class="paragraph">
<p>The security context is hold by a SecurityContextHolder. This object uses a ThreadLocal to store its data (one value by user thread)</p>
</div>
<div class="paragraph text-center">
<p><span class="image"><img src="../../img/training/spring-security/architecture.png" alt="architecture" width="500"></span></p>
</div>
<div class="paragraph">
<p><code>SecurityContext</code> contains an <code>Authentication</code> object.</p>
</div>
<div class="paragraph">
<p>An <code>Authentication</code> represents the currently authenticated user.</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>principal</code> contains the details (often an instance of UserDetails)</p>
</li>
<li>
<p><code>credentials</code> contains the password or the token</p>
</li>
<li>
<p><code>authorities</code> contains the user permissions. These permissions are usually loaded by a UserDetailsService.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>An <code>Authentication</code> request is processed by an AuthenticationProvider. You can have different  providers in you app. For example,</p>
</div>
<div class="paragraph text-center">
<p><span class="image"><img src="../../img/training/spring-security/architecture2.png" alt="architecture2" width="700"></span></p>
</div>
<div class="paragraph">
<p>DaoAuthenticationProvider supports username/password based authentication while JwtAuthenticationProvider supports authenticating a JWT token.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_configuration">Configuration</h2>
<div class="sectionbody">
<div class="paragraph">
<p>We can configure our own <code>UserDetailsService</code> to manage the user and their permissions. In this basic example we will use a in memory configuration</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604316538.868"><span class="hljs-meta">@Configuration</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SpringSecurityConfig</span> {

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">ROLE_USER</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;USER&quot;</span>;

    <span class="hljs-meta">@Bean</span>
    <span class="hljs-keyword">public</span> UserDetailsService <span class="hljs-title function_">userDetailsService</span><span class="hljs-params">()</span> {
        <span class="hljs-comment">// We create a password encoder</span>
        <span class="hljs-type">PasswordEncoder</span> <span class="hljs-variable">encoder</span> <span class="hljs-operator">=</span> PasswordEncoderFactories.createDelegatingPasswordEncoder();
        <span class="hljs-type">InMemoryUserDetailsManager</span> <span class="hljs-variable">manager</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">InMemoryUserDetailsManager</span>();
        manager.createUser(
                User.withUsername(<span class="hljs-string">&quot;user&quot;</span>).password(encoder.encode(<span class="hljs-string">&quot;myPassword&quot;</span>)).roles(ROLE_USER).build()
        );
        <span class="hljs-keyword">return</span> manager;
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316538.868')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can add a <code>SecurityFilterChain</code> to secure an http route. The default configuration in Spring Boot is this one</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604316539.8687"><span class="hljs-meta">@Bean</span>
<span class="hljs-meta">@Order(SecurityProperties.BASIC_AUTH_ORDER)</span>
SecurityFilterChain <span class="hljs-title function_">defaultSecurityFilterChain</span><span class="hljs-params">(HttpSecurity http)</span> <span class="hljs-keyword">throws</span> Exception {
			http.authorizeHttpRequests((requests) <span class="hljs-meta">@LAMBDA</span> requests.anyRequest().authenticated());
			http.formLogin(withDefaults());
			http.httpBasic(withDefaults());
			<span class="hljs-keyword">return</span> http.build();
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316539.8687')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) Ensures that any request to our application requires the user to be authenticated</p>
</li>
<li>
<p>(2) Allows users to authenticate with form based login</p>
</li>
<li>
<p>(3) Allows users to authenticate with HTTP Basic authentication</p>
</li>
</ul>
</div>
<div style="page-break-after: always;"></div>
<div class="paragraph">
<p>But you can use several <code>SecurityFilterChain</code> to implement different security level. You can add another filter to only let admin user access to the route <code>/api/**</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604316540.6675"><span class="hljs-meta">@Bean</span>
<span class="hljs-meta">@Order(1)</span>
<span class="hljs-keyword">public</span> SecurityFilterChain <span class="hljs-title function_">filterChain</span><span class="hljs-params">(HttpSecurity http)</span> <span class="hljs-keyword">throws</span> Exception {
    <span class="hljs-keyword">return</span> http
            .authorizeHttpRequests((requests) <span class="hljs-meta">@LAMBDA</span> requests
                    .requestMatchers(AntPathRequestMatcher.antMatcher(<span class="hljs-string">&quot;/api/**&quot;</span>)).hasRole(ROLE_USER) <span class="hljs-comment">// (2)</span>
                    .anyRequest().permitAll() <span class="hljs-comment">// (3)</span>
            )
            .formLogin(withDefaults())
            .httpBasic(withDefaults())
            .build();
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316540.6675')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) If you have more than one filter you need to use an annotation <code>Order</code> to define the first one to use</p>
</li>
<li>
<p>(2) requestMatchers states that this HttpSecurity will only be applicable to URLs that start with <code>/api/</code>. And for each URL we want an authenticated user with the User role</p>
</li>
<li>
<p>(3) we permit all other requests</p>
</li>
</ul>
</div>
<div style="page-break-after: always;"></div>
</div>
</div>
<div class="sect1">
<h2 id="_get_the_user">Get the user</h2>
<div class="sectionbody">
<div class="paragraph">
<p>The simplest way to retrieve the currently authenticated principal is via a static call to the SecurityContextHolder.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604316540.622"><span class="hljs-type">Authentication</span> <span class="hljs-variable">authentication</span> <span class="hljs-operator">=</span> SecurityContextHolder.getContext().getAuthentication();
<span class="hljs-type">String</span> <span class="hljs-variable">currentPrincipalName</span> <span class="hljs-operator">=</span> authentication.getName();</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316540.622')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Alternatively, we can also inject the user via the AuthenticationPrincipal annotation in a web controller.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604316541.25"><span class="hljs-meta">@CrossOrigin</span>
<span class="hljs-meta">@RestController</span>
<span class="hljs-meta">@RequestMapping(&quot;/api/admin/users&quot;)</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SecurityController</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">record</span> <span class="hljs-title class_">User</span><span class="hljs-params">(String username)</span> {
    }

    <span class="hljs-meta">@GetMapping(path = &quot;/me&quot;)</span>
    <span class="hljs-keyword">public</span> User <span class="hljs-title function_">findUserName</span><span class="hljs-params">(<span class="hljs-meta">@AuthenticationPrincipal</span> UserDetails userDetails)</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">User</span>(userDetails.getUsername());
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316541.25')">Copy</button></pre>
</div>
</div>
<div style="page-break-after: always;"></div>
</div>
</div>
<div class="sect1">
<h2 id="_check_permission">Check permission</h2>
<div class="sectionbody">
<div class="paragraph">
<p>You can configure your app to secure yours methods. For that, add an annotation <code>PreAuthorize</code> where you need to check a user role</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604316541.5952"><span class="hljs-meta">@PreAuthorize(&quot;hasRole(&#x27;ADMIN&#x27;)&quot;)</span> <span class="hljs-comment">// 1</span>
<span class="hljs-meta">@GetMapping(path = &quot;/me&quot;)</span>
<span class="hljs-keyword">public</span> User <span class="hljs-title function_">findUserName</span><span class="hljs-params">(<span class="hljs-meta">@AuthenticationPrincipal</span> UserDetails userDetails)</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">User</span>(userDetails.getUsername());
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316541.5952')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) Here we add a constraint on the user role and user must have the role ADMIN</p>
</li>
</ul>
</div>
<div style="page-break-after: always;"></div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_personalize_your_configuration"><span class="icon">[flask&#93;</span> : Personalize your configuration</h2>
<div class="sectionbody">
<div class="ulist">
<ul>
<li>
<p>Implement a custom config to manage your users in your own <code>UserDetailsService</code>. You must have one classical user and one admin user</p>
</li>
<li>
<p>Configure security to secure all the routes exposed with /api. The user must have the role User or Admin to access to our api.</p>
</li>
<li>
<p>Add a new REST endpoint to return the username. This endpoint must be only accessible to an admin user</p>
</li>
<li>
<p>the H2 console must be also secured and only admins can manage the database via this console</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_unit_tests">Unit tests</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_resolve_error_401">Resolve error 401</h3>
<div class="paragraph">
<p>With Spring Security configuration you have to update your controller tests. You have to simulate a user to not receive a 401 or 403 HTTP error.</p>
</div>
<div class="paragraph">
<p>To simulate a user you can use a Spring Security test annotation called <code>@WithMockUser</code></p>
</div>
<div class="paragraph">
<p>For example in the following test, you can use this annotation to define a user with a given name or roles</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604316542.6956"><span class="hljs-meta">@Test</span>
<span class="hljs-meta">@WithMockUser(username = &quot;admin&quot;, roles = &quot;ADMIN&quot;)</span>
<span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldLoadAWindowAndReturnNullIfNotFound</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {
    given(windowDao.findById(<span class="hljs-number">999L</span>)).willReturn(Optional.empty());
        mockMvc.perform(get(<span class="hljs-string">&quot;/api/windows/999&quot;</span>).accept(APPLICATION_JSON))
                <span class="hljs-comment">// check the HTTP response</span>
                .andExpect(status().isOk())
                <span class="hljs-comment">// the content can be tested with Json path</span>
                .andExpect(content().string(<span class="hljs-string">&quot;&quot;</span>));
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316542.6956')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_resolve_error_403">Resolve error 403</h3>
<div class="paragraph">
<p>For put, post or delete HTTP methods, Spring Security add a security level and force you to send a CSRF token. You can read more information on the <a href="https://docs.spring.io/spring-security/reference/features/exploits/csrf.html">Spring website</a>.</p>
</div>
</div>
<div class="sect2">
<h3 id="_on_a_web_application">On a web application</h3>
<div class="paragraph">
<p>If you use the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</a>, you can update the headers sent in a request. For example</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1722604316543.5737"><span class="hljs-keyword">const</span> headers = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Headers</span>();
headers.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;Authorization&#x27;</span>, <span class="hljs-string">&#x27;Basic &#x27;</span> + <span class="hljs-title function_">btoa</span>(username + <span class="hljs-string">&quot;:&quot;</span> + password));
<span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;myurl&#x27;</span>, {headers});</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316543.5737')">Copy</button></pre>
</div>
</div>
<div class="sect3">
<h4 id="_in_the_tests">In the tests</h4>
<div class="paragraph">
<p>In your test you can configure csrf like on the code below</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722604316543.2913"><span class="hljs-meta">@Test</span>
<span class="hljs-meta">@WithMockUser(username = &quot;admin&quot;, roles = &quot;ADMIN&quot;)</span>
<span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldSwitchWindow</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {
    <span class="hljs-type">Window</span> <span class="hljs-variable">expectedWindow</span> <span class="hljs-operator">=</span> createWindow(<span class="hljs-string">&quot;window 1&quot;</span>);
    Assertions.assertThat(expectedWindow.getWindowStatus()).isEqualTo(WindowStatus.OPEN);

    given(windowDao.findById(<span class="hljs-number">999L</span>)).willReturn(Optional.of(expectedWindow));

    mockMvc.perform(put(<span class="hljs-string">&quot;/api/windows/999/switch&quot;</span>).accept(APPLICATION_JSON).with(csrf()))
            <span class="hljs-comment">// check the HTTP response</span>
            .andExpect(status().isOk())
            .andExpect(jsonPath(<span class="hljs-string">&quot;@dollar@.name&quot;</span>).value(<span class="hljs-string">&quot;window 1&quot;</span>))
            .andExpect(jsonPath(<span class="hljs-string">&quot;@dollar@.windowStatus&quot;</span>).value(<span class="hljs-string">&quot;CLOSED&quot;</span>));
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316543.2913')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_in_the_api">In the API</h4>
<div class="paragraph">
<p>You can also disable csrf on your global configuration to be able to use your REST API. To do that add</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight">http
    .<span class="hljs-title function_">csrf</span>(<span class="hljs-title class_">AbstractHttpConfigurer</span>::disable)
    .<span class="hljs-title function_">headers</span>(headers @<span class="hljs-variable constant_">LAMBDA</span> headers.<span class="hljs-title function_">frameOptions</span>(<span class="hljs-title class_">HeadersConfigurer</span>.<span class="hljs-property">FrameOptionsConfig</span>::disable));</pre>
</div>
</div>
<div class="paragraph">
<p>in your <code>SpringSecurityConfig</code> when you configure the <code>SecurityFilterChain</code> bean</p>
</div>
</div>
<div class="sect3">
<h4 id="_connect_your_own_login_page">Connect your own login page</h4>
<div class="paragraph">
<p>If nous need to use your own login page, you can configure Spring Security to use it.</p>
</div>
<div class="paragraph">
<p>You can read this <a href="https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/form.html">documentation</a></p>
</div>
</div>
</div>
</div>
</div>`;