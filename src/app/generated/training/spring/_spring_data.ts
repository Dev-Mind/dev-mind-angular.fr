export const _spring_data:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_database">Database</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_java_api">Java API</a></li>
<li><a class="link" fragment="#_database_2">Database</a></li>
<li><a class="link" fragment="#_flask_database_and_sql"><span class="icon">[flask&#93;</span> Database and SQL</a></li>
</ul>
</li>
<li><a class="link" fragment="#_java_and_jdbc">Java and JDBC</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_open_a_connection">Open a connection</a></li>
<li><a class="link" fragment="#_execute_a_request">Execute a request</a></li>
<li><a class="link" fragment="#_transaction">Transaction</a></li>
</ul>
</li>
<li><a class="link" fragment="#_jpa">JPA</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_jpa_entity">JPA Entity</a></li>
<li><a class="link" fragment="#_entity_manager">Entity manager</a></li>
<li><a class="link" fragment="#_transaction_and_spring">Transaction and Spring</a></li>
<li><a class="link" fragment="#_schema_generation">Schema generation</a></li>
</ul>
</li>
<li><a class="link" fragment="#_jpa_and_association_mappings">JPA and association mappings</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_onetoone">@OneToOne</a></li>
<li><a class="link" fragment="#_onetomany">@OneToMany</a></li>
<li><a class="link" fragment="#_manytoone">@ManyToOne</a></li>
<li><a class="link" fragment="#_onetomany_manytoone">@OneToMany @ManyToOne</a></li>
<li><a class="link" fragment="#_manytomany">@ManyToMany</a></li>
<li><a class="link" fragment="#_fetching_strategy">Fetching Strategy</a></li>
</ul>
</li>
<li><a class="link" fragment="#_jpql">JPQL</a></li>
<li><a class="link" fragment="#_data_access_object_dao">Data Access Object (DAO)</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_spring_data_jpa">Spring Data JPA</a></li>
<li><a class="link" fragment="#_custom_dao">Custom DAO</a></li>
</ul>
</li>
<li><a class="link" fragment="#_flask_jpa"><span class="icon">[flask&#93;</span> : JPA</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_entity_creation">Entity creation</a></li>
<li><a class="link" fragment="#_populate_data">Populate data</a></li>
<li><a class="link" fragment="#_dao_creation">Dao creation</a></li>
</ul>
</li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>How use a database in your project ? We will add <a href="https://docs.spring.io/spring-data/commons/docs/2.5.4/reference/html/#reference">Spring Data</a> in our project to automatically configure Hibernate as JPA implementation and a H2 database.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-data.png" alt="spring data" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_database">Database</h2>
<div class="sectionbody">
<div class="paragraph">
<p>An application needs access to data, write data, update these data &#8230;&#8203;</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/app-data.png" alt="app data" width="900">
</div>
</div>
<div class="paragraph">
<p>Today we can access a multitude of data sources &#8230;&#8203; and Spring will help us</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/app-data2.png" alt="app data2" width="900">
</div>
</div>
<div class="sect2">
<h3 id="_java_api">Java API</h3>
<div class="paragraph">
<p>Java language provides different API to communicate with a database</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>a low level standard : <strong>JDBC</strong> (Java Database Connectivity) to connect to a database and launch SQL requests</p>
</li>
<li>
<p>an API, <strong>JPA</strong> (Java Persistence API) to manage entities and relationships between them.</p>
</li>
<li>
<p>an API, <strong>JTA</strong> (Java Transaction API) to manage transactions</p>
</li>
</ol>
</div>
</div>
<div class="sect2">
<h3 id="_database_2">Database</h3>
<div class="paragraph">
<p>Each database editor provides its driver (a jar added to your project). A DBMS (DataBase Management System) helps to define, store, retrieve, and manage the data within a database.</p>
</div>
<div class="paragraph">
<p>For a relational database, the driver implements the JDBC API.</p>
</div>
<div class="paragraph">
<p>In our tests we will use a database written in Java, the H2 database</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/h2-logo.png" alt="h2 logo" width="150px">
</div>
</div>
<div class="paragraph">
<p>I choose this database for different reasons.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Open source, JDBC driver</p>
</li>
<li>
<p>Embedded database you can embed the database in your Spring application</p>
</li>
<li>
<p>In memory database (perfect for tests)</p>
</li>
<li>
<p>Browser based Console application</p>
</li>
<li>
<p>Small footprint</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_flask_database_and_sql"><span class="icon">[flask&#93;</span> Database and SQL</h3>
<div class="paragraph">
<p>Go in your <code>AutomacorpApplication</code>. We need to add new Spring Boot starters and the H2 driver in the declared dependencies.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy" id="1734011714534.3599">implementation(<span class="hljs-string">&quot;org.springframework.boot:spring-boot-starter-data-jpa&quot;</span>) <span class="hljs-comment">// libs to use JPA in your project</span>
implementation(<span class="hljs-string">&quot;com.h2database:h2&quot;</span>) <span class="hljs-comment">// libs to use a H2 database</span></code><button class="btn-copy-code" onclick="copyToClipboard('1734011714534.3599')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Check your <code>build.gradle.kts</code> file and update it. Reload your Gradle project to apply changes. You can use the button <span class="image"><img src="../../img/training/spring-data/refresh-gradle-btn1.png" alt="refresh gradle btn1" width="48"></span> displayed when your Gradle config is updated. Or you can use the button <span class="image"><img src="../../img/training/spring-data/refresh-gradle-btn2.png" alt="refresh gradle btn2" width="40"></span> displayed in the Gradle view.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-data/refresh-gradle.png" alt="refresh gradle">
</div>
</div>
<div class="paragraph">
<p>Spring Boot analyses jars defined in classpath and Spring is able to auto-configure features as the database, the H2 console&#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>Add some properties in file <code>src/main/resources/application.properties</code> to customize your H2 database (database will be recreated after each app reload)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-properties" id="1734011714534.0361"><span class="hljs-comment"># Spring boot : configure H2 datasource</span>
<span class="hljs-attr">spring.datasource.url</span>=<span class="hljs-string">jdbc:h2:mem:automacorp;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE</span>
<span class="hljs-attr">spring.datasource.username</span>=<span class="hljs-string">sa</span>
<span class="hljs-attr">spring.datasource.password</span>=<span class="hljs-string"></span>
<span class="hljs-attr">spring.datasource.driverClassName</span>=<span class="hljs-string">org.h2.Driver</span>
<span class="hljs-comment">
# Spring boot : activate H2 console</span>
<span class="hljs-attr">spring.h2.console.enabled</span>=<span class="hljs-string">true</span>
<span class="hljs-attr">spring.h2.console.path</span>=<span class="hljs-string">/console</span></code><button class="btn-copy-code" onclick="copyToClipboard('1734011714534.0361')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>To verify that everything is fine, launch your app and open this URL in your browser: <a href="http://localhost:8080/console" class="bare">http://localhost:8080/console</a></p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/spring-intro/h2-console0.png" alt="h2 console0" width="500">
</div>
</div>
<div class="paragraph">
<p><strong>Use JDBC URL, user, password defined in your @backtick@application.properties</strong> and click on <strong>Connect</strong> button.</p>
</div>
<div class="paragraph">
<p>You should access to the console</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/spring-intro/h2-console.png" alt="h2 console">
</div>
</div>
<div class="paragraph">
<p>You can execute several SQL orders</p>
</div>
<div class="ulist">
<ul>
<li>
<p>SQL order to create a table. Each table must have a primary key. In this example it will be the column id. We use  <code>auto_increment</code> option to let the database increment the id when a new line is inserted</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-sql" id="1734011714537.1973"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> ROOM(ID <span class="hljs-type">BIGINT</span> auto_increment <span class="hljs-keyword">PRIMARY</span> KEY, NAME <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">NULL</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714537.1973')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>SQL order to insert data in this table</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-sql" id="1734011714537.9932"><span class="hljs-comment">-- Let the database generate an id (a positive value)</span>
<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> ROOM(NAME) <span class="hljs-keyword">VALUES</span>(<span class="hljs-string">&#x27;Room1&#x27;</span>);
<span class="hljs-comment">-- You can force an id (we use here a negative value to be sure to not have a conflict with a generated value)</span>
<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> ROOM(ID, NAME) <span class="hljs-keyword">VALUES</span>(<span class="hljs-number">-10</span>, <span class="hljs-string">&#x27;Room2&#x27;</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714537.9932')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>SQL order to select these data</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-sql" id="1734011714538.2427"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> ROOM;</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714538.2427')">Copy</button></pre>
</div>
</div>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_java_and_jdbc">Java and JDBC</h2>
<div class="sectionbody">
<div class="paragraph">
<p>To understand the value of Spring and JPA, it is important to see the code that would have to be done if we wanted to directly use the JDBC API which is a low level API requiring a lot of code.</p>
</div>
<div class="sect2">
<h3 id="_open_a_connection">Open a connection</h3>
<div class="paragraph">
<p>This code open a database connection in Java with JDBC API</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><span class="hljs-keyword">try</span> {
  <span class="hljs-title class_">Class</span>.<span class="hljs-title function_">forName</span>(<span class="hljs-string">&quot;org.h2.Drive&quot;</span>); <span class="hljs-comment">// (1)</span>
}
<span class="hljs-keyword">catch</span> (<span class="hljs-title class_">ClassNotFoundException</span> e) {
  logger.<span class="hljs-title function_">error</span>(<span class="hljs-string">&quot;Unable to load JDBC Driver&quot;</span>, e);
}
<span class="hljs-keyword">try</span> {
  <span class="hljs-title class_">String</span> database_url = <span class="hljs-string">&quot;jdbc:h2:mem:bigcorp;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE&quot;</span>; <span class="hljs-comment">// (2)</span>
  <span class="hljs-title class_">Connection</span> connection = <span class="hljs-title class_">DriverManager</span>.<span class="hljs-title function_">getConnection</span>(database_url, username, password); <span class="hljs-comment">// (3)</span>
}
<span class="hljs-keyword">catch</span> (<span class="hljs-title class_">SQLException</span> e) {
  logger.<span class="hljs-title function_">error</span>(<span class="hljs-string">&quot;Unable to connect to the database&quot;</span>, e);
}</pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) Load JDBC driver (here H2 driver)</p>
</li>
<li>
<p>(2) We define the URL to access to the database (here we say that we use a H2 database in memory)<br></p>
</li>
<li>
<p>(3) Open a connection with username/password</p>
</li>
<li>
<p>(1) (2) (3) for each step we have to manage exceptions</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>This operation is slow. If you have thousands connections on your app per second your application will fail.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/pool0.png" alt="pool0" width="850">
</div>
</div>
<div class="paragraph">
<p>To prevent this problem, we use a connection pool with pre-opened connections. Several connections are opened when the pool is launched.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/pool1.png" alt="pool1" width="850">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_execute_a_request">Execute a request</h3>
<div class="paragraph">
<p>With JDBC you need to write a lot of code when you want to execute a request. For example</p>
</div>
<div class="paragraph">
<p><strong>For an insert</strong></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight">public <span class="hljs-keyword">void</span> <span class="hljs-title function_">insertSite</span>(<span class="hljs-params">Site site</span>) {
    <span class="hljs-title function_">try</span>(<span class="hljs-params">Connection conn = dataSource.getConnection()</span>){
        <span class="hljs-title class_">String</span> sql = <span class="hljs-string">&quot;insert into SITE (id, name) values (?, ?)&quot;</span>;
        <span class="hljs-title function_">try</span>(<span class="hljs-params">PreparedStatement stmt = conn.prepareStatement(sql)</span>){
          stmt.<span class="hljs-title function_">setString</span>(<span class="hljs-number">1</span>, site.<span class="hljs-title function_">getId</span>());
          stmt.<span class="hljs-title function_">setString</span>(<span class="hljs-number">2</span>, site.<span class="hljs-title function_">getName</span>());
          stmt.<span class="hljs-title function_">executeUpdate</span>();
        }
    }
    <span class="hljs-keyword">catch</span>(<span class="hljs-title class_">SQLException</span> e) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">DatabaseException</span>(<span class="hljs-string">&quot;Impossible to insert site &quot;</span> +
            site.<span class="hljs-title function_">getName</span>(), e);
    }
}</pre>
</div>
</div>
<div class="paragraph">
<p><strong>For a select</strong></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight">public <span class="hljs-title class_">List</span>@<span class="hljs-title class_">LTSite</span>@<span class="hljs-variable constant_">GT</span> <span class="hljs-title function_">findAll</span>(<span class="hljs-params"></span>) {
    <span class="hljs-title class_">List</span>@<span class="hljs-title class_">LTSite</span>@<span class="hljs-variable constant_">GT</span> sites = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>@<span class="hljs-variable constant_">LT</span>@<span class="hljs-title function_">GT</span>();
    <span class="hljs-title function_">try</span>(<span class="hljs-params">Connection conn = dataSource.getConnection()</span>){
        <span class="hljs-title class_">String</span> sql = <span class="hljs-string">&quot;select id, name from SITE&quot;</span>;
        <span class="hljs-title function_">try</span>(<span class="hljs-params">PreparedStatement stmt = conn.prepareStatement(sql)</span>){
            <span class="hljs-keyword">try</span> (<span class="hljs-title class_">ResultSet</span> resultSet = stmt.<span class="hljs-title function_">executeQuery</span>()) {
                <span class="hljs-keyword">while</span>(resultSet.<span class="hljs-title function_">next</span>()) {
                    <span class="hljs-title class_">Site</span> s = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Site</span>(resultSet.<span class="hljs-title function_">getString</span>(<span class="hljs-string">&quot;name&quot;</span>));
                    s.<span class="hljs-title function_">setId</span>(resultSet.<span class="hljs-title function_">getString</span>(<span class="hljs-string">&quot;id&quot;</span>));
                    sites.<span class="hljs-title function_">add</span>(s);
                }
            }
        }
    }
    <span class="hljs-keyword">catch</span>(<span class="hljs-title class_">SQLException</span> e) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">DatabaseException</span>(<span class="hljs-string">&quot;Impossible to read sites&quot;</span>, e);
    }
    <span class="hljs-keyword">return</span> sites;
}</pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>The code is heavy and difficult to read</p>
</li>
<li>
<p>We need to manipulate data types in SQL and in our Java entities</p>
</li>
<li>
<p>We manipulate SQL while we are in an object language</p>
</li>
<li>
<p>We would like to be more productive, simplified relationship management&#8230;&#8203;</p>
</li>
<li>
<p>What about transactions?</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_transaction">Transaction</h3>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/transaction1.png" alt="transaction1" width="850">
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>What happens if a query fails, or if an exception occurs?</p>
</li>
<li>
<p>What happens if 2 requests run in parallel?</p>
</li>
<li>
<p>What happens if a request is too long?</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>The solution is to work in a transaction. A database transaction symbolizes a unit of work performed within a database. A transaction generally represents any change in a database. Transactions have two main purposes:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>to provide reliable units of work that allow correct recovery from failures and keep a database consistent even in cases of system failure, when execution stops (completely or partially) and many operations upon a database remain uncompleted, with unclear status.</p>
</li>
<li>
<p>To provide isolation between concurrent accesses. If this isolation is not provided, data could be erroneous.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>We can try to use a transaction in our code</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight">public <span class="hljs-keyword">void</span> <span class="hljs-title function_">insertSite</span>(<span class="hljs-params">Site site</span>) {
        <span class="hljs-title function_">try</span>(<span class="hljs-params">Connection conn = dataSource.getConnection()</span>){
            conn.<span class="hljs-title function_">setAutoCommit</span>(<span class="hljs-literal">false</span>); <span class="hljs-comment">// 1.</span>
            <span class="hljs-title class_">String</span> sql = <span class="hljs-string">&quot;insert into SITE (id, name) values (?, ?)&quot;</span>;

            <span class="hljs-title function_">try</span>(<span class="hljs-params">PreparedStatement stmt = conn.prepareStatement(sql)</span>){
                stmt.<span class="hljs-title function_">setString</span>(<span class="hljs-number">1</span>, site.<span class="hljs-title function_">getId</span>());
                stmt.<span class="hljs-title function_">setString</span>(<span class="hljs-number">2</span>, <span class="hljs-string">&quot;toto&quot;</span>);
                stmt.<span class="hljs-title function_">executeUpdate</span>();
                conn.<span class="hljs-title function_">commit</span>(); <span class="hljs-comment">// 2.</span>
            }
            <span class="hljs-keyword">catch</span>(<span class="hljs-title class_">SQLException</span> e) {
                conn.<span class="hljs-title function_">rollback</span>(); <span class="hljs-comment">// 3.</span>
                <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">DatabaseException</span>(<span class="hljs-string">&quot;Impossible insérer site &quot;</span> + site.<span class="hljs-title function_">getName</span>(), e);
            }
        }
        <span class="hljs-keyword">catch</span>(<span class="hljs-title class_">SQLException</span> e) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">DatabaseException</span>(<span class="hljs-string">&quot;Impossible insérer site &quot;</span> + site.<span class="hljs-title function_">getName</span>(), e);
        }
    }</pre>
