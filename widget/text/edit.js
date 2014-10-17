$(function() {

	$(document).on('inactive', '.widget-text', function(event) {
		$(this).find('.widget-text-editor').trigger('editStop');
	});

	$(document).on('edit', '.widget-text', function() {
		var $edit_block = $(this).find('.widget-text-editor');

		if ($edit_block.attr('contenteditable') === 'false') {
			$edit_block.trigger('editStart');
		} else {
			$edit_block.trigger('editStop');
		}
	});

	$(document).on('editStart', '.widget-text-editor', function() {
		$(this).parents('.widget').find('.widget-editor').remove();
		$(this).parents('.widget-text').data('editing', true);
		$(this).addClass('widget-text-editing');
		$(this).addClass('widget-text-selecting');
		$(this).attr('contenteditable', 'true');
		$(this).attr('id', 'ckedit');

		CKEDITOR.inline('ckedit');
		$('#ckedit').focus();
	});

	$(document).on('editStop', '.widget-text-editor', function() {
		$(this).parents('.widget-text').data('editing', false);
		$(this).removeClass('widget-text-editing');
		$(this).removeClass('widget-text-selecting');
		$(this).attr('contenteditable', 'false');
		$(this).removeAttr('id');

		// remove ckeditor
		$('link[href*=ckeditor-gwf-plugin]').remove();
		$('#gwf-popup').remove();
		for(name in CKEDITOR.instances) {
			CKEDITOR.instances[name].destroy()
		}
	});

});

