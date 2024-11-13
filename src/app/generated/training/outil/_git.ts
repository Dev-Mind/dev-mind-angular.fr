export const _git:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_for_who_why">For who, why ?</a></li>
<li><a class="link" fragment="#_what_did_we_do_before">What did we do before ?</a></li>
<li><a class="link" fragment="#_whats_a_repository">What&#8217;s a repository ?</a></li>
<li><a class="link" fragment="#_install_git">Install Git</a></li>
<li><a class="link" fragment="#_first_commands">First commands</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_configure_git">Configure Git</a></li>
<li><a class="link" fragment="#_clone_a_git_project">Clone a Git project</a></li>
<li><a class="link" fragment="#_initialize_a_git_repository">Initialize a Git repository</a></li>
<li><a class="link" fragment="#_linking_files_to_git">Linking files to Git</a></li>
<li><a class="link" fragment="#_saving_modifications">Saving modifications</a></li>
<li><a class="link" fragment="#_know_the_current_state">Know the current state</a></li>
<li><a class="link" fragment="#_see_history">See history</a></li>
<li><a class="link" fragment="#_see_current_changes">See current changes</a></li>
<li><a class="link" fragment="#_go_back_in_the_history">Go back in the history</a></li>
</ul>
</li>
<li><a class="link" fragment="#_working_with_branches">Working with branches</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_see_the_current_branch">See the current branch</a></li>
<li><a class="link" fragment="#_create_a_branch">Create a branch</a></li>
<li><a class="link" fragment="#_change_the_current_branch">Change the current branch</a></li>
<li><a class="link" fragment="#_compare_2_branches">Compare 2 branches</a></li>
<li><a class="link" fragment="#_merge_2_branches">Merge 2 branches</a></li>
<li><a class="link" fragment="#_delete_a_branch">Delete a branch</a></li>
</ul>
</li>
<li><a class="link" fragment="#_github">Github</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_link_your_local_repository_to_a_remote_repository">Link your local repository to a remote repository</a></li>
<li><a class="link" fragment="#_git_project_workflow">Git Project Workflow</a></li>
</ul>
</li>
<li><a class="link" fragment="#_conclusion">Conclusion</a></li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>This course presents <a href="https://git-scm.com">Git</a> &amp; <a href="https://github.com/">Github</a>. Git is used to centralize and log the changes on your code. This is a software. GitHub is a cloud platform built on Git and you can use their services to store, manage, share your code with your co-workers&#8230;&#8203;</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/git-github.jpg" alt="Comprendre Git" width="800">
</div>
</div>
<div class="paragraph">
<p>For more information about Git you can find</p>
</div>
<div class="ulist">
<ul>
<li>
<p>a summary of the main instructions  <a href="https://education.github.com/git-cheat-sheet-education.pdf" class="bare">https://education.github.com/git-cheat-sheet-education.pdf</a></p>
</li>
<li>
<p>official documentation <a href="https://git-scm.com/docs" class="bare">https://git-scm.com/docs</a></p>
</li>
</ul>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_for_who_why">For who, why ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>A version control system (VCS: version control system) helps to <strong>manage the history</strong> of the changes made by people, teams, or only one person who collaborate on a project.</p>
</div>
<div class="paragraph">
<p>When the project evolves, people can at any time, find an old version of the code.</p>
</div>
<div class="paragraph">
<p>Git answers these questions quickly</p>
</div>
<div class="ulist">
<ul>
<li>
<p>What changes have been made?</p>
</li>
<li>
<p>Who made the changes?</p>
</li>
<li>
<p>When were the changes made?</p>
</li>
<li>
<p>Why were the changes made?</p>
</li>
</ul>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>Git is a decentralized source management software (DVCS) created in 2005 by Linus Torvald (creator of the Linux kernel).
The sources are stored both on the computer of each contributor of the project, but also on a centralized server.</p>
</div>
</blockquote>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/outil/git.svg" alt="Git">
</div>
<div class="title">Figure 1. logo Git</div>
</div>
<div class="paragraph">
<p>Today, most of the open source or commercial projects developed use Git (More than 90% of developers, according <a href="https://survey.stackoverflow.co/2022#section-version-control-version-control-systems">stackoverflow</a> insights).</p>
</div>
<div class="paragraph">
<p>Git allows access to all files, branches, versions (releases) or tags of a project to authorized people.</p>
</div>
<div class="paragraph">
<p>Basically you don&#8217;t need a centralized solution with Git, but online solutions have emerged like <a href="https://github.com">Github</a> or <a href="https://about.gitlab.com/">Gitlab</a>.</p>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/outil/github.svg" alt="Github">
</div>
<div class="title">Figure 2. logo Github</div>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/outil/gitlab.svg" alt="Gitlab">
</div>
<div class="title">Figure 3. logo Gitlab</div>
</div>
<div class="paragraph">
<p>These services extend Git and offer more features like pull requests, code reviews&#8230;&#8203; <a href="https://github.com">Github</a> was the precursor but today <a href="https://about.gitlab.com/">Gitlab</a> is equivalent, and you can use the one you prefer.</p>
</div>
<div class="paragraph">
<p>As I had to make a choice for our courses, I choose Github. From now on, I will only talk about Github. Back up your sources regularly. At the end of our courses, you will have to provide me the URGithub URL of your repository which will contain the sources of your project.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_what_did_we_do_before">What did we do before ?</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Before Git, it was difficult to follow the history, especially when we had multiple project copies.</p>
</div>
<div class="paragraph">
<p>Early solutions, like CSV or SVN (Subversion) were quickly limited.</p>
</div>
<div class="paragraph">
<p>It was often awful to refactor your code because of their limitations.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_whats_a_repository">What&#8217;s a repository ?</h2>
<div class="sectionbody">
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>A Git repository contains all the files and directories associated with your project. It also contains all the history of changes made on each one. You can retrieve any changes made by any developer at any time.</p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>Publishing changes is called a commit. Each commit is linked to another (this is a chained list).</p>
</div>
<div class="paragraph">
<p>Commits can be organized into several parallel branches.</p>
</div>
<div class="paragraph">
<p>Projects are stand-alone units, and anyone with a copy of the repository can access the entire code and its history. You can execute different operations like logging, cloning, branch creation, commit, merging&#8230;&#8203;</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/outil/git-repo.png" alt="Github" width="800">
</div>
<div class="title">Figure 4. Centralized repository, local repository</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_install_git">Install Git</h2>
<div class="sectionbody">
<div class="paragraph">
<p>If you use Windows, you can download Git here <a href="https://git-scm.com/downloads" class="bare">https://git-scm.com/downloads</a></p>
</div>
<div class="paragraph">
<p>On a Linux (Fedora)</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925253.185">sudo yum install git</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925253.185')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>On Linux (Debian, Ubuntu) use</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925254.4116">sudo apt-get install git</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925254.4116')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>To check your install, display the git version in terminal</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925254.5398">~@dollar@ git --version

