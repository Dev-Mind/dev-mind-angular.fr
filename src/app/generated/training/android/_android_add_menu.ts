export const _android_add_menu:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_scaffold">Scaffold</a></li>
<li><a class="link" fragment="#_floating_action_button">Floating action button</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_flask_use_a_floating_action_button_to_update_our_room"><span class="icon">[flask&#93;</span> : Use a floating action button to update our room</a></li>
</ul>
</li>
<li><a class="link" fragment="#_view_model">View model</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_why_use_a_viewmodel">Why use a ViewModel ?</a></li>
<li><a class="link" fragment="#_create_a_viewmodel">Create a ViewModel</a></li>
<li><a class="link" fragment="#_flask_use_a_floating_action_button"><span class="icon">[flask&#93;</span> : Use a floating action button</a></li>
</ul>
</li>
<li><a class="link" fragment="#_flask_create_our_images_for_the_menu"><span class="icon">[flask&#93;</span> Create our images for the menu</a></li>
<li><a class="link" fragment="#_app_menu">App menu</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_flask_create_a_common_menu_in_your_app"><span class="icon">[flask&#93;</span> : Create a common menu in your app</a></li>
<li><a class="link" fragment="#_flask_use_yout_topbar_in_the_screens"><span class="icon">[flask&#93;</span> : Use yout topbar in the screens</a></li>
<li><a class="link" fragment="#_flask_intent_new_use_case"><span class="icon">[flask&#93;</span> : Intent : new use case</a></li>
</ul>
</li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>We will learn how to structure a page by adding a menu (top or bottom), a main action and a title. For this we will use the composable <a href="https://developer.android.com/develop/ui/compose/components/scaffold?hl=en">Scaffold</a></p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-add-menu.png" alt="Android course step2" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_scaffold">Scaffold</h2>
<div class="sectionbody">
<div class="paragraph">
<p>The Scaffold composable provides an API you can use to quickly assemble your app&#8217;s structure according to Material Design guidelines. Scaffold accepts several composables as parameters</p>
</div>
<div class="ulist">
<ul>
<li>
<p>topBar: The app bar across the top of the screen.</p>
</li>
<li>
<p>bottomBar: The app bar across the bottom of the screen.</p>
</li>
<li>
<p>floatingActionButton: A button that hovers over the bottom-right corner of the screen that you can use to expose the main action of your screen.</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_floating_action_button">Floating action button</h2>
<div class="sectionbody">
<div class="paragraph">
<p>The floating action button (FAB) is a primary action button that typically appears in the bottom-right corner of the screen. It&#8217;s used for a promoted action, such as creating a new item.</p>
</div>
<div class="paragraph">
<p>In Material Design, there are four types of FAB:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>FAB: A floating action button of ordinary size.</p>
</li>
<li>
<p>Small FAB: A smaller floating action button.</p>
</li>
<li>
<p>Large FAB: A larger floating action button.</p>
</li>
<li>
<p>Extended FAB: A floating action button that contains more than just an icon.</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/menu/fab.png" alt="Android course step2" width="800">
</div>
</div>
<div class="paragraph text-center">
<p><em>Image credit <a href="https://developer.android.com/" class="bare">https://developer.android.com/</a></em></p>
</div>
<div class="sect2">
<h3 id="_flask_use_a_floating_action_button_to_update_our_room"><span class="icon">[flask&#93;</span> : Use a floating action button to update our room</h3>
<div class="paragraph">
<p>You can add a floating action button to your app by using the FloatingActionButton composable.</p>
</div>
<div class="paragraph">
<p>For that we will create a new composable <code>RoomUpdateButton</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060547.837"><span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">RoomUpdateButton</span><span class="hljs-params">(onClick: () @<span class="hljs-type">LAMBDA</span> <span class="hljs-type">Unit</span>)</span></span> {
    ExtendedFloatingActionButton(
        onClick = { onClick() },
        icon = {
            Icon(
                Icons.Filled.Done,
                contentDescription = stringResource(R.string.act_room_save),
            )
        },
        text = { Text(text = stringResource(R.string.act_room_save)) }
    )
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060547.837')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>This button can be declared in the Scaffold composable as a parameter <code>floatingActionButton</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060548.931"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomActivity</span> : <span class="hljs-type">ComponentActivity</span>() {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
        enableEdgeToEdge()
        <span class="hljs-keyword">val</span> param = intent.getStringExtra(MainActivity.ROOM_PARAM)
        <span class="hljs-keyword">val</span> room = RoomService.findByNameOrId(param)

        <span class="hljs-keyword">val</span> onRoomSave: () <span class="hljs-meta">@LAMBDA</span> <span class="hljs-built_in">Unit</span> = {
            <span class="hljs-comment">// ...</span>
        }

        setContent {
            AutomacorpTheme {
                Scaffold(
                    floatingActionButton = { RoomUpdateButton(onRoomSave) },
                    modifier = Modifier.fillMaxSize()
                ) { innerPadding <span class="hljs-meta">@LAMBDA</span>
                    <span class="hljs-keyword">if</span> (viewModel.room != <span class="hljs-literal">null</span>) {
                        RoomDetail(room, Modifier.padding(innerPadding))
                    } <span class="hljs-keyword">else</span> {
                        NoRoom(Modifier.padding(innerPadding))
                    }

                }
            }
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060548.931')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>But we have a problem with the action. We have no way to access to value of the different fields to update a name or the target temperature of a room. We used a state but this state is defined locally in the <code>RoomDetail</code> composable. We need to move this state in the RoomActivity and define a global state. For that we need to use a <code>ViewModel</code></p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_view_model">View model</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_why_use_a_viewmodel">Why use a ViewModel ?</h3>
<div class="paragraph">
<p>A ViewModel is a class that is responsible for preparing and managing the data for an Activity or a Fragment. It also handles the communication of the Activity / Fragment with the rest of the application (e.g. calling the business logic classes).</p>
</div>
<div class="paragraph">
<p>The Android framework manages the lifecycle of UI controllers, such as activities and fragments. The framework may decide to destroy or re-create an UI controller in response to certain user actions or device events that are completely out of your control.</p>
</div>
<div class="paragraph">
<p>If the system destroys or re-creates an UI controller, any transient UI-related data you store in them is lost. For example, your app may include a list of users in one of its activities. When the activity is re-created for a configuration change, the new activity has to re-fetch the list of users.</p>
</div>
<div class="paragraph">
<p>For simple data, the activity can use the onSaveInstanceState() method and restore its data from the bundle in onCreate(), but this approach is only suitable for small amounts of data that can be serialized then deserialized, not for potentially large amounts of data like a list of users or bitmaps.</p>
</div>
<div class="paragraph">
<p>Another problem is that UI controllers frequently need to make asynchronous calls that may take some time to return. The UI controller needs to manage these calls and ensure the system cleans them up after it’s destroyed to avoid potential memory leaks.</p>
</div>
<div class="paragraph">
<p>ViewModels were created to resolve these problems and separate out view data ownership from UI controller logic. UI controllers such as activities and fragments should only display UI data, react to user actions, or handle operating system communication, such as permission requests. The data should be now managed by a ViewModel.</p>
</div>
<div class="paragraph">
<p>Using a view model helps enforce a clear separation between the code for your app’s UI and its data model.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-view-model.svg" alt="View model">
</div>
</div>
<div class="paragraph">
<p>The ViewModel class is used to store data related to an app&#8217;s UI, and is also lifecycle aware, meaning that it responds to lifecycle events much like an activity or fragment does. If lifecycle events such as screen rotation cause an activity or fragment to be destroyed and recreated, the associated ViewModel won&#8217;t need to be recreated. We will use a ViewModel to store the state of our room.</p>
</div>
</div>
<div class="sect2">
<h3 id="_create_a_viewmodel">Create a ViewModel</h3>
<div class="paragraph">
<p>To create a model, you need to create a class that extends the ViewModel class. This class will contain the data that you want to store and manage. In our case we will store our composable state.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060549.5674"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomViewModel</span>: <span class="hljs-type">ViewModel</span>() {
    <span class="hljs-keyword">var</span> room <span class="hljs-keyword">by</span> <span class="hljs-symbol">mutableStateOf@</span>LTRoomDto?<span class="hljs-meta">@GT(null)</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060549.5674')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can then use this ViewModel in your activity or fragment.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060549.5796"><span class="hljs-keyword">val</span> param = intent.getStringExtra(MainActivity.ROOM_PARAM)
        <span class="hljs-keyword">val</span> viewModel: RoomViewModel <span class="hljs-keyword">by</span> viewModels()
        viewModel.room = RoomService.findByNameOrId(param)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060549.5796')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_flask_use_a_floating_action_button"><span class="icon">[flask&#93;</span> : Use a floating action button</h3>
<div class="paragraph">
<p>You can now finish the implementation of the floating action button. You can use the ViewModel to update the room.</p>
</div>
<div class="paragraph">
<p>Update the <code>RoomDetail</code> composable signature to accept a <code>RoomViewModel</code> as parameters.!</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060550.6594"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">RoomDetail</span><span class="hljs-params">(model: <span class="hljs-type">RoomViewModel</span>, modifier: <span class="hljs-type">Modifier</span> = Modifier)</span></span> {
    Column(modifier = modifier.padding(<span class="hljs-number">16.</span>dp)) {
        Text(
            text = stringResource(R.string.act_room_name),
            style = MaterialTheme.typography.labelSmall,
            modifier = Modifier.padding(bottom = <span class="hljs-number">4.</span>dp)
        )
        OutlinedTextField(
            value = model.room?.name ?: <span class="hljs-string">&quot;&quot;</span>,
            onValueChange = { model.room?.name = it },
            label = { Text(text = stringResource(R.string.act_room_name)) },
            modifier = Modifier.fillMaxWidth()
        )
        <span class="hljs-comment">// ...</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060550.6594')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>When you update something in the <code>RoomDetail</code> composable, the handler can access now to the room data and update the data. After the saving you can return to the home with an Intent</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060551.774"><span class="hljs-keyword">val</span> onRoomSave: () <span class="hljs-meta">@LAMBDA</span> <span class="hljs-built_in">Unit</span> = {
    <span class="hljs-keyword">if</span>(viewModel.room != <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">val</span> roomDto: RoomDto = viewModel.room <span class="hljs-keyword">as</span> RoomDto
        RoomService.updateRoom(roomDto.id, roomDto)
        Toast.makeText(baseContext, <span class="hljs-string">&quot;Room @dollar@{roomDto.name} was updated&quot;</span>, Toast.LENGTH_LONG).show()
        startActivity(Intent(baseContext, MainActivity::<span class="hljs-keyword">class</span>.java))
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060551.774')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_create_our_images_for_the_menu"><span class="icon">[flask&#93;</span> Create our images for the menu</h2>
<div class="sectionbody">
<div class="paragraph">
<p>We will create 3 images for our future menu topbar from svg downloaded from my website.</p>
</div>
<div class="paragraph">
<p><a href="/img/ic_rooms.svg"><span class="image"><img src="../../img/ic_rooms.svg" alt="ic rooms" height="30"></span></a>
<a href="/img/ic_mail.svg"><span class="image"><img src="../../img/ic_mail.svg" alt="ic mail" height="30"></span></a>
<a href="/img/ic_github.svg"><span class="image"><img src="../../img/ic_github.svg" alt="ic github" height="30"></span></a></p>
</div>
<div class="paragraph">
<p>For each image follow these steps</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Download the image (right click on the image and save as)</p>
</li>
<li>
<p>In the Project window, select the Android view.</p>
</li>
<li>
<p>Right-click the res folder and select <strong>New @GT Image Asset</strong></p>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/menu/img_image_asset.png" alt="Add image asset" width="600"></span></p>
</div>
</li>
<li>
<p>In the <strong>Configure Image Asset</strong> dialog, select <strong>Action Bar and Tab Icons</strong> in the <strong>Icon Type</strong> field. On the path select the downloaded image</p>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/menu/img_configure_image_asset.png" alt="Configure image asset" width="700"></span></p>
</div>
</li>
<li>
<p>Click <strong>Next</strong> and <strong>Finish</strong></p>
</li>
</ol>
</div>
<div class="paragraph">
<p>You should now have 5 images generated in the <strong>res/drawable/ic_actions_rooms</strong> folder (one for each screen density)</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/menu/image_asset.png" alt="image asset result" width="300">
</div>
</div>
<div class="paragraph">
<p>Repeat these steps for each image (mail and github).</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_app_menu">App menu</h2>
<div class="sectionbody">
<div class="paragraph">
<p>With the <code>Scaffold</code> composable you can add a menu in the top or in the bottom bar.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>A top bar is a bar that appears at the top of the screen. It provides access to key tasks and information. It generally hosts a title, core action items, and certain navigation items.</p>
</li>
<li>
<p>A bottom bar is a bar that appears at the bottom of the screen. It typically includes core navigation items. It may also provide access to other key actions, such as through a contained floating action button.</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/menu/bars.png" alt="Android resource">
</div>
</div>
<div class="paragraph text-center">
<p><em>Image credit <a href="https://developer.android.com/" class="bare">https://developer.android.com/</a></em></p>
</div>
<div class="paragraph">
<p>The top bar can have different organization depending on the screen.</p>
</div>
<table class="tableblock frame-all grid-all stretch text-center">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th class="tableblock halign-left valign-top">Type</th>
<th class="tableblock halign-left valign-top">Example</th>
</tr>
</thead>
<tbody>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><strong>Small</strong> :  <code>TopAppBar</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock"><span class="image"><img src="../../img/training/android/menu/small_bar.png" alt="Small top bar" width="300"></span></p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><strong>Center aligned</strong> : <code>CenterAlignedTopAppBar</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock"><span class="image"><img src="../../img/training/android/menu/center_bar.png" alt="Centered top bar" width="300"></span></p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><strong>Medium</strong> : <code>MediumTopAppBar</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock"><span class="image"><img src="../../img/training/android/menu/medium_bar.png" alt="Medium top bar" width="300"></span></p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><strong>Large</strong> : <code>LargeTopAppBar</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock"><span class="image"><img src="../../img/training/android/menu/large_bar.png" alt="Large top bar" width="300"></span></p></td>
</tr>
</tbody>
</table>
<div class="paragraph text-center">
<p><em>Image credit <a href="https://developer.android.com/" class="bare">https://developer.android.com/</a></em></p>
</div>
<div class="paragraph">
<p>The various composables that allow you to implement the four different top app bars share several key parameters:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>title: The text that appears across the app bar.</p>
</li>
<li>
<p>navigationIcon: The primary icon for navigation. Appears on the left of the app bar.</p>
</li>
<li>
<p>actions: Icons that provide the user access to key actions. They appear on the right of the app bar.</p>
</li>
<li>
<p>scrollBehavior: Determines how the top app bar responds to scrolling of the scaffold&#8217;s inner content.</p>
</li>
<li>
<p>colors: Determines how the app bar appears.</p>
</li>
</ul>
</div>
<div class="sect2">
<h3 id="_flask_create_a_common_menu_in_your_app"><span class="icon">[flask&#93;</span> : Create a common menu in your app</h3>
<div class="paragraph">
<p>Create String resources for the menu items in the <code>res/values/strings.xml</code> file</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1731447060552.0823">    @LTstring name=&quot;app_go_back_description&quot;@GTGo back@LT/string@GT
    @LTstring name=&quot;app_go_room_description&quot;@GTRooms@LT/string@GT
    @LTstring name=&quot;app_go_github_description&quot;@GTGithub@LT/string@GT
    @LTstring name=&quot;app_go_mail_description&quot;@GTSend email@LT/string@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060552.0823')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>As we want to share the menu between different activities, we will create composable in its own Kotlin file.</p>
</div>
<div class="paragraph">
<p>Create a file named AutomacorpMenu.kt in the package com.automacorp</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060556.883"><span class="hljs-meta">@Composable</span>
<span class="hljs-meta">@OptIn(ExperimentalMaterial3Api::class)</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">AutomacorpTopAppBar</span><span class="hljs-params">(title: <span class="hljs-type">String</span>? = <span class="hljs-literal">null</span>, returnAction: () @<span class="hljs-type">LAMBDA</span> <span class="hljs-type">Unit</span> = {})</span></span> {
    <span class="hljs-keyword">val</span> colors = TopAppBarDefaults.topAppBarColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer,
        titleContentColor = MaterialTheme.colorScheme.primary,
    )
    <span class="hljs-comment">// Define the actions displayed on the right side of the app bar</span>
    <span class="hljs-keyword">val</span> actions: <span class="hljs-meta">@Composable</span> RowScope.() <span class="hljs-meta">@LAMBDA</span> <span class="hljs-built_in">Unit</span> = {
        IconButton(onClick = { <span class="hljs-comment">/* do something */</span> }) {
            Icon(
                painter = painterResource(R.drawable.ic_action_rooms),
                contentDescription = stringResource(R.string.app_go_room_description)
            )
        }
        IconButton(onClick = { <span class="hljs-comment">/* do something */</span> }) {
            Icon(
                painter = painterResource(R.drawable.ic_action_mail),
                contentDescription = stringResource(R.string.app_go_mail_description)
            )
        }
        IconButton(onClick = { <span class="hljs-comment">/* do something */</span> }) {
            Icon(
                painter = painterResource(R.drawable.ic_action_github),
                contentDescription = stringResource(R.string.app_go_github_description)
            )
        }
    }
    <span class="hljs-comment">// Display the app bar with the title if present and actions</span>
    <span class="hljs-keyword">if</span>(title == <span class="hljs-literal">null</span>) {
        TopAppBar(
            title = { Text(<span class="hljs-string">&quot;&quot;</span>) },
            colors = colors,
            actions = actions
        )
    } <span class="hljs-keyword">else</span> {
        MediumTopAppBar(
            title = { Text(title) },
            colors = colors,
            <span class="hljs-comment">// The title will be displayed in other screen than the main screen.</span>
            <span class="hljs-comment">// In this case we need to add a return action</span>
            navigationIcon = {
                IconButton(onClick = returnAction) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = stringResource(R.string.app_go_back_description)
                    )
                }
            },
            actions = actions
        )
    }
}

<span class="hljs-meta">@Preview(showBackground = true)</span>
<span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">AutomacorpTopAppBarHomePreview</span><span class="hljs-params">()</span></span> {
    AutomacorpTheme {
        AutomacorpTopAppBar(<span class="hljs-literal">null</span>)
    }
}

<span class="hljs-meta">@Preview(showBackground = true)</span>
<span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">AutomacorpTopAppBarPreview</span><span class="hljs-params">()</span></span> {
    AutomacorpTheme {
        AutomacorpTopAppBar(<span class="hljs-string">&quot;A page&quot;</span>)
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060556.883')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Adapt this composable to your needs. We will see how to add intents in the next chapter.</p>
</div>
<div class="paragraph">
<p>With the @Preview annotation, you can see a preview of your composable in the Android Studio preview window.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/menu/topbar.png" alt="image asset result" width="800">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_flask_use_yout_topbar_in_the_screens"><span class="icon">[flask&#93;</span> : Use yout topbar in the screens</h3>
<div class="paragraph">
<p>You can nox use your topbar in your screens. For example, update the <code>RoomActivity</code> to use the <code>AutomacorpTopAppBar</code> composable.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060557.9783">setContent {
  AutomacorpTheme {
      Scaffold(
          topBar = { AutomacorpTopAppBar(<span class="hljs-string">&quot;Room&quot;</span>, navigateBack) },
          floatingActionButton = { RoomUpdateButton(onRoomSave) },
          modifier = Modifier.fillMaxSize()
      ) {
        <span class="hljs-comment">// ...</span>
      }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060557.9783')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>To write the <code>navigateBack</code> function, you can use this code for example.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060557.5432"><span class="hljs-keyword">val</span> navigateBack: () <span class="hljs-meta">@LAMBDA</span> <span class="hljs-built_in">Unit</span> = {
    startActivity(Intent(baseContext, MainActivity::<span class="hljs-keyword">class</span>.java))
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060557.5432')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can now use the <code>AutomacorpTopAppBar</code> composable in all your activities.</p>
</div>
</div>
<div class="sect2">
<h3 id="_flask_intent_new_use_case"><span class="icon">[flask&#93;</span> : Intent : new use case</h3>
<div class="paragraph">
<p>I introduced the Intent concept in <a href="https://dev-mind.fr/training/android/android-add-activity.html#_intent_how_communicate_with_other_component">this chapter</a>. In the first menu item we call another activity in our app, as we already done in the lab <a href="https://dev-mind.fr/training/android/android-add-activity.html">"Add a new activity"</a>.</p>
</div>
<div class="paragraph">
<p>An <a href="https://developer.android.com/reference/android/content/Inten">intent</a> is an abstract description of an operation to be performed. It can be used to launch an Activity, a background Service&#8230;&#8203; And you can call one activity in your app or in another app installed on the device. In this case you ask to the system to find the best application to resolve an action.</p>
</div>
<div class="paragraph">
<p>The first argument for the Intent is the expected action, such as <code>ACTION_VIEW</code>, <code>ACTION_SENDTO</code>, <code>ACTION_EDIT</code>, <code>ACTION_MAIN</code>, etc.
The second one is the data to operate on, such an URL, an email, expressed as a Uri.</p>
</div>
<div class="paragraph">
<p>Some examples of action/data pairs :</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>ACTION_VIEW</code> content://contacts/people/1 : Display information about the person whose identifier is "1".</p>
</li>
<li>
<p><code>ACTION_DIAL</code> tel:0642434445 : Display the phone dialer with the given number filled in.</p>
</li>
<li>
<p><code>ACTION_EDIT</code> content://contacts/people/1 : Edit information about the person whose identifier is "1".</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>For example you can create an intent to open a web page in the default browser</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060557.0393"><span class="hljs-keyword">val</span> intent = Intent(Intent.ACTION_VIEW, Uri.parse(<span class="hljs-string">&quot;https://dev-mind.fr&quot;</span>))
startActivity(intent)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060557.0393')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can also create an intent to send an email</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060557.0425"><span class="hljs-keyword">val</span> intent = Intent(Intent.ACTION_SENDTO, Uri.parse(<span class="hljs-string">&quot;mailto://guillaume@dev-mind.fr&quot;</span>))
startActivity(intent)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060557.0425')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Update the <code>AutomacorpTopAppBar</code> composable to add the intents to the different actions.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>The first action will open the <code>RoomListActivity</code> activity. For that create a new empty activity <code>RoomListActivity</code></p>
</li>
<li>
<p>The second action will send an email to your email address</p>
</li>
<li>
<p>The third action will open your Github page</p>
<div class="literalblock">
<div class="content">
<pre>If you have an error when you try to send an email, you should check that you have an email client installed on your virtual or real device. If not you can launch Google Play Store to install an email client as Gmail.</pre>
</div>
</div>
</li>
</ul>
</div>
</div>
</div>
</div>`;