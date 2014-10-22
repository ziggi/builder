(function( $ ) {

	$.save = function() {
		var minifyPage = $('.container').clone();
		minifyPage
			.removeClass('container_builder')
			.find('.resize-line, .resize-block, .widget-editor').remove();

		$.ajax({
			type: 'POST',
			async: false,
			cache: false,
			url: 'save.php',
			data: {
				page: $('.container').html()
			},
			success: function(data) {
				console.log('Server response 1: ' + data);
			}
		});

		$.ajax({
			type: 'POST',
			async: false,
			cache: false,
			url: 'makepreview.php',
			data: {
				page: minifyPage.html()
			},
			success: function(data) {
				console.log('Server response 2: ' + data);
			}
		});
	};

})(jQuery);