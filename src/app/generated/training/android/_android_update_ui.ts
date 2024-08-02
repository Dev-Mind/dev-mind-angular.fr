export const _android_update_ui:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_user_interface">User interface</a></li>
<li><a class="link" fragment="#_android_studio_layout_editor">Android Studio Layout Editor</a></li>
<li><a class="link" fragment="#_flask_update_home_page"><span class="icon">[flask&#93;</span> : Update home page</a></li>
<li><a class="link" fragment="#_flask_layout_errors_and_strings"><span class="icon">[flask&#93;</span> : Layout errors and strings</a></li>
<li><a class="link" fragment="#_flask_launch_action_on_button_click"><span class="icon">[flask&#93;</span> : Launch action on button click</a></li>
<li><a class="link" fragment="#_flask_update_app_color_scheme"><span class="icon">[flask&#93;</span> : Update app color scheme</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In this lesson, you will learn how to update a layout with Android Studio</p>
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
<p>User interface for an Android app is built as a hierarchy of layouts and widgets.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>The layouts are <strong>ViewGroup objects</strong>, containers that control how their child views are positioned on the screen.</p>
</li>
<li>
<p>Widgets are <strong>View objects</strong>, UI components such as buttons and text boxes.</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-view-hierarchy.png" alt="View hierarchy" width="800">
</div>
</div>
<div class="paragraph">
<p>In this new codelab you will update the <code>hello world</code> page to create a home page with a welcome message, an image, an edit text and a button.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/updateui/android-example.png" alt="First view example" width="800">
</div>
</div>
<div class="paragraph">
<p>Android provides an XML vocabulary for ViewGroup and View classes, and your UI is defined in XML files. Don&#8217;t be afraid Android Studio provide a wysiwyg editor.</p>
</div>
<div class="paragraph">
<p>In the last versions of Android, Google introduce a new way to define your UI with <a href="https://developer.android.com/jetpack/compose">Jetpack Compose</a>. With this solution you don&#8217;t need to write your templates in xml, but this technology is not yet widespread.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_android_studio_layout_editor">Android Studio Layout Editor</h2>
<div class="sectionbody">
<div class="paragraph">
<p>In the Project window, open <strong>app @GT res @GT layout @GT activity_main.xml</strong>. Editor should be displayed</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/updateui/android-studio-layout.png" alt="Android Studio Layout Editor" width="900">
</div>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p><strong>View mode</strong>: View your layout in either code mode (XML editor), Design mode (design view and Blueprint view), or Split mode icon (mix between code and design view)</p>
</li>
<li>
<p><strong>Palette</strong>: Contains various views and view groups that you can drag into your layout.</p>
</li>
<li>
<p><strong>Design editor</strong>: Edit your layout in Design view, Blueprint view, or both.</p>
</li>
<li>
<p><strong>Component Tree</strong>: Shows the hierarchy of components in your layout. It is sometimes useful to select a given widget</p>
</li>
<li>
<p><strong>Constraint widget</strong>: Helps to place an item in relation to those around it</p>
</li>
<li>
<p><strong>Attributes</strong>: Controls for the selected widget&#8217;s attributes.</p>
</li>
<li>
<p><strong>Layout Toolbar</strong>: Click these buttons to configure your layout appearance in the editor and change layout attributes as target phone, orientation, light, locale&#8230;&#8203;</p>
</li>
<li>
<p><strong>Widget Toolbar</strong>: Click these buttons to align your view. Button with red cross is useful to clear all widget constraints</p>
</li>
</ol>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_update_home_page"><span class="icon">[flask&#93;</span> : Update home page</h2>
<div class="sectionbody">
<div class="paragraph">
<p>For the moment our page contains only one readonly text field.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Select it and delete it with <strong>Suppr</strong> key</p>
</li>
<li>
<p>We will add an image. Copy this xml file <a href="https://dev-mind.fr/ic_logo.xml">ic_logo.xml</a> in your directory <strong>_res @GT drawable</strong>. This file is a vector drawable image. Directory <strong>drawable</strong> contains all your images. Several formats are available (png, jpg&#8230;&#8203;) but the most optimized is a <a href="https://developer.android.com/guide/topics/graphics/vector-drawable-resources">Vector drawable</a></p>
</li>
<li>
<p>In <strong>Common Palette</strong> on the left of the screen click on <strong>ImageView</strong> and drag into your layout. A window is opened to select an image. You will choose the imported image <a href="https://dev-mind.fr/ic_logo.xml">ic_logo.xml</a>.</p>
</li>
<li>
<p>Click on <strong>OK</strong> button to import image in your layout</p>
</li>
<li>
<p>We will use the <strong>blueprint view</strong> to add constraint to this image, to place it on the top of the screen and define a height. See video below for more detail</p>
<div class="videoblock">
<div class="content">
<iframe width="600" height="330" src="https://www.youtube.com/embed/XnXLjsZc7ZI?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</li>
<li>
<p>We will add a new readonly text below image to introduce our app. In common palette select a <strong>Textview</strong> widget and drag into your layout.</p>
</li>
<li>
<p>In blueprint view you can add constraints to this textview</p>
<div class="ulist">
<ul>
<li>
<p><strong>text</strong> : <em>Welcome on automacorp\n the app to manage building windows</em></p>
</li>
<li>
<p><strong>layout_width</strong> and <strong>layout_height</strong> : <em>wrap_content</em></p>
</li>
<li>
<p><strong>textSize</strong>: <em>18 sp</em></p>
</li>
<li>
<p><strong>gravity</strong> : <em>center</em></p>
</li>
<li>
<p>margin right and left 16dp, margin top 32dp</p>
<div class="videoblock">
<div class="content">
<iframe width="600" height="330" src="https://www.youtube.com/embed/ObG6BlWkLx0?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</li>
</ul>
</div>
</li>
<li>
<p>In <strong>text palette</strong> select a <strong>Plain Text</strong> widget (editable text view) and drag into your layout below your welcome message. This widget should have these properties</p>
<div class="ulist">
<ul>
<li>
<p><strong>hint</strong> : <em>Window name</em>. This text will be displayed as long as the user has not entered anything else.</p>
</li>
<li>
<p><strong>id</strong> : <em>txt_window_name</em> Android always generate a random name to each widget or layout. Id can be used later in your Kotlin code. It&#8217;s a good practice to use an explicit name as id</p>
</li>
<li>
<p>Apply a top, left margins and use constraint to place this widget below your welcome message</p>
</li>
</ul>
</div>
</li>
<li>
<p>In <strong>common palette</strong> select a <strong>Button</strong> widget and drag into your layout below your welcome message. This button should have these properties</p>
<div class="ulist">
<ul>
<li>
<p><strong>hint</strong> : <em>Open window</em>.</p>
</li>
<li>
<p><strong>id</strong> : <em>btn_open_window</em></p>
</li>
<li>
<p>Apply a top, right and left margins and use constraint use constraint to place this widget below welcome message and on the right of your plain text widget</p>
</li>
</ul>
</div>
</li>
<li>
<p>Click on Run button to test your app (see chapter <a href="android-first-app.html#_run_your_app">Run your app</a>)</p>
</li>
</ol>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_layout_errors_and_strings"><span class="icon">[flask&#93;</span> : Layout errors and strings</h2>
<div class="sectionbody">
<div class="paragraph">
<p>When something is wrong, Android Studio add a warning or an error button on the right of the editor toolbar (red flag on the top right)</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/updateui/layout_error.png" alt="Layout error">
</div>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Click on this button to see different problems (a window is opened on the bottom of your screen).<br>
<span class="image"><img src="../../img/training/android/updateui/layout_panel_error.png" alt="Layout error"></span></p>
</li>
<li>
<p>You can double click on an item to see the problem and have an explaination. Android studio display also a Fix button to help you to resolve problem</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>We will try to fix some errors. One of them is <code>Hardcoded string "Window name", should use @backtick@@string</code> resource@backtick@. You added a Text Field and a text inside. As your application can be used by different people who speak different languages, you should always use text internalization mechanisms provided by Android.</p>
</div>
<div class="paragraph">
<p>Open the Project window and open file <strong>app @GT res @GT values @GT strings.xml</strong>.
This is a string resources file, where you can specify all of your UI strings. It allows you to manage all of your UI strings in a single location, which makes them easier to find, update, and localize. For the moment you have only one text inside, your app name.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722604316107.95"><span class="hljs-tag">&lt;<span class="hljs-name">resources</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;app_name&quot;</span>&gt;</span>Automacorp<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">resources</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722604316107.95')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can launch <a href="https://developer.android.com/studio/write/translations-editor">Translations Editor</a>, to add or edit text for different languages. In this lab we will use only one language. You can update this file to have a text description for our logo, and the text content for our welcome message</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722604316108.2195"><span class="hljs-tag">&lt;<span class="hljs-name">resources</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;app_name&quot;</span>&gt;</span>automacorp<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;app_logo_description&quot;</span>&gt;</span>automacorp logo<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;act_main_windowname_hint&quot;</span>&gt;</span>Window name<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;act_main_welcome&quot;</span>&gt;</span>Welcome on automacorp,\n the app to manage building windows<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">string</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;act_main_open_window&quot;</span>&gt;</span>Open window<span class="hljs-tag">&lt;/<span class="hljs-name">string</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">resources</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722604316108.2195')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can now update your layout and yours components to add a string reference for image description and welcome message. To make a reference to a String you have to use the prefix <strong>@string/</strong> followed by the string key</p>
</div>
<div class="videoblock">
<div class="content">
<iframe width="600" height="330" src="https://www.youtube.com/embed/4sYyCAcfWcE?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_launch_action_on_button_click"><span class="icon">[flask&#93;</span> : Launch action on button click</h2>
<div class="sectionbody">
<div class="paragraph">
<p>An activity is always associated with a layout file. In <a href="android-update-ui#_lab_2_update_home_page">Lab 2</a> we have updated our main activity layout with a logo, a welcome message and a button.  In this lesson, you add some code in <strong>MainActivity</strong> to interact with this button.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>In the file <strong>app @GT java @GT com.automacorp @GT MainActivity</strong>, add the following openWindow() method stub:</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722604316110.4956"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MainActivity</span> : <span class="hljs-type">AppCompatActivity</span>() {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    <span class="hljs-comment">/** Called when the user taps the button */</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">openWindow</span><span class="hljs-params">(view: <span class="hljs-type">View</span>)</span></span> {
        <span class="hljs-comment">// Extract value filled in editext identified with txt_window_name id</span>
        <span class="hljs-keyword">val</span> windowName = <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTEditText@</span>GT(R.id.txt_window_name).text.toString()
        <span class="hljs-comment">// Display a message</span>
        Toast.makeText(<span class="hljs-keyword">this</span>, <span class="hljs-string">&quot;You choose @dollar@windowName&quot;</span>, Toast.LENGTH_LONG).show()
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316110.4956')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You might see an error because Android Studio cannot resolve <strong>View</strong>, <strong>Toast</strong> classes or <strong>R</strong>. To clear errors, click the <strong>View</strong> declaration, place your cursor on it, and then press <strong>Alt+Enter</strong>, or <strong>Option+Enter</strong> on a Mac, to perform a Quick Fix. If a menu appears, select <strong>Import class</strong>. Do the same thing for <strong>Toast</strong> and <strong>R</strong> classes. <strong>R</strong> class contains a link to all ressources defined in your app.</p>
</div>
</li>
<li>
<p>If you have an error with <code>txt_window_name</code> check your layout and update the id of your <code>EditTextView</code></p>
</li>
<li>
<p>Return to the <strong>activity_main.xml</strong> file and select the button in the Layout Editor.  In Attributes window, locate <strong>onClick</strong> property and select <strong>openWindow [MainActivity]</strong> from its drop-down list.</p>
</li>
<li>
<p>You can now relaunch your app,</p>
<div class="ulist">
<ul>
<li>
<p>In window name editext fill a name</p>
</li>
<li>
<p>Click on the button you a message should be displayed on the bottom of the screen with the window name filled</p>
</li>
</ul>
</div>
</li>
</ol>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_update_app_color_scheme"><span class="icon">[flask&#93;</span> : Update app color scheme</h2>
<div class="sectionbody">
<div class="paragraph">
<p>As for a web page, you can define a style theme when you develop an Android application. The main them is defined in <strong>app @GT manifests @GT AndroidManifest.xml</strong></p>
</div>
<div class="paragraph">
<p>By default <code>@style/Theme.automacorp</code> follow <a href="https://material.io/">material design</a> specification. You app is configured to use a style <code>@style/Theme.automacorp</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722604316111.7444"><span class="hljs-tag">&lt;<span class="hljs-name">application</span> <span class="hljs-attr">android:allowbackup</span>=<span class="hljs-string">&quot;true&quot;</span> <span class="hljs-attr">android:dataextractionrules</span>=<span class="hljs-string">&quot;@xml/data_extraction_rules&quot;</span> <span class="hljs-attr">android:fullbackupcontent</span>=<span class="hljs-string">&quot;@xml/backup_rules&quot;</span> <span class="hljs-attr">android:icon</span>=<span class="hljs-string">&quot;@mipmap/ic_launcher&quot;</span> <span class="hljs-attr">android:label</span>=<span class="hljs-string">&quot;@string/app_name&quot;</span> <span class="hljs-attr">android:roundicon</span>=<span class="hljs-string">&quot;@mipmap/ic_launcher_round&quot;</span> <span class="hljs-attr">android:supportsrtl</span>=<span class="hljs-string">&quot;true&quot;</span> <span class="hljs-attr">android:theme</span>=<span class="hljs-string">&quot;@style/Theme.automacorp&quot;</span> <span class="hljs-attr">tools:targetapi</span>=<span class="hljs-string">&quot;31&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">application</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722604316111.7444')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>This file reference</p>
</div>
<div class="paragraph">
<p><strong>File :</strong> <strong><em>res @GT values @GT themes @GT theme.xml</em></strong> and</p>
</div>
<div class="paragraph">
<p>Your theme Theme.automacorp in this file. You have in reality 2 files because the Google team encourages you to adopt a normal theme and a darker theme in night mode to consume less battery. As a reminder, the lighter the colors, the more your screen consumes and the more your battery is used.</p>
</div>
<div class="paragraph">
<p>You can see here that your custom them override a <a href="https://material.io/">Material</a> theme <code>Theme.MaterialComponents.DayNight.DarkActionBar</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722604316111.1077">@LTresources xmlns:tools=&quot;http://schemas.android.com/tools&quot;@GT
    @LT!-- Base application theme. -@LAMBDA
    @LTstyle name=&quot;Base.Theme.Automacorp&quot; parent=&quot;Theme.Material3.DayNight.NoActionBar&quot;@GT
        @LT!-- Customize your light theme here. -@LAMBDA
        @LT!-- @LTitem name=&quot;colorPrimary&quot;@GT@color/my_light_primary@LT/item@GT -@LAMBDA
    @LT/style@GT

    @LTstyle name=&quot;Theme.Automacorp&quot; parent=&quot;Base.Theme.Automacorp&quot; /@GT
@LT/resources@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316111.1077')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p><strong>File :</strong> <strong><em>res @GT values @GT colors.xml</em></strong></p>
</div>
<div class="paragraph">
<p>Ce fichier référence les couleurs utilisées dans votre application</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722604316111.545">@LT?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?@GT
@LTresources@GT
  @LTcolor name=&quot;black&quot;@GT#FF000000@LT/color@GT
  @LTcolor name=&quot;white&quot;@GT#FFFFFFFF@LT/color@GT
@LT/resources@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316111.545')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The material theme is built on different colors : a primary and a secondary color. You can also override all other additional colors, but today we only will try to use our own color scheme.</p>
</div>
<div class="paragraph">
<p>The first step is the color choice. For that go on <a href="https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors">Material color tool</a> to defined your own app color combination. You define your prmiary color and the tool  is able to compute complementary color</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-color.png" alt="Android color" width="800">
</div>
</div>
<div class="paragraph">
<p>I choose this color combination</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722604316111.6206">@LT?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?@GT
@LTresources@GT
  @LTcolor name=&quot;black&quot;@GT#FF000000@LT/color@GT
  @LTcolor name=&quot;white&quot;@GT#FFFFFFFF@LT/color@GT
  @LTcolor name=&quot;primary&quot;@GT#2979ff@LT/color@GT
@LT/resources@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316111.6206')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>And after that I can update my theme file</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722604316111.0203">@LTresources xmlns:tools=&quot;http://schemas.android.com/tools&quot;@GT
    @LT!-- Base application theme. -@LAMBDA
    @LTstyle name=&quot;Base.Theme.Automacorp&quot; parent=&quot;Theme.Material3.DayNight.NoActionBar&quot;@GT
        @LT@LTitem name=&quot;colorPrimary&quot;@GT@color/primary@LT/item@GT
    @LT/style@GT

    @LTstyle name=&quot;Theme.Automacorp&quot; parent=&quot;Base.Theme.Automacorp&quot; /@GT
@LT/resources@GT</code><button class="btn-copy-code" onclick="copyToClipboard('1722604316111.0203')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Run your app to see the new app rendering</p>
</div>
</div>
</div>`;