$(function() {

	var BLOCK_MIN_HEIGHT = 10;
	var BLOCK_MIN_WIDTH = 10;

	$(document).on('popupResize', '.page_blocks_popup .page_block', function() {
		$(this).widgetResize('init', 'popup');

		var $block = $(this);

		$('.page_blocks_popup .resize-line-s').css({
			top: ($block.position().top + $block.height())
		});

		$('.page_blocks_popup .resize-line-n').css({
			top: $block.position().top
		});

		$('.page_blocks_popup .resize-line-e').css({
			left: ($block.position().left + $block.width())
		});

		$('.page_blocks_popup .resize-line-w').css({
			left: $block.position().left
		});
	});

	$(document).on('mouseup', function(event) {
		$(this).unbind('mousemove.page_block');
	});

	$(document).on('mousedown', '.page_blocks_popup .page_block > .resize-block-e', function(event) {
		$block = $(this).parents('.page_block');

		var new_left, new_width;

		var min_width = BLOCK_MIN_WIDTH;
			
		$block.find('.block_inner > div').each(function() {
			var element_pos = $(this).position().left + $(this).outerWidth();

			if (min_width < element_pos) {
				min_width = element_pos;
			}
		});

		$(document).bind('mousemove.page_block', function(event) {
			new_width = event.clientX - $block.position().left;
			new_left = $block.position().left + ($block.width() - new_width) / 2;

			if (new_width <= min_width) {
				new_left = $block.position().left + ($block.width() - min_width) / 2;
				new_width = min_width;
			}

			$block.css({
				width: new_width,
				left: new_left
			});

			$('.page_blocks_popup .resize-line-e').css({
				left: ($block.position().left + new_width)
			});
			$('.page_blocks_popup .resize-line-w').css({
				left: new_left
			});
		});
	});

	$(document).on('mousedown', '.page_blocks_popup .page_block > .resize-block-w', function(event) {
		$block = $(this).parents('.page_block');

		var new_left, new_width;

		var min_width = BLOCK_MIN_WIDTH;
			
		$block.find('.block_inner > div').each(function() {
			var element_pos = $(this).position().left + $(this).outerWidth();

			if (min_width < element_pos) {
				min_width = element_pos;
			}
		});

		$(document).bind('mousemove.page_block', function(event) {
			new_left = event.clientX;
			new_width = ($block.position().left - new_left) * 2 + $block.width();

			if (new_width <= min_width) {
				new_left = $block.position().left + ($block.width() - min_width) / 2;
				new_width = min_width;
			}

			$block.css({
				width: new_width,
				left: new_left
			});

			$('.page_blocks_popup .resize-line-e').css({
				left: ($block.position().left + new_width)
			});
			$('.page_blocks_popup .resize-line-w').css({
				left: new_left
			});
		});
	});
	
	$(document).on('mousedown', '.page_blocks_popup .page_block > .resize-block-s', function(event) {
		$block = $(this).parents('.page_block');

		var new_top, new_height;

		var min_height = BLOCK_MIN_HEIGHT;
			
		$block.find('.block_inner > div').each(function() {
			var element_pos = $(this).position().top + $(this).outerHeight();

			if (min_height < element_pos) {
				min_height = element_pos;
			}
		});

		$(document).bind('mousemove.page_block', function(event) {
			new_height = event.clientY - $block.position().top;
			new_top = $block.position().top + ($block.height() - new_height) / 2;

			if (new_height <= min_height) {
				new_top = $block.position().top + ($block.height() - min_height) / 2;
				new_height = min_height;
			}

			$block.css({
				height: new_height,
				top: new_top
			});

			$('.page_blocks_popup .resize-line-n').css({
				top: new_top
			});
			$('.page_blocks_popup .resize-line-s').css({
				top: ($block.position().top + new_height)
			});
		});
	});

	$(document).on('mousedown', '.page_blocks_popup .page_block > .resize-block-n', function(event) {
		$block = $(this).parents('.page_block');

		var new_top, new_height;

		var min_height = BLOCK_MIN_HEIGHT;
			
		$block.find('.block_inner > div').each(function() {
			var element_pos = $(this).position().top + $(this).outerHeight();

			if (min_height < element_pos) {
				min_height = element_pos;
			}
		});

		$(document).bind('mousemove.page_block', function(event) {
			new_top = event.clientY;
			new_height = ($block.position().top - new_top) * 2 + $block.height();

			if (new_height <= min_height) {
				new_top = $block.position().top + ($block.height() - min_height) / 2;
				new_height = min_height;
			}

			$block.css({
				height: new_height,
				top: new_top
			});

			$('.page_blocks_popup .resize-line-n').css({
				top: new_top
			});
			$('.page_blocks_popup .resize-line-s').css({
				top: ($block.position().top + new_height)
			});
		});
	});

});