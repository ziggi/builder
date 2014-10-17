$(function() {

	$(document).on('editor-link', function() {
		$('.widget-editor .menu').hide();

		var isCreated = $('.link-menu').is('ul');

		if (!isCreated) {
			$.get('widget/editor/link/add.html', function(data) {
				$('.widget-editor').append(data);
			});
		}

		$('.link-menu').show();
	});

	$(document).on('click', '.widget-editor .link-menu', function(event) {
		var editor_action = $(event.target).attr('editor-action');

		if (editor_action === undefined) {
			return;
		}

		$(this).trigger(editor_action);
	});

	$(document).on('back', '.widget-editor .link-menu', function() {
		$('.link-menu').hide();
		$('.widget-editor .menu').show();
	});

	$(document).on('url', '.widget-editor .link-menu', function() {
		$(this).trigger('editor-url');
	});
	
	$(document).on('popup', '.widget-editor .link-menu', function() {
		console.log('popup');
	});
	
	$(document).on('download', '.widget-editor .link-menu', function() {
		console.log('download');
	});
	
	$(document).on('remove', '.widget-editor .link-menu', function() {
		console.log('remove');
	});


});