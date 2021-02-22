/*        

	[KABLE]

	DEVELOPED, DESIGNED, AND HOSTED BY JERSON REYES
	PROPERTY ARTWORK | COPYRIGHT © JERSON REYES 2020
	
	KBOL.GA | CREATIVE COMMONS NC LICENSE

*/

console.log("%c Stop! Nothing to see here.","font-family:arial;font-size:25px;font-weight:bold;color:black;margin-top:20px;margin-bottom:00px;padding:5px;background-color:white;");
console.log("%c WELP, CHECK OUT MY PORTFOLIO:","font-family:arial;font-size:12px;font-weight:bold;margin-top:20px;margin-left:10px;");
console.log("%c HTTPS://JERSONREYES.CREVADO.COM ","font-family:arial ;font-size:12px;margin-bottom:5px;margin-left:10px;");
console.log("%cDeveloped, designed, and hosted by Jerson Reyes\nProperty Artwork | Copyright © Jerson Reyes 2020\nProject: KBOL.GA - IPT | CC NC LICENSE","margin-left:10px;line-height:0px;background-color:white;border:1px solid black;font-weight:;font-family:arial;font-size:10px;color:black;padding:10px;margin-top:5px");
console.log("%c Come on, close the console.","font-family:arial;font-size:15px;font-weight:bold;color:black;margin-top:20px;margin-bottom:40px;padding:5px;background-color:white;");

function closeSidebar() {
	$('#sidebar').addClass("toggled");
	$('#hamburger').addClass("toggled");
	$('#add-video').addClass("display-none");
	$('#hamburger').removeClass('active');
}

function showSidebar() {
	$('#sidebar').removeClass("toggled");
	$('#hamburger').removeClass("toggled");
	window.setTimeout(function() {
		$('#add-video').removeClass("display-none");
	}, 300);
	$('#hamburger').addClass('active');
}

window.onload = function() {
	checkPosition();
	$('#hamburger').click(function(){
		if($('#hamburger').hasClass('active')) {
			closeSidebar();
			Cookies.set('sidebar', '1');
		}	else {
			showSidebar();
			//Cookies.set('sidebar', '0');
		}
    });
	
	$(document).on('load', $(window).bind("resize", checkPosition));
	
	function checkPosition() {
		if($(window).width() < 767) {
			closeSidebar();
			$('#top-bar').addClass("mobile");
		}	else {
			showSidebar();
			$('#top-bar').removeClass("mobile");
		}
	}
}

$(document).ready(function() {
	$('#dropdownList li').find("a").click(function(){
	  
	  $('#dropdown-button').html($(this).html()).append("    <span class='caret'></span>");
	});
  });


