export const _android_database_room_viewmodel:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a href="@link@#_jetpack_room">Jetpack Room</a>
<ul class="sectlevel2">
<li><a href="@link@#_entity">Entity</a></li>
<li><a href="@link@#_data_object_access_dao">Data Object Access DAO</a></li>
<li><a href="@link@#_create_a_database">Create a database</a></li>
</ul>
</li>
<li><a href="@link@#_use_singleton_in_an_android_app">Use Singleton in an Android app</a></li>
<li><a href="@link@#_use_viewmodel_object">Use ViewModel object</a>
<ul class="sectlevel2">
<li><a href="@link@#_why_use_a_viewmodel">Why use a ViewModel ?</a></li>
<li><a href="@link@#_create_a_viewmodel">Create a ViewModel</a></li>
<li><a href="@link@#_use_the_view_model_in_an_activity">Use the view model in an activity</a></li>
</ul>
</li>
<li><a href="@link@#_flask_use_a_database_in_your_project"><span class="icon">[flask&#93;</span> : Use a database in your project</a>
<ul class="sectlevel2">
<li><a href="@link@#_configuration">Configuration</a></li>
<li><a href="@link@#_create_your_first_entity">Create your first entity</a></li>
<li><a href="@link@#_synchronize_our_database">Synchronize our database</a></li>
</ul>
</li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In this lesson, we will learn how to use a database in our application.
For the moment we need an Internet connection to display data on our screens, but we want to be able to display something when a user is offline or when the remote API is not able to answer.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/android-use-room.png" alt="android use room" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_jetpack_room">Jetpack Room</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Each Android phone has a local SQLite database.</p>
</div>
<div class="paragraph">
<p>The <a href="https://developer.android.com/jetpack/androidx/releases/room?hl=fr">Jetpack Room</a> persistence library provides an abstraction layer over SQLite to allow fluent database access while harnessing the full power of SQLite.
Room library is an ORM (Object Relational Mapping) library (like Hibernate for the backend development). It allows you to manipulate objects in your code and to persist them in a database.</p>
</div>
<div class="paragraph">
<p>You have other libraries to do the same things but Room has the advantage of being provided and created by the Google team.</p>
</div>
<div class="sect2">
<h3 id="_entity">Entity</h3>
<div class="paragraph">
<p>An entity is a Kotlin class binded to a database table. With Room, each table is represented by a class.</p>
</div>
<div class="paragraph">
<p>An entity contains the fields of the table as properties. Each instance of an entity represents a row of the table.</p>
</div>
<div class="paragraph">
<p>SQLite database has very few types :</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>NULL</strong>. The value is a NULL value.</p>
</li>
<li>
<p><strong>INTEGER</strong>. The value is a signed integer, stored in 0, 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.</p>
</li>
<li>
<p><strong>REAL</strong>. The value is a floating point value, stored as an 8-byte IEEE floating point number.</p>
</li>
<li>
<p><strong>TEXT</strong>. The value is a text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).</p>
</li>
<li>
<p><strong>BLOB</strong>. The value is a blob of data, stored exactly as it was input.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>When you use Jetpack Room, you work with Kotlin objects, and the library handles the conversion to and from the database.</p>
</div>
<div class="paragraph">
<p>Mapping is based on the names of the variables in the model class, and the names of the columns in the database. If the names don&#8217;t match, you can use annotations to define the mapping yourself. You can also use annotations to define primary keys, autoincrementing values, and other aspects of your database.</p>
</div>
<div class="paragraph">
<p>We have to define several things</p>
</div>
<div class="ulist">
<ul>
<li>
<p>to be an entity the class must be annotated with @Entity (This annotation accept a property <code>tableName</code> to personalize the name)</p>
</li>
<li>
<p>each table need a unique id, the primary key. You can mark it with the @PrimaryKey annotation and tell if the value will be generated by the database</p>
</li>
<li>
<p>each column must be declared with a @ColumnInfo annotation. The column name can be overridden.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Typically, SQL column names will have words separated by an underscore, as opposed to the lowerCamelCase used by Kotlin properties.</p>
</div>
<div class="paragraph">
<p>You can use the <code>@Ignore</code> annotation to tell Room to ignore specific fields. For example, you may want to ignore a field that is used only in logic within the app, but is not stored or referenced in the database.</p>
</div>
<div class="paragraph">
<p>If we use the building sensor API we can see the Window Entity. The window table includes some basic information about a room window.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-meta">@Entity(tableName = <span class="hljs-string">&quot;rwindow&quot;</span>)</span>
<span class="hljs-keyword">data</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Window</span>(
    <span class="hljs-meta">@PrimaryKey(autoGenerate = true)</span> <span class="hljs-keyword">val</span> id: <span class="hljs-built_in">Long</span>,
    <span class="hljs-meta">@ColumnInfo</span> <span class="hljs-keyword">val</span> name: String,
    <span class="hljs-meta">@ColumnInfo(name = <span class="hljs-string">&quot;room_id&quot;</span>)</span> <span class="hljs-keyword">val</span> roomId: <span class="hljs-built_in">Long</span>,
    <span class="hljs-meta">@ColumnInfo(name = <span class="hljs-string">&quot;room_name&quot;</span>)</span> <span class="hljs-keyword">val</span> roomName: String,
    <span class="hljs-meta">@ColumnInfo(name = <span class="hljs-string">&quot;window_status&quot;</span>)</span> <span class="hljs-keyword">val</span> windowStatus: WindowStatus,
    <span class="hljs-meta">@Ignore</span> <span class="hljs-keyword">val</span> windows: MutableList&amp;lt;Window&amp;gt; = mutableListOf()
) {
    <span class="hljs-comment">// When you need to transform your entity in a DTO (Data Transfer Object) you can use this method</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">toDto</span><span class="hljs-params">()</span></span>: WindowDto =
        WindowDto(id.toLong(), name, RoomDto(roomId.toLong(), roomName, <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>), windowStatus)
}</code></pre>
</div>
</div>
<div class="paragraph">
<p>In this code we used an enum <code>WindowStatus</code>, but this enum is not a known type in the database. We should help Rooms to serialize and deserialize this enum value. Create in the package <code>com.automacorp.model</code> a new class <code>EnumConverters</code>.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-keyword">class</span> <span class="hljs-title class_">EnumConverters</span> {

    <span class="hljs-comment">// A first method to convert enum in string when the data will be stored in the database</span>
    <span class="hljs-meta">@TypeConverter</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">fromWindowStatus</span><span class="hljs-params">(value: <span class="hljs-type">WindowStatus</span>?)</span></span>: String? {
        <span class="hljs-keyword">return</span> value?.toString()
    }

    <span class="hljs-comment">// A second one to do the inverse operation</span>
    <span class="hljs-meta">@TypeConverter</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">toWindowStatus</span><span class="hljs-params">(value: <span class="hljs-type">String</span>?)</span></span>: WindowStatus? {
        <span class="hljs-keyword">return</span> value?.let { WindowStatus.valueOf(it) }
    }

}</code></pre>
</div>
</div>
<div class="paragraph">
<p>With this class we can use the annotation <code>@TypeConverters</code> to tell Room to use this class to convert our enum when the data will be stored or read in the database.</p>
</div>
</div>
<div class="sect2">
<h3 id="_data_object_access_dao">Data Object Access DAO</h3>
<div class="paragraph">
<p>A DAO (Data Access Object) is a Kotlin class that provides access to the data. We will define functions for reading or manipulating data.
Each function call will perform a SQL command on the database.</p>
</div>
<div class="paragraph">
<p>With Jetpack Room, a Dao is an interface with annotated methods. The implementation of these methods is not written by you. The Room library generates the code to execute these queries from yours interfaces.</p>
</div>
<div class="paragraph">
<p>If you followed the <a href="https://dev-mind.fr/training/spring/spring-data.html">Spring Data</a> labs, Room is like Spring and it will generate the interface implementation at compile time.</p>
</div>
<div class="paragraph">
<p>To activate this mechanism you need to add the annotation @Dao on your class</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-meta">@Dao</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">WindowDao</span> {
}</code></pre>
</div>
</div>
<div class="paragraph">
<p>A query is specified as a string passed into a <code>@Query</code> annotation.</p>
</div>
<div class="paragraph">
<p><strong>Contrary to Hibernate for backend developpers, we won&#8217;t manipulate objets in these queries but we have to use SQL request with the database model.</strong></p>
</div>
<div class="paragraph">
<p>Room provides also different annotations <code>@Insert</code>, <code>@Update</code>, <code>@Delete</code> to manipulate an entity.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-meta">@Dao</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">WindowDao</span> {
    <span class="hljs-meta">@Query(<span class="hljs-string">&quot;select * from rwindow order by name&quot;</span>)</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findAll</span><span class="hljs-params">()</span></span>: List&amp;lt;Window&amp;gt;

    <span class="hljs-meta">@Query(<span class="hljs-string">&quot;select * from rwindow where id = :windowId&quot;</span>)</span>
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findById</span><span class="hljs-params">(windowId: <span class="hljs-type">Long</span>)</span></span>: Window

    <span class="hljs-meta">@Insert</span>
    <span class="hljs-keyword">suspend</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">create</span><span class="hljs-params">(window: <span class="hljs-type">Window</span>)</span></span>

    <span class="hljs-meta">@Update</span>
    <span class="hljs-keyword">suspend</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">update</span><span class="hljs-params">(window: <span class="hljs-type">Window</span>)</span></span>: <span class="hljs-built_in">Int</span>

    <span class="hljs-meta">@Delete</span>
    <span class="hljs-keyword">suspend</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">delete</span><span class="hljs-params">(window: <span class="hljs-type">Window</span>)</span></span>

    <span class="hljs-meta">@Query(<span class="hljs-string">&quot;delete from rwindow&quot;</span>)</span>
    <span class="hljs-keyword">suspend</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">clearAll</span><span class="hljs-params">()</span></span>
}</code></pre>
</div>
</div>
<div class="paragraph">
<p>In the second example we use a function argument in the request.</p>
</div>
</div>
<div class="sect2">
<h3 id="_create_a_database">Create a database</h3>
<div class="paragraph">
<p>We now need to configure the database in our project. With Jetpack Room library we have to initialize an object that implements the RoomDatabase interface. We had to declare on this object, the different entities, the converters and their DAOs.</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>@Database</code> annotation is used to declare all entities. The version number is incremented each time you make a schema change. The app checks this version with the one in the database to determine if and how a migration should be performed.</p>
</li>
<li>
<p><code>@TypeConverters</code> annotation is used to declare all type converters (enum convertion for example).</p>
</li>
<li>
<p>the class is also used to declare all DAOs.</p>
</li>
</ul>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-meta">@Database(entities = [Window::class], version = 1)</span>
<span class="hljs-meta">@TypeConverters(EnumConverters::class)</span>
<span class="hljs-keyword">abstract</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AutomacorpDatabase</span> : <span class="hljs-type">RoomDatabase</span>() {
    <span class="hljs-keyword">abstract</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">windowDao</span><span class="hljs-params">()</span></span>: WindowDao
}</code></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_use_singleton_in_an_android_app">Use Singleton in an Android app</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Now you need to use this database in your code. And you need to use only one instance of this database.</p>
</div>
<div class="paragraph">
<p>We need to declare a singleton. A singleton is a class that can have only one instance of the class at a time. We have to do that  to prevent race conditions or other potential issues.</p>
</div>
<div class="paragraph">
<p>To resolve this problem you can use a dependency injection libray as <a href="https://developer.android.com/jetpack/androidx/releases/hilt">Hilt</a>.</p>
</div>
<div class="paragraph">
<p>Or you can define your own Android Application class and use it to store the database instance. An Android Application object is created when you launch your application, and it will be destroyed when your application is terminated.</p>
</div>
<div class="paragraph">
<p>Create a new class <code>AutomacorpApplication</code> in the root folder of your project. This class must extends <code>Application</code> class.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-keyword">class</span> <span class="hljs-title class_">AutomacorpApplication</span> : <span class="hljs-type">Application</span>() {}</code></pre>
</div>
</div>
<div class="paragraph">
<p>You need to declare this new class in <code>AndroidManifest.xml</code> to launch you own implementation in place of the default one, when your app will be started.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-xml"><span class="hljs-symbol">&amp;lt;</span>manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
xmlns:tools=&quot;http://schemas.android.com/tools&quot;<span class="hljs-symbol">&amp;gt;</span>
    <span class="hljs-symbol">&amp;lt;</span>application
        android:name=&quot;.AutomacorpApplication&quot;
     ...</code></pre>
