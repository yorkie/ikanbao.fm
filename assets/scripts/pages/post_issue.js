
/* post issue */

seajs.use(['./post_issue_mgr'], function(Manager) {

	//var editor = new Editor()
	//editor.render('myEditor')

	var manager = new Manager({
		userRole: ENV.userRole
	})

	if (ENV.userRole == 0) {
		// 管理员
	}

	if (ENV.userRole == 1) {
		// 高级用户
	}

	else {
		// 个人用户
	}

})