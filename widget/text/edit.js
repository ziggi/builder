$(function() {

	CKEDITOR.config.language = 'en';
	CKEDITOR.config.extraPlugins = 'ckeditor-gwf-plugin';
	CKEDITOR.config.font_names = CKEDITOR.config.font_names + '; Open Sans; Seymour One; Ubuntu Mono; Fira Sans; Noto Sans; Playfair Display; Lora; PT Sans; Poiret One; Andika; Fira Mono; PT Sans Narrow; Tinos; Philosopher; Neucha; Bad Script; Istok Web; Yeseva One; Arimo; Kelly Slab; Noto Serif; Ubuntu; Ruslan Display; PT Serif Caption; PT Mono; Marck Script; Tenor Sans; Oranienbaum; PT Serif; Lobster; Russo One; Underdog; Cousine; Ubuntu Condensed; EB Garamond; Roboto Slab; Marmelad; Jura; Forum; Didact Gothic; Playfair Display SC; Anonymous Pro; Comfortaa; Prosto One; Stalinist One; Press Start 2P; Scada; Cuprum; Exo 2; PT Sans Caption; Roboto Condensed; Play; Ledger; Open Sans; Open Sans Condensed; Roboto;';
	CKEDITOR.disableAutoInline = true;

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

