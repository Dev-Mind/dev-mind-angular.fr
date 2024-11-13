export const _ngeurope_angular2_unittest:string = `<div class="sect1">
<h2 id="_vikram_subramanian_unit_tests_for_angular_2_applications_slides"><a href="https://twitter.com/vikerman">Vikram Subramanian</a> : Unit Tests for Angular 2 Applications <a href="https://docs.google.com/presentation/d/1fFxQvx2WHFPqR4piq0oWgKBuSMvrCwc1vfYggHlYEbQ/edit#slide=id.p">Slides</a></h2>
<div class="sectionbody">
<div class="paragraph">
<p>Vikram fait partie de l’équipe Angular 2 et son but était de se focaliser sur les tests unitaires tout en se distinguant des interventions de Julie Ralph sur le sujet. J’ai beaucoup aimé ce talk car je pense que les tests automatisés sont primordiaux quand on veut écrire des logiciels de qualité dans le temps.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/blog/2016/ngeurope/ngeurope-angulartest00.jpg" alt="Vikram Subramanian">
</div>
<div class="title">Figure 1. photo de Philippe Chatel</div>
</div>
<div class="paragraph">
<p>Les tests sont là pour détecter les régressions mais doivent être simples à écrire. Quand on écrit des tests de composants JavaScript nous devons disposer d’une bonne API pour parcourir le DOM lié à ce composant. L’équipe Angular a essayé d’écrire un ensemble de fonction pour simplifier ce travail en essayant d’être agnostique au niveau du framework de tests.</p>
</div>
<div class="paragraph">
<p>Vous pouvez aussi bien utiliser du <a href="http://jasmine.github.io/">Jasmine</a> (celui utilisé par Google), <a href="https://mochajs.org/">Mocha</a> ou autre. Au niveau du test runner vous pouvez utiliser un runner fourni par ces différents framework ou utiliser <a href="https://karma-runner.github.io/1.0/index.html">Karma</a> qui offre plus de souplesse dans le paramétrage.</p>
</div>
<div class="paragraph">
<p>Au niveau des tests il est toujours difficile de savoir ce que l’on mocke et à quel niveau nous devons nous arrêter. Faut-il privilégier l’isolation totale du test ou être le plus proche possible de la production ? Le deuxième cas est forcément celui qu’on aimerait appliqué mais il demande plus de boulot et ces tests seront plus longs.</p>
</div>
<div class="paragraph">
<p>Voici un exemple de tests Angular 2</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-javascript" id="1731527923295.8054"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;displays user details on click&#x27;</span>, <span class="hljs-title function_">async</span>(<span class="hljs-function">() =&gt;</span> {
  ...
  <span class="hljs-comment">// Locate the fetch button.  let debugFetchButton = fixture.debugElement.query(By.css(&#x27;button&#x27;));</span>
  <span class="hljs-title function_">expect</span>(debugFetchButton).<span class="hljs-property">not</span>.<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">null</span>);


  <span class="hljs-comment">// Trigger the click event through the DOM.  debugFetchButton.nativeElement.click();</span>


  <span class="hljs-comment">// Wait for the async getUsers to complete and Angular to become stable.  fixture.whenStable().then(() =&gt; {</span>
    <span class="hljs-comment">// Trigger rendering component state to DOM.    fixture.detectChanges();</span>


    <span class="hljs-comment">// Check that the user list is displayed.    ...</span>
  });
}));</code><button class="btn-copy-code" onclick="copyToClipboard('1731527923295.8054')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Pour plus d’informations je vous réoriente vers la documentation officielle <a href="https://angular.io/docs/ts/latest/guide/testing.html" class="bare">https://angular.io/docs/ts/latest/guide/testing.html</a></p>
</div>
<div class="paragraph">
<p>Il est important de noter qu’il reste pas mal de boulot pour les tests et notamment au niveau des tests de code utilisant le service http. Il faudrait pouvoir mocker facilement ce service.</p>
</div>
<div class="videoblock">
<div class="title">Voir la vidéo</div>
<div class="content">
<iframe src="https://www.youtube.com/embed/dVtDnvTLaIo?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</div>
</div>
</div>`;