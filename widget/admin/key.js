$(function() {

	$.addKey(8, function() {
		var isEdit = $('.widget-text-editing').is('div');
		if (isEdit) {
			return;
		}

		$('.active').trigger('delete');
		return false;
	});

	$.addKey(46, function() {
		var isEdit = $('.widget-text-editing').is('div');
		if (isEdit) {
			return;
		}

		$('.active').trigger('delete');
		return false;
	});

});