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
		$(this).parents('.widget').find('.widget-editor').remove();
		$(this).parents('.widget-text').data('editing', true);
		$(this).addClass('widget-text-editing');
		$(this).addClass('widget-text-selecting');
		$(this).attr('id', 'text-edit');

		var $edit_block = $(this).parents('.widget-text');
		tinymce.init({
			selector: "div.widget-text-editing",
			inline: true,
			auto_focus: "text-edit",
			menubar: false,
			skin : "instapage",
			theme: "modern",
			font_formats: "Open Sans=Open Sans; Seymour One=Seymour One; Ubuntu Mono=Ubuntu Mono; Fira Sans=Fira Sans; Noto Sans=Noto Sans; Playfair Display=Playfair Display; Lora=Lora; PT Sans=PT Sans; Poiret One=Poiret One; Andika=Andika; Fira Mono=Fira Mono; PT Sans Narrow=PT Sans Narrow; Tinos=Tinos; Philosopher=Philosopher; Neucha=Neucha; Bad Script=Bad Script; Istok Web=Istok Web; Yeseva One=Yeseva One; Arimo=Arimo; Kelly Slab=Kelly Slab; Noto Serif=Noto Serif; Ubuntu=Ubuntu; Ruslan Display=Ruslan Display; PT Serif Caption=PT Serif Caption; PT Mono=PT Mono; Marck Script=Marck Script; Tenor Sans=Tenor Sans; Oranienbaum=Oranienbaum; PT Serif=PT Serif; Lobster=Lobster; Russo One=Russo One; Underdog=Underdog; Cousine=Cousine; Ubuntu Condensed=Ubuntu Condensed; EB Garamond=EB Garamond; Roboto Slab=Roboto Slab; Marmelad=Marmelad; Jura=Jura; Forum=Forum; Didact Gothic=Didact Gothic; Playfair Display SC=Playfair Display SC; Anonymous Pro=Anonymous Pro; Comfortaa=Comfortaa; Prosto One=Prosto One; Stalinist One=Stalinist One; Press Start 2P=Press Start 2P; Scada=Scada; Cuprum=Cuprum; Exo 2=Exo 2;PT Sans Caption=PT Sans Caption; Roboto Condensed=Roboto Condensed; Play=Play; Ledger=Ledger; Open Sans=Open Sans; Open Sans Condensed=Open Sans Condensed; Roboto=Roboto;",
			plugins: "link paste textcolor autoresize",
			toolbar: "forecolor fontselect fontsizeselect bold italic underline bullist numlist | alignleft aligncenter alignright | link | done",
			setup : function(ed) {
				ed.addButton('done', {
					text: 'Готово',
					onclick: function() {
						$edit_block.trigger('inactive');
						$edit_block.trigger('active');
					}
				});
			}
		});
	});

	$(document).on('editStop', '.widget-text-editor', function() {
		$(this).parents('.widget-text').data('editing', false);
		$(this).removeClass('widget-text-editing');
		$(this).removeClass('widget-text-selecting');
		$(this).removeAttr('id');

		tinymce.remove();
	});

});

