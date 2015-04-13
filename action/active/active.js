window.addEventListener('load', function() {
	[].forEach.call(document.querySelectorAll('.widget-inner'), function(element) {
		element.addEventListener('mousedown', function() {
			var widget = this.parentNode;

			var isTextEditing = widget.querySelectorAll('.widget-text-editing').length !== 0;
			if (isTextEditing) {
				return;
			}

			$('.widget.active').trigger('inactive');
			$(widget).trigger('active');
		});
	});

	document.addEventListener('mousedown', function(event) {
		var isWidget = event.target.parents('.widget').length !== 0;
		var isWidgetEditor = event.target.parents('.widget-editor').length !== 0;
		//var isTextEditing = event.target.parents('.widget-text-editing').length !== 0;
		var isTextEditing = event.target.parents('[id^="mceu_"]').length !== 0 || event.target.querySelectorAll('[id^="mceu_"]').length !== 0;
		var isAdminClick = event.target.parents('.admin-editor').length !== 0;
		var isPalette = event.target.parents('.sp-container').length !== 0;

		if (!isWidget && !isWidgetEditor && !isTextEditing && !isAdminClick && !isPalette) {
			$('.widget.active').trigger('inactive');
		}
	});
});