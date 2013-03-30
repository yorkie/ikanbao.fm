
/* post kan */

seajs.use(['lib/swfupload', 'utils/tags-input'], function() {

	// 报刊标签
	var tags = $('#kanTags')
	tags.tagsInput()

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

		var updateCoverModal = $('#updateCoverModal')
		updateCoverModal.on('shown', function() {

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

				},

				uploadStart: function(file) {
					console.log(file)
				},

				error: function(file, err, msg) {
					console.log(arguments)
				}

			}

			var swfu = new SWFUpload({
				'upload_url': '/api/upload/temp',
				'flash_url': '/flash/swfupload.swf',
				'file_size_limit': '4048',
				'file_types': '*.jpg;*.jpeg;*.png;*.webp;*.gif',
				'button_placeholder_id': 'CoverUploadButton',
				'button_height': 0,
				'button_width': 0,
				'button_cursor': SWFUpload.CURSOR.HAND,
				'button_window_mode' : SWFUpload.WINDOW_MODE.TRANSPARENT,

				// handlers
				'swfupload_loaded_handler': handlers.loaded,
				'upload_start_handler': handlers.uploadStart
			})

		})
		updateCoverModal.modal()

	})

})