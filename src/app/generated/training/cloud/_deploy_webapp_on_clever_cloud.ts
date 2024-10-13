export const _deploy_webapp_on_clever_cloud:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_clever_cloud">Clever Cloud</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_account_creation">Account creation</a></li>
<li><a class="link" fragment="#_configure_your_project">Configure your project</a></li>
<li><a class="link" fragment="#_deploy_on_clevercloud">Deploy on Clevercloud</a></li>
</ul>
</li>
<li><a class="link" fragment="#_common_errors">Common errors</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_java_version">Java version</a></li>
<li><a class="link" fragment="#_windows">Windows</a></li>
</ul>
</li>
</ul>
</div>
<div class="sect1">
<h2 id="_clever_cloud">Clever Cloud</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Clever cloud is a platform designed by developers for developers.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/clever-cloud.png" alt="clever cloud" width="800">
</div>
</div>
<div class="paragraph">
<p>You Write Code.They Run It.</p>
</div>
<div class="paragraph">
<p>When you write code, you push sources on Github. Clever Cloud is able to install your app from your Github repository.</p>
</div>
<div class="sect2">
<h3 id="_account_creation">Account creation</h3>
<div class="paragraph">
<p>Sign in on <a href="https://github.com/" class="bare">https://github.com/</a> with your account. If you haven&#8217;t an account you have to create one</p>
</div>
<div class="paragraph">
<p>When you are connected, you can create a new account on <a href="https://www.clever-cloud.com/en/" class="bare">https://www.clever-cloud.com/en/</a></p>
</div>
<div class="paragraph">
<p>Click on Login button</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/clever-connect0.png" alt="Connection" width="800">
</div>
</div>
<div class="paragraph">
<p>Click on the connect button with Github.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/clever-connect00.png" alt="Use your github account" width="500">
</div>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>It&#8217;s important to create your account from your Github account. <strong>When you account is created send me your email and I will add you on the common repository</strong>. When you will receive a confirmation email, click on "Join CoursEmse2023" Button</p>
</div>
</blockquote>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/mail.png" alt="mail" width="800">
</div>
</div>
<div class="paragraph">
<p>EMSE space will be added on your clever cloud environment</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/clever0.png" alt="clever0" width="800">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_configure_your_project">Configure your project</h3>
<div class="paragraph">
<p>Before this deployment you have to create a folder called "<strong>clevercloud</strong>" in your Spring Boot project</p>
</div>
<div class="paragraph">
<p>Inside, add a file <code>gradle.json</code>.This file will contain</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1728847001204.4526">{
  <span class="hljs-string">&quot;build&quot;</span>: {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;gradle&quot;</span>,
    <span class="hljs-string">&quot;goal&quot;</span>: <span class="hljs-string">&quot;assemble&quot;</span>
  },
  <span class="hljs-string">&quot;deploy&quot;</span>: {
    <span class="hljs-string">&quot;jarName&quot;</span>: <span class="hljs-string">&quot;./build/libs/automacorp-0.0.1-SNAPSHOT.jar&quot;</span>
  }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1728847001204.4526')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>To know the name of your jar go on folder <code>./build/libs/</code>. Push your last changes on your Github repository. For the moment, CleverCloud used only Github</p>
