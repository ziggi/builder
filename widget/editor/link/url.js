$(function() {

	$(document).on('editor-url', function() {
		$('.link-menu').hide();

		var isCreated = $('.link-url').is('ul');

		if (!isCreated) {
			$.get('widget/editor/link/url.html', function(data) {
				$(data)
					.appendTo('.widget-editor')
					.addClass('widget-text-editing')
					.show();
			});
		} else {
			$('.link-url').addClass('widget-text-editing');
			$('.link-url').show();
		}
	});

	$(document).on('click', '.widget-editor .link-url', function(event) {
		var editor_action = $(event.target).attr('editor-action');

		if (editor_action === undefined) {
			return;
		}

		$(this).trigger(editor_action);
	});

	$(document).on('done', '.widget-editor .link-url', function() {
		$('.link-url').removeClass('widget-text-editing');
		$('.link-url').hide();

		var isTextEditing = $('#text-edit').length !== 0;
		if (isTextEditing) {
			$(this).trigger('textEditorShow');
		} else {
			$(this).parents('.widget').trigger('editor-menu');
		}
	});

	$(document).on('click', '.link-options li', function() {
		var isSelected = $(this).hasClass('selected');

		if (isSelected) {
			$(this).removeClass('selected');
		} else {
			$(this).addClass('selected');
		}
	});

});