$(function() {

	$('div').bind('inactive', function(event) {
		$('.widget').removeClass('active');
		$('.widget-text-editor').trigger('editStop');
		$('.widget').widgetResize('reset');
		$('.widget-editor').remove();
	});

	$(document).on('mousedown', '.widget-inner', function() {
		$widget = $(this).parents('.widget');

		var isEditing = $widget.data('editing');

		if (isEditing) {
			return;
		}

		$widget.trigger('inactive');
		
		if ($widget.hasClass('widget-text')) {
			$widget.widgetResize('init', 'side');
		} else {
			$widget.widgetResize('init');
		}

		$widget.addClass('active');
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