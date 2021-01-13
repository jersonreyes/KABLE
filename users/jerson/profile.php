<?php $user_id="1"?><!DOCTYPE HTML>
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
	include('../../handler.php');
	$following = parseXML('../../following.xml');
	
	foreach($following as $users){
		foreach($users as $user){
			if($user['id'] == $user_id) {
				$title = $user["name"];
			}
		}
	}
						
?>
<html>
<head>
	<title><?php echo $title ?></title>
	<link rel="SHORTCUT ICON" href="../../images/KABLELogo.png"></link>
	<link rel="STYLESHEET" href="../../css/main.css"></link>
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
						<img src="../../images/KABLE.png" id="kable-logo-image" class="inline align-middle">
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
						<div class="content">
							<img src="../../images/feed.svg" class="sidebar-icons"></img>
							<span>New Feed</span>
						</div>
						<div class="content">
							<img src="../../images/trend.svg" class="sidebar-icons"></img>
							<span>Trending</span>
						</div>
						<div class="highlight content active">
							<img src="../../images/user.svg" class="sidebar-icons"></img>
							<span>Following</span>
						</div>
						<div class="content">
							<img src="../../images/video.svg" class="sidebar-icons"></img>
							<span>Your Videos</span>
							<img src="../../images/add.svg" class="sidebar-icons" id="add-video" title="Create Video"></img>
						</div>
						<div class="content">
							<img src="../../images/list.svg" class="sidebar-icons"></img>
							<span>Playlist</span>
						</div>
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
							<img src="../../'.$profile_picture_url.'" class="story-person-image"></img>
							<span>'.$name.'</span>
							');
							
								if($user['activestatus']) {
									echo ('<div class="circle-active inline-block active-status-online"></div>');
								}	else {
									echo ('<img src="../../images/wifi.svg" class="space-left active-status"></img>');
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
						<img src="../../images/browse.svg" class="topbar-icons align-middle"></img>
						<span class="align-middle" id="browse-text">Browse</span>
						<img src="../../images/down.svg" height="10px" class="align-middle button space-left" title="Click to toggle"></img>
					</div>
					<div class="inline" id="search">
						<img src="../../images/search.svg" class="topbar-icons align-middle"></img>
						<input id="search-bar" class="align-middle" placeholder="Search Everything"></input>
					</div>
					<div class="inline" id="main-feat">
						<div class="right">
							<div class="inline button">
								<img src="../../images/create.svg" class="topbar-icons align-middle" title="Create a new post"></img>
							</div>
							<div class="inline button top-icon">
								<img src="../../images/message.svg" class="topbar-icons align-middle" title="Messages"></img>
							</div>
							<div class="inline button top-icon" title="Notifications">
								<img src="../../images/bell.svg" class="topbar-icons align-middle"></img>
								<div id="notif-number">2</div>
							</div>
							<div class="inline button top-icon">
								<img src="../../images/person.svg" height="40px" class="align-middle" title="Account"></img>
							</div>
						</div>
					</div>
				</div>
				<!--
				BODY CONTENT
				-->
				<div id="body-content">
					<iframe src="http://youtube.com/embed/0jKe6lv_I1A?autoplay=1&controls=0&fs=1&iv_load_policy=3&rel=0&showsearch=0" width="100%" height="315" frameborder="0" allowfullscreen=""></iframe>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="../../js/jquery.min.js"></script>
<script src="../../js/main.js"></script>
</html>