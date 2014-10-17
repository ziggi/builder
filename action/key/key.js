(function( $ ){

	var keyHandler = {};

	$.addKey = function(key, func) {
		keyHandler[key] = func;
	}

	$(document).on('keydown', function(event) {
		if (keyHandler[event.keyCode] != undefined) {
			return keyHandler[event.keyCode]();
		}
	});
})(jQuery);