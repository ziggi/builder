$(function() {

	$('#button-preview').on('click', function(e) {
		$.save();
		window.open('preview/index.html', '_blank');
	});

	$('#button-add').on('click', function() {
		$('.admin-editor-wrapper').height(100);
		$('.admin-editor-toolbar').trigger('toggle', 'admin-editor-add');
	});

	$('#button-setting').on('click', function() {
		$('.admin-editor-wrapper').height(100);
		$('.admin-editor-toolbar').trigger('toggle', 'admin-editor-setting');
	});

	$('.admin-editor-slider').on('click', function() {
		var isOpen = $(this).find('div').is('.toggle-open');

		if (isOpen) {
			$('.admin-editor-toolbar').trigger('close');
		} else {
			$('.admin-editor-toolbar').trigger('open');
		}
	});

	$(document).on('inactive', function(event) {
		var isPopup = $(event.target).parents('.page_blocks_popup').length !== 0;
		if (!isPopup) {
			$('.back-bar').hide();
		}
	});

	$('.back-bar .button-back, .back-bar .button-done').on('click', function() {
		$('.back-bar').hide();
		$('.admin-editor-toolbar').trigger('reset');
	});
	
	$('.controls-button').on({
		mouseenter: function() {
			$(this).addClass('controls-button-hover');
		},
		mouseleave: function() {
			$(this).removeClass('controls-button-hover');
		}
	});

	$('.admin-editor-toolbar').on({
		open: function() {
			$(this).find('.admin-editor-active').slideDown('fast');
			$(this).find('.admin-editor-slider div').removeClass('toggle-close').addClass('toggle-open');
		},
		close: function() {
			$(this).find('.admin-editor-active').slideUp('fast');
			$(this).find('.admin-editor-slider div').removeClass('toggle-open').addClass('toggle-close');
		},
		toggle: function(event, wrapperClass) {
			var isOpen = $('.admin-editor-slider').find('div').is('.toggle-open');
			var isActive = $('.admin-editor-active').hasClass(wrapperClass);

			$(this).trigger('close');
			$('.admin-editor-wrapper').removeClass('admin-editor-active');
			$('.' + wrapperClass).addClass('admin-editor-active');
			
			if (!isOpen || !isActive) {
				$(this).trigger('open');
				$('.' + wrapperClass).slideDown('fast');
			}
		},
		reset: function() {
			$('.admin-editor-wrapper').trigger('close');
			$('.admin-editor-wrapper').removeClass('admin-editor-active');

			$('.admin-editor-wrapper').height(100);
			$('.admin-editor-add').addClass('admin-editor-active');
		}
	});

});