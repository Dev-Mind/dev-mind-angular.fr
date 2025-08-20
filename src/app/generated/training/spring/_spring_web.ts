export const _spring_web:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_introduction">Introduction</a></li>
<li><a class="link" fragment="#_data_transfert_object">Data Transfert Object</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_serialization">Serialization</a></li>
<li><a class="link" fragment="#_mapper">Mapper</a></li>
<li><a class="link" fragment="#_flask_create_your_dto_and_their_mapper"><span class="icon">[flask&#93;</span> : Create your DTO and their mapper</a></li>
</ul>
</li>
<li><a class="link" fragment="#_http">HTTP</a></li>
<li><a class="link" fragment="#_rest">REST</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_write_a_controller">Write a controller</a></li>
<li><a class="link" fragment="#_test_a_controller">Test a controller</a></li>
</ul>
</li>
<li><a class="link" fragment="#_flask_create_your_rest_services"><span class="icon">[flask&#93;</span> : Create your rest services</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_a_basic_example">A basic example</a></li>
<li><a class="link" fragment="#_test_your_service_in_your_browser">Test your service in your browser</a></li>
<li><a class="link" fragment="#_test_your_service_with_springdoc_openapi_and_swagger_ui">Test your service with SpringDoc, OpenApi and Swagger UI</a></li>
<li><a class="link" fragment="#_add_sensorcontroller">Add SensorController</a></li>
<li><a class="link" fragment="#_more_rest_service">More Rest service</a></li>
</ul>
</li>
<li><a class="link" fragment="#_resttemplate">RestTemplate</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_how_use_resttemplate">How use RestTemplate ?</a></li>
<li><a class="link" fragment="#_flask_call_a_remote_rest_api"><span class="icon">[flask&#93;</span> Call a remote REST API</a></li>
</ul>
</li>
</ul>
</div>
<div class="sect1">
<h2 id="_introduction">Introduction</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Spring purpose 2 web frameworks to build an application : the Servlet-based <a href="https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#spring-web">Spring MVC</a> web framework and, in parallel, the <a href="https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html#spring-webflux">Spring WebFlux</a> reactive web framework.</p>
</div>
<div class="paragraph">
<p>In this course we will focus on <a href="https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#spring-web">Spring MVC</a> because this framework is the most used.</p>
</div>
<div class="paragraph">
<p><a href="https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#spring-web">Spring MVC</a> helps you write web applications and takes care of a lot of boilerplate code, so you just have to focus on your application features.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-boot.png" alt="spring boot" width="800">
</div>
</div>
<div class="paragraph">
<p>With Spring Web (Spring MVC) you can write screens with a template solution which are used to generate HTML. But we don&#8217;t use this solution in this course. We will see how to write REST services. However if you are interested you can read <a href="https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-view">official documentation</a>.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/spring-mvc.png" alt="spring mvc" width="800">
</div>
</div>
<div class="paragraph">
<p>With Spring Web you can expose REST services to another app (web api, JS app, android app&#8230;&#8203;).This is the purpose of this lesson.You will learn how to develop endpoints on a backend application.These REST endpoints will be used later by a JS app or an Android app.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/mvc-rest.png" alt="mvc rest" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_data_transfert_object">Data Transfert Object</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_serialization">Serialization</h3>
<div class="paragraph">
<p>A DTO is an object that carries data between processes. Data need to be serializable to go across the HTTP connection</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/dto.png" alt="dto" width="800">
</div>
</div>
<div class="paragraph">
<p>Serialization is the process of translating data structures or object into a format that can be transmitted</p>
</div>
<div class="paragraph">
<p>A DTO is often just a POJO (Plain Old Java Object), a bunch of fields and the getters and setters for them. Since Java 16 you can also use Record objects.</p>
</div>
<div class="paragraph">
<p>A record is a class that has specific characteristics:</p>
</div>
<div class="ulist">
<ul>
<li>
<p>this is a final class which cannot be enriched by inheritance from another record or from another class</p>
</li>
<li>
<p>each element of the description is encapsulated in a private and final field to guarantee immutability</p>
</li>
<li>
<p>a public getter is proposed for each element</p>
</li>
<li>
<p>a default <code>equals()</code> and <code>hashCode()</code> methods are provided, but you can override them.</p>
</li>
</ul>
</div>
<div class="listingblock small">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474767.231"><span class="hljs-keyword">public</span> <span class="hljs-keyword">record</span> <span class="hljs-title class_">Sensor</span><span class="hljs-params">(Long id, String name, Double value, SensorType sensorType)</span> {
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474767.231')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>DTO will be used to transfer and to receive data in our REST controllers (entry point in our Java webapp).</p>
</div>
</div>
<div class="sect2">
<h3 id="_mapper">Mapper</h3>
<div class="paragraph">
<p>You can write an util class to help the DTO creation from an entity or the entity creation from a DTO. This class is called a mapper.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474767.2383"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SensorMapper</span> {
  <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> Sensor <span class="hljs-title function_">of</span><span class="hljs-params">(SensorEntity sensor)</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Sensor</span>(
        sensor.getId(),
        sensor.getName(),
        sensor.getValue(),
        sensor.getSensorType()
    );
  }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474767.2383')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_flask_create_your_dto_and_their_mapper"><span class="icon">[flask&#93;</span> : Create your DTO and their mapper</h3>
<div class="paragraph">
<p>Create a record object for your respective entities : <code>SensorEntity</code>, <code>WindowEntity</code>, <code>RoomEntity</code>, &#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>To prevent cycle in your record you should not map the bidirectional relation between a room and its windows. For example your record for the window can only mapped the room id.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474767.9045"><span class="hljs-keyword">public</span> <span class="hljs-keyword">record</span> <span class="hljs-title class_">Window</span><span class="hljs-params">(Long id, String name, Sensor windowStatus, Long roomId)</span> {
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474767.9045')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Create mappers to create a record from an entity</p>
</div>
<div class="paragraph">
<p>Write a test for each mapper. As I am nice I will give you 2 useful classes.</p>
</div>
<div class="paragraph">
<p>One to create fake entities in your tests. <code>FakeEntityBuilder</code> expose different static methods to create entities</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474768.0393"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">FakeEntityBuilder</span> {

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> RoomEntity <span class="hljs-title function_">createRoomEntity</span><span class="hljs-params">(Long id, String name, BuildingEntity building)</span> {
        <span class="hljs-comment">// Sensor is recreated before each test</span>
        <span class="hljs-type">RoomEntity</span> <span class="hljs-variable">entity</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RoomEntity</span>(
                name,
                createSensorEntity(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Temp&quot;</span>, TEMPERATURE, <span class="hljs-number">23.2</span>),
                <span class="hljs-number">1</span>);

        entity.setBuilding(building);
        entity.setTargetTemperature(<span class="hljs-number">26.4</span>);
        entity.setId(id);
        entity.setWindows(Set.of(
                createWindowEntity(id * <span class="hljs-number">10</span> + <span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Window1&quot;</span> + name, entity),
                createWindowEntity(id * <span class="hljs-number">10</span> + <span class="hljs-number">2L</span>, <span class="hljs-string">&quot;Window2&quot;</span> + name, entity)
        ));
        entity.setHeaters(Set.of(
                createHeaterEntity(id * <span class="hljs-number">10</span> + <span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Heater1&quot;</span> + name, entity),
                createHeaterEntity(id * <span class="hljs-number">10</span> + <span class="hljs-number">2L</span>, <span class="hljs-string">&quot;Heater2&quot;</span> + name, entity)
        ));
        <span class="hljs-keyword">return</span> entity;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> WindowEntity <span class="hljs-title function_">createWindowEntity</span><span class="hljs-params">(Long id, String name, RoomEntity roomEntity)</span> {
        <span class="hljs-comment">// Sensor is recreated before each test</span>
        <span class="hljs-type">WindowEntity</span> <span class="hljs-variable">windowEntity</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WindowEntity</span>(
                name,
                createSensorEntity(id * <span class="hljs-number">10</span> + <span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Status&quot;</span> + id, SensorType.STATUS, <span class="hljs-number">0.0</span>),
                roomEntity
        );
        windowEntity.setId(id);
        <span class="hljs-keyword">return</span> windowEntity;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> HeaterEntity <span class="hljs-title function_">createHeaterEntity</span><span class="hljs-params">(Long id, String name, RoomEntity roomEntity)</span> {
        <span class="hljs-comment">// Sensor is recreated before each test</span>
        <span class="hljs-type">HeaterEntity</span> <span class="hljs-variable">heaterEntity</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">HeaterEntity</span>(
                name,
                createSensorEntity(id * <span class="hljs-number">10</span> + <span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Status&quot;</span> + id, SensorType.STATUS, <span class="hljs-number">0.0</span>),
                roomEntity
        );
        heaterEntity.setId(id);
        <span class="hljs-keyword">return</span> heaterEntity;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> SensorEntity <span class="hljs-title function_">createSensorEntity</span><span class="hljs-params">(Long id, String name, SensorType type, Double value)</span> {
        <span class="hljs-comment">// Sensor is recreated before each test</span>
        <span class="hljs-type">SensorEntity</span> <span class="hljs-variable">sensorEntity</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SensorEntity</span>(type, name);
        sensorEntity.setId(id);
        sensorEntity.setValue(value);
        <span class="hljs-keyword">return</span> sensorEntity;
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474768.0393')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>And the class to test the most complicated mapper</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474768.8936"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RoomMapperTest</span> {

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldMapRoom</span><span class="hljs-params">()</span> {
        <span class="hljs-comment">// Arrange</span>
        <span class="hljs-type">RoomEntity</span> <span class="hljs-variable">roomEntity</span> <span class="hljs-operator">=</span> FakeEntityBuilder.createBuildingEntity(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Building&quot;</span>)
                .getRooms()
                .stream()
                .min(Comparator.comparing(RoomEntity::getName))
                .orElseThrow(IllegalArgumentException::<span class="hljs-keyword">new</span>);

        <span class="hljs-comment">// Act</span>
        <span class="hljs-type">Room</span> <span class="hljs-variable">room</span> <span class="hljs-operator">=</span> RoomMapper.of(roomEntity);

        <span class="hljs-comment">// Assert</span>
        <span class="hljs-type">Room</span> <span class="hljs-variable">expectedRoom</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Room</span>(
                <span class="hljs-number">11L</span>,
                <span class="hljs-string">&quot;Room1Building&quot;</span>,
                <span class="hljs-number">1</span>,
                <span class="hljs-number">23.2</span>,
                <span class="hljs-number">26.4</span>,
                List.of(
                        <span class="hljs-keyword">new</span> <span class="hljs-title class_">Window</span>(
                                <span class="hljs-number">111L</span>,
                                <span class="hljs-string">&quot;Window1Room1Building&quot;</span>,
                                WindowStatus.CLOSED,
                                <span class="hljs-number">11L</span>
                        ),
                        <span class="hljs-keyword">new</span> <span class="hljs-title class_">Window</span>(
                                <span class="hljs-number">112L</span>,
                                <span class="hljs-string">&quot;Window2Room1Building&quot;</span>,
                                WindowStatus.CLOSED,
                                <span class="hljs-number">11L</span>
                        )
                ),
                List.of(
                        <span class="hljs-keyword">new</span> <span class="hljs-title class_">Heater</span>(
                                <span class="hljs-number">111L</span>,
                                <span class="hljs-string">&quot;Heater1Room1Building&quot;</span>,
                                HeaterStatus.OFF,
                                <span class="hljs-number">11L</span>
                        ),
                        <span class="hljs-keyword">new</span> <span class="hljs-title class_">Heater</span>(
                                <span class="hljs-number">112L</span>,
                                <span class="hljs-string">&quot;Heater2Room1Building&quot;</span>,
                                HeaterStatus.OFF,
                                <span class="hljs-number">11L</span>
                        )
                )
        );
        Assertions.assertThat(room).usingRecursiveAssertion().isEqualTo(expectedRoom);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474768.8936')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_http">HTTP</h2>
<div class="sectionbody">
<div class="paragraph">
<p>The Hypertext Transfer Protocol (HTTP) is an application protocol used for data communication on the World Wide Web.</p>
</div>
<div class="paragraph">
<p>HTTP defines methods (sometimes referred to as verbs) to indicate the desired action to be performed on the identified <strong>resource</strong></p>
</div>
<div class="paragraph">
<p>A resource can be an image, a video, an HTML page, a JSON document.</p>
</div>
<div class="paragraph">
<p>To receive a response you have to send a request with a verb in a client an application as Curl, Wget&#8230;&#8203;. or with a website</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/http-verbs.png" alt="http verbs" width="800">
</div>
</div>
<div class="paragraph">
<p>Each HTTP response has a status identified by a code. This code is sent by the server, by your app</p>
</div>
<div class="ulist">
<ul>
<li>
<p>1XX : Wait… request in progress</p>
</li>
<li>
<p>2XX : Here ! I send you a resource</p>
</li>
<li>
<p>3XX : Go away !</p>
</li>
<li>
<p>4XX : You made a mistake</p>
</li>
<li>
<p>5XX : I made a mistake</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_rest">REST</h2>
<div class="sectionbody">
<div class="paragraph">
<p>HTTP requests are handled by the methods of a REST service. In Spring’s approach a REST service is a controller. It is able to respond to HTTP requests</p>
</div>
<div class="ulist">
<ul>
<li>
<p>GET: read resource</p>
</li>
<li>
<p>POST: creates new record or executing a query</p>
</li>
<li>
<p>PUT: edit a resource (sometimes we use only a post request)</p>
</li>
<li>
<p>DELETE: delete a record</p>
</li>
</ul>
</div>
<div class="sect2">
<h3 id="_write_a_controller">Write a controller</h3>
<div class="paragraph">
<p>Controllers are the link between the web http clients (browsers, mobiles) and your application. They should be lightweight and call other components in your application to perform actual work (DAO for example).</p>
</div>
<div class="paragraph">
<p>These components are easily identified by the <code>@RestController</code> annotation.</p>
</div>
<div class="paragraph">
<p>Example of addressable resources
Node Express server listening on <a href="http://localhost:4000" class="bare">http://localhost:4000</a></p>
</div>
<div class="ulist">
<ul>
<li>
<p>Retrieve a sensor list : GET <code>/api/sensors</code></p>
</li>
<li>
<p>Retrieve a particular sensor : GET <code>/api/sensors/{sensor_id}</code></p>
</li>
<li>
<p>Create a sensor : POST <code>/api/sensors</code></p>
</li>
<li>
<p>Update a sensor : PUT <code>/api/sensors/{sensor_id}</code></p>
</li>
<li>
<p>Delete a sensor : DELETE <code>/api/sensors/{sensor_id}</code></p>
</li>
</ul>
</div>
<div class="paragraph">
<p>This SensorController handles GET requests for <code>/api/sensors</code> by returning a list of Window.</p>
</div>
<div class="paragraph">
<p>A complete example to manage sensors</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474769.1873"><span class="hljs-meta">@CrossOrigin</span>
<span class="hljs-meta">@RestController</span> <span class="hljs-comment">// (1)</span>
<span class="hljs-meta">@RequestMapping(&quot;/api/sensors&quot;)</span> <span class="hljs-comment">// (2)</span>
<span class="hljs-meta">@Transactional</span> <span class="hljs-comment">// (3)</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SensorController</span> {
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">final</span> SensorDao sensorDao;

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">SensorController</span><span class="hljs-params">(SensorDao sensorDao)</span> {
        <span class="hljs-built_in">this</span>.sensorDao = sensorDao;
    }

    <span class="hljs-meta">@GetMapping</span> <span class="hljs-comment">// (5)</span>
    <span class="hljs-keyword">public</span> List<span class="hljs-meta">@LTSensor</span><span class="hljs-meta">@GT</span> findAll() {
        <span class="hljs-keyword">return</span> sensorDao.findAll()
                .stream()
                .map(SensorMapper::of)
                .sorted(Comparator.comparing(Sensor::name))
                .collect(Collectors.toList());  <span class="hljs-comment">// (6)</span>
    }

    <span class="hljs-meta">@GetMapping(path = &quot;/{id}&quot;)</span>
    <span class="hljs-keyword">public</span> Sensor <span class="hljs-title function_">findById</span><span class="hljs-params">(<span class="hljs-meta">@PathVariable</span> Long id)</span> {
        <span class="hljs-keyword">return</span> sensorDao.findById(id).map(SensorMapper::of).orElse(<span class="hljs-literal">null</span>); <span class="hljs-comment">// (7)</span>
    }

    <span class="hljs-meta">@PostMapping</span> <span class="hljs-comment">// (8)</span>
    <span class="hljs-keyword">public</span> ResponseEntity<span class="hljs-meta">@LTSensor</span><span class="hljs-meta">@GT</span> create(<span class="hljs-meta">@RequestBody</span> SensorCommand sensor) { <span class="hljs-comment">// (9)</span>
        <span class="hljs-type">SensorEntity</span> <span class="hljs-variable">entity</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SensorEntity</span>(sensor.sensorType(), sensor.name());
        entity.setValue(sensor.value());
        <span class="hljs-type">SensorEntity</span> <span class="hljs-variable">saved</span> <span class="hljs-operator">=</span> sensorDao.save(entity);
        <span class="hljs-keyword">return</span> ResponseEntity.ok(SensorMapper.of(saved));
    }

    <span class="hljs-meta">@PutMapping(path = &quot;/{id}&quot;)</span> <span class="hljs-comment">// (10)</span>
    <span class="hljs-keyword">public</span> ResponseEntity<span class="hljs-meta">@LTSensor</span><span class="hljs-meta">@GT</span> update(<span class="hljs-meta">@PathVariable</span> Long id, <span class="hljs-meta">@RequestBody</span> SensorCommand sensor) {
        <span class="hljs-type">SensorEntity</span> <span class="hljs-variable">entity</span> <span class="hljs-operator">=</span> sensorDao.findById(id).orElse(<span class="hljs-literal">null</span>);
        <span class="hljs-keyword">if</span> (entity == <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">return</span> ResponseEntity.badRequest().build();
        }
        entity.setValue(sensor.value());
        entity.setName(sensor.name());
        entity.setSensorType(sensor.sensorType());
        <span class="hljs-comment">// (11)</span>
        <span class="hljs-keyword">return</span> ResponseEntity.ok(SensorMapper.of(entity));
    }

    <span class="hljs-meta">@DeleteMapping(path = &quot;/{id}&quot;)</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">delete</span><span class="hljs-params">(<span class="hljs-meta">@PathVariable</span> Long id)</span> {
        sensorDao.deleteById(id);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474769.1873')">Copy</button></pre>
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>(1) <strong>RestController</strong> is a Spring stereotype to mark a class as a rest service</p>
</li>
<li>
<p>(2) <strong>@RequestMapping</strong> is used to define a global URL prefix used to manage a resource (in our example all requests that start with <code>/api/sensors</code> will be handle by this controller)</p>
</li>
<li>
<p>(3) <strong>@Transactional</strong> is used to delegate a transaction opening to Spring. Spring will initiate a transaction for each entry point of this controller. This is important because with Hibernate you cannot execute a query outside of a transaction.</p>
</li>
<li>
<p>(4) DAO used by this controller is injected via constructor</p>
</li>
<li>
<p>(5) <strong>@GetMapping</strong> indicates that the following method will respond to a GET request. This method will return a sensor list. We transform our entities <code>SensorEntity</code> in DTO <code>Sensor</code></p>
</li>
<li>
<p>(6) (7) We use <a href="https://www.oracle.com/technical-resources/articles/java/ma14-java-se-8-streams.html">Java Stream API</a> to manipulate our data</p>
</li>
<li>
<p>(8) <strong>@PostMapping</strong> indicates that the following method will respond to a POST request (for creation).</p>
</li>
<li>
<p>(9) To return HTTP errors the method return a <code>ResponseEntity</code>. This object contains different builders to manipulate the HTTP response</p>
</li>
<li>
<p>(10) <strong>@PutMapping</strong> indicates that the following method will respond to a PUT request (for creation).</p>
</li>
<li>
<p>(11) For an update you don&#8217;t need to call the DAO save method. The <code>findById</code> attach the entity to the persistence context and each update will be updated when the transaction will be commited.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Note, that we don&#8217;t use the same object for an update or a creation. We often use simples command object where all relationships are flatten. Here the command object is this one</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474769.119"><span class="hljs-keyword">public</span> <span class="hljs-keyword">record</span> <span class="hljs-title class_">SensorCommand</span><span class="hljs-params">(String name, Double value, SensorType sensorType)</span> {
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474769.119')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>If this object has a relationship with another (for example a Room). The object for reading will return a complete Room object. The command object would only contain the data necessary to create/update ie a roomId. Sometimes we can use an object specific to creation, another to update.</p>
</div>
</div>
<div class="sect2">
<h3 id="_test_a_controller">Test a controller</h3>
<div class="paragraph">
<p>To check if Spring MVC controllers are working as expected, use the <code>@WebMvcTest</code> annotation. <code>@WebMvcTest</code> auto-configures the Spring MVC infrastructure and the Mock MVC component.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Mock MVC offers a powerful way to quickly test MVC controllers without needing to start a full HTTP server.</p>
</li>
<li>
<p>Annotation <code>@MockBean</code> provides mock implementations for required collaborators in place of the real implementations.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>With Mock MVC you can perform requests for each HTTP methods</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474769.4287"><span class="hljs-comment">// static import of MockMvcRequestBuilders.*</span>

<span class="hljs-comment">// a post example</span>
mockMvc.perform(post(<span class="hljs-string">&quot;/hotels/{id}&quot;</span>, <span class="hljs-number">42</span>).accept(MediaType.APPLICATION_JSON));

<span class="hljs-comment">// you can specify query parameters in URI template style</span>
mockMvc.perform(get(<span class="hljs-string">&quot;/hotels&quot;</span>).param(<span class="hljs-string">&quot;thing&quot;</span>, <span class="hljs-string">&quot;somewhere&quot;</span>));</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474769.4287')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can define expectations by appending one or more andExpect(..) calls after performing a request, as the following example shows. As soon as one expectation fails, no other expectations will be asserted.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474769.9941"><span class="hljs-comment">// static import of MockMvcRequestBuilders.* and MockMvcResultMatchers.*</span>

mockMvc.perform(get(<span class="hljs-string">&quot;/accounts/1&quot;</span>)).andExpect(status().isOk());</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474769.9941')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can use <a href="https://goessner.net/articles/JsonPath/index.html#e2">Json path expression</a> to check your JSON result. And if you want to test your syntax this <a href="https://jsonpath.com/">website</a> will help you.</p>
</div>
<div class="paragraph">
<p>You can find several example in the <code>SensorController</code> test</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474770.2039"><span class="hljs-keyword">package</span> com.emse.spring.automacorp.web;

<span class="hljs-keyword">import</span> com.emse.spring.automacorp.dao.SensorDao;
<span class="hljs-keyword">import</span> com.emse.spring.automacorp.model.SensorEntity;
<span class="hljs-keyword">import</span> com.emse.spring.automacorp.model.SensorType;
<span class="hljs-keyword">import</span> com.emse.spring.automacorp.record.Sensor;
<span class="hljs-keyword">import</span> com.emse.spring.automacorp.record.SensorMapper;
<span class="hljs-keyword">import</span> com.fasterxml.jackson.databind.ObjectMapper;
<span class="hljs-keyword">import</span> org.hamcrest.Matchers;
<span class="hljs-keyword">import</span> org.junit.jupiter.api.Test;
<span class="hljs-keyword">import</span> org.mockito.Mockito;
<span class="hljs-keyword">import</span> org.springframework.beans.factory.annotation.Autowired;
<span class="hljs-keyword">import</span> org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
<span class="hljs-keyword">import</span> org.springframework.boot.test.mock.mockito.MockBean;
<span class="hljs-keyword">import</span> org.springframework.http.MediaType;
<span class="hljs-keyword">import</span> org.springframework.test.web.servlet.MockMvc;
<span class="hljs-keyword">import</span> org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
<span class="hljs-keyword">import</span> org.springframework.test.web.servlet.result.MockMvcResultMatchers;

<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Optional;


<span class="hljs-meta">@WebMvcTest(SensorController.class)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">SensorControllerTest</span> {
    <span class="hljs-comment">// Spring object to mock call to our app</span>
    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">private</span> MockMvc mockMvc;

    <span class="hljs-comment">// The serializer used by Spring to send and receive data to/from the REST controller</span>
    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">private</span> ObjectMapper objectMapper;

    <span class="hljs-comment">// We choose to mock the DAO used in the REST controller to limit the scope of our test</span>
    <span class="hljs-meta">@MockBean</span>
    <span class="hljs-keyword">private</span> SensorDao sensorDao;

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldFindAll</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {
        Mockito.when(sensorDao.findAll()).thenReturn(List.of(
                FakeEntityBuilder.createSensorEntity(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Temperature room 1&quot;</span>),
                FakeEntityBuilder.createSensorEntity(<span class="hljs-number">2L</span>, <span class="hljs-string">&quot;Temperature room 2&quot;</span>)
        ));

        mockMvc.perform(MockMvcRequestBuilders.get(<span class="hljs-string">&quot;/api/sensors&quot;</span>).accept(MediaType.APPLICATION_JSON))
                <span class="hljs-comment">// check the HTTP response</span>
                .andExpect(MockMvcResultMatchers.status().isOk())
                <span class="hljs-comment">// the content can be tested with Json path</span>
                .andExpect(
                        MockMvcResultMatchers
                                .jsonPath(<span class="hljs-string">&quot;[*].name&quot;</span>)
                                .value(Matchers.containsInAnyOrder(<span class="hljs-string">&quot;Temperature room 1&quot;</span>, <span class="hljs-string">&quot;Temperature room 2&quot;</span>))
                );
    }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldReturnNullWhenFindByUnknownId</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {
        Mockito.when(sensorDao.findById(<span class="hljs-number">999L</span>)).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get(<span class="hljs-string">&quot;/api/sensors/999&quot;</span>).accept(MediaType.APPLICATION_JSON))
                <span class="hljs-comment">// check the HTTP response</span>
                .andExpect(MockMvcResultMatchers.status().isOk())
                <span class="hljs-comment">// the content can be tested with Json path</span>
                .andExpect(MockMvcResultMatchers.content().string(<span class="hljs-string">&quot;&quot;</span>));
    }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldFindById</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {
        <span class="hljs-type">SensorEntity</span> <span class="hljs-variable">sensorEntity</span> <span class="hljs-operator">=</span> FakeEntityBuilder.createSensorEntity(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Temperature room 1&quot;</span>);
        Mockito.when(sensorDao.findById(<span class="hljs-number">999L</span>)).thenReturn(Optional.of(sensorEntity));

        mockMvc.perform(MockMvcRequestBuilders.get(<span class="hljs-string">&quot;/api/sensors/999&quot;</span>).accept(MediaType.APPLICATION_JSON))
                <span class="hljs-comment">// check the HTTP response</span>
                .andExpect(MockMvcResultMatchers.status().isOk())
                <span class="hljs-comment">// the content can be tested with Json path</span>
                .andExpect(MockMvcResultMatchers.jsonPath(<span class="hljs-string">&quot;@dollar@.name&quot;</span>).value(<span class="hljs-string">&quot;Temperature room 1&quot;</span>));
    }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldNotUpdateUnknownEntity</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {
        <span class="hljs-type">SensorEntity</span> <span class="hljs-variable">sensorEntity</span> <span class="hljs-operator">=</span> FakeEntityBuilder.createSensorEntity(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Temperature room 1&quot;</span>);
        <span class="hljs-type">SensorCommand</span> <span class="hljs-variable">expectedSensor</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SensorCommand</span>(sensorEntity.getName(), sensorEntity.getValue(), sensorEntity.getSensorType());
        <span class="hljs-type">String</span> <span class="hljs-variable">json</span> <span class="hljs-operator">=</span> objectMapper.writeValueAsString(expectedSensor);

        Mockito.when(sensorDao.findById(<span class="hljs-number">1L</span>)).thenReturn(Optional.empty());

        mockMvc.perform(
                        MockMvcRequestBuilders
                                .put(<span class="hljs-string">&quot;/api/sensors/1&quot;</span>)
                                .content(json)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                )
                <span class="hljs-comment">// check the HTTP response</span>
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldUpdate</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {
        <span class="hljs-type">SensorEntity</span> <span class="hljs-variable">sensorEntity</span> <span class="hljs-operator">=</span> FakeEntityBuilder.createSensorEntity(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Temperature room 1&quot;</span>);
        <span class="hljs-type">SensorCommand</span> <span class="hljs-variable">expectedSensor</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SensorCommand</span>(sensorEntity.getName(), sensorEntity.getValue(), sensorEntity.getSensorType());
        <span class="hljs-type">String</span> <span class="hljs-variable">json</span> <span class="hljs-operator">=</span> objectMapper.writeValueAsString(expectedSensor);

        Mockito.when(sensorDao.findById(<span class="hljs-number">1L</span>)).thenReturn(Optional.of(sensorEntity));

        mockMvc.perform(
                        MockMvcRequestBuilders
                                .put(<span class="hljs-string">&quot;/api/sensors/1&quot;</span>)
                                .content(json)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                )
                <span class="hljs-comment">// check the HTTP response</span>
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath(<span class="hljs-string">&quot;@dollar@.name&quot;</span>).value(<span class="hljs-string">&quot;Temperature room 1&quot;</span>))
                .andExpect(MockMvcResultMatchers.jsonPath(<span class="hljs-string">&quot;@dollar@.id&quot;</span>).value(<span class="hljs-string">&quot;1&quot;</span>));
    }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldCreate</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {
        <span class="hljs-type">SensorEntity</span> <span class="hljs-variable">sensorEntity</span> <span class="hljs-operator">=</span> FakeEntityBuilder.createSensorEntity(<span class="hljs-number">1L</span>, <span class="hljs-string">&quot;Temperature room 1&quot;</span>);
        <span class="hljs-type">SensorCommand</span> <span class="hljs-variable">expectedSensor</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SensorCommand</span>(sensorEntity.getName(), sensorEntity.getValue(), sensorEntity.getSensorType());
        <span class="hljs-type">String</span> <span class="hljs-variable">json</span> <span class="hljs-operator">=</span> objectMapper.writeValueAsString(expectedSensor);

        Mockito.when(sensorDao.existsById(<span class="hljs-number">1L</span>)).thenReturn(<span class="hljs-literal">false</span>);
        Mockito.when(sensorDao.save(Mockito.any(SensorEntity.class))).thenReturn(sensorEntity);

        mockMvc.perform(
                        MockMvcRequestBuilders
                                .post(<span class="hljs-string">&quot;/api/sensors&quot;</span>)
                                .content(json)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                )
                <span class="hljs-comment">// check the HTTP response</span>
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath(<span class="hljs-string">&quot;@dollar@.name&quot;</span>).value(<span class="hljs-string">&quot;Temperature room 1&quot;</span>))
                .andExpect(MockMvcResultMatchers.jsonPath(<span class="hljs-string">&quot;@dollar@.id&quot;</span>).value(<span class="hljs-string">&quot;1&quot;</span>));
    }

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldDelete</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete(<span class="hljs-string">&quot;/api/sensors/999&quot;</span>))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474770.2039')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_flask_create_your_rest_services"><span class="icon">[flask&#93;</span> : Create your rest services</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_a_basic_example">A basic example</h3>
<div class="paragraph">
<p>This is the time to create your first REST controller with Spring.</p>
</div>
<div class="paragraph">
<p>Create a new class <code>HelloController</code> in package <code>com.emse.spring.automacorp.api</code>.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474771.0024"><span class="hljs-meta">@RestController</span>
<span class="hljs-meta">@RequestMapping(&quot;/api/hello&quot;)</span>
<span class="hljs-meta">@Transactional</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">HelloController</span> {
    <span class="hljs-meta">@GetMapping(&quot;/{name}&quot;)</span>
    <span class="hljs-keyword">public</span> Message <span class="hljs-title function_">welcome</span><span class="hljs-params">(<span class="hljs-meta">@PathVariable</span> String name)</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Message</span>(<span class="hljs-string">&quot;Hello &quot;</span> + name);
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">record</span> <span class="hljs-title class_">Message</span><span class="hljs-params">(String message)</span> {
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474771.0024')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_test_your_service_in_your_browser">Test your service in your browser</h3>
<div class="paragraph">
<p>If your REST service expose an handler for a GET HTTP request, this handler can be tested in a browser.</p>
</div>
<div class="paragraph">
<p>Launch your app and open the URL <a href="http://localhost:8080/api/hello/Guillaume" class="bare">http://localhost:8080/api/hello/Guillaume</a> in your browser</p>
</div>
<div class="paragraph">
<p>When you type an URL in the adress bar, your browser send a GET HTTP request. You should see a response as this one</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1755669474771.787">{<span class="hljs-string">&quot;message&quot;</span>:<span class="hljs-string">&quot;Hello Guillaume}</span></code><button class="btn-copy-code" onclick="copyToClipboard('1755669474771.787')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_test_your_service_with_springdoc_openapi_and_swagger_ui">Test your service with SpringDoc, OpenApi and Swagger UI</h3>
<div class="paragraph">
<p>With a browser you are limited to GET requests. If you want to test PUT, POST or DELETE HTTP requests, you need another tool. We will usehttps://springdoc.org/[springdoc].</p>
</div>
<div class="paragraph">
<p>The advantage of swagger is that it is very well integrated into the Spring world. Update your <code>build.gradle.kts</code> file and add these dependencies</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1755669474771.9692">implementation(<span class="hljs-string">&quot;org.springdoc:springdoc-openapi-starter-webmvc-ui:2.2.0&quot;</span>)</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474771.9692')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You also need to add this property in your <code>application.properties</code> file</p>
</div>
<div class="listingblock">
<div class="content">
<pre>spring.mvc.pathmatch.matching-strategy=ant_path_matcher</pre>
</div>
</div>
<div class="paragraph">
<p>And now you can relaunch your app and open swagger interface <a href="http://localhost:8080/swagger-ui/index.html" class="bare">http://localhost:8080/swagger-ui/index.html</a></p>
</div>
<div class="paragraph">
<p>All your endpoints are available. You can click on one of them to test it</p>
</div>
<div class="videoblock">
<div class="content">
<iframe width="600" height="330" src="https://www.youtube.com/embed/f6FUpLs0H_4?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_add_sensorcontroller">Add SensorController</h3>
<div class="paragraph">
<p>Read the previous examples and create</p>
</div>
<div class="ulist">
<ul>
<li>
<p>the REST service <code>SensorController</code></p>
</li>
<li>
<p>a rest service which is able to</p>
<div class="ulist">
<ul>
<li>
<p>Retrieve a sensor list via a GET</p>
</li>
<li>
<p>Retrieve a particular sensor via a GET</p>
</li>
<li>
<p>Create a sensor via a POST</p>
</li>
<li>
<p>Update a sensor via a PUT</p>
</li>
<li>
<p>Delete a window via a DELETE</p>
</li>
</ul>
</div>
</li>
</ul>
</div>
<div class="paragraph">
<p>Use swagger to test your API</p>
</div>
<div class="ulist">
<ul>
<li>
<p>create a new sensor</p>
</li>
<li>
<p>list all the sensor</p>
</li>
<li>
<p>find the sensor with id <code>-8</code></p>
</li>
<li>
<p>update a sensor</p>
</li>
<li>
<p>deletes this sensor</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_more_rest_service">More Rest service</h3>
<div class="paragraph">
<p>You can now write <code>WindowController</code> and <code>RoomController</code>. These routes must be implemented</p>
</div>
<div class="paragraph">
<p>You can now create BuildingDto, RoomDtoo, HeaterDto and write services which follow this service</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1755669474771.9275">/api/windows (GET) send windows list
/api/windows (POST) add a window
/api/windows/{id} (PUT) update a window
/api/windows/{id} (GET) read a window
/api/windows/{id} (DELETE) delete a window</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474771.9275')">Copy</button></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1755669474771.4314">/api/rooms (GET) send room list
/api/rooms (POST) add or update a room
/api/rooms/{room_id} (GET) read a room
/api/rooms/{room_id} (DELETE) delete a room and all its windows and its heaters
/api/rooms/{room_id}/openWindows switch the room windows to OPEN (status != 0)
/api/rooms/{room_id}/closeWindows switch the room windows to CLOSED (status = 0)</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474771.4314')">Copy</button></pre>
</div>
</div>
<div style="page-break-after: always;"></div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_resttemplate">RestTemplate</h2>
<div class="sectionbody">
<div class="paragraph">
<p>If you need to call remote REST services from your application, you can use the Spring Framework’s RestTemplate class.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/resttemplate.png" alt="resttemplate" width="600">
</div>
</div>
<div class="paragraph">
<p>A Java method for each HTTP method</p>
</div>
<div class="ulist">
<ul>
<li>
<p><strong>DELETE</strong> : delete(&#8230;&#8203;)</p>
</li>
<li>
<p><strong>GET</strong> :	getForObject(&#8230;&#8203;)</p>
</li>
<li>
<p><strong>HEAD</strong> :	headForHeaders(&#8230;&#8203;)</p>
</li>
<li>
<p><strong>OPTIONS</strong> :	optionsForAllow(&#8230;&#8203;)</p>
</li>
<li>
<p><strong>POST</strong> : postForObject(&#8230;&#8203;)</p>
</li>
<li>
<p><strong>PUT</strong> : put(&#8230;&#8203;)</p>
</li>
<li>
<p><strong>any method</strong> : exchange(&#8230;&#8203;) or execute(&#8230;&#8203;)</p>
</li>
</ul>
</div>
<div class="sect2">
<h3 id="_how_use_resttemplate">How use RestTemplate ?</h3>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>You need to create DTOs to serialize inputs and deserialize outputs</p>
</li>
<li>
<p>Use <code>RestTemplate</code> to call the service with the good HTTP method</p>
</li>
</ol>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474771.767"> <span class="hljs-type">String</span> <span class="hljs-variable">result</span> <span class="hljs-operator">=</span> restTemplate.getForObject(
         <span class="hljs-string">&quot;http://example.com/hotels/{hotel}/bookings/{booking}&quot;</span>,
         String.class,
         <span class="hljs-string">&quot;42&quot;</span>,
         <span class="hljs-string">&quot;21&quot;</span>);</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474771.767')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>will perform a GET on <code><a href="http://example.com/hotels/42/bookings/21" class="bare">http://example.com/hotels/42/bookings/21</a>.</code></p>
</div>
<div class="paragraph">
<p>The map variant expands the template based on variable name, and is therefore more useful when using many variables, or when a single variable is used multiple times. For example:</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474771.397"> Map<span class="hljs-meta">@LTString</span>, String<span class="hljs-meta">@GT</span> vars = Collections.singletonMap(<span class="hljs-string">&quot;hotel&quot;</span>, <span class="hljs-string">&quot;42&quot;</span>);
 <span class="hljs-type">String</span> <span class="hljs-variable">result</span> <span class="hljs-operator">=</span> restTemplate.getForObject(
         <span class="hljs-string">&quot;http://example.com/hotels/{hotel}/rooms/{hotel}&quot;</span>,
         String.class,
         vars
);</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474771.397')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>will perform a GET on <code><a href="http://example.com/hotels/42/rooms/42" class="bare">http://example.com/hotels/42/rooms/42</a>.</code></p>
</div>
<div class="paragraph">
<p>Since RestTemplate instances often need to be customized before being used, Spring Boot does not provide any single auto-configured RestTemplate bean but a builder to help the creation.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474771.9053"><span class="hljs-meta">@Service</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SearchService</span> {

    <span class="hljs-keyword">private</span> <span class="hljs-keyword">final</span> RestTemplate restTemplate;

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">AdressSearchService</span><span class="hljs-params">(RestTemplateBuilder restTemplateBuilder)</span> {
        <span class="hljs-built_in">this</span>.restTemplate = restTemplateBuilder.rootUri(<span class="hljs-string">&quot;https://example.com&quot;</span>).build();
    }

    <span class="hljs-keyword">public</span> ResponseDto <span class="hljs-title function_">findUsers</span><span class="hljs-params">()</span> {
        <span class="hljs-type">String</span> <span class="hljs-variable">uri</span> <span class="hljs-operator">=</span> UriComponentsBuilder.fromUriString(<span class="hljs-string">&quot;/users/search&quot;</span>)
                                         .queryParam(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;Guillaume&quot;</span>)
                                         .build()
                                         .toUriString();
        <span class="hljs-keyword">return</span> restTemplate.getForObject(uri, ResponseDto.class);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474771.9053')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>will perform a GET on <code><a href="http://example.com/users/search?name=Guillaume" class="bare">http://example.com/users/search?name=Guillaume</a></code></p>
</div>
<div style="page-break-after: always;"></div>
</div>
<div class="sect2">
<h3 id="_flask_call_a_remote_rest_api"><span class="icon">[flask&#93;</span> Call a remote REST API</h3>
<div class="paragraph">
<p>Now we can see how call a remote REST API in a Spring application.</p>
</div>
<div class="paragraph">
<p>We will test <a href="https://adresse.data.gouv.fr/api-doc/adresse" class="bare">https://adresse.data.gouv.fr/api-doc/adresse</a></p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/ap--gouv.png" alt="ap  gouv" width="700">
</div>
</div>
<div class="paragraph">
<p>You can test a request in your terminal with the curl tool or in a browser as it&#8217;s a GET request.</p>
</div>
<div class="listingblock">
<div class="content">
<pre>curl "https://api-adresse.data.gouv.fr/search/?q=cours+fauriel+&amp;limit=15"</pre>
</div>
</div>
<div class="paragraph">
<p>You have a JSON as result</p>
</div>
<div class="listingblock">
<div class="content">
<pre>{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [4.402982, 45.426444]
      },
      "properties": {
        "label": "Cours Fauriel 42100 Saint-\u00c9tienne",
        "score": 0.8910727272727272,
        "id": "42218_3390",
        "name": "Cours Fauriel",
        "postcode": "42100,
        "city": "Saint-\u00c9tienne",
        "context": "42, Loire, Auvergne-Rh\u00f4ne-Alpes",
        "type": "street"
      }
    }
  ],
  "query": "cours fauriel "
}</pre>
</div>
</div>
<div class="paragraph">
<p>Now you have to implement a service to call the API.</p>
</div>
<div class="sect3">
<h4 id="_create_the_dtos">Create the DTOs</h4>
<div class="paragraph">
<p>To help your job you can use these DTOs used to deserialize the returned JSON in Java objects.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>ApiGouvResponseDto describes the API response. Inside you will have a list of&#8230;&#8203;</p>
</li>
<li>
<p>&#8230;&#8203;ApiGouvFeatureDto. Each feature will have different properties &#8230;&#8203;</p>
</li>
<li>
<p>&#8230;&#8203;ApiGouvAdressDto</p>
</li>
</ul>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474771.813"><span class="hljs-keyword">public</span> <span class="hljs-keyword">record</span> <span class="hljs-title class_">ApiGouvResponse</span><span class="hljs-params">(
    String version,
    String query,
    Integer limit,
    List@LTApiGouvFeature@GT features
)</span> {

}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474771.813')">Copy</button></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474771.1704"><span class="hljs-keyword">public</span> <span class="hljs-keyword">record</span> <span class="hljs-title class_">ApiGouvFeature</span><span class="hljs-params">(
    String type,
    ApiGouvAdress properties
)</span> {</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474771.1704')">Copy</button></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474771.8892"><span class="hljs-keyword">public</span> <span class="hljs-keyword">record</span> <span class="hljs-title class_">ApiGouvAdress</span><span class="hljs-params">(
    String id,
    String label,
    String housenumber,
    Double score,
    String postcode,
    String citycode,
    String city,
    String context,
    String type,
    Double x,
    Double y
)</span> {

}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474771.8892')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_create_the_service">Create the service</h4>
<div class="paragraph">
<p>Now you are able to write</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>a service called <code>AdressSearchService</code></p>
</li>
<li>
<p>with a constructor in which you will create the <code>restTemplate</code></p>
</li>
<li>
<p>add a method to return the <code>List@LTApiGouvAdressDto@GT</code></p>
</li>
<li>
<p>this method can have a list of String to define the parameters to send to the API</p>
</li>
<li>
<p>You can build the URI with this code</p>
</li>
</ol>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474771.592"><span class="hljs-type">String</span> <span class="hljs-variable">params</span> <span class="hljs-operator">=</span> String.join(<span class="hljs-string">&quot;+&quot;</span>, keys);
UriComponentsBuilder.fromUriString(<span class="hljs-string">&quot;/search&quot;</span>).queryParam(<span class="hljs-string">&quot;q&quot;</span>, params).queryParam(<span class="hljs-string">&quot;limit&quot;</span>, <span class="hljs-number">15</span>).build().toUriString()<span class="hljs-meta">@backtick</span>@</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474771.592')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect3">
<h4 id="_test_your_service_with_swagger">Test your service with Swagger</h4>
<div class="paragraph">
<p>You can expose a new REST endpoint in a controller to use Swagger to test this API</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/spring-intro/adress-api.png" alt="adress api" width="800">
</div>
</div>
</div>
<div class="sect3">
<h4 id="_test_your_service_with_a_unit_test">Test your service with a unit test</h4>
<div class="paragraph">
<p>You can use the @RestClientTest annotation to test REST clients. By default, it auto-configures Jackson, configures a RestTemplateBuilder, and adds support for MockRestServiceServer.</p>
</div>
<div class="paragraph">
<p>This test should work</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1755669474772.655"><span class="hljs-keyword">package</span> com.emse.spring.automacorp.adress;

<span class="hljs-keyword">import</span> com.fasterxml.jackson.core.JsonProcessingException;
<span class="hljs-keyword">import</span> com.fasterxml.jackson.databind.ObjectMapper;
<span class="hljs-keyword">import</span> org.assertj.core.api.Assertions;
<span class="hljs-keyword">import</span> org.junit.jupiter.api.Test;
<span class="hljs-keyword">import</span> org.springframework.beans.factory.annotation.Autowired;
<span class="hljs-keyword">import</span> org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
<span class="hljs-keyword">import</span> org.springframework.http.MediaType;
<span class="hljs-keyword">import</span> org.springframework.test.web.client.MockRestServiceServer;
<span class="hljs-keyword">import</span> org.springframework.test.web.client.match.MockRestRequestMatchers;
<span class="hljs-keyword">import</span> org.springframework.test.web.client.response.MockRestResponseCreators;
<span class="hljs-keyword">import</span> org.springframework.web.util.UriComponentsBuilder;

<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-meta">@RestClientTest(AdressSearchService.class)</span> <span class="hljs-comment">// (1)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">AdressSearchServiceTest</span> {
    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">private</span> AdressSearchService service;

    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">private</span> ObjectMapper objectMapper;

    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">private</span> MockRestServiceServer server; <span class="hljs-comment">// (2)</span>

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">void</span> <span class="hljs-title function_">shouldFindAdresses</span><span class="hljs-params">()</span> <span class="hljs-keyword">throws</span> JsonProcessingException {
        <span class="hljs-comment">// Arrange</span>
        <span class="hljs-type">ApiGouvResponse</span> <span class="hljs-variable">expectedResponse</span> <span class="hljs-operator">=</span> simulateApiResponse();

        <span class="hljs-type">String</span> <span class="hljs-variable">expectedUrl</span> <span class="hljs-operator">=</span> UriComponentsBuilder
                .fromUriString(<span class="hljs-string">&quot;/search&quot;</span>)
                .queryParam(<span class="hljs-string">&quot;q&quot;</span>, <span class="hljs-string">&quot;cours+fauriel&quot;</span>)
                .queryParam(<span class="hljs-string">&quot;limit&quot;</span>, <span class="hljs-number">15</span>)
                .build()
                .toUriString();

        <span class="hljs-built_in">this</span>.server
                .expect(MockRestRequestMatchers.requestTo(expectedUrl))
                .andRespond(
                        MockRestResponseCreators.withSuccess(
                                objectMapper.writeValueAsString(expectedResponse),
                                MediaType.APPLICATION_JSON
                        )
                );

        <span class="hljs-comment">// Act</span>
        List<span class="hljs-meta">@LTApiGouvAdress</span><span class="hljs-meta">@GT</span> adresses = <span class="hljs-built_in">this</span>.service.searchAdress(List.of(<span class="hljs-string">&quot;cours&quot;</span>, <span class="hljs-string">&quot;fauriel&quot;</span>));

        <span class="hljs-comment">// Assert</span>
        Assertions
                .assertThat(adresses)
                .hasSize(<span class="hljs-number">1</span>)
                .extracting(ApiGouvAdress::city)
                .contains(<span class="hljs-string">&quot;Saint Etienne&quot;</span>);
    }

    <span class="hljs-keyword">private</span> ApiGouvResponse <span class="hljs-title function_">simulateApiResponse</span><span class="hljs-params">()</span> {
        <span class="hljs-type">ApiGouvAdress</span> <span class="hljs-variable">adress</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ApiGouvAdress</span>(
                <span class="hljs-string">&quot;ad1&quot;</span>,
                <span class="hljs-string">&quot;Cours Fauriel 42100 Saint-Étienne&quot;</span>,
                <span class="hljs-string">&quot;2&quot;</span>,
                <span class="hljs-number">0.98</span>,
                <span class="hljs-string">&quot;42100&quot;</span>,
                <span class="hljs-string">&quot;42218&quot;</span>,
                <span class="hljs-string">&quot;Saint Etienne&quot;</span>,
                <span class="hljs-string">&quot;context&quot;</span>,
                <span class="hljs-string">&quot;type&quot;</span>,
                <span class="hljs-number">0.0</span>,
                <span class="hljs-number">0.0</span>
                );

        <span class="hljs-type">ApiGouvFeature</span> <span class="hljs-variable">feature</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ApiGouvFeature</span>(<span class="hljs-string">&quot;type&quot;</span>, adress);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ApiGouvResponse</span>(<span class="hljs-string">&quot;v1&quot;</span>, <span class="hljs-string">&quot;cours+fauriel&quot;</span>, <span class="hljs-number">15</span>, List.of(feature));
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1755669474772.655')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
</div>`;