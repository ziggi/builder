$(function() {

	$(document).on('editor-link', function() {
		$('.widget-editor .menu').hide();
		$('.link-manager').remove();

		var isActionCreated = false;

		var $popup = $('.page_blocks_popup').find('[data-id=' + $('.widget.active').attr('id') + ']');

		if ($popup.length !== 0) {
			isActionCreated = true;
		}

		if (isActionCreated) {
			var isCreated = $('.link-menu').length !== 0;
			if (!isCreated) {
				$.get('widget/editor/link/edit.html', function(data) {
					$(data)
						.appendTo('.widget-editor')
						.show();
				});
			} else {
				$('.link-menu').show();
			}
		} else {
			var isCreated = $('.link-menu').length !== 0;
			if (!isCreated) {
				$.get('widget/editor/link/add.html', function(data) {
					$(data)
						.appendTo('.widget-editor')
						.show();
				});
			} else {
				$('.link-menu').show();
			}
		}
	});

	$(document).on('click', '.widget-editor .link-menu', function(event) {
		var editor_action = $(event.target).attr('editor-action');

		if (editor_action === undefined) {
			return;
		}

		$(this).trigger(editor_action);
	});

	/*
		buttons
	 */

	$(document).on('back', '.widget-editor .link-menu', function() {
		$('.link-menu').hide();

		var isTextEditing = $('#text-edit').length !== 0;
		if (isTextEditing) {
			$(this).trigger('textEditorShow');
		} else {
			$(this).parents('.widget').trigger('editor-menu');
		}
	});

	$(document).on('url', '.widget-editor .link-menu', function() {
		$(this).trigger('editor-url');
	});
	
	$(document).on('popup', '.widget-editor .link-menu', function() {
		$(this).trigger('popupShow');
	});
	
	$(document).on('download', '.widget-editor .link-menu', function() {
		console.log('download');
	});
	
	$(document).on('remove', '.widget-editor .link-menu', function() {
		console.log('remove');
	});

	$(document).on('action-remove', '.widget-editor .link-menu', function() {
		var $popup = $('.page_blocks_popup').find('[data-id=' + $('.widget.active').attr('id') + ']');
		var isCreated = $popup.length !== 0;

		if (isCreated) {
			$popup.remove();
			$(document).trigger('editor-link');
		}
	});
});