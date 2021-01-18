<!DOCTYPE HTML>
<!--         

	
	██╗  ██╗ █████╗ ██████╗ ██╗     ███████╗
	██║ ██╔╝██╔══██╗██╔══██╗██║     ██╔════╝
	█████╔╝ ███████║██████╔╝██║     █████╗  
	██╔═██╗ ██╔══██║██╔══██╗██║     ██╔══╝  
	██║  ██╗██║  ██║██████╔╝███████╗███████╗
	╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝

	DEVELOPED, DESIGNED, AND HOSTED BY JERSON REYES
	PROPERTY ARTWORK | COPYRIGHT © JERSON REYES 2020
	
	KBOL.GA | CREATIVE COMMONS NC LICENSE

-->
<?php
	include('php/handler.php');
	$following = parseXML('data/following.xml');
	
	newuser("jerson",1);
?>
<html>
<head>
	<title>KABLE® Network — Following</title>
	<link rel="SHORTCUT ICON" href="images/KABLELogo.png"></link>
	<link rel="STYLESHEET" href="css/main.css"></link>
	<link href="css/fontawesome/css/all.css" rel="stylesheet">
	<link rel="stylesheet" href="css/fontawesome/css/brand-colors.css">
	<meta property="og:url" content="https://www.kbol.ga/"/>
	<meta property="og:type" content="Social Network"/>
	<meta property="og:title" content="KABLE® Network | Let's Go Global"/>
	<meta property="og:description" content="Welcome to KABLE. Let's Go Global. Start reaching more people today. Sign-up and start sharing."/>
	<meta property="og:image" content="https://www.kbol.ga/images/KABLEBNR.jpg" />
	<meta charset="UTF-8"/>
