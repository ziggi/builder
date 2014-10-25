$(function() {
	
	$(document).on('mouseup', function() {
		$(this).unbind('mousemove.widget');
	});

	$(document).on('mousedown', '.page_blocks_popup .widget', function(event) {
		var isResizeBlock = $(event.target).is('.resize-block');
		var isWidgetEditor = $(event.target).parents('.widget-editor').length !== 0;
		var isTextEditing = $(this).find('.widget-text-editing').length !== 0;
		var isNotLeftClick = event.which !== 1;

		if (isResizeBlock || isWidgetEditor || isTextEditing || isNotLeftClick) {
			return;
		}

		$widget = $(this);

		var cursorOffsetX = event.clientX - $widget.offset().left;
		var cursorOffsetY = event.clientY - $widget.offset().top;

		var newX = event.clientX - cursorOffsetX;
		var newY = event.clientY - cursorOffsetY;

		var leftBorder = $widget.parent().offset().left;
		var rightBorder = $widget.parent().offset().left + $widget.parent().width() - $widget.width();

		$(document).bind('mousemove.widget', {obj: $widget}, function(event) {
			$widget = event.data.obj;
			
			newX = event.clientX - cursorOffsetX;
			newY = event.clientY - cursorOffsetY;

			if (newX < leftBorder) {
				newX = leftBorder;
			} else if (newX > rightBorder) {
				newX = rightBorder;
			}

			var min_top_pos = $('.admin-editor').height();
			if (newY < min_top_pos) {
				newY = min_top_pos;
			} else if (newY > $(document).height() - $widget.height() - 10) {
				newY = $(document).height() - $widget.height() - 10;
			}

			$widget.offset({
				left: newX,
				top: newY
			});
		});
	});

});