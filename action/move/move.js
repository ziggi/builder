$(function() {
	
	$(document).on('mousedown', '.page_blocks .widget', function(event) {
		var isResizeBlock = $(event.target).is('.resize-block');
		var isWidgetEditor = $(event.target).parents('.widget-editor').length !== 0;
		var isTextEditing = $(this).find('.widget-text-editing').length !== 0;
		var isNotLeftClick = event.which !== 1;

		if (isResizeBlock || isWidgetEditor || isTextEditing || isNotLeftClick) {
			return;
		}

		$widget = $(this);

		var cursorOffsetX = event.pageX - $widget.offset().left;
		var cursorOffsetY = event.pageY - $widget.offset().top;

		var newX = event.pageX - cursorOffsetX;
		var newY = event.pageY - cursorOffsetY;

		var leftBorder = $widget.parent().offset().left;
		var rightBorder = $widget.parent().offset().left + $widget.parent().width() - $widget.width();

		$(document).bind('mousemove.widget', {obj: $widget}, function(event) {
			$widget = event.data.obj;
			
			newX = event.pageX - cursorOffsetX;
			newY = event.pageY - cursorOffsetY;

			/*
				Проверяем на выход за границу браузера
			 */
			
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

			/*
				Добавляем направляющие
			 */
			
			var vertical_guidePosArray = [$(window).outerWidth() / 2];
			var horizontal_guidePosArray = [$(window).outerHeight() / 2];

			$('.widget').each(function(index, value) {
				if ($(this).is($widget)) {
					return true;
				}

				vertical_guidePosArray.push(
					$(this).offset().left,
					$(this).offset().left + $(this).outerWidth() / 2,
					$(this).offset().left + $(this).outerWidth()
				);

				horizontal_guidePosArray.push(
					$(this).offset().top,
					$(this).offset().top + $(this).outerHeight() / 2,
					$(this).offset().top + $(this).outerHeight()
				);
			});

			var guideOptions = {
				verticalGuides: vertical_guidePosArray,
				verticalObjs: [
					newX,
					newX + $widget.outerWidth() / 2,
					newX + $widget.outerWidth()
				],

				horizontalGuides: horizontal_guidePosArray,
				horizontalObjs: [
					newY,
					newY + $widget.outerHeight() / 2,
					newY + $widget.outerHeight()
				]
			};

			$.guide('check', guideOptions);

			/*
				Обновляем координаты
			 */

			$widget.offset({
				left: newX,
				top: newY
			});
		});

		$(document).bind('mouseup.widget', {obj: $widget}, function(event) {
			$widget = event.data.obj;

			var $block = null;

			$('.page_blocks .page_block').each(function(index, item) {
				if (event.pageY > $(this).position().top && event.pageY < $(this).position().top + $(this).height()) {
					$block = $(this);
				}
			});

			if ($block !== null) {
				var previous_block = $widget.parents('div[class^="block_inner"]').attr('class');

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

			$.guide('hide');
			$(this).unbind('mousemove.widget');
			$(this).unbind('mouseup.widget');
		});
	});

});