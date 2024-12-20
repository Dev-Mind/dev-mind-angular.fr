export const _spring_ioc:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_objects_and_application">Objects and application</a></li>
<li><a class="link" fragment="#_inversion_of_control_ioc_principle">Inversion of Control (IOC) Principle</a></li>
<li><a class="link" fragment="#_spring_beans">Spring Beans</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_create_a_bean">Create a bean</a></li>
<li><a class="link" fragment="#_add_dependencies">Add dependencies</a></li>
<li><a class="link" fragment="#_how_it_works">How it works ?</a></li>
</ul>
</li>
<li><a class="link" fragment="#_flask_using_dependency_injection"><span class="icon">[flask&#93;</span> Using Dependency Injection</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_create_a_first_bean">Create a first bean</a></li>
<li><a class="link" fragment="#_inject_your_bean">Inject your bean</a></li>
<li><a class="link" fragment="#_inject_your_bean_in_configuration_bean">Inject your bean in configuration bean</a></li>
<li><a class="link" fragment="#_other_cases">Other cases</a></li>
</ul>
</li>
<li><a class="link" fragment="#_conclusion">Conclusion</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In this course you will learn one of the main principle of software design, the dependency injection</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Fundamental principle of software design</p>
</li>
<li>
<p>Introduced by <a href="https://martinfowler.com/articles/injection.html">Martin Fowler</a> (famous english computer engineer)</p>
</li>
<li>
<p>Helps to split responsibilities in your code &#8658; weakly coupled components</p>
</li>
<li>
<p>Facilitates testing</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Spring ecosystem was built on this concept and understand dependency injection is a first step to understand Spring.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-core.png" alt="spring core" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_objects_and_application">Objects and application</h2>
<div class="sectionbody">
<div class="paragraph">
<p>When writing an application, as developers, we break down the problem we’re trying to solve into smaller ones, and do our best to comply with the architecture and design principles we’ve chosen for our application: flexible, decoupled, testable, easy to understand, etc.</p>
</div>
<div class="paragraph">
<p>For that we use a lot of objects</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/java-objects.png" alt="java objects" width="1000">
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>Service contains implementations of your business rules</p>
</li>
<li>
<p>Components help to resolve a technical problem</p>
</li>
<li>
<p>Repository interacts with external systems as database, webapi&#8230;&#8203;</p>
</li>
<li>
<p>Controllers are in front of your app to read and check data sent by users</p>
</li>
<li>
<p>And you have objects to transport data DTO, entities</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>When we want to define an object we write for example</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714587.9897"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">NameService</span> {

    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">getName</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;Guillaume&quot;</span>;
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714587.9897')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>And to use this object elsewhere we have to create a new instance with a <code>new</code> instruction</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714587.542"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WelcomeService</span> {

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">sayHello</span><span class="hljs-params">()</span> {
        <span class="hljs-type">NameService</span> <span class="hljs-variable">nameService</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">NameService</span>();
        System.out.println(<span class="hljs-string">&quot;Hello &quot;</span> + nameService.getName());
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714587.542')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>We have a strong coupling between these classes <strong>WelcomeService</strong> and <strong>NameService</strong>.
If we want to change <strong>NameService</strong> we have a good chance of having to update <strong>WelcomeService</strong>.</p>
</div>
<div class="paragraph">
<p>For example, if <strong>NameService</strong> need to use others objects, you have to update the <strong>WelcomeService</strong> class constructor</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714588.0664"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">NameService</span> {

    <span class="hljs-keyword">private</span> UserService userService;

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">NameService</span><span class="hljs-params">(UserService userService)</span> {
        <span class="hljs-built_in">this</span>.userService = userService;
    }

    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">getName</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;Guillaume&quot;</span>;
    }

    <span class="hljs-comment">// ...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714588.0664')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>As the constructor changed you must update the coupled class</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714588.098"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WelcomeService</span> {

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">sayHello</span><span class="hljs-params">()</span> {
        <span class="hljs-type">UserService</span> <span class="hljs-variable">userService</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">UserService</span>();
        <span class="hljs-type">NameService</span> <span class="hljs-variable">nameService</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">NameService</span>(userService);
        System.out.println(<span class="hljs-string">&quot;Hello &quot;</span> + nameService.getName());
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714588.098')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>We have to resolve these problems (break coupling and use singleton) and the solution is <strong>Inversion of Control</strong> (IOC).</p>
</div>
<div class="paragraph">
<p>To introduce this principle we will use a simpler example</p>
</div>
<div class="paragraph">
<p>If a class A uses a class B</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/ioc1.png" alt="ioc1" width="700">
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714588.7798"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">B</span> {
    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">name</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;Guillaume&quot;</span>;
    }
}

