export const _android_introduction:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_android_ecosystem">Android ecosystem</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_android_the_most_used_os">Android the most used OS</a></li>
<li><a class="link" fragment="#_principle_of_mobile_programming">Principle of mobile programming</a></li>
</ul>
</li>
<li><a class="link" fragment="#_android_platform">Android platform</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_linux_kernel">Linux kernel</a></li>
<li><a class="link" fragment="#_hardware_abstraction_layer_hal">Hardware abstraction layer (HAL)</a></li>
<li><a class="link" fragment="#_kotlin_language">Kotlin Language</a></li>
<li><a class="link" fragment="#_development_tool_and_ide">Development tool and IDE</a></li>
<li><a class="link" fragment="#_security">Security</a></li>
</ul>
</li>
<li><a class="link" fragment="#_fragmentation">Fragmentation</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_fragmentation_on_the_os_versions">Fragmentation on the OS versions</a></li>
<li><a class="link" fragment="#_screen_level_fragmentation">Screen-level fragmentation</a></li>
<li><a class="link" fragment="#_fragmentation_at_the_hardware_level">Fragmentation at the hardware level</a></li>
</ul>
</li>
<li><a class="link" fragment="#_conclusion">Conclusion</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>To understand the specifics of Android development it is important to understand how the platform was built</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/intro/android-intro.png" alt="Android course step1" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_android_ecosystem">Android ecosystem</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_android_the_most_used_os">Android the most used OS</h3>
<div class="paragraph">
<p>There are two major players in the mobile world: Apple (iOS) and Google (Android).</p>
</div>
<div class="paragraph">
<p>Android is today the most used mobile OS in the world.</p>
</div>
<div class="paragraph">
<p>Nearly <a href="https://gs.statcounter.com/os-market-share">70% of users</a> in Western countries use this platform. In Africa or Asia, Apple&#8217;s pricing policy means that Android market shares are even stronger and continue to climb.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/intro/android_vs_ios.png" alt="Android usage" width="800">
</div>
</div>
<div class="paragraph">
<p>Doing mobile programming still has an interest. Access to IT (web or other) is increasingly done with <a href="https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet">mobiles and tablets</a>.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/intro/desktop_vs_mobile.png" alt="Android in mobile market" width="800">
</div>
</div>
<div class="paragraph">
<p>Android has become the <a href="https://gs.statcounter.com/os-market-share">most used OS</a> worldwide for all systems combined.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/intro/os_market.png" alt="Android vs other OS" width="800">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_principle_of_mobile_programming">Principle of mobile programming</h3>
<div class="paragraph">
<p>Mobility has transformed the devices we used. When you are on a desktop PC or a laptop you always have approximately the same components: CPU, graphics card, hard drive, photo card reader, input/output ports.</p>
</div>
<div class="paragraph">
<p>On a mobile you will have more components to help you in this context of mobility: GPS, camera, accelometer, pedometer&#8230;&#8203; We have more and more sensors to interpret the context of use of the device</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/intro/sensors.png" alt="Android sensors" width="800">
</div>
</div>
<div class="paragraph">
<p>The price of a device depends on the number and quality of all these sensors. Today Android is present everywhere</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/intro/everywhere.png" alt="Android everywhere" width="800">
</div>
</div>
<div class="paragraph">
<p>And you have different versions of Android. One for each platform</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/intro/platform.png" alt="Android vs other OS" width="1000">
</div>
</div>
<div class="sect3">
<h4 id="_when_use_native_programming">When use native programming</h4>
<div class="paragraph">
<p>The specificity of mobile programming is to offer applications that recover and aggregate the data emitted by the different sensors to meet a user need. When you want to interface with these sensors, bring responsiveness to your applications, native development is the solution.</p>
</div>
</div>
<div class="sect3">
<h4 id="_when_use_web_programming">When use web programming</h4>
<div class="paragraph">
<p>Creating a mobile app to display static content doesn&#8217;t make sense. For this need, we will prefer responsive web applications (PWA) which are much more optimal and less expensive. A native application must be dynamic and take advantage of the APIs and sensors exposed by the devices. And today web APIs offer solutions for interacting with a device&#8217;s sensors.</p>
</div>
</div>
<div class="sect3">
<h4 id="_combine_the_two_worlds">Combine the two worlds</h4>
<div class="paragraph">
<p>Today there are solutions to develop once and deploy either on the web or native code on Android or Ios. <a href="https://flutter.dev/">Flutter</a>, for example, is widely used today. In the Android world Google is working with Jetbrains on <a href="https://developer.android.com/jetpack/compose">Jetpack compose</a> which will allow the same thing via a Kotlin API.</p>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_android_platform">Android platform</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Here is a simplified image of the Android platform</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/intro/platform2.png" alt="Android vs other OS" width="800">
</div>
</div>
<div class="sect2">
<h3 id="_linux_kernel">Linux kernel</h3>
<div class="paragraph">
<p>Android was built on a <a href="https://www.kernel.org/">Linux kernel</a>. But Android is not completely Open Source. Only a little <a href="https://source.android.com/">part</a> is free of rights.</p>
</div>
<div class="paragraph">
<p>Android draws on the strengths of Linux to provide a stable and reliable OS: memory management, process management, security, etc.</p>
</div>
<div class="paragraph">
<p>And thanks to Android, Linux is the most used OS in the world :-)</p>
</div>
</div>
<div class="sect2">
<h3 id="_hardware_abstraction_layer_hal">Hardware abstraction layer (HAL)</h3>
<div class="paragraph">
<p>Android offers a virtual machine to execute bytecode. This is not a classic JVM. Google engineers tried to work on bytecode with a smaller memory footprint.</p>
</div>
<div class="paragraph">
<p>In Android the compiler will create <code>.dex</code> files (Dalvik executable). Dalvik was the first compiler used on the platform. Like current JVMs, Dalvik transformed bytecode into machine language at runtime: Just In Time (JIT) compilation.</p>
</div>
<div class="paragraph">
<p>Today this virtual machine has been replaced by ART (Android Runtime). The transformation into machine language is done when the application is installed: AOT (ahead of time) compilation. As the bytecode is compiled into machine language earlier, applications launch faster and the CPU is less required during execution (and therefore preserves your battery).</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/blog/2019/android_pf_02.png" alt="Android compilation" width="1000">
</div>
</div>
<div class="paragraph">
<p>I deliberately misused language by indicating that the bytecode was transformed into machine language. This is not really the case. If we really had machine language we would no longer need a VM.</p>
</div>
<div class="paragraph">
<p>In fact during installation the bytecode is transformed into an intermediate format: .oat files (ahead of time). The VM is necessary because it will manage memory allocations and freeing up space with the Garbage collector. Even if compilation is no longer Just In Time, optimizations are still made at runtime so that the code executes as quickly as possible.</p>
</div>
<div class="paragraph">
<p>You can find more information in the <a href="https://source.android.com/docs/core/runtime">documentation</a>.</p>
</div>
</div>
<div class="sect2">
<h3 id="_kotlin_language">Kotlin Language</h3>
<div class="paragraph">
<p>In 2017 a big announcement was made at Google IO. The Kotlin language became the second reference language for developing applications. 2 years later 50% of developers use Kotlin and Google announced at Google I/O 2019 that the platform was becoming Kotlin-first. They recommend starting new developments in Kotlin.</p>
</div>
<div class="paragraph">
<p>Developing today on Android with the Java language is very painful, because you have a lot of tedious code to write.</p>
</div>
</div>
<div class="sect2">
<h3 id="_development_tool_and_ide">Development tool and IDE</h3>
<div class="paragraph">
<p>Initially the recommended development studio was Eclipse but the more features were enriched, the longer the IDE took and became unusable. Google therefore worked in partnership with JetBrains (publisher of Webstorm, IntelliJ, Kotlin) to adapt their Open Source version and create Android Studio .</p>
</div>
<div class="paragraph">
<p>You will find inside this IDE all the functionalities necessary for development. You have utilities for</p>
</div>
<div class="ulist">
<ul>
<li>
<p>check your code</p>
</li>
<li>
<p>manage different versions of the Android SDK</p>
</li>
<li>
<p>launch a virtual device on your machine to manually or automatically test your code</p>
</li>
<li>
<p>monitor and debug your application</p>
</li>
<li>
<p>package your application in order to publish it on the Google store</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_security">Security</h3>
<div class="paragraph">
<p>As Android is based on a Linux kernel, the platform benefits from security implemented at the kernel level.</p>
</div>
<div class="paragraph">
<p>When an application is installed, Android assigns it an user ID. Each application is launched in a separate process and uses its own ART virtual machine. Execution rights are specific to this application user. The application has no idea of ​​this ID. So an application cannot access the data of another application because everything is closed by this device. The same goes for native apps.</p>
</div>
<div class="paragraph">
<p>Each application is therefore isolated from the others and has its own CPU, memory, etc. resources.</p>
</div>
<div class="paragraph">
<p>On top of this "low level" security, Android has added a more "high level" level of security over time. Each external action that can be requested by your application must be declared in a manifest file. For example</p>
</div>
<div class="ulist">
<ul>
<li>
<p>read contacts,</p>
</li>
<li>
<p>to take a picture,</p>
</li>
<li>
<p>access the Internet</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>A user can choose to leave the requested rights to the installation, but he can also choose to remove certain rights. Personally I limit the number of applications that can connect to the network, can use my contacts, my files, etc.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_fragmentation">Fragmentation</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Fragmentation is a real problem on the platform and as a developer you will have to make choices based on your target user.</p>
</div>
<div class="paragraph">
<p>Android is an OS that can be used by any phone manufacturer. As I said above, the cost of adapting a version to a device is not negligible. This is why manufacturers limit these updates. Their interest is to sell new devices and not to maintain them.</p>
</div>
<div class="paragraph">
<p>Fragmentation is not only linked to OS versions but we also have fragmentation linked to devices and their components. Depending on the price range, each device may have different technical characteristics.</p>
</div>
<div class="sect2">
<h3 id="_fragmentation_on_the_os_versions">Fragmentation on the OS versions</h3>
<div class="paragraph">
<p>For several years, Google has released a new version of Android per year. Typically developers can start testing and providing feedback in the second and third quarters and the release is made available in the last quarter of a calendar year.</p>
</div>
<div class="paragraph">
<p>Each new version is associated with a letter (which increments with each version) and a dessert (chosen by the Android team). The dessert is often a french dessert. Since the beginning, the Android team has included several French people.</p>
</div>
<div class="paragraph">
<p>When you start a new development you must make a version choice. In fact you have to make two choices</p>
</div>
<div class="ulist">
<ul>
<li>
<p>define a target version: generally you should always choose the latest version of the OS</p>
</li>
<li>
<p>define a minimum version: you define the minimum version of the OS supported. The compiler is able to alert you when you try to use an API that is not supported</p>
</li>
</ul>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/intro/versions.png" alt="Android versions" width="800">
</div>
</div>
<div class="paragraph">
<p>Version usage statistics are published regularly on <a href="https://developer.android.com/about/dashboards">this dashboard</a>, which compiles the data reported by Google Store (the official source of Android applications).</p>
</div>
<div class="paragraph">
<p>In the web world, you can use polyfills to use the latest features of the language in browsers that do not yet implement these features. In the Android world, Google also suggests using specific objects that manage this backward compatibility. The base class for developing a screen is <code>android.app.Activity</code>, but in practice we will always use <code>androidx.appcompat.app.AppCompatActivity</code>, which was developed to port the latest news to old Android releases. This is the same thing for all main objects.</p>
</div>
</div>
<div class="sect2">
<h3 id="_screen_level_fragmentation">Screen-level fragmentation</h3>
<div class="paragraph">
<p>After versions, the biggest difference between devices concerns screen quality and size.</p>
</div>
<div class="paragraph">
<p>As a reminder</p>
</div>
<div class="ulist">
<ul>
<li>
<p>The <strong>resolution</strong> of a screen represents the number of horizontal pixels multiplied by the number of vertical pixels. For example (800 x 600)</p>
</li>
<li>
<p>the <strong>size</strong> of a screen is the number of inches of the diagonal of the screen</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Android offers a classification linked to the width of a screen.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/blog/2019/android_fg_03.png" alt="Android vs other OS" width="1000">
</div>
</div>
<div class="paragraph">
<p>As in the web world, you must adapt your UI either by using components and resizable layouts, or by using different layouts depending on the size (in Android you can use fragments)</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/blog/2019/android_fg_04.png" alt="Android vs other OS" width="1000">
</div>
</div>
<div class="paragraph">
<p><strong>Pixel density</strong> is the number of dots per inch (dot per inch ⇒ dpi). Density is important on a device. For example, if you display an image expressed in pixels on 2 screens of different density, you will not have the same rendering.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/blog/2019/android_fg_05.png" alt="Pixel density" width="700">
</div>
</div>
<div class="paragraph">
<p>If we display the same images expressed with the <strong>dp</strong> unit (density-independent pixels) you will have the following result</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/blog/2019/android_fg_06.png" alt="dp unit" width="700">
</div>
</div>
<div class="paragraph">
<p>The rule is to <strong>never express sizes in px in an application but always in dp</strong> (in the web world we will use the em unit). To express the size of the fonts, you will instead use the unit sp (scalable pixels) which has the advantage of increasing depending on the user accessibility settings.</p>
</div>
<div class="paragraph">
<p>You will be able to create different resources depending on the size. When you have a nice screen with good resolution and high density, you will expect quality images. These same images have no interest on screens that are not capable of displaying them.</p>
</div>
</div>
<div class="sect2">
<h3 id="_fragmentation_at_the_hardware_level">Fragmentation at the hardware level</h3>
<div class="paragraph">
<p>We have focused on the 2 biggest differences between devices but we could go further because you also have a big difference in quality and performance in terms of the basic components of a mobile or tablet. You do not have the same components in entry-level devices and more luxurious ones</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/blog/2019/android_fg_07.png" alt="Hardware Fragmentation" width="1000">
</div>
</div>
<div class="paragraph">
<p>To provide a good user experience, you can apply a few simple rules</p>
</div>
<div class="paragraph">
<p>As your users can and most have limited resources try to</p>
</div>
<div class="ulist">
<ul>
<li>
<p>limit network calls which consume a lot of resources and therefore use up the battery,</p>
</li>
<li>
<p>ensure that you have a deliverable of a reasonable size. If you integrate a lot of images make several archives with different targets depending on the quality of the devices</p>
</li>
<li>
<p>avoid storing too much data on your users' phone (either on disk or in the shared database). If you must store items, plan to purge unnecessary items</p>
</li>
<li>
<p>favor dark UIs which preserve the battery</p>
</li>
<li>
<p>apply the KISS principle (keep it simple, stupid)</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>We have just seen how the platform was built and the problems related to fragmentation. In the next course we will get down to business and look at how to develop a first Android application.</p>
</div>
<div class="paragraph">
<p>If you are interested in the platform, I advise you to follow a few enthusiasts (Googlers or not): Chet Haase, Jake Wharton, Romain Guy, Cyril Mottier</p>
</div>
<div class="paragraph">
<p>If you want more information you can consult <a href="https://developer.android.com" class="bare">https://developer.android.com</a> and if you are a fan of podcasts in French I advise you to follow <a href="http://androidleakspodcast.com/" class="bare">http://androidleakspodcast.com/</a></p>
</div>
</div>
</div>`;