$.ajax({
    url: "../data/userfeed.xml",
    success: function() {
        $.get('../data/userfeed.xml', null, function(posts, textStatus) {
            $(posts).find('post').each(function(userindex) {
                $thumbnail = $(posts).find('thumbnail').eq(userindex).text();
				
				$videourl = $(posts).find('video').eq(userindex).text();
				$ago = $(posts).find('ago').eq(userindex).text();
				$channel = $(posts).find('channel').eq(userindex).text();
				$type = $(posts).find('type').eq(userindex).text();

				$id = $(posts).find('id').eq(userindex).text();
                if ($type == "text") {
						$postcontent = $(posts).find('postcontent').eq(userindex).text();
						$(`
						<div class="post">
							<div class="post-contents">
								<p>${$postcontent}</p>
							</div>
							<div class="video-details" style="margin-top:-30px;" id="comment-${$id}">
								<img src="../images/default.svg" height="15px" class="align-middle" id="video-type-title-image">
								<div id="video-type-title" class="inline-block">${$channel}</div>
								<div id="video-type-title" class="ago-time">${$ago}</div>
								<div id="react"  class="inline-block" style="width:50%;transform:translateX(250px)">
									<div>
										<img src="../images/like.svg" height="18px" class="inline">
										<span>Like</span>
									</div>
									<div>
										<img src="../images/share.svg" height="18px" class="inline">
										<span>Share</span>
									</div>
								</div>
								<br/>		
								<div id="comment-title"><b>Comments</b></div>
								<input placeholder="Add a comment" id="add-comment"></input>
								<input type="submit" value="Done" id="done"/>
						`).appendTo('#feed-video-container');

						
						$(posts).find('comment').each(function(commentindex) {
							if($id == $(this).parent().parent().find('id').text()){
								$content = $(posts).find('commentcontent').eq(commentindex).text();
								$commenter = $(posts).find('author').eq(commentindex).text();
								$(`
									<div class="main-chat-block">
										<div class="inline-block main-chat-picture">
											<div style="background-image: url('../images/person.svg');" class="side-chat-image"></div>
										</div>
										<div class="main-chat-user inline-block">
											<div class="inline">
												<span class="main-chat-user-name">${$commenter}</span>
												<span class="main-chat-user-time">${$ago}</span><br/>
											</div>
											<div class="chat-content inline-block">
												<div id="chat-message">${$content}</div>
											</div>
										</div>
									</div>
								`).appendTo("#comment-"+$id);
							}
						})
                }	else if($type == "video") {

					$(`
					<div class="post">
						<div class="container">
							<div class="container" id="video" >
								<video controls crossorigin playsinline poster="${$thumbnail}">
									<source src="${$videourl}" type="video/mp4" size="720">
								</video>
							</div>
						</div>
						<div class="video-details" style="margin-top:-20px;" id="comment-${$id}">
							<img src="../images/default.svg" height="15px" class="align-middle" id="video-type-title-image">
							<div id="video-type-title" class="inline-block">${$channel}</div>
							<div id="video-type-title" class="ago-time">${$ago}</div>
							<div id="react"  class="inline-block" style="width:50%;transform:translateX(180px)">
								<div>
									<img src="../images/like.svg" height="18px" class="inline">
									<span>Like</span>
								</div>
								<div>
									<img src="../images/share.svg" height="18px" class="inline">
									<span>Share</span>
								</div>
								<div>
									<img src="../images/add.svg" height="18px" class="inline">
									<span>Add to Playlist</span>
								</div>
							</div>
							<br/>	
							<div id="comment-title"><b>Comments</b></div>
							<input placeholder="Add a comment" id="add-comment"></input>
							<input type="submit" value="Done" id="done"/>`).appendTo('#feed-video-container');

					$(posts).find('comment').each(function(commentindex) {
						if($id == $(this).parent().parent().find('id').text()){
							$content = $(posts).find('commentcontent').eq(commentindex).text();
							$commenter = $(posts).find('author').eq(commentindex).text();
							$(`
								<div class="main-chat-block">
									<div class="inline-block main-chat-picture">
										<div style="background-image: url('../images/person.svg');" class="side-chat-image"></div>
									</div>
									<div class="main-chat-user inline-block">
										<div class="inline">
											<span class="main-chat-user-name">${$commenter}</span>
											<span class="main-chat-user-time">${$ago}</span><br/>
										</div>
										<div class="chat-content inline-block">
											<div id="chat-message">${$content}</div>
										</div>
									</div>
								</div>
							`).appendTo("#comment-"+$id);
						}
					})
					const player = new Plyr('video', {captions: {active: true}});
				}
				$(`</div>
				</div><br/><br/><br/><br/>`).appendTo("#post");
            })
        })
	}
})

