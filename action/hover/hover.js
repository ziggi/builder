window.addEventListener('load', function() {
	var elements = document.querySelectorAll('.widget');

	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener('mouseenter', function() {
			var isActive = this.querySelectorAll('.widget.active').length !== 0;
			if (!isActive) {
				this.classList.add('hover');
			}
		});

		elements[i].addEventListener('mouseleave', function() {
			this.classList.remove('hover');
		});
	}
});