$(function() {

	$(document).on('textEditorShow', function() {
		$('[id^="mceu_"]').show();
	});

	$(document).on('textEditorHide', function() {
		$('[id^="mceu_"]').hide();
	});

	$(document).on('textEditor', '.widget-text-editing', function(event, type, focus) {
		var toolbar_items = "forecolor fontselect fontsizeselect weightmenu italic underline bullist numlist | alignleft aligncenter alignright | link | done";

		if (type == 'headline') {
			toolbar_items = "forecolor fontselect fontsizeselect weightmenu italic underline | alignleft aligncenter alignright | link | done";
		}

		var $widget_text = $(this);

		$(this).tinymce({
			inline: true,
			menubar: false,
			language: "ru",
			auto_focus: focus,
			skin: "instapage",
			theme: "modern",
			font_formats: "Open Sans=Open Sans; Seymour One=Seymour One; Ubuntu Mono=Ubuntu Mono; Fira Sans=Fira Sans; Noto Sans=Noto Sans; Playfair Display=Playfair Display; Lora=Lora; PT Sans=PT Sans; Poiret One=Poiret One; Andika=Andika; Fira Mono=Fira Mono; PT Sans Narrow=PT Sans Narrow; Tinos=Tinos; Philosopher=Philosopher; Neucha=Neucha; Bad Script=Bad Script; Istok Web=Istok Web; Yeseva One=Yeseva One; Arimo=Arimo; Kelly Slab=Kelly Slab; Noto Serif=Noto Serif; Ubuntu=Ubuntu; Ruslan Display=Ruslan Display; PT Serif Caption=PT Serif Caption; PT Mono=PT Mono; Marck Script=Marck Script; Tenor Sans=Tenor Sans; Oranienbaum=Oranienbaum; PT Serif=PT Serif; Lobster=Lobster; Russo One=Russo One; Underdog=Underdog; Cousine=Cousine; Ubuntu Condensed=Ubuntu Condensed; EB Garamond=EB Garamond; Roboto Slab=Roboto Slab; Marmelad=Marmelad; Jura=Jura; Forum=Forum; Didact Gothic=Didact Gothic; Playfair Display SC=Playfair Display SC; Anonymous Pro=Anonymous Pro; Comfortaa=Comfortaa; Prosto One=Prosto One; Stalinist One=Stalinist One; Press Start 2P=Press Start 2P; Scada=Scada; Cuprum=Cuprum; Exo 2=Exo 2;PT Sans Caption=PT Sans Caption; Roboto Condensed=Roboto Condensed; Play=Play; Ledger=Ledger; Open Sans=Open Sans; Open Sans Condensed=Open Sans Condensed; Roboto=Roboto;",
			plugins: "paste textcolor autoresize",
			toolbar: toolbar_items,
			setup: function(editor) {
				editor.addButton('link', {
					title: 'Добавить ссылку',
					icon: 'link',
					onclick: function() {
						$widget_text.trigger('textEditorHide');
						$('.widget-editor').show();
						$widget_text.trigger('editor-link');
					}
				});

				editor.addButton('done', {
					text: 'Готово',
					onclick: function() {
						$widget_text.trigger('inactive');
						$widget_text.trigger('active');
					}
				});

				var weightArray = [];
				var weightSizes = [100, 200, 300, 400, 500, 600, 700, 800, 900];

				$(weightSizes).each(function(index, value) {
					weightArray.push({
						text: 'Weight-' + value,
						onclick: function() {
							editor.formatter.register('weight-' + value, {
								inline : 'span',
								styles : {fontWeight: value.toString()}
							});
							editor.formatter.apply('weight-' + value);
						}
					});
				});

				editor.addButton('weightmenu', {
					type: 'menubutton',
					icon: 'bold',
					menu: weightArray
				});
			}
		});

		
	});
});