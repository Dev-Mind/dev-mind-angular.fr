export const _spring_intro:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_introduction">Introduction</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_requirements">Requirements</a></li>
<li><a class="link" fragment="#_whats_spring">What&#8217;s Spring ?</a></li>
<li><a class="link" fragment="#_spring_framework">Spring framework</a></li>
<li><a class="link" fragment="#_documentation">Documentation</a></li>
</ul>
</li>
<li><a class="link" fragment="#_spring_boot">Spring Boot</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_spring_boot_starters">Spring boot starters</a></li>
<li><a class="link" fragment="#_spring_boot_autoconfiguration">Spring Boot autoconfiguration</a></li>
</ul>
</li>
<li><a class="link" fragment="#_flask_start_a_new_project"><span class="icon">[flask&#93;</span> Start a new project</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_generate">Generate</a></li>
<li><a class="link" fragment="#_import_zip_in_your_ide">Import zip in your IDE</a></li>
</ul>
</li>
<li><a class="link" fragment="#_flask_launch_application"><span class="icon">[flask&#93;</span> Launch application</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_with_gradle">With Gradle</a></li>
<li><a class="link" fragment="#_application_packaging">Application packaging</a></li>
<li><a class="link" fragment="#_launch_application_in_dev_mode">Launch application in dev mode</a></li>
</ul>
</li>
<li><a class="link" fragment="#_flask_update_the_welcome_page_of_your_app"><span class="icon">[flask&#93;</span> Update the welcome page of your app</a></li>
<li><a class="link" fragment="#_understand_whats_happened">Understand what&#8217;s happened</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_spring_framework_2">Spring Framework</a></li>
<li><a class="link" fragment="#_spring_boot_2">Spring Boot</a></li>
</ul>
</li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Since the beginning, <a href="https://spring.io/">Spring</a> has been a set of tools designed to simplify the development of <a href="https://www.java.com/fr/">Java</a> applications for every developer. Spring’s focus on speed, simplicity, and productivity has made it the world&#8217;s most popular Java framework.</p>
</div>
<div class="paragraph">
<p>The last versions of Spring supports other languages on the JVM like <a href="https://kotlinlang.org/">Kotlin</a>. But we will focus on Java in this lecture course.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro.png" alt="spring intro" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_introduction">Introduction</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_requirements">Requirements</h3>
<div class="paragraph">
<p>To be able to learn <a href="https://spring.io/">Spring</a> you must have</p>
</div>
<div class="ulist">
<ul>
<li>
<p>some basics in Java and JEE.
If you need to follow a complete course you can see the fabulous work of <a href="https://www.youtube.com/c/coursenlignejava/videos?view=0&amp;sort=da&amp;flow=grid">Jose Paumard</a> and watch his video to learn Java.</p>
</li>
<li>
<p>know unit testing in Java.
If not you have a <a href="/training/unit-test/unit_test_in_java.html">course</a> on this web site.</p>
</li>
<li>
<p>have knowledge of the Web mechanisms</p>
</li>
<li>
<p>know about <a href="https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html">JDBC</a> and <a href="https://hibernate.org/orm/documentation/6.5">Hibernate</a>. We will see the main principles of these libraries during this course.</p>
</li>
<li>
<p>a PC with a good IDE as <a href="https://www.jetbrains.com/idea">IntelliJ</a>. Follow this <a href="../training/outil/install_development_environment.html">page</a> to install your dev environment (IDE + Java)</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_whats_spring">What&#8217;s Spring ?</h3>
<div class="paragraph">
<p>Spring is the most used Java framework.
A framework comes with rules to organize developments</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Good practices</p>
</li>
<li>
<p>Abstraction of the complexity</p>
</li>
<li>
<p>Provides utility classes</p>
</li>
<li>
<p>Helps to focus on the business code and not on the technical plumbing</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Spring is</p>
</div>
<div class="ulist">
<ul>
<li>
<p>an <a href="https://github.com/spring-projects">Open Source</a> Java framework. You can see the code and contribute to the project</p>
</li>
<li>
<p>an entire <a href="https://spring.io/">ecosystem</a>. Spring provide a lot of tool to develop your app, deploy your app, manage your app</p>
</li>
<li>
<p>a <a href="https://spring.io/community">community</a></p>
</li>
<li>
<p>a company (Spring is open source Licence «Apache 2.0» but managed by a company Broadcom)</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_spring_framework">Spring framework</h3>
<div class="paragraph">
<p>Spring projects were created to facilitate Java development</p>
</div>
<div class="ulist">
<ul>
<li>
<p><a href="https://spring.io/projects/spring-framework">Spring Core</a> provides a framework to simplify project technical aspects</p>
</li>
<li>
<p>Sub-projects deal with more specific technical issues (Data, Security, Cloud&#8230;&#8203;)</p>
</li>
<li>
<p>Nothing is mandatory, everything is configurable</p>
</li>
<li>
<p>Big effort on backward compatibility to be able to always upgrade your project to the last versions.</p>
</li>
</ul>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/spring-projects.png" alt="canvas" width="800">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_documentation">Documentation</h3>
<div class="paragraph">
<p>You can read the documentation related to everything we will see together during these lessons</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Spring Core <a href="https://docs.spring.io/spring/docs/current/spring-framework-reference/" class="bare">https://docs.spring.io/spring/docs/current/spring-framework-reference/</a></p>
</li>
<li>
<p>Spring Boot <a href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle" class="bare">https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle</a></p>
</li>
<li>
<p>Spring Data JPA <a href="https://docs.spring.io/spring-data/jpa/docs/current/reference/html/" class="bare">https://docs.spring.io/spring-data/jpa/docs/current/reference/html/</a></p>
</li>
<li>
<p>Spring Security <a href="https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/" class="bare">https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/</a></p>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_spring_boot">Spring Boot</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Spring Boot helps you to create stand-alone, production-grade Spring applications.</p>
</div>
<div class="paragraph">
<p>The goal is to start an application in 3 lines. To do that, Spring Boot takes <strong>an opinionated view of the Spring platform</strong> and third-party libraries. A default convention is applied out of the box, but you can deviate easily from the defaults if you need to.</p>
</div>
<div class="paragraph">
<p>Spring Boot provides a range of non-functional features that are common to large classes of projects (such as embedded servers, security, metrics, health checks, and externalized configuration).</p>
</div>
<div class="sect2">
<h3 id="_spring_boot_starters">Spring boot starters</h3>
<div class="paragraph">
<p>Starters are a set of convenient dependency descriptors that you can include in your application.</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>spring-boot-starter-web</strong> : Starter for building web, including RESTful, applications using Spring MVC. Uses Tomcat as the default embedded container</p>
</li>
<li>
<p><strong>spring-boot-starter-data-jpa</strong> : Starter to configure Hibernate and a datasource to store your data in a DBMS.</p>
</li>
<li>
<p><strong>spring-boot-starter-test</strong> : Starter for testing Spring Boot applications with libraries including JUnit, AssertJ and Mockito</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_spring_boot_autoconfiguration">Spring Boot autoconfiguration</h3>
<div class="paragraph">
<p>Spring Boot attempts to automatically configure your Spring application based on the jar dependencies that you have added. For example, if you have a database driver in your classpath, you don&#8217;t have to configure any database, the Spring Boot auto-configuration do the job for you. You juste have to configure some properties to customize the datasource username, password and Url.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_start_a_new_project"><span class="icon">[flask&#93;</span> Start a new project</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_generate">Generate</h3>
<div class="paragraph">
<p>To start a new project, you can (you should) use the official generator <a href="https://start.spring.io/" class="bare">https://start.spring.io/</a></p>
</div>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/spring-intro/springboot-init19.png" alt="springboot init19" width="1000"></span></p>
</div>
<div class="paragraph">
<p>Use these settings</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>Project</strong> : Gradle Kotlin</p>
</li>
<li>
<p><strong>Project metadata</strong>:</p>
<div class="ulist">
<ul>
<li>
<p>group : <code>com.emse.spring</code></p>
</li>
<li>
<p>Spring version: <code>3.3.2</code></p>
</li>
<li>
<p>artifact &amp; name :  <code>automacorp</code></p>
</li>
<li>
<p>Packaging : <code>jar</code></p>
</li>
<li>
<p>Java : <code>21</code></p>
</li>
</ul>
</div>
</li>
<li>
<p><strong>Dependencies</strong>, click on button "ADD DEPENDENCIES"" to choose which sub projects we will use. Choose <strong>Spring Web</strong></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Click on the Generate button (bottom of the screen) to download a zip with generated files.</p>
</div>
</div>
<div class="sect2">
<h3 id="_import_zip_in_your_ide">Import zip in your IDE</h3>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Unzip the project into a directory (you can put it next to the first project we did in the TPs)</p>
</li>
<li>
<p>Open the project in <a href="../outil/install-development-environment">IntelliJ Idea</a>. This step may take a long time if your Internet connectivity is slow. IntelliJ will update Gradle and all dependencies needed by the project.</p>
</li>
<li>
<p>You should have this project structure. One Application is generated with tests</p>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/spring-intro/springboot-tree.png" alt="springboot tree" width="350"></span></p>
</div>
</li>
</ol>
</div>
<div class="paragraph">
<p>We will open the main generated files</p>
</div>
<div class="sect3">
<h4 id="_read_gradle_configuration">Read Gradle configuration</h4>
<div class="paragraph">
<p>File : <strong>@GT settings.gradle.kts</strong> contains the project name</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451346.3481">rootProject.name = <span class="hljs-string">&quot;automacorp&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1732912451346.3481')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>File : <strong>@GT build.gradle.kts</strong> contains information used by Gradle to build app</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451347.2031">plugins {
	java <span class="hljs-comment">// (1)</span>
	id(<span class="hljs-string">&quot;org.springframework.boot&quot;</span>) version <span class="hljs-string">&quot;3.3.2&quot;</span> <span class="hljs-comment">// (2)</span>
	id(<span class="hljs-string">&quot;io.spring.dependency-management&quot;</span>) version <span class="hljs-string">&quot;1.1.6&quot;</span> <span class="hljs-comment">// (3)</span>
}

group = <span class="hljs-string">&quot;com.emse.spring&quot;</span> <span class="hljs-comment">// (4)</span>
version = <span class="hljs-string">&quot;0.0.1-SNAPSHOT&quot;</span>

repositories { <span class="hljs-comment">// (5)</span>
	mavenCentral()
}

java { <span class="hljs-comment">// (6)</span>
	toolchain {
		languageVersion = JavaLanguageVersion.of(<span class="hljs-number">21</span>)
	}
}


dependencies { <span class="hljs-comment">// (7)</span>
	implementation(<span class="hljs-string">&quot;org.springframework.boot:spring-boot-starter-web&quot;</span>) <span class="hljs-comment">// (8)</span>
	testImplementation(<span class="hljs-string">&quot;org.springframework.boot:spring-boot-starter-test&quot;</span>) <span class="hljs-comment">// (9)</span>
  testRuntimeOnly(<span class="hljs-string">&quot;org.junit.platform:junit-platform-launcher&quot;</span>) <span class="hljs-comment">// (10)</span>
}

tasks.<span class="hljs-symbol">withType@</span><span class="hljs-symbol">LTTest@</span>GT { <span class="hljs-comment">// (11)</span>
	useJUnitPlatform()
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451347.2031')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) Adds the Java plugin to help Gradle to manage our Java app lifecycle</p>
</li>
<li>
<p>(2) Adds the Spring Boot plugin to be able to add task to run, compile, assemble our Spring Boot app</p>
</li>
<li>
<p>(3) Adds Spring dependency management plugin to use the compatible dependencies with the Spring Boot version</p>
</li>
<li>
<p>(4) Project id and versions</p>
</li>
<li>
<p>(5) Tell Gradle where it will find all libraries</p>
</li>
<li>
<p>(6) Customize the Java plugin and define the default Java version used by the project</p>
</li>
<li>
<p>(7) This block contains all dependencies used by our app.</p>
</li>
<li>
<p>(8) spring-boot-starter-web to load all the elements to start a web app (embedded server, libs to write REST services&#8230;&#8203;)</p>
</li>
<li>
<p>(9) spring-boot-starter-test contains all lib used in tests (Junit, Mockito, Assetj&#8230;&#8203;)</p>
</li>
<li>
<p>(10) configure junit runner to test execution</p>
</li>
<li>
<p>(11) declare the Junit 5 runner to use to execute the tests</p>
</li>
</ul>
</div>
</div>
<div class="sect3">
<h4 id="_app_files">App files</h4>
<div class="paragraph">
<p>File : <strong>@GT src @GT main @GT java @GT com.emse.spring.automacorp.AutomacorpApplication</strong></p>
</div>
<div class="paragraph">
<p>The annotation <code>@SpringBootApplication</code> initialize a Spring Boot application. This is your app entry point</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912451348.7625"><span class="hljs-keyword">package</span> com.emse.spring.automacorp;

<span class="hljs-keyword">import</span> org.springframework.boot.SpringApplication;
<span class="hljs-keyword">import</span> org.springframework.boot.autoconfigure.SpringBootApplication;

<span class="hljs-meta">@SpringBootApplication</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AutomacorpApplication</span> {
	<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> {
		SpringApplication.run(AutomacorpApplication.class, args);
	}
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451348.7625')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>On startup Spring Boot will automatically scan all sub packages, defined below <code>com.emse.spring.automacorp</code>.</p>
</div>
<div class="paragraph">
<p>If these packages contain classes annotated with special annotations like <code>@Controller</code>, <code>@Service</code>, Spring Boot will automatically add them to the Spring context. This classes will be called Spring Beans. We will see more in the next chapter.</p>
</div>
<div class="paragraph">
<p>File : <strong>@GT src @GT main @GT java @GT com.emse.spring.automacorp.AutomacorpApplicationTests</strong></p>
</div>
<div class="paragraph">
<p>This class is the test file of your AutomacorpApplication. In a good application, all files are tested and verified by unit tests</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912451348.533"><span class="hljs-meta">@SpringBootTest</span> <span class="hljs-comment">// (2)</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AutomacorpApplicationTests</span> {
    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">contextLoads</span><span class="hljs-params">()</span> { <span class="hljs-comment">// (3)</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451348.533')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) Runner to use when we want to test a Spring class. This Junit runner is a class that extends the Junit Runner to add more feature when your test is launched. x</p>
</li>
<li>
<p>(2) Annotation which creates an application context dedicated for tests. Spring Boot provide several annotations to <a href="https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html">facilitate tests</a>. <code>@SpringBootTest</code> will launch a complete context and help to test a class in a real context. To be more efficient you can load only some part of the context. <code>@DataJpaTest</code> will only load the database objects and the class to test&#8230;&#8203;.</p>
</li>
<li>
<p>(3) In a Junit test you always have to write a test method. This method will be executed when you launch the test. Even if the content is empty, in this example Spring will try to launch all the context. If somethings is wrong you will have an error</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>You can run this test if you click on green button</p>
</div>
<div class="videoblock">
<div class="content">
<iframe width="1000" height="500" src="https://www.youtube.com/embed/6FlusTFOmRA?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
<div class="paragraph">
<p>File : <strong>@GT src @GT main @GT resources @GT application.properties</strong></p>
</div>
<div class="paragraph">
<p>It contains all the application properties. For the moment this file is empty</p>
</div>
<div class="ulist">
<ul>
<li>
<p>A property has a key and a value.</p>
</li>
<li>
<p>In your code you read a property by its key and Spring will load the value at runtime</p>
</li>
<li>
<p>Properties help to customize app on a particular environment+</p>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_launch_application"><span class="icon">[flask&#93;</span> Launch application</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_with_gradle">With Gradle</h3>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1732912451348.5781">./gradlew --continuous bootRun // (1)

[...]
2023-08-22T17:15:59.685+02:00  INFO 124158 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path &#x27;&#x27;
2023-08-22T17:15:59.697+02:00  INFO 124158 --- [  restartedMain] c.e.spring.automacorp.AutomacorpApplication  : Started AutomacorpApplication in 1.76 seconds (process running for 2.126)
2023-08-22T17:16:04.331+02:00  INFO 124158 --- [nio-8085-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet &#x27;dispatcherServlet&#x27;
2023-08-22T17:16:04.332+02:00  INFO 124158 --- [nio-8085-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet &#x27;dispatcherServlet&#x27;
2023-08-22T17:16:04.334+02:00  INFO 124158 --- [nio-8085-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 2 ms
&lt;==========---&gt; 80% EXECUTING
<span class="hljs-meta prompt_">&gt; </span><span class="language-bash">:bootRun  // (2)&lt;/==========---&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1732912451348.5781')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) the <em>--continuous</em> gradle option will restart the server when we recompile the project</p>
</li>
<li>
<p>(2) the build gets "stuck" at XX%, but the server is actually started and ready to accept connections. To stop the application use kbd: [Ctrl + c]</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>A this step you can open URL localhost:8080 in your favorite browser. You should see this page</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/spring-intro/spring-page-first.png" alt="spring page first">
</div>
</div>
<div class="paragraph">
<p>If Spring can&#8217;t start your app you must read the logs in your terminal. For example il port 8080 is already used you will have this error</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1732912451348.542">***************************
APPLICATION FAILED TO START
***************************

Description:

Web server failed to start. Port 8080 was already in use.

Action:

Identify and stop the process that&#x27;s listening on port 8080 or configure this application to listen on another port.</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451348.542')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If you need to use another port you can. For that open the file <code>application.properties</code> and add a new entry</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-properties" id="1732912451348.96"><span class="hljs-attr">server.port</span>=<span class="hljs-string">8085</span></code><button class="btn-copy-code" onclick="copyToClipboard('1732912451348.96')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can relaunch the app. To stop the running app use <strong>Use  [Ctrl + c] to stop the application</strong>.</p>
</div>
</div>
<div class="sect2">
<h3 id="_application_packaging">Application packaging</h3>
<div class="paragraph">
<p>With Spring Boot, your application is packaged in a jar file containing an embedded application server to run your code. You have only one jar and all dependencies are inside</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1732912451348.6826">./gradlew assemble</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451348.6826')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>This task generate a jar (Java archive) in <code>build/libs</code>.</p>
</li>
<li>
<p>jar name is <code>automacorp-0.0.1-SNAPSHOT.jar</code>. The version is defined in your Gradle configuration. It contains everything you need to launch the application (conf + libs)</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>To launch your Spring Boot App you can execute</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1732912451348.8499">java -jar build/libs/automacorp-0.0.1-SNAPSHOT.jar</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451348.8499')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can stop your app [Ctrl + c]</p>
</div>
</div>
<div class="sect2">
<h3 id="_launch_application_in_dev_mode">Launch application in dev mode</h3>
<div class="paragraph">
<p><strong>com.emse.spring.automacorp.AutomacorpApplication</strong> is a bootable class because it contains a main class</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1732912451348.4548"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> { }</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451348.4548')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Open this class. You can click on the green button in the margin</p>
</div>
<div class="videoblock">
<div class="content">
<iframe width="700" height="300" src="https://www.youtube.com/embed/f8mRHwIgxAY?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
<div class="paragraph">
<p>or use launch configuration in your toolbar <span class="image"><img src="../../img/training/spring-intro/run-config.png" alt="run config"></span></p>
</div>
<div class="paragraph">
<p>When app is started, <strong>Run pannel</strong> is opened on the bottom. This pannel contains logs (if you search informations on errors). The button stop (red square) can be used to stop app</p>
</div>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/spring-intro/run-class2.png" alt="run class2"></span></p>
</div>
<div class="paragraph">
<p><strong>This third solution to launch the application is the one recommended when you develop your application</strong></p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_update_the_welcome_page_of_your_app"><span class="icon">[flask&#93;</span> Update the welcome page of your app</h2>
<div class="sectionbody">
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Create a new file in <code><strong>src/main/resources/static</strong></code>. The name will be <code><strong>index.html</strong></code></p>
</li>
<li>
<p>In this file copy the following code</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1732912451348.9727"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span> Spring in practice<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        Hello world
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1732912451348.9727')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>Recompile your code or restart your app</p>
</li>
<li>
<p>Reopen <a href="http://localhost:8080" class="bare">http://localhost:8080</a> in your browser. You should see your Hello message</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>If you want to have a nicer page, you can include a CSS library as Bootstrap (see the <a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/#cdn-links">CDN links</a>)</p>
</div>
<div class="paragraph">
<p>You can copy this line in the header of your HTML page.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1732912451349.7175"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css&quot;</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">integrity</span>=<span class="hljs-string">&quot;sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH&quot;</span> <span class="hljs-attr">crossorigin</span>=<span class="hljs-string">&quot;anonymous&quot;</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1732912451349.7175')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>After this import you can use the different CSS components provided by <a href="https://getbootstrap.com/">Bootstrap</a>. To see the result update your page</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-html" id="1732912451349.844"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Automacorp<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;lead&quot;</span>&gt;</span>
            Welcome on the Automacorp App used to learn Spring.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1732912451349.844')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_understand_whats_happened">Understand what&#8217;s happened</h2>
<div class="sectionbody">
<div class="paragraph">
<p>In few lines you have started your first Spring project. I spoke about Spring, Spring Framework, Spring Boot&#8230;&#8203; But what&#8217;s the difference ?</p>
</div>
<div class="sect2">
<h3 id="_spring_framework_2">Spring Framework</h3>
<div class="paragraph">
<p>Spring Framework is a popular, open-source, Java-based application framework. You have the core library but you have a lot of another ones when you want to add more features in your application : data storage, web, security, &#8230;&#8203;.!</p>
</div>
<div class="paragraph">
<p>When you add a new Spring or non Spring library, you need to configure your application (configuration beans, properties&#8230;&#8203;)</p>
</div>
<div class="paragraph">
<p>You can have to do a lot of thing. That&#8217;s why we prefer use Spring Boot.</p>
</div>
</div>
<div class="sect2">
<h3 id="_spring_boot_2">Spring Boot</h3>
<div class="paragraph">
<p>Spring Boot takes an opinionated view of the Spring platform and third-party libraries.</p>
</div>
<div class="paragraph">
<p>With Spring Boot, it’s easy to create applications for all types of workloads. Most Spring Boot applications need very little Spring configuration.</p>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>Spring Boot is a "convention over configuration" type of framework, with no code generation.</p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>When we use Spring MVC (the original web framework built on the Servlet API), we need to configure for example the dispatcher servlet among other things.
When we use the Spring support of Hibernate/JPA, we would need to configure a datasource, an entity manager factory, a transaction manage&#8230;&#8203;.</p>
</div>
<div class="paragraph">
<p>Spring Boot simplifies all of these configuration elements, by auto-configuration. For example, when it sees <code>spring-webmvc</code> on the classpath, Spring Boot adds automatically <code>@EnableWebMvc</code> on your context.</p>
</div>
<div class="paragraph">
<p>With Spring boot we will use <a href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-starter">starters</a></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451349.7239">dependencies {
 implementation(<span class="hljs-string">&#x27;org.springframework.boot:spring-boot-starter-web&#x27;</span>)
 testImplementation(<span class="hljs-string">&#x27;org.springframework.boot:spring-boot-starter-test&#x27;</span>)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451349.7239')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The starter name starts by <strong>spring-boot-starter-XXXX</strong> and use a suffix XXXX (web, cache, data-jpa, mustache, web&#8230;&#8203;)</p>
</div>
<div class="paragraph">
<p>In the next course we will see how to add objects to our app and how we can linked them each other&#8230;&#8203;</p>
</div>
</div>
</div>
</div>`;