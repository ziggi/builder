$(function() {

	$('.back-bar .button-back, .back-bar .button-done').on('click', function() {
		var $popup = $('.page_blocks_popup .page_block:visible');
		if ($popup.length === 0) {
			return;
		}

		$(document).trigger('popupHide');

		var $widget = $('#' + $popup.attr('data-id'));
		
		if ($widget.length !== 0) {
			$widget.trigger('active');
		}
	});

	$(document).on('popupShow', '.widget-editor .link-menu', function() {
		// popup
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
					
					$popup
						.attr('data-id', $widget.attr('id'))
						.css({
							left: $(window).width() / 2 - $popup.width() / 2,
							top: $(window).height() / 2 - $popup.height() / 2
						});
				}
			});
		}

		$('.page_blocks_popup .overlay').show();
		$('.page_blocks_popup').show();
		$popup.show();

		$popup.trigger('popupResize');

		// admin
		$('.widget.active').trigger('inactive');
		$('.admin-editor-toolbar').trigger('toggle', 'admin-editor-add');

		$('.backbar-title').text('Всплывающее окно');
		$('.back-bar').show();
	});

	$(document).on('popupHide', function() {
		$('.page_blocks_popup').hide();
		$('.page_blocks_popup .page_block').hide();
		$('.page_blocks_popup .page_block').widgetResize('reset');
	});

});