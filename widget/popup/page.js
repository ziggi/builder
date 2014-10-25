$(function() {

	$(document).on('click', '.widget-button', function() {
		var $popup = $('.page_blocks_popup').find('[data-id=' + $(this).attr('id') + ']');

		if ($popup.length !== 0) {
			$('.page_blocks_popup').show('fast');
			$('.page_blocks_popup .overlay').show();
			$popup.show();
		}
	});

	$(document).on('click', '.page_blocks_popup .overlay', function() {
		$('.page_blocks_popup').hide();
		$('.page_blocks_popup .page_block').hide();
		$('.page_blocks_popup .page_block').widgetResize('reset');
	});
	
});
