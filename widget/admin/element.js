(function( $ ) {

	var elementId = 0;

	var methods = {
		add: function(page) {
			elementId++;

			var element_on_point = document.elementFromPoint($(window).width() / 2, $(window).height() / 2);
			var $block_inner = $(element_on_point).parents('.page_block').find('.block_inner');

			if ($block_inner.length === 0) {
				$block_inner = $(element_on_point).find('.block_inner');
			}

			$.get(page, function(data) {
				$widget = $(data).appendTo($block_inner);

				$widget
					.attr('id', 'element-' + elementId)
					.css({
						left: '50%',
						top: '50%'
					})
					.css({
						left: '-=' + $widget.width() / 2,
						top: '-=' + $widget.height() / 2
					})
					.find('.widget-inner').css('z-index', 1)
					.trigger('active');
			});
		},

		clone: function() {
			elementId++;

			this.trigger('inactive');

			this.clone()
				.appendTo($(this).parent())
				.attr('id', 'element-' + elementId)
				.css({
					left: '50%',
					top: '50%'
				})
				.css({
					left: '-=' + this.width() / 2,
					top: '-=' + this.height() / 2
				})
				.trigger('active');
		},

		arrange: function(value) {
			this.css('z-index', value);

			if (parseInt(this.css('z-index')) <= 0) {
				this.css('z-index', 0);
				return 0;
			}
			return 1;
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

			var id = $(this).attr('id').match(/^element\-(\d+)$/)[1];

			if (id > elementId) {
				elementId = id;
			}
		});
	});

})(jQuery);