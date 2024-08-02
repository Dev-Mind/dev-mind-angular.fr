export const _android_add_menu:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_menus">Menus</a></li>
<li><a class="link" fragment="#_flask_create_the_menu"><span class="icon">[flask&#93;</span> : Create the menu</a></li>
<li><a class="link" fragment="#_intent_new_use_case">Intent : new use case</a></li>
<li><a class="link" fragment="#_flask_test_your_menu"><span class="icon">[flask&#93;</span> : Test your menu</a></li>
<li><a class="link" fragment="#_flask_manage_back_button_to_return_on_main_activity"><span class="icon">[flask&#93;</span> : Manage back button to return on main activity</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In this lesson you will learn how add a menu and launch intent to open internal or external activities</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-add-menu.png" alt="Android course step2" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_menus">Menus</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Menus are a common user interface component in many types of applications. A <a href="https://developer.android.com/guide/topics/resources/menu-resource">menu</a> is a resource as style, color, layout&#8230;&#8203;</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/firstapp/android-resource1.png" alt="Android resource">
</div>
</div>
<div class="paragraph">
<p>Remember, you can provide alternative resources for specific device configurations, by grouping them in specially-named resource directories.
At runtime, Android uses the appropriate resource based on the current configuration.</p>
</div>
<div class="paragraph">
<p>It exists different types of menus (top, bottom&#8230;&#8203;). In this lesson we will implement a menu on the top the in app bar. It&#8217;s where you should place actions that have a global impact on the app, such as "Compose email", "Settings"&#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>For all menu types, Android provides a standard XML format to define menu items. Instead of building a menu in your activity&#8217;s code, you should define a menu and all its items in an XML file.</p>
</div>
<div class="paragraph">
<p>Using a menu resource is a good practice for a few reasons:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>It&#8217;s easier to visualize the menu structure</p>
</li>
<li>
<p>It separates the content for the menu from your application&#8217;s behavioral code.</p>
</li>
<li>
<p>It allows you to create alternative menu configurations for different platform versions, screen sizes, and other configurations by leveraging the app resources framework.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>A menu will have different options (an option is a menu item).</p>
</div>
<div class="paragraph">
<p>It&#8217;s time to test by yourself. We want to add a menu in app bar with different options</p>
</div>
<div class="ulist">
<ul>
<li>
<p>a link to open your corporate website (we will open an URL in favorite browser)</p>
</li>
<li>
<p>a link to send you an email (we will open a window to write a new mail in favorite mail app)</p>
</li>
<li>
<p>a link to open the activity used to list building windows</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>A menu is linked to an activity, and you can use a different menu on 2 activities of your app.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_create_the_menu"><span class="icon">[flask&#93;</span> : Create the menu</h2>
<div class="sectionbody">
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Create an XML file inside your project&#8217;s <strong>res/menu/</strong> directory. For that in the <strong>Project window</strong>, right-click the app folder and select <strong>New @GT Android resource file</strong>. You can also use menu <strong>File @GT New @GT Android resource file</strong></p>
</li>
<li>
<p>In window "New resource File" choose</p>
<div class="ulist">
<ul>
<li>
<p><strong>File name</strong> : main_menu</p>
</li>
<li>
<p><strong>Resource type</strong> : menu</p>
</li>
<li>
<p><strong>Source set</strong> : main</p>
</li>
<li>
<p><strong>Directory name</strong> : menu</p>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/menu/android-menu.png" alt="Add menu resource">
</div>
</div>
</li>
</ul>
</div>
</li>
<li>
<p>File <strong>res/menu/menu.xml</strong> is opened in menu editor. You can use <strong>palette</strong> to add elements. We will add 3 <strong>Menu Items</strong>. Item element supports several attributes to define an item&#8217;s appearance and behavior. The main ones are :</p>
<div class="ulist">
<ul>
<li>
<p><strong>id</strong> : an unique resource ID, which allows the application to recognize the item when the user wants to manipulate it in code.</p>
</li>
<li>
<p><strong>icon</strong> : a reference to an optional drawable to use as the item&#8217;s icon.</p>
</li>
<li>
<p><strong>title</strong> : a reference to a string to use as the item&#8217;s title.</p>
</li>
<li>
<p><strong>showAsAction</strong> : specifies when and how this item should appear as an action item in the app bar. Possible values are</p>
<div class="ulist">
<ul>
<li>
<p><strong>ifRoom</strong> : place this item in the app bar if there is room for it. If there is not room for all the items marked "ifRoom", last items are displayed in the overflow menu.</p>
</li>
<li>
<p><strong>withText</strong>: also include the title text (defined by android:title) with the action item</p>
</li>
<li>
<p><strong>never</strong> : place this item in the app bar&#8217;s overflow menu.</p>
</li>
</ul>
</div>
</li>
<li>
<p>you have more options. You can find them <a href="https://developer.android.com/guide/topics/resources/menu-resource">here</a></p>
</li>
</ul>
</div>
</li>
<li>
<p>You can copy these string definitions in  <strong>res/values/string.xml</strong></p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722609004264.214"><span class="hljs-tag">&lt;<span class="hljs-name">resources</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- ... --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;menu_rooms&quot;</span>&gt;</span>Building rooms<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;menu_website&quot;</span>&gt;</span>Our website<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;menu_email&quot;</span>&gt;</span>Send us an email<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">resources</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722609004264.214')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>Add 3 menu entries with an <strong>id</strong>, a <strong>title</strong> and option <strong>showAsAction</strong> to the value <strong>never</strong></p>
<div class="videoblock">
<div class="content">
<iframe width="600" height="330" src="https://www.youtube.com/embed/AgvtSl7GNiM?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</li>
<li>
<p>We will attach this menu to activities  <strong>MainActivity</strong>, <strong>WindowActivity</strong> and <strong>WindowsActivity</strong>. To prevent the add on each activity, we will create a parent activity and each activities will inherit from this parent activity. Select package <strong>com.automacorp</strong>, right-click and select <strong>New @GT Activity @GT Kotlin File/Class</strong>, fill <strong>BasicActivity</strong></p>
</li>
<li>
<p>In this file you can copy this code</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004266.47"><span class="hljs-keyword">open</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">BasicActivity</span> : <span class="hljs-type">AppCompatActivity</span>()</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004266.47')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>Update <strong>MainActivity</strong>, <strong>WindowActivity</strong> and <strong>WindowsActivity</strong> and replace <em>AppCompatActivity</em> by <em>BasicActivity</em></p>
</li>
<li>
<p>We will now activate the menu. Override <strong>onCreateOptionsMenu()</strong> in <strong>BasicActivity</strong>. In this method, you can inflate your menu resource in the Menu provided in the callback</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004268.6343"><span class="hljs-keyword">open</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">BasicActivity</span> : <span class="hljs-type">AppCompatActivity</span>() {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreateOptionsMenu</span><span class="hljs-params">(menu: <span class="hljs-type">Menu</span>)</span></span>: <span class="hljs-built_in">Boolean</span> {
        <span class="hljs-keyword">val</span> inflater: MenuInflater = menuInflater
        inflater.inflate(R.menu.main_menu, menu)
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004268.6343')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>When the user selects an item from the options menu (including action items in the app bar), the system calls your activity&#8217;s <strong>onOptionsItemSelected()</strong> method. This method passes the MenuItem selected. We will handle each possible values in <strong>BasicActivity</strong> class</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004270.1665"><span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onOptionsItemSelected</span><span class="hljs-params">(item: <span class="hljs-type">MenuItem</span>)</span></span>: <span class="hljs-built_in">Boolean</span> {
    <span class="hljs-keyword">when</span>(item.itemId){
        R.id.menu_rooms <span class="hljs-meta">@LAMBDA</span> startActivity(
            Intent(<span class="hljs-keyword">this</span>, RoomsActivity::<span class="hljs-keyword">class</span>.java)
        )
        R.id.menu_website <span class="hljs-meta">@LAMBDA</span> startActivity(
            Intent(Intent.ACTION_VIEW, Uri.parse(<span class="hljs-string">&quot;https://dev-mind.fr&quot;</span>))
        )
        R.id.menu_email <span class="hljs-meta">@LAMBDA</span> startActivity(
            Intent(Intent.ACTION_SENDTO, Uri.parse(<span class="hljs-string">&quot;mailto://guillaume@dev-mind.fr&quot;</span>))
        )

    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.onContextItemSelected(item)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004270.1665')">Copy</button></pre>
</div>
</div>
</li>
</ol>
</div>
<div class="paragraph">
<p>To understand the last code you can read the next chapter.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_intent_new_use_case">Intent : new use case</h2>
<div class="sectionbody">
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
</div>
</div>
<div class="sect1">
<h2 id="_flask_test_your_menu"><span class="icon">[flask&#93;</span> : Test your menu</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Last version of Android Studio uses Material 3 and the theme <code>Theme.Material3.DayNight.NoActionBar</code> so with no action bar by default.</p>
</div>
<div class="paragraph">
<p>So when you launch your app you have no action bar and no menu displayed on the top. Open the files <code>res/values/themes</code> (one for the default mode and one for the dark mode).</p>
</div>
<div class="paragraph">
<p>Update</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722609004271.4434"> @LTstyle name=&quot;Base.Theme.Automacorp&quot; parent=&quot;Theme.Material3.DayNight.NoActionBar&quot;@GT
    @LT!-- ... -@LAMBDA
 @LT/style@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004271.4434')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>and use</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722609004272.3357"> @LTstyle name=&quot;Base.Theme.Automacorp&quot; parent=&quot;Theme.Material3.DayNight&quot;@GT
    @LT!-- ... -@LAMBDA
 @LT/style@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004272.3357')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If you launch your app you will be able to test your menu</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/menu/app-with-menu.png" alt="App with menu" width="300">
</div>
</div>
<div class="paragraph">
<p>You can personalize the bar color for that you need to override the toolbarStyle property</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722609004272.1692"> @LTstyle name=&quot;Base.Theme.Automacorp&quot; parent=&quot;Theme.Material3.DayNight&quot;@GT
    @LT!-- ... -@LAMBDA
    @LTitem name=&quot;toolbarStyle&quot;@GT@style/Theme.Custom.Toolbar@LT/item@GT
 @LT/style@GT
 @LTstyle name=&quot;Theme.Custom.Toolbar&quot; parent=&quot;Widget.Material3.Toolbar&quot;@GT
    @LTitem name=&quot;android:background&quot;@GT@color/primary@LT/item@GT
 @LT/style@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004272.1692')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_manage_back_button_to_return_on_main_activity"><span class="icon">[flask&#93;</span> : Manage back button to return on main activity</h2>
<div class="sectionbody">
<div class="paragraph">
<p>When you are on <code>WindowActivity</code> we want to add a button to go back on <code>MainActivity</code>. To do that you need to update <code>WindowActivity</code> and add a line to activate option in action bar <code>supportActionBar?.setDisplayHomeAsUpEnabled(true)</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004274.467"><span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowActivity</span> : <span class="hljs-type">AppCompatActivity</span>() {

    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
        setContentView(R.layout.activity_window)
        supportActionBar?.setDisplayHomeAsUpEnabled(<span class="hljs-literal">true</span>)
        <span class="hljs-comment">//...</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004274.467')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You also need to define your activity parent. This definition is made in AndroidManifest.xml with property <code>parentActivityName</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722609004274.8438">@LTactivity android:name=&quot;.WindowActivity&quot; android:parentActivityName=&quot;.MainActivity&quot;@GT@LT/activity@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004274.8438')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Click <strong>Apply Changes</strong> <span class="image"><img src="../../img/training/android/android-studio-apply.svg" alt="Apply changes"></span>  in the toolbar to run the app and test back button. You will be able to add this feature on your other screens.</p>
</div>
</div>
</div>`;