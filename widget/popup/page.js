$(function() {

	$(document).on('click', '.widget-button', function() {
		var $popup = $('.page_blocks_popup').find('[data-id=' + $(this).attr('id') + ']');

		if ($popup.length !== 0) {
			$('.page_blocks_popup').show('fast');
			$('.page_blocks_popup .overlay').show();
			$popup
				.show()
				.css({
					left: $(window).width() / 2 - $popup.width() / 2,
					top: $(window).height() / 2 - $popup.height() / 2
				});
		}
	});

	$(document).on('click', '.page_blocks_popup .overlay', function() {
		$('.page_blocks_popup').hide();
		$('.page_blocks_popup .page_block').hide();
	});
	
});