<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">A</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">hello</span><span class="hljs-params">()</span> {
        <span class="hljs-type">B</span> <span class="hljs-variable">b</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">B</span>();
        System.out.println(<span class="hljs-string">&quot;Hello &quot;</span> + b.name());
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714588.7798')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Other consideration: in a web application, you should not implement a service at every call. It&#8217;s not efficient if a class has a lot of collaborators, and if a service is called in different points in your application.</p>
</div>
<div class="paragraph">
<p>In this case the class which not change must be created only once. We often use the Singleton design pattern to do that.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_inversion_of_control_ioc_principle">Inversion of Control (IOC) Principle</h2>
<div class="sectionbody">
<div class="paragraph">
<p>To resolve this problem, we can use a client, a factory to instantiate class B and inject it into class A.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/ioc2.png" alt="ioc2" width="700">
</div>
</div>
<div class="paragraph">
<p>If an object needs other objects, it does not instantiate itself but they are provided by a factory or a client (a container).</p>
</div>
<div class="paragraph">
<p>Objects define their collaborators (that is, the other objects they work with) through constructor arguments or properties.
Container is responsible for the construction of the objects.</p>
</div>
<div class="paragraph">
<p>It will provide (inject) the collaborators requested by an object.</p>
</div>
<div class="paragraph">
<p>The first version of Spring was created to resolve this problem.
Spring provides <a href="https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans">a container</a> to create and inject objects.</p>
</div>
<div class="paragraph">
<p>You must remember</p>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>If an object needs other objects, it does not instantiate itself, but they are provided by a factory (in our case Spring).</p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>Therefore, we no longer have to find the <code>new</code> key word in your code.</p>
</div>
<div class="paragraph">
<p>The only exception is for objects which contain data : Entity and DTO.</p>
</div>
<div class="paragraph">
<p><strong>Inversion of Control (IoC) principle is also known as dependency injection (DI)</strong>.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_spring_beans">Spring Beans</h2>
<div class="sectionbody">
<div class="paragraph">
<p>In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans.</p>
</div>
<div class="paragraph">
<p>A <a href="https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-definition">bean</a> is an object that is instantiated, assembled, and managed by a Spring IoC container</p>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>The Java language was named Java in reference to Java coffee, the coffee of Indonesia. The Java logo is a cup of tea. With Spring an app can be seen as a set of Java beans</p>
</div>
</blockquote>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/java-beans.png" alt="java beans" width="800">
</div>
<div class="title">Figure 1. In this image I play the role of the garbage collector. I clean up the unused Java Beans (beans without reference)</div>
</div>
<div class="sect2">
<h3 id="_create_a_bean">Create a bean</h3>
<div class="sect3">
<h4 id="_by_annotation">By annotation</h4>
<div class="paragraph">
<p>In Spring, we can use a stereotype on our classes to defined them as Bean: <code>@Service</code>, <code>@Component</code>, <code>@Repository</code>, <code>@Controller</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714588.0454"><span class="hljs-meta">@Service</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MyGreetingService</span> {
   <span class="hljs-comment">// Code ...</span>
}

