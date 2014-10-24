$(function() {

	$(document).on('inactive', '.widget-text', function(event) {
		$(this).find('.widget-text-editor').trigger('editStop');
	});

	$(document).on('edit', '.widget-text', function() {
		var $edit_block = $(this).find('.widget-text-editor');

		if ($edit_block.hasClass('widget-text-editing')) {
			$edit_block.trigger('editStop');
		} else {
			$edit_block.trigger('editStart');
		}
	});

	$(document).on('editStart', '.widget-text-editor', function() {
		$(this).parents('.widget').widgetResize('reset');
		$(this).parents('.widget').find('.widget-editor').hide();
		$(this).addClass('widget-text-editing');
		$(this).addClass('widget-text-selecting');
		$(this).attr('id', 'text-edit');

		$('.widget-text-editor').trigger('textEditor', ['text', 'text-edit']);
	});

	$(document).on('editStop', '.widget-text-editor', function() {
		$(this).parents('.widget').find('.widget-editor').show();
		$(this).removeClass('widget-text-editing');
		$(this).removeClass('widget-text-selecting');
		$(this).removeAttr('id');

		tinymce.remove();
	});

});

