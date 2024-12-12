export const _android_update_ui:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_user_interface">User interface</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_add_a_component">Add a component</a></li>
<li><a class="link" fragment="#_use_a_layout">Use a layout</a></li>
<li><a class="link" fragment="#_component_isolation">Component isolation</a></li>
</ul>
</li>
<li><a class="link" fragment="#_flask_update_the_home_page"><span class="icon">[flask&#93;</span> : Update the home page</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_update_the_greeting_text">Update the greeting text</a></li>
<li><a class="link" fragment="#_add_an_image">Add an image</a></li>
<li><a class="link" fragment="#_add_a_text_to_fill_a_name">Add a text to fill a name</a></li>
<li><a class="link" fragment="#_add_a_button">Add a button</a></li>
</ul>
</li>
<li><a class="link" fragment="#_conclusion">Conclusion</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In this lesson, you will learn how to update a screen with Android Studio and JetPack Compose. Jetpack Compose is Android’s modern toolkit for building native UI. It simplifies and accelerates UI development on Android bringing your apps to life with less code, powerful tools, and intuitive Kotlin APIs.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-course2.png" alt="Android course step2" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_user_interface">User interface</h2>
<div class="sectionbody">
<div class="paragraph">
<p>User interface for a Compose Android app is built as a hierarchy of components.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>The layouts can be viewed as containers that control how their child views are positioned on the screen.</p>
</li>
<li>
<p>UI components such as buttons and text boxes&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/updateui/component_hierarchy.png" alt="View hierarchy" width="800">
</div>
</div>
<div class="paragraph text-center">
<p><em>Image credit <a href="https://developer.android.com/" class="bare">https://developer.android.com/</a></em></p>
</div>
<div class="sect2">
<h3 id="_add_a_component">Add a component</h3>
<div class="paragraph">
<p>In the generated example you have seen a first example with the <code>Greeting</code> component.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714411.3523"><span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">Greeting</span><span class="hljs-params">(name: <span class="hljs-type">String</span>, modifier: <span class="hljs-type">Modifier</span> = Modifier)</span></span> {
  Text(
    text = <span class="hljs-string">&quot;Hello @dollar@name!&quot;</span>,
    modifier = modifier
  )
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714411.3523')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>We will edit it and add some text</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714412.5012"><span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">Greeting</span><span class="hljs-params">(name: <span class="hljs-type">String</span>, modifier: <span class="hljs-type">Modifier</span> = Modifier)</span></span> {
    Text(
        text = <span class="hljs-string">&quot;Hello @dollar@name!&quot;</span>,
        modifier = modifier
    )
    Text(
        text = <span class="hljs-string">&quot;I learn to create a new app&quot;</span>,
        modifier = modifier
    )
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714412.5012')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>This code creates two text elements inside the content view. However, since you haven&#8217;t provided any information about how to arrange them, the text elements are drawn on top of each other, making the text unreadable.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/updateui/component_supperposition.png" alt="Superposition" width="900">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_use_a_layout">Use a layout</h3>
<div class="paragraph">
<p>To arrange components, you can use a layout. In Compose, layouts are composable functions that define the structure of the UI.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>The Column function lets you arrange elements vertically.</p>
</li>
<li>
<p>The Row function lets you arrange elements horizontally.</p>
</li>
<li>
<p>and Box to stack elements.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>You can find more layout in the <a href="https://developer.android.com/jetpack/compose/layout">official documentation</a></p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/updateui/main_layouts.png" alt="Superposition" width="600">
</div>
</div>
<div class="paragraph text-center">
<p><em>Image credit <a href="https://developer.android.com/" class="bare">https://developer.android.com/</a></em></p>
</div>
<div class="paragraph">
<p>Resolve the problem by using a Column layout</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/updateui/component_row.png" alt="Superposition" width="900">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_component_isolation">Component isolation</h3>
<div class="paragraph">
<p>With Compose, you create small, stateless components that aren’t associated with any specific activities or fragments. <strong>This makes them easy to reuse and test.</strong></p>
</div>
<div class="paragraph">
<p>In Compose, state must be explicit and passed to the composable. This way, there is only one source of information for state, making it encapsulated and decoupled. Then, when the application state changes, your UI is automatically updated.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/updateui/state.png" alt="Component state" width="300">
</div>
</div>
<div class="paragraph text-center">
<p><em>Image credit <a href="https://developer.android.com/" class="bare">https://developer.android.com/</a></em></p>
</div>
<div class="paragraph">
<p>For example if we add a button to our layout, we have to define what to do when the button is clicked.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714412.2786"><span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">Greeting</span><span class="hljs-params">(name: <span class="hljs-type">String</span>, modifier: <span class="hljs-type">Modifier</span> = Modifier)</span></span> {
    Column {
        Text(
            text = <span class="hljs-string">&quot;Hello @dollar@name!&quot;</span>,
            modifier = modifier
        )
        Button(onClick = {}) {
            Text(
                text = <span class="hljs-string">&quot;My first button&quot;</span>,
                modifier = modifier
            )
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714412.2786')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>We can&#8217;t call or modify the state in a composable. So the <code>onclick</code> must not be managed locally. You have to pass it as an argument.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714412.4565"><span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">Greeting</span><span class="hljs-params">(name: <span class="hljs-type">String</span>, onClick: () -&gt; <span class="hljs-type">Unit</span>,  modifier: <span class="hljs-type">Modifier</span> = Modifier)</span></span> {
    Column {
        Text(
            text = <span class="hljs-string">&quot;Hello @dollar@name!&quot;</span>,
            modifier = modifier
        )
        Button(onClick = onClick) {
            Text(
                text = <span class="hljs-string">&quot;My first button&quot;</span>
            )
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714412.4565')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>And in the caller (in the activity or fragment) you can define the action to do when the button is clicked.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714412.7437"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MainActivity</span> : <span class="hljs-type">ComponentActivity</span>() {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)

        <span class="hljs-keyword">val</span> onButtonClick: () -&gt; <span class="hljs-built_in">Unit</span> = {
            <span class="hljs-comment">// Here you can access to the activity state (ie baseContext)</span>
            Toast.makeText(baseContext, <span class="hljs-string">&quot;Hello button&quot;</span>, Toast.LENGTH_LONG).show()
        }

        setContent {
            AutomacorpTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding -&gt;
                    Greeting(
                        <span class="hljs-string">&quot;Android&quot;</span>,
                        onClick = onButtonClick,
                        modifier = Modifier.padding(innerPadding),
                    )
                }
            }
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714412.7437')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>When Jetpack Compose runs your composables for the first time, during initial composition, it will keep track of the composables that you call to describe your UI in a Composition. Then, when the state of your app changes, Jetpack Compose schedules a recomposition. Recomposition is when Jetpack Compose re-executes the composables that may have changed in response to state changes, and then updates the Composition to reflect any changes.</p>
</div>
<div class="paragraph">
<p>Compose will avoid recomposing them if their inputs haven’t changed.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_update_the_home_page"><span class="icon">[flask&#93;</span> : Update the home page</h2>
<div class="sectionbody">
<div class="paragraph">
<p>In this new codelab you will update the <code>greeting</code> page to create a home page with</p>
</div>
<div class="ulist">
<ul>
<li>
<p>a welcome message (<code>Text</code> composable),</p>
</li>
<li>
<p>an image (<code>Image</code> composable),</p>
</li>
<li>
<p>an edit text (<code>OutlinedTextField</code> composable, we will use a placeholder with an icon) and</p>
</li>
<li>
<p>a button (<code>Button</code> composable).</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>We will create</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/updateui/example.png" alt="UI example" width="400">
</div>
</div>
<div class="sect2">
<h3 id="_update_the_greeting_text">Update the greeting text</h3>
<div class="paragraph">
<p>Update the <code>Greeting</code> composable and the Text component to display this message <code>Welcome on automacorp the app to manage building windows</code>.</p>
</div>
<div class="paragraph">
<p>You can test your work, but this solution is not optimal. If you want to provide your app to people who speak different languages you must to use the Android solution to internationalize the text.</p>
</div>
<div class="paragraph">
<p>Resources are the additional files and static content that your code uses, such as images, screen definitions, strings used in interfaces, styles, animation instructions, and more. At runtime, Android uses the appropriate resource based on the current configuration.</p>
</div>
<div class="paragraph">
<p>For example, you can define different string files depending on user language.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>app/src/main/res/values/string.xml the default file</p>
</li>
<li>
<p>app/src/main/res/values-fr/string.xml the file for French language</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Open the Project window and open file <strong>app @GT res @GT values @GT strings.xml</strong>.
This is a string resources file, where you can specify all of your UI strings. It allows you to manage all of your UI strings in a single location, which makes them easier to find, update, and localize. For the moment you have only one text inside, your app name.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/updateui/component_row.png" alt="Superposition" width="800">
</div>
</div>
<div class="paragraph">
<p>You can launch <a href="https://developer.android.com/studio/write/translations-editor">Translations Editor</a>, to add or edit text for different languages (link on the top). In this lab we will use only one language. You can update this file and add these values</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1734011714413.4846"><span class="hljs-tag">&lt;<span class="hljs-name">resources</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;app_name&quot;</span>&gt;</span>automacorp<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;app_logo_description&quot;</span>&gt;</span>automacorp logo<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;act_main_welcome&quot;</span>&gt;</span>Welcome on automacorp,\n the app to manage building windows<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;act_main_open&quot;</span>&gt;</span>Open<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;act_main_fill_name&quot;</span>&gt;</span>Fill a name<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">resources</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1734011714413.4846')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Update your Text definition to use the <code>stringResource</code> to use a 18n key in your code. For example</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714413.7593"> Text(
    stringResource(R.string.act_main_welcome),
    textAlign = TextAlign.Center
)</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714413.7593')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_add_an_image">Add an image</h3>
<div class="paragraph">
<p>We will add an image on the first screen on the top. Copy this xml file <a href="https://dev-mind.fr/ic_logo.xml">ic_logo.xml</a> in your directory <strong>_res @GT drawable</strong>. This file is a vector drawable image. Directory <strong>drawable</strong> contains all your images. Several formats are available (png, jpg&#8230;&#8203;) but the most optimized is a <a href="https://developer.android.com/guide/topics/graphics/vector-drawable-resources">Vector drawable</a></p>
</div>
<div class="paragraph">
<p>We can create a new composable to manage this image. The API force to define an image text description for accessibility</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714413.3167"><span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">AppLogo</span><span class="hljs-params">(modifier: <span class="hljs-type">Modifier</span>)</span></span> {
    Image(
        painter = painterResource(R.drawable.ic_logo),
        contentDescription = stringResource(R.string.app_logo_description),
        modifier = modifier.paddingFromBaseline(top = <span class="hljs-number">100.</span>dp).height(<span class="hljs-number">80.</span>dp),
    )
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714413.3167')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The modifier is an argument because the position will be defined by the parent. If you want to reuse this composable elsewhere, this modifier (the property to display your block) can be different.</p>
</div>
<div class="paragraph">
<p>Now you can use this new composable in the <code>Greeting</code> block in a <code>Column</code> layout to have the image above the text</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714413.1118"><span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">Greeting</span><span class="hljs-params">(onClick: (<span class="hljs-type">name</span>: <span class="hljs-type">String</span>) -&gt; <span class="hljs-type">Unit</span>,  modifier: <span class="hljs-type">Modifier</span> = Modifier)</span></span> {
    Column {
        AppLogo(Modifier.padding(top = <span class="hljs-number">32.</span>dp).fillMaxWidth())
        Text(
            stringResource(R.string.act_main_welcome),
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier
                .padding(<span class="hljs-number">24.</span>dp)
                .align(Alignment.CenterHorizontally),
            textAlign = TextAlign.Center
        )
   }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714413.1118')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_add_a_text_to_fill_a_name">Add a text to fill a name</h3>
<div class="paragraph">
<p>TextField allows users to enter and modify text. We will use an <code>OutlinedTextField</code> to use a different style.</p>
</div>
<div class="paragraph">
<p>For the moment we will try to write a text in the console (note: the modifier is used to define the position of the component)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714413.078">OutlinedTextField(
    <span class="hljs-string">&quot;&quot;</span>,
    onValueChange = { println(<span class="hljs-string">&quot;value of the field : @dollar@it&quot;</span>) },
    modifier = Modifier.padding(<span class="hljs-number">24.</span>dp).fillMaxWidth()
)</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714413.078')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If you try to display the field and write a text, you will see that nothing happens. That&#8217;s because the TextField doesn&#8217;t update itself when its value parameter changes. This is due to how composition and recomposition work in Compose. When you update something in the field, the composable is recomposed and redisplayed. But the value of the field is lost.</p>
</div>
<div class="paragraph">
<p>We need to store the value of the field in a state with the remember function. Compose provides a way to store the state of the application in a composable. You can use the <code>mutableStateOf</code> function to create a mutable state.</p>
</div>
<div class="paragraph">
<p>Update your code to define a state for the text field, and update it when the value is updated by the user</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714413.796"><span class="hljs-keyword">var</span> name <span class="hljs-keyword">by</span> remember { mutableStateOf(<span class="hljs-string">&quot;&quot;</span>) }

OutlinedTextField(
    name,
    onValueChange = { name = it },
    modifier = Modifier.padding(<span class="hljs-number">24.</span>dp).fillMaxWidth()
)</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714413.796')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>But when you open the screen, the input value is empty. We can use a placeholder to display a text when the field is empty. We can use a <code>placeholder</code> argument to define a composable to display when the field is empty. The content of the placeholder can be a complex composable. For example, we can display an icon and a text.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714413.879">OutlinedTextField(
    name,
    onValueChange = { name = it },
    modifier = Modifier.padding(<span class="hljs-number">24.</span>dp).fillMaxWidth(),
    placeholder = {
        Row {
            Icon(
                Icons.Rounded.AccountCircle,
                modifier = Modifier.padding(end = <span class="hljs-number">8.</span>dp),
                contentDescription = stringResource(R.string.act_main_fill_name),
            )
            Text(stringResource(R.string.act_main_fill_name))
        }
    })</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714413.879')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The <code>Icons</code> class is a collection of icons provided by the Material Design library.</p>
</div>
<div class="paragraph">
<p>You can relaunch your app and test the text field.</p>
</div>
</div>
<div class="sect2">
<h3 id="_add_a_button">Add a button</h3>
<div class="paragraph">
<p>We will add a button to display the filled name in the previous <code>OutlinedTextField</code>, in a floating dialog box. On the <code>Button</code> composable, the <code>onClick</code> argument is used to define the action to do when the button is clicked.</p>
</div>
<div class="paragraph">
<p>But we can&#8217;t call the <code>showDialog</code> function in the composable. We have to pass the onClick function as an argument.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714413.4763"><span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">Greeting</span><span class="hljs-params">(onClick: (<span class="hljs-type">name</span>: <span class="hljs-type">String</span>) -&gt; <span class="hljs-type">Unit</span>, modifier: <span class="hljs-type">Modifier</span> = Modifier)</span></span> {
    Column {
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">var</span> name <span class="hljs-keyword">by</span> remember { mutableStateOf(<span class="hljs-string">&quot;&quot;</span>) }
        OutlinedTextField(
            name,
            onValueChange = { name = it },
            modifier = Modifier.padding(<span class="hljs-number">24.</span>dp).fillMaxWidth(),
            placeholder = {
              Text(stringResource(R.string.act_main_fill_name))
            })

        Button(
            onClick = { onClick(name) },
            modifier = Modifier.padding(<span class="hljs-number">8.</span>dp).align(Alignment.CenterHorizontally)
        ) {
            Text(stringResource(R.string.act_main_open))
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714413.4763')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>In the <code>MainActivity</code> class, you can define the action to do when the button is clicked. For example, you can display a message with the name filled in the text field.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714414.8936"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MainActivity</span> : <span class="hljs-type">ComponentActivity</span>() {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)

        <span class="hljs-comment">// Action to do when the button is clicked</span>
        <span class="hljs-keyword">val</span> onSayHelloButtonClick: (name: String) -&gt; <span class="hljs-built_in">Unit</span> = { name -&gt;
            Toast.makeText(baseContext, <span class="hljs-string">&quot;Hello @dollar@name&quot;</span>, Toast.LENGTH_LONG).show()
        }

        setContent {
            AutomacorpTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding -&gt;
                    Greeting(
                        onClick = onSayHelloButtonClick,
                        modifier = Modifier.padding(innerPadding),
                    )
                }
            }
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714414.8936')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can now relaunch your app, fill the text field, and click on the button to see the message displayed.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>In this lesson, you have learned how to update a screen with Android Studio and JetPack Compose. You have learned how to create a new component, use a layout to arrange components, and manage the state of a component. You have also learned how to use resources to manage text and images in your app.</p>
</div>
<div class="paragraph">
<p>If you want to go further, you can see the <a href="https://developer.android.com/jetpack/compose">official documentation</a> to learn more about the Compose API.</p>
</div>
</div>
</div>`;