</div>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p><code>autocommit</code> is sometimes the default value. We have to disabled it</p>
</li>
<li>
<p>If everything is OK a <strong>commit</strong> persist data</p>
</li>
<li>
<p>If we have an error everything is cancelled by a <strong>rollback</strong>.</p>
</li>
</ol>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/transaction2.png" alt="transaction2" width="850">
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_jpa">JPA</h2>
<div class="sectionbody">
<div class="paragraph">
<p>The Java Persistence API (JPA) is a Java application programming interface specification that describes the management of relational data in applications using Java Platform, Standard Edition and Java Platform, Enterprise Edition.</p>
</div>
<div class="paragraph">
<p><a href="http://hibernate.org/orm/">Hibernate ORM</a> is the JPA implementation that we’re going to use in this lab. we will use Hibernate via <a href="https://projects.spring.io/spring-data-jpa/">Spring Data JPA</a></p>
</div>
<div class="paragraph">
<p>We’re going to use <a href="https://projects.spring.io/spring-data-jpa/">Spring Data JPA</a> to store and retrieve data in our relational database.</p>
</div>
<div class="paragraph">
<p>With Persistence API/Framework, the approach is to :</p>
</div>
<div class="ulist">
<ul>
<li>
<p>work with Java objects (Java entities) and not with database tables</p>
</li>
<li>
<p>add annotations to map entity properties to table columns</p>
</li>
<li>
<p>generate common database request (Create, Update, Delete, Read)</p>
</li>
<li>
<p>fill the SQL imperfections: inheritance, relationships, customs types, validation</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Spring provides several sub projects to make database interactions easy</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/app-data3.png" alt="app data3" width="850">
</div>
</div>
<div class="paragraph">
<p>&#160;</p>
</div>
<div class="paragraph">
<p>Do not confuse <a href="https://projects.spring.io/spring-data/">Spring Data</a> with <a href="https://projects.spring.io/spring-data-jpa/">Spring Data JPA</a>. We can read on in the offical doc that</p>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>"Spring Data’s mission is to provide a familiar and consistent, Spring-based programming model for data access while still retaining the special traits of the underlying data store. It makes it easy to use data access technologies, relational and non-relational databases, map-reduce frameworks, and cloud-based data services. This is an umbrella project which contains many subprojects that are specific to a given database […​]</p>
</div>
</blockquote>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>Spring Data JPA is part of Spring Data, lets implement JPA based repositories. It makes it easier to build Spring-powered applications that use data access technologies."</p>
</div>
</blockquote>
</div>
<div class="sect2">
<h3 id="_jpa_entity">JPA Entity</h3>
<div class="paragraph">
<p>Object relation mapping (ORM) is one of the main feature in the JPA specification. The ORM layer (Hibernate) performs the translation of the app model objects into a relational database. For that we just have to use different JPA annotations on our entity objects.</p>
</div>
<div class="paragraph">
<p>Let&#8217;s take the example of a Java class named <strong>Sensor</strong> and see how to use JPA to bind it to the SP_SENSOR table of our database.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714544.1462"><span class="hljs-keyword">import</span> jakarta.persistence.*;