<span class="hljs-meta">@Controller</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MyGreetingController</span> {
   <span class="hljs-comment">// Code ...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714588.0454')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Spring Boot is able to scan classpath to auto-detect and auto-configure beans annotated with <code>@Service</code>, <code>@Component</code>, <code>@Repository</code>, or <code>@Controller</code>.
Each annotation is equivalent, but a sterotype (<code>@Service</code>, <code>@Repository</code>&#8230;&#8203;) helps to understand the object role in your app</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/java-objects.png" alt="java objects" width="1000">
</div>
</div>
</div>
<div class="sect3">
<h4 id="_by_configuration">By configuration</h4>
<div class="paragraph">
<p>Also, we can create a Spring bean in a configuration bean, when we need to configure it.</p>
</div>
<div class="paragraph">
<p>The first step is to create a Configuration bean annotated with <code>@Configuration</code>.
This annotation indicates that the class can be used by the Spring IoC container as a source of bean definitions</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714589.84"><span class="hljs-meta">@Configuration</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MyAppConfiguration</span> {

    <span class="hljs-comment">// ...</span>

}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714589.84')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Beans are components instances. A method annotated with <code>@Bean</code> will return an object that should be registered as a bean in the Spring application context.</p>
</div>
<div class="paragraph">
<p><code>@Bean</code> is used to explicitly declare a single bean, rather than letting Spring do it automatically as @Component, @Service&#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>In this example we said to Spring that our UserStore object needs a <code>DataStoreConnectionPool</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714589.4084"><span class="hljs-meta">@Configuration</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MyAppConfiguration</span> {

  <span class="hljs-meta">@Bean</span>
  <span class="hljs-keyword">public</span> UserStore <span class="hljs-title function_">userStore</span><span class="hljs-params">(DataStoreConnectionPool connectionPool)</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">UserStore</span>(connectionPool.fetchConnection());
  }

}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714589.4084')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>This way of declaring a bean is used to configure Spring or another library. With these declarations, we can override the default beans configured by Spring.</p>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_add_dependencies">Add dependencies</h3>
<div class="paragraph">
<p>When a class need another object, we use @Autowired to inject them via Spring. You have 2 ways to inject a bean in another</p>
</div>
<div class="paragraph">
<p><strong>Injection by setter</strong></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714589.1218"><span class="hljs-meta">@Component</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AImpl</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">A</span> {

    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">private</span> B b;

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setB</span><span class="hljs-params">(B b)</span> {
        <span class="hljs-built_in">this</span>.b = b;
    }

    <span class="hljs-keyword">public</span> B <span class="hljs-title function_">getB</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> b;
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714589.1218')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p><strong>Injection by constructor</strong></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714589.9565"><span class="hljs-meta">@Component</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AImpl</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">A</span> {

    <span class="hljs-keyword">private</span> B b;

    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">AImpl</span><span class="hljs-params">(B b)</span> {
        <span class="hljs-built_in">this</span>.b = b;
    }

    <span class="hljs-keyword">public</span> B <span class="hljs-title function_">getB</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> b;
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714589.9565')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If you have only one constructor <code>@Autowired</code> is not mandatory for Spring. However, if several constructors are available and there is no primary/default constructor, at least one of the constructors must be annotated with @Autowired in order to instruct the container which one to use.</p>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>You have 2 ways of injecting dependencies into an object but injection by constructor is the one recommended by the community</p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>In this example UserStore and CertificateManager are injected into AuthenticationService</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714590.7627"><span class="hljs-meta">@Service</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AuthenticationService</span> {

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">final</span> UserStore userStore;
  <span class="hljs-keyword">private</span> <span class="hljs-keyword">final</span> CertificateManager certManager;

  <span class="hljs-keyword">public</span> <span class="hljs-title function_">AuthenticationService</span><span class="hljs-params">(UserStore userStore, CertificateManager certManager)</span> {
    <span class="hljs-built_in">this</span>.userStore = userStore;
    <span class="hljs-built_in">this</span>.certManager = certManager;
  }

  <span class="hljs-keyword">public</span> AcccountStatus <span class="hljs-title function_">getAccountStatus</span><span class="hljs-params">(UserAccount account)</span> {
    <span class="hljs-comment">// here we can use the UserStore with this.userStore</span>
  }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714590.7627')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_how_it_works">How it works ?</h3>