git version 2.34.1</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925254.5398')">Copy</button></pre>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_first_commands">First commands</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_configure_git">Configure Git</h3>
<div class="paragraph">
<p>It&#8217;s important to provide some information to Git, especially when you push your changes to a centralized repository. Use the <code>git config</code> operation to set your name and your email.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925254.903">~@dollar@ git config --global user.name &quot;Guillaume EHRET Dev-Mind&quot;
~@dollar@ git config --global user.email &quot;guillaume@dev-mind.fr&quot;</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925254.903')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>By default, Git will create a branch called <code>master</code> when you create a new repository with the command <code>git init</code>. The terms master and slave are often used in computer industry&#8217;s. After many protests, these harmful and antiquated terms were no longer considered appropriate. Github used the term <code>main branch</code>. To use the same configuration, you can execute</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925254.7393">~@dollar@  git config --global init.defaultBranch main</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925254.7393')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_clone_a_git_project">Clone a Git project</h3>
<div class="paragraph">
<p>Go in your working directory, and in a terminal type</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925254.9749">~@dollar@ git clone https://github.com/Dev-Mind/git-demo.git</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925254.9749')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The remote project <code>git-demo</code> is downloaded on your computer. You get all the history, all the files, all the branches &#8230;&#8203;</p>
</div>
<div class="paragraph">
<p>For example you can run these commands</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925254.156">~@dollar@ cd git-demo
~@dollar@ git log</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925254.156')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_initialize_a_git_repository">Initialize a Git repository</h3>
<div class="paragraph">
<p>For a new project, it&#8217;s better to start from 0. Delete the directory to recreate it</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925254.5044">~@dollar@ cd ..
~@dollar@ rm -rf git-demo
~@dollar@ mkdir git-demo
~@dollar@ cd git-demo</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925254.5044')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>To link this directory to Git, launch</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925254.6184">~@dollar@ git init

