(function( $ ) {

	var defaults = 'all';
	var types = {
		all: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
		side: ['w', 'e']
	};

	var methods = {
		init: function(type) {
			if (type === undefined) {
				type = defaults;
			}

			var $self = $(this);

			$.each(types[type], function(index, value) {
				$self.append('<div class="resize-block resize-block-' + value + '"></div>');
			});
		},

		reset: function() {
			$(this).find('.resize-block').remove();
		}
	};

	$.fn.widgetResize = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод "' +  method + '" не найден в плагине jQuery.widgetResize' );
		}
	};

	$(document).on('mousedown', '.resize-block', function(event) {
		var isNotLeftClick = event.which !== 1;

		if (isNotLeftClick) {
			event.stopImmediatePropagation();
			return false;
		}
	});
})(jQuery);