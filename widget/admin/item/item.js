(function( $ ) {

	var elementId = 0;

	var methods = {
		add: function(page) {
			elementId++;

			$.get(page, function(data) {
				$(data)
					.appendTo('.block_inner:first')
					.attr('id', 'element-' + elementId)
					.find('.widget-inner').css('z-index', 1)
					.trigger('active');
			});
		},

		clone: function() {
			elementId++;

			this.trigger('inactive');

			this.clone()
				.attr('id', 'element-' + elementId)
				.css({left: '50%', top: '50%'})
				.appendTo($(this).parent())
				.trigger('active');
		},

		remove: function() {
			this.remove();
		},

		getLastId: function() {
			return elementId;
		}
	};

	$.fn.element = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод "' +  method + '" не найден в плагине jQuery.element' );
		}
	};

	$.element = $.fn.element;

	$(function() {
		$('[id^="element-"]').each(function(index, value) {

			var id = $(this).attr('id').match(/^element\-(\d)$/)[1];

			if (id > elementId) {
				elementId = id;
			}
		});
	});

})(jQuery);