Initialized empty Git repository in /home/devmind/Workspace/java/git-demo/.git/</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925254.6184')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>A <code>.git</code> directory has been added and it contains the different files, logs, traces</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925254.8198">---
~@dollar@ ls -la
total 28
drwxr-xr-x  3 devmind devmind  4096 sept. 26 22:46 .
drwxr-xr-x 10 devmind devmind  4096 sept. 26 22:46 ..
drwxr-xr-x  8 devmind devmind  4096 sept. 26 22:46 .git
----</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925254.8198')">Copy</button></pre>
</div>
</div>
<div class="admonitionblock note">
<table>
<tr>
<td class="icon">
<div class="title">Note</div>
</td>
<td class="content">
Git will display a warning if you name the default branch master (default configuration). Read the chapter about <a href="https://dev-mind.fr/training/outil/git.html#_initialize_a_git_repository">Git configuration</a> to set another default branch name.
</td>
</tr>
</table>
</div>
</div>
<div class="sect2">
<h3 id="_linking_files_to_git">Linking files to Git</h3>
<div class="paragraph">
<p>Let&#8217;s start by creating files in this <code>git-demo</code> directory</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925254.1738">~@dollar@ echo &quot;Hello world&quot; @GT hello.txt
~@dollar@ echo &quot;@LThtml@GT@LTbody@GT@LTh1@GTHello World@LT/h1@GT@LT/body@GT@LT/html@GT&quot; @GT hello.html
~@dollar@ echo &quot;Hello world&quot; @GT hello.md
~@dollar@ ls
hello.html  hello.txt  hello.md</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925254.1738')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Use <code>git status</code> to know the state</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925254.4727">~@dollar@ git status

On branch main

No commits yet

Untracked files:
  (use &quot;git add @LTfile@GT...&quot; to include in what will be committed)
	hello.html
	hello.md
	hello.txt

nothing added to commit but untracked files present (use &quot;git add&quot; to track)</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925254.4727')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Use the <code>git add</code> command to indicate that a new or multiple files will be handled by git.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925255.74">~@dollar@ git add hello.txt
~@dollar@ git add .</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925255.74')">Copy</button></pre>
</div>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Adds hello.txt file</p>
</li>
<li>
<p>Adds all the files</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>At this moment, our files are not saved in Git. They are in a staging area. We have only a snapshot of the changes</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925255.2473">~@dollar@ git status

On branch main

No commits yet

Changes to be committed:
  (use &quot;git rm --cached @LTfile@GT...&quot; to unstage)
	new file:   hello.html
	new file:   hello.md
	new file:   hello.txt</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925255.2473')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_saving_modifications">Saving modifications</h3>
<div class="paragraph">
<p>The following command saves the snapshot in the project history and completes the change tracking process. In short, a commit works like taking a photo. We freeze in time what we have done.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925255.8845">~@dollar@ git commit -m &quot;First commit&quot;

[main a7d5b84] First commit
 3 files changed, 3 insertions(+)
 create mode 100644 hello.html
 create mode 100644 hello.md
 create mode 100644 hello.txt</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925255.8845')">Copy</button></pre>
</div>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p><code>-m</code> to add a message.
It&#8217;s very important to be able to understand why a commit was made</p>
</li>
<li>
<p>Git displays the name of the branch &#8658; <code>main</code> and the hash of the commit@backtick@ a7d5b84@backtick@ (this is the number of the photo)</p>
</li>
</ol>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>Our Git history is a living, ever-changing, searchable record that tells the story of how and why our code is the way it is.
It&#8217;s important to explain the purpose of a commit.And try to commit often your work.
It is a security if you want to restore your work.
For example</p>
</div>
</blockquote>
</div>
<div class="imageblock">
<div class="content">
<img src="../../img/training/outil/github_history.png" alt="History">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_know_the_current_state">Know the current state</h3>
<div class="paragraph">
<p>We will delete the <code>hello.txt</code> file, update <code>hello.md</code> and add a <code>hello.adoc</code> file</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925255.9824">~@dollar@ rm hello.md
~@dollar@ echo &quot;My first Git example&quot; &gt; hello.md
~@dollar@ echo &quot;Hello World&quot; &gt; hello.adoc</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925255.9824')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Launch the following command to know where Git is</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925255.161">~@dollar@ git status</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925255.161')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Git should indicate that you have a modified file <code>hello.md</code> and an untracked file <code>hello.adoc</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925255.0193">~@dollar@ git add .
~@dollar@ git commit -m &quot;Second commit&quot;