</div>
</div>
<div class="sect2">
<h3 id="_deploy_on_clevercloud">Deploy on Clevercloud</h3>
<div class="paragraph">
<p>You are ready to deploy your app in Clever Cloud.Open <a href="https://console.clever-cloud.com/organisations/orga_1e317288-9f24-486c-b843-6f7d6e311917">EMSE Clever Cloud space</a></p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/clever0.png" alt="Clever Cloud" width="900">
</div>
</div>
<div class="paragraph">
<p>Click on button called <strong>"Create&#8230;&#8203;"</strong> and select <strong>"an application"</strong>. This application will be generated from your Github repository. Select the project to deploy</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/clever1.png" alt="Clever Cloud" width="600">
</div>
</div>
<div class="paragraph">
<p>You have to choose the kind of your application. For a Spring Boot application it will be a <strong>Java or Groovy + Gradle</strong> application</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/clever2.png" alt="Clever Cloud">
</div>
</div>
<div class="paragraph">
<p>The next step is to choose the type and the number of your server.With our free plan you must keep the default configuration and click on <strong>Next</strong> button. But in real life you can choose the power and the number of servers.More your server will be powerful more the price is expensive</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/clever3.png" alt="Clever Cloud" width="800">
</div>
</div>
<div class="paragraph">
<p>You have to use a specific name. It&#8217;s important when you have several apps.In our case you have to use <code><strong>automacorp-firstname-lastname</strong></code>. You must also select in which zone of the world your application will be deployed (you can only select France in this lab).</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/clever4.png" alt="Clever Cloud" width="800">
</div>
</div>
<div class="paragraph">
<p>In the next step you can choose if you need an add-on as a database for example. We don&#8217;t need to install a database because your app use an embedded H2 database. Click on <strong>I don&#8217;t need any add-ons</strong> button</p>
</div>
<div class="paragraph">
<p>You can define environment variables and it&#8217;s important for us. We need to override the default Java Version used by Clever Cloud. For that add a new environment variables called</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p><code>CC_JAVA_VERSION</code> and with a value equals to 17.</p>
</li>
<li>
<p><code>PORT</code> and with a value equals to 8080.</p>
</li>
</ol>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/clever6.png" alt="Clever Cloud" width="900">
</div>
</div>
<div class="paragraph">
<p>Installation starts and you have to wait several minutes.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/clever7.png" alt="Clever Cloud" width="900">
</div>
</div>
<div class="paragraph">
<p>You can explore different section to update the app setup</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/clever7_1.png" alt="Clever Cloud" width="200">
</div>
</div>
<div class="ulist">
<ul>
<li>
<p>Overview : contains buttons to reinstall your app and the link to access to your app</p>
</li>
<li>
<p>Information</p>
</li>
<li>
<p>Scalability</p>
</li>
<li>
<p>Domain names : helps to personalize the URL of its application or parameter its own domain main</p>
</li>
<li>
<p>Environment variables</p>
</li>
<li>
<p>Service dependencies</p>
</li>
<li>
<p>Exposed configuration</p>
</li>
<li>
<p>Activity</p>
</li>
<li>
<p>Logs if deployment fail you have to go in this section to find the error</p>
</li>
<li>
<p>Metrics</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>Define a custom URL to access to your application and click on the star to use it by default</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/cloud/clever8.png" alt="clever8" width="900">
</div>
</div>
<div class="paragraph">
<p>Now you can use your app deployed on the Internet. This app will be automatically redeployed, when you will push a new commit on Github. If you have done previous lessons, you should open http://[yourname].cleverapps.io/swagger-ui/index.html</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_common_errors">Common errors</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_java_version">Java version</h3>
<div class="paragraph">
<p>If you have this error</p>
</div>
<hr>
<div class="paragraph">
<p>2023-09-05T21:04:32+02:00 - Incompatible because this component declares a component for use during compile-time, compatible with Java 17 and the consumer needed a component for use during runtime, compatible with Java 11
---</p>
</div>
<div class="paragraph">
<p>You forgot to follow the section on environment variables</p>
</div>
</div>
<div class="sect2">
<h3 id="_windows">Windows</h3>
<div class="paragraph">
<p>If you are on Windows you can have this error</p>
</div>
<div class="listingblock">
<div class="content">
<pre>2020-11-23T13:58:00+01:00 A gradlew script has been found. Let's use it.
2020-11-23T13:58:01+01:00 /home/bas/rubydeployer/scripts/build-java.sh: line 9: ./gradlew: Permission denied
2020-11-23T13:58:01+01:00 Build failed</pre>
</div>
</div>
<div class="paragraph">
<p>To fix it you can follow <a href="https://medium.com/@akash1233/change-file-permissions-when-working-with-git-repos-on-windows-ea22e34d5cee">this article</a>.Or execute this command</p>
</div>
<div class="listingblock">
<div class="content">
<pre>git update-index --chmod=+x gradlew
git push origin main</pre>
</div>
</div>
</div>
</div>
</div>`;