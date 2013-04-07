
/* post kan */

seajs.use(['lib/swfupload', 'utils/tags-input'], function() {

	// 报刊名
	var kname = $('#kanName')
	kname.on('blur', function() {
		var val = $.trim($(this).val())
		if (val !== '' && /[a-z0-9\u4e00-\u9fa5_]/gi.test(val)) {
			kname.data('isValided', true)
		}
		else {
			kname.data('isValided', false)
		}
	})

	// 报刊分类
	var group = $('#kanGroup')

	// 报刊标签
	var tags = $('#kanTags')
	tags.tagsInput()

	// 添加描述
	var description = $('#kanDescription')
	description.click(function() {
		var _this = $(this); _this.blur()
		var descModal = $('#descriptionModal')
		descModal.delegate('', 'shown', function() {
			descModal.find('textarea').focus()
		})
		descModal.delegate('.modal-footer>button.btn-primary', 'click', function() {
			description.val(descModal.find('textarea').val())
			descModal.modal('hide')
		})
		descModal.modal()
	})

	// 上传封面
	var updateCover = $('#kanCover')
	updateCover.click(function() {
		
		$(this).blur()
		var updateCoverModal = $('#updateCoverModal')
		updateCoverModal.delegate('', 'shown', function() {

			if (updateCover.data('swfupload_is_loaded'))
				return

			var handlers = {
				loaded: function() {
					$(swfu.movieElement).css({
						'position': 'absolute',
						'left': 0,
						'top': 0,
						'height': '100%',
						'width': '100%'
					}).parent().css('position', 'relative')
					updateCover.data('swfupload_is_loaded', true)
				},

				dialogStart: function() {
					// TODO
				},

				fileQueued: function(file) {
					// TODO
				},

				fileQueuedError: function(file, err, msg) {
					// TODO
				},

				dialogComplete: function(fileId, queuedId, length) {
					this.startUpload()
				},

				uploadStart: function(file) {
					updateCoverModal.find('.modal-header>h3>span').text('(正在上传...)')
				},

				uploadProgress: function(file, curr, total) {
					// TODO
				},

				uploadError: function(file, err, msg) {
					// TODO
				},

				uploadSuccess: function(file, json, res) {
					json = JSON.parse(json)
					updateCoverModal.data('name', json.name)
					updateCoverModal.data('path', json.path)
					updateCoverModal.find('img.img-polaroid').attr('src', json.path)
					updateCoverModal.find('.modal-header>h3>span').text('(完成)')
				},

				uploadComplete: function(file) {
					// TODO
				}

			}

			var swfu = new SWFUpload({
				'upload_url': '/api/upload/temp/',
				'flash_url': '/flash/swfupload.swf',
				'file_post_name': 'image',
				'file_size_limit': '4048',
				'file_upload_limit': 10,
				'file_queued_limit': 1,
				'file_types': '*.jpg;*.jpeg;*.png;*.webp;*.gif',
				'button_placeholder_id': 'CoverUploadButton',
				'button_height': 0,
				'button_width': 0,
				'button_cursor': SWFUpload.CURSOR.HAND,
				'button_action': SWFUpload.BUTTON_ACTION.SELECT_FILE,
				'button_window_mode' : SWFUpload.WINDOW_MODE.TRANSPARENT,

				// handlers
				'swfupload_loaded_handler': handlers.loaded,
				'file_dialog_start_handler': handlers.dialogStart,
				'file_queued_handler': handlers.fileQueued,
				'file_queue_error_handler': handlers.fileQueuedError,
				'file_dialog_complete_handler': handlers.dialogComplete,
				'upload_start_handler': handlers.uploadStart,
				'upload_progress_handler': handlers.uploadProgress,
				'upload_success_handler': handlers.uploadSuccess
			})

		})
		
		updateCoverModal.delegate('.modal-footer>button.btn-primary', 'click', function() {
			updateCover.data('path', updateCoverModal.data('path'))
			updateCover.val(updateCoverModal.data('name'))
			updateCoverModal.modal('hide')
		})

		updateCoverModal.modal()
	})

	// 预览
	var previewButton = $('#preview')
	preview.click(function() {
		// TODO
	})

	// 创建
	var submitButton = $('#submit')
	submitButton.click(function() {
		if (!kname.data('isValided')) {
			kname.focus()
			return
		}
		$.post('/api/kan/', {
			name: kname.val(),
			group: group.val(),
			tags: tags.val(),
			description: description.val(),
			cover: updateCover.data('path')
		})
	})

})