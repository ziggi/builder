(function( $ ) {

	var methods = {
		check: function(objInfo) {
			$(objInfo.verticalGuides).each(function(guideIndex, guidePos) {
				var isContinue = true;

				$(objInfo.verticalObjs).each(function(objIndex, objPos) {
					if (objPos > guidePos - 2 && objPos < guidePos + 2) {
						$.guide('vertical', guidePos);
						isContinue = false;
						return false;
					} else {
						$.guide('hide', 'vertical');
					}
				});

				return isContinue;
			});

			$(objInfo.horizontalGuides).each(function(guideIndex, guidePos) {
				var isContinue = true;

				$(objInfo.horizontalObjs).each(function(objIndex, objPos) {
					if (objPos > guidePos - 2 && objPos < guidePos + 2) {
						$.guide('horizontal', guidePos - $(window).scrollTop());
						isContinue = false;
						return false;
					} else {
						$.guide('hide', 'horizontal');
					}
				});

				return isContinue;
			});
		},
		hide: function(type) {
			if (type === undefined) {
				$('.guide-horizontal').hide();
				$('.guide-vertical').hide();
			} else {
				$('.guide-' + type).hide();
			}
		},
		vertical: function(posX) {
			$('.guide-vertical')
				.css('left', posX)
				.show();
		},
		horizontal: function(posY) {
			$('.guide-horizontal')
				.css('top', posY)
				.show();
		}
	};

	$.guide = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод "' +  method + '" не найден в плагине jQuery.guide' );
		}
	};

})(jQuery);