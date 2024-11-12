export const _kotlin_for_java_developer:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_executable_class">Executable class</a></li>
<li><a class="link" fragment="#_types">Types</a></li>
<li><a class="link" fragment="#_immutability">Immutability</a></li>
<li><a class="link" fragment="#_nullability">Nullability</a></li>
<li><a class="link" fragment="#_functions">Functions</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_function_declarations">Function declarations</a></li>
<li><a class="link" fragment="#_default_arguments">Default arguments</a></li>
<li><a class="link" fragment="#_named_arguments">Named arguments</a></li>
</ul>
</li>
<li><a class="link" fragment="#_classes">Classes</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_definition">Definition</a></li>
<li><a class="link" fragment="#_inheritance">Inheritance</a></li>
<li><a class="link" fragment="#_simple_data_object_data_class">Simple data object &amp; data class</a></li>
<li><a class="link" fragment="#_enums">Enums</a></li>
<li><a class="link" fragment="#_interfaces">Interfaces</a></li>
<li><a class="link" fragment="#_inner_class">Inner class</a></li>
</ul>
</li>
<li><a class="link" fragment="#_flask_your_first_project_in_kotlin"><span class="icon">[flask&#93;</span> : Your first project in Kotlin</a></li>
<li><a class="link" fragment="#_function_extension">Function extension</a></li>
<li><a class="link" fragment="#_higher_order_functions">Higher-Order Functions</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_example_in_language">Example in language</a></li>
<li><a class="link" fragment="#_other_example_write_a_dsl_domain_specific_language">Other example : write a DSL (Domain-specific language)</a></li>
</ul>
</li>
<li><a class="link" fragment="#_more">More</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In few words Kotlin is</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>Concise</strong> Drastically reduce the amount of boilerplate code</p>
</li>
<li>
<p><strong>Interoperable</strong> Leverage existing libraries for the JVM, Android, and the browser. You can call Kotlin code in Java or Java code in Kotlin</p>
</li>
<li>
<p><strong>Safe</strong> Kotlin tries to help you reduce errors like null pointer exceptions</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>For several years Java has been trying to catch up with Koltin. Kotlin has allowed a questioning of Java but Java will still take a long time to catch up.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/learn-kotlin.png" alt="Learn Kotlin" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_executable_class">Executable class</h2>
<div class="sectionbody">
<div class="paragraph">
<p>An executable Java class is a class which, when handed over to the JVM, starts its execution at a particular point in the class, the main method.</p>
</div>
<div class="paragraph">
<p>For example</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731447060368.7505"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">HelloWorldApplication</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> {
        <span class="hljs-type">String</span> <span class="hljs-variable">name</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;Guillaume&quot;</span>;
        System.out.println(<span class="hljs-string">&quot;Hello EMSE I am &quot;</span> + name);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060368.7505')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>In IntelliJ you can use the contextual menu (right click) to run this class and see the result in console</p>
</div>
<div class="listingblock">
<div class="content">
<pre>Hello EMSE I am Guillaume</pre>
</div>
</div>
<div class="paragraph">
<p>With Kotlin you can write to produce the same result.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060370.1746"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">main</span><span class="hljs-params">(args: <span class="hljs-type">Array</span>@<span class="hljs-type">LTString</span>@<span class="hljs-type">GT</span>)</span></span> {
    <span class="hljs-keyword">val</span> name = <span class="hljs-string">&quot;Guillaume&quot;</span>
    println(<span class="hljs-string">&quot;Hello EMSE I am @dollar@name&quot;</span>)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060370.1746')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>You can write functions not attached to a class (the compiler will do it for you)</p>
</li>
<li>
<p>The <code>public</code> visibility is the default in Kotlin and therefore no need to define it each time</p>
</li>
<li>
<p>Semicolons are no longer necessary</p>
</li>
<li>
<p>Kotlin does a lot of type inference (the compiler tries to guess which type you are using) and you don&#8217;t need to define the type if the compiler can infer it (example of the name or you don&#8217;t need to specify the type String)</p>
</li>
<li>
<p>You can use String templates and directly access the content of a variable with <code>@dollar@</code></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>If you want to test Kotlin code in your browser you can use <a href="https://play.kotlinlang.org" class="bare">https://play.kotlinlang.org</a></p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_types">Types</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Kotlin use <a href="https://kotlinlang.org/docs/reference/basic-types.html">basic types</a>. The most used are</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Integer numbers : Int (Integer in Java), Long</p>
</li>
<li>
<p>Floating-point number : Double, Float</p>
</li>
<li>
<p>String</p>
</li>
<li>
<p>Boolean</p>
</li>
<li>
<p>Arrays</p>
</li>
<li>
<p>Collections : List, Set, Map&#8230;&#8203;</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_immutability">Immutability</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Kotlin forces you to use immutability when you develop. An immutable object is an object whose state cannot be modified after it is created. It allows you to write safer and cleaner code.</p>
</div>
<div class="paragraph">
<p>When you want to declare a variable you can use the keyword <strong>val</strong>. We did that in our first example</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060371.714"><span class="hljs-keyword">val</span> name = <span class="hljs-string">&quot;Guillaume&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731447060371.714')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>When the value is defined you can&#8217;t update it. With the code below, the compiler will fail with an Error "Val cannot be reassigned".</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060371.089">name = <span class="hljs-string">&quot;Someone else&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731447060371.089')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If you need to reassign the value you can use keyword  <strong>var</strong></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060372.9453"><span class="hljs-keyword">var</span> name = <span class="hljs-string">&quot;Guillaume&quot;</span>
name = <span class="hljs-string">&quot;Someone else&quot;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731447060372.9453')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Collections (List, Set, Map&#8230;&#8203;) are also immutable in Kotlin. The code below will fail because type List is immutable and method add does not exist</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060372.4475"><span class="hljs-keyword">val</span> rooms: <span class="hljs-symbol">List@</span><span class="hljs-symbol">LTRoom@</span>GT = listOf()
rooms.add(Room(<span class="hljs-number">1</span>, <span class="hljs-string">&quot;Room1&quot;</span>))</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060372.4475')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>When you want a mutable collection you have dedicated types</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060373.5176"><span class="hljs-keyword">val</span> rooms: <span class="hljs-symbol">MutableList@</span><span class="hljs-symbol">LTRoom@</span>GT = mutableListOf()
rooms.add(Room(<span class="hljs-number">1</span>, <span class="hljs-string">&quot;Room1&quot;</span>))</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060373.5176')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_nullability">Nullability</h2>
<div class="sectionbody">
<div class="paragraph">
<p>One of the most common pitfalls in many programming languages, including Java, is that accessing a member of a null reference will result in a null reference exception. Kotlin&#8217;s type system is aimed at eliminating the danger of null references from code.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060373.2493"><span class="hljs-keyword">var</span> a: String = <span class="hljs-string">&quot;abc&quot;</span> <span class="hljs-comment">// Regular initialization means non-null by default</span>
a = <span class="hljs-literal">null</span> <span class="hljs-comment">// compilation error</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731447060373.2493')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>In Kotlin, the type system distinguishes between references that can hold null (nullable references) and those that can not (non-null references). To allow nulls, we can declare a variable as nullable string, written <strong>String?</strong>:</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060374.4534"><span class="hljs-keyword">var</span> b: String? = <span class="hljs-string">&quot;abc&quot;</span> <span class="hljs-comment">// can be set null</span>
b = <span class="hljs-literal">null</span> <span class="hljs-comment">// ok</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731447060374.4534')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p><strong>When you want declare a nullable value add ? to the type</strong></p>
</div>
<div class="paragraph">
<p>For more details read this <a href="https://kotlinlang.org/docs/reference/null-safety.html">article</a></p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_functions">Functions</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_function_declarations">Function declarations</h3>
<div class="paragraph">
<p>A function is define with the keyword <strong>fun</strong>. In Kotlin. Arguments args, returned type are always after  For example</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060375.5212"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">double</span><span class="hljs-params">(x: <span class="hljs-type">Int</span>)</span></span>: <span class="hljs-built_in">Int</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span> * x
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060375.5212')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can call this function</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060375.3035"><span class="hljs-keyword">val</span> result = double(<span class="hljs-number">2</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060375.3035')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_default_arguments">Default arguments</h3>
<div class="paragraph">
<p>You can use default argument in Kotlin. For example:</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060376.6978"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">double</span><span class="hljs-params">(x: <span class="hljs-type">Int</span> = <span class="hljs-number">4</span>)</span></span>: <span class="hljs-built_in">Int</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span> * x
}

double(<span class="hljs-number">2</span>) <span class="hljs-comment">// returns 4</span>
double() <span class="hljs-comment">// returns 8 (the default value is applied)</span></code><button class="btn-copy-code" onclick="copyToClipboard('1731447060376.6978')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_named_arguments">Named arguments</h3>
<div class="paragraph">
<p>When calling a function, you can name one or more of its arguments. This may be helpful when a function has a large number of arguments</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060377.8137"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">foo</span><span class="hljs-params">(bar: <span class="hljs-type">Int</span> = <span class="hljs-number">0</span>, baz: <span class="hljs-type">Int</span>)</span></span> : <span class="hljs-built_in">Int</span> { <span class="hljs-comment">/*...*/</span> }
<span class="hljs-keyword">val</span> result = foo(baz = <span class="hljs-number">4</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060377.8137')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_classes">Classes</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_definition">Definition</h3>
<div class="paragraph">
<p>Classes in Kotlin are declared using the keyword <strong>class</strong>. A class in Kotlin can have a primary constructor and one or more secondary constructors. The primary constructor is part of the class header: it goes after the class name (and optional type parameters).</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060379.5298"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span> <span class="hljs-keyword">constructor</span>(firstName: String) { <span class="hljs-comment">/*...*/</span> }</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060379.5298')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If the primary constructor does not have any annotations or visibility modifiers, the constructor keyword can be omitted:</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060380.3481"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span>(firstName: String) { <span class="hljs-comment">/*...*/</span> }</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060380.3481')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_inheritance">Inheritance</h3>
<div class="paragraph">
<p><strong>By default, Kotlin classes are final: they can’t be inherited</strong>. To make a class inheritable, mark it with the open keyword.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060380.0237"><span class="hljs-keyword">open</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Base</span>(p: <span class="hljs-built_in">Int</span>)
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Derived</span>(p: <span class="hljs-built_in">Int</span>) : Base(p)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060380.0237')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>For more detail read this <a href="https://kotlinlang.org/docs/reference/classes.html#inheritance">article</a>.</p>
</div>
</div>
<div class="sect2">
<h3 id="_simple_data_object_data_class">Simple data object &amp; data class</h3>
<div class="paragraph">
<p>We frequently create classes whose main purpose is to hold data. In such a class some standard functionality and utility functions are often mechanically derivable from the data.</p>
</div>
<div class="paragraph">
<p>Example in Java</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731447060383.3987"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowDto</span> {
<span class="hljs-keyword">private</span> Long id;
<span class="hljs-keyword">private</span> String name;
<span class="hljs-keyword">private</span> WindowStatus windowStatus;
<span class="hljs-keyword">private</span> String roomName;
<span class="hljs-keyword">private</span> Long roomId;

    <span class="hljs-keyword">public</span> Long <span class="hljs-title function_">getId</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> id;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setId</span><span class="hljs-params">(Long id)</span> {
        <span class="hljs-built_in">this</span>.id = id;
    }

    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">getName</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> name;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setName</span><span class="hljs-params">(String name)</span> {
        <span class="hljs-built_in">this</span>.name = name;
    }

    <span class="hljs-keyword">public</span> WindowStatus <span class="hljs-title function_">getWindowStatus</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> windowStatus;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setWindowStatus</span><span class="hljs-params">(WindowStatus windowStatus)</span> {
        <span class="hljs-built_in">this</span>.windowStatus = windowStatus;
    }

    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">getRoomName</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> roomName;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setRoomName</span><span class="hljs-params">(String roomName)</span> {
        <span class="hljs-built_in">this</span>.roomName = roomName;
    }

    <span class="hljs-keyword">public</span> Long <span class="hljs-title function_">getRoomId</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> roomId;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setRoomId</span><span class="hljs-params">(Long roomId)</span> {
        <span class="hljs-built_in">this</span>.roomId = roomId;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">boolean</span> <span class="hljs-title function_">equals</span><span class="hljs-params">(Object o)</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">this</span> == o) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">if</span> (o == <span class="hljs-literal">null</span> || getClass() != o.getClass()) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-type">WindowDto</span> <span class="hljs-variable">windowDto</span> <span class="hljs-operator">=</span> (WindowDto) o;
        <span class="hljs-keyword">return</span> Objects.equals(name, windowDto.name) &amp;amp;&amp;amp;
                Objects.equals(roomId, windowDto.roomId);
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">int</span> <span class="hljs-title function_">hashCode</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> Objects.hash(id, name, windowStatus, roomName, roomId);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060383.3987')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>In Kotlin, you can use a <a href="https://kotlinlang.org/docs/reference/data-classes.html">data class</a> to do the same thing</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060385.345"><span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowDto</span>(
    <span class="hljs-keyword">val</span> id: <span class="hljs-built_in">Long</span>,
    <span class="hljs-keyword">val</span> name: String,
    <span class="hljs-keyword">val</span> windowStatus: WindowStatus,
    <span class="hljs-keyword">val</span> roomName: String,
    <span class="hljs-keyword">val</span> roomId: <span class="hljs-built_in">Long</span>
)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060385.345')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The compiler automatically derives the following members from all properties declared in the primary constructor</p>
</div>
<div class="ulist">
<ul>
<li>
<p>equals()/hashCode() functions</p>
</li>
<li>
<p>toString() of the form "WindowDto(id=12, name=Window1, roomName=S12, roomId=23)";</p>
</li>
<li>
<p>copy() to easily copy this data class</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_enums">Enums</h3>
<div class="paragraph">
<p>The most basic usage of enum classes is implementing type-safe enums:</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060385.2896"><span class="hljs-keyword">enum</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Direction</span> {
    NORTH, SOUTH, WEST, EAST
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060385.2896')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_interfaces">Interfaces</h3>
<div class="paragraph">
<p>Interfaces in Kotlin can contain declarations of abstract methods, as well as method implementations. What makes them different from abstract classes is that interfaces cannot store state (they can have properties but these need to be abstract or to provide accessor implementations.)</p>
</div>
<div class="paragraph">
<p>An interface is defined using the keyword <strong>interface</strong></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060386.1565"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">MyInterface</span> {
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">bar</span><span class="hljs-params">()</span></span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span></span> {
        <span class="hljs-comment">// optional body</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060386.1565')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>A class or object can implement one or more interfaces</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060386.2942"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Child</span> : <span class="hljs-type">MyInterface</span> {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">bar</span><span class="hljs-params">()</span></span> {
        <span class="hljs-comment">// body</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060386.2942')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_inner_class">Inner class</h3>
<div class="paragraph">
<p>When you program in Java or Kotlin, you very often use inner classes.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060387.1875"><span class="hljs-keyword">class</span> <span class="hljs-title class_">HelloWorld</span> {

    <span class="hljs-keyword">public</span> String name(){
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;Dev-Mind&quot;</span>;
    }

    <span class="hljs-keyword">class</span> <span class="hljs-title class_">A</span> {
        <span class="hljs-keyword">public</span> void hello(){
            System.<span class="hljs-keyword">out</span>.println(<span class="hljs-string">&quot;Hello world&quot;</span> + name()); <span class="hljs-comment">// Compilation error @ARROW method name() is not visible</span>
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060387.1875')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Inner classes in Java are non-static by default, so you can use the global methods or attributes of the enclosing class in the inner class. For example in our example, class <code>A</code> can use the  <code>name()</code> method.</p>
</div>
<div class="paragraph">
<p>A non-static inner class has a reference to its enclosing class. When ths inner class is no longer in use, the garbage collector cannot do its job and delete it. Indeed the inner class is considered active (used by the internal class). It is not a problem if your app use singletons (Spring). But in the Android world, on a device with limited resources, it&#8217;s more problematic. Especially if we use inner classes in objects which are very often destroyed and rebuilt (activities are deleted and recreated after each configuration change). Many developers get tricked into introducing memory leaks in their applications in this way.</p>
</div>
<div class="paragraph">
<p>In Java to avoid the problem you have to use <code>static inner class</code>. In Kotlin when you create a nested class you do not have access to the variables and methods of the class (equivalent of a static inner class)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060388.1013"><span class="hljs-keyword">class</span> <span class="hljs-title class_">HelloWorld</span> {

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">name</span><span class="hljs-params">()</span></span> = <span class="hljs-string">&quot;Dev-Mind&quot;</span>

    <span class="hljs-keyword">class</span> <span class="hljs-title class_">A</span> {
        <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">hello</span><span class="hljs-params">()</span></span> {
            println(<span class="hljs-string">&quot;Hello world&quot;</span> + name())
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060388.1013')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can still create the equivalent of an inner class using the <code>internal inner class</code> syntax. Once again, the language has chosen to simplify the most common use case.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_your_first_project_in_kotlin"><span class="icon">[flask&#93;</span> : Your first project in Kotlin</h2>
<div class="sectionbody">
<div class="paragraph">
<p>To develop these exercices, you can use IntelliJ, Android or this <a href="https://play.kotlinlang.org/">website</a>.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Create a main function to display the message "Hello Kotlin World" in the console</p>
</li>
<li>
<p>Create a data class to manage your rooms. You should define</p>
<div class="ulist">
<ul>
<li>
<p>a non nullable <code>id</code> of type <code>Long</code></p>
</li>
<li>
<p>a non nullabe <code>name</code> of type <code>String</code></p>
</li>
<li>
<p>a nullabe <code>currentTemperature</code> of type <code>Double</code> with a default value to null</p>
</li>
</ul>
</div>
</li>
<li>
<p>Create an immutable List in your main function with several rooms. If your class is correct the following code will compile</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060389.984"><span class="hljs-keyword">val</span> rooms = listOf(
    RoomDto(<span class="hljs-number">1</span>, <span class="hljs-string">&quot;Room1&quot;</span>),
    RoomDto(<span class="hljs-number">2</span>, <span class="hljs-string">&quot;Room2&quot;</span>, <span class="hljs-number">20.3</span>),
    RoomDto(id = <span class="hljs-number">3</span>, name = <span class="hljs-string">&quot;Room3&quot;</span>, currentTemperature = <span class="hljs-number">20.3</span>),
    RoomDto(<span class="hljs-number">4</span>, <span class="hljs-string">&quot;Room4&quot;</span>, currentTemperature = <span class="hljs-number">19.3</span>),
)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060389.984')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>Display the name of each room in the console. You should use</p>
<div class="ulist">
<ul>
<li>
<p>a <a href="https://kotlinlang.org/docs/collection-transformations.html">map</a> function to extract the name,</p>
</li>
<li>
<p>a <a href="https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.sequences/join-to-string.html">joinToString</a> function to join all the value in a String with a ',' separator</p>
</li>
<li>
<p>a <code>println</code> function to obtain <code>Room1, Room2, Room3, Room4</code> in the console</p>
</li>
</ul>
</div>
</li>
<li>
<p>Filter the rooms with a temperature greater than 20° and display the result in the console. You should obtain  <code>Room4</code></p>
</li>
<li>
<p>Declare a nullable variable called mainRoom in your code. Initialize this value with <code>RoomDto(5, "Room5", currentTemperature = 19.3)</code>. Display in the console currentTemperature of the room  (To compile your code you should use a <code>?</code>)</p>
</li>
<li>
<p>Create a function to compute the number of characters in a room name. This function must have one nullable room as argument.</p>
</li>
</ol>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_function_extension">Function extension</h2>
<div class="sectionbody">
<div class="paragraph">
<p>When we program we use many external libraries, and we do not have control on them. Consider a use case. We have to do statistics by citizen age.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060389.2534"><span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Citizen</span>(<span class="hljs-keyword">val</span> firstname: String,
                   <span class="hljs-keyword">val</span> lastname: String,
                   <span class="hljs-keyword">val</span> sexe: Sexe,
                   <span class="hljs-keyword">val</span> birthdate: LocalDate)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060389.2534')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>To determine the age you can write a function</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060389.2227"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">getAge</span><span class="hljs-params">(date: <span class="hljs-type">LocalDate</span>)</span></span> = LocalDate.now().year - date.year

<span class="hljs-keyword">val</span> barackObama = Citizen(<span class="hljs-string">&quot;Barack&quot;</span>, <span class="hljs-string">&quot;Obama&quot;</span>, Sexe.MALE, LocalDate.parse(<span class="hljs-string">&quot;1961-08-04&quot;</span>))
<span class="hljs-keyword">val</span> barackAge = getAge(barackObama.birthdate)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060389.2227')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>With Kotlin you can also extend the <code>LocalDate</code> class and create a new method (function extension) that will be specific to you and that you can use in your whole project. for example</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060390.3223"><span class="hljs-function"><span class="hljs-keyword">fun</span> LocalDate.<span class="hljs-title">getAge</span><span class="hljs-params">()</span></span> = LocalDate.now().year - <span class="hljs-keyword">this</span>.year

<span class="hljs-comment">// With this function extension you can write</span>
<span class="hljs-keyword">val</span> barackAge = barackObama.birthdate.getAge()</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060390.3223')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Better instead of exposing a function you can expose a property</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060390.1"><span class="hljs-keyword">val</span> LocalDate.age
    <span class="hljs-keyword">get</span>() = LocalDate.now().year - <span class="hljs-keyword">this</span>.year

<span class="hljs-keyword">val</span> barackAge = barackObama.birthdate.age</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060390.1')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_higher_order_functions">Higher-Order Functions</h2>
<div class="sectionbody">
<div class="paragraph">
<p>A higher order function is a function that takes a function as an argument. In this case you don&#8217;t need to pass a lambda when calling the method but you can add an execution block just after the method call</p>
</div>
<div class="paragraph">
<p>Said like that you must be lost and it&#8217;s normal</p>
</div>
<div class="sect2">
<h3 id="_example_in_language">Example in language</h3>
<div class="paragraph">
<p>Kotlin used higher order functions (and extensions) to simplify the use of Java streams</p>
</div>
<div class="listingblock">
<div class="title">kotlin.collections code</div>
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060391.1409"><span class="hljs-keyword">public</span> <span class="hljs-keyword">inline</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> @LTT@GT Iterable@LTT@GT.<span class="hljs-title">find</span><span class="hljs-params">(predicate: (<span class="hljs-type">T</span>) @<span class="hljs-type">LAMBDA</span> <span class="hljs-type">Boolean</span>)</span></span>: T? {
    <span class="hljs-keyword">return</span> firstOrNull(predicate)
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060391.1409')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If we have a collection of speakers we can select the first one with the first name Guillaume via this code</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060391.0059"><span class="hljs-keyword">val</span> guillaume = speakers.firstOrNull {
    it.firstname == <span class="hljs-string">&quot;Guillaume&quot;</span>  <span class="hljs-comment">// it is the current item in the collection</span>
}

<span class="hljs-comment">//  You can also write</span>
<span class="hljs-keyword">val</span> guillaume = speakers.firstOrNull { speaker <span class="hljs-meta">@LAMBDA</span>
    speaker.firstname == <span class="hljs-string">&quot;Guillaume&quot;</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060391.0059')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>To remember in Java equivalent is</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731447060392.0964"><span class="hljs-type">Speaker</span> <span class="hljs-variable">speaker</span> <span class="hljs-operator">=</span> speakers.stream()
                          .filter(s <span class="hljs-meta">@LAMBDA</span> s.getName().equals(<span class="hljs-string">&quot;Guillaume&quot;</span>))
                          .findFirst()
                          .orElse(<span class="hljs-literal">null</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060392.0964')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The Stream Java API is great to use, but the Kotlin collections and extension functions are even nicer.</p>
</div>
</div>
<div class="sect2">
<h3 id="_other_example_write_a_dsl_domain_specific_language">Other example : write a DSL (Domain-specific language)</h3>
<div class="paragraph">
<p>Kotlin is increasingly known for the flexibility it offers to write a DSL with strong typing.</p>
</div>
<div class="paragraph">
<p>An example:</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060393.8901"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Cell</span>(<span class="hljs-keyword">val</span> content: String)

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Row</span>(<span class="hljs-keyword">val</span> cells: <span class="hljs-symbol">MutableList@</span><span class="hljs-symbol">LTCell@</span>GT = mutableListOf()) {
    <span class="hljs-comment">// Define an Higher-Order Function</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">cell</span><span class="hljs-params">(adder: () @<span class="hljs-type">LAMBDA</span> <span class="hljs-type">Cell</span>)</span></span>: Row {
        cells.add(adder())
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
    }
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Table</span>(<span class="hljs-keyword">val</span> rows: <span class="hljs-symbol">MutableList@</span><span class="hljs-symbol">LTRow@</span>GT = mutableListOf()) {
    <span class="hljs-comment">// Define an Higher-Order Function</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">row</span><span class="hljs-params">(adder: () @<span class="hljs-type">LAMBDA</span> <span class="hljs-type">Row</span>)</span></span>: Table {
        rows.add(adder())
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060393.8901')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>In my <code>Table</code> class I added a@backtick@ row@backtick@ function (with a function as argument) which allows to add a row. The same was done in the <code>Row</code> class for a cell. So I can write</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1731447060394.6309"><span class="hljs-keyword">val</span> table = Table()
    .row { Row().cell { Cell(<span class="hljs-string">&quot;Test&quot;</span>) }}
    .row { Row().cell { Cell(<span class="hljs-string">&quot;Test2&quot;</span>) }}</code><button class="btn-copy-code" onclick="copyToClipboard('1731447060394.6309')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_more">More</h2>
<div class="sectionbody">
<div class="paragraph">
<p>This is just an introduction. If you want to become a rock star in Kotlin you can read the official documentation: <a href="https://kotlinlang.org/docs/reference/" class="bare">https://kotlinlang.org/docs/reference/</a></p>
</div>
</div>
</div>`;