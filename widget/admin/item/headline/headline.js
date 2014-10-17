$(function() {

	$('.admin-editor .item-headline').on('click', function() {
		$('.admin-editor-wrapper').trigger('close');
		$('.admin-editor-add').addClass('admin-editor-active');

		$.element('add', 'widget/admin/item/headline/headline.html');
	});

});