export const _unit_test_in_java:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_software_testing">Software testing</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_why_do_we_need_testing">Why do we need testing ?</a></li>
<li><a class="link" fragment="#_why_do_we_need_to_automate_testing">Why do we need to automate testing ?</a></li>
<li><a class="link" fragment="#_what_are_the_different_types_of_tests">What are the different types of tests ?</a></li>
<li><a class="link" fragment="#_how_to_facilitate_the_writing_of_tests">How to facilitate the writing of tests?</a></li>
</ul>
</li>
<li><a class="link" fragment="#_unit_tests">Unit tests</a></li>
<li><a class="link" fragment="#_black_box">Black box</a></li>
<li><a class="link" fragment="#_junit">Junit</a></li>
<li><a class="link" fragment="#_assertions">Assertions</a></li>
<li><a class="link" fragment="#_mockito">Mockito</a></li>
<li><a class="link" fragment="#_flask_unit_tests"><span class="icon">[flask&#93;</span> Unit tests</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In this course you will learn how to write a unit test, how to simulate the collaborator behaviors and how to check the results</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-tests.png" alt="background" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_software_testing">Software testing</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_why_do_we_need_testing">Why do we need testing ?</h3>
<div class="paragraph">
<p>Software testing is very important when you create an application, because it</p>
</div>
<div class="ulist">
<ul>
<li>
<p>checks if the actual results match the expected results</p>
</li>
<li>
<p>helps to identify errors by testing limits</p>
</li>
<li>
<p>helps to not reproduce errors : when a bug occurs, we create a new test case, we fix the bug.. And after each code update, we execute this tests to know if the bug won&#8217;t occur anymore</p>
</li>
<li>
<p>helps to know how your code works : tests are often the best documentation to understand how a piece of source code works</p>
</li>
<li>
<p>helps you be more confident when you need to evolve your code: if you have good code coverage by testing, you will identify regressions quickly</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_why_do_we_need_to_automate_testing">Why do we need to automate testing ?</h3>
<div class="paragraph">
<p>You can test your software manually</p>
</div>
<div class="ulist">
<ul>
<li>
<p>but you have to do that before each feature update</p>
</li>
<li>
<p>and more your application is rich more you need to do more tests</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>The solution is <strong>to have automatic tests</strong> and code them</p>
</div>
<div class="paragraph">
<p>Manual tests are cheaper on short-term but more expensive on long-term</p>
</div>
<div class="paragraph">
<p>Automated tests are expensive on short-term but cheaper on long-term</p>
</div>
<div class="paragraph">
<p>A human will tire when he has to execute the same tests continuously. He will be less conscientious and less attentive. It&#8217;s not the case for a test program</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-test/systemrobot.png" alt="systemrobot" width="800">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_what_are_the_different_types_of_tests">What are the different types of tests ?</h3>
<div class="paragraph">
<p>You have different types of tests</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>Installation testing</strong>: A software is often a set of little apps (web app, spring boot app, datasource&#8230;&#8203;.). This kind of test helps to check if your installation procedure is correct and if the software can be used</p>
</li>
<li>
<p><strong>Security testing</strong>: Checks the security and if your data keep confidential and not available from hackers</p>
</li>
<li>
<p><strong>Performance testing</strong>: to determine how a system or sub-system performs in terms of responsiveness and stability under a particular workload</p>
</li>
<li>
<p><strong>End to end testing</strong>: You test your app as a user. These tests are sometimes called functional tests</p>
</li>
<li>
<p><strong>Unit testing</strong>: We test every units of source code (each class, each methods&#8230;&#8203;).</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_how_to_facilitate_the_writing_of_tests">How to facilitate the writing of tests?</h3>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>If you are having trouble writing tests, <strong>your code can/must be improved</strong>. Good code is easily testable code.</p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>If you want to facilitate your tests you can apply several rules</p>
</div>
<div class="ulist">
<ul>
<li>
<p>use <strong>interface</strong> to define the contract to code and to test.</p>
</li>
<li>
<p>when using an object language, it is easy to distribute responsibilities among several classes. Avoid centralizing all your code in a single service class. The less code a class has, the easier it will be to test.</p>
</li>
<li>
<p>use <strong>dependency injection</strong>. This mechanism helps to use for example</p>
<div class="ulist">
<ul>
<li>
<p>a mock object, to simulate the object behavior in a test and</p>
</li>
<li>
<p>the real implementation in production code</p>
</li>
</ul>
</div>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_unit_tests">Unit tests</h2>
<div class="sectionbody">
<div class="paragraph">
<p>A unit test is a method that instantiates a small portion of your application (one method for example) and checks its behavior independently from other parts.</p>
</div>
<div class="paragraph">
<p>Portion to test, can be viewed as an independent system.We talk about System Under Test (SUT)</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-test/test1.png" alt="test1" width="800">
</div>
</div>
<div class="paragraph">
<p>We are going to take an example with a service interface.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714656.7822"><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">FriendService</span> {
   <span class="hljs-comment">/**
    * Compute friend age from his birth year
    */</span>
   <span class="hljs-type">int</span> <span class="hljs-title function_">computeFriendAge</span><span class="hljs-params">(Friend friend)</span>;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714656.7822')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The service implementation is this one</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714656.004"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">FriendServiceImpl</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">FriendService</span> {
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">int</span> <span class="hljs-title function_">computeFriendAge</span><span class="hljs-params">(Friend friend)</span> {
        <span class="hljs-keyword">if</span>(friend == <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">IllegalArgumentException</span>(<span class="hljs-string">&quot;Friend is required&quot;</span>);
        }
        <span class="hljs-keyword">return</span> LocalDate.now().getYear() - friend.getBirthYear();
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714656.004')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>When you write a test you have to test all the cases. In our example you have to check when the user is null and when a user is defined and has a birth year.</p>
</div>
<div class="paragraph">
<p>In an application this SUT (System Under Test) will interact with other components</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-test/test2.png" alt="test2" width="800">
</div>
</div>
<div class="paragraph">
<p>These other components are called collaborators.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-test/test4.png" alt="test4" width="800">
</div>
</div>
<div class="paragraph">
<p>For example if we change our service</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714656.4565"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">FriendServiceImpl</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">FriendService</span> {

    <span class="hljs-keyword">private</span> FriendRepository friendRepository;
    <span class="hljs-keyword">private</span> IntegerComputer integerComputer;

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">FriendServiceImpl</span><span class="hljs-params">(FriendRepository friendRepository,
                             IntegerComputer integerComputer)</span> {
        <span class="hljs-built_in">this</span>.friendRepository = friendRepository;
        <span class="hljs-built_in">this</span>.integerComputer = integerComputer;
    }


    <span class="hljs-comment">// ...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714656.4565')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p><code>FriendRepository</code> and <code>IntegerComputer</code> are 2 collaborators.</p>
</div>
<div class="paragraph">
<p>When you want to write a test of your SUT, you need to simulate the collaborator behaviors.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-test/test3.png" alt="test3" width="800">
</div>
</div>
<div class="paragraph">
<p>To simulate collabators, you have several possibilities</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>Use a fake object</strong>: You create an object only for your test</p>
</li>
<li>
<p><strong>Use a spy object</strong>: You create a spy from the real implementation of one collaborator. You use a library for that, and you can override the returned values</p>
</li>
<li>
<p><strong>Use a mock object</strong>: A mock is created via a library from a specified contract (an interface). And you can pre preprogram these objects to return your wanted values during the test</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_black_box">Black box</h2>
<div class="sectionbody">
<div class="paragraph">
<p>When you want to write a test you have to consider this SUT (system under test) as a black box.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-test/test6.png" alt="test6" width="800">
</div>
</div>
<div class="paragraph">
<p>The code to test is not important, it&#8217;s the black box&#8230;&#8203; you have to focus on inputs and outputs</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-test/test7.png" alt="test7" width="800">
</div>
</div>
<div class="paragraph">
<p>Your black box can have inputs (method parameters for example) : in your test you will invoke the SUT and you test this one by sending inputs</p>
</div>
<div class="paragraph">
<p>Your black box can return a result or update the system state (we have an output) : in your test you will check the result and assert if this result is equals to the expected behavior</p>
</div>
<div class="paragraph">
<p>When you write you can follow a pattern</p>
</div>
<div class="ulist">
<ul>
<li>
<p>AAA : arrange /act /assert</p>
</li>
<li>
<p>Behavior-Driven Development : Given / When / Then#</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-test/test8.png" alt="test8" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_junit">Junit</h2>
<div class="sectionbody">
<div class="paragraph">
<p><a href="https://junit.org/junit5/">Junit</a> is a framework to develop and execute unit tests in Java. <a href="https://junit.org/junit5/">Junit</a> is used to automate test execution.</p>
</div>
<div class="paragraph">
<p><a href="https://junit.org/junit5/">Junit</a> allows you to separate the source code of the class from the code used to test it.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-test/test9.png" alt="test9" width="600">
</div>
</div>
<div class="paragraph">
<p>Test cases are grouped into Java classes that contain one or more test methods. Test cases can be executed individually or as test suites.</p>
</div>
<div class="paragraph">
<p>These test cases perform the following tasks:</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p><strong>Arrange</strong> : creation of an instance of the class and any other object necessary for the tests (prepare inputs)</p>
</li>
<li>
<p><strong>Act</strong> : call of the method to be tested</p>
</li>
<li>
<p><strong>Assert</strong> : comparison of the expected result with the obtained result (output): in case of failure, an exception is raised</p>
</li>
</ol>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714657.874"><span class="hljs-keyword">package</span> com.devmind.unitests.friend;

<span class="hljs-keyword">import</span> org.junit.jupiter.api.Assertions;
<span class="hljs-keyword">import</span> org.junit.jupiter.api.BeforeEach;
<span class="hljs-keyword">import</span> org.junit.jupiter.api.Test;

<span class="hljs-keyword">import</span> java.time.LocalDate;

<span class="hljs-keyword">class</span> <span class="hljs-title class_">FriendServiceImplTest</span> {

    <span class="hljs-keyword">private</span> FriendService friendService;

    <span class="hljs-meta">@BeforeEach</span> <span class="hljs-comment">// 1.</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">init</span><span class="hljs-params">()</span> {
        friendService = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FriendServiceImpl</span>();
    }

    <span class="hljs-meta">@Test</span> <span class="hljs-comment">// 2.</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">computeFriendAge</span><span class="hljs-params">()</span> {
        <span class="hljs-comment">// Arrange</span>
        <span class="hljs-type">LocalDate</span> <span class="hljs-variable">birthday</span> <span class="hljs-operator">=</span> LocalDate.parse(<span class="hljs-string">&quot;1978-06-09&quot;</span>);
        <span class="hljs-type">Friend</span> <span class="hljs-variable">friend</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Friend</span>(birthday, <span class="hljs-string">&quot;Bellamy&quot;</span>);

        <span class="hljs-comment">// Act</span>
        <span class="hljs-type">int</span> <span class="hljs-variable">age</span> <span class="hljs-operator">=</span> friendService.computeFriendAge(friend);

        <span class="hljs-comment">// Assert</span>
        Assertions.assertEquals(<span class="hljs-number">45</span>, age); <span class="hljs-comment">// 3.</span>
    }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">computeFriendAgeWithNullFriendShouldFail</span><span class="hljs-params">()</span> { <span class="hljs-comment">// 4.</span>
        Assertions.assertThrows(IllegalArgumentException.class, () <span class="hljs-meta">@LAMBDA</span> friendService.computeFriendAge(<span class="hljs-literal">null</span>));
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714657.874')">Copy</button></pre>
</div>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Method annotated with @BeforeEach is executed before each tests (a @AfterEach exists)</p>
</li>
<li>
<p>Method annotated with @Test is a unit test method. We write a method for each test case</p>
</li>
<li>
<p>We use Assertions object provided by Junit to write assertions. Later we will use the object of another library, assertJ</p>
</li>
<li>
<p>We expect an exception when friend is null. It&#8217;s important to use an explicit test method name</p>
</li>
</ol>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_assertions">Assertions</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Assertions methods provided by Junit are not very readable. We prefer to use the <a href="https://assertj.github.io/doc/">AssertJ</a> library</p>
</div>
<div class="paragraph">
<p><a href="https://assertj.github.io/doc/">AssertJ</a> provides a fluent API and with this API you always use the method <code>asserThat</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714657.7705">Assertions.assertThat(age).isEqualTo(<span class="hljs-number">45</span>);
Assertions.assertThat(name).isEqualTo(<span class="hljs-string">&quot;Bellamy&quot;</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714657.7705')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>With assertJ you can test the exception thrown by a method, its type, its message</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714657.1304">Assertions.assertThatThrownBy(() <span class="hljs-meta">@LAMBDA</span> friendService.computeFriendAge(<span class="hljs-literal">null</span>))
                .isExactlyInstanceOf(IllegalArgumentException.class)
                .hasMessage(<span class="hljs-string">&quot;Friend is required&quot;</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714657.1304')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If your expected result is a list of friends</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714657.8757">List<span class="hljs-meta">@LTFriend</span><span class="hljs-meta">@GT</span> myFriends = Arrays.asList(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">Friend</span>(<span class="hljs-string">&quot;Elodie&quot;</span>, <span class="hljs-number">1999</span>),
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">Friend</span>(<span class="hljs-string">&quot;Charles&quot;</span>, <span class="hljs-number">2001</span>));</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714657.8757')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>you can check the content of this list</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714657.5613">Assertions.assertThat(myFriends)
                  .hasSize(<span class="hljs-number">2</span>)
                  .extracting(Friend::getName)
                  .containsExactlyInAnyOrder(<span class="hljs-string">&quot;Elodie&quot;</span>, <span class="hljs-string">&quot;Charles&quot;</span>);

Assertions.assertThat(myFriends)
          .hasSize(<span class="hljs-number">2</span>)
          .extracting(Friend::getName, Friend::getBirthYear)
          .containsExactlyInAnyOrder(
                  Tuple.tuple(<span class="hljs-string">&quot;Elodie&quot;</span>, <span class="hljs-number">1999</span>),
                  Tuple.tuple(<span class="hljs-string">&quot;Charles&quot;</span>, <span class="hljs-number">2001</span>));</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714657.5613')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>AssertJ is IDE friendly and its fluent API can be discovered by completion</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/unit-test/assertj-completion.png" alt="assertj completion">
</div>
</div>
<div class="paragraph">
<p>You can find more informations on the official website <a href="https://assertj.github.io/doc/" class="bare">https://assertj.github.io/doc/</a></p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_mockito">Mockito</h2>
<div class="sectionbody">
<div class="paragraph">
<p>We will use <a href="https://static.javadoc.io/org.mockito/mockito-core/2.23.0/org/mockito/Mockito.html">Mockito</a> to simulate collaborators behaviors.</p>
</div>
<div class="paragraph">
<p><a href="https://static.javadoc.io/org.mockito/mockito-core/2.23.0/org/mockito/Mockito.html">Mockito</a> is a popular mock framework which can be used in conjunction with JUnit.</p>
</div>
<div class="paragraph">
<p><a href="https://static.javadoc.io/org.mockito/mockito-core/2.23.0/org/mockito/Mockito.html">Mockito</a> allows you to create and configure mock objects. Using Mockito simplifies the development of tests for classes with external dependencies significantly.</p>
</div>
<div class="paragraph">
<p>Our <code>FriendServiceImpl</code> will use a collaborator to manage the friends <code>friendRepository</code>.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714658.913"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">FriendServiceImpl</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">FriendService</span> {

    <span class="hljs-keyword">private</span> FriendRepository friendRepository; <span class="hljs-comment">// 1.</span>

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">FriendServiceImpl</span><span class="hljs-params">(FriendRepository friendRepository)</span> { <span class="hljs-comment">// 2.</span>
        <span class="hljs-built_in">this</span>.friendRepository = friendRepository;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">double</span> <span class="hljs-title function_">computeFriendAgeAverage</span><span class="hljs-params">()</span> {
        List<span class="hljs-meta">@LTFriend</span><span class="hljs-meta">@GT</span> friends = friendRepository.findAll();
        <span class="hljs-keyword">return</span> friends.stream().collect(Collectors.averagingInt(<span class="hljs-built_in">this</span>::computeFriendAge));
    }

    <span class="hljs-comment">// ...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714658.913')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>In this code we use <code>friendRepository</code>. You have to declare it as a property (1), and declare a constructor to inject an implementation (2)</p>
</div>
<div class="paragraph">
<p>In <code>FriendServiceImplTest</code> we will use Mockito to simulate <code>FriendRepository</code> and create the class to test <code>FriendServiceImpl</code></p>
</div>
<div style="page-break-after: always;"></div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714658.87"><span class="hljs-meta">@ExtendWith(MockitoExtension.class)</span> <span class="hljs-comment">// 1.</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">FriendServiceTest</span> {

    <span class="hljs-meta">@Mock</span> <span class="hljs-comment">// 2.</span>
    <span class="hljs-keyword">private</span> FriendRepository friendRepository;
    <span class="hljs-keyword">private</span> FriendService friendService;

    <span class="hljs-meta">@BeforeEach</span>
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">init</span><span class="hljs-params">()</span> { <span class="hljs-comment">// 3.</span>
        friendService = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FriendServiceImpl</span>(friendRepository);
    }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">computeFriendAgeAverage</span><span class="hljs-params">()</span> {
        <span class="hljs-comment">// Arrange</span>
        List<span class="hljs-meta">@LTFriend</span><span class="hljs-meta">@GT</span> myFriends = List.of(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">Friend</span>(<span class="hljs-string">&quot;Elodie&quot;</span>, LocalDate.of(<span class="hljs-number">1999</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>)),
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">Friend</span>(<span class="hljs-string">&quot;Charles&quot;</span>, LocalDate.of(<span class="hljs-number">2001</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>))
        );
        Mockito.when(friendRepository.findAll()).thenReturn(myFriends); <span class="hljs-comment">// 4.</span>

        <span class="hljs-comment">// Act</span>
        <span class="hljs-type">double</span> <span class="hljs-variable">average</span> <span class="hljs-operator">=</span> friendService.computeFriendAgeAverage(); <span class="hljs-comment">// 5.</span>

        <span class="hljs-comment">// Assert</span>
        Assertions.assertThat(average).isEqualTo(<span class="hljs-number">22.0</span>);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714658.87')">Copy</button></pre>
</div>
</div>
<div style="page-break-after: always;"></div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>We use <code>MockitoExtension</code>. This extension is able to manage annotations <code>@Mock</code></p>
</li>
<li>
<p>Property annotated with <code>@Mock</code> will be generated by Mockito. Mockito create a mock (each collaborator have to be defined as mocks). You can define a mock behavior on a test</p>
</li>
<li>
<p>We use an init method to create the class to test and inject inside the mocks</p>
</li>
<li>
<p>You can define the mock object behavior in your test. Here, we want the mock will return a list of friends</p>
</li>
<li>
<p>You can call your SUT and check the result</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>Mockito allows to configure the returned values. If you don&#8217;t specify the mock behavior, the mock will return</p>
</div>
<div class="ulist">
<ul>
<li>
<p>null for objects</p>
</li>
<li>
<p>0 for numbers</p>
</li>
<li>
<p>false for boolean</p>
</li>
<li>
<p>empty collections for collections</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>You can also return an exception in place of a value. For example</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714659.7883">Mockito.when(friendRepository.findAll()).thenThrow(<span class="hljs-keyword">new</span> <span class="hljs-title class_">IllegalArgumentException</span>(<span class="hljs-string">&quot;Error&quot;</span>));</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714659.7883')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>I won&#8217;t talk about several features of Mockito, but you can read the official documentation to know how</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p><a href="https://static.javadoc.io/org.mockito/mockito-core/2.23.0/org/mockito/Mockito.html#13">Create a Spy</a> a real object and override its behavior</p>
</li>
<li>
<p><a href="https://static.javadoc.io/org.mockito/mockito-core/2.23.0/org/mockito/Mockito.html#4">Verify</a> that a mock was called (it&#8217;s sometimes usefull when you want to check if a void method was called)</p>
</li>
<li>
<p>other use cases on <a href="https://static.javadoc.io/org.mockito/mockito-core/2.23.0/org/mockito/Mockito.html" class="bare">https://static.javadoc.io/org.mockito/mockito-core/2.23.0/org/mockito/Mockito.html</a></p>
</li>
</ol>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_unit_tests"><span class="icon">[flask&#93;</span> Unit tests</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Use Git to clone the following project in a folder in your workspace. Use a terminal and launch this command if you use basic auth in Github</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714659.1262">git clone https://github.com/Dev-Mind/unitTestInAction.git</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714659.1262')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If you use a SSH key launch</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1734011714659.985">git clone git@github.com:Dev-Mind/unitTestInAction.git</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714659.985')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>This project is a <a href="https://dev-mind.fr/training/gradle/gradle.html">Gradle</a> project. You can open it in IntelliJ and configure it as we explained in the last course lecture.</p>
</div>
<div class="paragraph">
<p>In this lab we want to create a class to test the <code>FriendService</code> contract. Open the interface <code>FriendService</code> and its implementation <code>FriendServiceImpl</code>.</p>
</div>
<div class="paragraph">
<p>This service use a collaborator to load the friend list. This collaborator is <code>FriendRepository</code> and for the moment we have no implementation for this class. It&#8217;s not a problem to write a test, because as this collaborator is injected via a constructor and as we know the collaborator contract, we will use Mockito to inject a mock object in place of the real one in the class to test.</p>
</div>
<div class="paragraph">
<p>We&#8217;re going to update the Gradle configuration to load libraries needed to write the tests.</p>
</div>
<div class="paragraph">
<p>Open the file <code>build.gradle.kts</code> and add these dependencies</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1734011714659.8892">dependencies {
    implementation(<span class="hljs-string">&quot;org.springframework:spring-context-support:6.0.11&quot;</span>)
    testImplementation(<span class="hljs-string">&quot;org.junit.jupiter:junit-jupiter-api:5.10.0&quot;</span>)
    testRuntimeOnly(<span class="hljs-string">&quot;org.junit.jupiter:junit-jupiter-engine:5.10.0&quot;</span>)
    testImplementation(<span class="hljs-string">&quot;org.mockito:mockito-junit-jupiter:5.4.0&quot;</span>)
    testImplementation(<span class="hljs-string">&quot;org.assertj:assertj-core:3.24.2&quot;</span>)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714659.8892')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You need to refresh your project to update the dependencies in IntelliJ. You can click on the button which appears in your file <code>build.gradle.kts</code> when your Gradle synchronisation is not up to date.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-test/refresh_gradle1.png" alt="refresh gradle1" width="600">
</div>
</div>
<div class="paragraph">
<p>Or you can open the Gradle tab in IntelliJ to reload the configuration</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-test/refresh_gradle2.png" alt="refresh gradle2" width="600">
</div>
</div>
<div class="paragraph">
<p>Go on <code>FriendServiceImpl</code> and generate a test class with <code>Ctrl</code> + <code>Shift</code> + <code>T</code></p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/unit-test/generate-test.png" alt="generate test" width="600">
</div>
</div>
<div class="paragraph">
<p>Write the tests to check the methods <code>computeFriendAge</code> and <code>computeFriendAgeAverage</code>. You can read the previous chapter to know how to do that. The main steps are these ones</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Add an annotation <code>@ExtendWith(MockitoExtension.class)</code> to be able to use the Mockito injection</p>
</li>
<li>
<p>Declare 2 properties of type <code>FriendRepository</code> (mocked dependency) and <code>FriendService</code> (class to test)</p>
</li>
<li>
<p>In <code>@BeforeEach</code> block, create <code>FriendService</code> and inject the mock of <code>FriendRepository</code></p>
</li>
<li>
<p>Write a unit test method to compute your age.For that use the pattern AAA</p>
<div class="ulist">
<ul>
<li>
<p>Arrange &#8658; define a Friend object with your firstname and your birthYear</p>
</li>
<li>
<p>Act &#8658; call the method <code>computeFriendAge</code></p>
</li>
<li>
<p>Assert &#8658; check that the result is equal to your age</p>
</li>
</ul>
</div>
</li>
<li>
<p>Don&#8217;t forget to add the <code>@Test</code> annotation on the method</p>
</li>
<li>
<p>Execute test (red means fail and green means pass)</p>
</li>
<li>
<p>Write a second test and verify the exception thrown when you call computeFriendAge with a null friend</p>
</li>
<li>
<p>Use now Mockito to simulate the <code>FriendRepository</code> behavior and write a test to check <code>computeFriendAgeAverage</code> method.</p>
</li>
<li>
<p>Create a new test to check <code>computeFriendAgeAverage</code> behavior when <code>FriendRepository</code> returns a an empty list of friends.</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>What happens ?</p>
</div>
<div class="paragraph">
<p>Writing tests help to fix problems. Fix the code of <code>computeFriendAgeAverage</code> and return 0 when the list is empty. You can now fix your test</p>
</div>
</div>
</div>`;