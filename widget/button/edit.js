$(function() {

	$(document).on('edit', '.widget-button', function() {

		$('.admin-editor-toolbar').trigger('toggle', 'admin-editor-button');

	});

});