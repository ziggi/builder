$(function() {
	
	$.addKey(83, function() {
		$.get('save.php', {page: $('.container').html()}, function(data) {
			console.log('Server response: ' + data);
		});
	});

});