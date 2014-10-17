$(function() {
	
	$(document).on('mousedown', '.page_block .resize-line', function() {
		$obj = $(this).parent();

		$(document).bind('mousemove.page_block', function(event) {
			var new_height = event.pageY - $obj.position().top;
			var max_height = 0;
			
			$obj.find('.block_inner > div').each(function() {
				var element_pos = $(this).position().top + $(this).height();

				if (max_height < element_pos) {
					max_height = element_pos;
				}
			});

			$obj.find('.block_inner_big > div').each(function() {
				if ($(this)[0].style.height === '100%') {
					max_height = 10;
				} else {
					var element_pos = $(this).position().top + $(this).height();

					if (max_height < element_pos) {
						max_height = element_pos;
					}
				}
			});

			if (new_height > max_height) {
				$obj.height(new_height);
			} else {
				$obj.height(max_height);
			}
		});

		$(document).bind('mouseup.page_block', function(event) {
			$(this).unbind('mousemove.page_block');
			$(this).unbind('mouseup.page_block');
		});
	});

});