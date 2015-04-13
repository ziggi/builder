window.addEventListener('load', function() {

	addKey(8, function() {
		$('.active').trigger('delete');
		return true;
	});

	addKey(46, function() {
		$('.active').trigger('delete');
		return true;
	});
	
	addKey(83, function() {
		$.save();
	});

});