$(function() {

	$(document).on('inactive', '.widget', function(event) {
		$('.widget-editor').remove();
	});

	$(document).on('active', '.widget', function() {
		$(this).trigger('editor-menu');
	});

	$(document).on('editor-menu', '.widget', function(event) {
		$widget = $(this);
		var isCreated = $('.widget-editor').length !== 0;

		if (!isCreated) {
			$.ajax({
				url: "widget/editor/editor.html",
				cache: false,
				success: function(data) {
					var $editor = $(data);

					$editor
						.appendTo($widget)
						.show();

					var isText = $widget.is('.widget-text');
					var isHeadline = $widget.is('.widget-headline');

					if (isText || isHeadline) {
						$editor.find('.url-button').hide();
					}

					$('.widget-editor .menu').show();
				},
			});
		} else {
			$('.widget-editor .menu').show();
		}
	});

	$(document).on('click', '.widget', function(event) {
		var editor_action = $(event.target).attr('editor-action');
		if (editor_action === undefined) {
			return;
		}

		$(this).trigger(editor_action);
	});

	/*
		buttons
	 */

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

		var isDisabled = !$widget_inner.element('arrange', '-=1');
		if (isDisabled) {
			$('.arrange-backward-button').addClass('disabled');
		}
	});

	$(document).on('arrange-forward', '.widget', function() {
		$widget_inner = $(this).find('.widget-inner');
		
		var isEnabled = $widget_inner.element('arrange', '+=1');
		if (isEnabled) {
			$('.arrange-backward-button').removeClass('disabled');
		}
	});

	$(document).on('arrange-done', '.widget', function() {
		$('.arrange-widget-position').hide();
		$(this).trigger('editor-menu');
	});

	$(document).on('click-action', '.widget', function() {
		$(this).trigger('editor-link');
	});
});
