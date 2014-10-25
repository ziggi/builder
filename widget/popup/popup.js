$(function() {
	
	$(document).on('popupShow', '.widget-editor .link-menu', function() {
		var $widget = $(this).parents('.widget');

		var $popup = $('.page_blocks_popup').find('[data-id=' + $widget.attr('id') + ']');

		var isCreated = $popup.length !== 0;
		if (!isCreated) {
			$.ajax({
				type: 'POST',
				async: false,
				cache: false,
				url: 'widget/popup/popup.html',
				success: function(data) {
					$popup = $(data).appendTo($('.page_blocks_popup'));
					$popup.attr('data-id', $widget.attr('id'));
				}
			});
		}

		$('.widget').trigger('inactive');
		$('.admin-editor-toolbar').trigger('toggle', 'admin-editor-add');

		$('.page_blocks_popup .overlay').show();
		$('.page_blocks_popup').show();
		$popup.show();

		$popup.trigger('popupResize');
	});

	$(document).on('popupHide', function() {
		$('.page_blocks_popup').hide();
		$('.page_blocks_popup .page_block').hide();
		$('.page_blocks_popup .page_block').widgetResize('reset');
	});

	$(document).on('click', '.page_blocks_popup .overlay', function() {
		$(document).trigger('popupHide');
	});

});