</div>
</div>
<div class="paragraph">
<p>Now we will declare our database in this <code>AutomacorpApplication</code> class. The database creation can be done with the room builder. You need to declare the global context, your Database class and the db name. the <code>by lazy</code> is used to initialize the property only when it will be used.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-keyword">class</span> <span class="hljs-title class_">AutomacorpApplication</span> : <span class="hljs-type">Application</span>() {

    <span class="hljs-keyword">val</span> database: AutomacorpDatabase <span class="hljs-keyword">by</span> lazy {
        Room.databaseBuilder(<span class="hljs-keyword">this</span>, AutomacorpDatabase::<span class="hljs-keyword">class</span>.java, <span class="hljs-string">&quot;automacorpdb&quot;</span>)
            .build()
    }


}</code></pre>
</div>
</div>
<div class="paragraph">
<p>If you need to use a DAO in your code you will be able to use</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-keyword">val</span> windowDao = AutomacorpApplication.database.windowDao()</code></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_use_viewmodel_object">Use ViewModel object</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_why_use_a_viewmodel">Why use a ViewModel ?</h3>
<div class="paragraph">
<p>The Android framework manages the lifecycle of UI controllers, such as activities and fragments. The framework may decide to destroy or re-create an UI controller in response to certain user actions or device events that are completely out of your control.</p>
</div>
<div class="paragraph">
<p>If the system destroys or re-creates an UI controller, any transient UI-related data you store in them is lost. For example, your app may include a list of users in one of its activities. When the activity is re-created for a configuration change, the new activity has to re-fetch the list of users.</p>
</div>
<div class="paragraph">
<p>For simple data, the activity can use the <code>onSaveInstanceState()</code> method and restore its data from the bundle in <code>onCreate()</code>, but this approach is only suitable for small amounts of data that can be serialized then deserialized, not for potentially large amounts of data like a list of users or bitmaps.</p>
</div>
<div class="paragraph">
<p>Another problem is that UI controllers frequently need to make asynchronous calls that may take some time to return. The UI controller needs to manage these calls and ensure the system cleans them up after it&#8217;s destroyed to avoid potential memory leaks.</p>
</div>
<div class="paragraph">
<p>ViewModels were created to resolve these problems and separate out view data ownership from UI controller logic. UI controllers such as activities and fragments should only display UI data, react to user actions, or handle operating system communication, such as permission requests. The data should be now managed by a ViewModel.</p>
</div>
<div class="paragraph">
<p>Using a view model helps enforce a clear separation between the code for your app&#8217;s UI and its data model.</p>
</div>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/android-view-model.svg" alt="View model"></span></p>
</div>
<div class="paragraph">
<p>The ViewModel class is used to store data related to an app&#8217;s UI, and is also lifecycle aware, meaning that it responds to lifecycle events much like an activity or fragment does. If lifecycle events such as screen rotation cause an activity or fragment to be destroyed and recreated, the associated ViewModel won&#8217;t need to be recreated.</p>
</div>
</div>
<div class="sect2">
<h3 id="_create_a_viewmodel">Create a ViewModel</h3>
<div class="paragraph">
<p>To create a view model class, create a new class called <code>WindowViewModel</code> in a new package called <code>com.automacorp.viewmodel</code>. It should only use the <code>WindowDao</code> and for the moment we can implement inside the method used to load data</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowViewModel</span>(<span class="hljs-keyword">private</span> <span class="hljs-keyword">val</span> windowDao: WindowDao) : ViewModel() { <span class="hljs-comment">// (1)</span>

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findById</span><span class="hljs-params">(windowId: <span class="hljs-type">Long</span>)</span></span>: LiveData&amp;lt;WindowDto&amp;gt; = <span class="hljs-comment">// (2)</span>
        liveData(Dispatchers.IO) { <span class="hljs-comment">// (3)</span>
            emit(windowDao.findById(windowId).toDto()) <span class="hljs-comment">// (4)</span>
        }

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">save</span><span class="hljs-params">(windowId: <span class="hljs-type">Long</span>, command: <span class="hljs-type">WindowCommandDto</span>)</span></span>: LiveData&amp;lt;WindowDto&amp;gt; = <span class="hljs-comment">// (2)</span>
        liveData(Dispatchers.IO) { <span class="hljs-comment">// (3)</span>
          <span class="hljs-keyword">val</span> window = Window(
              id = windowId,
              name= command.name
          )
          <span class="hljs-keyword">if</span> (windowId == <span class="hljs-number">0L</span>) {
              windowDao.create(window)
          } <span class="hljs-keyword">else</span> {
              windowDao.update(window)
          }
          emit(window.toDto()) <span class="hljs-comment">// (4)</span>
      }
}</code></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>(1)</strong> a view model must implement an abstract class ViewModel</p>
</li>
<li>
<p><strong>(2)</strong> LiveData is an observable data holder class. Unlike a regular observable, LiveData is lifecycle-aware, meaning it respects the lifecycle of other app components, such as activities, fragments, or services. This awareness ensures LiveData only updates app component observers that are in an active lifecycle state.</p>
</li>
<li>
<p><strong>(3)</strong> As we have to access to the DB we must do that outside the main thread. Coroutine <code>liveData(Dispatchers.IO)</code> is used to do that</p>
</li>
<li>
<p><strong>(4)</strong> result mut be emitted and the different observers (Activity, Fragment) will be ready to manipulate this result.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>A ViewModel class must be lifecycle aware, it should be instantiated by an object that can respond to lifecycle events and an object made to handle all memory managements. For that we will use a <code>ViewModelProvider.Factory</code>. This object should be defined in a compagnon object</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowViewModel</span>(<span class="hljs-keyword">private</span> <span class="hljs-keyword">val</span> windowDao: WindowDao) : ViewModel() {

    <span class="hljs-keyword">companion</span> <span class="hljs-keyword">object</span> {
        <span class="hljs-keyword">val</span> factory: ViewModelProvider.Factory =
            <span class="hljs-keyword">object</span> : ViewModelProvider.Factory {
                <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> &amp;lt;T : ViewModel&amp;gt; <span class="hljs-title">create</span><span class="hljs-params">(
                    modelClass: <span class="hljs-type">Class</span>&amp;<span class="hljs-type">lt</span>;<span class="hljs-type">T</span>&amp;<span class="hljs-type">gt</span>;,
                    extras: <span class="hljs-type">CreationExtras</span>
                )</span></span>: T {
                    <span class="hljs-comment">// Load the Dao from the Application object</span>
                    <span class="hljs-keyword">val</span> windowDao = (extras[APPLICATION_KEY] <span class="hljs-keyword">as</span> AutomacorpApplication)
                            .database
                            .windowDao()
                    <span class="hljs-keyword">return</span> WindowViewModel(windowDao) <span class="hljs-keyword">as</span> T
                }
            }
    }

    <span class="hljs-comment">// ...</span>
}</code></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_use_the_view_model_in_an_activity">Use the view model in an activity</h3>
<div class="paragraph">
<p>You can a global property in your property to define your view model.</p>
</div>
<div class="paragraph">
<p>+</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-keyword">private</span> <span class="hljs-keyword">val</span> viewModel: WindowViewModel <span class="hljs-keyword">by</span> viewModels {
    WindowViewModel.factory
}</code></pre>
</div>
</div>
<div class="paragraph">
<p>And you want to pouplate your list you can use</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin">viewModel.findAll().observe(<span class="hljs-keyword">this</span>) { windows -&amp;gt;
    adapter.update(windows)
}</code></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_use_a_database_in_your_project"><span class="icon">[flask&#93;</span> : Use a database in your project</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_configuration">Configuration</h3>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Open <strong>build.gradle.kts (Module: automacorp.app)</strong>.</p>
</li>
<li>
<p>As Room uses annotations we need to configure Gradle to launch the kotlin annotation processor. For that you just have to add a new plugin id <code>kotlin-kapt</code></p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy">plugins {
    id(<span class="hljs-string">&quot;com.android.application&quot;</span>)
    id(<span class="hljs-string">&quot;org.jetbrains.kotlin.android&quot;</span>)
    id(<span class="hljs-string">&quot;kotlin-kapt&quot;</span>)
}</code></pre>
</div>
</div>
</li>
<li>
<p>In the dependencies block, declare new libraries</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-groovy">implementation <span class="hljs-string">&quot;androidx.room:room-runtime:2.4.3&quot;</span>
implementation <span class="hljs-string">&quot;androidx.room:room-ktx:2.4.3&quot;</span>
kapt <span class="hljs-string">&quot;androidx.room:room-compiler:2.4.3&quot;</span>

