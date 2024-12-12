export const _gradle:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_introduction">Introduction</a></li>
<li><a class="link" fragment="#_why_a_build_tool">Why a build tool?</a></li>
<li><a class="link" fragment="#_usage">Usage</a></li>
<li><a class="link" fragment="#_principle">Principle</a></li>
<li><a class="link" fragment="#_starting_with_gradle">Starting with Gradle</a></li>
<li><a class="link" fragment="#_gradle_wrapper">Gradle wrapper</a></li>
<li><a class="link" fragment="#_flask_first_example"><span class="icon">[flask&#93;</span> First example</a></li>
<li><a class="link" fragment="#_how_gradle_works">How Gradle works ?</a></li>
<li><a class="link" fragment="#_tasks">Tasks</a></li>
<li><a class="link" fragment="#_incremental_build">Incremental build</a></li>
<li><a class="link" fragment="#_flask_create_your_own_tasks"><span class="icon">[flask&#93;</span> Create your own tasks</a></li>
<li><a class="link" fragment="#_gradle_life_cycle">Gradle Life cycle</a></li>
<li><a class="link" fragment="#_plugins">Plugins</a></li>
<li><a class="link" fragment="#_flask_custom_tasks_and_their_configurations"><span class="icon">[flask&#93;</span> Custom tasks and their configurations</a></li>
<li><a class="link" fragment="#_dependency_management">Dependency management</a></li>
<li><a class="link" fragment="#_reference">Reference</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In this training, we will learn how Gradle works and how use it in our projects.</p>
</div>
<div class="paragraph">
<p>It&#8217;s just a fast presentation of this tool, and you will find more informations on official website <a href="https://docs.gradle.org/current/userguide/userguide.html" class="bare">https://docs.gradle.org/current/userguide/userguide.html</a></p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/gradle.png" alt="Gradle by Dev-Mind" width="800">
</div>
</div>
<div class="paragraph">
<p>Gradle is an open source tool for automating the build of your Java, Kotlin, Android, Web projects&#8230;&#8203; If you only have a web project, you don&#8217;t need to use Gradle, but when all your projects are in a mono repository on Git, with heterogeneous languages, it&#8217;s easier to use a same life cycle tool like Gradle.</p>
</div>
<div class="paragraph">
<p>Gradle is not the only solution in the ecosystem. You can also use Maven or older tool like Ant.</p>
</div>
<div class="paragraph">
<p>Gradle has the Ant flexibility and apply many Maven conventions.</p>
</div>
<div class="paragraph">
<p>Maven helps to build only one project. But Gradle was created to be more flexible, you can build several artifacts for example. That&#8217;s why the Android community has chosen this tool. You can define different flavors and build 2 artifacts : one for the free version for example and another one for the paid version.</p>
</div>
<div class="paragraph">
<p>Java users use both Maven and Gradle. But I choose Gradle for you, because we will use this tool in our Java/Spring project, and in the Android project.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_introduction">Introduction</h2>
<div class="sectionbody">
<div class="paragraph">
<p><strong>Highly customizable</strong><br>
You have a convention to use the plugins but everything is customizable.
You can write your scripts in Kotlin (default) or in Groovy (the legacy solution)</p>
</div>
<div class="paragraph">
<p><strong>Fast / Incremental build / Cache / Parallel</strong> <br>
Incremental build : Gradle reuses outputs from previous executions, processing only inputs that changed. For a fastest build, you can also execute tasks in parallel and you can configure Gradle cache.</p>
</div>
<div class="paragraph">
<p><strong>Powerful</strong><br>
Gradle build projects in several languages but its success is linked to Android developers. Today</p>
</div>
<div class="paragraph">
<p><strong>Useful</strong><br>
Based on Ivy and supports Maven, it simplifies the project dependencies (libraries). By the default, the dependency resolution is transitive. If you declare one dependency and if this library depends from another ones, you don&#8217;t need to declare all the libraries tree because Gradle is able to resolve this task for you.</p>
</div>
<div class="paragraph">
<p><strong>JVM foundation</strong><br>
Gradle runs on the JVM and you must have a Java Development Kit (JDK) installed to use it. You can also use Gradle for native projects like Spring native, Micronaut or Quarkus.</p>
</div>
<div class="paragraph">
<p><strong>Extensibility</strong><br>
You can extend Gradle to provide your own task types, your own plugins or even your own build model. Android added for example many new build concepts such as flavors and build types.</p>
</div>
<div class="paragraph">
<p><strong>IDE support</strong><br>
Major IDEs allow you to import Gradle builds</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_why_a_build_tool">Why a build tool?</h2>
<div class="sectionbody">
<div class="paragraph">
<p><strong>Write once, run everywhere</strong></p>
</div>
<div class="paragraph">
<p>Build automation is the act of scripting or automating a wide variety of <strong>tasks</strong> that software developers have to do in their day to day activities such as:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>compiling program source code into binary code</p>
</li>
<li>
<p>packaging a compiled program for delivery</p>
</li>
<li>
<p>running automated tests</p>
</li>
<li>
<p>deploying to production systems</p>
</li>
<li>
<p>generating documentation and/or release notes.</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_usage">Usage</h2>
<div class="sectionbody">
<div class="paragraph">
<p>You can execute Gradle
* In command line in a terminal
* In your IDE (development tools to write and execute code) <span class="small">NetBeans, Eclipse or IntelliJ (we will use IntelliJ)</span></p>
</div>
<div class="paragraph">
<p>Online documentation is very complete for the main usages <a href="https://docs.gradle.org/current/userguide/userguide.html" class="bare">https://docs.gradle.org/current/userguide/userguide.html</a>. It&#8217;s more difficult when you want to create your own plugins. But it&#8217;s not a problem in our case.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_principle">Principle</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Gradle was not the first build tool. In the past we used <a href="https://ant.apache.org/">Ant</a> and after <a href="https://maven.apache.org/">Maven</a></p>
</div>
<div class="ulist">
<ul>
<li>
<p><a href="https://ant.apache.org/">Ant</a> is very powerful, but you describe your build in an xml file, the configuration is not readable and difficult to use on a project with a lot of people, because you don&#8217;t have conventions to use this tool.</p>
</li>
<li>
<p><a href="https://maven.apache.org/">Maven</a> is better but in my opinion Gradle is the best solution because Maven is</p>
<div class="ulist">
<ul>
<li>
<p>very verbose (you have to write a lot of thing to configure a build)</p>
</li>
<li>
<p>the project is not very flexible by its governance</p>
</li>
<li>
<p>slower than Gradle: incremental build is present in the last version and the Gradle cache and parallel execution give an advantage to Gradle</p>
</li>
</ul>
</div>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_starting_with_gradle">Starting with Gradle</h2>
<div class="sectionbody">
<div class="paragraph">
<p>You can install the last version on <a href="https://gradle.org/install/" class="bare">https://gradle.org/install/</a>. If you followed the installation of the package manager <a href="https://sdkman.io/">Sdk Man</a> in the <a href="https://dev-mind.fr/training/outil/install-development-environment.html">first lesson</a>, you just have to launch</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714467.2441">sdk install gradle 8.2.1</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714467.2441')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Gradle runs on all major operating systems and requires only a Java JDK version 17 or higher to be installed.</p>
</div>
<div class="paragraph">
<p>To check, run java -version in a terminal on your laptop:</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714467.3896">@dollar@ java -version

java version &quot;17.0.7&quot; 2023-04-18 LTS
Java(TM) SE Runtime Environment Oracle GraalVM 17.0.7+8.1 (build 17.0.7+8-LTS-jvmci-23.0-b12)
Java HotSpot(TM) 64-Bit Server VM Oracle GraalVM 17.0.7+8.1 (build 17.0.7+8-LTS-jvmci-23.0-b12, mixed mode, sharing)</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714467.3896')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Open a terminal on your laptop or computer to create and initialize a new Gradle project.
You will create a directory and link it to Gradle</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714467.4724">mkdir gradle-demo
cd gradle-demo
gradle init</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714467.4724')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If you use a Gradle version @GT 7, you will have to respond to few questions</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714467.5764">Select type of project to generate:
  1: basic
  2: application
  3: library
  4: Gradle plugin
Enter selection (default: basic) [1..4] 2

Select implementation language:
  1: C++
  2: Groovy
  3: Java
  4: Kotlin
  5: Scala
  6: Swift
Enter selection (default: Java) [1..6] 3

Generate multiple subprojects for application? (default: no) [yes, no] no
Select build script DSL:
  1: Kotlin
  2: Groovy
Enter selection (default: Kotlin) [1..2] 1

Select test framework:
  1: JUnit 4
  2: TestNG
  3: Spock
  4: JUnit Jupiter
Enter selection (default: JUnit Jupiter) [1..4] 4

Generate build using new APIs and behavior (some features may change in the next minor release)? (default: no) [yes, no] no</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714467.5764')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You should have this message after</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714467.3032">@GT Task :init
Get more help with your project: Learn more about Gradle by exploring our samples at https://docs.gradle.org/7.5/samples

BUILD SUCCESSFUL in 56s
2 actionable tasks: 2 executed</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714467.3032')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Gradle should have generated this tree</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714467.9343">|-- app
|   | src
|   | -- build.gradle.kts  (1)
|-- .gitattributes (2)
|-- .gitignore (2)
|-- gradle
|   | -- wrapper
|       | -- gradle-wrapper.jar  (3)
|       | -- gradle-wrapper.properties  (4)
|-- gradlew  (5)
|-- gradlew.bat (5)
|-- settings.gradle.kts (6)</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714467.9343')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>(1). Gradle configuration script for the project<br>
(2). A git init is automatically made on the project generation<br>
(3). This jar contains Gradle Wrapper classes and libraries<br>
(4). Wrapper configuration file (you find the Gradle version used by the project)<br>
(5). These scripts are used to launch Gradle via the wrapper (2 scripts, one for Unix one for Windows)<br>
(6). general configuration file (used to declare Gradle sub modules, and global variables)</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_gradle_wrapper">Gradle wrapper</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Team members can have different versions of Gradle on their laptop. But on a project everybody must use the same version.</p>
</div>
<div class="paragraph">
<p>From one project to another, you can have different versions of the tool (it&#8217;s difficult to switch the version on your computer).</p>
</div>
<div class="paragraph">
<p>Gradle wrapper resolves these problems. The recommended way to execute any Gradle build, is with the help of the Gradle Wrapper (in short just “Wrapper”). The Wrapper is a script that invokes a declared version of Gradle (it fixes the version used in your project), downloading it beforehand if necessary.</p>
</div>
<div class="paragraph">
<p>As a result, developers can get up and running with a Gradle project quickly without having to follow manual installation.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/gradle/wrapper.png" alt="wrapper" width="800">
</div>
</div>
<div class="listingblock code-height">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714467.1792">@dollar@ ./gradlew -v
Downloading https://services.gradle.org/distributions/gradle-8.2.1-bin.zip
..........10%...........20%...........30%...........40%...........50%...........60%...........70%...........80%...........90%...........100%

------------------------------------------------------------
Gradle 8.2.1
------------------------------------------------------------

Build time:   2023-07-10 12:12:35 UTC
Revision:     a38ec64d3c4612da9083cc506a1ccb212afeecaa

Kotlin:       1.8.20
Groovy:       3.0.17
Ant:          Apache Ant(TM) version 1.10.13 compiled on January 4 2023
JVM:          17.0.7 (Oracle Corporation 17.0.7+8-LTS-jvmci-23.0-b12)
OS:           Linux 5.19.0-50-generic amd64</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714467.1792')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_first_example"><span class="icon">[flask&#93;</span> First example</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Clone the Github project <a href="https://github.com/Dev-Mind/gradle-demo.git" class="bare">https://github.com/Dev-Mind/gradle-demo.git</a></p>
</div>
<div class="paragraph">
<p>Go in IntelliJ in the menu <code>File</code> → <code>New</code> → <code>Project From Existing Sources</code> and select the Gradle model</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/gradle/idea1.png" alt="idea1" width="800">
</div>
</div>
<div class="paragraph">
<p>When everything is finished you have your project opened in your IDE with the Gradle configuration loaded.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/gradle/idea1&2.png" alt="idea1&amp;2" width="1000">
</div>
</div>
<div class="paragraph">
<p>You can browse the gradle files as in the tree below</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714467.7642">|-- app
|   | -- src
|      | -- main
|          | -- java
|          | -- resources
|      | -- test
|          | -- java
|          | -- resources
|   | -- build.gradle.kts
|-- gradle
|   | -- wrapper
|       | -- gradle-wrapper.jar
|       | -- gradle-wrapper.properties
|-- .gitattributes
|-- .gitignore
|-- gradle.properties
|-- gradlew
|-- gradlew.bat
|-- settings.gradle.kts</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714467.7642')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Open the main file called <code>build.gradle.kts</code>.
This is a Java project. So we use the plugin provided by Gradle to manage an application written in Java.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1734011714467.5508">plugins {
    <span class="hljs-comment">// Apply the application plugin to add support for building a CLI application in Java.</span>
    application
}

repositories {
    <span class="hljs-comment">// Use Maven Central for resolving dependencies.</span>
    mavenCentral()
}

dependencies {
    <span class="hljs-comment">// Use JUnit Jupiter for testing.</span>
    testImplementation(<span class="hljs-string">&quot;org.junit.jupiter:junit-jupiter:5.10.0&quot;</span>)

    <span class="hljs-comment">// This dependency is used by the application.</span>
    implementation(<span class="hljs-string">&quot;org.springframework:spring-context:6.0.11&quot;</span>)
}

<span class="hljs-comment">// Apply a specific Java toolchain to ease working on different environments.</span>
java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(<span class="hljs-number">17</span>))
    }
}