[main 7b7d8e6] Second commit
 3 files changed, 2 insertions(+), 2 deletions(-)
 create mode 100644 hello.adoc
 delete mode 100644 hello.txt</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925255.0193')">Copy</button></pre>
</div>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925255.3745">~@dollar@ git status

On branch main
nothing to commit, working tree clean</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925255.3745')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>Now all the changes are saved</p>
</div>
</div>
<div class="sect2">
<h3 id="_see_history">See history</h3>
<div class="paragraph">
<p>Use the log command</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925255.3909">~@dollar@ git log

commit 7b7d8e69a06af284c9da7aa4a8c28835d23318fe (HEAD @LAMBDA main)
Author: Guillaume EHRET Dev-Mind @LTguillaume@dev-mind.fr@GT
Date:   Wed Sep 26 23:22:46 2018 +0200

    Second commit

commit a7d5b843ebc65ac6e94c37872d6a936e1c03a6b5
Author: Guillaume EHRET Dev-Mind @LTguillaume@dev-mind.fr@GT
Date:   Wed Sep 26 23:08:00 2018 +0200

    First commit</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925255.3909')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>We find our two commits, with the names we have set, at what time &#8230;&#8203;</p>
</div>
</div>
<div class="sect2">
<h3 id="_see_current_changes">See current changes</h3>
<div class="paragraph">
<p>We will update a file and run the <code>diff</code> command</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925255.518">~@dollar@ echo &quot;Fichier Asciidoc&quot; @GT hello.adoc
~@dollar@ git diff</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925255.518')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You should see, what has been added and removed in the file.</p>
</div>
<div class="paragraph">
<p>You can use IDE (like IntelliJ) and its visual tools for tracking changes. For example</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/outil/ide_git.png" alt="Github" width="700">
</div>
</div>
</div>
<div class="sect2">
<h3 id="_go_back_in_the_history">Go back in the history</h3>
<div class="paragraph">
<p>You can use a <code>reset</code> to go back to the state of the last commit</p>
</div>
<div class="paragraph">
<p>For example</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925255.1191">~@dollar@ echo &quot;Hello World&quot; @GT hello.adoc
~@dollar@ git status
On branch main
Changes not staged for commit:
  (use &quot;git add @LTfile@GT...&quot; to update what will be committed)
  (use &quot;git restore @LTfile@GT...&quot; to discard changes in working directory)
	modified:   hello.adoc

no changes added to commit (use &quot;git add&quot; and/or &quot;git commit -a&quot;)

