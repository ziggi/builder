$(function() {

	$('.admin-editor .item-button').on('click', function() {
		$('.admin-editor-wrapper').trigger('close');
		$('.admin-editor-add').addClass('admin-editor-active');

		$.element('add', 'widget/admin/item/button/button.html');
	});

});