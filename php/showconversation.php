<?php

$users    = parseXML('../data/users.xml');
$messages = parseXML('../data/feed.xml');
$active   = '';
$sentto = '';

foreach ($users as $user) {
    foreach ($user as $person) {
        foreach ((array) $messages as $messagearr) {
            foreach ((array) $messagearr as $msg) {
                if (!empty($msg)) {
                    if ($_COOKIE['user'] == $msg['sent_to']) {
                        if (isset($_GET['id'])) {
                            $sentto = $_GET['id'];
                        }
                        $senton = explode(" ", $msg['time']);
                    }
                }
                if ($_COOKIE['user'] == $msg['senderid'] || $_COOKIE['user'] == $msg['sent_to']) {
                    if (!isset($_GET['id'])) {
                        $sentto = $msg['sent_to'];
                    }
                    $senton = explode(" ", $msg['time']);
                }
                
                
                if (($msg['senderid'] === $_COOKIE['user'] || $msg['sent_to'] === $_COOKIE['user']) && $person['id'] != $_COOKIE['user']) {
                    
                    if ($person['id'] == $msg['senderid'] || $person['id'] == $msg['sent_to']) {
                        
                        $name                = $person['first_name'] . ' ' . $person['last_name'];
                        $profile_picture_url = $person['picture'];
                        $time                = 0;
                        
                        foreach ((array) $messages as $messagearray) {
                            foreach ((array) $messagearray as $msgg) {
                                if ($msgg['senderid'] != "HEADER" && ($person['id'] == $msgg['senderid'] || $person['id'] == $msgg['sent_to'])) {
                                    $time = timeDifference($msgg['time']);
                                }
                            }
                        }
                        if (isset($_GET['id'])) {
                            if (($_GET['id'] == $msg['senderid'] || $_GET['id'] == $msg['sent_to']) && $_GET['id'] != $_COOKIE['user']) {
                                $active = "active";
                                
                            } else {
                                $active = '';
                            }
                        }
                        echo ('<a href="?id=' . $person["id"] . '" sender_side_id="' . $person["id"] . '" =class="side-chat-conversation"><div class="side-chat-block ' . $active . '">
						<div class="circle-border">
							<div style="background-image: url(' . $profile_picture_url . ');" class="side-chat-image"></div>
						</div>
						<div class="side-chat-user inline-block">
							<p class="side-chat-user-name">' . $name . '</p>
							<p class="side-chat-user-time">' . $time . '</p>
						</div>
						</div></a>');
                        $found = true;
                        continue 2;
                    }
                }
            }
        }
        
    }
    if (isset($_GET['id'])) {
        if ($_GET['id'] == '') {
            echo ('<div class="side-chat-user inline-block">
										<p id="no-conversation" class="side-chat-user-time">Start following people now</p>
										</div>');
        }
    }
}

?>