~@dollar@ git reset --hard
~@dollar@ git status
On branch main
nothing to commit, working tree clean</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925255.1191')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_working_with_branches">Working with branches</h2>
<div class="sectionbody">
<div class="paragraph">
<p>Generally on a project we have a main branch (generally called <code>main</code>). We can open different branches in parallel to fix bugs, add new features.</p>
</div>
<div class="paragraph">
<p>These branches are merged on the main branch when they are completes. For example when the code will be reviewed by co-coworkers and the app tested by users.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/outil/git-branch.jpg" alt="Github" width="800">
</div>
<div class="title">Figure 5. Branch Principle</div>
</div>
<div class="sect2">
<h3 id="_see_the_current_branch">See the current branch</h3>
<div class="paragraph">
<p>Run the following command to see the current branch</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925255.7512">~@dollar@ git branch
feat/hairs
* main</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925255.7512')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>For the moment we have 2 local branches <code>feat/hairs</code> and <code>main</code>. Character * shows the current branch.</p>
</div>
</div>
<div class="sect2">
<h3 id="_create_a_branch">Create a branch</h3>
<div class="paragraph">
<p>A branch is just a name without special characters or spaces. To create a branch we use <code>git branch [name]</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925256.3816">~@dollar@ git branch test
~@dollar@ git branch
* main
test</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925256.3816')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>By default the created branch is not active (it does not have *)</p>
</div>
<div class="paragraph">
<p>A prefix is often used by convention, when you want to name a branch. for example</p>
</div>
<div class="ulist">
<ul>
<li>
<p><code>fix/1233-hair-color</code>: a branch to fix a hair color problem. The ticket number of the bug tracker is often indicated</p>
</li>
<li>
<p><code>feat/add-glasses</code>: a branch to add a feature</p>
</li>
<li>
<p><code>chore/upgrade-jquery</code>: a branch to perform a technical task</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_change_the_current_branch">Change the current branch</h3>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925256.6516">~@dollar@ git checkout test
~@dollar@ git branch
main
main
* test</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925256.6516')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The <code>test</code> branch is now the default</p>
</div>
<div class="paragraph">
<p>You can make a change and save it</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925256.2322">~@dollar@ echo &quot;Fichier Asciidoc updated&quot; @GT hello.adoc
~@dollar@ git add .
~@dollar@ git commit -m &quot;Third commit&quot;</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925256.2322')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>You can launch the following commands</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925256.1304">~@dollar@ git log
~@dollar@ git checkout main
~@dollar@ git log</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925256.1304')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>As we returned on the <code>main</code> branch we don&#8217;t see the last commit (only present in the <code>test</code> branch)</p>
</div>
</div>
<div class="sect2">
<h3 id="_compare_2_branches">Compare 2 branches</h3>
<div class="paragraph">
<p>We will reuse the <code>git diff</code> command but we specify the 2 branches separated by <code>&#8230;&#8203;</code></p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925256.9834">~@dollar@ git diff test...main</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925256.9834')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>This command should show nothing because <code>test</code> is based on@backtick@ main@backtick@ and it is just ahead, it contains all main commits</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925256.16">~@dollar@ git diff main...test</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925256.16')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>This time, as <code>test</code> branch is the reference, Git detects that there are differences</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925256.1597">~@dollar@ git log

commit 4529128a723e0a16cf405b218f37f2da58c5a9fd (HEAD @LAMBDA test)  (1)
Author: Guillaume EHRET Dev-Mind @LTguillaume@dev-mind.fr@GT
Date:   Thu Sep 27 00:00:00 2018 +0200

    Third commit

commit 9fd87d1ffc654a74105f3f279032e7f88d3d265b (main)       (2)
Author: Guillaume EHRET Dev-Mind @LTguillaume@dev-mind.fr@GT
Date:   Wed Sep 26 23:51:10 2018 +0200

    Second  commit
...</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925256.1597')">Copy</button></pre>
</div>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Git indicates the HEAD of the test branch</p>
</li>
<li>
<p>Git displays the name of the parent branch =&#8658; <code>main</code> and where it is in the history</p>
</li>
</ol>
</div>
<div class="paragraph">
<p>You can go back to <code>main</code> and create another branch@backtick@ test2@backtick@</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925256.5552">~@dollar@ git checkout main
~@dollar@ git branch test2
~@dollar@ git checkout test2
~@dollar@ echo &quot;Fichier toto&quot; &gt; toto.adoc
~@dollar@ git add .
~@dollar@ git commit -m &quot;Fourth commit&quot;</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925256.5552')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_merge_2_branches">Merge 2 branches</h3>
<div class="paragraph">
<p>If you want to post your changes from the <code>test</code> branch to@backtick@ main@backtick@, you&#8217;re going to do a merge</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925256.548">~@dollar@ git checkout main
~@dollar@ git merge test</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925256.548')">Copy</button></pre>
</div>
</div>
</div>
<div class="sect2">
<h3 id="_delete_a_branch">Delete a branch</h3>
<div class="paragraph">
<p>You can delete a branch if this branch is not the active one</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925256.5947">~@dollar@ git checkout test
~@dollar@ git branch -d test
error: Cannot delete branch &#x27;test&#x27; checked out at &#x27;/home/devmind/Workspace/java/git-demo&#x27;

