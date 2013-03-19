
/* post */

seajs.use([], function() {

	// 添加描述
	var description = $('#kanDescription')
	description.focus(function() {
		var _this = $(this); _this.blur()
		var descModal = $('#descriptionModal')
		descModal.modal()
		descModal.find('textarea').focus().text(_this.blur().text())
	})

	// 上传封面
	var updateCover = $('#kanCover')
	updateCover.click(function() {
		$(this).blur()
		$('#updateCoverModal').modal()
	})

})