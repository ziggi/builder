$(function() {

	var BLOCK_MIN_HEIGHT = 10;

	$(document).on('mouseup', function(event) {
		$(this).unbind('mousemove.page_block');
	});
	
	$(document).on('mousedown', '.page_block .resize-line', function() {
		$block = $(this).parent();

		var new_height = event.pageY - $block.position().top;
		var max_height = BLOCK_MIN_HEIGHT;
			
		$block.find('.block_inner > div').each(function() {
			var element_pos = $(this).position().top + $(this).outerHeight();

			if (max_height < element_pos) {
				max_height = element_pos;
			}
		});

		$block.find('.block_inner_big > div').each(function() {
			if ($(this)[0].style.height !== '100%') {
				var element_pos = $(this).position().top + $(this).height();

				if (max_height < element_pos) {
					max_height = element_pos;
				}
			}
		});

		$(document).bind('mousemove.page_block', function(event) {
			new_height = event.pageY - $block.position().top;

			if (new_height > max_height) {
				$block.height(new_height);
			} else {
				$block.height(max_height);
			}
		});
	});

});