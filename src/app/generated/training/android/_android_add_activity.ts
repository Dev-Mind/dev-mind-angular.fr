export const _android_add_activity:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_flask_create_a_new_activity"><span class="icon">[flask&#93;</span> : Create a new activity</a></li>
<li><a class="link" fragment="#_intent_how_communicate_with_other_component">Intent : how communicate with other component ?</a></li>
<li><a class="link" fragment="#_flask_build_an_intent_to_open_an_activity"><span class="icon">[flask&#93;</span> : Build an intent to open an activity</a></li>
<li><a class="link" fragment="#_flask_create_model_to_manage_room_and_windows"><span class="icon">[flask&#93;</span> : Create model to manage room and windows</a></li>
<li><a class="link" fragment="#_flask_create_a_new_activity_to_display_the_room_detail"><span class="icon">[flask&#93;</span> : Create a new activity to display the room detail</a></li>
<li><a class="link" fragment="#_flask_create_a_new_activity_to_list_rooms"><span class="icon">[flask&#93;</span> : Create a new activity to list rooms</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In this lesson, you will learn how to create a new View in your app and how to launch it with an Intent</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/android-add-activity.png" alt="Add activity" width="900">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_create_a_new_activity"><span class="icon">[flask&#93;</span> : Create a new activity</h2>
<div class="sectionbody">
<div class="olist arabic">
<ol class="arabic">
<li>
<p>In the <strong>Project window</strong>, right-click the app folder and select <strong>New @GT Activity @GT Empty Activity</strong>.You can also use menu <strong>File @GT New @GT Activity @GT Empty Activity</strong></p>
<div class="videoblock">
<div class="content">
<iframe width="600" height="330" src="https://www.youtube.com/embed/f-X8EXSsRYk?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</li>
<li>
<p>In the <strong>Configure Activity window</strong>, enter a name for our new activity : <em>WindowActivity</em>. Leave all other properties set to their defaults and click Finish.</p>
<div class="paragraph">
<p>Android Studio automatically does three things:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Creates the <strong>WindowActivity</strong> file.</p>
</li>
<li>
<p>Creates the layout file <strong>activity_window.xml</strong>, which corresponds with the <strong>WindowActivity</strong> file.</p>
</li>
<li>
<p>Adds the required <strong>@LTactivity@GT</strong> element in <strong>AndroidManifest.xml</strong>.</p>
</li>
</ul>
</div>
</li>
<li>
<p>We will now update <strong>activity_window.xml</strong> to display a window name and a label. Open this file</p>
</li>
<li>
<p>Add a new TextView to display a label name with these properties</p>
<div class="ulist">
<ul>
<li>
<p><strong>text</strong> : <em>Window name</em> (should be defined in strings.xml)</p>
</li>
<li>
<p><strong>margin top</strong> 16dp</p>
</li>
<li>
<p><strong>margin left</strong> 16dp</p>
</li>
</ul>
</div>
</li>
<li>
<p>Add a new TextView below the first one with these properties</p>
<div class="ulist">
<ul>
<li>
<p><strong>text</strong> : empty</p>
</li>
<li>
<p><strong>textAppearance</strong> : <em>@style/TextAppearance.AppCompat.Large</em></p>
</li>
<li>
<p><strong>margin top</strong> 8dp</p>
</li>
<li>
<p><strong>margin left</strong> 16dp</p>
</li>
<li>
<p><strong>id</strong> txt_window_name</p>
<div class="videoblock">
<div class="content">
<iframe width="600" height="330" src="https://www.youtube.com/embed/ppyIYuRpNWk?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</li>
</ul>
</div>
</li>
</ol>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_intent_how_communicate_with_other_component">Intent : how communicate with other component ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>An <a href="https://developer.android.com/reference/android/content/Intent">Intent</a> is an object that provides runtime binding between separate components, such as two activities. These activities can be in the same app or not.</p>
</div>
<div class="paragraph">
<p>For example if you need to open a web page you won&#8217;t develop a new browser. You will open this web page in installed browser as Firefox or Chrome.</p>
</div>
<div class="paragraph">
<p>The <a href="https://developer.android.com/reference/android/content/Intent">Intent</a> represents an app’s intent to do something. You can use intents for a wide variety of tasks, but in this lesson, your intent starts another activity in the same app.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/newactivity/android-intent.png" alt="Intent" width="700">
</div>
</div>
<div class="paragraph">
<p>When you create an Intent you define a context, a target and you can send zero, one or more informations to the target.</p>
</div>
<div class="paragraph">
<p>An Intent can carry data types as key-value pairs called extras. In this lab you will open <strong>WindowActivity</strong> when a user will click on <strong>MainActivity</strong> button <strong>Open Window</strong></p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_build_an_intent_to_open_an_activity"><span class="icon">[flask&#93;</span> : Build an intent to open an activity</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Update method <strong>openWindow</strong> in <strong>MainActivity</strong> to</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>define an Intent</p>
</li>
<li>
<p>target <strong>WindowActivity</strong></p>
</li>
<li>
<p>put the window name filled in <strong>MainActivity</strong> in the sent attributes (extra). Each extra is identified by a string. It&#8217;s a good practice to define keys for intent extras with your app&#8217;s package name as a prefix. This ensures that the keys are unique, in case your app interacts with other apps.</p>
</li>
</ol>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004185.99"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MainActivity</span> : <span class="hljs-type">AppCompatActivity</span>() {

    <span class="hljs-keyword">companion</span> <span class="hljs-keyword">object</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-keyword">val</span> WINDOW_NAME_PARAM = <span class="hljs-string">&quot;com.automacorp.windowname.attribute&quot;</span>
    }

    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">openWindow</span><span class="hljs-params">(view: <span class="hljs-type">View</span>)</span></span> {
        <span class="hljs-comment">// Extract value filled in editext identified with txt_window_name id</span>
        <span class="hljs-keyword">val</span> windowName = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTEditText@</span>GT(R.id.txt_window_name).text.toString()

        <span class="hljs-keyword">val</span> intent = Intent(<span class="hljs-keyword">this</span>, WindowActivity::<span class="hljs-keyword">class</span>.java).apply {
            putExtra(WINDOW_NAME_PARAM, windowName)
        }
        startActivity(intent)
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004185.99')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>On the other side on <strong>WindowActivity</strong> you have to</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>read the name sent in intent</p>
</li>
<li>
<p>find Textview to update in Layout (this widget is identified by an id)</p>
</li>
<li>
<p>update this Textview with the name</p>
</li>
</ol>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004186.5293"><span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowActivity</span> : <span class="hljs-type">AppCompatActivity</span>() {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
        setContentView(R.layout.activity_window)

        <span class="hljs-keyword">val</span> param = intent.getStringExtra(MainActivity.WINDOW_NAME_PARAM)
        <span class="hljs-keyword">val</span> windowName = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTTextView@</span>GT(R.id.txt_window_name)
        windowName.text = param
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004186.5293')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>It&#8217;s time to test yours changes.</p>
</div>
<div class="paragraph">
<p>Click <strong>Apply Changes</strong> <span class="image"><img src="../../img/training/android/android-studio-apply.svg" alt="Apply changes"></span>  in the toolbar to run the app. Type a window name in the text field and click on the button to see the message in the second activity</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_create_model_to_manage_room_and_windows"><span class="icon">[flask&#93;</span> : Create model to manage room and windows</h2>
<div class="sectionbody">
<div class="paragraph">
<p>A room is defined by several properties</p>
</div>
<div class="ulist">
<ul>
<li>
<p>an id</p>
</li>
<li>
<p>a name</p>
</li>
<li>
<p>a current temperature (this property can be nullable if no data is available) : in the backend app this value is read by a sensor, but here we just need the value of the current temperature</p>
</li>
<li>
<p>a target temperature (this property can be nullable if no data is available)</p>
</li>
<li>
<p>a list of window : for the moment we won&#8217;t display these data but we will</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>A Window is defined by several properties</p>
</div>
<div class="ulist">
<ul>
<li>
<p>an id</p>
</li>
<li>
<p>a room</p>
</li>
<li>
<p>a status : : in the backend app this value is read by a sensor, but here we just need the value OPENED or CLOSED</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>We are going to create classes to represent windows and rooms.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>In the <strong>Project window</strong>, right-click the package <em>com.automacorp</em> and select <strong>New @GT package</strong>.</p>
</li>
<li>
<p>New package will be called <strong>model</strong>. Select this package, redo a right-click and select <strong>New @GT Kotlin File/Class</strong>.</p>
</li>
<li>
<p>Fill a name. For example <strong>RoomDto</strong> (dto = data transfer object) and create window properties. You can copy this code</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004187.4946"><span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomDto</span>(
    <span class="hljs-keyword">val</span> id: <span class="hljs-built_in">Long</span>,
    <span class="hljs-keyword">val</span> name: String,
    <span class="hljs-keyword">val</span> currentTemperature: <span class="hljs-built_in">Double</span>?,
    <span class="hljs-keyword">val</span> targetTemperature: <span class="hljs-built_in">Double</span>?,
    <span class="hljs-keyword">val</span> windows: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTWindowDto@</span>GT
)</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004187.4946')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Note: when a value is nullable you need to suffix type with ?. In our example currentTemperature can be null, so type is Double? and not Double</p>
</div>
</li>
<li>
<p>Redo same steps to create <strong>WindowDto</strong></p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004188.3357"><span class="hljs-keyword">enum</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowStatus</span> { OPENED, CLOSED}

<span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowDto</span>(
    <span class="hljs-keyword">val</span> id: <span class="hljs-built_in">Long</span>,
    <span class="hljs-keyword">val</span> name: String,
    <span class="hljs-keyword">val</span> roomName: String,
    <span class="hljs-keyword">val</span> roomId: <span class="hljs-built_in">Long</span>,
    <span class="hljs-keyword">val</span> windowStatus: WindowStatus
)</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004188.3357')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>We will now create a service class to manage these windows. We will write 2 methods : one to find all building windows and a second to load only one window by its id. For the moment we will use fake data. In a next lesson we will learn how call a remote service to load real data. This class can be created in the package <code>com.automacorp.service</code></p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004190.9578"><span class="hljs-keyword">object</span> RoomService {
    <span class="hljs-keyword">val</span> ROOMS_NAME = listOf(<span class="hljs-string">&quot;Room EF 6.10&quot;</span>, <span class="hljs-string">&quot;Hall&quot;</span>, <span class="hljs-string">&quot;Room EF 7.10&quot;</span>)

    <span class="hljs-comment">// Fake windows</span>
    <span class="hljs-keyword">val</span> WINDOWS: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTWindowDto@</span>GT = listOf(
        WindowDto(
            id = <span class="hljs-number">1</span>,
            name = <span class="hljs-string">&quot;Entry Window&quot;</span>,
            roomId = <span class="hljs-number">1</span>,
            roomName = ROOMS_NAME[<span class="hljs-number">0</span>],
            windowStatus = WindowStatus.CLOSED
        ),
        WindowDto(
            id = <span class="hljs-number">2</span>,
            name = <span class="hljs-string">&quot;Back Window&quot;</span>,
            roomId = <span class="hljs-number">1</span>,
            roomName = ROOMS_NAME[<span class="hljs-number">0</span>],
            windowStatus = WindowStatus.CLOSED
        ),
        WindowDto(
            id = <span class="hljs-number">3</span>,
            name = <span class="hljs-string">&quot;Sliding door&quot;</span>,
            roomId = <span class="hljs-number">2</span>,
            roomName = ROOMS_NAME[<span class="hljs-number">1</span>],
            windowStatus = WindowStatus.OPENED
        ),
        WindowDto(
            id = <span class="hljs-number">4</span>,
            name = <span class="hljs-string">&quot;Window 1&quot;</span>,
            roomId = <span class="hljs-number">3</span>,
            roomName = ROOMS_NAME[<span class="hljs-number">2</span>],
            windowStatus = WindowStatus.OPENED
        WindowDto(
            id = <span class="hljs-number">5</span>,
            name = <span class="hljs-string">&quot;Window 2&quot;</span>,
            roomId = <span class="hljs-number">3</span>,
            roomName = ROOMS_NAME[<span class="hljs-number">2</span>],
            windowStatus = WindowStatus.CLOSED
        )
    )

    <span class="hljs-comment">// Fake rooms</span>
    <span class="hljs-keyword">val</span> ROOMS: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTRoomDto@</span>GT = listOf(
        RoomDto(<span class="hljs-number">1</span>, <span class="hljs-string">&quot;Room EF 6.10&quot;</span>, <span class="hljs-number">18.2</span>, <span class="hljs-number">20.0</span>, WINDOWS.filter { it.roomId == <span class="hljs-number">1L</span> }),
        RoomDto(<span class="hljs-number">2</span>, <span class="hljs-string">&quot;Hall&quot;</span>, <span class="hljs-number">18.2</span>, <span class="hljs-number">18.0</span>, WINDOWS.filter { it.roomId == <span class="hljs-number">2L</span> }),
        RoomDto(<span class="hljs-number">3</span>, <span class="hljs-string">&quot;Room EF 7.10&quot;</span>, <span class="hljs-number">21.2</span>, <span class="hljs-number">20.0</span>, WINDOWS.filter { it.roomId == <span class="hljs-number">3L</span> })
    )
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004190.9578')">Copy</button></pre>
</div>
</div>
</li>
</ol>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_create_a_new_activity_to_display_the_room_detail"><span class="icon">[flask&#93;</span> : Create a new activity to display the room detail</h2>
<div class="sectionbody">
<div class="paragraph">
<p>You can reproduce the firsts steps to create a new activity called <code>RoomActivity</code>.</p>
</div>
<div class="paragraph">
<p>Follow the same steps to create a page to display all the room property.</p>
</div>
<div class="paragraph">
<p>Create a new button on the home page and a method to open the room with the id equals to 1</p>
</div>
<div class="paragraph">
<p>The method to add on the <code>MainActivity</code> can be this one</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004192.2598"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">openRoom</span><span class="hljs-params">(view: <span class="hljs-type">View</span>)</span></span> {
   <span class="hljs-keyword">val</span> intent = Intent(<span class="hljs-keyword">this</span>, RoomActivity::<span class="hljs-keyword">class</span>.java).apply {
       putExtra(ROOM_ID_PARAM, <span class="hljs-number">1L</span>)
   }
   startActivity(intent)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004192.2598')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The code of the <code>RoomActivity</code> can be this one</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004193.7627"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomActivity</span> : <span class="hljs-type">AppCompatActivity</span>() {

    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
        setContentView(R.layout.activity_room)

        <span class="hljs-keyword">val</span> roomId = intent.getLongExtra(MainActivity.ROOM_ID_PARAM, <span class="hljs-number">0</span>)
        <span class="hljs-keyword">val</span> room = RoomService.ROOMS.firstOrNull {it.id == roomId}

        <span class="hljs-keyword">val</span> roomName = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTTextView@</span>GT(R.id.txt_room_name)
        roomName.text = room?.name ?: <span class="hljs-string">&quot;&quot;</span>

        <span class="hljs-keyword">val</span> roomCurrentTemperature = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTTextView@</span>GT(R.id.txt_room_current_temperature)
        roomCurrentTemperature.text = room?.currentTemperature?.toString() ?: <span class="hljs-string">&quot;&quot;</span>

        <span class="hljs-keyword">val</span> roomTargetTemperature = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTTextView@</span>GT(R.id.txt_room_target_temperature)
        roomTargetTemperature.text = room?.targetTemperature?.toString() ?: <span class="hljs-string">&quot;&quot;</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004193.7627')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Note that the Kotlin code <code>room?.targetTemperature?.toString() ?: ""</code> is equivalent to</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004195.2937"><span class="hljs-keyword">if</span> (room !=<span class="hljs-literal">null</span> &amp;amp;&amp;amp; room.targetTemperature != <span class="hljs-literal">null</span>) room.targetTemperature.toString() <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722609004195.2937')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>This image below show you an implementation example</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/newactivity/android-second-activity.png" alt="Activity room" width="700">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_create_a_new_activity_to_list_rooms"><span class="icon">[flask&#93;</span> : Create a new activity to list rooms</h2>
<div class="sectionbody">
<div class="paragraph">
<p>You need to create an empty activity with just a TextView with a label "Rooms".</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/newactivity/android-new-activity.png" alt="Add activity for list windows">
</div>
</div>
</div>
</div>`;