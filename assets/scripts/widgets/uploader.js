
/* PDF Uploader */

define('uploader', function(require, exports, module) {

	/* PDF Uploader */

	var PdfUploader = function(option) {
		for (property in option)
			this.option[property] = option[property];
	}

	PdfUploader.prototype = {
		targetElem: null,
		option: {
			'frameHeight': 300
		}
	}

	PdfUploader.prototype.render = function(elemId) {
		this.targetElem = $(elemId)
		this.targetElem.height(this.option.frameHeight)
	}

	/* exports */

	module.exports = exports = function(type) {
		if (type == 'pdf') {
			return PdfUploader
		}
	}

	
})