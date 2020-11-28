$(function(){
	// By Cookie
	if ($.cookie('color') != null){
		var color_code = $.cookie('color');
		$('link[id="color_theme"]').attr('href', 'static/css/color/'+color_code+'.css');
	}
	// By click
	$('.s-color a').click(function(e){
		e.preventDefault();
		var color_code = $(this).attr('data-code');
		$('link[id="color_theme"]').attr('href', 'static/css/color/'+color_code+'.css');
		// might want to use this place to include a different color-foundation for color_codes which are, e.g., especially dark
		$.cookie('color', color_code);
	});
});