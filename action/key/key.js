window.addEventListener('load', function() {

	var keyHandler = {};

	addKey = function(key, func) {
		keyHandler[key] = func;
	}

	document.addEventListener('keydown', function(event) {
		var isEdit = document.querySelectorAll('.widget-text-editing').length !== 0;
		if (isEdit) {
			return;
		}

		if (keyHandler[event.keyCode] != undefined) {
			if (keyHandler[event.keyCode]()) {
				event.preventDefault();
			}
		}
	});
});