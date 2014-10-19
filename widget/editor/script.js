$(function() {

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
		$(this).trigger('editor-link');
	});

	$(document).on('edit', '.widget', function() {
		console.log('edit');
	});

});
