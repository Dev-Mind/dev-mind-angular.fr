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
<li><a class="link" fragment="#_flask_update_the_screen_to_display_and_update_the_detail"><span class="icon">[flask&#93;</span> : Update the screen to display and update the detail</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_call_api_to_display_detail_and_transform_view_screen_in_edit_screen">Call API to display detail and transform view screen in edit screen</a></li>
<li><a class="link" fragment="#_create_a_button_with_an_icon">Create a button with an icon</a></li>
</ul>
</li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In this lesson, we will see how to call a remote HTTP API with an external library called <a href="https://square.github.io/retrofit/">Retrofit</a>. <a href="https://square.github.io/retrofit/">Retrofit</a> was not done by Google. But when a library created by the community is widely used, well designed, the Android team does not hesitate to encourage its use.</p>
</div>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/android-call-remote.png" alt="Call an HTTP API with Android" width="800"></span></p>
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
<p>Dev-Mind website expose simple non secured URLs to read Rooms ans their windows or heaters. This simple API can be used for the first exercices of this lab.</p>
</div>
<div class="ulist">
<ul>
<li>
<p><a href="https://dev-mind.fr/training/android/rooms" class="bare">https://dev-mind.fr/training/android/rooms</a></p>
</li>
<li>
<p><a href="https://dev-mind.fr/training/android/rooms/id" class="bare">https://dev-mind.fr/training/android/rooms/id</a> (id must be replaced by the value of a room id)</p>
</li>
<li>
<p><a href="https://dev-mind.fr/training/android/windows" class="bare">https://dev-mind.fr/training/android/windows</a></p>
</li>
<li>
<p><a href="https://dev-mind.fr/training/android/windows/id" class="bare">https://dev-mind.fr/training/android/windows/id</a> (id must be replaced by the value of a window id)</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>You can also used your own Spring API if you followed Spring course or my implementation available on <a href="https://automacorp.devmind.cleverapps.io/swagger-ui/index.html" class="bare">https://automacorp.devmind.cleverapps.io/swagger-ui/index.html</a>. This app is secured by basic auth and you can the username <code>user</code> and his password <code>password</code>.</p>
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
<pre class="highlight"><code class="language-kotlin" id="1724055768898.9097"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">RoomsApiService</span> {
    <span class="hljs-meta">@GET(<span class="hljs-string">&quot;rooms&quot;</span>)</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findAll</span><span class="hljs-params">()</span></span>: <span class="hljs-symbol">Call@</span><span class="hljs-symbol">LTList@</span><span class="hljs-symbol">LTRoomDto@</span><span class="hljs-symbol">GT@</span>GT

    <span class="hljs-meta">@GET(<span class="hljs-string">&quot;rooms/{id}&quot;</span>)</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findById</span><span class="hljs-params">(<span class="hljs-meta">@Path(<span class="hljs-string">&quot;id&quot;</span>)</span> id: <span class="hljs-type">Long</span>)</span></span>: <span class="hljs-symbol">Call@</span><span class="hljs-symbol">LTRoomDto@</span>GT

    <span class="hljs-meta">@PUT(<span class="hljs-string">&quot;rooms/{id}&quot;</span>)</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">updateRoom</span><span class="hljs-params">(<span class="hljs-meta">@Path(<span class="hljs-string">&quot;id&quot;</span>)</span> id: <span class="hljs-type">Long</span>, <span class="hljs-meta">@Body</span> room: <span class="hljs-type">RoomCommandDto</span>)</span></span>: <span class="hljs-symbol">Call@</span><span class="hljs-symbol">LTRoomDto@</span>GT

    <span class="hljs-comment">//...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768898.9097')">Copy</button></pre>
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
<pre class="highlight"><code class="language-kotlin" id="1724055768899.3958"><span class="hljs-meta">@GET(<span class="hljs-string">&quot;rooms/{id}&quot;</span>)</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findById</span><span class="hljs-params">(<span class="hljs-meta">@Path(<span class="hljs-string">&quot;id&quot;</span>)</span> id: <span class="hljs-type">Long</span>)</span></span>: <span class="hljs-symbol">Call@</span><span class="hljs-symbol">LTRoomDto@</span>GT</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768899.3958')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>or a parameter in query</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1724055768900.313"><span class="hljs-meta">@GET(<span class="hljs-string">&quot;rooms&quot;</span>)</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findAll</span><span class="hljs-params">(<span class="hljs-meta">@Query(<span class="hljs-string">&quot;sort&quot;</span>)</span> sort: <span class="hljs-type">String</span>)</span></span>: <span class="hljs-symbol">Call@</span><span class="hljs-symbol">LTList@</span><span class="hljs-symbol">LTRoomDto@</span><span class="hljs-symbol">GT@</span>GT</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768900.313')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>An object can be specified for POST or PUT HTTP requests @Body annotation. In this case, Retrofit will use converter defined in your conf to serialize body object in JSON</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1724055768901.704"><span class="hljs-meta">@PUT(<span class="hljs-string">&quot;rooms/{id}&quot;</span>)</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">updateRoom</span><span class="hljs-params">(<span class="hljs-meta">@Path(<span class="hljs-string">&quot;id&quot;</span>)</span> id: <span class="hljs-type">Long</span>, <span class="hljs-meta">@Body</span> room: <span class="hljs-type">RoomCommandDto</span>)</span></span>: <span class="hljs-symbol">Call@</span><span class="hljs-symbol">LTRoomDto@</span>GT</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768901.704')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>In my example RoomCommandDto is different than RoomDto. If you use my remote API available on on <a href="https://automacorp.devmind.cleverapps.io" class="bare">https://automacorp.devmind.cleverapps.io</a> you could define these objects in your code</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1724055768902.1313"><span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomDto</span>(
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
)</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768902.1313')">Copy</button></pre>
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
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Open <strong>build.gradle.kts (Module: automacorp.app)</strong>.</p>
</li>
<li>
<p>In the dependencies block, add 2 lines to load Retrofit and the Moshi converter (versions are available <a href="https://github.com/square/retrofit/tags">here</a>)</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1724055768906.7253">implementation <span class="hljs-string">&quot;com.squareup.retrofit2:retrofit:2.9.0&quot;</span>
implementation <span class="hljs-string">&quot;com.squareup.retrofit2:converter-moshi:2.9.0&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1724055768906.7253')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>As you updated your gradle configuration, Android Studio display a message to synchronize your projet. Click on <strong>Sync now</strong></p>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/android-gradle-sync.png" alt="Sync Gradle project"></span></p>
</div>
</li>
</ol>
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
<pre class="highlight"><code class="language-kotlin" id="1724055768907.6943"><span class="hljs-keyword">object</span> ApiServices {
    <span class="hljs-keyword">val</span> roomsApiService : RoomsApiService <span class="hljs-keyword">by</span> lazy {
        Retrofit.Builder()
                .addConverterFactory(MoshiConverterFactory.create()) <span class="hljs-comment">// (1)</span>
                .baseUrl(<span class="hljs-string">&quot;http://automacorp-client-for-android.cleverapps.io/api/&quot;</span>) <span class="hljs-comment">// (2)</span>
                .build()
                .create(RoomsApiService::<span class="hljs-keyword">class</span>.java)
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768907.6943')">Copy</button></pre>
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
<pre class="highlight"><code class="language-kotlin" id="1724055768908.1934"><span class="hljs-keyword">const</span> <span class="hljs-keyword">val</span> API_USERNAME = <span class="hljs-string">&quot;user&quot;</span>
<span class="hljs-keyword">const</span> <span class="hljs-keyword">val</span> API_PASSWORD = <span class="hljs-string">&quot;password&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1724055768908.1934')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>As often, when we have to manage credential in an HTTP request, we will create an interceptor to intercept the outgoing requests and add the authentication credential inside.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1724055768909.9404"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BasicAuthInterceptor</span>(<span class="hljs-keyword">val</span> username: String, <span class="hljs-keyword">val</span> password: String): Interceptor {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">intercept</span><span class="hljs-params">(chain: <span class="hljs-type">Interceptor</span>.<span class="hljs-type">Chain</span>)</span></span>: Response {
        <span class="hljs-keyword">val</span> request = chain
            .request()
            .newBuilder()
            .header(<span class="hljs-string">&quot;Authorization&quot;</span>, Credentials.basic(username, password))
            .build()
        <span class="hljs-keyword">return</span> chain.proceed(request)
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768909.9404')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>When your interceptor is created,  you can adapt the Retrofit builder.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1724055768909.58"><span class="hljs-keyword">val</span> roomsApiService : RoomsApiService <span class="hljs-keyword">by</span> lazy {
    <span class="hljs-keyword">val</span> client = OkHttpClient.Builder()
            .addInterceptor(BasicAuthInterceptor(API_USERNAME, API_PASSWORD))
            .build()

    Retrofit.Builder()
        .addConverterFactory(MoshiConverterFactory.create())
        .client(client)
        .baseUrl(<span class="hljs-string">&quot;https://automacorp.devmind.cleverapps.io/api/&quot;</span>)
        .build()
        .create(RoomsApiService::<span class="hljs-keyword">class</span>.java)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768909.58')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If your application is served over HTTPS (this is the default on Clever Cloud), you also need to customize the OkHttpClient. In the real life we use a real certificate. In our dev we just check the hostname of our remote server</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1724055768911.767"><span class="hljs-keyword">val</span> roomsApiService : RoomsApiService <span class="hljs-keyword">by</span> lazy {
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
  }</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768911.767')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_use_retrofit"><span class="icon">[flask&#93;</span> : Use Retrofit</h2>
<div class="sectionbody">
<div class="paragraph">
<p>We can now adapt our code to use this API when we want to display the room list or a room detail. For the moment, the list of rooms is populated with this code <code>roomsAdapter.setItems(WindowService.ROOMS)</code> in your <code>RoomsActivity</code></p>
</div>
<div class="paragraph">
<p>We can replace this line by this code</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1724055768912.8071"> runCatching { <span class="hljs-comment">// (1)</span>
     ApiServices.roomsApiService.findAll().execute() <span class="hljs-comment">// (2)</span>
 }
    .onSuccess { roomsAdapter.setItems(it.body() ?: emptyList()) }  <span class="hljs-comment">// (3)</span>
    .onFailure {
        it.printStackTrace() (<span class="hljs-number">4</span>)
        Toast.makeText(<span class="hljs-keyword">this</span>, <span class="hljs-string">&quot;Error on rooms loading @dollar@it&quot;</span>, Toast.LENGTH_LONG).show()  <span class="hljs-comment">// (5)</span>
    }</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768912.8071')">Copy</button></pre>
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
<p><strong>(4)</strong> on error we display a message in a <a href="https://developer.android.com/guide/topics/ui/notifiers/toasts">Toast notation</a></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Run your app to see the changes when and open the room list.</p>
</div>
<div class="paragraph">
<p>Unfortunately you should have a toast notification with the following error message :</p>
</div>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/android-main-thread.png" alt="Network error"></span></p>
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
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/remote/android-main-thread-error.png" alt="Main thread"></span></p>
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
<p>We need to add the coroutine library i your project. Open <strong>build.gradle.kts (Module: automacorp.app)</strong> to add the following dependency (in dependencies block)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1724055768912.1707">implementation(<span class="hljs-string">&quot;androidx.lifecycle:lifecycle-runtime-ktx:2.6.2&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768912.1707')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Android Studio display a message to synchronize your projet. Click on <strong>Sync now</strong></p>
</div>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/android-gradle-sync.png" alt="Sync Gradle project"></span></p>
</div>
<div class="paragraph">
<p>We can now adapt the code used in <code>RoomsActivity</code> to load the room list.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Open <strong>com.automacorp.RoomsActivity</strong></p>
</li>
<li>
<p>Update code to call roomsApiService as follows</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1724055768913.98">lifecycleScope.launch(context = Dispatchers.IO) { <span class="hljs-comment">// (1)</span>
    runCatching { ApiServices.roomsApiService.findAll().execute() }
        .onSuccess {
            withContext(context = Dispatchers.Main) { <span class="hljs-comment">// (2)</span>
                roomsAdapter.setItems(it.body() ?: emptyList()) }
            }
        .onFailure {
            withContext(context = Dispatchers.Main) {
                it.printStackTrace()
                Toast.makeText(applicationContext, <span class="hljs-string">&quot;Error on rooms loading @dollar@it&quot;</span>, Toast.LENGTH_LONG)
                    .show()  <span class="hljs-comment">// (3)</span>
            }
        }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768913.98')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>(1)</strong> method <code>lifecycleScope.launch</code> open a new directive. You must specify a context other than Dispatchers. <code>Main</code> (Main thread) for the code to be executed. <code>Dispatchers.IO</code> is dedicated to Input/Output tasks</p>
</li>
<li>
<p><strong>(2)</strong> You cant' interact with the view outside the main thread. When we receive the data we use <code>withContext</code> to reattach your code to another thread</p>
</li>
<li>
<p><strong>(3)</strong> You cant' interact with the view outside the main thread. When we receive an error we use <code>withContext</code> to reattach your code to another thread</p>
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
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/remote/android-permission-error.png" alt="Android permission error"></span></p>
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
<pre class="highlight"><code class="language-xml" id="1724055768913.8398">@LTmanifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
package=&quot;com.example.snazzyapp&quot;@GT

    @LTuses-permission android:name=&quot;android.permission.INTERNET&quot; /@GT
    @LTapplication ...
         android:usesCleartextTraffic=&quot;true&quot;@GT
        ...
    @LT/application@GT
@LT/manifest@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768913.8398')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Each user can accept or reject an app permission request, when this app is installed or when the user update the app settings in the device setting. So generally, you must handle this case and ask the user to reactivate the rights if he wants to use your application. In our case we will not test the authorization and we will consider that the user has accepted this permission.</p>
</div>
<div class="paragraph">
<p>You can now relaunch your app and you will be able to open the room list without error. For more informations about permissions you can read this <a href="https://developer.android.com/guide/topics/permissions/overview">page</a>.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_update_the_screen_to_display_and_update_the_detail"><span class="icon">[flask&#93;</span> : Update the screen to display and update the detail</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_call_api_to_display_detail_and_transform_view_screen_in_edit_screen">Call API to display detail and transform view screen in edit screen</h3>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Update <code>RoomActivity</code> to replace <code>val room = WindowService.ROOMS.firstOrNull {it.id == roomId}</code> by a call to your remote API</p>
</li>
<li>
<p>Check your screen to validate that the screen call the API to display detail</p>
</li>
<li>
<p>For the moment, you created the view with TextView components. You can follow this video to convert them in EditText</p>
<div class="videoblock">
<div class="content">
<iframe width="700" height="330" src="https://www.youtube.com/embed/rGVizyhUAzo?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</li>
<li>
<p>For the temperature EditTexts, you can update the input type to force user to fill a decimal number</p>
<div class="videoblock">
<div class="content">
<iframe width="700" height="330" src="https://www.youtube.com/embed/3NQbvostJhc?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</li>
</ol>
</div>
<div class="paragraph">
<p>Don&#8217;t forget to update the type of the objects used in <code>RoomActivity</code> (<code>EditText</code> in place of <code>TextView</code>)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1724055768914.168"><span class="hljs-keyword">val</span> roomName = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTEditText@</span>GT(R.id.txt_room_name)
roomName.setText(room?.name ?: <span class="hljs-string">&quot;&quot;</span>)

<span class="hljs-keyword">val</span> roomCurrentTemperature = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTEditText@</span>GT(R.id.txt_room_current_temperature)
roomCurrentTemperature.setText(room?.currentTemperature?.toString() ?: <span class="hljs-string">&quot;&quot;</span>)

<span class="hljs-keyword">val</span> roomTargetTemperature = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTEditText@</span>GT(R.id.txt_room_target_temperature)
roomTargetTemperature.setText(room?.targetTemperature?.toString() ?: <span class="hljs-string">&quot;&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768914.168')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_create_a_button_with_an_icon">Create a button with an icon</h3>
<div class="paragraph">
<p>In <a href="https://m3.material.io/">Material design</a> specification, Google recommends using floating buttons with images.</p>
</div>
<div class="paragraph">
<p>If you search free icons, you can use the <a href="https://fonts.google.com/icons">Google library</a>. For example we will search a Save button</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/remote/material-icon.png" alt="Material icon">
</div>
</div>
<div class="paragraph">
<p>On the right side you can choose the Android target, a color and download the icon via the bottom button.</p>
</div>
<div class="paragraph">
<p>You can unzip the file downloaded. You have one image for each device resolution</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/remote/material-icon-download.png" alt="Material icon" width="200">
</div>
</div>
<div class="paragraph">
<p>But in our case we only keep the vector image available in file <code>baseline_save_24.xml</code>, present in folder called <code>drawable</code>. Copy this file in your Android resource folder <code>res/drawable</code></p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/remote/android-icon-update.png" alt="Vector icon" width="900">
</div>
</div>
<div class="paragraph">
<p>Now you can go back in the layout <code>activity_room.xml</code> and</p>
</div>
<div class="ulist">
<ul>
<li>
<p>add a FloatingActionButton</p>
</li>
<li>
<p>add layout constraint to put the button on the bottom right</p>
</li>
<li>
<p>add a contentDescription</p>
</li>
<li>
<p>add a specific id to the button</p>
</li>
</ul>
</div>
<div class="videoblock">
<div class="content">
<iframe width="700" height="330" src="https://www.youtube.com/embed/STNEdiyPNPA?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
<div class="paragraph">
<p>You can now create the code to populate your form, add an event listener to the button or to save or update a room.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1724055768916.8105"><span class="hljs-keyword">private</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">populateScreen</span><span class="hljs-params">(room: <span class="hljs-type">RoomDto</span>?)</span></span> {
    <span class="hljs-keyword">val</span> roomName = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTEditText@</span>GT(R.id.txt_room_name)
    roomName.setText(room?.name ?: <span class="hljs-string">&quot;&quot;</span>)

    <span class="hljs-keyword">val</span> roomCurrentTemperature = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTEditText@</span>GT(R.id.txt_room_current_temperature)
    roomCurrentTemperature.setText(room?.currentTemperature?.toString() ?: <span class="hljs-string">&quot;&quot;</span>)

    <span class="hljs-keyword">val</span> roomTargetTemperature = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTEditText@</span>GT(R.id.txt_room_target_temperature)
    roomTargetTemperature.setText(room?.targetTemperature?.toString() ?: <span class="hljs-string">&quot;&quot;</span>)

    <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTFloatingActionButton@</span>GT(R.id.saveButton).setOnClickListener {
        saveRoom()
    }
}

<span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onDestroy</span><span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">super</span>.onDestroy()
    <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTFloatingActionButton@</span>GT(R.id.saveButton).setOnClickListener(<span class="hljs-literal">null</span>)
}

<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">saveRoom</span><span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">val</span> roomId = intent.getLongExtra(MainActivity.ROOM_ID_PARAM, -<span class="hljs-number">1</span>)
    <span class="hljs-keyword">val</span> roomDto = RoomCommandDto(
        name = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTEditText@</span>GT(R.id.txt_room_name).text.toString(),
        currentTemperature = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTEditText@</span>GT(R.id.txt_room_current_temperature).text.toString()
            .toDoubleOrNull(),
        targetTemperature = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTEditText@</span>GT(R.id.txt_room_target_temperature).text.toString()
            .toDoubleOrNull()
    )
    lifecycleScope.launch(context = Dispatchers.IO) { <span class="hljs-comment">// (1)</span>
        runCatching {
            <span class="hljs-keyword">if</span> (roomId == <span class="hljs-literal">null</span> || roomId == <span class="hljs-number">0L</span>) {
                ApiServices.roomsApiService.save(roomDto).execute()
            } <span class="hljs-keyword">else</span> {
                ApiServices.roomsApiService.updateRoom(roomId, roomDto).execute()
            }
        }
            .onSuccess {
                withContext(context = Dispatchers.Main) {
                    startActivity(Intent(applicationContext, RoomsActivity::<span class="hljs-keyword">class</span>.java))
                }
            }
            .onFailure {
                withContext(context = Dispatchers.Main) {
                    it.printStackTrace()
                    Toast.makeText(applicationContext, <span class="hljs-string">&quot;Error on room saving @dollar@it&quot;</span>, Toast.LENGTH_LONG).show()  <span class="hljs-comment">// (3)</span>
                }
            }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1724055768916.8105')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Now you can call all your remote API. You can also update your Room detail screen to display the room windows</p>
</div>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/remote/room_detail.png" alt="Room detail" width="400"></span></p>
</div>
</div>
</div>
</div>`;