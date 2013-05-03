
/* post issue */

seajs.use(['widgets/ueditor', 'widgets/uploader'], function(Editor, Uploader) {

	if (ENV.userRole == 0) {
		// 管理员
		var editor = new Editor()
		editor.render('myEditor')
	}

	if (ENV.userRole == 1) {
		// 高级用户
		var uploader = new Uploader('pdf')
		uploader.render('myEditor', function(data) {
			$('#issue-content').data('value', data.path)
		})
	}

	else {
		// 个人用户
	}

	var buttonsGroup = $('.issue-btns')
	var handlers = {
		// post an issue
		post: function(e) {

			var self = jQuery(this)
			var butt = self.children('.btn')
			butt.button('loading')
			if (!jQuery('#issue-content').data('value')) {
				jQuery('#myModal-01').modal('show')
				jQuery('#myModal-01').on('hidden', function() {
					butt.button('reset')
				})
				return;
			}

			// post
			jQuery.post('/api/issue/', {
				'title': jQuery('#issue-title').val(),
				'kanId': jQuery('#issue-kanId').val(),
				'content': jQuery('#issue-content').data('value'),
				'date': +new Date,
				'type': ENV.userRole
			}).done(function() {
				location.href = '/'
			})

		},
		// preview the current issue
		preview: function(e) {

		}
	}

	buttonsGroup.delegate('#post-btn', 'click', handlers.post)
	buttonsGroup.delegate('#preview-btn', 'click', handlers.preview)

});