</head>
<body>
	<div class="wrapper">
		<div class="container">
			<!--
			SIDEBAR (TODO: DAPAT MAG TOGGLE ON MOBILE OR SMALLER SCREENS)
			-->
			<div id="sidebar" class="inline-block">
				<div id="main-sidebar" class="border-right">
					<div id="logo" class="inline-block align-middle">
						<img src="images/KABLE.png" id="kable-logo-image" class="inline align-middle">
						<div class="inline" id="kable-logo" style="line-height:0;">
							<span class="align-middle logo-text">Kable</span><br/>
							<p id="kable-network">Network</p>
						</div>
					</div>
					<div id="hamburger" class="inline-block align-middle button active" title="Toggle Menu">
						<div></div><div></div>
					</div>
					<div class="spacer"></div>
					<div id="news-feed">
						<p class="small sidebar-section-title">New Feeds</p>
						<a href="feed/">
							<div class="content">
								<img src="images/feed.svg" class="sidebar-icons"></img>
								<span>New Feed</span>
							</div>
						</a>
						<a href="trending/">
							<div class="content">
								<img src="images/trend.svg" class="sidebar-icons"></img>
								<span>Trending</span>
							</div>
						</a>
						<a href="following/">
							<div class="highlight content active">
								<img src="images/user.svg" class="sidebar-icons"></img>
								<span>Following</span>
							</div>
						</a>
						<a href="my-videos/">
							<div class="content">
								<img src="images/video.svg" class="sidebar-icons"></img>
								<span>Your Videos</span>
								<img src="images/add.svg" class="sidebar-icons" id="add-video" title="Create Video"></img>
							</div>
						</a>
						<a href="playlist/">
							<div class="content">
								<img src="images/list.svg" class="sidebar-icons"></img>
								<span>Playlist</span>
							</div>
						</a>
					</div>
					<hr>
					<div id="following">
						<p class="small sidebar-section-title">Following</p>
						<?php
						foreach($following as $users){
						    foreach($users as $user){
								$name = $user['name'];
								$profile_picture_url = $user['pictureurl'];
								
								echo ('<div class="content">
							<img src="'.$profile_picture_url.'" class="story-person-image"></img>
							<span>'.$name.'</span>
							');
							
								if($user['activestatus']) {
									echo ('<div class="circle-active inline-block active-status-online"></div>');
								}	else {
									echo ('<img src="images/wifi.svg" class="space-left active-status"></img>');
								}
								echo ('
						</div>
						');
							}
						}
						?></div>
				</div>
			</div>
			<!--
			MAIN BODY (RIGHT SIDE)
			-->
			<div id="main-body" class="inline-block">
				<!--
				TOPBAR
				-->
				<div id="top-bar">
					<div class="inline" id="browse" title="Browse">
						<img src="images/browse.svg" class="topbar-icons align-middle"></img>
						<span class="align-middle" id="browse-text">Browse</span>
						<span class="dropdown space-left">
							<button id="dropdown-button" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								<img src="images/down.svg" height="10px" id="browse-toggle-btn" class="align-middle button space-left" title="Click to toggle"></img>
							</button>
							<label>
								<input type="checkbox">
								<ul>
									<li><a href="?browse=game">Game</a></li>
									<li><a href="?browse=entertainment">Entertainment</a></li>
									<li><a href="?browse=educational">Educational</a></li>
									<li class="divider"></li>
									<li><a href="?browse=creator">Creator</a></li>
								</ul>
							</label>
						</span>
					
					</div>
					<div class="inline" id="search">
						<img src="images/search.svg" class="topbar-icons align-middle"></img>
						<form method="GET" action="search/" class="inline">
							<input id="search-bar" class="align-middle" name="search-input" placeholder="Search Everything"></input>
						</form>
					</div>
					<div class="inline" id="main-feat">
						<div class="right">
							<div class="inline">
								<img src="images/create.svg" id="top-create-button" class="button topbar-icons align-middle" title="Create a new post"></img>
								<div class="create-wrapper">
									<a href="new/?video">
										<div class="create-container">
											<i class="fas fa-video-plus white"></i><span>New Video</span>
										</div>
									</a>
									<a href="new/?post">
										<div class="create-container">
											<i class="fas fa-edit white"></i><span>New Post</span>
										</div>
									</a>
								</div>
							</div>
							<div class="inline button top-icon">
								<a href="message/">
									<img src="images/message.svg" class="topbar-icons align-middle" title="Messages"></img>
								</a>
							</div>
							<div class="inline top-icon" title="Notifications">
								<img src="images/bell.svg" id="notif-button" class="button topbar-icons align-middle"></img>
								<div id="notif-number">2</div>
								<div class="notif-wrapper">
									<a href="#">
										<div class="notif-container">
											<i class="gray">23m</i><span>Jerson Reyes uploaded a video</span>
										</div>
									</a>
									<a href="#">
										<div class="notif-container">
											<i class="gray">23m</i><span>Jerson Reyes uploaded a video</span>
										</div>
									</a>
								</div>
							</div>
							<div class="inline button top-icon">
								<a href="users/<?php if(isset($_COOKIE['user'])) echo $_COOKIE['user'];?>">
									<img src="images/person.svg" height="40px" class="align-middle" title="Account"></img>
								</a>
							</div>
						</div>
					</div>
				</div>
				<!--
				BODY CONTENT
				-->
				<div id="body-content">
					<div id="followed-channels">
						<div>From Channels You Follow</div>
						<div class="inline-block" title="Add New Story">
							<div id="story-create"><div class="center" id="story-plus-wrapper"><div></div><div></div></span></div></div>
							<p>Add Yours</p>
						</div>
						<?php
						foreach($following as $users){
						    foreach($users as $user){
								$name = $user['name'];
								$story_time = $user['storytime'];
								$profile_picture_url = $user['pictureurl'];
								$status = NULL;
								if(!$user['activestatus']) {
									$status = "inactive";
								}
								
								
								echo ('<div class="inline-block align-top story-container">
							<div class="status '.$status.' relative right story-wrapper"></div>
							<div id="story-following">
								<img src="'.$profile_picture_url.'" class="sidebar-following-person align-middle"></img>
							</div>
							<p class="story-user-name">'.$name.'</p>
							<p class="story-user-time">'.$story_time.'</p>
						</div>
						');
							}
						}
						?>
					
					</div>
					<div id="content-name" class="inline-block">
						<div id="content-image" class="inline-block align-middle cod genre"></div>
						<div class="genre-wrapper inline-block align-middle">
							<p class="content-title">Call of Duty<sup>®</sup></p>
							<span class="content-genre">Shooting</span><br/>
							<span class="red-circle inline-block"></span>
							<p class="content-viewers inline-block">5.5K Viewers</p>
						</div>
					</div>
					<div id="content-name" class="inline-block">
						<div id="content-image" class="inline-block align-middle dota2 genre"></div>
						<div class="genre-wrapper inline-block align-middle">
							<p class="content-title">Dota 2</p>
							<span class="content-genre">eSport</span><br/>
							<span class="red-circle inline-block"></span>
							<p class="content-viewers inline-block">10.5K Viewers</p>
						</div>
					</div>
					<div id="content-name" class="inline-block">
						<div id="content-image" class="inline-block align-middle lol genre"></div>
						<div class="genre-wrapper inline-block align-middle">
							<p class="content-title">League of Legends<sup>®</sup></p>
							<span class="content-genre">Online Game</span><br/>
							<span class="red-circle inline-block"></span>
							<p class="content-viewers inline-block">4.1K Viewers</p>
						</div>
					</div>
					<div id="content-name" class="inline-block">
						<div id="content-image" class="inline-block align-middle fortnite genre"></div>
						<div class="genre-wrapper inline-block align-middle">
							<p class="content-title">Fortnite<sup>®</sup></p>
							<span class="content-genre">Shooting</span><br/>
							<span class="red-circle inline-block"></span>
							<p class="content-viewers inline-block">2.5K Viewers</p>
						</div>
					</div>
					<div id="today-videos">	
						<span class="content-title section-title">Today's Videos</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="js/jquery.min.js"></script>
<script src="js/main.js"></script>
</html>