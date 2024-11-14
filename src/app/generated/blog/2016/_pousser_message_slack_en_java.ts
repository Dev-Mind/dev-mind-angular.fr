export const _pousser_message_slack_en_java:string = `<div class="paragraph">
<p>Depuis que j&#8217;ai découvert Slack, j&#8217;ai migré beaucoup de mes flux de mails vers cet outil. Au niveau de nos applications nous pouvons aussi avoir besoin de centraliser des notifications dans cet outil. Nous allons voir comment utiliser l&#8217;API  Incoming WebHooks.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/slack_01.png" alt="Slack">
</div>
</div>
<div class="paragraph">
<p>Le principe est très simple. Connectez vous à votre compte Slack et en allant sur <a href="https://my.slack.com/services/new/incoming-webhook/" class="bare">https://my.slack.com/services/new/incoming-webhook/</a> vous pourrez accéder à une liste des différents channels auxquelles vous êtes abonnés.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/slack_02.png" alt="Slack">
</div>
</div>
<div class="paragraph">
<p>Une fois fois que vous avez choisi votre channel, Slack vous génère les tokens vous permettant d&#8217;utiliser leurs API. Par exemple vous obtiendrez une URL du type <a href="https://hooks.slack.com/services/DSFDSFSDF/QSDQSDSQD/DFSDFdfkslksdDSF" class="bare">https://hooks.slack.com/services/DSFDSFSDF/QSDQSDSQD/DFSDFdfkslksdDSF</a></p>
</div>
<div class="paragraph">
<p>Plusieurs exemples de messages sont fournis. Le payload ci dessous permet par exemple d&#8217;envoyer dans le channel « général »</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1731613731841.8848">payload={
    <span class="hljs-string">&quot;channel&quot;</span>: <span class="hljs-string">&quot;#general&quot;</span>,
    <span class="hljs-string">&quot;username&quot;</span>: <span class="hljs-string">&quot;Dev-Mind&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>:
    <span class="hljs-string">&quot;This is my post to #general.&quot;</span>,
    <span class="hljs-string">&quot;icon_emoji&quot;</span>: <span class="hljs-string">&quot;:ghost:&quot;</span>
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731613731841.8848')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez utiliser un outil comme <a href="https://curl.haxx.se/">CURL</a> pour pousser vos messages</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731613731842.107">curl -X POST --data-urlencode &#x27;payload={&quot;channel&quot;: &quot;#general&quot;, &quot;username&quot;: &quot;webhookbot&quot;, &quot;text&quot;: &quot;This is posted to #general and comes from a bot named webhookbot.&quot;, &quot;icon_emoji&quot;: &quot;:ghost:&quot;}&#x27; https://hooks.slack.com/services/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</code><button class="btn-copy-code" onclick="copyToClipboard('1731613731842.107')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Et il existe de nombreuses librairies externes pour les différents langages <a href="https://api.slack.com/community" class="bare">https://api.slack.com/community</a> mais pour un beoin aussi simple on peut se poser la question de l&#8217;intérêt d&#8217;utiliser une librairie externe.</p>
</div>
<div class="paragraph">
<p>Regardons comment créer une application Java pour envoyer des informations dans Slack. Nous allons le faire dans une application Spring Boot. Pour démarrer un nouveau projet vous pouvez aller sur <a href="http://javamind-fr.blogspot.fr/2016/01/demarrer-une-application-springboot.html">mon article</a> sur le sujet.</p>
</div>
<div class="paragraph">
<p>Le but est de démarrer le projet <a href="https://github.com/Dev-Mind/devmind-slack">devmind-slack</a> qui est un projet que vous pouvez récupérer sur Github si vous voulez voir les sources directement.</p>
</div>
<div class="paragraph">
<p>Nous allonc commencer par créer un DTO contenant les différentes informations que nous pouvons envoyer</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731613731845.7998"><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SlackMessage</span> {

    <span class="hljs-keyword">private</span> String channel;
    <span class="hljs-keyword">private</span> String text;
    <span class="hljs-keyword">private</span> String username;
    <span class="hljs-keyword">private</span> String icon_emoji;
    <span class="hljs-keyword">private</span> String icon_url;

    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">getChannel</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> channel;
    }

    <span class="hljs-keyword">public</span> SlackMessage <span class="hljs-title function_">setChannel</span><span class="hljs-params">(String channel)</span> {
        <span class="hljs-built_in">this</span>.channel = <span class="hljs-string">&quot;#&quot;</span> + channel;
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>;
    }

    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">getUsername</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> username;
    }

    <span class="hljs-keyword">public</span> SlackMessage <span class="hljs-title function_">setUsername</span><span class="hljs-params">(String username)</span> {
        <span class="hljs-built_in">this</span>.username = username;
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>;
    }

    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">getText</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> text;
    }

    <span class="hljs-keyword">public</span> SlackMessage <span class="hljs-title function_">setText</span><span class="hljs-params">(String text)</span> {
        <span class="hljs-built_in">this</span>.text = text;
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>;
    }

    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">getIcon_emoji</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> icon_emoji;
    }

    <span class="hljs-keyword">public</span> SlackMessage <span class="hljs-title function_">setIcon_emoji</span><span class="hljs-params">(String icon_emoji)</span> {
        <span class="hljs-built_in">this</span>.icon_emoji = <span class="hljs-string">&quot;:&quot;</span> + icon_emoji + <span class="hljs-string">&quot;:&quot;</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>;
    }

    <span class="hljs-keyword">public</span> String <span class="hljs-title function_">getIcon_url</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">return</span> icon_url;
    }

    <span class="hljs-keyword">public</span> SlackMessage <span class="hljs-title function_">setIcon_url</span><span class="hljs-params">(String icon_url)</span> {
        <span class="hljs-built_in">this</span>.icon_url = icon_url;
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>;
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731613731845.7998')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Le but est de coller à l&#8217;API <a href="https://api.slack.com/methods/chat.postMessage" class="bare">https://api.slack.com/methods/chat.postMessage</a></p>
</div>
<div class="paragraph">
<p>Il ne nous reste plus qu&#8217;à écrire le code qui va interagir avec le service distant et générer le payload attendu. La petite spécificité est que le format des données attendu doit être encodé</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1731613731848.7224"><span class="hljs-meta">@RestController</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SlackMessageSender</span> {

    <span class="hljs-meta">@Value(&quot;@dollar@{slack.services.incoming}&quot;)</span>
    <span class="hljs-keyword">private</span> String slackServiceIncomingUrl;

    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">private</span> ObjectMapper objectMapper;


    <span class="hljs-meta">@RequestMapping(value = &quot;/slack/{message}&quot;)</span>
    <span class="hljs-keyword">public</span> ResponseEntity<span class="hljs-meta">@LTString</span><span class="hljs-meta">@GT</span> hello(<span class="hljs-meta">@PathVariable(value = &quot;message&quot;)</span> String message)
                <span class="hljs-keyword">throws</span> JsonProcessingException {

        <span class="hljs-type">RestTemplate</span> <span class="hljs-variable">restTemplate</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RestTemplate</span>();

        <span class="hljs-type">SlackMessage</span> <span class="hljs-variable">slackMessage</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SlackMessage</span>()
                .setChannel(<span class="hljs-string">&quot;random&quot;</span>)
                .setText(message)
                .setUsername(<span class="hljs-string">&quot;guillaume&quot;</span>)
                .setIcon_url(<span class="hljs-string">&quot;http://dev-mind.fr/logo/logo_48.png&quot;</span>);

        <span class="hljs-keyword">try</span>{
            <span class="hljs-type">HttpHeaders</span> <span class="hljs-variable">headers</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">HttpHeaders</span>();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<span class="hljs-meta">@LTString</span><span class="hljs-meta">@GT</span> request = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HttpEntity</span><span class="hljs-meta">@LT</span><span class="hljs-meta">@GT(objectMapper.writeValueAsString(slackMessage), headers)</span>;
            restTemplate.exchange(slackServiceIncomingUrl, HttpMethod.POST, request, String.class);
        }
        <span class="hljs-keyword">catch</span> (RuntimeException e){
            <span class="hljs-keyword">return</span> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        <span class="hljs-keyword">return</span> ResponseEntity.ok().body(<span class="hljs-string">&quot;Message sent&quot;</span>);
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1731613731848.7224')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Voila vous pouvez dès à présent envoyer encore plus d&#8217;infos vers vos channels favoris</p>
</div>`;