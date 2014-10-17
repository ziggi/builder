$(function() {

	$('.admin-editor .item-button').on('click', function() {
		$('.admin-editor-wrapper').trigger('close');
		$('.admin-editor-add').addClass('admin-editor-active');

		$.addElement('widget/admin/item/button/button.html');
	});

});