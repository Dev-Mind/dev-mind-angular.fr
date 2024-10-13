export const _android_first_app:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_android_studio">Android studio</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_installation">Installation</a></li>
<li><a class="link" fragment="#_update_android_studio">Update Android Studio</a></li>
<li><a class="link" fragment="#_update_android_sdk">Update Android SDK</a></li>
</ul>
</li>
<li><a class="link" fragment="#_fundamental_concepts">Fundamental concepts</a></li>
<li><a class="link" fragment="#_flask_a_first_example_with_jetpack_compose"><span class="icon">[flask&#93;</span> : A first example with Jetpack compose</a></li>
<li><a class="link" fragment="#_most_important_files">Most important files</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_manifest_file">Manifest file</a></li>
<li><a class="link" fragment="#_activity">Activity</a></li>
<li><a class="link" fragment="#_resource_files">Resource files</a></li>
<li><a class="link" fragment="#_gradle_file">Gradle file</a></li>
</ul>
</li>
<li><a class="link" fragment="#_flask_launch_your_application"><span class="icon">[flask&#93;</span> : Launch your application</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_configure_a_real_android_device">Configure a real Android device</a></li>
<li><a class="link" fragment="#_configure_a_virtual_device">Configure a virtual device</a></li>
<li><a class="link" fragment="#_run_your_app">Run your app</a></li>
</ul>
</li>
<li><a class="link" fragment="#_resources">Resources</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>The aim of this course is to learn you, how write a simple application for Android and how to run it on your phone.
To do that, we will develop with Kotlin language.
If you know Java, everything will be easier with Kotlin.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-course1.png" alt="Android course step1" width="800">
</div>
</div>
<div class="paragraph">
<p>We have a limited number of lesson hours. We will therefore quickly go over some concepts.
If you want to go deeper, you will find more informations on <a href="https://developer.android.com/" class="bare">https://developer.android.com/</a></p>
</div>
<div class="paragraph">
<p>The aim is to be able to develop a simple application to call a REST API developed in Java (Spring) to display building rooms and manage windows in these rooms. It is necessary to ventilate as much as possible rooms, but as winter approaches it will become important to heat the buildings to ensure user comfort. Windows should be open during and after classes, closed at night or in case of heavy rain or severe cold.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_android_studio">Android studio</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Android studio is the tool we use to write Android code.
You need to install it on your computer (installation requires 900MB) on <a href="https://developer.android.com/studio" class="bare">https://developer.android.com/studio</a>.</p>
</div>
<div class="sect2">
<h3 id="_installation">Installation</h3>
<div class="paragraph">
<p>For a Linux installation you have to go in the installation directory (for me ~/appli) with a terminal and launch script <code>launch.sh</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1728847001162.472">cd ~/appli/android-studio/bin
sh ./studio.sh</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001162.472')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Follow the wizard and choose a standard installation.
It&#8217;s important to do that to download the last version of Android SDK, recent images for Emulator&#8230;&#8203;</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio.png" alt="Follow wizard" width="700">
</div>
</div>
<div class="paragraph">
<p>After the installation, you should have this screen</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio1.png" alt="Follow wizard" width="700">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_update_android_studio">Update Android Studio</h3>
<div class="paragraph">
<p>It&#8217;s always better to use the last version of Android Studio. To update it, you can go in the menu <strong>Help @GT Check for updates</strong>.</p>
</div>
<div class="paragraph">
<p>If a version is available, you can download it and install it.</p>
</div>
</div>
<div class="sect2">
<h3 id="_update_android_sdk">Update Android SDK</h3>
<div class="paragraph">
<p>If you already have a version of Android Studio on your laptop, you should update Android Sdk.
For that go on menu <strong>Tools @GT SDK manager</strong></p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio-update1.png" alt="Menu SDK manager" width="800">
</div>
</div>
<div class="paragraph">
<p>Below on my example, I choose to install the last version of the SDK, keep the version 14 and remove Android 13</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio-update2.png" alt="Choose SDK versions" width="800">
</div>
</div>
<div class="paragraph">
<p>When you develop in Android you should always do it on the last SDK version. Google requires you to always target this latest version when you publish apps to the official store. In our case we have to target the VanillaCream version (API level 35)</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_fundamental_concepts">Fundamental concepts</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Android apps are built as a combination of components that can be invoked individually.
We have several kind of components</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>Activity</strong> : an activity is the entry point for interacting with the user.
It represents a single screen with a user interface</p>
</li>
<li>
<p><strong>Service</strong> : a service is an entry point for keeping an app running in the background (app data synchronization, media player&#8230;&#8203;)</p>
</li>
<li>
<p><strong>Broadcast provider</strong> : A broadcast receiver is a component that enables the system to deliver events to the app (low battery, screen rotation, dark mode&#8230;&#8203;).</p>
</li>
<li>
<p><strong>Content provider</strong> : A content provider manages a shared set of app data that you can store in the file system, in a SQLite database, on the web, or on any other persistent storage location that your app can access.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>In this course we will only manipulate activities.</p>
</div>
<div class="paragraph">
<p>After you will finish your first app, you can learn more about the other app components on the <a href="https://developer.android.com/guide/components/fundamentals">Google developper website</a>.</p>
</div>
<div class="paragraph">
<p>Let&#8217;s focus on activities.</p>
</div>
<div class="paragraph">
<p>When you click on your app&#8217;s icon on your phone, you will launch the "main" activity.
This activity is often your home activity from which you will launch other activities.</p>
</div>
<div class="paragraph">
<p>An activity interact with an XML resource file where your view content is defined.
Android allows you to provide different resources for different devices.
For example, you can create different layouts for different screen sizes.
The system determines which layout to use based on the screen size of the current device.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-activities.png" alt="A view is an activity and an XML file" width="800">
</div>
</div>
<div class="paragraph">
<p>Note that there is also another important concept in Android development with the <a href="https://developer.android.com/guide/fragments?hl=en">fragments</a>. A Fragment represents a reusable portion of your app&#8217;s UI. A fragment defines and manages its own layout, has its own lifecycle, and can handle its own input events. Fragments can&#8217;t live on their own. They must be hosted by an activity.</p>
</div>
<div class="paragraph">
<p>Another remark, today you can always write your screen interface in an XML file. But you can also do this job in Kotlin with the Jetpack Compose library. This library is a modern toolkit for building native Android UI. It simplifies and accelerates UI development on Android.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/jetpack-compose.svg" alt="Jetpacj compose" width="60">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_a_first_example_with_jetpack_compose"><span class="icon">[flask&#93;</span> : A first example with Jetpack compose</h2>
<div class="sectionbody">
<div class="paragraph">
<p>In this lab, you will learn how create a new Android project with Android Studio</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Launch Android Studio. If you need to install it see you on the <a href="http://localhost:8080/training/android/android-first-app.html#_android_studio">first chapter</a></p>
</li>
<li>
<p>In the Welcome to Android Studio window, click Start a new Android Studio project. If you have a project already opened, select <strong>File @GT New @GT New Project.</strong></p>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio1.png" alt="Follow wizard" width="700">
</div>
</div>
</li>
<li>
<p>Android Studio will initialize a new project with an activity.
It asks you to select a template for this activity.
In the <strong>Select a Project Template window</strong>, select <strong>Empty Activity</strong> (in JetPack compose) and click Next.</p>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio2.png" alt="Select project type" width="700">
</div>
</div>
</li>
<li>
<p>In the next wizard window, you have to define the app name and the language</p>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio-new.png" alt="New project" width="700">
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>Enter <em>automacorp</em> in the <strong>Name</strong> field.</p>
</li>
<li>
<p>Enter <em>com.automacorp </em>in the <strong>Package name</strong> field.</p>
</li>
<li>
<p>If you&#8217;d like to place the project in a different folder, change its <strong>Save location</strong>.</p>
</li>
<li>
<p>Select <em>Kotlin</em> from the <strong>Language</strong> drop-down menu.</p>
</li>
<li>
<p>Select the lowest version of Android your app will support in the Minimum SDK field.
A message indicates you on how many device your app will be available.
If you want to target more devices you can select a lower API version.
If you want to use last Android features you can select higher version.
You can click on <strong>Help me choose</strong> link to select the good API version</p>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-versions.png" alt="API versions" width="700">
</div>
</div>
</li>
</ul>
</div>
</li>
<li>
<p>Click on <strong>Finish</strong> button.</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>After some processing time for code generation, the project appears in Android Studio.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio3.png" alt="Follow wizard" width="1000">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_most_important_files">Most important files</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Now take a moment to review the most important files.
<a href="https://developer.android.com/studio">Android Studio</a> is organized like <a href="https://www.jetbrains.com/idea/">IntelliJ</a>, used during labs about Spring Framework. The core of these software are common and made by <a href="https://www.jetbrains.com/">Jetbrains</a>.</p>
</div>
<div class="paragraph">
<p>First, be sure the Project window is open (select <strong>View @GT Tool Windows @GT Project</strong>) and the Android view is selected from the drop-down list at the top of that window.
This Android view let see you the main files of your Android project</p>
</div>
<div class="sect2">
<h3 id="_manifest_file">Manifest file</h3>
<div class="paragraph">
<p><strong>File :</strong> <strong><em>app @GT manifests @GT AndroidManifest.xml</em></strong></p>
</div>
<div class="paragraph">
<p>Manifest file is a kind of project id card.</p>
</div>
<div class="paragraph">
<p>The manifest file describes essential information about your app to the Android build tools, the Android operating system, and Google Play.</p>
</div>
<div class="paragraph">
<p>All activities must be defined inside and one of them will be defined as entry point for your app (with an intent filter).</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1728847001168.2969"><span class="hljs-meta">&lt;?xml version=<span class="hljs-string">&quot;1.0&quot;</span> encoding=<span class="hljs-string">&quot;utf-8&quot;</span>?&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">manifest</span> <span class="hljs-attr">xmlns:android</span>=<span class="hljs-string">&quot;http://schemas.android.com/apk/res/android&quot;</span> <span class="hljs-attr">xmlns:tools</span>=<span class="hljs-string">&quot;http://schemas.android.com/tools&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">application</span> <span class="hljs-attr">android:allowbackup</span>=<span class="hljs-string">&quot;true&quot;</span> <span class="hljs-attr">android:dataextractionrules</span>=<span class="hljs-string">&quot;@xml/data_extraction_rules&quot;</span> <span class="hljs-attr">android:fullbackupcontent</span>=<span class="hljs-string">&quot;@xml/backup_rules&quot;</span> <span class="hljs-attr">android:icon</span>=<span class="hljs-string">&quot;@mipmap/ic_launcher&quot;</span> <span class="hljs-attr">android:label</span>=<span class="hljs-string">&quot;@string/app_name&quot;</span> <span class="hljs-attr">android:roundicon</span>=<span class="hljs-string">&quot;@mipmap/ic_launcher_round&quot;</span> <span class="hljs-attr">android:supportsrtl</span>=<span class="hljs-string">&quot;true&quot;</span> <span class="hljs-attr">android:theme</span>=<span class="hljs-string">&quot;@style/Theme.Automacorp&quot;</span> <span class="hljs-attr">tools:targetapi</span>=<span class="hljs-string">&quot;31&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">activity</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">&quot;.MainActivity&quot;</span> <span class="hljs-attr">android:exported</span>=<span class="hljs-string">&quot;true&quot;</span> <span class="hljs-attr">android:label</span>=<span class="hljs-string">&quot;@string/app_name&quot;</span> <span class="hljs-attr">android:theme</span>=<span class="hljs-string">&quot;@style/Theme.Automacorp&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">intent-filter</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">action</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">&quot;android.intent.action.MAIN&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">action</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">category</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">&quot;android.intent.category.LAUNCHER&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">category</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">intent-filter</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">activity</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">application</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">manifest</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1728847001168.2969')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_activity">Activity</h3>
<div class="paragraph">
<p>You can see 3 packages <code>com.automacorp</code> in Android view.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>The first one (not suffixed) contains all your Kotlin files used to write your app and our first activity</p>
</li>
<li>
<p>The second (suffixed with androidTest) contains test files executed to test your app on a device or on an emulator.</p>
</li>
<li>
<p>The last one (suffixed with test) contains unit test files used to control your code locally at each build</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Unfortunately we don&#8217;t have enough time to see how to write these tests during our labs.</p>
</div>
<div class="paragraph">
<p>But be aware that if you want to create a sustainable application, testing is the best way to limit regressions and make it easier to manage your application over time.</p>
</div>
<div class="paragraph">
<p>You can find more information about tests <a href="https://developer.android.com/training/testinghere">here</a>.</p>
</div>
<div class="paragraph">
<p><strong>File :</strong> <strong><em>app @GT java @GT com.automacorp @GT MainActivity</em></strong></p>
</div>
<div class="sect3">
<h4 id="_the_code_to_create_an_activity">The code to create an activity</h4>
<div class="paragraph">
<p>This is the main activity and it&#8217;s the entry point for your app.</p>
</div>
<div class="paragraph">
<p>When you build and run your app, the system launches an instance of this Activity and loads its layout.</p>
</div>
<div class="paragraph">
<p>Each activity (as each components in Android) has a lifecyle and you can interact at each step (ie you can overload a method to add a behavior or some code in a lifecycle phase).</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/firstapp/android-activity-lifecycle.png" alt="Activity lifecyle">
</div>
</div>
<div class="paragraph">
<p>For example in <code>MainActivity</code>, the view is associated in the <code>onCreate</code> function. In this example the work is done in the <code>setContent</code> block. This block is used to declare which Jetpack Compose components will be used to create the view. We load a custom type (ie <code>AutomacorpTheme</code>) and a <code>Scaffold</code> component. The <code>Scaffold</code> component is a layout component that provides a material design layout structure for the screen.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1728847001168.0942"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MainActivity</span> : <span class="hljs-type">ComponentActivity</span>() {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            AutomacorpTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding -&gt;
                    Greeting(
                        name = <span class="hljs-string">&quot;Android&quot;</span>,
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001168.0942')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_jetpack_component">Jetpack component</h4>
<div class="paragraph">
<p><code>Greeting</code> is a composable function. A function composable has the <code>@Composable</code> annotation.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1728847001169.5554"><span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">Greeting</span><span class="hljs-params">(name: <span class="hljs-type">String</span>, modifier: <span class="hljs-type">Modifier</span> = Modifier)</span></span> {
    Text(text = <span class="hljs-string">&quot;Hello @dollar@name!&quot;</span>, modifier = modifier)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001169.5554')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>A few noteworthy things about this function:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>The function is annotated with the @Composable annotation. All Composable functions must have this annotation; this annotation informs the Compose compiler that this function is intended to convert data into UI.</p>
</li>
<li>
<p>The function takes in data. Composable functions can accept parameters, which allow the app logic to describe the UI. In this case, our widget accepts a String so it can greet the user by name.</p>
</li>
<li>
<p>The function displays text in the UI. It does so by calling the Text() composable function, which actually creates the text UI element. Composable functions emit UI hierarchy by calling other composable functions.</p>
</li>
<li>
<p>The function doesn&#8217;t return anything. Compose functions that emit UI do not need to return anything, because they describe the desired screen state instead of constructing UI widgets.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>This function is fast, idempotent, and free of side-effects. The function describes the UI without any side-effects, such as modifying properties or global variables.</p>
</div>
</div>
<div class="sect3">
<h4 id="_preview_the_component">Preview the component</h4>
<div class="paragraph">
<p>To test your app, you can run it on your phone or on an emulator. We will see that in the next chapter.</p>
</div>
<div class="paragraph">
<p>But you can write a simple function to be able to test a composable alone. The @Preview annotation lets you preview your composable functions within Android Studio without having to build and install the app to an Android device or emulator. The annotation must be used on a composable function that does not take in parameters.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1728847001169.3403"><span class="hljs-meta">@Preview(showBackground = true)</span>
<span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">GreetingPreview</span><span class="hljs-params">()</span></span> {
    AutomacorpTheme {
        Greeting(<span class="hljs-string">&quot;Android&quot;</span>)
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001169.3403')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can choose to display the design view at the right of your code editor with the button at the top right of the editor.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/firstapp/compoasable_preview.png" alt="Composable preview" width="800">
</div>
</div>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/firstapp/composable_view_code.png" alt="Code" width="30"></span> Code View
<span class="image"><img src="../../img/training/android/firstapp/composable_view_code_design.png" alt="Code and design" width="30"></span> Code And Design View
<span class="image"><img src="../../img/training/android/firstapp/composable_view_design.png" alt="Design" width="30"></span> Design View</p>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_resource_files">Resource files</h3>
<div class="paragraph">
<p>Resources are the additional files and static content that your code uses, such as images, screen definitions, strings used in interfaces, styles, animation instructions, and more.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-resource1.png" alt="Android resource" width="800">
</div>
</div>
<div class="paragraph">
<p>You can provide alternative resources for specific device configurations, by grouping them in specially-named resource directories.</p>
</div>
<div class="paragraph">
<p>At runtime, Android uses the appropriate resource based on the current configuration.</p>
</div>
<div class="paragraph">
<p>For example, you might want to provide a different UI layout depending on the screen size or different strings depending on user language. In this case you will have a default file <code>app/src/main/res/values/string.xml</code> and a specific file for France <code>app/src/main/res/values-fr/string.xml</code></p>
</div>
</div>
<div class="sect2">
<h3 id="_gradle_file">Gradle file</h3>
<div class="paragraph">
<p><strong>File :</strong> <strong><em>Gradle Scripts @GT build.gradle.kts</em></strong></p>
</div>
<div class="paragraph">
<p>There are two files with this name:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>one for the project, <strong>Project: automacorp</strong>, and</p>
</li>
<li>
<p>one for the app module, <strong>Module: app</strong></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Each module has its own <strong>build.gradle.kts</strong> file, but this first project currently has just one module.</p>
</div>
<div class="paragraph">
<p>If you need to use external libraries you can, and you need to declare them in <strong>build.gradle.kts (Module: app)</strong>.</p>
</div>
<div class="paragraph">
<p>You can also configure the <code>android</code> plugin (APi version, SDK version).The <code>defaultConfig</code> block is important. This is where you have to define</p>
</div>
<div class="ulist">
<ul>
<li>
<p>the min sdk used by the phone that uses your app</p>
</li>
<li>
<p>the target sdk used for the compilation. It&#8217;s important to use the highest value</p>
</li>
<li>
<p>your code version and the version name. If you need to publish your app on the Google store this number must be incremented at each release.</p>
</li>
</ul>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1728847001169.0972">android {
    namespace = <span class="hljs-string">&quot;com.automacorp&quot;</span>
    compileSdk = <span class="hljs-number">34</span>

    defaultConfig {
        applicationId = <span class="hljs-string">&quot;com.automacorp&quot;</span>
        minSdk = <span class="hljs-number">31</span>
        targetSdk = <span class="hljs-number">34</span>
        versionCode = <span class="hljs-number">1</span>
        versionName = <span class="hljs-string">&quot;1.0&quot;</span>

        testInstrumentationRunner = <span class="hljs-string">&quot;androidx.test.runner.AndroidJUnitRunner&quot;</span>
        vectorDrawables {
            useSupportLibrary = <span class="hljs-literal">true</span>
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = <span class="hljs-literal">false</span>
            proguardFiles(
                getDefaultProguardFile(<span class="hljs-string">&quot;proguard-android-optimize.txt&quot;</span>),
                <span class="hljs-string">&quot;proguard-rules.pro&quot;</span>
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = <span class="hljs-string">&quot;1.8&quot;</span>
    }
    buildFeatures {
        compose = <span class="hljs-literal">true</span>
    }
    composeOptions {
        kotlinCompilerExtensionVersion = <span class="hljs-string">&quot;1.5.1&quot;</span>
    }
    packaging {
        resources {
            excludes += <span class="hljs-string">&quot;/META-INF/{AL2.0,LGPL2.1}&quot;</span>
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001169.0972')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_launch_your_application"><span class="icon">[flask&#93;</span> : Launch your application</h2>
<div class="sectionbody">
<div class="paragraph">
<p>In this part you will be able to launch your application on you phone or tablet. If you don&#8217;t have a device on Android operating system, you can use the emulator embedded in Android Studio.</p>
</div>
<div class="sect2">
<h3 id="_configure_a_real_android_device">Configure a real Android device</h3>
<div class="paragraph">
<p>You need to set up your phone</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Connect your device to your development machine with a USB cable. If you developed on Windows, you might need to install <a href="https://developer.android.com/studio/run/oem-usb">USB driver</a> for your device.</p>
</li>
<li>
<p>You need to update your device to activate "Developer options"</p>
<div class="ulist">
<ul>
<li>
<p>Open the <strong>Settings app</strong> on your device</p>
</li>
<li>
<p>Select item <strong>About phone</strong>.</p>
</li>
<li>
<p>Go to the bottom to <strong>Build number</strong> item</p>
</li>
<li>
<p>Tap on this <strong>Build number</strong> seven times. You should see a message which says that you are now a developer.</p>
</li>
<li>
<p>If you go back on <strong>Settings app</strong> and in <strong>System</strong> section you should see a new entry <strong>Developer options</strong></p>
</li>
<li>
<p>Tap on <strong>Developer options</strong> and scroll down to find and <strong>enable USB debugging</strong>.</p>
</li>
</ul>
</div>
</li>
</ol>
</div>
<div class="paragraph">
<p>Since few versions of Android, you can also pair your phone via your Wifi connection. Your laptop and your phone must use the same Wifi.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>On Android Studio, open the running devices window (with the button on the right of the UI).</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/firstapp/android_pair_wifi1.png" alt="Pair devices using Wifi" width="800">
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>Select in the toolbar the button <strong>Pair devices using Wifi</strong> <span class="image"><img src="../../img/training/android/firstapp/android_pair_wifi_button.png" alt="Pair devices using Wifi" width="30"></span></p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/firstapp/android_pair_wifi3.png" alt="Pair devices using Wifi" width="500">
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>On your phone, in <strong>Developer options</strong>,  select <strong>Wireless debugging</strong> and <strong>Pair using QR code</strong> and scan the QR code. If everything is OK you should see. <strong>To work you should set the same Wifi on your laptop and on your mobile</strong>.</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/firstapp/adb_wifi-wireless_debugging.png" alt="Pair devices using Wifi" width="300">
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>When you are connected you should see your device in the running devices window</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/firstapp/android_pair_wifi2.png" alt="Pair devices using Wifi" width="500">
</div>
</div>
<div class="paragraph">
<p>Now you are ready to run your app</p>
</div>
</div>
<div class="sect2">
<h3 id="_configure_a_virtual_device">Configure a virtual device</h3>
<div class="paragraph">
<p>When you install Android Studio the first time, an AVD (Android Virtual Device) is also installed to simulate a phone. A virtual device is a configuration that defines the characteristics of an Android phone, tablet, Wear OS, Android TV, or Automotive OS device. It&#8217;s very useful to test an app for every kind of device.</p>
</div>
<div class="paragraph">
<p>You can add, update or delete your virtual devices on the AVD. Open menu  <strong>Select Tools @GT Device Manager.</strong>. You can also access this window through a side tab.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/firstapp/android_pair_wifi1.png" alt="Pair devices using Wifi" width="800">
</div>
</div>
<div class="paragraph">
<p>If you click on the + button, at the top of the AVD Manager dialog you will be able to create a device. You can choose device type (TV, phone, auto&#8230;&#8203;), its configuration (OS version, density, size&#8230;&#8203;)
The Select Hardware page appears.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/firstapp/android_device_manager2.png" alt="Create virtual device manager" width="700">
</div>
</div>
<div class="paragraph">
<p>For more informations you can read <a href="https://developer.android.com/studio/run/managing-avds#createavd">this article</a></p>
</div>
</div>
<div class="sect2">
<h3 id="_run_your_app">Run your app</h3>
<div class="paragraph">
<p>Everything is now ready to test your project.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>In toolbar, select your app from the run/debug configurations drop-down menu.</p>
</li>
<li>
<p>From the target device drop-down menu, select the AVD or the device, that you want to run your app on.</p>
</li>
<li>
<p>Click on Run button</p>
</li>
</ol>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/firstapp/android-run.png" alt="Run application" width="500">
</div>
</div>
<div class="paragraph">
<p>If everything is OK you should see your first app. It is very simple and not very pretty but we do better in the next chapter</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android_emulator.png" alt="Hello world application" width="400">
</div>
</div>
<div class="paragraph">
<p>To analyze errors you can open the Logcat view to see logs send by your device or the emulated device</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/firstapp/android_error.png" alt="Logcat view">
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_resources">Resources</h2>
<div class="sectionbody">
<div class="paragraph">
<p>About Android you can read</p>
</div>
<div class="ulist">
<ul>
<li>
<p><a href="https://developer.android.com/">Android developer website</a> : you will find all resources about Android.</p>
</li>
<li>
<p><a href="https://developer.android.com/courses/kotlin-android-fundamentals/toc">Codelabs</a> : you can find more detailed examples in these codelabs created by Google training team</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>You can find resources on Kotlin</p>
</div>
<div class="ulist">
<ul>
<li>
<p><a href="https://dev-mind.fr/blog/2019/kotlin_et_android.html">Kotlin and android</a> : my blog post is in French but it explains why Google prefers today Kotlin to Java</p>
</li>
<li>
<p><a href="https://play.kotlinlang.org/byExample/overview">Learn Kotlin by examples</a> : you can read documentation and test your code online</p>
</li>
<li>
<p><a href="https://kotlinlang.org/">Official website</a> documentation about this language</p>
</li>
<li>
<p><a href="https://developer.android.com/kotlin">Google developpers site for kotlin</a>: several resources on how use Kotlin to create an Android application</p>
</li>
</ul>
</div>
</div>
</div>`;