$(function() {

	$(document).on('inactive', '.widget-headline', function(event) {
		$(this).find('.widget-headline-editor').trigger('editStop');
	});

	$(document).on('edit', '.widget-headline', function() {
		var $edit_block = $(this).find('.widget-headline-editor');

		if ($edit_block.attr('contenteditable') === 'false') {
			$edit_block.trigger('editStart');
		} else {
			$edit_block.trigger('editStop');
		}
	});

	$(document).on('editStart', '.widget-headline-editor', function() {
		$(this).parents('.widget').find('.widget-editor').remove();
		$(this).parents('.widget-headline').data('editing', true);
		$(this).addClass('widget-text-editing');
		$(this).addClass('widget-text-selecting');
		$(this).attr('contenteditable', 'true');
		$(this).attr('id', 'ckedit');

		CKEDITOR.inline('ckedit');
		$('#ckedit').focus();
	});

	$(document).on('editStop', '.widget-headline-editor', function() {
		$(this).parents('.widget-headline').data('editing', false);
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

