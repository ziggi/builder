$(function() {

	$.addKey(8, function() {
		$('.active').trigger('delete');
		return false;
	});

	$.addKey(46, function() {
		$('.active').trigger('delete');
		return false;
	});
	
	$.addKey(83, function() {
		$.save();
	});

});