<span class="hljs-meta">@Entity</span> <span class="hljs-comment">// (1).</span>
<span class="hljs-meta">@Table(name = &quot;SP_SENSOR&quot;)</span> <span class="hljs-comment">// (2).</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SensorEntity</span> {
    <span class="hljs-meta">@Id</span> <span class="hljs-comment">// (3).</span>
    <span class="hljs-meta">@GeneratedValue</span>
    <span class="hljs-keyword">private</span> Long id;

    <span class="hljs-meta">@Column(nullable=false, length=255)</span>  <span class="hljs-comment">// (4).</span>
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-meta">@Column(name = &quot;sensor_value&quot;)</span> <span class="hljs-comment">// (5)</span>
    <span class="hljs-keyword">private</span> Double value;

    <span class="hljs-meta">@Column(name = &quot;sensor_type&quot;)</span> <span class="hljs-comment">// (5).</span>
    <span class="hljs-meta">@Enumerated(EnumType.STRING)</span> <span class="hljs-comment">// (6).</span>
    <span class="hljs-keyword">private</span> SensorType sensorType;

    <span class="hljs-meta">@Transient</span> <span class="hljs-comment">// (7).</span>
    <span class="hljs-keyword">private</span> Integer notImportant;

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">SensorEntity</span><span class="hljs-params">()</span> { <span class="hljs-comment">// (8).</span>
    }

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">SensorEntity</span><span class="hljs-params">(SensorType sensorType, String name)</span> { <span class="hljs-comment">// (9).</span>
        <span class="hljs-built_in">this</span>.name = name;
        <span class="hljs-built_in">this</span>.sensorType = sensorType;
    }

    <span class="hljs-keyword">public</span> Long <span class="hljs-title function_">getId</span><span class="hljs-params">()</span> { <span class="hljs-comment">// (10).</span>
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

    <span class="hljs-keyword">public</span> Double <span class="hljs-title function_">getValue</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> value;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setValue</span><span class="hljs-params">(Double value)</span> {
        <span class="hljs-built_in">this</span>.value = value;
    }

    <span class="hljs-keyword">public</span> SensorType <span class="hljs-title function_">getSensorType</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> sensorType;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setSensorType</span><span class="hljs-params">(SensorType sensorType)</span> {
        <span class="hljs-built_in">this</span>.sensorType = sensorType;
    }

    <span class="hljs-keyword">public</span> Integer <span class="hljs-title function_">getNotImportant</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> notImportant;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setNotImportant</span><span class="hljs-params">(Integer notImportant)</span> {
        <span class="hljs-built_in">this</span>.notImportant = notImportant;
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714544.1462')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) <strong>@Entity</strong> indicates that this class is an entity managed by Hibernate</p>
</li>
<li>
<p>(2) <strong>@Table(name = "SP_SENSOR")</strong> you can customize the table name (optional) if this annotation is not present, the table name will be the entity name</p>
</li>
<li>
<p>(3) <strong>@Id</strong> you have always an id annotated with <code>@jakarta.persistence.Id</code> (auto generated in this example). This ID is immutable (as the primary key in the database)</p>
</li>
<li>
<p>(4) <strong>@Column</strong> by default, each property is mapped to a column. You can customize the nullability or the column name.</p>
</li>
<li>
<p>(5) You can personalize the column used in the database to store the data</p>
</li>
<li>
<p>(6) <strong>@Enumerated(EnumType.STRING)</strong> Java enum persisted as a String (choose always EnumType.STRING)</p>
</li>
<li>
<p>(7) If a property should not be persisted, use <strong>@Transient</strong></p>
</li>
<li>
<p>(8) an entity <strong>must have an empty constructor</strong> (public or protected).<br>
<span class="small  small-block">An empty constructor is needed to create a new instance via reflection (using <code>Class@LTT@GT.newInstance()</code>) by Hibernate which has to instantiate your Entity dynamically. If you don’t provide any additional constructors with arguments for the class, you don’t need to provide an empty constructor because you get one per default. Java always gives you a default invisible empty constructor. If an argument constructor is provided in your class, then jvm will not add the no-argument constructor.</span></p>
</li>
<li>
<p>(9) you can add (and you should) a constructor to build an object with all required properties</p>
</li>
<li>
<p>(10) you have to define a getter and a setter for each property</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_entity_manager">Entity manager</h3>
<div class="paragraph">
<p>When your app need to launch a query, it will call an <a href="https://docs.jboss.org/hibernate/orm/6.2/userguide/html_single/Hibernate_User_Guide.html#architecture">EntityManager</a> to execute it</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/em.png" alt="em" width="800">
</div>
</div>
<div class="paragraph">
<p>Entities managed by Hibernate have a life-cycle associated with them. Either you can create a new object and save it into the database or your can fetch the data from the database.</p>
</div>
<div class="paragraph">
<p>Entities go through several stages in the life-cycle.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/lifecycle.png" alt="lifecycle" width="800">
</div>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>Transient Objects</strong>: Transient objects are non transactional and in fact Hibernate has no knowledge of these objects</p>
</li>
<li>
<p><strong>Persistent Objects</strong>: Persistent entity has a valid database identity associated with.</p>
</li>
<li>
<p><strong>Removed Object</strong>: An object scheduled for deletion either by calling delete or because of orphan deletion of entities.</p>
</li>
<li>
<p><strong>Detached Object</strong>: The object in persistent state go into detached state after the persistent context is closed. Detached objects can be brought into other persistent context by reattachment or merging. Detached object still has a valid primary key attribute but it is no longer managed by Hibernate.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>We have different operations to several stages in the life-cycle.</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>persist()</strong>  makes a persistent entity. It will be written in the database at the next commit of the transaction we are in..</p>
</li>
<li>
<p><strong>remove()</strong>: inverse of persist(). It will be erased from the database at the next commit of the transaction we are in.</p>
</li>
<li>
<p><strong>refresh()</strong>: synchronizes the state of an entity to its database state. If the fields of an entity have been updated in the current transaction, these changes will be canceled. This operation only applies to persistent entities (otherwise we have an IllegalArgumentException)</p>
</li>
<li>
<p><strong>detach()</strong>: detaches an entity from  entity manager. This entity will not be taken into account during the next commit of the transaction in which we are</p>
</li>
<li>
<p><strong>merge()</strong>: attach an entity to the current entity manager. This is used to associate an entity with another entity manager than the one that was used to create or read it.</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_transaction_and_spring">Transaction and Spring</h3>
<div class="paragraph">
<p>We must work in transactions to ensure data integrity. When you use Spring, Transactional policy is managed by Spring with <strong>@Transactional</strong> annotation. For example</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714544.8684"><span class="hljs-meta">@Service</span>
<span class="hljs-meta">@Transactional</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SiteServiceImpl</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">SiteService</span> {

    <span class="hljs-keyword">public</span> Site <span class="hljs-title function_">addSite</span><span class="hljs-params">(String name)</span>{
        <span class="hljs-type">Site</span> <span class="hljs-variable">site</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Site</span>(name);
        site.addSensor(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Sensor</span>(<span class="hljs-string">&quot;default&quot;</span>, site)
                               .withPowerSource(PowerSource.FIXED)
                               .withDefaultPowerInWatt(<span class="hljs-number">1_000_000</span>));
        siteDao.save(site);
        <span class="hljs-keyword">return</span> site;
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714544.8684')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Your services, your components must use a <strong>@Transactional</strong> annotation to work in a transaction.</p>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>Hibernate stores everything read from the database in a first-level cache. This cache is linked to the current transaction.</p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>At the end of the transaction, Hibernate will launch a flush() of this cache</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Calculation of the modifications of the objects contained in this cache</p>
</li>
<li>
<p>Execution of all requests as a result</p>
</li>
<li>
<p>Launching commit() if everything is OK or rollback()</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>With the first level of cache, if you execute twice a <code>find()</code> on the same instance, it will only be loaded once</p>
</div>
</div>
<div class="sect2">
<h3 id="_schema_generation">Schema generation</h3>
<div class="paragraph">
<p>Hibernate (JPA implementation) is able to parse yours entities to generate your database schema.It&#8217;s very useful when you develop an app.</p>
</div>
<div class="paragraph">
<p>In Spring you just have to add some properties in <code>application.properties</code> file.</p>
</div>
<div class="paragraph">
<p>Update the file <code>application.properties</code> and add these keys</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714544.643"># Spring boot : JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.generate-ddl=<span class="hljs-literal">true</span>
spring.jpa.show_sql=<span class="hljs-literal">true</span>
spring.jpa.defer-datasource-initialization=<span class="hljs-literal">true</span></code><button class="btn-copy-code" onclick="copyToClipboard('1734011714544.643')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>H2Dialect gives information to Hibernate for native SQL</p>
</li>
<li>
<p><strong>generate-ddl</strong> allows you to auto generate the schema (tables, constraints) from your Java data model (false if you do not want to do anything)</p>
</li>
<li>
<p><strong>show_sql</strong> displays queries in the logs (usefull in development)</p>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_jpa_and_association_mappings">JPA and association mappings</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Association mappings are one of the key features of JPA and Hibernate.
They define the relationship between the database tables and the attributes in your Entity.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/relationship.png" alt="relationship" width="800">
</div>
</div>
<div class="paragraph">
<p>An association between JPA entities, can be unidirectional or bidirectional.
In this second case, one of the two entities must be the parent (the main entity) and the other the child.</p>
</div>
<div class="paragraph">
<p>It defines in which direction you can use the association.</p>
</div>
<div class="sect2">
<h3 id="_onetoone">@OneToOne</h3>
<div class="paragraph">
<p>Example of <strong>unidirectional association</strong>: a city has a mayor but the mayor does not know his city</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/relationship_1to1_uni.png" alt="relationship 1to1 uni" width="200">
</div>
</div>
<div class="paragraph">
<p>A column <strong>mayor_id</strong> will be added in the table <strong>City</strong> and a foreign key will be created</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714545.2227"><span class="hljs-meta">@Entity</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Mayor</span> {
    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-comment">//...</span>
}


<span class="hljs-meta">@Entity</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">City</span> {
     <span class="hljs-meta">@Id</span>
     <span class="hljs-keyword">private</span> Long id;
     <span class="hljs-keyword">private</span> String name;
     <span class="hljs-meta">@OneToOne</span>
     <span class="hljs-keyword">private</span> Mayor mayor;

     <span class="hljs-comment">// ...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714545.2227')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Example of <strong>bidirectional</strong> association: a city has a mayor and the mayor now knows his city</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/relationship_1to1_bi.png" alt="relationship 1to1 bi" width="200">
</div>
</div>
<div class="paragraph">
<p>We can' t add a column <code><strong>mayor_id</strong></code> in the <code><strong>City</strong></code> table and a column <code><strong>city_id</strong></code> in the <code><strong>Mayor</strong></code> table because of the cycle.</p>
</div>
<div class="paragraph">
<p>In Hibernate entity model, we have to use a <code>mappedBy</code> to define the field that owns the relationship. This element is only specified on the inverse (non-owning) side of the association.</p>
</div>
<div class="paragraph">
<p>For example the mappedBy can be defined on the OneToOne defined in the mayor entity</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714545.7861"><span class="hljs-meta">@Entity</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">City</span> {
    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-meta">@OneToOne</span>
    <span class="hljs-keyword">private</span> Mayor mayor;

    <span class="hljs-comment">// ...</span>
}

<span class="hljs-meta">@Entity</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Mayor</span> {
    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-meta">@OneToOne(mappedBy = &quot;mayor&quot;)</span>
    <span class="hljs-keyword">private</span> City city;

    <span class="hljs-comment">//...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714545.7861')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>With this code a column <strong>mayor_id</strong> will be added in the <code><strong>City</strong></code> table and a foreign key will be created. <strong>Mayor</strong> table won&#8217;t have a reference to the city table.</p>
</div>
<div class="paragraph">
<p><strong>mappedby</strong> tells hibernate not to map this field because it&#8217;s already mapped by this field [here property mayor in City entity].</p>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>If you forget to define a parent and a child in the association (no association with a mappedBy), you will have a mayor_id reference in the City table and a city_id reference in the Mayor table with 2 constraints.
In this case, you will not be able to delete a row because you will always have a constraint error.</p>
</div>
</blockquote>
</div>
</div>
<div class="sect2">
<h3 id="_onetomany">@OneToMany</h3>
<div class="paragraph">
<p>Example of <strong>unidirectional</strong> association: a site has one or more sensors (sensor does not link to a site)</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/relationship_1ton_uni.png" alt="relationship 1ton uni" width="200">
</div>
</div>
<div class="paragraph">
<p>A join table is added (with 2 foreign keys)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714545.6238"><span class="hljs-meta">@Entity</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Sensor</span> {
    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> String name;

     <span class="hljs-comment">// ...</span>
}

<span class="hljs-meta">@Entity()</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Site</span> {
    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-meta">@OneToMany</span>
    <span class="hljs-keyword">private</span> Set<span class="hljs-meta">@LTSensor</span><span class="hljs-meta">@GT</span> sensors = Set.of();

    <span class="hljs-comment">// ...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714545.6238')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_manytoone">@ManyToOne</h3>
<div class="paragraph">
<p>Example of <strong>unidirectional</strong> association: a measurement is linked to a sensor and the sensor does not have the measurement list</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/relationship_nto1_uni.png" alt="relationship nto1 uni" width="230">
</div>
</div>
<div class="paragraph">
<p>A <strong>sensor_id</strong> column will be added to the <strong>Measurement</strong> table and a foreign key will be created</p>
</div>
<div class="listingblock langage-small">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714545.8894"><span class="hljs-meta">@Entity</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Sensor</span> {
    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-comment">// ...</span>
}

<span class="hljs-meta">@Entity</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Measurement</span> {

    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;

    <span class="hljs-meta">@ManyToOne(optional = false)</span>
    <span class="hljs-keyword">private</span> Sensor sensor;

    <span class="hljs-comment">// ...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714545.8894')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_onetomany_manytoone">@OneToMany @ManyToOne</h3>
<div class="paragraph">
<p>Example of <strong>bidirectional</strong> association: a sensor has n measures and measure knows its sensor</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/relationship_1ton_nto1_bi.png" alt="relationship 1ton nto1 bi" width="200">
</div>
</div>
<div class="paragraph">
<p><strong>@ManyToOne ha nos property <code>mappedBy</code>.
So you can&#8217;t make a mistake, add this <code>mappedBy</code> property on @OneToMany</strong> (which is used to designate the parent)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714546.0605"><span class="hljs-meta">@Entity</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Measure</span> {
    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-meta">@ManyToOne</span>
    <span class="hljs-keyword">private</span> Sensor sensor;
}

<span class="hljs-meta">@Entity()</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Sensor</span> {
    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-meta">@OneToMany(mappedBy = &quot;sensor&quot;)</span>
    <span class="hljs-keyword">private</span> Set<span class="hljs-meta">@LTMeasure</span><span class="hljs-meta">@GT</span> measures = Set.of();
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714546.0605')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If you forget the mapped <code>mappedBy</code> property on the @OneToMany* you will have an unexpected join table betwwen the sensor and the measure.</p>
</div>
</div>
<div class="sect2">
<h3 id="_manytomany">@ManyToMany</h3>
<div class="paragraph">
<p>Example of <strong>unidirectional</strong> association: a musician plays several instruments (instrument does not know who uses it)</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/relationship_nton_uni.png" alt="relationship nton uni" width="200">
</div>
</div>
<div class="paragraph">
<p>A join table is added (with 2 foreign keys)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714546.7551"><span class="hljs-meta">@Entity</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Instrument</span> {
    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> String name;

     <span class="hljs-comment">// ...</span>
}

<span class="hljs-meta">@Entity()</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Musician</span> {
    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-meta">@ManyToMany</span>
    <span class="hljs-keyword">private</span> Set<span class="hljs-meta">@LTInstrument</span><span class="hljs-meta">@GT</span> instruments;

    <span class="hljs-comment">// ...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714546.7551')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Example <strong>bidirectional</strong> association: a musician plays several instruments (instrument knows that they play musicians)</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/relationship_nton_bi.png" alt="relationship nton bi" width="200">
</div>
</div>
<div class="paragraph">
<p>A join table is always present (with 2 foreign keys) but we must define the <code>mappedBy</code> property on one entity</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714546.5244"><span class="hljs-comment">// Child</span>
<span class="hljs-meta">@Entity</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Instrument</span> {
    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-meta">@ManyToMany</span>
    <span class="hljs-keyword">private</span> Set<span class="hljs-meta">@LTMusician</span><span class="hljs-meta">@GT</span> musicians;
     <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// Parent</span>
<span class="hljs-meta">@Entity()</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Musician</span> {
    <span class="hljs-meta">@Id</span>
    <span class="hljs-keyword">private</span> Long id;
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-meta">@ManyToMany(mappedBy=&quot;musicians&quot;)</span>
    <span class="hljs-keyword">private</span> Set<span class="hljs-meta">@LTInstrument</span><span class="hljs-meta">@GT</span> instruments;

    <span class="hljs-comment">// ...</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714546.5244')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_fetching_strategy">Fetching Strategy</h3>
<div class="paragraph">
<p>The fetching strategy allows you to specify the loading strategy.</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>LAZY</strong> the value is loaded only when it is used  (default)</p>
</li>
<li>
<p><strong>EAGER</strong> the value is always loaded</p>
</li>
</ul>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight">@<span class="hljs-title class_">OneToMany</span>(fetch = <span class="hljs-title class_">FetchType</span>.<span class="hljs-property">EAGER</span>)
private <span class="hljs-title class_">Set</span>@<span class="hljs-title class_">LTSensor</span>@<span class="hljs-variable constant_">GT</span> sensors = <span class="hljs-title class_">Set</span>.<span class="hljs-title function_">of</span>();</pre>
</div>
</div>
<div class="paragraph">
<p>By default, we are in Lazy mode because the goal is to load the minimum of things.  If you navigate in your object and if relations are set in Lazy mode, you have 2 cases</p>
</div>
<div class="ulist">
<ul>
<li>
<p>You are attached to a persistence context : one or more queries are started to load the missing data</p>
</li>
<li>
<p>You are not attached to a persistence context: a LazyInitializationException is launched</p>
</li>
</ul>
</div>
<div class="listingblock langage-small">
<div class="content">
<pre class="highlight">org.<span class="hljs-property">hibernate</span>.<span class="hljs-property">LazyInitializationException</span>: could not initialize proxy</pre>
</div>
</div>
<div class="paragraph">
<p>If you have to serialize your object or send it to another layer, you have to use DTO. We will see that later</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_jpql">JPQL</h2>
<div class="sectionbody">
<div class="paragraph">
<p>With JPA we don&#8217;t write SQL but <a href="https://docs.oracle.com/html/E13946_04/ejb3_langref.html">JPQL</a> (Java Persistence Query Language). <strong>We don&#8217;t use the column names but we use the JPA entities</strong> in.</p>
</div>
<div class="paragraph">
<p>In SQL we select a list of columns belonging to one or more tables. In JPQL we select an entity.</p>
</div>
<div class="listingblock langage-small">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714547.4114"><span class="hljs-comment">// Selection sensors</span>
select c from SensorEntity c

<span class="hljs-comment">// Selection sites linked to a sensor</span>
select c.site from SensorEntity c</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714547.4114')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can use implicit join</p>
</div>
<div class="listingblock langage-small">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714547.2239">select c from SensorEntity c where c.site.id = :siteId</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714547.2239')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Or you can use explicit join</p>
</div>
<div class="listingblock langage-small">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714547.3545">select c from SensorEntity c join c.site s where s.id = :siteId
select c from SensorEntity c left join c.site s where s.id = :siteId</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714547.3545')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_data_access_object_dao">Data Access Object (DAO)</h2>
<div class="sectionbody">
<div class="paragraph">
<p>A DAO (Data Access Object) lets you persist your Entities. The DAO is basically an object or an interface that provides access to an underlying database or any other persistence storage.</p>
</div>
<div class="paragraph">
<p>That definition from <a href="http://en.wikipedia.org/wiki/Data_access_object">Wikipedia</a></p>
</div>
<div class="paragraph">
<p>An example of Spring Data Jpa repository (DAO)</p>
</div>
<div class="listingblock langage-small">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714547.6504"><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">SensorDao</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">JpaRepository</span><span class="hljs-meta">@LTSensorEntity</span>, Long<span class="hljs-meta">@GT</span> {
    <span class="hljs-meta">@Query(&quot;select c from SensorEntity c where c.name=:name&quot;)</span>
    SensorEntity <span class="hljs-title function_">findByName</span><span class="hljs-params">(<span class="hljs-meta">@Param(&quot;name&quot;)</span> String name)</span>;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714547.6504')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p><a href="https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories"><strong>JpaRepository</strong></a> is a Spring Data interface, which provides common methods such as <strong>findOne</strong>, <strong>save</strong>, <strong>delete</strong> and more. This example will handle Sensors entities, and those are identified by an Id of type Long (generics type used in JpaRepository).</p>
</div>
<div class="paragraph">
<p>With Spring Data, you write an interface with the expected annotations and the library will generate the implementation for you, when the code is compiled.</p>
</div>
<div class="sect2">
<h3 id="_spring_data_jpa">Spring Data JPA</h3>
<div class="paragraph">
<p>With Spring Data Jpa, if you respect conventions you don&#8217;t need to create a DAO implementation</p>
</div>
<div class="listingblock langage-small">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714548.9465"><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">SensorDao</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">JpaRepository</span><span class="hljs-meta">@LTSensorEntity</span>, Long<span class="hljs-meta">@GT</span> {

    List<span class="hljs-meta">@LTSensorEntity</span><span class="hljs-meta">@GT</span> findBySiteId(Long siteId); <span class="hljs-comment">// (1).</span>

    <span class="hljs-meta">@Query(&quot;select c from SensorEntity c where c.name=:name&quot;)</span>  <span class="hljs-comment">// (2)</span>
    Sensor <span class="hljs-title function_">findByName</span><span class="hljs-params">(<span class="hljs-meta">@Param(&quot;name&quot;)</span> String name)</span>;

    <span class="hljs-meta">@Modifying</span> <span class="hljs-comment">// (3)</span>
    <span class="hljs-meta">@Query(&quot;delete from SensorEntity c where c.name = ?1&quot;)</span>
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">deleteByName</span><span class="hljs-params">(String name)</span>;
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714548.9465')">Copy</button></pre>
</div>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p><strong>findBy</strong> pattern allows to execute a query and return an occurrence or an occurrence list</p>
</li>
<li>
<p><strong>@Query</strong> helps to execute a JPQL query. Here we use a named parameter called name.</p>
</li>
<li>
<p>Another example with an update. In this case, you must use an <strong>@Modifying</strong> annotation</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>If a method starts by <code>findBy</code>, <code>findDistinctBy</code>, <code>countBy</code>, &#8230;&#8203;</p>
</div>
<div class="ulist">
<ul>
<li>
<p>You can after add a property</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714548.2527">List<span class="hljs-meta">@LTSensorEntity</span><span class="hljs-meta">@GT</span> findByName(String name);</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714548.2527')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>You can add a property of a property</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714548.9436">List<span class="hljs-meta">@LTSensorEntity</span><span class="hljs-meta">@GT</span> findBySiteId(String siteId);</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714548.9436')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>You can cumulate criteria</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714548.4207">List<span class="hljs-meta">@LTSensorEntity</span><span class="hljs-meta">@GT</span> findByNameAndSiteId(String name, String siteId);
List<span class="hljs-meta">@LTSensorEntity</span><span class="hljs-meta">@GT</span> findByNameOrSiteId(String name, String siteId);</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714548.4207')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>You can ignore upper or lower case</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714548.498">List<span class="hljs-meta">@LTSensorEntity</span><span class="hljs-meta">@GT</span> findByNameIgnoreCase(String name);
List<span class="hljs-meta">@LTSensorEntity</span><span class="hljs-meta">@GT</span> findByNameAndSiteIdAllIgnoreCase(String name, String siteId);</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714548.498')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>You can sort data</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714548.8887">List<span class="hljs-meta">@LTSensorEntity</span><span class="hljs-meta">@GT</span> findByNameOrderByNameAsc(String name);
List<span class="hljs-meta">@LTSensorEntity</span><span class="hljs-meta">@GT</span> findByNameOrderByNameDesc(String name);</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714548.8887')">Copy</button></pre>
</div>
</div>
</li>
<li>
<p>You can select only one element (if you have for example an unicity constraint). But in this case if several elements are found an exception is thrown</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714548.8313">SensorEntity <span class="hljs-title function_">findByName</span><span class="hljs-params">(String name)</span>;</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714548.8313')">Copy</button></pre>
</div>
</div>
</li>
</ul>
</div>
<div class="paragraph">
<p>For more informations read <a href="https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods.details">the documentation</a> to know more things</p>
</div>
</div>
<div class="sect2">
<h3 id="_custom_dao">Custom DAO</h3>
<div class="paragraph">
<p>If you need to create your own queries, you have to create a new interface</p>
</div>
<div class="listingblock langage-verysmall">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714548.8938"><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">SensorCustomDao</span> {
    List<span class="hljs-meta">@LTSensorEntity</span><span class="hljs-meta">@GT</span> findBySiteText(String searchText);
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714548.8938')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You need to update the main interface. In our code we will always inject a <strong>SensorDao</strong>. This Dao will have all JpaRepository methods and all your custom queries.</p>
</div>
<div class="listingblock langage-verysmall">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714548.766"><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">SensorDao</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">JpaRepository</span><span class="hljs-meta">@LTSensorEntity</span>, String<span class="hljs-meta">@GT</span>, SensorCustomDao {
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714548.766')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Implement your <code>SensorCustomDao</code> and use entitiy manager to execute requests</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714549.414"><span class="hljs-meta">@Repository</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SensorCustomDaoImpl</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">SensorCustomDao</span> {

    <span class="hljs-meta">@PersistenceContext</span>
    <span class="hljs-keyword">private</span> EntityManager em;

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> List<span class="hljs-meta">@LTSensorEntity</span><span class="hljs-meta">@GT</span> findBySiteText(String searchText) {
        <span class="hljs-keyword">return</span> em.createQuery(<span class="hljs-string">&quot;select c from SensorEntity c inner join c.site s where lover(s.name) like :searchText&quot;</span>,
                              SensorEntity.class)
                 .setParameter(<span class="hljs-string">&quot;searchText&quot;</span>, <span class="hljs-string">&quot;%&quot;</span> + searchText.toLowerCase() + <span class="hljs-string">&quot;%&quot;</span>)
                 .getResultList();
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714549.414')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_jpa"><span class="icon">[flask&#93;</span> : JPA</h2>
<div class="sectionbody">
<div class="paragraph">
<p>It&#8217;s time for you to create a real application that can manage sensors in a building. The management of sanitary conditions, user comfort and energy efficiency require concurrent management of window openings in the buildings of the École des Mines.</p>
</div>
<div class="paragraph">
<p>It is necessary to ventilate as much as possible to limit air pollution, but with the approach of winter it will become important to heat buildings to ensure the comfort of users.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/tp.png" alt="tp" width="700">
</div>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>We will now create an application which will able to manage the building windows.<br>
- the building has an outside temperature, and rooms<br>
- each room has zero or more heaters, has zero or more windows, a name, a floor, a current temperature, a target temperature.<br>
- each heater has a name, an <code>on</code> or <code>off</code> status, possibly a power.<br>
- each window has a name, an a status <code>open</code> or <code>closed</code></p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>The heater status, the window status and the temperature are measured by external sensors.</p>
</div>
<div class="sect2">
<h3 id="_entity_creation">Entity creation</h3>
<div class="sect3">
<h4 id="_sensor_entity">Sensor entity</h4>
<div class="paragraph">
<p>The <code>SensorEntity</code> entity was given <a href="https://dev-mind.fr/training/spring/spring-data.html#_jpa_entity">higher</a> on the page. You can remove the <code>notImportant</code> property</p>
</div>
<div class="paragraph">
<p>Create a Java enum called <code>SensorType</code> in package <code>com.emse.spring.automacorp.model</code> to define the type of the sensor.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714549.1067"><span class="hljs-keyword">public</span> <span class="hljs-keyword">enum</span> <span class="hljs-title class_">SensorType</span> { TEMPERATURE, POWER, STATUS }</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714549.1067')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_window_entity">Window entity</h4>
<div class="paragraph">
<p>Create an Entity called <code>WindowEntity</code> in package <code>com.emse.spring.automacorp.model</code> (an entity is a class). You have to use the JPA annotations seen previously.</p>
</div>
<div class="paragraph">
<p>You can copy this code. For the moment this entity has no property room because this entity will be created later.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714549.2944"><span class="hljs-comment">// (1)</span>
<span class="hljs-comment">// (2)</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowEntity</span> {
    <span class="hljs-comment">// (3)</span>
    <span class="hljs-keyword">private</span> Long id;

    <span class="hljs-comment">// (4)</span>
    <span class="hljs-keyword">private</span> String name;

    <span class="hljs-comment">// (5)</span>
    <span class="hljs-keyword">private</span> SensorEntity windowStatus;

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">WindowEntity</span><span class="hljs-params">()</span> {
    }

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">WindowEntity</span><span class="hljs-params">(String name, SensorEntity sensor)</span> {
        <span class="hljs-built_in">this</span>.windowStatus = sensor;
        <span class="hljs-built_in">this</span>.name = name;
    }

    <span class="hljs-keyword">public</span> Long <span class="hljs-title function_">getId</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>.id;
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

    <span class="hljs-keyword">public</span> Sensor <span class="hljs-title function_">getWindowStatus</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> windowStatus;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">setWindowStatus</span><span class="hljs-params">(Sensor windowStatus)</span> {
        <span class="hljs-built_in">this</span>.windowStatus = windowStatus;
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714549.2944')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Use the good annotations to</p>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) Mark this class as a JPA entity</p>
</li>
<li>
<p>(2) Give a different name for your table &#8658; SP_WINDOW</p>
</li>
<li>
<p>(3) Declare this field as the table ID. This ID must to be auto generated</p>
</li>
<li>
<p>(4) This field must be not nullable</p>
</li>
<li>
<p>(5) The <code>windowStatus</code> is a SensorEntity. You need to use the good annotation to define the unidirectional association. This field must be not nullable</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>For the moment this entity has no property room because this entity will be created later.</p>
</div>
<div class="paragraph">
<p>You can start your application. If you updated your configuration (see this <a href="spring-data.html#_schema_generation">chapter</a>) you should see in your app logs</p>
</div>
<div class="listingblock">
<div class="content">
<pre>Hibernate: drop table if exists sp_sensor cascade
Hibernate: drop table if exists sp_window cascade
Hibernate: drop sequence if exists sp_sensor_seq
Hibernate: drop sequence if exists sp_window_seq
Hibernate: create sequence sp_sensor_seq start with 1 increment by 50
Hibernate: create sequence sp_window_seq start with 1 increment by 50
Hibernate: create table sp_sensor (sensor_value float(53), id bigint not null, name varchar(255) not null, sensor_type varchar(255) check (sensor_type in ('TEMPERATURE','POWER','STATUS')), primary key (id))
Hibernate: create table sp_window (id bigint not null, window_status_id bigint not null, name varchar(255) not null, primary key (id))
Hibernate: alter table if exists sp_window add constraint FKqdj6jbtn59whbpgt93n927yjn foreign key (window_status_id) references sp_sensor</pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_room_entity">Room entity</h4>
<div class="paragraph">
<p>Create the <strong>RoomEntity</strong> entity with</p>
</div>
<div class="ulist">
<ul>
<li>
<p>an auto generated id</p>
</li>
<li>
<p>a non nullable floor (Integer)</p>
</li>
<li>
<p>a non nullable String name</p>
</li>
<li>
<p>a current temperature (SensorEntity) the current temperature is measured by a sensor</p>
</li>
<li>
<p>a target temperature (Double)</p>
</li>
<li>
<p>a list of windows. You have to define a bidirectional association between <code>RoomEntity</code> and <code>WindowEntity</code> : update the <code>Window</code> entity constructor to always send the room when a room is created, ie add an argument <code>RoomEntity</code> in the <code>WindowEntity</code> constructor</p>
</li>
<li>
<p>create a constructor with non nullable fields and a default constructor</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>You can relaunch your application.</p>
</div>
<div class="paragraph">
<p>Open your H2 console you should see</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-data/console-example.png" alt="console example" width="400">
</div>
</div>
<div class="paragraph">
<p><em>If you more tables you forgot to declare a bidirectional association&#8230;&#8203;</em></p>
</div>
</div>
<div class="sect3">
<h4 id="_other_entities">Other entities</h4>
<div class="paragraph">
<p>You can continue the different exercises. If you choose to follow the given subject for your final project and evaluation, you will have to implement later:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>the <code>HeaterEntity</code> entity with</p>
<div class="ulist">
<ul>
<li>
<p>an auto generated id</p>
</li>
<li>
<p>a non nullable String name</p>
</li>
<li>
<p>a non nullable room</p>
</li>
<li>
<p>a non nullable status. This field is a Sensor.</p>
</li>
<li>
<p>create a constructor with non nullable fields and a default constructor</p>
</li>
</ul>
</div>
</li>
<li>
<p>update the room entity to define a list of heaters. You have to define a bidirectional association between <code>RoomEntity</code> and <code>HeaterEntity</code> : update the <code>HeaterEntity</code> entity constructor to always send the room when a room is created, ie add an argument <code>RoomEntity</code> in the <code>HeaterEntity</code> constructor</p>
</li>
<li>
<p>the <code>BuildingEntity</code> entity. The building has an outside temperature (a SensorEntity), and rooms.</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_populate_data">Populate data</h3>
<div class="paragraph">
<p>We&#8217;re going to populate our database and insert data in tables. You can execute the script below in your H2 console, but data will be deleted on the next app reload. Fortunately Spring Boot offers a mechanism to populate a database at startup.</p>
</div>
<div class="paragraph">
<p>Create a file <code>data.sql</code> in <code>src/main/resources</code> next to <code>application.properties</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-sql" id="1734011714550.2407"><span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> SP_SENSOR(id, name, sensor_value, sensor_type) <span class="hljs-keyword">VALUES</span>(<span class="hljs-number">-10</span>, <span class="hljs-string">&#x27;Temperature room 2&#x27;</span>, <span class="hljs-number">21.3</span>, <span class="hljs-string">&#x27;TEMPERATURE&#x27;</span>);
<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> SP_SENSOR(id, name, sensor_value, sensor_type) <span class="hljs-keyword">VALUES</span>(<span class="hljs-number">-9</span>, <span class="hljs-string">&#x27;Window 1 status room 1&#x27;</span>, <span class="hljs-number">1.0</span>, <span class="hljs-string">&#x27;STATUS&#x27;</span>);
<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> SP_SENSOR(id, name, sensor_value, sensor_type) <span class="hljs-keyword">VALUES</span>(<span class="hljs-number">-8</span>, <span class="hljs-string">&#x27;Window 2 status room 1&#x27;</span>, <span class="hljs-number">0.0</span>, <span class="hljs-string">&#x27;STATUS&#x27;</span>);
<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> SP_SENSOR(id, name, sensor_value, sensor_type) <span class="hljs-keyword">VALUES</span>(<span class="hljs-number">-7</span>, <span class="hljs-string">&#x27;Window 1 status room 2&#x27;</span>, <span class="hljs-number">0.0</span>, <span class="hljs-string">&#x27;STATUS&#x27;</span>);
<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> SP_SENSOR(id, name, sensor_value, sensor_type) <span class="hljs-keyword">VALUES</span>(<span class="hljs-number">-6</span>, <span class="hljs-string">&#x27;Window 2 status room 2&#x27;</span>, <span class="hljs-number">0.0</span>, <span class="hljs-string">&#x27;STATUS&#x27;</span>);

<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> SP_ROOM(id, name, floor) <span class="hljs-keyword">VALUES</span>(<span class="hljs-number">-10</span>, <span class="hljs-string">&#x27;Room1&#x27;</span>, <span class="hljs-number">1</span>);
<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> SP_ROOM(id, name, floor, current_temperature_id, target_temperature) <span class="hljs-keyword">VALUES</span>(<span class="hljs-number">-9</span>, <span class="hljs-string">&#x27;Room2&#x27;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">-10</span>, <span class="hljs-number">20.0</span>);

<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> SP_WINDOW(id, window_status_id, name, room_id) <span class="hljs-keyword">VALUES</span>(<span class="hljs-number">-10</span>, <span class="hljs-number">-9</span>, <span class="hljs-string">&#x27;Window 1&#x27;</span>, <span class="hljs-number">-10</span>);
<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> SP_WINDOW(id, window_status_id, name, room_id) <span class="hljs-keyword">VALUES</span>(<span class="hljs-number">-9</span>, <span class="hljs-number">-8</span>, <span class="hljs-string">&#x27;Window 2&#x27;</span>, <span class="hljs-number">-10</span>);
<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> SP_WINDOW(id, window_status_id, name, room_id) <span class="hljs-keyword">VALUES</span>(<span class="hljs-number">-8</span>, <span class="hljs-number">-7</span>, <span class="hljs-string">&#x27;Window 1&#x27;</span>, <span class="hljs-number">-9</span>);
<span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> SP_WINDOW(id, window_status_id, name, room_id) <span class="hljs-keyword">VALUES</span>(<span class="hljs-number">-7</span>, <span class="hljs-number">-6</span>, <span class="hljs-string">&#x27;Window 2&#x27;</span>, <span class="hljs-number">-9</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714550.2407')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_dao_creation">Dao creation</h3>
<div class="sect3">
<h4 id="_simple_dao">Simple DAO</h4>
<div class="paragraph">
<p>Write now 3 <a href="spring-data.html#_data_access_object_dao">Spring data DAO</a> <code>SensorDao</code>, <code>WindowDao</code> and <code>RoomDao</code> in package <code>com.emse.spring.automacorp.dao</code> (interface that extends JpaRepository with the good types for entity and its id)</p>
</div>
<div class="paragraph">
<p>You&#8217;re going to write your own DAO methods (for specific requests), you have to create custom interfaces and implementations with your custom methods.</p>
</div>
<div class="paragraph">
<p>To check <code>WindowDao</code>, create a class <code>WindowDaoTest</code> in <strong>src/test/java/com.emse.spring.automacorp.dao</strong></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714551.773"><span class="hljs-keyword">import</span> com.emse.spring.automacorp.model.Window;
<span class="hljs-keyword">import</span> com.emse.spring.automacorp.model.WindowStatus;
<span class="hljs-keyword">import</span> org.assertj.core.api.Assertions;
<span class="hljs-keyword">import</span> org.junit.jupiter.api.Test;
<span class="hljs-keyword">import</span> org.junit.jupiter.api.extension.ExtendWith;
<span class="hljs-keyword">import</span> org.springframework.beans.factory.annotation.Autowired;
<span class="hljs-keyword">import</span> org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
<span class="hljs-keyword">import</span> org.springframework.test.context.junit.jupiter.SpringExtension;

<span class="hljs-meta">@DataJpaTest</span> <span class="hljs-comment">// (1)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowDaoTest</span> {
    <span class="hljs-meta">@Autowired</span> <span class="hljs-comment">// (2)</span>
    <span class="hljs-keyword">private</span> WindowDao windowDao;

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldFindAWindowById</span><span class="hljs-params">()</span> {
        <span class="hljs-type">WindowEntity</span> <span class="hljs-variable">window</span> <span class="hljs-operator">=</span> windowDao.getReferenceById(-<span class="hljs-number">10L</span>); <span class="hljs-comment">// (3)</span>
        Assertions.assertThat(window.getName()).isEqualTo(<span class="hljs-string">&quot;Window 1&quot;</span>);
        Assertions.assertThat(window.getWindowStatus().getValue()).isEqualTo(<span class="hljs-number">1.0</span>);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714551.773')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) <code>DataJpaTest</code> is a SpringBoot annotation to help the DAO tests. This annotation initialize a in memory database and a Spring context with the objects needed for our tests</p>
</li>
<li>
<p>(2) With this initialization we can inject a Spring Bean, our DAO to test</p>
</li>
<li>
<p>(3) and we can call the DAO to interact with the database</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Execute your test. This test should be green.</p>
</div>
<div class="paragraph">
<p>You can write similar tests to test <strong>RoomDao</strong> and <strong>SensorDao</strong></p>
</div>
<div class="videoblock">
<div class="content">
<iframe width="1000" height="500" src="https://www.youtube.com/embed/-BtxXL5bA8Q?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_custom_dao_2">Custom DAO</h4>
<div class="paragraph">
<p>Create your own interface <strong>WindowDaoCustom</strong> in package <code>com.emse.spring.automacorp.dao</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714551.678"><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">WindowDaoCustom</span> {
    List<span class="hljs-meta">@LTWindowEntity</span><span class="hljs-meta">@GT</span> findRoomsWithOpenWindows(Long id);
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714551.678')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Refactor your <strong>WindowDao</strong> interface : it must extend <strong>JpaRepository</strong> and <strong>WindowDaoCustom</strong></p>
</div>
<div class="paragraph">
<p>Create your own implementation of <strong>WindowDaoCustom</strong> with your custom methods and inject the EntityManager (JPA)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714551.7278"><span class="hljs-keyword">import</span> com.emse.spring.automacorp.model.Window;
<span class="hljs-keyword">import</span> jakarta.persistence.EntityManager;
<span class="hljs-keyword">import</span> jakarta.persistence.PersistenceContext;

<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowDaoCustomImpl</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">WindowDaoCustom</span> {
    <span class="hljs-meta">@PersistenceContext</span>
    <span class="hljs-keyword">private</span> EntityManager em;

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> List<span class="hljs-meta">@LTWindowEntity</span><span class="hljs-meta">@GT</span> findRoomsWithOpenWindows(Long id) {
        <span class="hljs-type">String</span> <span class="hljs-variable">jpql</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;select w from Window w inner join w.windowStatus s &quot;</span> +
                <span class="hljs-string">&quot;where w.room.id = :id and s.value @GT 0.0 order by w.name&quot;</span>;
        <span class="hljs-keyword">return</span> em.createQuery(jpql, WindowEntity.class)
                .setParameter(<span class="hljs-string">&quot;id&quot;</span>, id)
                .getResultList();
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714551.7278')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You have to test your DAO. When Spring context is loaded, the database is populated with the file <code>data.sql</code> and we can test these values. For that update <code>WindowDaoTest</code> test and add these methods</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714551.2644"><span class="hljs-meta">@Test</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldFindRoomsWithOpenWindows</span><span class="hljs-params">()</span> {
    List<span class="hljs-meta">@LTWindowEntity</span><span class="hljs-meta">@GT</span> result = windowDao.findRoomsWithOpenWindows(-<span class="hljs-number">10L</span>);
    Assertions.assertThat(result)
              .hasSize(<span class="hljs-number">1</span>)
              .extracting(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>)
              .containsExactly(Tuple.tuple(-<span class="hljs-number">10L</span>, <span class="hljs-string">&quot;Window 1&quot;</span>));
}

<span class="hljs-meta">@Test</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldNotFindRoomsWithOpenWindows</span><span class="hljs-params">()</span> {
    List<span class="hljs-meta">@LTWindowEntity</span><span class="hljs-meta">@GT</span> result = windowDao.findRoomsWithOpenWindows(-<span class="hljs-number">9L</span>);
    Assertions.assertThat(result).isEmpty();
}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714551.2644')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You have to test and develop :</p>
</div>
<div class="ulist">
<ul>
<li>
<p>a custom DAO with a method to find all windows by room name</p>
</li>
<li>
<p>add a method in WindowDao to delete all windows in a room.</p>
</li>
<li>
<p>a method to close or open all windows in a room</p>
</li>
<li>
<p>you have to develop these methods and their tests</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>To check that window room are deleted you can add this test method in <strong>WindowDaoTest</strong></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1734011714552.6165"><span class="hljs-meta">@Test</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldDeleteWindowsRoom</span><span class="hljs-params">()</span> {
    <span class="hljs-type">RoomEntity</span> <span class="hljs-variable">room</span> <span class="hljs-operator">=</span> roomDao.getById(-<span class="hljs-number">10L</span>);
    List<span class="hljs-meta">@LTLong</span><span class="hljs-meta">@GT</span> roomIds = room.getWindows().stream().map(Window::getId).collect(Collectors.toList());
    Assertions.assertThat(roomIds).hasSize(<span class="hljs-number">2</span>);

    windowDao.deleteByRoom(-<span class="hljs-number">10L</span>);
    List<span class="hljs-meta">@LTWindowEntity</span><span class="hljs-meta">@GT</span> result = windowDao.findAllById(roomIds);
    Assertions.assertThat(result).isEmpty();

}</code><button class="btn-copy-code" onclick="copyToClipboard('1734011714552.6165')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>That&#8217;s all for the moment. In this course you learnt how to configure and use a database in Spring Boot app.</p>
</div>
</div>
</div>
</div>
</div>`;