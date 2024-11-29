export const _android_add_activity_list:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_lazycolumn_lazyrow">LazyColumn &amp; LazyRow</a></li>
<li><a class="link" fragment="#_flask_display_the_room_list"><span class="icon">[flask&#93;</span> : Display the room list</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_create_a_composable_to_display_a_room_in_the_list">Create a composable to display a room in the list</a></li>
<li><a class="link" fragment="#_update_the_activity_to_display_the_list_of_rooms">Update the activity to display the list of rooms</a></li>
<li><a class="link" fragment="#_open_a_room_detail_when_clicking_on_a_room">Open a room detail when clicking on a room</a></li>
</ul>
</li>
<li><a class="link" fragment="#_more">More&#8230;&#8203;</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>In this lesson, you will learn how to populate a list of room in our empty rooms screen (you should have created this activity in the last lab).</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/android-activity-list.png" alt="Create an activity list" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_lazycolumn_lazyrow">LazyColumn &amp; LazyRow</h2>
<div class="sectionbody">
<div class="paragraph">
<p>When you want to create a list view you can use the <code>Row</code> and <code>Column</code> composables with the modifier <code>verticalScroll</code> to create a list of elements. But if you have a lot of elements, it&#8217;s not the best way to do it.</p>
</div>
<div class="paragraph">
<p>You should use a <code>LazyColumn</code> or <code>LazyRow</code> composables (equivalent to the legacy <strong>RecyclerView</strong> widget). These elements are able to manage a large data sets and scrool between elements.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451034.1208">LazyColumn {
    item {
        Header()
    }
    items(<span class="hljs-keyword">data</span>) { item <span class="hljs-meta">@LAMBDA</span>
        PhotoItem(item)
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451034.1208')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The Lazy components are responsible for adding the each item’s content as required by the layout and scroll position.</p>
</div>
<div class="paragraph">
<p>For example, if your list shows music collection, each item might represent a single album. The composable creates only as many view items as are needed to display the on-screen portion of the dynamic content, plus a few extra. As the user scrolls through the list, the composable takes the off-screen views and rebinds them to the data which is scrolling onto the screen.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/list/android-listview.png" alt="Android RecyclerView">
</div>
</div>
<div class="paragraph">
<p>Compose provide also a <code>LazyVerticalGrid</code> and <code>LazyHorizontalGrid</code> to display a grid of elements. Grids have the same powerful API capabilities as lists.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/list/grid.png" alt="Grid example" width="400">
</div>
</div>
<div class="paragraph">
<p>If you need to create a very large list of elements, you can use the <a href="https://developer.android.com/develop/ui/compose/lists?hl=en#lazy-staggered-grid">LazyVerticalStaggeredGrid</a> to automatically load more data when the user scrolls to the end of the list.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_display_the_room_list"><span class="icon">[flask&#93;</span> : Display the room list</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Open the activity created in the last labs and called <code>RoomListActivity</code>. For the moment we have a basic composable with a single Text component. We will now add a list of rooms.</p>
</div>
<div class="sect2">
<h3 id="_create_a_composable_to_display_a_room_in_the_list">Create a composable to display a room in the list</h3>
<div class="paragraph">
<p>You can create a new composable called <code>RoomItem</code> to display a room in the list. This composable will take a <code>Room</code> object as parameter and display the name of the room and the current temperature.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/list/item-example.png" alt="Item example" width="500">
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451035.8318"><span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">RoomItem</span><span class="hljs-params">(room: <span class="hljs-type">RoomDto</span>, modifier: <span class="hljs-type">Modifier</span> = Modifier)</span></span> {
    Card(colors = CardDefaults.cardColors(containerColor = Color.Transparent),
        border = BorderStroke(<span class="hljs-number">1.</span>dp, PurpleGrey80)
    ) {
        Row(
            modifier = modifier.padding(<span class="hljs-number">20.</span>dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column {
                Text(
                    text = room.name,
                    style = MaterialTheme.typography.bodyLarge,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = <span class="hljs-string">&quot;Target temperature : &quot;</span> + (room.targetTemperature?.toString() ?: <span class="hljs-string">&quot;?&quot;</span>) + <span class="hljs-string">&quot;°&quot;</span>,
                    style = MaterialTheme.typography.bodySmall
                )
            }
            Text(
                text = (room.currentTemperature?.toString() ?: <span class="hljs-string">&quot;?&quot;</span>) + <span class="hljs-string">&quot;°&quot;</span>,
                style = MaterialTheme.typography.headlineLarge,
                textAlign = TextAlign.Right,
                modifier = Modifier.fillMaxSize()
            )
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451035.8318')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>This composable is a <code>Card</code> with a <code>Row</code> inside. The <code>Row</code> contains a <code>Column</code> with the room name and the target temperature and a <code>Text</code> with the current temperature. We used different styles to display the text.</p>
</div>
<div class="paragraph">
<p>You can add a function to preview this composable</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451035.0022"><span class="hljs-meta">@Preview(showBackground = true)</span>
<span class="hljs-meta">@Composable</span>
<span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">RoomItemPreview</span><span class="hljs-params">()</span></span> {
    AutomacorpTheme {
        RoomItem(RoomService.ROOMS[<span class="hljs-number">0</span>])
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451035.0022')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_update_the_activity_to_display_the_list_of_rooms">Update the activity to display the list of rooms</h3>
<div class="paragraph">
<p>You can now use a <code>LazyColumn</code> to display the list of rooms. You can use the <code>items</code> function to iterate over the list of rooms and display a <code>RoomItem</code> for each room.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451035.078"> LazyColumn(
    contentPadding = PaddingValues(<span class="hljs-number">4.</span>dp),
    verticalArrangement = Arrangement.spacedBy(<span class="hljs-number">8.</span>dp),
    modifier = Modifier.padding(innerPadding),
) {
    <span class="hljs-keyword">val</span> rooms = RoomService.findAll()
    items(rooms, key = { it.id }) {
        RoomItem(
            room = it,
            modifier = Modifier
        )
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451035.078')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Now if you run your app, you should see the list of rooms.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/android/list/list-example.png" alt="Item example" width="500">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_open_a_room_detail_when_clicking_on_a_room">Open a room detail when clicking on a room</h3>
<div class="paragraph">
<p>Now we will add a click listener on the <code>RoomItem</code> to open the detail of a room when the user clicks on a room. You can add the <code>clickable</code> modifier to each item in the grid to implement this behavior.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451035.6843">items(rooms, key = { it.id }) {
    RoomItem(
        room = it,
        modifier = Modifier.clickable { openRoom(it.id) },
    )
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451035.6843')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Now you can create a function <code>openRoom</code> to create an Intent to open the detail of a room (ie <code>RoomDetailActivity</code>).</p>
</div>
<div class="paragraph">
<p>For the moment, <code>RoomDetailActivity</code> should return on the 'MainActicity@backtick@ when the user clicks on the back button. You can update the function to return on the list of rooms.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_more">More&#8230;&#8203;</h2>
<div class="sectionbody">
<div class="paragraph">
<p>If you want more explanations about list and grid you can read this <a href="https://developer.android.com/develop/ui/compose/lists">article</a> made by Google</p>
</div>
</div>
</div>`;