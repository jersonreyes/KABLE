<?php

// KABLE NETWORK CODEBASE
// JERSON REYES

// CREATE NEW USER DIRECTORY
function newuser($newuser, $user_id) {
	
	$profile_base = "../php/profile.php";
	$copy_to = "../users/$newuser/profile.php";
	
	$path = pathinfo($copy_to);
	if (!file_exists($path['dirname']))
		mkdir($path['dirname'], 0777, true);
	
	copy($profile_base,$copy_to);
	$filename = $copy_to;
	$somecontent = "<?php \$user_id=\"$user_id\"?>";
	$file = file_get_contents($filename);
	file_put_contents($filename, $somecontent.$file);
	
}


// PARSE XML FILE
function parseXML($location) {
	
	$objXmlDocument = simplexml_load_file($location); 
	$objJsonDocument = json_encode($objXmlDocument);
	$following = json_decode($objJsonDocument, TRUE);
	return $following;
	
}

// PASS MESSAGE FILE TO BE STORED
if(isset($_POST['message'])) {

	$message = array();
	$message[0] = $_POST['message'];
	date_default_timezone_set('Asia/Manila');
	$message[1] = date('Y/m/d H:i:s');
	$message[2] = $_POST['id'];
	$message[3] = $_POST['message_id'];
	$message[4] = $_POST['sent_to'];
	
	storeMessage($message[0], $message[1], $message[2], $message[3], $message[4]); 
}

// CALCULATE TIME DIFFERENCE
function timeDifference($datefrom) {

	$time_old_split = explode(' ', $datefrom);
	$time_old = explode(':', $time_old_split[1]);
	$date_old = explode('/', $time_old_split[0]);
	$hour_old = $time_old[0];
	$min_old = $time_old[1];
	$sec_old = $time_old[2];
	date_default_timezone_set('Asia/Manila');
	$time_now_split = explode(' ', date('Y/m/d H:i:s'));
	$time_now = explode(':', $time_now_split[1]);
	$date_now = explode('/', $time_now_split[0]);
	$hour_now = $time_now[0];
	$min_now = $time_now[1];
	$sec_now = $time_now[2];
		
	$years = $date_now[0]-$date_old[0];
	$months = ($date_now[1]-$date_old[1])+$years*12; 
	$days = ($date_now[2]-$date_old[2])+$years*356;
	$hours = ($time_now[0]-$time_old[0])+$days*24;
	$mins = ($time_now[1]-$time_old[1])+$hours*60;
	$secs = ($time_now[2]-$time_old[2])+$mins*60;

	if($hour_old >= 12) {
		$daytime = 'pm';
		$hour = $hour_old-12;
	}	else {
		$daytime = 'am';
		$hour = $hour_old;
	}
	
	if($secs > 32140800) {
	$agotime = $years . 'y Ago at '.$hour.':'.$min_old.$daytime;
	}	else if($secs > 2678400) {
	$agotime = $months . 'M Ago at '.$hour.':'.$min_old.$daytime;
	}	else if($secs >= 86400) {
	$agotime = $days . 'd Ago at '.$hour.':'.$min_old.$daytime;
	}	else if($secs > 43200) {
	$agotime = $hour.$daytime;
	}	else if($secs > 3600) {
	$agotime = $hours . 'h Ago';
	}	else if($secs > 60) {
	$agotime = $mins . 'm Ago';
	}	else if($secs >= 1) {
	$agotime = 'Now';
	}
	
	return $agotime;
	
}

// STORE PASSED MESSAGE
function storeMessage($msg, $time, $id, $message_id, $sent_to) {
	
	$chatfeed = simplexml_load_file("../data/feed.xml");
	$message_node = $chatfeed->addChild("message");
	$id_x = $message_node->addChild("senderid", $id);
	$read_x = $message_node->addChild("read_by", "");
	$message_id_x = $message_node->addChild("messageid", $message_id);
	$msg_x = $message_node->addChild("messagecontent", $msg);
	$time_x = $message_node->addChild("time", $time);
	$sent_to_x = $message_node->addChild("sent_to", $sent_to);

	$dom = new DOMDocument('1.0');
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput = true;
	$dom->loadXML($chatfeed->asXML());
	$dom->save('../data/feed.xml');
	
}

// SET READ ATTRIBUTE FOR MESSAGES READ BY MULTIPLE PEOPLE
// FOR AJAX POST
if(isset($_POST['message_id_read'])) {
	
	$message_id = $_POST['message_id_read'];
	$read_by = $_COOKIE['user'];
	setRead($message_id, $read_by);

}

// SET READ ATTRIBUTE FOR MESSAGES READ BY MULTIPLE PEOPLE
// FOR PHP ACCESS
function setRead($id_read, $read_by) {
	
	$chatfeed = simplexml_load_file("../data/feed.xml");
	$find_id = $chatfeed->xpath("message[messageid=$id_read]");
	
	foreach ($find_id as $id_result) {
		$id = $id_result->read_by;
		$read_ids = explode(',',$id);
		if($id_result->senderid == $read_by || $id_result->sent_to == $read_by) {
			if (in_array($read_by, $read_ids)) {
			  //echo "Available";
			} else {
				$id_result->read_by .= $read_by . ',';
				
				$dom = new DOMDocument('1.0');
				$dom->preserveWhiteSpace = false;
				$dom->formatOutput = true;
				$dom->loadXML($chatfeed->asXML());
				$dom->save('../data/feed.xml');
			}
		}
	}
	
}



?>