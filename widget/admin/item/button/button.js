$(function() {

	var elementId = 8;

	$('.admin-editor .item-button').on('click', function() {
		$('.admin-editor-wrapper').trigger('close');
		$('.admin-editor-add').addClass('admin-editor-active');

		$.get('widget/admin/item/button/button.html', function(data) {
			$(data).appendTo('.block_inner:first').attr('id', 'element-' + elementId);
		});

		elementId++;
	});

});