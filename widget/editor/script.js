$(function() {

	CKEDITOR.config.language = 'en';
	CKEDITOR.config.extraPlugins = 'ckeditor-gwf-plugin';
	CKEDITOR.config.font_names = CKEDITOR.config.font_names + '; Open Sans; Seymour One; Ubuntu Mono; Fira Sans; Noto Sans; Playfair Display; Lora; PT Sans; Poiret One; Andika; Fira Mono; PT Sans Narrow; Tinos; Philosopher; Neucha; Bad Script; Istok Web; Yeseva One; Arimo; Kelly Slab; Noto Serif; Ubuntu; Ruslan Display; PT Serif Caption; PT Mono; Marck Script; Tenor Sans; Oranienbaum; PT Serif; Lobster; Russo One; Underdog; Cousine; Ubuntu Condensed; EB Garamond; Roboto Slab; Marmelad; Jura; Forum; Didact Gothic; Playfair Display SC; Anonymous Pro; Comfortaa; Prosto One; Stalinist One; Press Start 2P; Scada; Cuprum; Exo 2; PT Sans Caption; Roboto Condensed; Play; Ledger; Open Sans; Open Sans Condensed; Roboto;';
	CKEDITOR.disableAutoInline = true;
	
	$(document).on('inactive', '.widget', function(event) {
		$('.widget-editor').remove();
	});

	$(document).on('active', '.widget', function() {
		$widget = $(this);
		$.ajax({
			url: "widget/editor/editor.html",
			cache: false,
			success: function(data) {
				$widget.append(data);
			},
		});
	});

	$(document).on('click', '.widget', function(event) {
		var editor_action = $(event.target).attr('editor-action');

		if (editor_action === undefined) {
			return;
		}

		$(this).trigger(editor_action);
	});

	$(document).on('delete', '.widget', function() {
		$(this).element('remove');
	});

	$(document).on('copy', '.widget', function() {
		$(this).element('clone');
	});

	$(document).on('arrange', '.widget', function() {
		$('.widget-editor .menu').hide();
		$('.arrange-widget-position').show();

		$widget_inner = $(this).find('.widget-inner');

		if (parseInt($widget_inner.css('z-index')) <= 0) {
			$('.arrange-backward-button').addClass('disabled');
		}
	});

	$(document).on('arrange-backward', '.widget', function() {
		$widget_inner = $(this).find('.widget-inner');

		if (parseInt($widget_inner.css('z-index')) <= 0) {
			$('.arrange-backward-button').addClass('disabled');
			return;
		}

		$widget_inner.css('z-index', '-=1');
	});

	$(document).on('arrange-forward', '.widget', function() {
		$widget_inner = $(this).find('.widget-inner');

		$widget_inner.css('z-index', '+=1');

		if (parseInt($widget_inner.css('z-index')) >= 0) {
			$('.arrange-widget-position li').removeClass('disabled');
		}
	});

	$(document).on('arrange-done', '.widget', function() {
		$('.arrange-widget-position').hide();
		$('.widget-editor .menu').show();
	});

	$(document).on('click-action', '.widget', function() {
		console.log('click-action');
	});

	$(document).on('edit', '.widget', function() {
		console.log('edit');
	});

});
