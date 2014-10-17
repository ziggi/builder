(function( $ ){

	var elementId = 0;

	$.getLastElementId = function() {
		return elementId;
	}

	$.addElement = function(page) {
		elementId++;

		$.get(page, function(data) {
			$(data).appendTo('.block_inner:first').attr('id', 'element-' + elementId);
		});
	}
	
	$(function() {
		$('[id^="element-"]').each(function(index, value) {

			var id = $(this).attr('id').match(/^element\-(\d)$/)[1];

			if (id > elementId) {
				elementId = id;
			}
			console.log(elementId);
		});
	});

})(jQuery);