$(function() {

	$(document).on('mouseenter', '.widget', function() {
		var isActive = $('.widget.active').length !== 0;
		if (!isActive) {
			$(this).addClass('hover');
		}
	});
	
	$(document).on('mouseleave', '.widget', function() {
		$(this).removeClass('hover');
	}); 

});