$(function() {
	
	$(document).on('mousedown', '.widget', function(event) {
		var isResizeBlock = $(event.target).is('.resize-block');
		var isWidgetEditor = $(event.target).parents('.widget-editor').is('.widget-editor');
		var isEditing = $(this).data('editing');
		var isNotLeftClick = event.which !== 1;

		if (isResizeBlock || isWidgetEditor || isEditing || isNotLeftClick) {
			return;
		}

		$widget = $(this);

		var cursorOffsetX = event.pageX - $widget.offset().left;
		var cursorOffsetY = event.pageY - $widget.offset().top;

		var newX = event.pageX - cursorOffsetX;
		var newY = event.pageY - cursorOffsetY;

		$(document).bind('mousemove.widget', function(event) {
			newX = event.pageX - cursorOffsetX;
			newY = event.pageY - cursorOffsetY;

			if (newX < 10) {
				newX = 10;
			} else if (newX > $(window).width() - $widget.width() - 10) {
				newX = $(window).width() - $widget.width() - 10;
			}

			if (newY < 55) {
				newY = 55;
			} else if (newY > $(document).height() - $widget.height() - 10) {
				newY = $(document).height() - $widget.height() - 10;
			}

			$widget.offset({
				left: newX,
				top: newY
			});
		});

		$(document).bind('mouseup.widget', function(event) {
			var $block = null;

			$('.page_block').each(function(index, item) {
				if (event.pageY > $(this).position().top && event.pageY < $(this).position().top + $(this).height()) {
					$block = $(this);
				}
			});

			if ($block !== null) {
				var previous_block = $widget.parent().attr('class');

				$block_inner = $block.find('div[class^="block_inner"]');

				var current_block = $block_inner.attr('class');

				if (current_block !== previous_block) {
					switch (current_block) {
						case 'block_inner':
							$widget.css('left', $widget.position().left - getPageLeftOffsetByBlock($block_inner));
							break
						case 'block_inner_big':
							$widget.css('left', $widget.position().left + getPageLeftOffset($widget));
							break;
					}
				}

				$widget.css('top', newY - $block.position().top);

				$block_inner.prepend($widget);
			}
			
			$(this).unbind('mousemove.widget');
			$(this).unbind('mouseup.widget');
		});
	});

});