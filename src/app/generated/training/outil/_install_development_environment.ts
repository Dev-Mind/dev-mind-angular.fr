export const _install_development_environment:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_java_installation">Java installation</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_history">History</a></li>
<li><a class="link" fragment="#_which_version">Which version ?</a></li>
<li><a class="link" fragment="#_jdk_21_installation">JDK 21 Installation</a></li>
</ul>
</li>
<li><a class="link" fragment="#_ide_installation">IDE installation</a></li>
<li><a class="link" fragment="#_android_studio">Android studio</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_installation">Installation</a></li>
<li><a class="link" fragment="#_update">Update</a></li>
</ul>
</li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>We want to develop our own applications but how to be effective when we work ? What should I do to start? What software do I need to install? A good craftsman has good tools. It&#8217;s the same for a software developer..</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/environnement.png" alt="Environnement de travail" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_java_installation">Java installation</h2>
<div class="sectionbody">
<div class="paragraph">
<p>When you are a simple user, you can install a Java Runtime Environment (JRE). With this package you can run a Java application.</p>
</div>
<div class="paragraph">
<p>But to develop app, we need more tools to compile source code, monitor app execution&#8230;&#8203; In this case we will use a <strong>Java Development Kit</strong> (JDK)</p>
</div>
<div class="sect2">
<h3 id="_history">History</h3>
<div class="paragraph">
<p>Java was created by James Gosling in 1995 in a company called Sun Microsystems. Sun was acquired by Oracle in 2010. Oracle defines the specification, and you can have several JDK editors which implements their JDK.</p>
</div>
<div class="paragraph">
<p><a href="https://openjdk.org/">OpenJDK</a> (Open Java Development Kit) is a free and open-source implementation of the Java Platform, Standard Edition.</p>
</div>
</div>
<div class="sect2">
<h3 id="_which_version">Which version ?</h3>
<div class="paragraph">
<p>Java is released every 6 months, but only a few versions are defined as <a href="https://en.wikipedia.org/wiki/Long-term_support">LTS (long term support)</a>.</p>
</div>
<div class="paragraph">
<p>As of September 2024, Java 23 is the last version, but we will use a Long Term Support (LTS) version. For the moment this version is Java 21.</p>
</div>
<div class="paragraph">
<p>Please use the <strong>Java 21 (LTS) version</strong>.</p>
</div>
</div>
<div class="sect2">
<h3 id="_jdk_21_installation">JDK 21 Installation</h3>
<div class="paragraph">
<p>Different companies provide a JDK version (Oracle, OpenJDK, Amazon, Microsoft&#8230;&#8203;).</p>
</div>
<div class="sect3">
<h4 id="_package_manager">Package manager</h4>
<div class="paragraph">
<p>Today it is recommended to use a package manager, a tool for managing parallel versions of multiple Software Development Kits on most Unix-based systems. We will use <a href="https://sdkman.io/">SdkMan</a>.</p>
</div>
<div class="paragraph">
<p>If you are running Linux (Fedora, CentOS) you can run</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731613729177.692">~@dollar@ curl -s &quot;https://get.sdkman.io&quot; | bash
~@dollar@ source &quot;@dollar@HOME/.sdkman/bin/sdkman-init.sh&quot;</code><button class="btn-copy-code" onclick="copyToClipboard('1731613729177.692')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Check the good installation with this command</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731613729178.9138">~@dollar@ sdk version

SDKMAN!
script: 5.18.2
native: 0.4.2</code><button class="btn-copy-code" onclick="copyToClipboard('1731613729178.9138')">Copy</button></pre>
</div>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>SDKMAN requires a bash environment to run. On Windows, it can&#8217;t be natively installed; you need WSL or MSYS+MinGW. Cygwin is no longer supported.</p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>For Windows, there are two installation routes:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>WSL Approach: Install Windows Subsystem for Linux (WSL) before attempting SDKMAN installation. A basic toolset (bash, zip, unzip, curl) is necessary. Most times, it works out of the box.</p>
</li>
<li>
<p>Git Bash Solution: If you use Git Bash for Windows, you&#8217;ll need to supplement it with MinGW to have the required toolset for SDKMAN. There are some issues with this approach, but it works for the most part.</p>
</li>
</ul>
</div>
</div>
<div class="sect3">
<h4 id="_java_installation_2">Java installation</h4>
<div class="paragraph">
<p>If you are not able to install <a href="https://sdkman.io/">SdkMan</a> you can find a Java version on <a href="https://jdk.java.net/archive/" class="bare">https://jdk.java.net/archive/</a></p>
</div>
<div class="paragraph">
<p>If <a href="https://sdkman.io/">SdkMan</a> is available you can list all the Java version available with this command</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731613729178.0015">~@dollar@ sdk list java</code><button class="btn-copy-code" onclick="copyToClipboard('1731613729178.0015')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>To install a Java version you can run</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731613729178.173">~@dollar@ sdk install java 21.0.4-oracle</code><button class="btn-copy-code" onclick="copyToClipboard('1731613729178.173')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can install different version of Java and you can change the default version with this command</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731613729178.1917">~@dollar@ sdk default java 21.0.4-oracle</code><button class="btn-copy-code" onclick="copyToClipboard('1731613729178.1917')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Check that Java is installed.</p>
</div>
<div class="paragraph">
<p>For that open a terminal</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731613729179.2336">~@dollar@  java -version
java version &quot;21.0.4&quot; 2024-07-16 LTS
Java(TM) SE Runtime Environment (build 21.0.4+8-LTS-274)
Java HotSpot(TM) 64-Bit Server VM (build 21.0.4+8-LTS-274, mixed mode, sharing)</code><button class="btn-copy-code" onclick="copyToClipboard('1731613729179.2336')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_ide_installation">IDE installation</h2>
<div class="sectionbody">
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>An integrated development environment (IDE) is a set of tools that can increase the productivity of software developers.
It includes a text editor for programming, functions that allow to start the compiler, run tests, run executables, debug online &#8230;&#8203; There are several IDE on the market.</p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>When you develop in Java, you have several alternatives: <a href="http://www.eclipse.org/downloads/">Eclipse</a>, <a href="https://netbeans.org/">NetBeans</a>, <a href="https://www.jetbrains.com/idea">IntelliJ Idea</a>, <a href="https://code.visualstudio.com/">VS code</a>.</p>
</div>
<div class="paragraph">
<p>After 20 years of development, I used a lot IDE.
IntelliJ Idea is for me the best one to develop in Java, but the Premium version is not free.
But <strong>you can use the community version freely.</strong></p>
</div>
<div class="paragraph">
<p><strong>To simplify mutual aid we will all use the same IDE, IntelliJ Idea Community version. <a href="https://jetbrains.com/idea/download">Download</a> the last version.</strong>
You can also try to obtain a free licence on this <a href="https://jetbrains.com/community/education/#students">link</a> for the premium version.</p>
</div>
<div class="paragraph">
<p>Launch your IDE to check that everything works</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/outil/idea_welcome.jpg" alt="IntelliJ" width="800">
</div>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/outil/idea.svg" alt="IntelliJ">
</div>
<div class="title">Figure 1. logo IntelliJ</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_android_studio">Android studio</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Android studio is the tool we use to write Android code. If you don&#8217;t follow my courses about Android, you don&#8217;t need to install this tool</p>
</div>
<div class="paragraph">
<p>You need to install it on your computer (installation requires 900MB) on <a href="https://developer.android.com/studio" class="bare">https://developer.android.com/studio</a>.</p>
</div>
<div class="sect2">
<h3 id="_installation">Installation</h3>
<div class="paragraph">
<p>For a Linux installation you have to go in the installation directory (for me ~/appli) with a terminal and launch script <code>launch.sh</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731613729179.8638">cd ~/appli/android-studio/bin
sh ./studio.sh</code><button class="btn-copy-code" onclick="copyToClipboard('1731613729179.8638')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Follow the wizard and choose a standard installation.</p>
</div>
<div class="paragraph">
<p>It&#8217;s important to do that to download the last version of Android SDK, recent images for Emulator&#8230;&#8203;</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio.png" alt="Follow wizard" width="800">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_update">Update</h3>
<div class="paragraph">
<p>If you have an existing version of Android Studio on your laptop you should update Android Sdk.
For that go on menu <strong>Tools @GT SDK manager</strong></p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio-update1.png" alt="Menu SDK manager" width="800">
</div>
</div>
<div class="paragraph">
<p>Below on my example, I have 2 versions installed : a fully Android 9.0 and a partial Android 10.0. In my case the better choice is to uncheck these 2 versions and use the last One Android 10.0+ (version 30).</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/firstapp/android-studio-update2.png" alt="Choose SDK versions" width="800">
</div>
</div>
<div class="paragraph">
<p>When you develop in Android you should always do it on the last SDK version.</p>
</div>
<div class="paragraph">
<p>Google requires you to always target this latest version when you publish apps to the official store.</p>
</div>
</div>
</div>
</div>`;