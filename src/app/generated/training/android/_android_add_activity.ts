export const _android_add_activity:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_flask_create_a_new_activity"><span class="icon">[flask&#93;</span> : Create a new activity</a></li>
<li><a class="link" fragment="#_intent_how_communicate_with_this_new_component">Intent : how communicate with this new component ?</a></li>
<li><a class="link" fragment="#_flask_build_an_intent_to_open_an_activity"><span class="icon">[flask&#93;</span> : Build an intent to open an activity</a></li>
<li><a class="link" fragment="#_flask_create_model_to_manage_room_and_windows"><span class="icon">[flask&#93;</span> : Create model to manage room and windows</a></li>
<li><a class="link" fragment="#_flask_update_roomactivity_to_display_all_room_properties"><span class="icon">[flask&#93;</span> : Update RoomActivity to display all room properties</a></li>
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
<p>In the <strong>Project window</strong>, right-click the app folder and select <strong>New @GT Compose @GT Empty Activity</strong>. You can also use menu <strong>File @GT New @GT Compose @GT Empty Activity</strong>. Enter a name for our new activity : <em>RoomActivity</em>. Leave all other properties set to their defaults and click Finish.</p>
<div class="videoblock">
<div class="content">
<iframe width="600" height="330" src="https://www.youtube.com/embed/rAAgTjU-6sc?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</li>
<li>
<p>Android Studio automatically does does things:</p>
<div class="ulist">
<ul>
<li>
<p>Creates the <strong>RoomActivity</strong> file.</p>
</li>
<li>
<p>Adds the required <strong>@LTactivity@GT</strong> element in <strong>AndroidManifest.xml</strong> (each activity must be declared in this file).</p>
</li>
</ul>
</div>
</li>
</ol>
</div>
<div class="paragraph">
<p>For the moment the new activity is empty. We will add some widgets to display a room name.</p>
</div>
<div class="paragraph">
<p>You can also add a new key in the <code>strings.xml</code> file to store the room name</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1731447060465.2517">@LTstring name=&quot;act_room_name&quot;@GTRoom name@LT/string@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060465.2517')">Copy</button></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060467.7505"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomActivity</span> : <span class="hljs-type">ComponentActivity</span>() {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            AutomacorpTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding -&gt;
                    RoomDetail(
                        name = <span class="hljs-string">&quot;Android&quot;</span>,
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

<span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">RoomDetail</span><span class="hljs-params">(name: <span class="hljs-type">String</span>, modifier: <span class="hljs-type">Modifier</span> = Modifier)</span></span> {
    Column(modifier = modifier.padding(<span class="hljs-number">16.</span>dp)) {
        <span class="hljs-keyword">var</span> nameState <span class="hljs-keyword">by</span> remember { mutableStateOf(name) }
        Text(
            text = stringResource(R.string.act_room_name),
            style = MaterialTheme.typography.labelSmall,
            modifier = Modifier.padding(bottom = <span class="hljs-number">4.</span>dp)
        )
        OutlinedTextField(
            nameState,
            onValueChange = { nameState = it },
            placeholder = { Text(stringResource(R.string.act_room_name)) },
        )
    }

}

<span class="hljs-meta">@Preview(showBackground = true)</span>
<span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">RoomDetailPreview</span><span class="hljs-params">()</span></span> {
    AutomacorpTheme {
        RoomDetail(<span class="hljs-string">&quot;Android&quot;</span>)
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060467.7505')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_intent_how_communicate_with_this_new_component">Intent : how communicate with this new component ?</h2>
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
<p>The primary information contained in an Intent is the following:</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>Component name</strong> [optional] The name of the component to start. This information makes an intent explicit or not, meaning that the intent should be delivered only to the app component defined by the component name. Without a component name, the intent is implicit and the system decides which component should receive the intent based on the other intent information (such as the action, data, and category—described below).</p>
</li>
<li>
<p><strong>Action</strong> A string that specifies the generic action to perform (such as ACTION_VIEW, ACTION_EDIT, ACTION_MAIN, etc.). The action is a string that specifies what the intent should do. For example, ACTION_VIEW might display data to the user, while ACTION_SEND might send data to another app.</p>
</li>
<li>
<p><strong>Data</strong> [optional] A URI that references the data to be acted on by the intent (such as a webpage, a contact record, etc.). The data is a URI that references the data to be acted on by the intent. For example, the data can be a webpage, a contact record, or a file.</p>
</li>
<li>
<p><strong>Extras</strong> [optional] A Bundle of additional information. This information can be used to provide extended information to the component. For example, if the intent is to send an email, the extras can include the email subject, the email text, etc.</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>In this lab we will open <strong>RoomActivity</strong> when a user will click on <strong>MainActivity</strong> button <strong>Open Room name</strong></p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_build_an_intent_to_open_an_activity"><span class="icon">[flask&#93;</span> : Build an intent to open an activity</h2>
<div class="sectionbody">
<div class="paragraph">
<p>It&#8217;s a good practice to define keys for intent extras with your app&#8217;s package name as a prefix. This ensures that the keys are unique, in case your app interacts with other apps. You can define a companion object in the activity class to store these keys as constant.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060468.7769"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MainActivity</span> : <span class="hljs-type">AppCompatActivity</span>() {

    <span class="hljs-keyword">companion</span> <span class="hljs-keyword">object</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-keyword">val</span> ROOM_PARAM = <span class="hljs-string">&quot;com.automacorp.room.attribute&quot;</span>
    }

    <span class="hljs-comment">// ...</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731447060468.7769')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>We will update the <code>onSayHelloButtonClick</code> method to open the <code>RoomActivity</code> with the name filled in the <code>MainActivity</code> (you can remove the Toast message).</p>
</div>
<div class="paragraph">
<p>For that we will define an Intent, target <code>RoomActivity</code>, and put the room name filled in <code>MainActivity</code> in the sent attributes (extra).</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060469.6543"><span class="hljs-keyword">val</span> onSayHelloButtonClick: (name: String) <span class="hljs-meta">@LAMBDA</span> <span class="hljs-built_in">Unit</span> = { name <span class="hljs-meta">@LAMBDA</span>
  <span class="hljs-keyword">val</span> intent = Intent(<span class="hljs-keyword">this</span>, RoomActivity::<span class="hljs-keyword">class</span>.java).apply {
    putExtra(ROOM_PARAM, name)
  }
  startActivity(intent)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060469.6543')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>In the <code>RoomActivity</code> class, we will read the name sent in the intent and update the Textview with this name. The job is done in the <code>onCreate</code> method. All parameters sent in the intent are stored in the <code>Bundle</code> object used as argument.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060469.533"><span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
        <span class="hljs-keyword">val</span> param = intent.getStringExtra(MainActivity.ROOM_PARAM)
        enableEdgeToEdge()
        setContent {
            AutomacorpTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding <span class="hljs-meta">@LAMBDA</span>
                    RoomDetail(
                        name = param ?: <span class="hljs-string">&quot;&quot;</span>,
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060469.533')">Copy</button></pre>
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
<pre class="highlight"><code class="language-kotlin" id="1731447060470.7112"><span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomDto</span>(
    <span class="hljs-keyword">val</span> id: <span class="hljs-built_in">Long</span>,
    <span class="hljs-keyword">val</span> name: String,
    <span class="hljs-keyword">val</span> currentTemperature: <span class="hljs-built_in">Double</span>?,
    <span class="hljs-keyword">val</span> targetTemperature: <span class="hljs-built_in">Double</span>?,
    <span class="hljs-keyword">val</span> windows: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTWindowDto@</span>GT,
)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060470.7112')">Copy</button></pre>
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
<pre class="highlight"><code class="language-kotlin" id="1731447060470.287"><span class="hljs-keyword">enum</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowStatus</span> { OPENED, CLOSED}

<span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowDto</span>(
    <span class="hljs-keyword">val</span> id: <span class="hljs-built_in">Long</span>,
    <span class="hljs-keyword">val</span> name: String,
    <span class="hljs-keyword">val</span> roomName: String,
    <span class="hljs-keyword">val</span> roomId: <span class="hljs-built_in">Long</span>,
    <span class="hljs-keyword">val</span> windowStatus: WindowStatus
)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060470.287')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>We will now create a service class to manage these windows. We will write 2 methods : one to find all building windows and a second to load only one window by its id. For the moment we will use fake data. In a next lesson we will learn how call a remote service to load real data. This class can be created in the package <code>com.automacorp.service</code></p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060474.5798"><span class="hljs-keyword">object</span> RoomService {
    <span class="hljs-keyword">val</span> ROOM_KIND: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTString@</span>GT = listOf(<span class="hljs-string">&quot;Room&quot;</span>, <span class="hljs-string">&quot;Meeting&quot;</span>, <span class="hljs-string">&quot;Laboratory&quot;</span>, <span class="hljs-string">&quot;Office&quot;</span>, <span class="hljs-string">&quot;Boardroom&quot;</span>)
    <span class="hljs-keyword">val</span> ROOM_NUMBER: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTChar@</span>GT = (<span class="hljs-string">&#x27;A&#x27;</span>..<span class="hljs-string">&#x27;Z&#x27;</span>).toList()
    <span class="hljs-keyword">val</span> WINDOW_KIND: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTString@</span>GT = listOf(<span class="hljs-string">&quot;Sliding&quot;</span>, <span class="hljs-string">&quot;Bay&quot;</span>, <span class="hljs-string">&quot;Casement&quot;</span>, <span class="hljs-string">&quot;Hung&quot;</span>, <span class="hljs-string">&quot;Fixed&quot;</span>)

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">generateWindow</span><span class="hljs-params">(id: <span class="hljs-type">Long</span>, roomId: <span class="hljs-type">Long</span>, roomName: <span class="hljs-type">String</span>)</span></span>: WindowDto {
        <span class="hljs-keyword">return</span> WindowDto(
            id = id,
            name = <span class="hljs-string">&quot;@dollar@{ WINDOW_KIND.random()} Window @dollar@id&quot;</span>,
            roomName = roomName,
            roomId = roomId,
            windowStatus = WindowStatus.values().random()
        )
    }

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">generateRoom</span><span class="hljs-params">(id: <span class="hljs-type">Long</span>)</span></span>: RoomDto {
        <span class="hljs-keyword">val</span> roomName = <span class="hljs-string">&quot;@dollar@{ROOM_NUMBER.random()}@dollar@id @dollar@{ROOM_KIND.random()}&quot;</span>
        <span class="hljs-keyword">val</span> windows = (<span class="hljs-number">1.</span>.(<span class="hljs-number">1.</span><span class="hljs-number">.6</span>).random()).map { generateWindow(it.toLong(), id, roomName) }
        <span class="hljs-keyword">return</span> RoomDto(
            id = id,
            name = roomName,
            currentTemperature = (<span class="hljs-number">15.</span><span class="hljs-number">.30</span>).random().toDouble(),
            targetTemperature = (<span class="hljs-number">15.</span><span class="hljs-number">.22</span>).random().toDouble(),
            windows = windows
        )
    }

    <span class="hljs-comment">// Create 50 rooms</span>
    <span class="hljs-keyword">val</span> ROOMS = (<span class="hljs-number">1.</span><span class="hljs-number">.50</span>).map { generateRoom(it.toLong()) }.toMutableList()

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findAll</span><span class="hljs-params">()</span></span>: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTRoomDto@</span>GT {
        <span class="hljs-comment">// TODO return all rooms sorted by name</span>
    }

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findById</span><span class="hljs-params">(id: <span class="hljs-type">Long</span>)</span></span>: RoomDto? {
        <span class="hljs-comment">// TODO return the room with the given id or null</span>
    }

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findByName</span><span class="hljs-params">(name: <span class="hljs-type">String</span>)</span></span>: RoomDto? {
        <span class="hljs-comment">// TODO return the room with the given name or null</span>
    }

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">updateRoom</span><span class="hljs-params">(id: <span class="hljs-type">Long</span>, room: <span class="hljs-type">RoomDto</span>)</span></span>: RoomDto {
        <span class="hljs-comment">// TODO update an existing room with the given values</span>
    }

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findByNameOrId</span><span class="hljs-params">(nameOrId: <span class="hljs-type">String</span>?)</span></span>: RoomDto? {
        <span class="hljs-keyword">if</span> (nameOrId != <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">if</span> (nameOrId.isDigitsOnly()) {
                findById(nameOrId.toLong())
            } <span class="hljs-keyword">else</span> {
                findByName(nameOrId)
            }
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060474.5798')">Copy</button></pre>
</div>
</div>
</li>
</ol>
</div>
<div class="paragraph">
<p>For the moment the given class is not complete. You have to implement each method. For example the <code>updateRoom</code> method can be implemented like this</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060476.7554"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">updateRoom</span><span class="hljs-params">(id: <span class="hljs-type">Long</span>, room: <span class="hljs-type">RoomDto</span>)</span></span>: RoomDto? {
    <span class="hljs-keyword">val</span> index = ROOMS.indexOfFirst { it.id == id }
    <span class="hljs-keyword">val</span> updatedRoom = findById(id)?.copy(
        name = room.name,
        targetTemperature = room.targetTemperature,
        currentTemperature = room.currentTemperature
    ) ?: <span class="hljs-keyword">throw</span> IllegalArgumentException()
    <span class="hljs-keyword">return</span> ROOMS.<span class="hljs-keyword">set</span>(index, updatedRoom)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060476.7554')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_update_roomactivity_to_display_all_room_properties"><span class="icon">[flask&#93;</span> : Update RoomActivity to display all room properties</h2>
<div class="sectionbody">
<div class="paragraph">
<p>We will update the existing <code>RoomActivity</code> to display more data.</p>
</div>
<div class="paragraph">
<p>You can add a new keys in the <code>strings.xml</code> file to store the room name</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1731447060479.345">    @LTstring name=&quot;act_room_name&quot;@GTRoom name@LT/string@GT
    @LTstring name=&quot;act_room_none&quot;@GTNo round found for this id or name@LT/string@GT
    @LTstring name=&quot;act_room_current_temperature&quot;@GTCurrent temperature@LT/string@GT
    @LTstring name=&quot;act_room_target_temperature&quot;@GTTarget temperature@LT/string@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060479.345')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>We will search for a room that matches the name given in the Intent or if the user fill the room ID we will directly display the corresponding room.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060480.7556"><span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
    <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
    enableEdgeToEdge()
    <span class="hljs-keyword">val</span> param = intent.getStringExtra(MainActivity.ROOM_PARAM)
    <span class="hljs-keyword">val</span> room = RoomService.findByNameOrId(param)

    setContent {
        AutomacorpTheme {
            Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding <span class="hljs-meta">@LAMBDA</span>
                <span class="hljs-keyword">if</span> (room != <span class="hljs-literal">null</span>) {
                    RoomDetail(room,Modifier.padding(innerPadding))
                } <span class="hljs-keyword">else</span> {
                    NoRoom(Modifier.padding(innerPadding))
                }

            }
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060480.7556')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p><strong>Step 1</strong>. Create a new composable called NoRoom to display a message (key <code>act_room_none</code>) when no room is found</p>
</div>
<div class="paragraph">
<p><strong>Step 2</strong>. In the composable RoomDetail, display the room name, the current temperature and the target temperature. As we want to bind the field with the room object, we will use the <code>remember</code> function to store the room object in a mutable state.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060480.844">    <span class="hljs-keyword">var</span> room <span class="hljs-keyword">by</span> remember { mutableStateOf(roomDto) }
    Column(modifier = modifier.padding(<span class="hljs-number">16.</span>dp)) {
        <span class="hljs-comment">// ...</span>
        OutlinedTextField(
            room.name,
            modifier = Modifier.fillMaxWidth(),
            onValueChange = { room = room.copy(name = it) },
            placeholder = { Text(stringResource(R.string.act_room_name)) },
        )
        <span class="hljs-comment">// ...</span>
    }</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060480.844')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p><strong>Step 3</strong>. Add a <code>Text</code> to display the current temperature. This data is not updatable so we don&#8217;t need to use a TextField</p>
</div>
<div class="paragraph">
<p><strong>Step 4</strong>. Add a <code>OutlinedTextField</code> to display the target temperature. This data is updatable so we need to use a TextField. In place of this <code>OutlinedTextField</code> you can use a  <code>Slider</code> (more detail on <a href="https://developer.android.com/develop/ui/compose/components/slider" class="bare">https://developer.android.com/develop/ui/compose/components/slider</a>)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060481.1018">    Slider(
        value = room.targetTemperature?.toFloat() ?: <span class="hljs-number">18.0f</span>,
        onValueChange = { room = room.copy(targetTemperature = it.toDouble()) },
        colors = SliderDefaults.colors(
            thumbColor = MaterialTheme.colorScheme.secondary,
            activeTrackColor = MaterialTheme.colorScheme.secondary,
            inactiveTrackColor = MaterialTheme.colorScheme.secondaryContainer,
        ),
        steps = <span class="hljs-number">0</span>,
        valueRange = <span class="hljs-number">10f</span>.<span class="hljs-number">.28f</span>
    )
    Text(text = (round((room.targetTemperature ?: <span class="hljs-number">18.0</span>) * <span class="hljs-number">10</span>) / <span class="hljs-number">10</span>).toString())</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060481.1018')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>This image below show you an implementation example</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/newactivity/example.png" alt="Activity room" width="700">
</div>
</div>
</div>
</div>`;