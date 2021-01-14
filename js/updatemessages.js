if ($("#no-conversation").length)
    $('#send-control, .main-chat-user-settings, .main-chat-user-profile').addClass('display-none');

$("#chat-area").scrollTop($("#chat-area")[0].scrollHeight);

var id = $.cookie("user");

function SubmitFormData() {
    var message = $("#message-input").val();
    var conversing = $("#conversing").val();
    $message_id = Math.floor((Math.random() * 100000) + 1);
    $.post("?", {
        message: message,
        id: id,
        message_id: $message_id,
        sent_to: conversing
    }, function(data) {
        $('#chat')[0].reset();
    });

    $.post("?", {
        message_id_read: $message_id
    }, function(data) {});

    $fetch = fetchUser(id);
    showMessage($fetch[0], $fetch[1], "Now", message, "#chat-area", "own");
    $("#chat-area").stop().animate({
        scrollTop: $("#chat-area")[0].scrollHeight
    }, 1000);

}

function showMessage($picture, $name, $ago, $message, $location, $own) {
    $(`
	<div class="main-chat-block ${$own}" style="opacity:0">
		<div class="inline-block main-chat-picture">
			<div style="background-image: url('${$picture}');" class="side-chat-image"></div>
		</div>
		<div class="main-chat-user inline-block">
			<div class="inline">
				<span class="main-chat-user-name">${$name}</span>
				<span class="main-chat-user-time">${$ago}</span><br/>
			</div>
			<div class="chat-content inline-block">
				<div id="chat-message">${$message}</div>
			</div>
		</div>
	</div>
	<div class="clear"></div>
	`).appendTo($($location)).animate({
        opacity: 1
    });
}


function fetchUser($id) {
    var response = null;
    $.ajax({
        url: '../users.xml',
        type: 'get',
        dataType: 'xml',
        async: false,
        success: function(user) {
            $(user).find('user').each(function(userindex) {
                $iduser = $(user).find('id').eq(userindex).text();
                if ($id == $iduser) {
                    $picture = $(user).find('picture').eq(userindex).text();
                    $name = $(user).find('first_name').eq(userindex).text() + " " + $(user).find('last_name').eq(userindex).text();
                    response = new Array($picture, $name);
                }
            });
        }
    });
    return response;
}

function updateChat() {

    $.ajax({
        url: "../data/feed.xml",
        ifModified: true,
        success: function() {
            $.get('../data/feed.xml', null, function(data, textStatus) {
                $match = false;
                $(data).find('message').each(function(index) {
                    if ($(data).find('senderid').eq(index).text() != 'HEADER') {
                        $message_id = $(data).find('messageid').eq(index).text();
                        $message = $(data).find('messagecontent').eq(index).text();
                        $readby = $(data).find('read_by').eq(index).text();
                        $sentto = $(data).find('sent_to').eq(index).text();
                        $id = $(data).find('senderid').eq(index).text();

                        var searchParams = new URLSearchParams(window.location.search);
                        var messagesenderid = searchParams.get('id');

                        var search = id;
                        var arr = $readby.split(",");
                        if (arr.indexOf(search) !== -1) {
                            $match = true;
                        } else {
                            $match = false;
                        }
                        if ($match == false && ($sentto == id)) {
                            var name = null;
                            var picture = null;
                            $fetch = fetchUser(messagesenderid);
                            $picture = $fetch[0];
                            $name = $fetch[1];
                            $clear = '';

                            showMessage($fetch[0], $fetch[1], "Now", $message, "div[senderid='" + messagesenderid + "']", "");
							$('a[sender_side_id="'+messagesenderid+'"] .side-chat-user-time').html('Now');
                            $("#chat-area").stop().animate({
                                scrollTop: $("#chat-area")[0].scrollHeight
                            }, 1000);
                            $.post("?", {
                                message_id_read: $message_id
                            }, function(data) {});
                            $match = true;
							return false;
                        }
                    }
                });
            }, 'xml');
        }
    });
    setTimeout(function() {
        updateChat()
    }, 500);
}

updateChat();