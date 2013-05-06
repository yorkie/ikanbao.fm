
/* kan */

seajs.use(['utils/fixed', 'widgets/uploader'], function(Fixed, Uploader) {

	// fixed
	Fixed('#kan-info', 20);

	// main code start
	var kanInfoElem = $('#kan-info');
	var kanInfoModalElem = $('#kan-info-modal');
	
	kanInfoElem.delegate('.edit-btn', 'click', function (e) {
		kanInfoModalElem.modal('show');
	})
	kanInfoElem.delegate('.subscribe-btn', 'click', function (e) {
		// TODO
	})
	kanInfoModalElem.delegate('.btn-primary', 'click', function (e) {
		var self = $(this);
		self.button('loading');
		$.post('/api/kan/' + ENV.page.kanId, {
			'group': kanInfoModalElem.find('p.group>select').val(),
			'description': kanInfoModalElem.find('p.desc>textarea').val(),
			'tags': kanInfoModalElem.find('p.tags>textarea').val()
		}).done(function (data) {
			kanInfoModalElem.modal('hide');
		})
	})

	kanInfoModalElem.on('hidden', function (e) {
		location.href = location.href;
	})


})