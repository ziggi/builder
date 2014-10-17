$(function() {

	$('.admin-editor .item-paragraph').on('click', function() {
		$('.admin-editor-wrapper').trigger('close');
		$('.admin-editor-add').addClass('admin-editor-active');

		$.element('add', 'widget/admin/item/paragraph/paragraph.html');
	});

});