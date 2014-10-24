$(function() {

	$(document).on('mousedown', '.widget-inner', function() {
		$widget = $(this).parents('.widget');

		var isTextEditing = $widget.find('.widget-text-editing').length !== 0;
		if (isTextEditing) {
			return;
		}

		$('.widget').trigger('inactive');
		$widget.trigger('active');
	});

	$(document).on('mousedown', function(event) {
		var isWidget = $(event.target).parents('.widget').length !== 0;
		var isWidgetEditor = $(event.target).parents('.widget-editor').length !== 0;
		//var isTextEditing = $(event.target).parents('.widget-text-editing').length !== 0;
		var isTextEditing = $(event.target).parents('[id^="mceu_"]').length !== 0 || $(event.target).find('[id^="mceu_"]').length !== 0;
		var isAdminClick = $(event.target).parents('.admin-editor').length !== 0;

		if (!isWidget && !isWidgetEditor && !isTextEditing && !isAdminClick) {
			$('.widget').trigger('inactive');
		}
	});

});