<div class="paragraph">
<p>Spring looks for components by scanning your application classpath : looking for annotated classes in the app packages or the beans you’ve declared in your configuration beans.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/spring-intro/appcontext1.png" alt="appcontext1">
</div>
</div>
<div class="paragraph">
<p>All those components are registered in an application context.</p>
</div>
<div class="paragraph">
<p>Spring searches a Bean by its type or else by its name</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/spring-intro/appcontext2.png" alt="appcontext2">
</div>
</div>
<div class="paragraph">
<p>Spring throws a NoSuchBeanDefinitionException if a bean can&#8217;t be found</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/spring-intro/appcontext3.png" alt="appcontext3">
</div>
</div>
<div class="paragraph">
<p>Spring throws a NoUniqueBeanDefinitionException if several beans are found and if it doesn&#8217;t know which bean use</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/spring-intro/appcontext4.png" alt="appcontext4">
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_using_dependency_injection"><span class="icon">[flask&#93;</span> Using Dependency Injection</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_create_a_first_bean">Create a first bean</h3>
<div class="paragraph">
<p>First, let’s create an interface for our application called <code>GreetingService</code> in package <code>com.emse.spring.automacorp.hello</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714590.0916"><span class="hljs-keyword">package</span> com.emse.spring.automacorp.hello;

<span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">GreetingService</span> {

  <span class="hljs-keyword">void</span> <span class="hljs-title function_">greet</span><span class="hljs-params">(String name)</span>;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714590.0916')">Copy</button></pre>
</div>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>Don’t forget to commit periodically your work on Git. If you need more information about Git you can read <a href="https://dev-mind.fr/training/outil/git.html">this course</a>.</p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>Your first job is to output <code>"Hello, Spring!</code> in the console when the application starts.</p>
</div>
<div class="paragraph">
<p>For that, do the following:</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Create in package <code>com.emse.spring.automacorp.hello</code> a class called <code>ConsoleGreetingService</code>. This class has to implement <code>GreetingService</code> interface</p>
</li>
<li>
<p>Mark it as a service with <code>@Service</code> annotation.</p>
</li>
<li>
<p>Implement <em>greet</em> method. This method should write to the console using <code>System.out.println</code>.</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>To check your work you have to create this test in folder <code>src/test</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714590.7432"><span class="hljs-keyword">package</span> com.emse.spring.automacorp.hello;

<span class="hljs-keyword">import</span> org.assertj.core.api.Assertions;
<span class="hljs-keyword">import</span> org.junit.jupiter.api.Test;
<span class="hljs-keyword">import</span> org.junit.jupiter.api.extension.ExtendWith;
<span class="hljs-keyword">import</span> org.springframework.boot.test.system.CapturedOutput;
<span class="hljs-keyword">import</span> org.springframework.boot.test.system.OutputCaptureExtension;

<span class="hljs-meta">@ExtendWith(OutputCaptureExtension.class)</span> <span class="hljs-comment">// (1)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">GreetingServiceTest</span> {

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">testGreeting</span><span class="hljs-params">(CapturedOutput output)</span> {
        <span class="hljs-type">GreetingService</span> <span class="hljs-variable">greetingService</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ConsoleGreetingService</span>(); <span class="hljs-comment">// (2)</span>
        greetingService.greet(<span class="hljs-string">&quot;Spring&quot;</span>);
        Assertions.assertThat(output.getAll()).contains(<span class="hljs-string">&quot;Hello, Spring!&quot;</span>);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714590.7432')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) We load a <a href="https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/test/system/OutputCaptureExtension.html">Junit5 extension</a> to capture output (log generated by your app)</p>
</li>
<li>
<p>(2) We’re testing our service implementation without Spring being involved. We create a new instance of this service with a new</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>You can verify that your implementation is working properly by running  <code>./gradlew test</code> command or by buttons in your IDEA.See this video to see the different solutions</p>
</div>
<div class="videoblock">
<div class="content">
<iframe width="1000" height="500" src="https://www.youtube.com/embed/6FlusTFOmRA?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
<div class="paragraph">
<p>The test source code is valid. If the test execution fails, you have to fix your code.</p>
</div>
</div>
<div class="sect2">
<h3 id="_inject_your_bean">Inject your bean</h3>
<div class="paragraph">
<p>Your second Job is to create a new interface <code>UserService</code> in package <code>com.emse.spring.automacorp.hello</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714590.8376"><span class="hljs-keyword">package</span> com.emse.spring.automacorp.hello;

