export const _gameboard_score_multiplaform:string = `<div id="toc" class="toc">
<div id="toctitle">Table of Contents</div>
<ul class="sectlevel1">
<li><a class="link" fragment="#_manage_players">Manage players</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_add_player">Add player</a></li>
<li><a class="link" fragment="#_uniqueness_constraint">Uniqueness constraint</a></li>
<li><a class="link" fragment="#_remove_player">Remove player</a></li>
</ul>
</li>
<li><a class="link" fragment="#_starting_a_game_pre_recorded_games">Starting a Game: Pre-Recorded Games</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_available_games">Available Games</a></li>
<li><a class="link" fragment="#_what_if_my_game_is_not_in_the_list">What if my game is not in the list?</a></li>
</ul>
</li>
<li><a class="link" fragment="#_game_settings">Game Settings</a>
<ul class="sectlevel2">
<li><a class="link" fragment="#_game_name">Game name</a></li>
<li><a class="link" fragment="#_calculating_the_winner">Calculating the winner</a></li>
<li><a class="link" fragment="#_limit_the_score">Limit the score</a></li>
<li><a class="link" fragment="#_the_number_of_rounds">The number of rounds</a></li>
<li><a class="link" fragment="#_balance_the_points">Balance the points</a></li>
</ul>
</li>
</ul>
</div>
<div id="preamble">
<div class="sectionbody">
<div class="paragraph">
<p>I created this app to keep score when I play board games with family or friends. The app is available on Android and iOS (thanks to Kotlin). It&#8217;s designed to be simple and quick to use, while offering advanced features for gaming enthusiasts without spamming you with ads or sharing your data.</p>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_manage_players">Manage players</h2>
<div class="sectionbody">
<div class="paragraph">
<p>The application allows you to manage the participants of your games quickly and easily.</p>
</div>
<div class="sect2">
<h3 id="_add_player">Add player</h3>
<div class="paragraph">
<p>You can add as many players as you like to a game. Each player is identified by a unique name or nickname.</p>
</div>
</div>
<div class="sect2">
<h3 id="_uniqueness_constraint">Uniqueness constraint</h3>
<div class="paragraph">
<p>It is impossible to have two players with the same name. This is to avoid confusion and ensure correct scores.</p>
</div>
</div>
<div class="sect2">
<h3 id="_remove_player">Remove player</h3>
<div class="paragraph">
<p>If you delete a player, all their rounds are automatically removed from all games. If a game is left without any players after deletion, it will also be deleted.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_starting_a_game_pre_recorded_games">Starting a Game: Pre-Recorded Games</h2>
<div class="sectionbody">
<div class="paragraph">
<p>The app aims to save you time. By choosing a game from the list, you can start a game in seconds without having to configure numerous options.</p>
</div>
<div class="sect2">
<h3 id="_available_games">Available Games</h3>
<div class="paragraph">
<p>A variety of popular games are already included, such as Yams, Belote, Tarot, Uno, Seven Wonders, 6 qui prend, Skyjo, Mölkky and Barbu.</p>
</div>
</div>
<div class="sect2">
<h3 id="_what_if_my_game_is_not_in_the_list">What if my game is not in the list?</h3>
<div class="paragraph">
<p>You can use Custom Mode. This mode allows you to create a customized game, with several options adaptable to any board game.</p>
</div>
</div>
</div>
</div>
<div class="sect1">
<h2 id="_game_settings">Game Settings</h2>
<div class="sectionbody">
<div class="paragraph">
<p>For pre-recorded games, the game settings are predefined. However, you can always change them if necessary in custom mode.</p>
</div>
<div class="sect2">
<h3 id="_game_name">Game name</h3>
<div class="paragraph">
<p>After choosing a game, you can give it a name. This makes it easy to identify in the list of current games.
By default, the game name is the name of the selected game, but you can change it to your liking.</p>
</div>
</div>
<div class="sect2">
<h3 id="_calculating_the_winner">Calculating the winner</h3>
<div class="paragraph">
<p>In Custom Mode, you have the option to choose how victory is determined.</p>
</div>
<div class="ulist">
<ul>
<li>
<p>The player with the most points wins: This is the default mode and is suitable for most games, such as Belote, Tarot, or 6 qui prend.</p>
</li>
<li>
<p>The player with the fewest points wins: This mode is ideal for games where the objective is to have the lowest possible score.</p>
</li>
</ul>
</div>
</div>
<div class="sect2">
<h3 id="_limit_the_score">Limit the score</h3>
<div class="paragraph">
<p>In Custom Mode, you can set a score limit for the game. This is one of the ways to stop the game.</p>
</div>
<div class="paragraph">
<p>The game ends automatically as soon as a player reaches or exceeds the number of points you set. This is ideal for games like 6-a-side (66 points) or Skyjo (100 points), where a certain threshold ends the game.</p>
</div>
</div>
<div class="sect2">
<h3 id="_the_number_of_rounds">The number of rounds</h3>
<div class="paragraph">
<p>In Custom Mode, you can decide how many rounds to create at the start of the game. This allows you to have your score grid ready to use.</p>
</div>
</div>
<div class="sect2">
<h3 id="_balance_the_points">Balance the points</h3>
<div class="paragraph">
<p>This option, particularly useful for games like Tarot, ensures that points are distributed correctly. In these games, points won by some players are lost by others. The application checks in real time that the sum of the points in the round is equal to zero.</p>
</div>
</div>
</div>
</div>`;