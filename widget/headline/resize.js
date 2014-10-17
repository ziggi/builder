$(function() {

	var TEXT_WIDTH_MIN = 100;

	$(document).on('active', '.widget-headline', function() {
		$(this).widgetResize('init', 'side');
	});

	$(document).on('mousedown', '.widget-headline .resize-block', function(event) {
		var $obj = $(this).parent();
		if ($obj.data('editing')) {
			event.stopImmediatePropagation();
		}

		$(document).bind('mouseup.widget-headline', function(event) {
			$(this).unbind('mousemove.widget-headline');
			$(this).unbind('mouseup.widget-headline');
		});
	});


	$(document).on('mousedown', '.widget-headline .resize-block-e', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-headline', function(event) {
			var new_width = event.pageX - $widget.position().left - getPageLeftOffset($widget);

			var max_height = $widget.parents('.page_block').height() - $widget.position().top;

			if (new_width > TEXT_WIDTH_MIN) {
				var old_style = {
					'width': $widget.width()
				}

				$widget.css('width', new_width);

				if ($widget.height() > max_height) {
					$widget.css(old_style);
				}
			}
		});
	});

	$(document).on('mousedown', '.widget-headline .resize-block-w', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-headline', function(event) {
			var new_width = $widget.position().left - event.pageX + $widget.width() + getPageLeftOffset($widget);

			var max_height = $widget.parents('.page_block').height() - $widget.position().top;

			if (new_width > TEXT_WIDTH_MIN) {
				var old_style = {
					'left': $widget.position().left,
					'width': $widget.width()
				}

				$widget.css({
					'left': event.pageX - getPageLeftOffset($widget),
					'width': new_width
				});
			
				if ($widget.height() > max_height) {
					$widget.css(old_style);
				}
			}
		});
	});

});