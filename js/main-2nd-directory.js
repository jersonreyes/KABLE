/*        

	[KABLE]
	
	DEVELOPED AND DESIGNED BY TEAM KABLE
	PROPERTY ARTWORK | COPYRIGHT © TEAM KABLE 2021
	
	REYES, JERSON A.
    SANTOS, JOHN MIKO R.
    MORADA, JOHN MARK D.
    CALOOY, LOUISE I.
    BSIT 2i-G1

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
    url: "../../data/userfeed.xml",
    success: function() {
        $.get('../../data/userfeed.xml', null, function(posts, textStatus) {
            $(posts).find('post').each(function(userindex) {
                $thumnail = $(posts).find('thumbnail').eq(userindex).text();
				
				$videourl = $(posts).find('video').eq(userindex).text();
				$ago = $(posts).find('ago').eq(userindex).text();
				$channel = $(posts).find('channel').eq(userindex).text();
				$type = $(posts).find('type').eq(userindex).text();
				$content = "";
				$id = $(posts).find('id').eq(userindex).text();
                if ($type == "text") {
					
						$(`
						<div class="post">
							<div class="post-contents">
								<p>Sapagkat mahalaga, kung ang tao ay di-pipiliting manghawakan bilang ... at edukasyon na maitaguyod ang paggalang sa mga karapatan at kalayaang ito at sa ... Ang bawat tao'y may karapatan sa buhay, kalayaan at kapanatagan ng sarili.</p>
							</div>
							<div class="video-details" style="margin-top:-30px;" id="comment-${$id}">
								<img src="../../images/default.svg" height="15px" class="align-middle" id="video-type-title-image">
								<div id="video-type-title" class="inline-block">John Mark Morada</div>
								<div id="video-type-title" class="ago-time">2h ago</div>
								<div id="react"  class="inline-block" style="width:50%;transform:translateX(250px)">
									<div>
										<img src="../../images/like.svg" height="18px" class="inline">
										<span>Like</span>
									</div>
									<div>
										<img src="../../images/share.svg" height="18px" class="inline">
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
											<div style="background-image: url('../../images/person.svg');" class="side-chat-image"></div>
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
								<video controls crossorigin playsinline poster="../../videos/tb.jpg">
									<source src="../../videos/video.mp4" type="video/mp4" size="720">
								</video>
							</div>
						</div>
						<div class="video-details" style="margin-top:-20px;" id="comment-${$id}">
							<img src="../../images/default.svg" height="15px" class="align-middle" id="video-type-title-image">
							<div id="video-type-title" class="inline-block">Tulflix</div>
							<div id="video-type-title" class="ago-time">4h ago</div>
							<div id="react"  class="inline-block" style="width:50%;transform:translateX(180px)">
								<div>
									<img src="../../images/like.svg" height="18px" class="inline">
									<span>Like</span>
								</div>
								<div>
									<img src="../../images/share.svg" height="18px" class="inline">
									<span>Share</span>
								</div>
								<div>
									<img src="../../images/add.svg" height="18px" class="inline">
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
										<div style="background-image: url('../../images/person.svg');" class="side-chat-image"></div>
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
    url: "../../data/following.xml",
    success: function() {
        $.get('../../data/following.xml', null, function(user, textStatus) {
            $(user).find('user').each(function(userindex) {
				$name = $(user).find('name').eq(userindex).text();
				$picture = $(user).find('pictureurl').eq(userindex).text();
				$active = $(user).find('activestatus').eq(userindex).text();
				$active_output = '';
				if($active == 0) {
					$active_output = '<div class="circle-active inline-block active-status-online"></div>';
				}	else {
					$active_output = '<img src="../../images/wifi.svg" class="space-left active-status"></img>';
				}
				$(`
						<div class="content">
							<img src="../../${$picture}" class="story-person-image"></img>
							<span>${$name}</span>${$active_output}
						</div>
				`).appendTo('#following');
			})
		})
	}
})


//USER POSTS
$.ajax({
    url: "../../data/posts.xml",
    success: function() {
        $.get('../../data/posts.xml', null, function(user, textStatus) {
            $(user).find('post').each(function(userindex) {
				$title = $(user).find('title').eq(userindex).text();
				$thumbnail = $(user).find('thumbnail').eq(userindex).text();
				
				$(`
				<div id="profile-content" class="inline-block">
                            <div class="post-picture" style="background-image: url('${$thumbnail}')">
                                <p class="center">${$title}<p>
                            </div> 
                        </div>
				`).appendTo('#user-posts-container');
			})
		})
	}
})