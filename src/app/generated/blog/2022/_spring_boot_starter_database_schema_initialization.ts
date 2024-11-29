export const _spring_boot_starter_database_schema_initialization:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_un_use_case_réel">Un use case réel</a></li>
<li><a class="link" fragment="#_quest_ce_quune_auto_configuration_spring_boot">Qu&#8217;est ce qu&#8217;une auto configuration Spring Boot ?</a></li>
<li><a class="link" fragment="#_ce_que_jaimerai_faire">Ce que j&#8217;aimerai faire</a></li>
<li><a class="link" fragment="#_les_conditions_sur_les_beans_de_configuration">Les conditions sur les beans de configuration</a></li>
<li><a class="link" fragment="#_utiliser_votre_code">Utiliser votre code</a></li>
<li><a class="link" fragment="#_conclusion">Conclusion</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Le but de cet article est d&#8217;expliquer comment rajouter un bean de configuration Spring Boot à votre application, tout en l&#8217;intégrant correctement pour qu&#8217;il s&#8217;exécute au moment où vous le souhaitez, au milieu de la multitudes des autres beans d&#8217;auto configuration.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2022/sb_starter.png" alt="Auto configuration" width="800">
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_un_use_case_réel">Un use case réel</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Un besoin technique est (ou devrait être) lié à un réel besoin.</p>
</div>
<div class="paragraph">
<p>Nous allons donc parler d&#8217;un exemple concret avec une application qui a une base de données commune à différents micro services. Chaque microservice a un utilisateur et un schéma qui lui sont propres.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2022/sb_starter_archi1.svg" alt="Une seule base de donnée" width="800">
</div>
</div>
<div class="paragraph">
<p>Les tables du schéma peuvent être générées soit par <a href="https://hibernate.org/tools/">HibernateTools</a> , soit gérée par des librairies comme <a href="https://flywaydb.org/">Flyway</a> ou <a href="https://www.liquibase.org/">Liquibase</a>. Mais ces outils travaillent avec un user et un schema existants.</p>
</div>
<div class="paragraph">
<p>Je souhaiterai pouvoir initialiser le schéma et le user de cette base de données automatiquement. Il existe bien sûr plusieurs solutions mais dans mon cas je veux que chaque application puisse le faire au démarrage avant l&#8217;initialisation de la datasource et son utilisation par des librairies externes comme Hibernate, Flyway ou Liquibase&#8230;&#8203;..</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_quest_ce_quune_auto_configuration_spring_boot">Qu&#8217;est ce qu&#8217;une auto configuration Spring Boot ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Spring Boot a été mis en place pour faciliter le développement d&#8217;une application en privilégiant la convention plutôt que la configuration. En gros, vous installez des librairies tierces dans votre application, et Spring Boot essaie de les configurer automatiquement en appliquant un paramétrage par défaut poussé par les équipes Spring pour les briques de base, ou par les concepteurs des autres briques.</p>
</div>
<div class="paragraph">
<p>Vous pouvez surcharger certains paramètres de ces configuration. D&#8217;ailleurs quand on écrit un nouveau starter Spring c&#8217;est une bonne chose de rendre configurable et personnalisable le maximum de choses.</p>
</div>
<div class="paragraph">
<p>Prenons les cas cités plus haut (Hiberante, Flyway et Liquibase) qui sont assez courants et pour lesquels Spring Boot propose des beans d&#8217;autoconfiguration.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>si vous utilisez Jpa vous pouvez ajouter Hibernate dans vos dépendances ou mieux le starter <code>spring-boot-starter-data-jpa</code> et la classe <code>org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration</code> fera le reste.</p>
</li>
<li>
<p>si vous ajoutez Flyway dans le classpath automatiquement <code>org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration</code> prendra le pas pour configurer cette librairie</p>
</li>
<li>
<p>&#8230;&#8203;</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Chaque bean d&#8217;auto configuration géré par la team Spring est défini dans le projet <a href="https://github.com/spring-projects/spring-boot/tree/v2.7.4/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure">spring-boot-autoconfigure</a>. Tous ces beans sont déclarés dans un fichier <code>META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports</code></p>
</div>
<div class="paragraph">
<p>Vous pouvez reproduire cette mécanique mais personnellement je ne suis pas fan de cette magie noire et je préfère clairement les déclarations explicites pour activer les différents beans des applications tierces. C&#8217;était un peu la philosophie derrière le projet expérimental <a href="https://github.com/spring-projects-experimental/spring-fu">Spring-fu</a> et <a href="https://github.com/spring-projects-experimental/spring-fu/tree/main/kofu">KoFu</a>.</p>
</div>
<div class="paragraph">
<p>C&#8217;est pourquoi je ne vais pas m&#8217;étendre sur ce point, et je vous montrerai plus loin comment créer une méta annotation pour activer votre bean de configuration simplement. Si vous n&#8217;êtes pas d&#8217;accord avec ma vision, vous pouvez suivre les <a href="https://docs.spring.io/spring-boot/docs/2.7.4/reference/htmlsingle/#features.developing-auto-configuration.locating-auto-configuration-candidates">explications de Spring</a> pour appliquer une auto configuration.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_ce_que_jaimerai_faire">Ce que j&#8217;aimerai faire</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Du coup si je reviens à mon besoin j&#8217;aimerai paramétrer un bout de code qui viendrait s&#8217;intégrer dans le cycle de vie de mon application Spring Boot et qui viendrait s&#8217;exécuter avant les beans d&#8217;auto configurations utilisés pour paramétrer la datasource ou des librairies comme Liquibase ou Flyway.</p>
</div>
<div class="paragraph">
<p>Pour rappel ce code permettrait de créer le user et le schéma de mon application.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2022/sb_starter_lifecycle.svg" alt="Cycle de vie" width="1200">
</div>
</div>
<div class="paragraph">
<p>Mais comment faire pour être sûr que ma configuration sera appliquée au moment où je le veux ?</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_les_conditions_sur_les_beans_de_configuration">Les conditions sur les beans de configuration</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Quand votre configuration doit s&#8217;intégrer avant ou après d&#8217;autres configuration, vous pouvez utiliser les annotations  <code>@AutoConfigureBefore</code> et <code>@AutoConfigureAfter</code>. Dans notre cas</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451020.0144"><span class="hljs-meta">@Configuration(proxyBeanMethods = false)</span>
<span class="hljs-meta">@AutoConfigureBefore(DataSourceAutoConfiguration::class, LiquibaseAutoConfiguration::class)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">DatabaseSchemaInitializerAutoConfiguration</span></code><button class="btn-copy-code" onclick="copyToClipboard('1732912451020.0144')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Mais ceci n&#8217;agit que sur l&#8217;ordre des classes de configuration et non sur les beans qui sont définis à l&#8217;intérieur. <strong>L&#8217;ordre dans lequel les beans sont créés n&#8217;est pas affecté. L&#8217;ordre des beans de configuration est déterminé par les dépendances de chaque bean et des relations explicites définies aves l&#8217;annotation @DependsOn.</strong></p>
</div>
<div class="paragraph">
<p>Donc dans mon cas rien ne me garantit que mon bean <code>DatabaseSchemaInitializer</code> sera lancé avant les autres.</p>
</div>
<div class="paragraph">
<p>Spring Boot fournit différentes annotations <code>@Conditional</code> que l&#8217;on peut appliquer sur les beans de configurations ou n&#8217;importe quel autre bean. Je ne présenterai ici que les principales</p>
</div>
<div class="ulist">
<ul>
<li>
<p>Class Conditions<br></p>
<div class="ulist">
<ul>
<li>
<p>le bean annoté avec <code>@ConditionalOnClass</code> ne sera initialisé que si une classe est présente dans le classpath</p>
</li>
<li>
<p>le bean annoté avec <code>@ConditionalOnMissingClass</code> ne sera initialisé que si une classe n&#8217;est pas présente dans le classpath</p>
</li>
</ul>
</div>
</li>
<li>
<p>Bean Conditions<br></p>
<div class="ulist">
<ul>
<li>
<p>le bean annoté avec  <code>@ConditionalOnBean</code> ne sera initialisé que si un bean est présent dans le contexte Spring</p>
</li>
<li>
<p>le bean annoté avec  <code>@ConditionalOnMissingBean</code> ne sera initialisé que si un bean n&#8217;est pas présent dans le contexte Spring (ou pas encore&#8230;&#8203;). Pour que votre auto configuration puisse être facilement surchargé il est préférable de mettre cette annotation sur la classe de configuration</p>
</li>
</ul>
</div>
</li>
<li>
<p>Property Conditions : le bean annoté avec  <code>@ConditionalOnProperty</code> ne sera activé que sur la présence d&#8217;une propriété. Pratique pour mettre en place un garde fou</p>
</li>
<li>
<p>Resource Conditions : <code>@ConditionalOnResource</code> permet de n&#8217;activer un bean que si une resource (un fichier par exemple) est présente</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Notre bean de configuration peut devenir</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451020.7395"><span class="hljs-meta">@Configuration(proxyBeanMethods = false)</span>
<span class="hljs-meta">@ConditionalOnProperty(prefix = PROPERTIES_PREFIX, name = [<span class="hljs-string">&quot;enabled&quot;</span>], matchIfMissing = true)</span>
<span class="hljs-meta">@AutoConfigureBefore(DataSourceAutoConfiguration::class, LiquibaseAutoConfiguration::class)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">DatabaseSchemaInitializerAutoConfiguration</span> {

    <span class="hljs-keyword">companion</span> <span class="hljs-keyword">object</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-keyword">val</span> PROPERTIES_PREFIX = <span class="hljs-string">&quot;app.database.initializer&quot;</span>
    }

    <span class="hljs-meta">@Configuration</span>
    <span class="hljs-meta">@ConditionalOnClass(DataSource::class)</span>
    <span class="hljs-keyword">class</span> <span class="hljs-title class_">DatabaseSchemaInitializerConfiguration</span> {
        <span class="hljs-meta">@Bean</span>
        <span class="hljs-meta">@ConditionalOnMissingBean(DataSource::class, SpringLiquibase::class, Flyway::class)</span>
         <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">databaseSchemaInitializer</span><span class="hljs-params">()</span></span> =
             DatabaseSchemaInitializer()
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451020.7395')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Notre <code>DatabaseSchemaInitializer</code> doit maintenant s&#8217;exécuter avant la mise en place de la datasource de Flyway ou Liquibase. Votre code marche en Java 8 mais pas avec les versions supérieures où les modules ont été introduits. Sur Java @GT 9 avec une configuration par défaut où les modules dont fermés, <code>SpringLiquibase</code> et <code>Flyway</code> ne sont pas accessible.</p>
</div>
<div class="paragraph">
<p>Si on maitrisait le code, nous pourrions ajouter une annotation @DependsOn() vers <code>DatabaseSchemaInitializer</code> sur les beans <code>SpringLiquibase</code> et <code>Flyway</code>, mais ce n&#8217;est pas le cas.</p>
</div>
<div class="paragraph">
<p>Avec Spring il y a toujours des solutions. Nous pouvons faire hériter notre bean de configuration de <code>AbstractDependsOnBeanFactoryPostProcessor</code>. Cette classe de configuration permet de déclarer ces dépendances entre beans. Je peux donc résoudre mon problème en spécifiant que le bean Datasource (utilisé par <code>SpringLiquibase</code> et <code>Flyway</code>) ne peut être instancié que si mon bean <code>DatabaseSchemaInitializer</code> est instancié.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451021.823"><span class="hljs-meta">@Configuration(proxyBeanMethods = false)</span>
<span class="hljs-meta">@ConditionalOnProperty(prefix = PROPERTIES_PREFIX, name = [<span class="hljs-string">&quot;enabled&quot;</span>], matchIfMissing = true)</span>
<span class="hljs-meta">@AutoConfigureBefore(DataSourceAutoConfiguration::class, LiquibaseAutoConfiguration::class)</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">DatabaseSchemaInitializerAutoConfiguration</span> {

    <span class="hljs-keyword">companion</span> <span class="hljs-keyword">object</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-keyword">val</span> PROPERTIES_PREFIX = <span class="hljs-string">&quot;app.database.initializer&quot;</span>
    }

    <span class="hljs-meta">@Configuration</span>
    <span class="hljs-meta">@ConditionalOnClass(DataSource::class)</span>
    <span class="hljs-keyword">class</span> <span class="hljs-title class_">DatabaseSchemaInitializerDependencyPostProcessor</span> : <span class="hljs-type">AbstractDependsOnBeanFactoryPostProcessor</span>(
        <span class="hljs-comment">// Ma datasource ne peut pas être instanciée avant ...</span>
        DataSource::<span class="hljs-keyword">class</span>.java,
        <span class="hljs-comment">// le bean suivant</span>
        DatabaseSchemaInitializer::<span class="hljs-keyword">class</span>.java
    ) {
        <span class="hljs-meta">@Bean</span>
        <span class="hljs-meta">@ConditionalOnMissingBean(DataSource::class, SpringLiquibase::class, Flyway::class)</span>
         <span class="hljs-function"><span class="hljs-keyword">fun</span> <span class="hljs-title">databaseSchemaInitializer</span><span class="hljs-params">()</span></span> =
             DatabaseSchemaInitializer()
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1732912451021.823')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Avec ce code, mon code pour initilialiser ue user et un schema de base de données sera exécuté avant que l&#8217;application cherche à initialiser la base de données et donc Hibernate, Flyway ou Liquibase.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_utiliser_votre_code">Utiliser votre code</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Le but de ce code est d&#8217;être partagé par mes différentes applications.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2022/sb_starter_archi2.svg" alt="Shared config" width="800">
</div>
</div>
<div class="paragraph">
<p>Dans la philosophie Spring Boot nous devrions <a href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.developing-auto-configuration.custom-starter">créer notre propre starter</a>. Mais dans mon cas où tous mes micro services sont dans un mono repository, je peux juste partager mon code via par exemple Gradle</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451021.2263">    <span class="hljs-comment">// ...</span>
    dependencies {
        implementation(project(<span class="hljs-string">&quot;:database-initializer&quot;</span>))
        <span class="hljs-comment">// ...</span>
    }
    <span class="hljs-comment">// ...</span></code><button class="btn-copy-code" onclick="copyToClipboard('1732912451021.2263')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Plus haut je vous ai dit que je préférai des configurations explicites plutôt que des auto configurations qui s&#8217;appliquent automatiquement.</p>
</div>
<div class="paragraph">
<p>Vous pouvez créer par exemple une meta annotation <code>EnableDatabaseSchemaInitializer</code> que vous pourrez ajouter sur vos applications qui ont besoin de cette nouvelle fonctionnalité</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-kotlin" id="1732912451021.2544"><span class="hljs-meta">@Retention(AnnotationRetention.RUNTIME)</span>
<span class="hljs-meta">@Target(AnnotationTarget.CLASS, AnnotationTarget.TYPE)</span>
<span class="hljs-meta">@MustBeDocumented</span>
<span class="hljs-meta">@Import(DatabaseSchemaInitializerAutoConfiguration::class)</span>
<span class="hljs-keyword">annotation</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">EnableDatabaseSchemaInitializer</span></code><button class="btn-copy-code" onclick="copyToClipboard('1732912451021.2544')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Je vous ai présenté un use case mais au final vous n&#8217;avez pas le code de mon <code>DatabaseSchemaInitializer</code>. Je peux le partager si il y a des intéressés.</p>
</div>
<div class="paragraph">
<p>Le but de cet article était plutôt de comprendre les mécanismes de Spring Boot et de l&#8217;autoconfiguration. Nous avons vu comment intégrer du code au milieu de cette magie noire qui est très pratique quand on débute mais qu&#8217;il faut connaître lorsque nous avons des besoins plus pointus.</p>
</div>
<div class="paragraph">
<p>N&#8217;hésitez pas à me contacter sur Twitter si vous avez des questions ou des remarques sur cet article.</p>
</div>
</div>
</div>`;