application {
    <span class="hljs-comment">// Define the main class for the application.</span>
    mainClass.set(<span class="hljs-string">&quot;com.devmind.gradle.MyApplication&quot;</span>)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714467.5508')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can now launch this command</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714467.7212">@dollar@ ./gradlew build

BUILD SUCCESSFUL in 7s
8 actionable tasks: 8 executed</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714467.7212')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Gradle executes tasks and in our case Java plugin has launched 8 tasks to build the project. As this is the first build you should have 8 executed task.</p>
</div>
<div class="paragraph">
<p>If you try to relaunch the same command you should have this output</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714467.286">@dollar@ ./gradlew build
BUILD SUCCESSFUL in 517ms
8 actionable tasks: 8 up-to-date</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714467.286')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can observe the execution time. The 8 tasks are now executed in 517ms. As you changed nothing Gradle does not relaunch each task. All task have the status UP-TO-DATE</p>
</div>
<div class="paragraph">
<p>You can launch the <code>run</code> task to execute your app</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714467.3164">@dollar@ ./gradlew :app:run
@GT Task :app:run
I want to learn Gradle

BUILD SUCCESSFUL in 503ms
3 actionable tasks: 1 executed, 2 up-to-date</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714467.3164')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>With IntelliJ, we have a synthetic view of dependencies and tasks</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/gradle/idea3.png" alt="idea3" width="600">
</div>
</div>
<div class="paragraph">
<p>Now try to list all available tasks in a command window. Run</p>
</div>
<div class="listingblock code-height">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714468.68">@dollar@ ./gradlew tasks

@GT Task :tasks

------------------------------------------------------------
Tasks runnable from root project &#x27;gradle-demo&#x27;
------------------------------------------------------------

Application tasks
-----------------
run - Runs this project as a JVM application

Build tasks
-----------
assemble - Assembles the outputs of this project.
build - Assembles and tests this project.
buildDependents - Assembles and tests this project and all projects that depend on it.
buildNeeded - Assembles and tests this project and all projects it depends on.
classes - Assembles main classes.
clean - Deletes the build directory.
jar - Assembles a jar archive containing the classes of the &#x27;main&#x27; feature.
testClasses - Assembles test classes.

Build Setup tasks
-----------------
init - Initializes a new Gradle build.
wrapper - Generates Gradle wrapper files.

Distribution tasks
------------------
assembleDist - Assembles the main distributions
distTar - Bundles the project as a distribution.
distZip - Bundles the project as a distribution.
installDist - Installs the project as a distribution as-is.

Documentation tasks
-------------------
javadoc - Generates Javadoc API documentation for the &#x27;main&#x27; feature.

Help tasks
----------
buildEnvironment - Displays all buildscript dependencies declared in root project &#x27;gradle-demo&#x27;.
dependencies - Displays all dependencies declared in root project &#x27;gradle-demo&#x27;.
dependencyInsight - Displays the insight into a specific dependency in root project &#x27;gradle-demo&#x27;.
help - Displays a help message.
javaToolchains - Displays the detected java toolchains.
kotlinDslAccessorsReport - Prints the Kotlin code for accessing the currently available project extensions and conventions.
outgoingVariants - Displays the outgoing variants of root project &#x27;gradle-demo&#x27;.
projects - Displays the sub-projects of root project &#x27;gradle-demo&#x27;.
properties - Displays the properties of root project &#x27;gradle-demo&#x27;.
resolvableConfigurations - Displays the configurations that can be resolved in root project &#x27;gradle-demo&#x27;.
tasks - Displays the tasks runnable from root project &#x27;gradle-demo&#x27; (some of the displayed tasks may belong to subprojects).

Verification tasks
------------------
check - Runs all checks.
test - Runs the test suite.

To see all tasks and more detail, run gradlew tasks --all

To see more detail about a task, run gradlew help --task @LTtask@GT

BUILD SUCCESSFUL in 1s
1 actionable task: 1 executed</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.68')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_how_gradle_works">How Gradle works ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>When you want to manage your project with Gradle, you will define a configuration file to declare</p>
</div>
<div class="ulist">
<ul>
<li>
<p>how to download Gradle plugins (that provide a set of tasks)</p>
</li>
<li>
<p>how to configure Gradle plugins (properties)</p>
</li>
<li>
<p>how to download dependencies of our project (Java libraries)</p>
</li>
<li>
<p>add or configure your own tasks</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Everything is configured via a DSL (Domain Specific Language) written in Kotlin (or Groovy)</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_tasks">Tasks</h2>
<div class="sectionbody">
<div class="paragraph">
<p>You have many predefined tasks (provided by plugins)</p>
</div>
<div class="paragraph">
<p>A task</p>
</div>
<div class="ulist">
<ul>
<li>
<p>defines what to do on a set of resources</p>
</li>
<li>
<p>may depend on one or more tasks.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Gradle models its builds as Directed Acyclic Graphs (DAGs) of tasks (units of work).</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/gradle/1_dag.png" alt="How Gradle works ?" width="500">
</div>
</div>
<div class="paragraph">
<p>You can add your own tasks and let them depend on others</p>
</div>
<div class="paragraph">
<p>Task graph can be defined by both plugins and your own build scripts, with tasks linked together via the task dependency mechanism.</p>
</div>
<div class="paragraph">
<p>Tasks themselves consist of:</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>Actions</strong> — pieces of work that do something, like copy files or compile source</p>
</li>
<li>
<p><strong>Inputs</strong> — values, files and directories that the actions use or operate on</p>
</li>
<li>
<p><strong>Outputs</strong> — files and directories that the actions modify or generate</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_incremental_build">Incremental build</h2>
<div class="sectionbody">
<div class="paragraph">
<p>When inputs and outputs on a gradle task have no change, Gradle won&#8217;t execute this task and will display <strong>UP-TO-DATE</strong></p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/gradle/1_incremetal.png" alt="Incremental build" width="700">
</div>
<div class="title">Figure 1. Example with JavaCompile task</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_create_your_own_tasks"><span class="icon">[flask&#93;</span> Create your own tasks</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Add these lines to your <code>build.gradle.kts</code> file</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714468.4524">tasks.create(&quot;hello&quot;) {
    doLast {
        println(&quot;Hello&quot;)
    }
}
tasks.create(&quot;world&quot;) {
    dependsOn(&quot;hello&quot;)
    doLast {
        println(&quot;World&quot;)
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.4524')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Test by launching these tasks</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714468.7344">@dollar@ ./gradlew hello
@dollar@ ./gradlew world</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.7344')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_gradle_life_cycle">Gradle Life cycle</h2>
<div class="sectionbody">
<div class="paragraph">
<p>A Gradle build has 3 steps</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p><strong>Initialization</strong><br>
Gradle determines which projects are involved in the build. A project can have subprojects. All of them have a <code>build.gradle.kts</code>.</p>
</li>
<li>
<p><strong>Configuration</strong><br>
Gradle parses the <code>build.gradle.kts</code> configuration file (or more if you have some subprojects). After this step, Gradle has built its Directed Acyclic Graphs (DAGs)</p>
</li>
<li>
<p><strong>Execution</strong><br>
Gradle executes one or several tasks (arguments added to <code>./gradlew</code>) according to this task graph. Gradle executes tasks one by one in the order defined in the graph.</p>
</li>
</ol>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_plugins">Plugins</h2>
<div class="sectionbody">
<div class="paragraph">
<p>A plugin provides a task set and entry points to configure this plugin. For example</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714468.019">plugins {
    java
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.019')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The Java plugin has these tasks</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/gradle/pluginJava.png" alt="Fonctionnement de Gradle" width="100%">
</div>
</div>
<div class="paragraph">
<p>In the next lab, we will use Spring and Spring Boot. We will use Gradle to manage our projects. We will use 2 more plugins</p>
</div>
<div class="listingblock code-height">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714468.923">buildscript {
    plugins {  (1)
      java
      id(&quot;org.springframework.boot&quot;) version &quot;3.1.2&quot;
      id(&quot;io.spring.dependency-management&quot;) version &quot;1.1.2&quot;
    }

    repositories { (2)
      mavenCentral()
    }

    group = &quot;com.devmind.automacorp&quot;
    version = &quot;0.0.1-SNAPSHOT&quot;

    java { (3)
      sourceCompatibility = JavaVersion.VERSION_17
    }


    dependencies {
       implementation(&quot;org.springframework.boot:spring-boot-starter&quot;) (4)
       testImplementation(&quot;org.springframework.boot:spring-boot-starter-test&quot;)
    }

    tasks.withType@LTTest@GT {
      useJUnitPlatform()
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.923')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>(1). Gradle plugin used<br>
(2). repository used to download plugins or app libraries<br>
(3). Personalization of the <code>java</code> plugin.
(4). Application dependencies (libraries used by the project)</p>
</div>
<div class="paragraph">
<p>You have a lot of free plugin to enrich your build. All of them are available on this URL <a href="https://plugins.gradle.org/" class="bare">https://plugins.gradle.org/</a></p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_custom_tasks_and_their_configurations"><span class="icon">[flask&#93;</span> Custom tasks and their configurations</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Open your project <code>gradle-demo</code> in IntelliJ and add the following code in <code>build.gradle</code></p>
</div>
<div class="listingblock code-height">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714468.462">println(&quot;This is executed during the configuration phase.&quot;)

tasks.create(&quot;configured&quot;) {
    description = &quot;My own configured task&quot;
    println(&quot;This (configured) is also executed during the configuration phase.&quot;)
}

tasks.create(&quot;testWrite&quot;) {
    description = &quot;My own testWrite task&quot;
    doLast {
        println(&quot;This (testWrite) is executed during the execution phase.&quot;)
    }
}

tasks.create(&quot;testWriteBoth&quot;) {
    description = &quot;My own testWriteBoth task&quot;
    doFirst {
        println(&quot;This (testWriteBoth) is executed first during the execution phase.&quot;)
    }
    doLast {
        println(&quot;This (testWriteBoth) is executed last during the execution phase.&quot;)
    }
    println(&quot;This (testWriteBoth) is executed during the configuration phase as well.&quot;)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.462')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Launch the following command to see new tasks</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714468.4321">@dollar@ ./gradlew tasks --all</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.4321')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Then you can test your new task</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714468.0422">@dollar@ ./gradlew testWrite</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.0422')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>And</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714468.4705">@dollar@ ./gradlew testWriteBoth</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.4705')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Try to understand what happens ? If you are lost I can help you during face-to-face sessions</p>
</div>
<div class="listingblock code-height">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714468.069">@dollar@ ./gradlew testWrite

@GT Configure project :
This is executed during the configuration phase.
This (configured) is also executed during the configuration phase.
This (testWriteBoth) is executed during the configuration phase as well.

...</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.069')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_dependency_management">Dependency management</h2>
<div class="sectionbody">
<div class="paragraph">
<p>You have to define the project dependencies in the build.gradle.kts</p>
</div>
<div class="paragraph">
<p>Every dependency declared for a Gradle project applies to a specific scope. For example for a Java project, some dependencies should be used</p>
</div>
<div class="ulist">
<ul>
<li>
<p>for compiling source code (scope <code>implementation</code>)</p>
</li>
<li>
<p>for compiling test code (scope <code>testImplementation</code>)</p>
</li>
<li>
<p>for running your code (scope <code>runtime</code>)</p>
</li>
<li>
<p>for running your tests (scope <code>testRuntime</code>)</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714468.2905">dependencies {
    <span class="hljs-comment">// Use JUnit Jupiter for testing.</span>
    testImplementation(<span class="hljs-string">&quot;org.junit.jupiter:junit-jupiter:5.10.0&quot;</span>)
    testRuntimeOnly(<span class="hljs-string">&quot;org.junit.jupiter:junit-jupiter-engine:5.10.0&quot;</span>)

    <span class="hljs-comment">// This dependency is used by the application.</span>
    implementation(<span class="hljs-string">&quot;org.springframework:spring-context:6.0.11&quot;</span>)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.2905')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>A scope correspond to a configuration in Gradle. A plugin can add pre-defined configurations to your project. The Java plugin, for example, adds several configurations</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/gradle/5_dependencies.png" alt="5 dependencies" width="1000">
</div>
<div class="title">Figure 2. Source : <a href="https://docs.gradle.org" class="bare">https://docs.gradle.org</a></div>
</div>
<div class="paragraph">
<p>A configuration can extend other configurations to form an inheritance hierarchy. Child configurations inherit the whole set of dependencies declared for any of its parent.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/gradle/5_dependencies_confiog.png" alt="5 dependencies confiog" width="500">
</div>
<div class="title">Figure 3. Source : <a href="https://docs.gradle.org" class="bare">https://docs.gradle.org</a></div>
</div>
<div style="page-break-after: always;"></div>
<div class="paragraph">
<p>You can define a module dependency (reference to a library in a repository [maven central for example]).</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714468.8557">dependencies {
    implementation(group = <span class="hljs-string">&quot;org.springframework&quot;</span>, name = <span class="hljs-string">&quot;spring-core&quot;</span>, version = <span class="hljs-string">&quot;2.5&quot;</span>)
    implementation(<span class="hljs-string">&quot;org.hibernate:hibernate:3.0.5&quot;</span>)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.8557')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can define a project dependency if you have a multi-project configuration</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714468.3022">dependencies {
    implementation(project(<span class="hljs-string">&quot;:shared&quot;</span>))
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.3022')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>A module can have dependencies on other modules to work properly, so-called transitive dependencies.  By default, Gradle resolves transitive dependencies automatically.</p>
</div>
<div class="paragraph">
<p>In some case we can help Gradle to not use this mode, to exclude some dependencies or to force a specific version if we have a conflict</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714468.3691">dependencies {
    implementation(<span class="hljs-string">&quot;org.hibernate:hibernate:3.1&quot;</span>) {
        exclude(module = <span class="hljs-string">&quot;cglib&quot;</span>) <span class="hljs-comment">//by artifact name</span>
        exclude(group = <span class="hljs-string">&quot;org.jmock&quot;</span>) <span class="hljs-comment">//by group</span>

        <span class="hljs-comment">//disabling all transitive dependencies of this dependency</span>
        isTransitive = <span class="hljs-literal">false</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714468.3691')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>This schema resumes how Gradle download a dependency</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/gradle/dependencies.png" alt="dependencies" width="800">
</div>
</div>
<div class="paragraph">
<p>(1) Gradle looks in his cache if the dependency is present<br>
(2) It parses the given remote repository(ies), downloads the dependency and stores it in his cache<br>
(3) Dependency can be provided to project. If this dependency has another dependencies, Gradle loads them transitively</p>
</div>
<div style="page-break-after: always;"></div>
</div>
</div>
<div class="sect1">
<h2 id="_reference">Reference</h2>
<div class="sectionbody">
<div class="ulist">
<ul>
<li>
<p><a href="https://gradle.org/">Gradle web site</a></p>
</li>
<li>
<p><a href="https://docs.gradle.org/current/userguide/userguide.html">Official documentation</a></p>
</li>
<li>
<p><a href="https://melix.github.io/blog/2021/03/version-catalogs.html">Library version management</a></p>
</li>
</ul>
</div>
</div>
</div>`;