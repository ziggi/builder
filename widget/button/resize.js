$(function() {

	var BUTTON_WIDTH_MIN = 70;
	var BUTTON_HEIGHT_MIN = 30;

	$(document).on('resize', '.widget-button', function() {
		$(this).widgetResize('init');
	});

	$(document).on('mousedown', '.widget-button .resize-block', function(event) {
		var $widget = $(this).parent();
		if ($widget.data('editing')) {
			event.stopImmediatePropagation();
		}
		
		$(document).bind('mouseup.widget-button', function(event) {
			$(this).unbind('mousemove.widget-button');
			$(this).unbind('mouseup.widget-button');
		});
	});

	$(document).on('mousedown', '.widget-button .resize-block-n, .widget-button .resize-block-nw, .widget-button .resize-block-ne', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-button', function(event) {
			var new_height = $widget.position().top - event.pageY + $widget.height() + $widget.parents('.page_block').position().top;

			var max_height = $widget.position().top + $widget.height();

			if (new_height > max_height) {
				$widget.css({
					'top': event.pageY - $widget.parents('.page_block').position().top + (new_height - max_height),
					'height': max_height
				});
			} else {
				if (new_height > BUTTON_HEIGHT_MIN) {
					$widget.css({
						'top': event.pageY - $widget.parents('.page_block').position().top,
						'height': new_height
					});
				} else {
					$widget.css({
						'top': $widget.position().top + $widget.height() - BUTTON_HEIGHT_MIN,
						'height': BUTTON_HEIGHT_MIN
					});
				}
			}
		});
	});

	$(document).on('mousedown', '.widget-button .resize-block-e, .widget-button .resize-block-se, .widget-button .resize-block-ne', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-button', function(event) {
			var new_width = event.pageX - $widget.position().left - getPageLeftOffset($widget);

			if (new_width > BUTTON_WIDTH_MIN) {
				$widget.css('width', new_width);
			} else {
				$widget.css('width', BUTTON_WIDTH_MIN);
			}
		});
	});

	$(document).on('mousedown', '.widget-button .resize-block-s, .widget-button .resize-block-sw, .widget-button .resize-block-se', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-button', function(event) {
			var new_height = event.pageY - $widget.position().top - $widget.parents('.page_block').position().top;

			var max_height = $widget.parents('.page_block').height() - $widget.position().top;

			if (new_height > max_height) {
				$widget.css('height', max_height);
			} else {
				if (new_height > BUTTON_HEIGHT_MIN) {
					$widget.css('height', new_height);
				} else {
					$widget.css('height', BUTTON_HEIGHT_MIN);
				}
			}
		});
	});

	$(document).on('mousedown', '.widget-button .resize-block-w, .widget-button .resize-block-sw, .widget-button .resize-block-nw', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-button', function(event) {
			var new_width = $widget.position().left - event.pageX + $widget.width() + getPageLeftOffset($widget);

			if (new_width > BUTTON_WIDTH_MIN) {
				$widget.css({
					'left': event.pageX - getPageLeftOffset($widget),
					'width': new_width
				});
			} else {
				$widget.css({
					'left': $widget.position().left + $widget.width() - BUTTON_WIDTH_MIN,
					'width': BUTTON_WIDTH_MIN
				});
			}
		});
	});
});