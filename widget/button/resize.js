$(function() {

	var BUTTON_WIDTH_MIN = 70;
	var BUTTON_HEIGHT_MIN = 30;

	$(document).on('active', '.widget-button', function() {
		$(this).widgetResize('init');
	});
	
	$(document).on('mouseup', function(event) {
		$(this).unbind('mousemove.widget-button');
	});

	$(document).on('mousedown', '.widget-button .resize-block-n, .widget-button .resize-block-nw, .widget-button .resize-block-ne', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-button', function(event) {
			var new_top;
			var new_height = $widget.position().top - event.pageY + $widget.height() + $widget.parents('.page_block').position().top;

			var max_height = $widget.position().top + $widget.height();

			if (new_height > max_height) {
				new_top = event.pageY - $widget.parents('.page_block').position().top + (new_height - max_height);
				new_height = max_height;
			} else {
				if (new_height > BUTTON_HEIGHT_MIN) {
					new_top = event.pageY - $widget.parents('.page_block').position().top;
				} else {
					new_top = $widget.position().top + $widget.height() - BUTTON_HEIGHT_MIN;
					new_height = BUTTON_HEIGHT_MIN;
				}
			}

			$widget.css({
				top: new_top
			});

			$widget.find('.dynamic-button').css({
				top: new_top,
				height: new_height,
			});
		});
	});

	$(document).on('mousedown', '.widget-button .resize-block-e, .widget-button .resize-block-se, .widget-button .resize-block-ne', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-button', function(event) {
			var new_width = event.pageX - $widget.position().left - getPageLeftOffset($widget);

			if (new_width <= BUTTON_WIDTH_MIN) {
				new_width = BUTTON_WIDTH_MIN;
			}

			$widget.find('.dynamic-button').css('width', new_width);
		});
	});

	$(document).on('mousedown', '.widget-button .resize-block-s, .widget-button .resize-block-sw, .widget-button .resize-block-se', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-button', function(event) {
			var new_height = event.pageY - $widget.position().top - $widget.parents('.page_block').position().top;

			var max_height = $widget.parents('.page_block').height() - $widget.position().top;

			if (new_height > max_height) {
				new_height = max_height;
			} else {
				if (new_height <= BUTTON_HEIGHT_MIN) {
					new_height = BUTTON_HEIGHT_MIN;
				}
			}

			$widget.find('.dynamic-button').css('height', new_height);
		});
	});

	$(document).on('mousedown', '.widget-button .resize-block-w, .widget-button .resize-block-sw, .widget-button .resize-block-nw', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-button', function(event) {
			var new_left;
			var new_width = $widget.position().left - event.pageX + $widget.width() + getPageLeftOffset($widget);

			if (new_width > BUTTON_WIDTH_MIN) {
				new_left = event.pageX - getPageLeftOffset($widget);
			} else {
				new_left = $widget.position().left + $widget.width() - BUTTON_WIDTH_MIN;
				new_width = BUTTON_WIDTH_MIN;
			}

			$widget.css({
				left: new_left
			});

			$widget.find('.dynamic-button').css({
				left: new_left,
				width: new_width
			});
		});
	});
});