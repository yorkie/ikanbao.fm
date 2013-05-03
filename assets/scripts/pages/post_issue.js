
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

	var buttons = {
		post: $('post-btn'),
		preview: $('preview-btn')
	}

	buttons.post.on('click', function(e) {
		// TODO
	})

	buttons.preview.on('click', function(e) {
		// TODO
	})

})