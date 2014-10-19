$(function() {

	$(document).on('inactive', '.widget-text', function(event) {
		$(this).find('.widget-text-editor').trigger('editStop');
	});

	$(document).on('edit', '.widget-text', function() {
		var $edit_block = $(this).find('.widget-text-editor');

		if ($edit_block.attr('contenteditable') === 'false' || $edit_block.attr('contenteditable') === undefined) {
			$edit_block.trigger('editStart');
		} else {
			$edit_block.trigger('editStop');
		}
	});

	$(document).on('editStart', '.widget-text-editor', function() {
		$(this).parents('.widget').find('.widget-editor').hide();
		$(this).parents('.widget-text').data('editing', true);
		$(this).addClass('widget-text-editing');
		$(this).addClass('widget-text-selecting');
		$(this).attr('id', 'text-edit');

		$('.widget-text-editor').trigger('textEditor', ['text', 'text-edit']);
	});

	$(document).on('editStop', '.widget-text-editor', function() {
		$(this).parents('.widget').find('.widget-editor').show();
		$(this).parents('.widget-text').data('editing', false);
		$(this).removeClass('widget-text-editing');
		$(this).removeClass('widget-text-selecting');
		$(this).removeAttr('id');

		tinymce.remove();
	});

});

