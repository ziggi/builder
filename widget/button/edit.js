$(function() {

	$(document).on('inactive', function() {
		$('.admin-editor-toolbar').trigger('reset');
	});

	$(document).on('edit', '.widget-button', function() {
		$('.admin-editor-wrapper').height(140);
		$('.admin-editor-toolbar').trigger('toggle', 'admin-editor-button');

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
		if ($button.hasClass('glossy')) {
			$('#customize_form_buttons_colors_glossy_glossy').parents('.item').addClass('active');
		} else {
			$('#customize_form_buttons_colors_glossy_plain').parents('.item').addClass('active');
		}
		$('.button-background-color .color-box').css('background-color', $button.css('background-color'));
		$('.button-text-color .color-box').css('background-color', $button.css('color'));
	});

	$(document).on('click', '#customize_form_buttons_colors_glossy_glossy', function(event) {
		$button = $('.widget.active .dynamic-button');
		$button.addClass('glossy');

		var rgb = $button.css('background-color').match(/\d+/g);
		$button.trigger('linear-gradient', [parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2])]);
	});

	$(document).on('click', '.button-background-color .color-box', function(e) {
		$button = $('.widget.active .dynamic-button');
		$color_box = $(this);

		var isCreated = $(this).spectrum('container').is('.sp-container');
		if (!isCreated) {
			$(this).spectrum({
				showButtons: false,
				color: $button.css('background-color'),
				move: function(color) {
					$color_box.css('background-color', color.toHexString());
					$button.css('background-color', color.toHexString());

					if ($button.hasClass('glossy')) {
						$button.trigger('linear-gradient', [parseInt(color._r), parseInt(color._g), parseInt(color._b)]);
					}
				}
			});
		}
		
		$(this).spectrum('toggle');
		return false;
	});

	$(document).on('click', '.button-text-color .color-box', function(e) {
		$button = $('.widget.active .dynamic-button');
		$color_box = $(this);

		var isCreated = $(this).spectrum('container').is('.sp-container');
		if (!isCreated) {
			$(this).spectrum({
				showButtons: false,
				color: $button.css('color'),
				move: function(color) {
					$color_box.css('color', color.toHexString());
					$button.css('color', color.toHexString());
				}
			});
		}
		
		$(this).spectrum('toggle');
		return false;
	});

	$(document).on('click', '#customize_form_buttons_colors_glossy_plain', function(event) {
		$('.widget.active .dynamic-button').removeClass('glossy');
		$button.css('background-image', '');
	});

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

	$(document).on('click', '.option_styles .item', function() {
		var isActive = $(this).hasClass('active');

		if (!isActive) {
			$('.option_styles .item').removeClass('active');
			$(this).addClass('active');
		}
	});

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

	$(document).on('linear-gradient', '.dynamic-button', function(event, red, green, blue) {
		var bg_from_str = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
		var bg_to_str = 'rgb(' + (red + 26) + ', ' + (green + 26) + ', ' + (blue + 26) + ')';

		$(this).css('background-image', 'linear-gradient(bottom, ' + bg_from_str + ', ' + bg_to_str + ')');
		$(this).css('background-image', '-moz-linear-gradient(bottom, ' + bg_from_str + ', ' + bg_to_str + ')');
		$(this).css('background-image', '-webkit-linear-gradient(bottom, ' + bg_from_str + ', ' + bg_to_str + ')');
	});

});