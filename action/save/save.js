(function( $ ) {

	$.save = function() {
		$.post('save.php', {page: $('.container').html()}, function(data) {
			console.log('Server response: ' + data);
		});

		var minifyPage = $('.container').clone();
		minifyPage
			.removeClass('container_builder')
			.find('.resize-line, .resize-block, .widget-editor').remove();

		$.post('makepreview.php', {page: minifyPage.html()}, function(data) {
			console.log('Server response: ' + data);
		});
	};

})(jQuery);