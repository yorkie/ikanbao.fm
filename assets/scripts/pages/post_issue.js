
/* post issue */

seajs.use(['widgets/ueditor', 'widgets/uploader'], function(Editor, Uploader, PDF) {

	if (ENV.userRole == 0) {
		// 管理员
		var editor = new Editor()
		editor.render('myEditor')
	}

	if (ENV.userRole == 1) {
		// 高级用户
		var uploader = new Uploader('pdf')
		uploader.render('myEditor')
	}

	else {
		// 个人用户
	}

	var buttonsGroup = $('.issue-btns')
	var handlers = {
		// post an issue
		post: function(e) {

			var dataForPost = {
				'title': null,
				'type': null,
				'content': null,
				'date': null,
				'kanId': null
			}
			// TODO

		},
		// preview the current issue
		preview: function(e) {

		}
	}

	buttonsGroup.delegate('#post-btn', 'click', handlers.post)
	buttonsGroup.delegate('#preview-btn', 'click', handlers.preview)

});