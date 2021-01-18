<?php

	$users = parseXML('../data/users.xml');
	$messages = parseXML('../data/feed.xml');
	$clear = '';
	foreach ((array)$messages as $messagearr) {
		foreach ((array)$messagearr as $messageblock) {
			$sentto = '';
			foreach ($users as $user) {
				foreach ($user as $usr) {
					$senderid = $messageblock['senderid'];
					if (($messageblock['senderid'] == $_GET['id'] || $messageblock['sent_to'] == $_GET['id'] && $_GET['id'] != $_COOKIE['user']) && $usr['id'] == $messageblock['senderid']) {
						if($_COOKIE['user'] == $messageblock['senderid'] || $_COOKIE['user'] == $messageblock['sent_to']) {
							if ($_COOKIE['user'] == $senderid) {
								$own = "own";
								$clear = '<div class="clear"></div>';
							}	else $own = '';
							
							if ($messageblock['senderid'] != "HEADER") {
								$agotime = timeDifference($messageblock['time']);
								$picture = $usr['picture'];
								$name = $usr['first_name'] . ' ' . $usr['last_name'];
								
								$message = $messageblock['messagecontent'];
								setRead($messageblock['messageid'], $_COOKIE['user']);
								
								echo ('<div class="main-chat-block ' . $own . '">
									<div class="inline-block main-chat-picture">
										<div style="background-image: url(' . $picture . ');" class="side-chat-image"></div>
									</div>
									<div class="main-chat-user inline-block">
										<div class="inline">
											<span class="main-chat-user-name">' . $name . '</span>
											<span class="main-chat-user-time">' . $agotime . '</span><br/>
										</div>
										<div class="chat-content inline-block">
											<div id="chat-message">' . $message . '</div>
										</div>
									</div>
										</div>
								' . $clear . '');
								//return false;
								//continue;
							}
						}
					}
					$found = true;
				}
			}
		}
	}
?>