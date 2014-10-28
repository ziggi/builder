(function( $ ) {

	$.save = function() {
		var minifyPage = $('.container').clone();
		minifyPage
			.removeClass('container_builder')
			.find('.page_blocks_popup').hide()
			.find('.resize-line, .resize-block, .widget-editor, div[class^="resize-line"], .guide-x, .guide-y').remove();

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