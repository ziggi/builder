$(function() {

	$(document).on('inactive', '.widget', function(event) {
		$(this).removeClass('active');
		$(this).widgetResize('reset');
	});

	$(document).on('active', '.widget', function(event) {
		$(this).addClass('active');
	});

});