~@dollar@ git checkout main
~@dollar@ git branch -d test
Deleted branch test (was 9fd87d1).</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925256.5947')">Copy</button></pre>
</div>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_github">Github</h2>
<div class="sectionbody">
<div class="sect2">
<h3 id="_link_your_local_repository_to_a_remote_repository">Link your local repository to a remote repository</h3>
<div class="paragraph">
<p>You can install a centralized Git repository by using <a href="https://github.com/">Github Enterprise</a>, <a href="https://gitlab.com/">Gitlab Enterprise</a>, <a href="https://gogs.io/">Gogs</a>.But you can also use an online service</p>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Create an account under Github</p>
</li>
<li>
<p>Once you are logged in on Github,  you can create your first repository</p>
</li>
</ol>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/outil/github_new.png" alt="Nouveau projet sous Github" width="800">
</div>
<div class="title">Figure 6. New project under Github</div>
</div>
<div class="paragraph">
<p>Github provides you commands to connect this remote repository to your local repository.</p>
</div>
<div class="imageblock text-center">
<div class="content">
<img src="../../img/training/outil/github_new2.png" alt="github new2" width="800">
</div>
<div class="title">Figure 7. commands to connect this remote repository</div>
</div>
<div class="paragraph">
<p>To link your local project type the following commands</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925256.6787">~@dollar@ git checkout main
~@dollar@ git remote add origin https://github.com/Dev-Mind/git-demo.git  (1)
~@dollar@ git push -u origin main                                       (2)</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925256.6787')">Copy</button></pre>
</div>
</div>
<div class="olist arabic">
<ol class="arabic">
<li>
<p>Git adds remote origin to your local project</p>
</li>
<li>
<p>The push command allows to send what you have on the current branch (local main branch) on the server</p>
</li>
</ol>
</div>
<div class="quoteblock">
<blockquote>
<div class="paragraph">
<p>If you have a problem to use your login and password in the command line, you can follow this <a href="https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token">documentation</a> to generate an access token.
When you have a token you can use it as password</p>
</div>
</blockquote>
</div>
<div class="paragraph">
<p>Github allows teams to synchronize throughout the life of a project.
You can push any branch.</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925256.0664">~@dollar@ git checkout feat/new_hair
~@dollar@ git push -u origin feat/new_hair</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925256.0664')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>These commands</p>
</div>
<div class="ulist">
<ul>
<li>
<p>activate the <code>feat/new_hair</code> branch and</p>
</li>
<li>
<p>push the changes on Github.</p>
</li>
</ul>
</div>
<div class="paragraph">
<p>If you want to retrieve local changes made by your colleagues do</p>
</div>
<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-shell" id="1731527925257.2595">~@dollar@ git pull</code><button class="btn-copy-code" onclick="copyToClipboard('1731527925257.2595')">Copy</button></pre>
</div>
</div>
<div class="paragraph">
<p>The <code>git fetch</code> command retrieves the history of all branches locally.</p>
</div>
</div>
<div class="sect2">
<h3 id="_git_project_workflow">Git Project Workflow</h3>
<div class="paragraph">
<p>When we are working in team, the workflow will be</p>
</div>
<div class="paragraph">
<p><strong>Create a branch</strong><br>
We usually create a branch from main (or another branch).
Some companies have, for example, a branch dev for the current developments, a branch <code>prod</code> that corresponding to what is in production.
Branches created on these canonical branches must have a short life duration.</p>
</div>
<div class="paragraph">
<p><strong>Add commits</strong><br>
Every small changes should be made as often as possible.
Each commit, within a branch creates restoration points in the project history.</p>
</div>
<div class="paragraph">
<p><strong>Open a pull request</strong><br>
When you pushed your changes on Github, you can open a pull request.
This allows to discuss about the current development (for example with the people who will test)</p>
</div>
<div class="paragraph">
<p><strong>Code Review</strong><br>
In a mature development team, your code is always read by another developers.
Your code is often also tested by other people.
Anyone can make returns on the Pull request.
You can make changes on the branch and pushed other commits to fix the review remarks.</p>
</div>
<div class="paragraph">
<p><strong>Merge</strong>
+When everything is OK you can click the <code>Merge</code> button on the pull request.GitHub automatically performs the equivalent of a local 'git merge' operation.</p>
</div>
<div class="paragraph">
<p><strong>Deploy</strong><br>
Teams can install your updates or continue development</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_conclusion">Conclusion</h2>
<div class="sectionbody">
<div class="paragraph">
<p>There&#8217;s still a lot of things to say about Git and Github. Some concepts can be complex like <code>rebase</code> or <code>conflict resolution</code>. IDEs will simplify some tasks.You can find more resources on the web <a href="http://try.github.io/" class="bare">http://try.github.io/</a></p>
</div>
<div class="paragraph">
<p>This course is there to give you the basics in order to be able to realize the TP using Git. You are now able to save your sources, to share them, to find them easily from one computer to another.</p>
</div>
<div class="paragraph">
<p>So enjoy with Git</p>
</div>
</div>
</div>`;