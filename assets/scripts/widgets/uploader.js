
/* PDF Uploader */

define('widgets/uploader', ['lib/swfupload', 'utils/pdf-reader'], function(require, exports, module) {

	/* PDF Uploader */

	var PdfUploader = function(option) {
		for (property in option)
			this.option[property] = option[property];
	}

	PdfUploader.prototype = {
		targetElem: null,
		option: {
			'frameHeight': 100
		}
	}

	PdfUploader.prototype.render = function(elemId, fn) {
		var self = this
		this.targetElem = $('#' + elemId)
		this.targetElem.height(this.option.frameHeight)
		this.targetElem.css('cursor', 'pointer').html('')

		function displayUI() {
			var oldElem = self.targetElem
			var newElem = $('<div></div>').css({
				'background': '#fff',
				'text-align': 'center',
				'vertical-align': 'middle',
				'line-height': oldElem.css('height'),
				'height': '100%',
				'width': '95%',
				'border': oldElem.css('border'),
				'padding': oldElem.css('padding')
			})
			var btn = $('<a class="btn btn-large btn-primary" data-loading-text="正在上传...">上传本期报刊(PDF)</a><div id="swfupload-btn"></div>')
			btn.appendTo(newElem)
			oldElem.replaceWith(newElem)

			// swfupload part
			var handlers = {
				loaded: function() {
					$(swfu.movieElement).css({
						'position': 'absolute',
						'cursor': 'pointer',
						'height': btn.height(),
						'width': btn.width(),
						'padding': btn.css('padding'),
						'top': btn.position().top,
						'left': btn.position().left
					})
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
					if (length != 0) {
						this.startUpload()
					}
				},

				uploadStart: function(file) {
					btn.button('loading')
				},

				uploadProgress: function(file, curr, total) {
					// TODO
				},

				uploadError: function(file, err, msg) {
					// TODO
				},

				uploadSuccess: function(file, json, res) {
					if (!res) return
					var data = JSON.parse(json)
					var PDFReader = require('utils/pdf-reader')
					var reader = new PDFReader(data.path, 1.0)
					reader.getPage(1, function (page) {
						var canvas = document.createElement('canvas');
						canvas.style.width = '100%';
						newElem.html(canvas);
						page.render(canvas);
					})
					fn(data);
				},

				uploadComplete: function(file) {
					fn.call(this, file)
				}

			},
			
			swfu = new SWFUpload({
				'upload_url': '/api/upload/temp/',
				'flash_url': '/flash/swfupload.swf',
				'file_post_name': 'image',
				'file_size_limit': '4048',
				'file_upload_limit': 10,
				'file_queued_limit': 1,
				'file_types': '*.pdf',
				'button_placeholder_id': 'swfupload-btn',
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
				'upload_success_handler': handlers.uploadSuccess,
				'upload_complete_handler': handlers.uploadComplete
			})
		}
		displayUI()

	}

	/* exports */

	module.exports = exports = function(type, option) {
		if (type == 'pdf') {
			return new PdfUploader(option)
		}
	}

	
})