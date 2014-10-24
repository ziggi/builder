$(function() {

	$(document).on('inactive', '.widget-headline', function(event) {
		$(this).find('.widget-headline-editor').trigger('editStop');
	});

	$(document).on('edit', '.widget-headline', function() {
		var $edit_block = $(this).find('.widget-headline-editor');

		if ($edit_block.hasClass('widget-text-editing')) {
			$edit_block.trigger('editStop');
		} else {
			$edit_block.trigger('editStart');
		}
	});

	$(document).on('editStart', '.widget-headline-editor', function() {
		$(this).parents('.widget').widgetResize('reset');
		$(this).parents('.widget').find('.widget-editor').hide();
		$(this).addClass('widget-text-editing');
		$(this).addClass('widget-text-selecting');
		$(this).attr('id', 'headline-edit');

		$('.widget-headline-editor').trigger('textEditor', ['headline', 'headline-edit']);
	});

	$(document).on('editStop', '.widget-headline-editor', function() {
		$(this).parents('.widget').find('.widget-editor').show();
		$(this).removeClass('widget-text-editing');
		$(this).removeClass('widget-text-selecting');
		$(this).removeAttr('id');

		tinymce.remove();
	});

});

