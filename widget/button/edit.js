$(function() {

	$(document).on('inactive', function() {
		$('.admin-editor-toolbar').trigger('reset');
		$('.button-text').find('input').removeClass('widget-text-editing');
	});

	/*
		editor init
	 */
	
	$(document).on('edit', '.widget-button', function() {
		$('.admin-editor-wrapper').height(140);
		$('.admin-editor-toolbar').trigger('toggle', 'admin-editor-button');
		$('.button-text').find('input').addClass('widget-text-editing');

		$button = $('.widget.active .dynamic-button');
		$('.admin-editor-toolbar .button-text input').val( $button.text() );

		if ($button.hasClass('corners')) {
			$('#customize_form_buttons_style_corners').addClass('selected');
		}
		if ($button.hasClass('shadow')) {
			$('#customize_form_buttons_style_shadow').addClass('selected');
		}
		if ($button.hasClass('text-shadow')) {
			$('#customize_form_buttons_style_textshadow').addClass('selected');
		}

		$('.option_styles .item').removeClass('active');
		if ($button.hasClass('glossy')) {
			$('#customize_form_buttons_colors_glossy_glossy').parents('.item').addClass('active');
		} else {
			$('#customize_form_buttons_colors_glossy_plain').parents('.item').addClass('active');
		}

		$('.button-background-color .color-box').css('background-color', $button.css('background-color'));
		$('.button-text-color .color-box').css('background-color', $button.css('color'));
	});

	/*
		button text
	 */
	
	$(document).on('keyup', '.button-text input', function(event) {
		$widget = $('.widget.active');

		var button_text = $(this).val();
		$widget.find('.dynamic-button').text(button_text);

		var button_width = $widget.find('.dynamic-button').width();
		var widget_width = $widget.width();
		
		if (button_width > widget_width) {
			$widget.width(button_width);
		}
	});

	/*
		button background color
	 */

	$(document).on('click', '.button-background-color .color-box', function(e) {
		$button = $('.widget.active .dynamic-button');
		$color_box = $(this);

		var isCreated = $(this).spectrum('container').is('.sp-container');
		if (!isCreated) {
			$(this).spectrum({
				showButtons: false,
				showPalette: true,
				palette: [
					['rgb(26, 188, 156)', 'rgb(46, 204, 113)', 'rgb(52, 152, 219)', 'rgb(155, 89, 182)', 'rgb(52, 73, 94)'],
					['rgb(22, 160, 133)', 'rgb(39, 174, 96)', 'rgb(41, 128, 185)', 'rgb(142, 68, 173)', 'rgb(44, 62, 80)'],
					['rgb(241, 196, 15)', 'rgb(230, 126, 34)', 'rgb(231, 76, 60)', 'rgb(236, 240, 241)', 'rgb(149, 165, 166)'],
					['rgb(243, 156, 18)', 'rgb(211, 84, 0)', 'rgb(192, 57, 43)', 'rgb(189, 195, 199)', 'rgb(127, 140, 141)']
				],
				color: $button.css('background-color'),
				move: function(color) {
					$color_box.css('background-color', color.toHexString());
					$button.css('background-color', color.toHexString());

					if ($button.hasClass('glossy')) {
						$button.trigger('setGradient', [parseInt(color._r), parseInt(color._g), parseInt(color._b)]);
					}
				}
			});
		}
		
		$(this).spectrum('toggle');
		return false;
	});

	/*
		button text color
	 */
	
	$(document).on('click', '.button-text-color .color-box', function(e) {
		$button = $('.widget.active .dynamic-button');
		$color_box = $(this);

		var isCreated = $(this).spectrum('container').is('.sp-container');
		if (!isCreated) {
			$(this).spectrum({
				showButtons: false,
				color: $button.css('color'),
				showPalette: true,
				palette: [
					['rgb(26, 188, 156)', 'rgb(46, 204, 113)', 'rgb(52, 152, 219)', 'rgb(155, 89, 182)', 'rgb(52, 73, 94)'],
					['rgb(22, 160, 133)', 'rgb(39, 174, 96)', 'rgb(41, 128, 185)', 'rgb(142, 68, 173)', 'rgb(44, 62, 80)'],
					['rgb(241, 196, 15)', 'rgb(230, 126, 34)', 'rgb(231, 76, 60)', 'rgb(236, 240, 241)', 'rgb(149, 165, 166)'],
					['rgb(243, 156, 18)', 'rgb(211, 84, 0)', 'rgb(192, 57, 43)', 'rgb(189, 195, 199)', 'rgb(127, 140, 141)']
				],
				move: function(color) {
					$color_box.css('background-color', color.toHexString());
					$button.css('color', color.toHexString());
				}
			});
		}
		
		$(this).spectrum('toggle');
		return false;
	});

	/*
		button style
	 */

	$(document).on('click', '.option_styles .item', function() {
		var isActive = $(this).hasClass('active');

		if (!isActive) {
			$('.option_styles .item').removeClass('active');
			$(this).addClass('active');
		}
	});

	$(document).on('click', '#customize_form_buttons_colors_glossy_glossy', function(event) {
		$button = $('.widget.active .dynamic-button');
		$button.addClass('glossy');

		var rgb = $button.css('background-color').match(/\d+/g);
		$button.trigger('setGradient', [parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2])]);
	});

	$(document).on('click', '#customize_form_buttons_colors_glossy_plain', function(event) {
		$button = $('.widget.active .dynamic-button');
		$button.removeClass('glossy');

		$button.css('background-image', '');
	});

	/*
		button shadow
	 */
	
	$(document).on('click', '#customize_form_buttons_style_shadow', function() {
		$widget = $('.widget.active .dynamic-button');

		var isSelected = $(this).hasClass('selected');

		if (isSelected) {
			$widget.removeClass('shadow');
			$(this).removeClass('selected');
		} else {
			$widget.addClass('shadow');
			$(this).addClass('selected');
		}
	});

	/*
		button corners
	 */
	
	$(document).on('click', '#customize_form_buttons_style_corners', function() {
		$widget = $('.widget.active .dynamic-button');

		var isSelected = $(this).hasClass('selected');

		if (isSelected) {
			$widget.removeClass('corners');
			$(this).removeClass('selected');
		} else {
			$widget.addClass('corners');
			$(this).addClass('selected');
		}
	});

	/*
		button text shadow
	 */
	
	$(document).on('click', '#customize_form_buttons_style_textshadow', function() {
		$widget = $('.widget.active .dynamic-button');

		var isSelected = $(this).hasClass('selected');

		if (isSelected) {
			$widget.removeClass('text-shadow');
			$(this).removeClass('selected');
		} else {
			$widget.addClass('text-shadow');
			$(this).addClass('selected');
		}
	});

	$(document).on('setGradient', '.dynamic-button', function(event, red, green, blue) {
		var bg_from_str = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
		var bg_to_str = 'rgb(' + (red + 26) + ', ' + (green + 26) + ', ' + (blue + 26) + ')';

		$(this).css('background-image', 'linear-gradient(bottom, ' + bg_from_str + ', ' + bg_to_str + ')');
		$(this).css('background-image', '-moz-linear-gradient(bottom, ' + bg_from_str + ', ' + bg_to_str + ')');
		$(this).css('background-image', '-webkit-linear-gradient(bottom, ' + bg_from_str + ', ' + bg_to_str + ')');
	});

});