$(function() {

	$(document).on('mouseenter', '.widget', function() {
		$(this).addClass('hover');
	});
	
	$(document).on('mouseleave', '.widget', function() {
		$(this).removeClass('hover');
	}); 

});