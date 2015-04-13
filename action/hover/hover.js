window.addEventListener('load', function() {
	[].forEach.call(document.querySelectorAll('.widget'), function(element) {
		element.addEventListener('mouseenter', function() {
			var isActive = this.querySelectorAll('.widget.active').length !== 0;
			if (!isActive) {
				this.classList.add('hover');
			}
		});

		element.addEventListener('mouseleave', function() {
			this.classList.remove('hover');
		});
	});
});