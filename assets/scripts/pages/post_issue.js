
/* post issue */

seajs.use(['widgets/ueditor', 'widgets/uploader'], function(Editor, Uploader) {

	console.log(arguments)

	if (ENV.userRole == 1) {
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

})