$(function() {

	$('.admin-editor-slider').on('click', function() {
		var isOpen = $(this).find('div').is('.toggle-open');

		if (isOpen) {
			$(this).parents('.admin-editor-toolbar').find('.admin-editor-active').slideUp('fast');
			$(this).find('div').removeClass('toggle-open').addClass('toggle-close');
		} else {
			$(this).parents('.admin-editor-toolbar').find('.admin-editor-active').slideDown('fast');
			$(this).find('div').removeClass('toggle-close').addClass('toggle-open');
		}
	});
	
	$('.controls-button').on('mouseenter', function() {
		$(this).addClass('controls-button-hover');
	});

	$('.controls-button').on('mouseleave', function() {
		$(this).removeClass('controls-button-hover');
	});

	$('#button-add').on('click', function() {
		var isOpen = $('.admin-editor-slider').find('div').is('.toggle-open');
		var isActive = $('.admin-editor-active').hasClass('admin-editor-add');

		$('.admin-editor-wrapper').trigger('close');
		$('.admin-editor-add').addClass('admin-editor-active');

		if (!isOpen || !isActive) {
			$('.admin-editor-wrapper').trigger('open');
			$('.admin-editor-add').slideDown('fast');
		}
	});

	$('#button-setting').on('click', function() {
		var isOpen = $('.admin-editor-slider').find('div').is('.toggle-open');
		var isActive = $('.admin-editor-active').hasClass('admin-editor-setting');

		$('.admin-editor-wrapper').trigger('close');
		$('.admin-editor-setting').addClass('admin-editor-active');

		if (!isOpen || !isActive) {
			$('.admin-editor-wrapper').trigger('open');
			$('.admin-editor-setting').slideDown('fast');
		}
	});

	$('.admin-editor-wrapper').bind('open', function() {
		$('.admin-editor-wrapper').slideUp('fast');
		$('.admin-editor-slider').find('div').removeClass('toggle-close').addClass('toggle-open');
	});

	$('.admin-editor-wrapper').bind('close', function() {
		$('.admin-editor-wrapper').removeClass('admin-editor-active');
		$('.admin-editor-wrapper').slideUp('fast');
		$('.admin-editor-slider').find('div').removeClass('toggle-open').addClass('toggle-close');
	});

});