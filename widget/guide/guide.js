(function( $ ) {

	var methods = {
		check: function(objInfo) {
			for (var i in objInfo.verticalGuides) {
				var guidePos = objInfo.verticalGuides[i];

				for (var j in objInfo.verticalObjs) {
					var objPos = objInfo.verticalObjs[j];

					if (objPos > guidePos - 2 && objPos < guidePos + 2) {
						$.guide('vertical', guidePos);
						return false;
					} else {
						$.guide('hide', 'vertical');
					}
				}
			}
			for (var i in objInfo.horizontalGuides) {
				var guidePos = objInfo.horizontalGuides[i];

				for (var j in objInfo.horizontalObjs) {
					var objPos = objInfo.horizontalObjs[j];

					if (objPos > guidePos - 2 && objPos < guidePos + 2) {
						$.guide('horizontal', guidePos - $(window).scrollTop());
						return false;
					} else {
						$.guide('hide', 'horizontal');
					}
				}
			}
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