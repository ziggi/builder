$(function() {

	var IMAGE_WIDTH_MIN = 100;

	$(document).on('resize', '.widget-image', function() {
		$(this).widgetResize('init');
	});

	$(document).on('dragstart', '.widget-image', function(event) {
		return false;
	});

	$(document).on('mousedown', '.widget-image .resize-block', function(event) {
		$(document).bind('mouseup.widget-image', function(event) {
			$(this).unbind('mousemove.widget-image');
			$(this).unbind('mouseup.widget-image');
		});
	});

	$(document).on('mousedown', '.widget-image .resize-block-n, .widget-image .resize-block-ne', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-image', function(event) {
			var proportion = $widget.find('img').width() / $widget.find('img').height();

			var new_height = $widget.position().top - event.pageY + $widget.height() + $widget.parents('.page_block').position().top;
			var new_width = new_height * proportion;

			var max_height = $widget.position().top + $widget.height();

			if (new_height > max_height) {
				$widget.css({
					'top': event.pageY - $widget.parents('.page_block').position().top + (new_height - max_height),
					'width': max_height * proportion,
					'height': max_height
				});
			} else if (new_width > IMAGE_WIDTH_MIN) {
				$widget.css({
					'top': event.pageY - $widget.parents('.page_block').position().top,
					'width': new_width,
					'height': new_height
				});
			}
		});
	});

	$(document).on('mousedown', '.widget-image .resize-block-e', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-image', function(event) {
			var proportion = $widget.find('img').width() / $widget.find('img').height();

			var new_width = event.pageX - $widget.position().left - getPageLeftOffset($widget);
			var new_height = new_width / proportion;

			var max_height = $widget.parents('.page_block').height() - $widget.position().top;

			if (new_height > max_height) {
				$widget.css({
					'width': max_height * proportion,
					'height': max_height
				});
			} else if (new_width > IMAGE_WIDTH_MIN) {
				$widget.css({
					'width': new_width,
					'height': new_height
				});
			}
		});
	});

	$(document).on('mousedown', '.widget-image .resize-block-w, .widget-image .resize-block-sw', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-image', function(event) {
			var proportion = $widget.find('img').width() / $widget.find('img').height();

			var new_width = $widget.position().left - event.pageX + $widget.width() + getPageLeftOffset($widget);
			var new_height = new_width / proportion;

			var max_height = $widget.parents('.page_block').height() - $widget.position().top;

			if (new_height > max_height) {
				$widget.css({
					'left': event.pageX + (new_width - max_height * proportion) - getPageLeftOffset($widget),
					'width': max_height * proportion,
					'height': max_height
				});
			} else if (new_width > IMAGE_WIDTH_MIN) {
				$widget.css({
					'left': event.pageX - getPageLeftOffset($widget),
					'width': new_width,
					'height': new_height
				});
			}


		});
	});

	$(document).on('mousedown', '.widget-image .resize-block-s, .widget-image .resize-block-se', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-image', function(event) {
			var proportion = $widget.find('img').width() / $widget.find('img').height();

			var new_height = event.pageY - $widget.position().top - $widget.parents('.page_block').position().top;
			var new_width = new_height * proportion;

			var max_height = $widget.parents('.page_block').height() - $widget.position().top;

			if (new_height > max_height) {
				$widget.css({
					'width': max_height * proportion,
					'height': max_height
				});
			} else if (new_width > IMAGE_WIDTH_MIN) {
				$widget.css({
					'width': new_width,
					'height': new_height
				});
			}
		});
	}); 

	$(document).on('mousedown', '.widget-image .resize-block-nw', function() {
		var $widget = $(this).parent();

		$(document).bind('mousemove.widget-image', function(event) {
			var proportion = $widget.find('img').width() / $widget.find('img').height();

			var new_height = $widget.position().top - event.pageY + $widget.height() + $widget.parents('.page_block').position().top;
			var new_width = new_height * proportion;

			var max_height = $widget.position().top + $widget.height();

			if (new_height > max_height) {
				$widget.css({
					'top': event.pageY - $widget.parents('.page_block').position().top + (new_height - max_height),
					'left': $widget.position().left + $widget.width() - new_width + (new_width - max_height * proportion),
					'width': max_height * proportion,
					'height': max_height
				});
			} else if (new_width > IMAGE_WIDTH_MIN) {
				$widget.css({
					'top': event.pageY - $widget.parents('.page_block').position().top,
					'left': $widget.position().left + $widget.width() - new_width,
					'width': new_width,
					'height': new_height
				});
			}
		});
	});

});