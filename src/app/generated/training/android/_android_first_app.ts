export const _android_first_app:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_android_studio">Android studio</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_installation">Installation</a></li>
<li><a class="link" fragment="#_update">Update</a></li>
</ul>
</li>
<li><a class="link" fragment="#_fundamental_concepts">Fundamental concepts</a></li>
<li><a class="link" fragment="#_flask_a_first_example"><span class="icon">[flask&#93;</span> : A first example</a></li>
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
<p>We have a limited number of lesson hours.
We will therefore quickly go over some concepts.
If you want to go deeper, you will find more informations in <a href="android-first-app.html#_resources">resource chapter</a></p>
</div>
<div class="paragraph">
<p>The aim is to be able to develop a simple application to call a REST API developed in Java (Spring) to display building rooms and manage windows in these rooms. It is necessary to ventilate as much as possible rooms, but as winter approaches it will become important to heat the buildings to ensure user comfort .Windows should be open during and after classes, closed at night or in case of heavy rain or severe cold.</p>
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
<pre class="highlight"><code class="language-shell" id="1722609004547.9324">cd ~/appli/android-studio/bin
sh ./studio.sh</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004547.9324')">Copy</button></pre>
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
<div class="paragraph">
<p>If you want to cutomize the display and use the new UI you can</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>click on the customize section on the left</p>
</li>
<li>
<p>click on the link "All settings&#8230;&#8203;"</p>
</li>
</ol>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio2.png" alt="Follow wizard" width="700">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_update">Update</h3>
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
<p>Below on my example, I have 2 versions installed : Android 13.0 Tiramisu. Here I can choose the last version of the API</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio-update2.png" alt="Choose SDK versions" width="800">
</div>
</div>
<div class="paragraph">
<p>When you develop in Android you should always do it on the last SDK version.
Google requires you to always target this latest version when you publish apps to the official store. In our case we have to target the Tiramisu version (API level 34)</p>
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
<p>Note that there is also another important concept in Android development with the <a href="https://developer.android.com/guide/fragments?hl=en">fragements</a>. A Fragment represents a reusable portion of your app&#8217;s UI. A fragment defines and manages its own layout, has its own lifecycle, and can handle its own input events. Fragments can&#8217;t live on their own. They must be hosted by an activity.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_a_first_example"><span class="icon">[flask&#93;</span> : A first example</h2>
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
In the <strong>Select a Project Template window</strong>, select <strong>Empty Views Activity</strong> and click Next.</p>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio-select-type.png" alt="Select project type" width="700">
</div>
</div>
</li>
<li>
<p>In the <code>Configure your project</code> window, complete the following:</p>
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
<p>After some processing time for code generation, the Android Studio main window appears.</p>
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
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-view.png" alt="Android view to select file" width="300">
</div>
</div>
<div class="paragraph">
<p>You can then see the following files:</p>
</div>
<div class="sect2">
<h3 id="_manifest_file">Manifest file</h3>
<div class="paragraph">
<p><strong>File :</strong> <strong><em>app @GT manifests @GT AndroidManifest.xml</em></strong></p>
</div>
<div class="paragraph">
<p>Manifest file is a kind of id card for your project.</p>
</div>
<div class="paragraph">
<p>The manifest file describes essential information about your app to the Android build tools, the Android operating system, and Google Play.</p>
</div>
<div class="paragraph">
<p>All activities must be defined inside and one of them will be defined as entry point for your app (with an intent filter).</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722609004548.0876"> <span class="hljs-tag">&lt;<span class="hljs-name">activity</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">&quot;.MainActivity&quot;</span> <span class="hljs-attr">android:exported</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">intent-filter</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">action</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">&quot;android.intent.action.MAIN&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">action</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">category</span> <span class="hljs-attr">android:name</span>=<span class="hljs-string">&quot;android.intent.category.LAUNCHER&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">category</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">intent-filter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">activity</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722609004548.0876')">Copy</button></pre>
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
<p>For example in <code>MainActivity</code>, we declare the XML resource file where your view content is defined (<code>R.layout.activity_main</code>)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1722609004549.6218"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MainActivity</span> : <span class="hljs-type">AppCompatActivity</span>() {
     <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
          <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
          setContentView(R.layout.activity_main)
     }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004549.6218')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>NOTE : directory is named java to assure compatibility with old projects or libs written in Java but don&#8217;t be afraid we will use Kotlin :-)</p>
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
<div class="paragraph">
<p><strong>File :</strong> <strong><em>app @GT res @GT layout @GT activity_main.xml</em></strong></p>
</div>
<div class="paragraph">
<p>This XML file defines the layout for the activity&#8217;s user interface (UI).</p>
</div>
<div class="paragraph">
<p>Defining the content of a view is like placing widgets (View) in layouts (ViewGroup)</p>
</div>
<div class="paragraph">
<p>In the following example, we use a constraint layout. It contains a TextView element with the text "Hello, World!"</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml" id="1722609004551.8728"><span class="hljs-meta">&lt;?xml version=<span class="hljs-string">&quot;1.0&quot;</span> encoding=<span class="hljs-string">&quot;utf-8&quot;</span>?&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">androidx.constraintlayout.widget.ConstraintLayout</span> <span class="hljs-attr">xmlns:android</span>=<span class="hljs-string">&quot;http://schemas.android.com/apk/res/android&quot;</span> <span class="hljs-attr">xmlns:app</span>=<span class="hljs-string">&quot;http://schemas.android.com/apk/res-auto&quot;</span> <span class="hljs-attr">xmlns:tools</span>=<span class="hljs-string">&quot;http://schemas.android.com/tools&quot;</span> <span class="hljs-attr">android:layout_width</span>=<span class="hljs-string">&quot;match_parent&quot;</span> <span class="hljs-attr">android:layout_height</span>=<span class="hljs-string">&quot;match_parent&quot;</span> <span class="hljs-attr">tools:context</span>=<span class="hljs-string">&quot;.MainActivity&quot;</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">TextView</span> <span class="hljs-attr">android:layout_width</span>=<span class="hljs-string">&quot;wrap_content&quot;</span> <span class="hljs-attr">android:layout_height</span>=<span class="hljs-string">&quot;wrap_content&quot;</span> <span class="hljs-attr">android:text</span>=<span class="hljs-string">&quot;Hello World!&quot;</span> <span class="hljs-attr">app:layout_constraintbottom_tobottomof</span>=<span class="hljs-string">&quot;parent&quot;</span> <span class="hljs-attr">app:layout_constraintleft_toleftof</span>=<span class="hljs-string">&quot;parent&quot;</span> <span class="hljs-attr">app:layout_constraintright_torightof</span>=<span class="hljs-string">&quot;parent&quot;</span> <span class="hljs-attr">app:layout_constrainttop_totopof</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">TextView</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">androidx.constraintlayout.widget.ConstraintLayout</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722609004551.8728')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>We will see later how to update or create a new layout and include inside widgets</p>
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
<pre class="highlight"><code class="language-kotlin" id="1722609004553.634">android {
   namespace = <span class="hljs-string">&quot;com.automacorp&quot;</span>
    compileSdk = <span class="hljs-number">34</span>

    defaultConfig {
        applicationId = <span class="hljs-string">&quot;com.automacorp&quot;</span>
        minSdk = <span class="hljs-number">29</span>
        targetSdk = <span class="hljs-number">34</span>
        versionCode = <span class="hljs-number">1</span>
        versionName = <span class="hljs-string">&quot;1.0&quot;</span>

        testInstrumentationRunner = <span class="hljs-string">&quot;androidx.test.runner.AndroidJUnitRunner&quot;</span>
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
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = <span class="hljs-string">&#x27;1.8&#x27;</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609004553.634')">Copy</button></pre>
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
<p>On your laptop go in Android Studio running devices select and choose <strong>Pair devices using Wifi</strong></p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android_pair_wifi1.png" alt="Pair devices using Wifi" width="400">
</div>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android_pair_wifi3.png" alt="Pair devices using Wifi" width="500">
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>On your phone, in <strong>Developer options</strong>,  select <strong>Wireless debugging</strong> and <strong>Pair using QR code</strong> and scan the QR code. If everything is OK you should see</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android_pair_wifi2.png" alt="Pair devices using Wifi" width="500">
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
<img src="../../img/training/android/android_device_manager.png" alt="Android virtual device manager" width="800">
</div>
</div>
<div class="paragraph">
<p>If you click on <strong>Create Virtual Device</strong>, at the bottom of the AVD Manager dialog you will be able to create a device. You can choose device type (TV, phone, auto&#8230;&#8203;), its configuration (OS version, density, size&#8230;&#8203;)
The Select Hardware page appears.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android_device_manager2.png" alt="Create virtual device manager" width="700">
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
<img src="../../img/training/android/android-run.png" alt="Run application" width="500">
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
<p>To analyze errors you can open the run console on the bottom. This window contains messages send when app is launched with Gradle</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-error1.png" alt="Run view">
</div>
</div>
<div class="paragraph">
<p>You also can open Logcat view to see logs send by your device or the emulated device</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-error2.png" alt="Logcat view">
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