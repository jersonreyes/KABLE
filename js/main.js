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