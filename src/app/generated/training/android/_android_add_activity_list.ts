export const _android_add_activity_list:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_recyclerview">RecyclerView</a></li>
<li><a class="link" fragment="#_flask_display_the_room_list"><span class="icon">[flask&#93;</span> : Display the room list</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_update_room_list_activity">Update room list activity</a></li>
<li><a class="link" fragment="#_create_a_layout_for_a_list_item">Create a layout for a list item</a></li>
<li><a class="link" fragment="#_create_an_adapter_class">Create an adapter class</a></li>
<li><a class="link" fragment="#_update_roomsactivity_class">Update RoomsActivity class</a></li>
</ul>
</li>
<li><a class="link" fragment="#_flask_open_a_list_item"><span class="icon">[flask&#93;</span> : Open a list item</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_declare_an_interface_to_define_a_contract">Declare an interface to define a contract</a></li>
<li><a class="link" fragment="#_update_roomsactivity">Update RoomsActivity</a></li>
<li><a class="link" fragment="#_update_the_let_adapter">Update the let adapter</a></li>
</ul>
</li>
<li><a class="link" fragment="#_more">More&#8230;&#8203;</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In this lesson, you will learn how to populate a list of room in our empty rooms screen.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-activity-list.png" alt="Create an activity list" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_recyclerview">RecyclerView</h2>
<div class="sectionbody">
<div class="paragraph">
<p>When you want to create a list view you should use a <strong>RecyclerView</strong> widget. This widget is able to manage a large data sets and scrool between elements.</p>
</div>
<div class="paragraph">
<p>The overall container for your user interface is a <strong>RecyclerView</strong> object that you add to your layout. The RecyclerView fills itself with views provided by a layout manager that you provide. The views in the list (used to display items) are represented by view holder objects. Each view holder is in charge of displaying a single item with a view.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-listview.png" alt="Android RecyclerView">
</div>
</div>
<div class="paragraph">
<p>For example, if your list shows music collection, each view holder might represent a single album. The RecyclerView creates only as many view holders as are needed to display the on-screen portion of the dynamic content, plus a few extra. As the user scrolls through the list, the RecyclerView takes the off-screen views and rebinds them to the data which is scrolling onto the screen.</p>
</div>
<div class="paragraph">
<p>The view holder objects are managed by an adapter (create by extending <strong>RecyclerView.Adapter</strong>). This adapter creates view holders as needed. The adapter also binds the view holders to their data. It does this by assigning the view holder to a position.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1723541686785.366"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomsAdapter</span> : <span class="hljs-type">RecyclerView.Adapter@LTRoomsAdapter.RoomsViewHolder@GT</span>() { <span class="hljs-comment">// (1)</span>

    <span class="hljs-keyword">inner</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomsViewHolder</span>(view: View) : RecyclerView.ViewHolder(view) { <span class="hljs-comment">// (2)</span>
        <span class="hljs-keyword">val</span> name: TextView = view.findViewById(R.id.txt_room_name)
        <span class="hljs-keyword">val</span> currentTemperature: TextView = view.findViewById(R.id.txt_current_temperature)
    }

    <span class="hljs-keyword">private</span> <span class="hljs-keyword">val</span> items = <span class="hljs-symbol">mutableListOf@</span><span class="hljs-symbol">LTRoomDto@</span>GT() <span class="hljs-comment">// (3)</span>

    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">setItems</span><span class="hljs-params">(rooms: <span class="hljs-type">List</span>@<span class="hljs-type">LTRoomDto</span>@<span class="hljs-type">GT</span>)</span></span> {  <span class="hljs-comment">// (4)</span>
        items.clear()
        items.addAll(rooms)
        notifyDataSetChanged()
    }

    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">getItemCount</span><span class="hljs-params">()</span></span>: <span class="hljs-built_in">Int</span> = items.size <span class="hljs-comment">// (5)</span>

    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreateViewHolder</span><span class="hljs-params">(parent: <span class="hljs-type">ViewGroup</span>, viewType: <span class="hljs-type">Int</span>)</span></span>: RoomsViewHolder { <span class="hljs-comment">// (6)</span>
        <span class="hljs-keyword">val</span> view = LayoutInflater.from(parent.context)
            .inflate(R.layout.activity_rooms_item, parent, <span class="hljs-literal">false</span>)
        <span class="hljs-keyword">return</span> RoomsViewHolder(view)
    }

    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onBindViewHolder</span><span class="hljs-params">(holder: <span class="hljs-type">RoomsViewHolder</span>, position: <span class="hljs-type">Int</span>)</span></span> {  <span class="hljs-comment">// (7)</span>
        <span class="hljs-keyword">val</span> roomDto = items[position]
        holder.apply {
            name.text = roomDto.name
            currentTemperature.text = roomDto.currentTemperature?.toString() ?: <span class="hljs-string">&quot;?&quot;</span>
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1723541686785.366')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) an adapter must implement <strong>RecyclerView.Adapter</strong> wich manage a <strong>RecyclerView.ViewHolder</strong></p>
</li>
<li>
<p>(2) we create a <strong>RoomsViewHolder</strong> which is able to hold fields defined in layout <strong>activity_rooms_item.xml</strong>. When you scroll through the list view, system does not recreate these fields. It will update the values via method (7)</p>
</li>
<li>
<p>(3) adapter has a mutable list to store elements to display</p>
</li>
<li>
<p>(4) method used to update the list content. This method will be called when data will be ready</p>
</li>
<li>
<p>(5) <strong>RecyclerView.Adapter</strong> abstract class asks you to implement a first method that returns the number of records</p>
</li>
<li>
<p>(6) <strong>RecyclerView.Adapter</strong> abstract class asks you to implement a second method used to initialize a <strong>ViewHolder</strong></p>
<div class="ulist">
<ul>
<li>
<p>we inflate <strong>activity_rooms_item.xml</strong> layout</p>
</li>
<li>
<p>we send it to  <strong>ViewHolder</strong> constructor</p>
</li>
</ul>
</div>
</li>
<li>
<p>(7) <strong>RecyclerView.Adapter</strong> abstract class asks you to implement a last method to define what to do when position in the list changes</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_display_the_room_list"><span class="icon">[flask&#93;</span> : Display the room list</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_update_room_list_activity">Update room list activity</h3>
<div class="paragraph">
<p>We will update the empty component created in <a href="android-add-menu.html#_create_a_new_activity">last session</a> called room list. We will add a Recycler view inside</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Open <strong>res @GT layout @GT activity_rooms.xml</strong> and delete the TextView</p>
</li>
<li>
<p>In <strong>Containers palette</strong> select a <strong>RecyclerView</strong> widget and drag into your layout below your welcome message.</p>
</li>
<li>
<p>This <strong>RecyclerView</strong> widget should have these properties</p>
<div class="ulist">
<ul>
<li>
<p><strong>id</strong> : <em>list_rooms</em></p>
</li>
<li>
<p><strong>margins</strong> : <em>16dp</em> Apply a top, right and left margin</p>
</li>
<li>
<p><strong>layout_width</strong> : widget should take all the width (0dp or match_parent)</p>
</li>
<li>
<p><strong>layout_height</strong> : widget should take all the height (0dp or match_parent)</p>
</li>
</ul>
</div>
</li>
</ol>
</div>
</div>
<div class="sect2">
<h3 id="_create_a_layout_for_a_list_item">Create a layout for a list item</h3>
<div class="paragraph">
<p>Each line in the <code>RecyclerView</code> is displayed in its own layout.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Select <strong>res @GT layout</strong> right click and choose <strong>New @GT Layout resource file</strong></p>
</li>
<li>
<p>Name your future layout <strong>activity_rooms_item.xml</strong></p>
</li>
<li>
<p>In <strong>Component Tree</strong> panel (below Palette panel) select ConstraintLayout (the main viewgroup) <strong>and update property</strong> <strong>layout_height</strong> to <em>wrap_content</em>. If you don&#8217;t, the view will always fill all the available height on its parent (our recyclerview) and you will still only see one element in your list and others will be hidden.</p>
</li>
<li>
<p>Add 3 <strong>Textviews</strong> : one for the room name, one for the current temperature label and a last one for the current temperature value</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>You should have this rendering</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/list/android-room-item.png" alt="Android item layout">
</div>
</div>
<div class="paragraph">
<p>You can use these properties on your TextFields</p>
</div>
<div class="paragraph">
<p><strong>Room name</strong></p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>id</strong> : <em>txt_room_name</em></p>
</li>
<li>
<p><strong>marginStart</strong> : <em>16dp</em></p>
</li>
<li>
<p><strong>marginTop</strong> : <em>16dp</em></p>
</li>
<li>
<p><strong>marginEnd</strong> : <em>16dp</em></p>
</li>
<li>
<p><strong>layout_width</strong> : <em>0dp</em> to have the name on all the width</p>
</li>
<li>
<p><strong>textStyle</strong> : <em>bold</em></p>
</li>
<li>
<p><strong>textAppearance</strong> : <em>@style/TextAppearance.AppCompat.Large</em></p>
</li>
<li>
<p><strong>text</strong> : <em>empty</em></p>
</li>
</ul>
</div>
<div class="paragraph">
<p><strong>Current temperature label</strong> put this element under the room name on the left</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>id</strong> : <em>txt_current_temperature_label</em></p>
</li>
<li>
<p><strong>marginStart</strong> : <em>16dp</em></p>
</li>
<li>
<p><strong>marginBottom</strong> : <em>16dp</em></p>
</li>
<li>
<p><strong>marginTop</strong> : <em>8dp</em></p>
</li>
<li>
<p><strong>marginEnd</strong> : <em>16dp</em></p>
</li>
<li>
<p><strong>layout_width</strong> : <em>wrap_content</em></p>
<div class="ulist">
<ul>
<li>
<p><strong>text</strong> : <em>@string/room_current_temperature</em></p>
</li>
</ul>
</div>
</li>
</ul>
</div>
<div class="paragraph">
<p><strong>Current temperature value</strong> put this element under the room name on the right of the label</p>
</div>
<div class="ulist">
<ul>
<li>
<p>A last TextView to display window room</p>
<div class="ulist">
<ul>
<li>
<p><strong>id</strong> : <em>txt_current_temperature_value</em></p>
</li>
<li>
<p><strong>marginStart</strong> : <em>16dp</em></p>
</li>
<li>
<p><strong>marginTop</strong> : <em>8dp</em></p>
</li>
<li>
<p><strong>marginEnd</strong> : <em>16dp</em></p>
</li>
<li>
<p><strong>layout_width</strong> : <em>0dp</em></p>
</li>
<li>
<p><strong>text</strong> : <em>empty</em></p>
</li>
</ul>
</div>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_create_an_adapter_class">Create an adapter class</h3>
<div class="paragraph">
<p>As we have seen in <a href="android-add-activity-list.html#_recyclerview">previous chapter</a>, an adapter manages the view holder objects. The adapter also binds the view holders to their data. It does this by assigning the view holder to a position.</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Create a new package <em>com.automacorp.adapter</em></p>
</li>
<li>
<p>Create inside a new class called <strong>RoomsAdapter</strong></p>
</li>
<li>
<p>You can copy the example done higher in the first chapter</p>
</li>
</ol>
</div>
</div>
<div class="sect2">
<h3 id="_update_roomsactivity_class">Update RoomsActivity class</h3>
<div class="paragraph">
<p>We need to initialize the recycler view</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1723541686789.7952"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomsActivity</span> : <span class="hljs-type">BasicActivity</span>() {
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onCreate</span><span class="hljs-params">(savedInstanceState: <span class="hljs-type">Bundle</span>?)</span></span> {
        <span class="hljs-keyword">super</span>.onCreate(savedInstanceState)
        setContentView(R.layout.activity_rooms)

        <span class="hljs-keyword">val</span> roomsAdapter = RoomAdapdter()

        <span class="hljs-symbol">findViewById@</span><span class="hljs-symbol">LTRecyclerView@</span>GT(R.id.list_rooms).also { recyclerView <span class="hljs-meta">@LAMBDA</span> <span class="hljs-comment">// (1)</span>
            recyclerView.layoutManager = LinearLayoutManager(<span class="hljs-keyword">this</span>) <span class="hljs-comment">// (2)</span>
            recyclerView.addItemDecoration(DividerItemDecoration(<span class="hljs-keyword">this</span>, DividerItemDecoration.VERTICAL)) <span class="hljs-comment">// (3)</span>
            recyclerView.setHasFixedSize(<span class="hljs-literal">true</span>) <span class="hljs-comment">// (4)</span>
            recyclerView.adapter = roomsAdapter <span class="hljs-comment">// (5)</span>
        }

        roomsAdapter.setItems(RoomService.ROOMS)  <span class="hljs-comment">// (6)</span>
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1723541686789.7952')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) we find the recycler view defined in layout by its id <code>list_rooms</code></p>
</li>
<li>
<p>(2) we have to define the default layout manager (the object which will be used to display a layout on each line)</p>
</li>
<li>
<p>(3) you can add a line between each line</p>
</li>
<li>
<p>(4) this indicator help the RecyclerView to optimize the display when all lines have the same size</p>
</li>
<li>
<p>(5) the adapter is linked to the RecyclerView</p>
</li>
<li>
<p>(6) data are sent to the adapter to display the lines</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>You can now launch your app. You should be able to see the default rooms</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/android/list/android-room-list.png" alt="Android list" width="300">
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_open_a_list_item"><span class="icon">[flask&#93;</span> : Open a list item</h2>
<div class="sectionbody">
<div class="paragraph">
<p>At this step we have a list of rooms. We would now open the detail of a room when the user clicks on an item in the list.</p>
</div>
<div class="sect2">
<h3 id="_declare_an_interface_to_define_a_contract">Declare an interface to define a contract</h3>
<div class="paragraph">
<p>You need to define an interface which defines a method called when a user clicks on an element</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1723541686789.3816"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">OnRoomClickListener</span> {
    <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">selectRoom</span><span class="hljs-params">(id: <span class="hljs-type">Long</span>)</span></span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1723541686789.3816')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>RoomsActivity</strong> will implement this interface and it will able to call <code>Roomctivity</code> and send it the given id</p>
</li>
<li>
<p><strong>RoomsAdapter</strong> will receive an instance of this interface (ie RoomsActivity) and call the method when a user will click on a line</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_update_roomsactivity">Update RoomsActivity</h3>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1723541686790.8088">We will implement the contract and create an Intent to <span class="hljs-keyword">open</span> a <span class="hljs-meta">@backtick</span><span class="hljs-meta">@RoomActivity</span><span class="hljs-meta">@backtick</span>@</code><button class="btn-copy-code" onclick="copyToClipboard('1723541686790.8088')">Copy</button></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre>class RoomsActivity : BasicActivity(), OnRoomClickListener {
   //...

   override fun selectRoom(id: Long) {
        val intent = Intent(this, RoomActivity::class.java).putExtra(MainActivity.ROOM_ID_PARAM, id)
        startActivity(intent)
    }
}</pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_update_the_let_adapter">Update the let adapter</h3>
<div class="paragraph">
<p>An instance of our interface <code>OnRoomClickListener</code> is sent in the adapter constructor, and we can call the method in a Click Event listener. In Android, you can interact with different all user events, each object has its own events&#8230;&#8203;.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1723541686790.0479"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomsAdapter</span>(<span class="hljs-keyword">val</span> listener: OnRoomClickListener): RecyclerView.<span class="hljs-symbol">Adapter@</span>LTRoomsAdapter.<span class="hljs-symbol">RoomsViewHolder@</span>GT() {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onBindViewHolder</span><span class="hljs-params">(holder: <span class="hljs-type">RoomsViewHolder</span>, position: <span class="hljs-type">Int</span>)</span></span> {
        <span class="hljs-keyword">val</span> roomDto = items[position]
        holder.apply {
            name.text = roomDto.name
            currentTemperature.text = roomDto.currentTemperature?.toString() ?: <span class="hljs-string">&quot;?&quot;</span>
            itemView.setOnClickListener { listener.selectRoom(roomDto.id) } <span class="hljs-comment">// (1)</span>
        }
    }

    <span class="hljs-keyword">override</span> <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">onViewRecycled</span><span class="hljs-params">(holder: <span class="hljs-type">RoomsViewHolder</span>)</span></span> { <span class="hljs-comment">// (2)</span>
        <span class="hljs-keyword">super</span>.onViewRecycled(holder)
        holder.apply {
            itemView.setOnClickListener(<span class="hljs-literal">null</span>)
        }

    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1723541686790.0479')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) listener is called when someone clicks on an item</p>
</li>
<li>
<p>(2) <strong>it&#8217;s very important to clear OnClickListener when a view holder is recycled to prevent memory leaks</strong></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Don&#8217;t forget to update <code>RoomsAdapter</code> constructor <code>val adapter = RoomsAdapter(this)</code> in <code>RoomsActivity</code></p>
</div>
<div class="paragraph">
<p>You can also update the <code>android:parentActivityName</code> of the <code>RoomActivity</code> to return on the list after a back button</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_more">More&#8230;&#8203;</h2>
<div class="sectionbody">
<div class="paragraph">
<p>If you want more explanations about RecyclerView you can read this <a href="https://codelabs.developers.google.com/codelabs/kotlin-android-training-recyclerview-fundamentals/index.html?index=..%2F..android-kotlin-fundamentals#2">codelabs</a> made by Google</p>
</div>
</div>
</div>`;