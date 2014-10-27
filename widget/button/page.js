$(function() {

	$(document).on('ready', function() {
		$('.dynamic-button.glossy').each(function(index, value) {
			var colorObj = hexToRgb( $(this).attr('data-default-color') );
			$(this).trigger('setGradient', [colorObj.r, colorObj.g, colorObj.b]);
		});
	});

	$(document).on('mouseenter', '.widget-button', function() {
		var $button = $(this).find('.dynamic-button');
		var color = $button.attr('data-hover-color');

		if ($button.hasClass('glossy')) {
			var colorObj = hexToRgb(color);
			$button.trigger('setGradient', [colorObj.r, colorObj.g, colorObj.b]);
		} else {
			$button.css('background-color', color);
		}
	});

	$(document).on('mouseleave', '.widget-button', function() {
		var $button = $(this).find('.dynamic-button');

		if ($button.hasClass('glossy')) {
			var colorObj = hexToRgb( $button.attr('data-default-color') );
			$button.trigger('setGradient', [colorObj.r, colorObj.g, colorObj.b]);
		} else {
			$button.css('background-color', $button.attr('data-default-color'));
		}
	});
	
	$(document).on('setGradient', '.dynamic-button', function(event, red, green, blue) {
		var bg_from_str = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
		var bg_to_str = 'rgb(' + (red + 26) + ', ' + (green + 26) + ', ' + (blue + 26) + ')';

		$(this).css('background-image', 'linear-gradient(bottom, ' + bg_from_str + ', ' + bg_to_str + ')');
		$(this).css('background-image', '-moz-linear-gradient(bottom, ' + bg_from_str + ', ' + bg_to_str + ')');
		$(this).css('background-image', '-webkit-linear-gradient(bottom, ' + bg_from_str + ', ' + bg_to_str + ')');
	});

	function hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}
});
