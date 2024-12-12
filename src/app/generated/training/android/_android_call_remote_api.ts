export const _android_call_remote_api:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_explore_api">Explore API</a></li>
<li><a class="link" fragment="#_retrofit">Retrofit</a></li>
<li><a class="link" fragment="#_flask_configure_retrofit"><span class="icon">[flask&#93;</span> : Configure Retrofit</a></li>
<li><a class="link" fragment="#_flask_use_retrofit"><span class="icon">[flask&#93;</span> : Use Retrofit</a></li>
<li><a class="link" fragment="#_main_thread">Main thread</a></li>
<li><a class="link" fragment="#_coroutines">Coroutines</a></li>
<li><a class="link" fragment="#_flask_use_coroutines_to_resolve_main_thread_error"><span class="icon">[flask&#93;</span> : Use coroutines to resolve main thread error</a></li>
<li><a class="link" fragment="#_android_permission">Android permission</a></li>
<li><a class="link" fragment="#_use_viewmodel_in_your_code">Use ViewModel in your code</a></li>
<li><a class="link" fragment="#_flask_update_the_screen_to_display_and_update_the_detail"><span class="icon">[flask&#93;</span> : Update the screen to display and update the detail</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In this lesson, we will see how to call a remote HTTP API with an external library called <a href="https://square.github.io/retrofit/">Retrofit</a>. <a href="https://square.github.io/retrofit/">Retrofit</a> was not done by Google. But when a library created by the community is widely used, well designed, the Android team does not hesitate to encourage its use.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/android-call-remote.png" alt="Call an HTTP API with Android" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_explore_api">Explore API</h2>
<div class="sectionbody">
<div class="paragraph">
<p>If you followed the previous code labs to build a Spring application, you will be able to use your own app. You should have an API to list building rooms and other to load detailed information on a room.</p>
</div>
<div class="paragraph">
<p>For the moment data are static in <code>com.automacorp.model.RoomService</code>. Now we will update this service to read data stored on a web server, as a REST web service.</p>
</div>
<div class="paragraph">
<p>You can use your own Spring API if you followed Spring course or my implementation available on <a href="https://automacorp.devmind.cleverapps.io/swagger-ui/index.html" class="bare">https://automacorp.devmind.cleverapps.io/swagger-ui/index.html</a>. This app is secured by basic auth and you can the username <code>user</code> and his password <code>password</code>.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_retrofit">Retrofit</h2>
<div class="sectionbody">
<div class="paragraph">
<p>To interact with a remote HTTP API in Android app, your app needs to</p>
</div>
<div class="ulist">
<ul>
<li>
<p>establish a network connection to remote server which exposes your REST service and</p>
</li>
<li>
<p>communicate with that server, and then</p>
</li>
<li>
<p>receive its response data and</p>
</li>
<li>
<p>parse the data to be usable in your code.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Retrofit was made to do all these steps easily. For the last one, we need a converter to deserialize HTTP body. Several converters are available. We will use <a href="https://github.com/square/moshi/">Moshi</a> library</p>
</div>
<div class="paragraph">
<p>The mains goal of Retrofit is to turn your HTTP API into a Java interface. For example</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714339.185"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">RoomsApiService</span> {
    <span class="hljs-meta">@GET(<span class="hljs-string">&quot;rooms&quot;</span>)</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findAll</span><span class="hljs-params">()</span></span>: <span class="hljs-symbol">Call@</span><span class="hljs-symbol">LTList@</span><span class="hljs-symbol">LTRoomDto@</span><span class="hljs-symbol">GT@</span>GT

    <span class="hljs-meta">@GET(<span class="hljs-string">&quot;rooms/{id}&quot;</span>)</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findById</span><span class="hljs-params">(<span class="hljs-meta">@Path(<span class="hljs-string">&quot;id&quot;</span>)</span> id: <span class="hljs-type">Long</span>)</span></span>: <span class="hljs-symbol">Call@</span><span class="hljs-symbol">LTRoomDto@</span>GT

    <span class="hljs-meta">@PUT(<span class="hljs-string">&quot;rooms/{id}&quot;</span>)</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">updateRoom</span><span class="hljs-params">(<span class="hljs-meta">@Path(<span class="hljs-string">&quot;id&quot;</span>)</span> id: <span class="hljs-type">Long</span>, <span class="hljs-meta">@Body</span> room: <span class="hljs-type">RoomCommandDto</span>)</span></span>: <span class="hljs-symbol">Call@</span><span class="hljs-symbol">LTRoomDto@</span>GT

    <span class="hljs-comment">//...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714339.185')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Annotations (GET, POST, PUT, DELETE,&#8230;&#8203;) on the interface methods and its parameters indicate how a request will be handled.</p>
</div>
<div class="paragraph">
<p>A request URL can be updated dynamically using replacement blocks and parameters on the method. A replacement block is an alphanumeric string surrounded by { and }.</p>
</div>
<div class="paragraph">
<p>You can bind a parameter in path</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714339.1865"><span class="hljs-meta">@GET(<span class="hljs-string">&quot;rooms/{id}&quot;</span>)</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findById</span><span class="hljs-params">(<span class="hljs-meta">@Path(<span class="hljs-string">&quot;id&quot;</span>)</span> id: <span class="hljs-type">Long</span>)</span></span>: <span class="hljs-symbol">Call@</span><span class="hljs-symbol">LTRoomDto@</span>GT</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714339.1865')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>or a parameter in query</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714340.5234"><span class="hljs-meta">@GET(<span class="hljs-string">&quot;rooms&quot;</span>)</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findAll</span><span class="hljs-params">(<span class="hljs-meta">@Query(<span class="hljs-string">&quot;sort&quot;</span>)</span> sort: <span class="hljs-type">String</span>)</span></span>: <span class="hljs-symbol">Call@</span><span class="hljs-symbol">LTList@</span><span class="hljs-symbol">LTRoomDto@</span><span class="hljs-symbol">GT@</span>GT</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714340.5234')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>An object can be specified for POST or PUT HTTP requests @Body annotation. In this case, Retrofit will use converter defined in your conf to serialize body object in JSON</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714340.762"><span class="hljs-meta">@PUT(<span class="hljs-string">&quot;rooms/{id}&quot;</span>)</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">updateRoom</span><span class="hljs-params">(<span class="hljs-meta">@Path(<span class="hljs-string">&quot;id&quot;</span>)</span> id: <span class="hljs-type">Long</span>, <span class="hljs-meta">@Body</span> room: <span class="hljs-type">RoomCommandDto</span>)</span></span>: <span class="hljs-symbol">Call@</span><span class="hljs-symbol">LTRoomDto@</span>GT</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714340.762')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>In my example RoomCommandDto is different than RoomDto. If you use my remote API available on on <a href="https://automacorp.devmind.cleverapps.io" class="bare">https://automacorp.devmind.cleverapps.io</a> you could define these objects in your code</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714340.2961"><span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomDto</span>(
    <span class="hljs-keyword">val</span> id: <span class="hljs-built_in">Long</span>,
    <span class="hljs-keyword">val</span> name: String,
    <span class="hljs-keyword">val</span> currentTemperature: <span class="hljs-built_in">Double</span>?,
    <span class="hljs-keyword">val</span> targetTemperature: <span class="hljs-built_in">Double</span>?,
    <span class="hljs-keyword">val</span> windows: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTWindowDto@</span>GT
)

<span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomCommandDto</span>(
    <span class="hljs-keyword">val</span> name: String,
    <span class="hljs-keyword">val</span> currentTemperature: <span class="hljs-built_in">Double</span>?,
    <span class="hljs-keyword">val</span> targetTemperature: <span class="hljs-built_in">Double</span>?,
    <span class="hljs-keyword">val</span> floor: <span class="hljs-built_in">Int</span> = <span class="hljs-number">1</span>,
    <span class="hljs-comment">// Set to the default building ID (useful when you have not created screens to manage buildings)</span>
    <span class="hljs-keyword">val</span> buildingId: <span class="hljs-built_in">Long</span> = -<span class="hljs-number">10</span>
)</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714340.2961')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>These 2 objects are 2 projections of a Room: one for the read, one for the update.
You will find more information on <a href="https://square.github.io/retrofit/">Retrofit</a> website</p>
</div>
<div class="paragraph">
<p>It is the time to test by yourself.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_configure_retrofit"><span class="icon">[flask&#93;</span> : Configure Retrofit</h2>
<div class="sectionbody">
<div class="paragraph">
<p>As I said we need to install Retrofit to call a remote API and we also need another library to serialize/deserialize our Kotlin objects in/from JSON.</p>
</div>
<div class="paragraph">
<p>Android project use now the Gradle catalog version. Open the file <code>libs.versions.toml</code>. This file register all versions of libraries used in your project. You can add a new line to register the version of Retrofit and Moshi</p>
</div>
<div class="paragraph">
<p>Each section are defined by [] and the name of the section.</p>
</div>
<div class="paragraph">
<p>In the section <code>[versions]</code> you can add the version of Retrofit and Moshi</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-toml" id="1734011714341.2783"><span class="hljs-attr">retrofit</span> = <span class="hljs-string">&quot;2.9.0&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1734011714341.2783')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>In the section <code>[libraries]</code> you can add the dependency of Retrofit and Moshi</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-toml" id="1734011714341.8242"><span class="hljs-attr">retrofit</span> = { module = <span class="hljs-string">&quot;com.squareup.retrofit2:retrofit&quot;</span>, version.ref = <span class="hljs-string">&quot;retrofit&quot;</span> }
<span class="hljs-attr">retrofit-moshi</span> = { module = <span class="hljs-string">&quot;com.squareup.retrofit2:converter-moshi&quot;</span>, version.ref = <span class="hljs-string">&quot;retrofit&quot;</span> }</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714341.8242')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Now open <strong>build.gradle.kts (Module: automacorp.app)</strong>. and add the following dependencies</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1734011714342.2598">implementation (libs.retrofit)
implementation (libs.converter.moshi)</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714342.2598')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>As you updated your gradle configuration, Android Studio display a message to synchronize your projet. Click on <strong>Sync now</strong></p>
</div>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/android-gradle-sync.png" alt="Sync Gradle project"></span></p>
</div>
<div class="paragraph">
<p>Now you are ready to write the code to call your API.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>In package <code>com.automacorp.service</code> create a new interface called <code>RoomsApiService</code></p>
</li>
<li>
<p>You can apply the examples given above. In this interface we declare methods used to launch a remote call to</p>
<div class="ulist">
<ul>
<li>
<p>read all rooms</p>
</li>
<li>
<p>read one room by its id</p>
</li>
<li>
<p>update a room</p>
</li>
<li>
<p>create a room</p>
</li>
<li>
<p>delete a room by its id</p>
</li>
</ul>
</div>
</li>
<li>
<p>We need to create an implementation of this interface. This implementation will be created by the Retrofit Builder. In package <code>com.automacorp.service</code> create a new class called <strong>ApiServices</strong>. This class will use a Retrofit builder to return an instance of interface <code>RoomsApiService</code></p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714342.5222"><span class="hljs-keyword">object</span> ApiServices {
    <span class="hljs-keyword">val</span> roomsApiService : RoomsApiService <span class="hljs-keyword">by</span> lazy {
        Retrofit.Builder()
                .addConverterFactory(MoshiConverterFactory.create()) <span class="hljs-comment">// (1)</span>
                .baseUrl(<span class="hljs-string">&quot;http://automacorp.devmind.cleverapps.io/api/&quot;</span>) <span class="hljs-comment">// (2)</span>
                .build()
                .create(RoomsApiService::<span class="hljs-keyword">class</span>.java)
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714342.5222')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p><strong>(1)</strong> a converter factory to tell Retrofit what do with the data it gets back from the web service.</p>
</div>
<div class="paragraph">
<p><strong>(2)</strong> an URL of the remote service (In this example I use an URL on my website but you can use your own API)</p>
</div>
</li>
</ol>
</div>
<div class="paragraph">
<p>When an API is secured by a basic authentication, we need to adapt the settings. For that we can add 2 constant in object <code>ApiServices</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714342.5486"><span class="hljs-keyword">const</span> <span class="hljs-keyword">val</span> API_USERNAME = <span class="hljs-string">&quot;user&quot;</span>
<span class="hljs-keyword">const</span> <span class="hljs-keyword">val</span> API_PASSWORD = <span class="hljs-string">&quot;password&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1734011714342.5486')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>As often, when we have to manage credential in an HTTP request, we will create an interceptor to intercept the outgoing requests and add the authentication credential inside.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714342.1719"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BasicAuthInterceptor</span>(<span class="hljs-keyword">val</span> username: String, <span class="hljs-keyword">val</span> password: String): Interceptor {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">intercept</span><span class="hljs-params">(chain: <span class="hljs-type">Interceptor</span>.<span class="hljs-type">Chain</span>)</span></span>: Response {
        <span class="hljs-keyword">val</span> request = chain
            .request()
            .newBuilder()
            .header(<span class="hljs-string">&quot;Authorization&quot;</span>, Credentials.basic(username, password))
            .build()
        <span class="hljs-keyword">return</span> chain.proceed(request)
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714342.1719')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>When your interceptor is created,  you can adapt the Retrofit builder.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714342.1655"><span class="hljs-keyword">val</span> roomsApiService : RoomsApiService <span class="hljs-keyword">by</span> lazy {
    <span class="hljs-keyword">val</span> client = OkHttpClient.Builder()
            .addInterceptor(BasicAuthInterceptor(API_USERNAME, API_PASSWORD))
            .build()

    Retrofit.Builder()
        .addConverterFactory(MoshiConverterFactory.create())
        .client(client)
        .baseUrl(<span class="hljs-string">&quot;https://automacorp.devmind.cleverapps.io/api/&quot;</span>)
        .build()
        .create(RoomsApiService::<span class="hljs-keyword">class</span>.java)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714342.1655')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If your application is served over HTTPS (this is the default on Clever Cloud), you also need to customize the OkHttpClient. In the real life we use a real certificate. In our dev we just check the hostname of our remote server</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714343.7249"><span class="hljs-keyword">val</span> roomsApiService : RoomsApiService <span class="hljs-keyword">by</span> lazy {
    <span class="hljs-keyword">val</span> client = getUnsafeOkHttpClient()
            .addInterceptor(BasicAuthInterceptor(API_USERNAME, API_PASSWORD))
            .build()

    <span class="hljs-comment">// ...</span>
}

<span class="hljs-keyword">private</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">getUnsafeOkHttpClient</span><span class="hljs-params">()</span></span>: OkHttpClient.Builder =
  OkHttpClient.Builder().apply {
      <span class="hljs-keyword">val</span> trustManager = <span class="hljs-keyword">object</span> : X509TrustManager {
          <span class="hljs-meta">@Throws(CertificateException::class)</span>
          <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">checkClientTrusted</span><span class="hljs-params">(chain: <span class="hljs-type">Array</span>@<span class="hljs-type">LTX509Certificate</span>@<span class="hljs-type">GT</span>, authType: <span class="hljs-type">String</span>)</span></span> {
          }

          <span class="hljs-meta">@Throws(CertificateException::class)</span>
          <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">checkServerTrusted</span><span class="hljs-params">(chain: <span class="hljs-type">Array</span>@<span class="hljs-type">LTX509Certificate</span>@<span class="hljs-type">GT</span>, authType: <span class="hljs-type">String</span>)</span></span> {
          }

          <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">getAcceptedIssuers</span><span class="hljs-params">()</span></span>: <span class="hljs-symbol">Array@</span><span class="hljs-symbol">LTX509Certificate@</span>GT {
              <span class="hljs-keyword">return</span> arrayOf()
          }
      }
      <span class="hljs-keyword">val</span> sslContext = SSLContext.getInstance(<span class="hljs-string">&quot;SSL&quot;</span>).also {
          it.<span class="hljs-keyword">init</span>(<span class="hljs-literal">null</span>, arrayOf(trustManager), SecureRandom())
      }
      sslSocketFactory(sslContext.socketFactory, trustManager)
      hostnameVerifier { hostname, _ <span class="hljs-meta">@LAMBDA</span> hostname.contains(<span class="hljs-string">&quot;cleverapps.io&quot;</span>) }
      addInterceptor(BasicAuthInterceptor(API_USERNAME, API_PASSWORD))
  }</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714343.7249')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_use_retrofit"><span class="icon">[flask&#93;</span> : Use Retrofit</h2>
<div class="sectionbody">
<div class="paragraph">
<p>We can now adapt our code to use this API when we want to display the room list. In <code>RoomListActivity</code>, you can move the code to display the list of rooms in a new Composable function called <code>RoomList</code>.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714343.5713"><span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">RoomList</span><span class="hljs-params">(
    rooms: <span class="hljs-type">List</span>@<span class="hljs-type">LTRoomDto</span>@<span class="hljs-type">GT</span>,
    navigateBack: () @<span class="hljs-type">LAMBDA</span> <span class="hljs-type">Unit</span>,
    openRoom: (<span class="hljs-type">id</span>: <span class="hljs-type">Long</span>) @<span class="hljs-type">LAMBDA</span> <span class="hljs-type">Unit</span>
)</span></span> {
    AutomacorpTheme {
        Scaffold(
            topBar = { AutomacorpTopAppBar(<span class="hljs-string">&quot;Rooms&quot;</span>, navigateBack) }
        ) { innerPadding <span class="hljs-meta">@LAMBDA</span>
            <span class="hljs-keyword">if</span> (rooms.isEmpty()) {
                Text(
                    text = <span class="hljs-string">&quot;No room found&quot;</span>,
                    modifier = Modifier.padding(innerPadding)
                )
            } <span class="hljs-keyword">else</span> {
                LazyColumn(
                    contentPadding = PaddingValues(<span class="hljs-number">4.</span>dp),
                    verticalArrangement = Arrangement.spacedBy(<span class="hljs-number">8.</span>dp),
                    modifier = Modifier.padding(innerPadding),
                ) {
                    items(rooms, key = { it.id }) {
                        RoomItem(
                            room = it,
                            modifier = Modifier.clickable { openRoom(it.id) },
                        )
                    }
                }
            }
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714343.5713')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Adapt the <code>RoomListActivity</code> to use the <code>RoomList</code> composable. Now you can update the onCreate function in the activity. We don&#8217;t want to use the <code>RoomService.findAll()</code> to load the list of rooms. We will use the <code>roomsApiService</code> object to call the remote API.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714343.501"><span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
  <span class="hljs-comment">// ... existing code</span>

  runCatching { <span class="hljs-comment">// (1)</span>
    ApiServices.roomsApiService.findAll().execute()  <span class="hljs-comment">// (2)</span>
  }
            .onSuccess { <span class="hljs-comment">// (3)</span>
                <span class="hljs-keyword">val</span> rooms = it.body() ?: emptyList()
                <span class="hljs-comment">// Display the component with the list on room</span>
                setContent {
                    RoomList(rooms, navigateBack, openRoom)
                }
            }
            .onFailure {
                setContent {
                    RoomList(emptyList(), navigateBack, openRoom)
                }
                it.printStackTrace() <span class="hljs-comment">// (4)</span>
                Toast.makeText(<span class="hljs-keyword">this</span>, <span class="hljs-string">&quot;Error on rooms loading @dollar@it&quot;</span>, Toast.LENGTH_LONG).show() <span class="hljs-comment">// (5)</span>
            }
  <span class="hljs-comment">// ...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714343.501')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>(1)</strong> we use <strong>runCatching</strong> to manage successes and failures. This block is like a try/catch block in Java</p>
</li>
<li>
<p><strong>(2)</strong> <code>ApiServices.roomsApiService</code> return an implementation of our object written to call a remote API. We call the method <strong>execute</strong> to run a synchronous call</p>
</li>
<li>
<p><strong>(3)</strong> On success we update adapter with the result contained in body property. If this response is null the list is empty.</p>
</li>
<li>
<p><strong>(4)</strong> We use this line to have the real stack trace in your device log file</p>
</li>
<li>
<p><strong>(5)</strong> on error we display a message in a <a href="https://developer.android.com/guide/topics/ui/notifiers/toasts">Toast notation</a></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Run your app to see the changes when and open the room list.</p>
</div>
<div class="paragraph">
<p>Unfortunately you should have a toast notification with the following error message :</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-main-thread.png" alt="Network error">
</div>
</div>
<div class="paragraph">
<p>To analyse the errors you can open the LogCat tab and filter on Error level. In my example below, we can see the same error</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/remote/android-logcat.png" alt="Logger">
</div>
</div>
<div class="paragraph">
<p>To resolve the problem we have to understand the next chapters</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_main_thread">Main thread</h2>
<div class="sectionbody">
<div class="paragraph">
<p>When the system launches your application, that application runs in a thread called <strong>Main thread</strong>. This main thread manages user interface operations (rendering, events &#8230;&#8203;), system calls&#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>Calling long-running operations from this main thread can lead to freezes and unresponsiveness.</p>
</div>
<div class="paragraph">
<p>Making a network request on the main thread forces it to wait, or block, until it receives a response.</p>
</div>
<div class="paragraph">
<p>When the thread is blocked, the OS isn&#8217;t able to manage UI events, which causes your app to freeze and potentially leads to an Application Not Responding (ANR) dialog. To avoid these performance issues, Android throws a <strong>MainThreadException</strong> and kills your app if you try to block this main thread.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/remote/android-main-thread-error.png" alt="Main thread">
</div>
</div>
<div class="paragraph">
<p>The solution is to run your network call, your long-running task in another thread, and when the result is available you can reattach the main thread to display the result. Only the main thread can update the interface.</p>
</div>
<div class="paragraph">
<p>If you develop in Java, Thread development can be difficult. With Kotlin and <a href="https://kotlinlang.org/docs/coroutines-guide.html">coroutines</a>, the development is really simple.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_coroutines">Coroutines</h2>
<div class="sectionbody">
<div class="paragraph">
<p>A <a href="https://kotlinlang.org/docs/coroutines-guide.html">coroutine</a> is a concurrency design pattern that you can use on Android to simplify code that executes asynchronously tasks as an HTTP request. Coroutines help to manage long-running tasks that might otherwise block the main thread and cause your app to become unresponsive.</p>
</div>
<div class="paragraph">
<p>In Kotlin, all coroutines run inside a <a href="https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-coroutine-scope/">CoroutineScope</a>. A scope controls the lifetime of coroutines through its job. When you cancel the job of a scope, it cancels all coroutines started in that scope.</p>
</div>
<div class="paragraph">
<p>On Android, you can use a scope to cancel all running coroutines when, for example, the user navigates away from an Activity or Fragment. Scopes also allow you to specify a default dispatcher. A dispatcher controls which thread runs a coroutine.</p>
</div>
<div class="paragraph">
<p>Each object in Android which has a <a href="https://developer.android.com/topic/libraries/architecture/lifecycle">lifecycle</a> (Activity, Fragment&#8230;&#8203;), has a <code>CoroutineScope</code>.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_use_coroutines_to_resolve_main_thread_error"><span class="icon">[flask&#93;</span> : Use coroutines to resolve main thread error</h2>
<div class="sectionbody">
<div class="paragraph">
<p>We need to add the coroutine library in your project. The dependency should be already present</p>
</div>
<div class="paragraph">
<p>Open <strong>build.gradle.kts (Module: automacorp.app)</strong> to check the presence of the following dependency (in dependencies block)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714343.6199">implementation(libs.androidx.lifecycle.runtime.ktx)</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714343.6199')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Android Studio display a message to synchronize your projet. Click on <strong>Sync now</strong></p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-gradle-sync.png" alt="Sync Gradle project">
</div>
</div>
<div class="paragraph">
<p>We can now adapt the code used in <code>RoomListActivity</code> to load the room list.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Open <strong>com.automacorp.RoomListActivity</strong></p>
</li>
<li>
<p>Update code to call roomsApiService as follows</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714344.34">lifecycleScope.launch(context = Dispatchers.IO) { <span class="hljs-comment">// (1)</span>
    runCatching { ApiServices.roomsApiService.findAll().execute() }
        .onSuccess {
            <span class="hljs-keyword">val</span> rooms = it.body() ?: emptyList()
            withContext(context = Dispatchers.Main) { <span class="hljs-comment">// (2)</span>
                <span class="hljs-comment">// setContent ....</span>
            }
        .onFailure {
            withContext(context = Dispatchers.Main) { <span class="hljs-comment">// (2)</span>
                <span class="hljs-comment">// setContent .... and display error</span>
            }
        }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714344.34')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>(1)</strong> method <code>lifecycleScope.launch</code> open a new coroutine. You must specify a context other than Dispatchers. <code>Main</code> (Main thread) for the code to be executed. <code>Dispatchers.IO</code> is dedicated to Input/Output tasks</p>
</li>
<li>
<p><strong>(2)</strong> You cant' interact with the view outside the main thread. When we receive the data we use <code>withContext</code> to reattach your code to another thread</p>
</li>
</ul>
</div>
</li>
</ol>
</div>
<div class="paragraph">
<p>Relaunch your app to test your Room list screen.</p>
</div>
<div class="paragraph">
<p>Unfortunately you should have another toast notification with another error message. The error message tells you that your app might be missing the INTERNET permission.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/remote/android-permission-error.png" alt="Android permission error">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_android_permission">Android permission</h2>
<div class="sectionbody">
<div class="paragraph">
<p>The purpose of a permission is to protect the privacy of an Android user. Android apps must request permission to access sensitive user data or features such as contacts, SMS, Internet&#8230;&#8203; Depending on the feature, the system might grant the permission automatically or might prompt the user to approve the request.</p>
</div>
<div class="paragraph">
<p>By default, an app has no permission to perform any operations that would adversely impact other apps, the operating system or the user.</p>
</div>
<div class="paragraph">
<p>To add a new permission we need to update the <code>AndroidManifest.xml</code> file (ie the id card of your app)</p>
</div>
<div class="paragraph">
<p>In the following example I add the INTERNET permission <code>@LTuses-permission@GT</code> tag (just before @LTapplication@GT tag)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1734011714344.9219">@LTmanifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
package=&quot;com.example.snazzyapp&quot;@GT

    @LTuses-permission android:name=&quot;android.permission.INTERNET&quot; /@GT
    @LTapplication ...
         android:usesCleartextTraffic=&quot;true&quot;@GT
        ...
    @LT/application@GT
@LT/manifest@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714344.9219')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Each user can accept or reject an app permission request, when this app is installed or when the user update the app settings in the device setting. So generally, you must handle this case and ask the user to reactivate the rights if he wants to use your application. In our case we will not test the authorization and we will consider that the user has accepted this permission.</p>
</div>
<div class="paragraph">
<p>You can now relaunch your app and you will be able to open the room list without error. For more information about permissions you can read this <a href="https://developer.android.com/guide/topics/permissions/overview">page</a>.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_use_viewmodel_in_your_code">Use ViewModel in your code</h2>
<div class="sectionbody">
<div class="paragraph">
<p>In last labs, we see how to use a <code>ViewModel</code> that can store your app data. The stored data is not lost if the framework destroys and recreates the activities during a configuration change or other events. That&#8217;s why it&#8217;s better to use a ViewModel</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/remote/view_model.png" alt="ViewModel state" width="500">
</div>
</div>
<div class="paragraph">
<p>The first thing is to create an object that will store the room list result or the error if the API call fails.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714344.0251"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomList</span>(
    <span class="hljs-keyword">val</span> rooms: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTRoomDto@</span>GT = emptyList(),
    <span class="hljs-keyword">val</span> error: String? = <span class="hljs-literal">null</span>
)</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714344.0251')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>We can now update the <code>RoomViewModel</code> to store the result of the API call (a state) in a <code>StateFlow</code> object. StateFlow is a data holder observable flow that emits the current and new state updates. Its value property reflects the current state value. To update state and send it to the flow, assign a new value to the value property of the MutableStateFlow class.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714344.9426"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomViewModel</span> : <span class="hljs-type">ViewModel</span>() {
    <span class="hljs-comment">// existing code</span>

    <span class="hljs-keyword">val</span> roomsState = MutableStateFlow(RoomList())
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714344.9426')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can now add the function to load the room list in the <code>RoomViewModel</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714344.914"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomViewModel</span> : <span class="hljs-type">ViewModel</span>() {
    <span class="hljs-comment">// existing code</span>
    <span class="hljs-comment">//...</span>

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findAll</span><span class="hljs-params">()</span></span> {
        viewModelScope.launch(context = Dispatchers.IO) { <span class="hljs-comment">// (1)</span>
            runCatching { ApiServices.roomsApiService.findAll().execute() }
                .onSuccess {
                    <span class="hljs-keyword">val</span> rooms = it.body() ?: emptyList()
                    roomsState.value = RoomList(rooms) <span class="hljs-comment">// (2)</span>
                }
                .onFailure {
                    it.printStackTrace()
                    roomsState.value = RoomList(emptyList(), it.stackTraceToString() ) <span class="hljs-comment">// (3)</span>
                }
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714344.914')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>(1)</strong> method <code>viewModelScope.launch</code> open a new coroutine to launch the API call in another thread</p>
</li>
<li>
<p><strong>(2)</strong> Update the <code>roomsState</code> object with the result of the API call when everything is OK.</p>
</li>
<li>
<p><strong>(3)</strong> If an error occurs, we update the <code>roomsState</code> object with an empty list and the error message</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>The last step is to update the <code>RoomListActivity</code> to use the <code>RoomViewModel</code> to load the room list.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714344.4824"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomListActivity</span> : <span class="hljs-type">ComponentActivity</span>() {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
        enableEdgeToEdge()

        <span class="hljs-keyword">val</span> viewModel: RoomViewModel <span class="hljs-keyword">by</span> viewModels()

        <span class="hljs-comment">// existing code to manage the back button and the RoomItem click to open a room detail</span>
        <span class="hljs-comment">// ...</span>

        setContent {
            <span class="hljs-keyword">val</span> roomsState <span class="hljs-keyword">by</span> viewModel.roomsState.asStateFlow().collectAsState() <span class="hljs-comment">// (1)</span>
            LaunchedEffect(<span class="hljs-built_in">Unit</span>) { <span class="hljs-comment">// (2)</span>
                viewModel.findAll()
            }
            <span class="hljs-keyword">if</span> (roomsState.error != <span class="hljs-literal">null</span>) {
                setContent {
                    RoomList(emptyList(), navigateBack, openRoom)
                }
                Toast
                    .makeText(applicationContext, <span class="hljs-string">&quot;Error on rooms loading @dollar@{roomsState.error}&quot;</span>, Toast.LENGTH_LONG)
                    .show() <span class="hljs-comment">// (3)</span>
            } <span class="hljs-keyword">else</span> {
                RoomList(roomsState.rooms, navigateBack, openRoom) <span class="hljs-comment">// (4)</span>
            }
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714344.4824')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>(1)</strong> We use the <code>asStateFlow</code> extension function to convert the <code>roomsState</code> object to a <code>StateFlow</code> object. We can now use the <code>collectAsState</code> function to observe the <code>StateFlow</code> object and update the UI when the value of the <code>StateFlow</code> object changes.</p>
</li>
<li>
<p><strong>(2)</strong> LaunchedEffect: run suspend functions (function executed in coroutine) in the scope of a composable</p>
</li>
<li>
<p><strong>(3)</strong> Display a toast notification if an error occurs</p>
</li>
<li>
<p><strong>(4)</strong> Display the list of rooms if no error occurs</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>With this code we have to write less code, manage less coroutine. The activity will subscribe to the <code>roomsState</code> object to display the result, and we don&#8217;t need to juggle with the main thread.</p>
</div>
<div class="paragraph">
<p>On the first display of the screen, we display an empty list of rooms because the findAll function is launched in asynchronous mode (in a coroutine). When the API call is finished, the <code>roomsState</code> object is updated with the result of the API call and the screen is updated.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_update_the_screen_to_display_and_update_the_detail"><span class="icon">[flask&#93;</span> : Update the screen to display and update the detail</h2>
<div class="sectionbody">
<div class="paragraph">
<p>In <code>RoomViewModel</code> we already manage the state of the room detail screen. Add a function to load a room by its id by a remote API call</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714344.178"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findRoom</span><span class="hljs-params">(id: <span class="hljs-type">Long</span>)</span></span> {
    viewModelScope.launch(context = Dispatchers.IO) {
        runCatching { ApiServices.roomsApiService.findById(id).execute() }
            .onSuccess {
                room = it.body()
            }
            .onFailure {
                it.printStackTrace()
                room = <span class="hljs-literal">null</span>
            }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714344.178')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can also add a function to update a room by its id by a remote API call</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714345.4353"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">updateRoom</span><span class="hljs-params">(id: <span class="hljs-type">Long</span>, roomDto: <span class="hljs-type">RoomDto</span>)</span></span> {
      <span class="hljs-keyword">val</span> command = RoomCommandDto(
          name = roomDto.name,
          targetTemperature = roomDto.targetTemperature ?.let { Math.round(it * <span class="hljs-number">10</span>) /<span class="hljs-number">10.0</span> },
          currentTemperature = roomDto.currentTemperature,
      )
      viewModelScope.launch(context = Dispatchers.IO) {
          runCatching { ApiServices.roomsApiService.updateRoom(id, command).execute() }
              .onSuccess {
                  room = it.body()
              }
              .onFailure {
                  it.printStackTrace()
                  room = <span class="hljs-literal">null</span>
              }
      }
  }</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714345.4353')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can now adapt the <code>RoomActivity</code> to use the <code>RoomViewModel</code> to load the room detail and remove the local call to our fake service. After this lab you should use your remote REST Service to load and update the room detail.</p>
</div>
<div class="paragraph">
<p>Implement the different functions to create a room, delete a room, list the windows of a room, update a window.</p>
</div>
</div>
</div>`;