implementation <span class="hljs-string">&quot;androidx.lifecycle:lifecycle-viewmodel-ktx:2.5.1&quot;</span>
implementation <span class="hljs-string">&quot;androidx.lifecycle:lifecycle-livedata-ktx:2.5.1&quot;</span>
implementation <span class="hljs-string">&quot;androidx.activity:activity-ktx:1.6.0&quot;</span></code></pre>
</div>
</div>
</li>
<li>
<p>As you updated your gradle configuration, Android Studio display a message to synchronize your projet.
Click on <strong>Sync now</strong></p>
<div class="paragraph">
<p><span class="image"><img src="../../img/training/android/android-gradle-sync.png" alt="Sync Gradle project"></span></p>
</div>
</li>
</ol>
</div>
</div>
<div class="sect2">
<h3 id="_create_your_first_entity">Create your first entity</h3>
<div class="ulist">
<ul>
<li>
<p>Create a new class in the package <code>com.automacorp.model</code> called <code>Room</code> and use annotations to link this class to the database (<code>@Entity</code>, <code>@PrimaryKey</code>, <code>@ColumnInfo</code>&#8230;&#8203;)</p>
</li>
<li>
<p>Create a new interface called RoomDao in the package <code>com.automacorp.dao</code> and write methods to manage a Room :  findAll, findById, save, update, delete&#8230;&#8203;</p>
</li>
<li>
<p>Create a new class <code>AutomacorpDatabase</code> in <code>com.automacorp.dao</code> to declare the database</p>
</li>
<li>
<p>As we have to create this database only once, create a <code>AutomacorpApplication</code> in the root folder, and declare this App override in your <code>AndroidManifest.xml</code></p>
</li>
<li>
<p>Create a property <code>val database: AutomacorpDatabase by lazy {}</code> in your <code>AutomacorpApplication</code></p>
</li>
<li>
<p>Create in package <code>com.automacorp.viewmodel</code> a <code>RoomViewModel</code> class to manage all CRUD operations (Create, read all or one, update and delete)</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Now, you can update the <code>RoomsActivity</code> used to list all rooms.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Add a new global property to define your view model</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-keyword">private</span> <span class="hljs-keyword">val</span> viewModel: RoomViewModel <span class="hljs-keyword">by</span> viewModels {
    RoomViewModel.factory
}</code></pre>
</div>
</div>
</li>
<li>
<p>We need to replace the code used to populate the adapter, to update a room (ie the calls to ApiServices.windowsApiService)</p>
</li>
<li>
<p>In <code>RoomsActivity</code> you can for example used this code with a method to observe our livedata returned by the view model. The code was
made to manage asynchronous calls and you don&#8217;t need anymore to switch between coroutines in your Activity or Fragment</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin">viewModel.findAll().observe(<span class="hljs-keyword">this</span>) { rooms -&amp;gt;
    roomsAdapter.setItems(rooms) }
}</code></pre>
</div>
</div>
</li>
<li>
<p>Do the same job in <code>RoomActivity</code></p>
</li>
</ol>
</div>
<div class="paragraph">
<p>You can start your application and as we have nothing in database you should have an empty list when you want to display the window list.</p>
</div>
</div>
<div class="sect2">
<h3 id="_synchronize_our_database">Synchronize our database</h3>
<div class="paragraph">
<p>We want to only use this database when the remote API is not accessible. To do that we will refactor our ViewModel to</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>call the remote API by default</p>
</li>
<li>
<p>remove the last data if call is OK</p>
</li>
<li>
<p>store the last received data</p>
</li>
<li>
<p>call the database if remote API is not available (no network, service deny&#8230;&#8203;)</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>Update the ViewModel to do these steps. Below you can find an example for the room</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findAll</span><span class="hljs-params">()</span></span>: LiveData&amp;lt;List&amp;lt;RoomDto&amp;gt;&amp;gt; =
    liveData(Dispatchers.IO) {
        runCatching {
            ApiServices.roomsApiService.findAll().execute()
        }.onSuccess {
            <span class="hljs-comment">// If remote API is available we synchronize data locally</span>
            it.body()
                ?.also { rooms -&amp;gt;
                    roomDao.clearAll()
                    windowDao.clearAll()
                    rooms.onEach { room -&amp;gt;
                        roomDao.create(
                            Room(
                                id = room.id,
                                name = room.name,
                                currentTemperature = room.currentTemperature,
                                targetTemperature = room.targetTemperature
                            )
                        )
                        room.windows.onEach {
                            windowDao.create(
                                Window(
                                    id = it.id,
                                    name = it.name,
                                    roomId = room.id,
                                    roomName = room.name,
                                    windowStatus = it.windowStatus
                                )
                            )
                        }
                    }
                    emit(rooms)
                }
                ?: emit(emptyList())
        }.onFailure {
            <span class="hljs-keyword">val</span> rooms = roomDao.findAll().map { it.toDto() }
            emit(rooms) <span class="hljs-comment">// (4)</span>
        }
    }

<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findById</span><span class="hljs-params">(roomId: <span class="hljs-type">Long</span>)</span></span>: LiveData&amp;lt;RoomDto&amp;gt; =
    liveData(Dispatchers.IO) { <span class="hljs-comment">// (2)</span>
        runCatching {
            <span class="hljs-comment">// We call the remote API</span>
            ApiServices.roomsApiService.findById(roomId).execute().body()!!
        }.onSuccess {
            emit(it)
        }.onFailure {
            <span class="hljs-keyword">val</span> room = roomDao.findById(roomId).apply {
                windows = windowDao.findByRoomId(roomId)
            }.toDto()
            emit(room)
        }
    }

<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">save</span><span class="hljs-params">(roomId: <span class="hljs-type">Long</span>, room: <span class="hljs-type">RoomCommandDto</span>)</span></span>: LiveData&amp;lt;RoomDto?&amp;gt; =
    liveData(Dispatchers.IO) {
        runCatching {
            <span class="hljs-keyword">if</span> (roomId == <span class="hljs-number">0L</span>) {
                ApiServices.roomsApiService.save(room).execute().body()
            } <span class="hljs-keyword">else</span> {
                ApiServices.roomsApiService.updateRoom(roomId, room).execute().body()
            }
        }.onSuccess {
            emit(it)
        }.onFailure {
            emit(<span class="hljs-literal">null</span>)
        }
    }</code></pre>
</div>
</div>
<div class="paragraph">
<p>This code should work but it should be nice to know when we are in the fallback mode. For that we can expose a new live data in your code.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Create a new enum called <code>State</code> in <code>WindowViewModel</code></p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-keyword">enum</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">State</span> { ONLINE, OFFLINE }</code></pre>
</div>
</div>
</li>
<li>
<p>Create a property in <code>RoomViewModel</code> to expose this state. By default the state is ONLINE</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-keyword">val</span> networkState: MutableLiveData&amp;lt;State&amp;gt; <span class="hljs-keyword">by</span> lazy {
    MutableLiveData&amp;lt;State&amp;gt;().also { it.postValue(State.ONLINE) }
}</code></pre>
</div>
</div>
</li>
<li>
<p>You can add a new Observable in your activity <code>RoomsActivity</code> and <code>RoomActivity</code> to display a message when the data will be loaded from the local database</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin">viewModel.networkState.observe(<span class="hljs-keyword">this</span>) { state -&amp;gt;
    <span class="hljs-keyword">if</span>(state == State.OFFLINE) {
        Toast.makeText(<span class="hljs-keyword">this</span>,<span class="hljs-string">&quot;Offline mode, the last known values are displayed&quot;</span>, Toast.LENGTH_LONG)
            .show()
    }
}</code></pre>
</div>
</div>
</li>
<li>
<p>Update the state in the methods <code>findAll</code>, <code>findById</code>, 'save@backtick@ in <code>RoomViewModel</code> when you use the API or the database. Be careful you need to do this update on the main thread and you have to use this coroutine scope (<code>Dispatcher.Main</code>).</p>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin"><span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">findById</span><span class="hljs-params">(roomId: <span class="hljs-type">Long</span>)</span></span>: LiveData&amp;lt;RoomDto&amp;gt; =
    liveData(Dispatchers.IO) { <span class="hljs-comment">// (2)</span>
        runCatching {
            <span class="hljs-comment">// We call the remote API</span>
            ApiServices.roomsApiService.findById(roomId).execute().body()!!
        }.onSuccess {
            networkState.postValue(State.ONLINE)
            emit(it)
        }.onFailure {
            networkState.postValue(State.OFFLINE)
            <span class="hljs-keyword">val</span> room = roomDao.findById(roomId).apply {
                windows = windowDao.findByRoomId(roomId)
            }.toDto()
            emit(room)
        }
    }</code></pre>
</div>
</div>
</li>
</ol>
</div>
</div>
</div>
</div>`;