$.ajax({
    url: "../data/following.xml",
    success: function() {
        $.get('../data/following.xml', null, function(user, textStatus) {
            $(user).find('user').each(function(userindex) {
				$name = $(user).find('name').eq(userindex).text();
				$picture = $(user).find('pictureurl').eq(userindex).text();
				$active = $(user).find('activestatus').eq(userindex).text();
				$active_output = '';
				if($active == 0) {
					$active_output = '<div class="circle-active inline-block active-status-online"></div>';
				}	else {
					$active_output = '<img src="../images/wifi.svg" class="space-left active-status"></img>';
				}
				$(`
						<div class="content">
							<img src="../${$picture}" class="story-person-image"></img>
							<span>${$name}</span>${$active_output}
						</div>
				`).appendTo('#following');
			})
		})
	}
})

//STORY
$.ajax({
    url: "../data/following.xml",
    success: function() {
        $.get('../data/following.xml', null, function(user, textStatus) {
            $(user).find('user').each(function(userindex) {
				$name = $(user).find('name').eq(userindex).text();
				$picture = $(user).find('pictureurl').eq(userindex).text();
				$active = $(user).find('activestatus').eq(userindex).text();
				$status = '';
				$storytime = $(user).find('ago').eq(userindex).text();
				if($active == 1) {
					$status = '<div class="status relative right story-wrapper"></div>';
				}
				$(`
				<div class="inline-block align-top story-container">
				${$status}
				<div id="story-following">
					<img src="../${$picture}" class="sidebar-following-person align-middle"></img>
				</div>
				<p class="story-user-name">${$name}</p>
				<p class="story-user-time">${$storytime}</p>
			</div>
				`).appendTo('#followed-channels');
			})
		})
	}
})

//VIDEOS
$.ajax({
    url: "../data/vidfeed.xml",
    success: function() {
        $.get('../data/vidfeed.xml', null, function(user, textStatus) {
            $(user).find('video').each(function(userindex) {
				$title = $(user).find('title').eq(userindex).text();
				$channel_picture = $(user).find('channel_picture').eq(userindex).text();
				$channel = $(user).find('channel_name').eq(userindex).text();
				$thumbnail = $(user).find('thumbnail').eq(userindex).text();
				$ago = $(user).find('ago').eq(userindex).text();
				$views = $(user).find('views').eq(userindex).text();
				$(`
				<div class="video-container">
					<div class="video-picture" style="background-image:url('${$thumbnail}')"></div>
					<div class="video-info">
						<p class="video-title">${$title}</p>
						<img src="${$channel_picture}" class="video-creator-picture"/>
						<span class="video-creator-name">${$channel}</span>
						<div class="divider"></div>
						<span class="ago-time">${$ago}</span>
						<span class="video-views">${$views}</span>
					</div>
				</div>
				`).appendTo('#today-videos');
			})
		})
	}
})

//DYNAMIC LOAD FUNCTION
function loadvid($amount, $appendto) {
$runs = 0;
$.ajax({
    url: "../data/vidfeed.xml",
    success: function() {
        $.get('../data/vidfeed.xml', null, function(user, textStatus) {
            $(user).find('video').each(function(userindex) {
				if($runs >= $amount) return false;
				$title = $(user).find('title').eq(userindex).text();
				$channel_picture = $(user).find('channel_picture').eq(userindex).text();
				$channel = $(user).find('channel_name').eq(userindex).text();
				$thumbnail = $(user).find('thumbnail').eq(userindex).text();
				$ago = $(user).find('ago').eq(userindex).text();
				$views = $(user).find('views').eq(userindex).text();
				
				$(`
				<div class="video-container">
					<div class="video-picture" style="background-image:url('${$thumbnail}')"></div>
					<div class="video-info">
						<p class="video-title">${$title}</p>
						<img src="${$channel_picture}" class="video-creator-picture"/>
						<span class="video-creator-name">${$channel}</span>
						<div class="divider"></div>
						<span class="ago-time">${$ago}</span>
						<span class="video-views">${$views}</span>
					</div>
				</div>
				`).appendTo($appendto);
				$runs++;
			})
		})
	}
})
}

loadvid(2,"#video-side");

loadvid(8,"#playlist-container");