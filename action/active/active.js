$(function() {

	$(document).on('mousedown', '.widget-inner', function() {
		$widget = $(this).parents('.widget');

		var isEditing = $widget.data('editing');

		if (isEditing) {
			return;
		}

		$widget.trigger('inactive');
		$widget.trigger('active');
	});

	$(document).on('mouseup', '.widget-inner', function() {
		$widget = $(this).parents('.widget');

		var isEditing = $widget.data('editing');
		
		if (isEditing) {
			return;
		}

		$.ajax({
			url: "widget/editor/editor.html",
			cache: false,
			success: function(data) {
				$widget.append(data);
			},
		});
	});

	$(document).on('click', function(event) {
		var isWidget = $(event.target).parents('.widget').is('.widget');
		var isWidgetEditor = $(event.target).parents('.widget-editor').is('.widget-editor');
		var isEditing = $(event.target).parents('.widget').data('editing');
		var isCKEditing = $(event.target).parents('#cke_ckedit').is('div');

		if (!isWidget && !isWidgetEditor && !isEditing && !isCKEditing) {
			$('.widget').trigger('inactive');
		}
	});

});