$(function() {

	$(document).on('click', '.flat-colors a', function() {
		var $container = $(this).parents('.mce-container');

		var isFlatColors = $('.flat-color-block').is(':visible');
		if (isFlatColors) {
			$('.flat-color-block').hide();
			$container.find('.mce-colorbutton-grid').show();

			$(this).text('Flat');
		} else {
			$container.find('.mce-colorbutton-grid').not('.mce-colorflat-grid').hide();
			$(this).text('Обычные');

			var isCreated = $('.flat-color-block').length !== 0;
			if (!isCreated) {
				$.get('widget/editor/text/flat_colors.html', function(data) {
					$(data)
						.prependTo($container)
						.show();
				});
			} else {
				$('.flat-color-block').show();
			}
		}
	});

	$(document).on('click', '.palette-colors a', function(e) {
		var isCreated = $('#tinymce-color-picker').spectrum('container').is('.sp-container');
		if (!isCreated) {
			$('#tinymce-color-picker').spectrum({
				showButtons: false,
				move: function(color) {
					$('.mce-preview').css('background-color', color.toHexString());
					tinymce.activeEditor.selection.editor.execCommand('ForeColor', false, color.toHexString());
				}
			});
		}
		
		$('#tinymce-color-picker').spectrum('toggle');
		return false;
	});

	$(document).on('textEditorShow', function() {
		$('[id^="mceu_"]').show();
	});

	$(document).on('textEditorHide', function() {
		$('[id^="mceu_"]').hide();
	});

	$(document).on('textEditor', '.widget-text-editing', function(event, type, focus) {
		var toolbar_items = "forecolor fontselect fontsizeselect weightmenu italic underline bullist numlist lineheight letterspacing | alignleft aligncenter alignright | link | done";

		if (type == 'headline') {
			toolbar_items = "forecolor fontselect fontsizeselect weightmenu italic underline lineheight letterspacing | alignleft aligncenter alignright | link | done";
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
				editor.settings.textcolor_cols = 5;
				editor.settings.textcolor_rows = 4;

				var isTextNotSelected = false;

				editor.on('BeforeExecCommand', function(e) {
					isTextNotSelected = editor.selection.getContent().length === 0;
					if (isTextNotSelected) {
						if (e.command !== 'mceInsertContent' && e.command !== 'SelectAll') {
							editor.selection.select(editor.getBody(), true);
						}
					}
				});

				editor.on('ExecCommand', function(e) {
					if (isTextNotSelected) {
						if (e.command !== 'mceInsertContent' && e.command !== 'SelectAll') {
							editor.selection.collapse();
						}
						isTextNotSelected = false;
					}
				});

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


				/*
					
					Weight menu

				*/
			
				var weightArray = [];
				var weightSizes = [100, 200, 300, 400, 500, 600, 700, 800, 900];

				$(weightSizes).each(function(index, value) {
					weightArray.push({
						text: 'Weight-' + value,
						onclick: function() {
							editor.execCommand('changeWeight', true, value);
						}
					});
				});

				editor.addCommand('changeWeight', function(ui, value) {
					editor.formatter.register('weight-' + value, {
						inline : 'span',
						styles : {fontWeight: value.toString()}
					});

					editor.formatter.apply('weight-' + value);
				});

				editor.addButton('weightmenu', {
					type: 'menubutton',
					icon: 'bold',
					menu: weightArray
				});


				/*

					Line height menu

				*/
			
				var heightArray = [];
				var heightSizes = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4];

				$(heightSizes).each(function(index, value) {
					heightArray.push({
						text: value.toString(),
						onclick: function() {
							editor.execCommand('changeLineheight', true, value);
						}
					});
				});

				editor.addCommand('changeLineheight', function(ui, value) {
					editor.formatter.register('lineheight-' + value, {
						inline : 'span',
						styles : {lineHeight: value.toString()}
					});

					editor.formatter.apply('lineheight-' + value);
				});

				editor.addButton('lineheight', {
					type: 'menubutton',
					title: 'Междустрочный интевал',
					icon: 'lineheight',
					menu: heightArray
				});


				/*

					Letter spacing menu

				*/
			
				var lsArray = [];
				var lsSizes = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4];

				$(lsSizes).each(function(index, value) {
					lsArray.push({
						text: value.toString() + '  ',
						onclick: function() {
							editor.execCommand('changeLetterspacing', true, value);
						}
					});
				});

				editor.addCommand('changeLetterspacing', function(ui, value) {
					editor.formatter.register('letterspacing-' + value, {
						inline : 'span',
						styles : {letterSpacing: value.toString() + 'px'}
					});

					editor.formatter.apply('letterspacing-' + value);
				});

				editor.addButton('letterspacing', {
					type: 'menubutton',
					title: 'Междубуквенный интевал',
					icon: 'letterspacing',
					menu: lsArray
				});
			}
		});
		
	});
});