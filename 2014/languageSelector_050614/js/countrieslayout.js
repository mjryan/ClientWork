$(function(){
	$('.menu-countries').columnize({
		width:350,
		doneFunc: function(){
			$('.menu-countries').css("visibility","visible")
		}
	});           
});