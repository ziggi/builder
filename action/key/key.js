(function( $ ){

	var keyHandler = {};

	$.addKey = function(key, func) {
		keyHandler[key] = func;
	}

	$(document).on('keydown', function(event) {
		var isEdit = $('.widget-text-editing').length !== 0;
		if (isEdit) {
			return;
		}

		if (keyHandler[event.keyCode] != undefined) {
			return keyHandler[event.keyCode]();
		}
	});
})(jQuery);