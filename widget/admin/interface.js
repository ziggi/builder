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

	$('.admin-editor-wrapper').bind('open', function() {
		$('.admin-editor-wrapper').slideUp('fast');
		$('.admin-editor-slider').find('div').removeClass('toggle-close').addClass('toggle-open');
	});

	$('.admin-editor-wrapper').bind('close', function() {
		$('.admin-editor-wrapper').removeClass('admin-editor-active');
		$('.admin-editor-wrapper').slideUp('fast');
		$('.admin-editor-slider').find('div').removeClass('toggle-open').addClass('toggle-close');
	});

	$('.admin-editor-toolbar').on('toggle', function(event, wrapperClass) {
		var isOpen = $('.admin-editor-slider').find('div').is('.toggle-open');
		var isActive = $('.admin-editor-active').hasClass(wrapperClass);

		$('.admin-editor-wrapper').trigger('close');
		$('.' + wrapperClass).addClass('admin-editor-active');
		
		if (!isOpen || !isActive) {
			$('.admin-editor-wrapper').trigger('open');
			$('.' + wrapperClass).slideDown('fast');
		}
	});

	$('.admin-editor-toolbar').on('reset', function() {
		$('.admin-editor-wrapper').trigger('close');
		$('.admin-editor-wrapper').removeClass('admin-editor-active');

		$('.admin-editor-wrapper').height(100);
		$('.admin-editor-add').addClass('admin-editor-active');
	});

});