<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserService</span> {
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">greetAll</span><span class="hljs-params">(List<span class="hljs-meta">@LTString</span><span class="hljs-meta">@GT</span> name)</span>;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714590.8376')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can now</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>create an implementation of this interface called <code>DummyUserService</code></p>
</li>
<li>
<p>Mark it as a service.</p>
</li>
<li>
<p>Inject service <code>GreetingService</code> (use interface and not implementation)</p>
</li>
<li>
<p>Write <code>greetAll</code> method. You have to call <code>greet</code> method of the <code>GreetingService</code> for each name</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>As for the first service, we&#8217;re going to check this new service with a unit test</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714591.2705"><span class="hljs-keyword">package</span> com.emse.spring.automacorp.hello;

<span class="hljs-keyword">import</span> org.assertj.core.api.Assertions;
<span class="hljs-keyword">import</span> org.junit.jupiter.api.Test;
<span class="hljs-keyword">import</span> org.junit.jupiter.api.extension.ExtendWith;
<span class="hljs-keyword">import</span> org.springframework.beans.factory.annotation.Autowired;
<span class="hljs-keyword">import</span> org.springframework.boot.test.system.CapturedOutput;
<span class="hljs-keyword">import</span> org.springframework.boot.test.system.OutputCaptureExtension;
<span class="hljs-keyword">import</span> org.springframework.context.annotation.ComponentScan;
<span class="hljs-keyword">import</span> org.springframework.context.annotation.Configuration;
<span class="hljs-keyword">import</span> org.springframework.test.context.junit.jupiter.SpringExtension;

<span class="hljs-meta">@ExtendWith(OutputCaptureExtension.class)</span>
<span class="hljs-meta">@ExtendWith(SpringExtension.class)</span> <span class="hljs-comment">// (1)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">DummyUserServiceTest</span> {

    <span class="hljs-meta">@Configuration</span> <span class="hljs-comment">// (2)</span>
    <span class="hljs-meta">@ComponentScan(&quot;com.emse.spring.automacorp.hello&quot;)</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">DummyUserServiceTestConfig</span>{}

    <span class="hljs-meta">@Autowired</span> <span class="hljs-comment">// (3)</span>
    <span class="hljs-keyword">public</span> DummyUserService dummyUserService;

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">testGreetingAll</span><span class="hljs-params">(CapturedOutput output)</span> {
        dummyUserService.greetAll(List.of(<span class="hljs-string">&quot;Elodie&quot;</span>, <span class="hljs-string">&quot;Charles&quot;</span>));
        Assertions.assertThat(output).contains(<span class="hljs-string">&quot;Hello, Elodie!&quot;</span>, <span class="hljs-string">&quot;Hello, Charles!&quot;</span>);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714591.2705')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) We use <code>SpringExtension</code> to link our test to Spring. With this annotation a Spring Context will be loaded when this test will run<br></p>
</li>
<li>
<p>(2) We have to configure how the context is loaded. In our case we added <code>@ComponentScan("com.emse.spring.automacorp.hello")</code> to help Spring to found our classes. In our app this scan is made by SpringBoot, but in our test SpringBoot is not loaded <br></p>
</li>
<li>
<p>(3) As our test has is own Spring Context we can inject inside the bean to test</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>You can verify that your implementation is working properly by running <code>./gradlew test</code> command.</p>
</div>
</div>
<div class="sect2">
<h3 id="_inject_your_bean_in_configuration_bean">Inject your bean in configuration bean</h3>
<div class="paragraph">
<p>Now, a new class <code>AutomacorpApplicationConfig</code> in <code>com.emse.spring.automacorp</code> package next <code>AutomacorpApplication</code> class. We want to create a new bean of type <code>CommandLineRunner</code>.</p>
</div>
<div class="paragraph">
<p>CommandLineRunner instances are found by Spring Boot in the Spring context and are executed during the application startup phase.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714591.9678"><span class="hljs-comment">// (1)</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AutomacorpApplicationConfig</span> {

  <span class="hljs-comment">// (2)</span>
  <span class="hljs-keyword">public</span> CommandLineRunner <span class="hljs-title function_">greetingCommandLine</span><span class="hljs-params">()</span> { <span class="hljs-comment">// (3)</span>
    <span class="hljs-keyword">return</span> args <span class="hljs-meta">@LAMBDA</span> {
      <span class="hljs-comment">// (4)</span>
    };
  }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714591.9678')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) First, annotate this class to mark it as a configuration bean</p>
</li>
<li>
<p>(2) Add annotation to say that this method return a new Bean Spring</p>
</li>
<li>
<p>(3) Then, tell Spring that here we need here a <strong>GreetingService</strong> component, by declaring it as a method argument</p>
</li>
<li>
<p>(4) Finally, call here some service method to output the "Hello, Spring!" message at startup; since we’re getting <strong>GreetingService</strong>, no need to instantiate one manually</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Starting your application, you should see something like:</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714591.3662">2023-08-23T19:59:02.183+02:00  INFO 152677 --- [  restartedMain] o.s.b.d.a.OptionalLiveReloadServer       : LiveReload server is running on port 35729
2023-08-23T19:59:02.210+02:00  INFO 152677 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8085 (http) with context path &#x27;&#x27;
2023-08-23T19:59:02.219+02:00  INFO 152677 --- [  restartedMain] c.e.spring.automacorp.AutomacorpApplication  : Started AutomacorpApplication in 1.825 seconds (process running for 2.506)
Hello, Spring!</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714591.3662')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_other_cases">Other cases</h3>
<div class="paragraph">
<p>Now, we’re going to test a few cases to understand how a Spring Application reacts to some situations. For each case, try the suggested modifications, restart your application and see what happens.</p>
</div>
<div class="paragraph">
<p>Of course, after each case, revert those changes, to get "back to normal". (You can use Git for that)</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>What happens if you comment the @Component / @Service annotation on your <em>ConsoleGreetingService</em>?</p>
</li>
<li>
<p>Now, try adding <code>AnotherConsoleGreetingService</code> (which says "Bonjour" instead of "Hello"), marked as a component as well. Try again this time after adding a <strong>@Primary</strong> annotation on <code>ConsoleGreetingService</code>.</p>
</li>
<li>
<p>Finally, try the following - what happens and why?</p>
</li>
</ol>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714591.2104"><span class="hljs-meta">@Service</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ConsoleGreetingService</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">GreetingService</span> {

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">final</span> CycleService cycleService;

  <span class="hljs-meta">@Autowired</span>
  <span class="hljs-keyword">public</span> <span class="hljs-title function_">ConsoleGreetingService</span><span class="hljs-params">(CycleService cycleService)</span> {
    <span class="hljs-built_in">this</span>.cycleService = cycleService;
  }

  <span class="hljs-meta">@Override</span>
  <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">greet</span><span class="hljs-params">(String name)</span> {
    System.out.println(<span class="hljs-string">&quot;Hello, &quot;</span> + name + <span class="hljs-string">&quot;!&quot;</span>);
  }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714591.2104')">Copy</button></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714591.0383"><span class="hljs-meta">@Service</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">CycleService</span> {

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">final</span> ConsoleGreetingService consoleGreetingService;

  <span class="hljs-meta">@Autowired</span>
  <span class="hljs-keyword">public</span> <span class="hljs-title function_">CycleService</span><span class="hljs-params">(ConsoleGreetingService consoleGreetingService)</span> {
    <span class="hljs-built_in">this</span>.consoleGreetingService = consoleGreetingService;
  }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714591.0383')">Copy</button></pre>
</div>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>@Primary is not the only way to resolve multiple candidates, you can also use @Qualifier; check its javadoc to see how you could use it.</p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>More information on @Primary <a href="https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-autowired-annotation-primary">here</a>, and qualifiers <a href="https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-autowired-annotation-qualifiers">here</a>.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Does Spring Framework be only Dependency Injection container? The answer is No.</p>
</div>
<div class="paragraph">
<p>It builds on the core concept of Dependeny Injection but comes with a number of other features (Web, Persistence, etc.) which bring simple abstractions.</p>
</div>
<div class="paragraph">
<p>Aim of these abstractions is to reduce Boilerplate Code and Duplication Code, promoting Loose Coupling of your application architecture.</p>
</div>
</div>
</div>`;