
/** 
	* @CLASS: PDFReader
	*/

define('utils/pdf-reader', ['lib/pdf'], function (require, exports, module) {

	/**
	 * @Constructor
	 */

	var PDFReader = function (path, viewport) {
		var self = this;
		this.workerSrc = PDFJS.workerSrc = '/scripts/lib/pdf.js';
		this.doc = PDFJS.getDocument(this.path = path)
		if (viewport && Object.prototype.toString.call(viewport) == '[object Number]') {
			this.viewport = viewport;
		}
		this.doc.then(function (pdf) {
			self._pdf = pdf;
			self.info = pdf.pdfInfo;
		})
	}

	/**
	 * Basic Prototype Values
	 */

	PDFReader.prototype = {
		viewport: 1.5,
		doc: null,
		path: null,
		info: null,
		_pdf: null
	}

	/**
	 * @Function: getPage
	 */

	PDFReader.prototype.getPage = function (num, fn) {
		var self = this;
		this.doc.then(function (pdf) {
			pdf.getPage(num).then(function (page) {
				var viewport = page.getViewport(self.viewport)
				fn({
					render: function(canvas, _viewport) {
						canvas.height = viewport.height;
						canvas.width = viewport.width;
						page.render({
							'canvasContext': canvas.getContext('2d'),
							'viewport': _viewport || viewport
						})
					}
				})
			})
		})
	}

	module.exports = exports = PDFReader;

})