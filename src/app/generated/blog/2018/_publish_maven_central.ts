export const _publish_maven_central:string = `<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>Je n&#8217;avais encore jamais publié une librairie sous <a href="http://search.maven.org/">Maven Central</a>, afin de la rendre accessible à tous. Il existe plusieurs manières de faire. J&#8217;ai choisi le mode classique, préconisé par <a href="https://www.sonatype.com/">SonaType</a>, la société qui gère <a href="http://search.maven.org/">Maven Central</a> et les produits <a href="https://www.sonatype.com/nexus-lifecycle">Nexus</a>.</p>
</div>
<div class="paragraph">
<p>Tout mes exemples sont définis avec <a href="https://gradle.org/">Gradle</a> et le code source présenté dans cet article est disponible sous <a href="https://github.com/Dev-Mind/mockwebserver">Github</a>.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_utiliser_la_méthode_sonatype">Utiliser la méthode Sonatype</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Les différentes versions des librairies open source Java sont déployées sous  OSSRH (OSS Repository Hosting). OSSRH utilise Nexus Repository Manager pour gérer les librairies. La plateforme gère tout le cycle de vie des versions d&#8217;une librairie</p>
</div>
<div class="ulist">
<ul>
<li>
<p>les versions de développements (snapshots) peuvent être déployées</p>
</li>
<li>
<p>les versions tagguées sont poussées dans un dépôt staging (recette)</p>
</li>
<li>
<p>vous pouvez ensuite indiquer qu&#8217;une version de recette est releasée. La plateforme lance à ce moment plusieurs contrôles de qualité et pousse les binaires sur le dépôt central (<a href="http://search.maven.org/">Maven Central</a>).</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>La documentation officielle est assez complète et vous la trouverez <a href="http://central.sonatype.org/pages/ossrh-guide.html">ici</a>. Mais comme toute documentation il y a souvent un décalage entre le moment où elle a été décrite et le moment où vous l&#8217;appliquez. Sur une version récente de Linux et en utilisant les dernières versions de Gradle vous avez plusieurs points à savoir.</p>
</div>
<div class="paragraph">
<p>Commençons par le début. La documentation vous demande</p>
</div>
<div class="ulist">
<ul>
<li>
<p>de créer un compte sur le <a href="https://issues.sonatype.org/secure/Signup!default.jspa">Jira</a> de SonaType. Les identifiants de ce compte seront les mêmes que vous utiliserez pour pousser vos artefacts</p>
</li>
<li>
<p>d&#8217;ouvrir une issue dans laquelle vous demandez la création d&#8217;un nouveau projet. Les équipes Nexus vont faire un check manuel de votre demande. Ils sont assez réactifs</p>
</li>
</ul>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/mavencentral_01.png" alt="Ticket pour la création d&#8217;un projet">
</div>
</div>
<div class="paragraph">
<p>Même si nous allons utiliser Gradle, nous allons construire un descripteur de projet Maven (<code><em>pom.xml</em></code>), car Maven Central contenait à la base que des ressources pour les projes Maven.</p>
</div>
<div class="paragraph">
<p>Une fois que les équipes SonaType ont validé votre projet, vous pouvez envoyer votre librairie sur leurs serveurs. Mais différents checks seront faits afin d&#8217;assurer une qualité minimale des librairies</p>
</div>
<div class="ulist">
<ul>
<li>
<p>vous devez définir les metadata du projet dans un descripteur <code><em>pom.xml</em></code> avec les identifiants (<code><em>artifactId</em></code>, <code><em>version</em></code>, <code><em>groupId</em></code>), le type de packaging, les dépendances transitives et optionelles</p>
</li>
<li>
<p>en plus de votre artefact vous devez envoyer les sources et la javadoc</p>
</li>
<li>
<p>tous les artefacts doivent être signés avec GPG/PGP</p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_paramétrer_gradle">Paramétrer Gradle</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Regardons comment faire celà avec Gradle. Vous devez importer les plugins suivants pour votre projet Java</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006016.443">apply plugin: <span class="hljs-string">&#x27;java&#x27;</span>
apply plugin: <span class="hljs-string">&#x27;signing&#x27;</span>
apply plugin: <span class="hljs-string">&#x27;maven&#x27;</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722609006016.443')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Le plugin <code><em>signing</em></code> va être utilisé pour signer les artefacts.</p>
</div>
<div class="paragraph">
<p>Le plugin maven permet de générer un descripteur de projet Maven (<code><em>pom.xml</em></code>) et de publier vos artefacts sur Maven Central</p>
</div>
<div class="paragraph">
<p>Vous pouvez définir les metadata de votre projet&#8230;&#8203;</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006016.9644">group = <span class="hljs-string">&#x27;fr.dev-mind&#x27;</span>
archivesBaseName = <span class="hljs-string">&quot;mockwebserver&quot;</span>
version = rootProject.<span class="hljs-type">version</span>
<span class="hljs-variable">sourceCompatibility</span> <span class="hljs-operator">=</span> <span class="hljs-number">1.8</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722609006016.9644')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>puis les tâches pour générer les différents artefacts :  jar, sources et javadocs. Les artefacts peuvent contenir un fichier Manifest avec les infos essentielles de votre projet</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006017.8672">ext.sharedManifest = manifest {
    attributes(
            <span class="hljs-string">&quot;Implementation-Title&quot;</span>: project.name,
            <span class="hljs-string">&quot;Implementation-Version&quot;</span>: version,
            <span class="hljs-string">&quot;Implementation-Vendor&quot;</span>: project.group,
            <span class="hljs-string">&quot;Bundle-Vendor&quot;</span>: project.group
    )
}

task <span class="hljs-title function_">sourcesJar</span><span class="hljs-params">(type: Jar)</span> {
    from sourceSets.main.allJava
    manifest {
        from sharedManifest
    }
}

task <span class="hljs-title function_">javadocJar</span><span class="hljs-params">(type: Jar, dependsOn: javadoc)</span> {
    classifier = <span class="hljs-string">&#x27;javadoc&#x27;</span>
    from javadoc
    manifest {
        from sharedManifest
    }
}

javadoc {
    source = sourceSets.main.<span class="hljs-type">allJava</span>
    <span class="hljs-variable">classpath</span> <span class="hljs-operator">=</span> configurations.compile
    options.linkSource <span class="hljs-literal">true</span>
    options.addBooleanOption(<span class="hljs-string">&#x27;Xdoclint:all,-missing&#x27;</span>, <span class="hljs-literal">true</span>)
}

jar {
    manifest {
        from sharedManifest
    }
}

artifacts {
    archives javadocJar, sourcesJar
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609006017.8672')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous devez ensuite paramétrer la signature des artefacts. Dans l&#8217;exemple ci dessous, ceci n&#8217;est fait que lorsque la tâche <code><em>uploadArchives</em></code> est lancée (tâche permettant de publier vos librairies).</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006017.828">signing {
    required { gradle.taskGraph.hasTask(<span class="hljs-string">&quot;uploadArchives&quot;</span>) }
    sign configurations.archives
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609006017.828')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Il ne reste plus qu&#8217;à paramétrer cette tâche <code><em>uploadArchives</em></code> avec les informations que l&#8217;on veut voir dans le <code><em>pom.xml</em></code> et les dépôts que vous allez utiliser</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006018.003">uploadArchives {
    repositories {
        mavenDeployer {
            beforeDeployment { MavenDeployment deployment <span class="hljs-meta">@LAMBDA</span> signing.signPom(deployment) }

            repository(url: <span class="hljs-string">&quot;https://oss.sonatype.org/service/local/staging/deploy/maven2/&quot;</span>) {
                authentication(userName: ossrhUsername, password: ossrhPassword)
            }

            snapshotRepository(url: <span class="hljs-string">&quot;https://oss.sonatype.org/content/repositories/snapshots/&quot;</span>) {
                authentication(userName: ossrhUsername, password: ossrhPassword)
            }

            pom.project {
                name project.name
                packaging <span class="hljs-string">&#x27;jar&#x27;</span>
                description <span class="hljs-string">&quot;A scriptable web server for testing HTTP clients&quot;</span>
                url <span class="hljs-string">&#x27;https://github.com/Dev-Mind/mockwebserver&#x27;</span>

                scm {
                    connection <span class="hljs-string">&#x27;scm:git:git://github.com/Dev-Mind/mockwebserver&#x27;</span>
                    developerConnection <span class="hljs-string">&#x27;scm:git:git://github.com/Dev-Mind/mockwebserver&#x27;</span>
                    url <span class="hljs-string">&#x27;https://github.com/Dev-Mind/mockwebserver&#x27;</span>
                }

                licenses {
                    license {
                        name <span class="hljs-string">&#x27;The Apache License, Version 2.0&#x27;</span>
                        url <span class="hljs-string">&#x27;http://www.apache.org/licenses/LICENSE-2.0.txt&#x27;</span>
                    }
                }

                developers {
                    developer {
                        id <span class="hljs-string">&#x27;javamind&#x27;</span>
                        name <span class="hljs-string">&#x27;Guillaume EHRET&#x27;</span>
                        email <span class="hljs-string">&#x27;guillaume@dev-mind.fr&#x27;</span>
                    }
                }
            }
        }
    }
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609006018.003')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_erreur_avec_gpg2">Erreur avec gpg2</h2>
<div class="sectionbody">
<div class="paragraph">
<p>J&#8217;ai suivi la <a href="http://central.sonatype.org/pages/working-with-pgp-signatures.html">documentation</a> pour tout d&#8217;abord générer une clé via</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006018.4453"><span class="hljs-meta">@dollar</span>@ gpg2 --key-gen</code><button class="btn-copy-code" onclick="copyToClipboard('1722609006018.4453')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Lorsque vous générez votre clé vous devez spécifier une <code>passphrase</code>. Personnellement j&#8217;ai du saisir des <code>passphrase</code> sans espace pour ne pas avoir de problème par la suite quand j&#8217;avais à resaisir ces informations.</p>
</div>
<div class="paragraph">
<p>J&#8217;utilise une version récente de Linux qui utilise une version 2.1.15</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006018.75"><span class="hljs-meta">@dollar</span>@ gpg2 --version</code><button class="btn-copy-code" onclick="copyToClipboard('1722609006018.75')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Plusieurs choses ont été améliorées dans les versions @GT 2.1 de gpg. Si vous affichez les clés créées, la taille de ces clés a été augmentée et la nouvelle taille n&#8217;est pas encore supportée par le plugin Gradle. Le plugin se base sur les librairies Java <code><em>org.bouncycastle</em></code> et il faut qu&#8217;ils migrent vers les dernières versions de cette librairie</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006019.3892"><span class="hljs-meta">@dollar</span>@ gpg2 --list-secret-keys

/home/devmind/.gnupg/pubring.kbx
------------------------------
pub   rsa2048 <span class="hljs-number">2018</span>-<span class="hljs-number">01</span>-<span class="hljs-number">13</span> [SC]
      6933FACC1931DD8A89CED163582D3134
uid         [ultimate] Guillaume EHRET <span class="hljs-meta">@LTguillaume</span><span class="hljs-meta">@dev</span>-mind.fr<span class="hljs-meta">@GT</span>
sub   rsa2048 <span class="hljs-number">2018</span>-<span class="hljs-number">01</span>-<span class="hljs-number">13</span> [E]</code><button class="btn-copy-code" onclick="copyToClipboard('1722609006019.3892')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour retrouver un format de clé court utilisez la commande suivante</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006019.4578"><span class="hljs-meta">@dollar</span>@ gpg2 --list-secret-keys --keyid-format <span class="hljs-type">short</span>

/home/devmind/.gnupg/pubring.kbx
--------------------------------
pub   rsa2048/C6EED57A <span class="hljs-number">2018</span>-<span class="hljs-number">01</span>-<span class="hljs-number">13</span> [SC]
uid         [ultimate] Guillaume EHRET <span class="hljs-meta">@LTguillaume</span><span class="hljs-meta">@dev</span>-mind.fr<span class="hljs-meta">@GT</span>
sub   rsa2048/7DY5B54F <span class="hljs-number">2018</span>-<span class="hljs-number">01</span>-<span class="hljs-number">13</span> [E]</code><button class="btn-copy-code" onclick="copyToClipboard('1722609006019.4578')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez maintenant publier votre clé publique sur un serveur de clé</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006020.3625"><span class="hljs-meta">@dollar</span>@ gpg2 --keyserver hkp:<span class="hljs-comment">//pool.sks-keyservers.net --send-keys C6EED57A</span></code><button class="btn-copy-code" onclick="copyToClipboard('1722609006020.3625')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous pouvez reporter ces informations dans le fichier <code><em>gradle.properties</em></code> global (elles ne doivent pas être envoyées dans votre dépôt de sources public). Ce fichier devra également contenir les identifiants que vous avez utiliser sur Sonatype</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006020.5215">signing.keyId=C6EED57A
signing.password=CeciEstMonpassword
signing.secretKeyRingFile=/home/devmind/.gnupg/secring.gpg

ossrhUsername=devmind
ossrhPassword=CeciEstMonpassword</code><button class="btn-copy-code" onclick="copyToClipboard('1722609006020.5215')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Après avoir fait cette action mon build Gradle ne fonctionnait toujours pas et retournait l&#8217;erreur suivante</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006020.3372">* What went wrong:
Execution failed <span class="hljs-keyword">for</span> task <span class="hljs-string">&#x27;:signArchives&#x27;</span>.
<span class="hljs-meta">@GT</span> Unable to read secret key from file: /home/devmind/.gnupg/secring.gpg (it may not be a PGP secret key ring)</code><button class="btn-copy-code" onclick="copyToClipboard('1722609006020.3372')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Le stockage des clés à changé. Il ne se fait plus dans un fichier <code><em>secring.gpg</em></code> mais sous forme de sous-répertoires dans le répertoire <code><em>.gnupg</em></code>. Heureusement il est encore possible de générer ce fichier pour assurer la rétrocompatibilité.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006020.663"><span class="hljs-meta">@dollar</span>@ gpg2 --export-secret-keys <span class="hljs-meta">@GT</span> ~/.gnupg/secring.gpg</code><button class="btn-copy-code" onclick="copyToClipboard('1722609006020.663')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Un <a href="https://github.com/gradle/gradle/issues/888">ticket</a> a été ouvert pour modifier le plugin signin de Gradle et une solution a été apportée à partir de Gradle 4.5.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_a_partir_de_gradle_4_5">A partir de Gradle 4.5</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Une autre solution a été mise en place dans la dernière version de Gradle, la <a href="https://docs.gradle.org/4.5/release-notes.html#signing-artifacts-with-gpg-agent">version 4.5</a>. Le plugin <code><em>signing</em></code> utilise une implémentation Java pour gérer les signatures va GPG. Cette implémentation ne peut pas utiliser <code><em>gpg-agent</em></code> pour gérer les clés privées. Avec Gradle 4.5 vous pouvez maintenant utiliser cet agent en utilisant <code><em>useGpgCmd()</em></code> (GnuPG doit bien évidemment être installé).</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-java" id="1722609006020.7402">signing {
    required { gradle.taskGraph.hasTask(<span class="hljs-string">&quot;uploadArchives&quot;</span>) }
    useGpgCmd()
    sign configurations.archives
}</code><button class="btn-copy-code" onclick="copyToClipboard('1722609006020.7402')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Vous devez toujours générer votre clé et l&#8217;enregistrer sur le serveur de clé. Vous n&#8217;avez plus besoin par contre de générer un fichier pour assurer la rétrocompatibilité. Sans autre configuration, le plugin <em>@backtick@signing@backtick@</em> trouvera <em>@backtick@gpg2@backtick@</em> dans le path et vous demandera de saisir la passphrase via une boite de dialogue</p>
</div>
<div class="paragraph">
<p>Pour automatiser le tout vous pouvez ajouter la configuration suivante dans votre build.gradle global</p>
</div>
<div class="listingblock">
<div class="content">
<pre>signing.gnupg.executable=gpg
signing.gnupg.useLegacyGpg=false
signing.gnupg.keyName=C6EED57A
signing.gnupg.passphrase=CeciEstMonpassword

ossrhUsername=devmind
ossrhPassword=CeciEstMonpassword</pre>
</div>
</div>
<div class="paragraph">
<p>Pour plus d&#8217;informations vous pouvez lire la <a href="https://docs.gradle.org/4.5/userguide/signing_plugin.html#sec:using_gpg_agent">documentation</a>.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_publier_sous_sonatype">Publier sous Sonatype</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Une fois que les problèmes vus au paragraphe précédent ont été réglés, vous pouvez publier vos artefacts chez Sonatype.</p>
</div>
<div class="paragraph">
<p>Les versions suffixées par <code><em>-SNAPSHOT</em></code> sont envoyées vers  <a href="https://oss.sonatype.org/content/repositories/snapshots/" class="bare">https://oss.sonatype.org/content/repositories/snapshots/</a></p>
</div>
<div class="paragraph">
<p>Les versions tagguées (sans <code><em>-SNAPSHOT</em></code>) sont envoyées vers  <a href="https://oss.sonatype.org/service/local/staging/deploy/maven2/" class="bare">https://oss.sonatype.org/service/local/staging/deploy/maven2/</a></p>
</div>
<div class="paragraph">
<p>Par contre les versions tagguées ne sont pas encore disponible de tous à cette étape. Comme nous l&#8217;avons vu au début de l&#8217;article les librairies publiées passe d&#8217;abord par une phase de recette (staging).</p>
</div>
<div class="paragraph">
<p>Vous devez lancer le Nexus de Sonatype : <a href="https://oss.sonatype.org/#stagingRepositories" class="bare">https://oss.sonatype.org/#stagingRepositories</a> et sélectionner votre librairie dans le bas de la liste</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/mavencentral_02.png" alt="Sonatype staging repository">
</div>
</div>
<div class="paragraph">
<p>Dans la barre de bouton le bouton <code><em>Drop</em></code> permet de supprimer votre librairie et le bouton <code><em>Close</em></code> de passer à la phase suivante&#8230;&#8203; Je vous l&#8217;accorde ce n&#8217;est pas très parlant ce nommage de bouton.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/mavencentral_03.png" alt="Sonatype staging repository boutons">
</div>
</div>
<div class="paragraph">
<p>Une fois que vous avez confirmé le passage à l&#8217;étape suivante, les contrôles de validité du projet sont lancés.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2018/mavencentral_04.png" alt="Sonatype staging checks">
</div>
</div>
<div class="paragraph">
<p>Vous pouvez cliquer sur le bouton <code><em>Refresh</em></code> pour mettre à jour l&#8217;état de votre librairie. Si tout s&#8217;est bien passé le bouton <code><em>Release</em></code> dans la barre de bouton s&#8217;est activé. En cliquant dessus votre librairie sera publiée et dupliquée sur les différents serveurs Sonatype pour être accessible dans un délai maximal de 2h.</p>
</div>
</div>
</div>`;