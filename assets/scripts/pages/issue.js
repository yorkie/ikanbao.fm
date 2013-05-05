
seajs.use(['utils/pdf-reader'], function(PDFReader) {

	// PDF related codes
	var args = location.pathname.slice(1, -2).split('/');
	var path = '/upload-files/pdf/' + args[1] + '.' + args[2] + '.pdf';
	var currentPageNum = 1;

	// PDF Reader
	var reader = new PDFReader(path);

	/** 
	 * a shortcut for read a specific page
	 */

	function readpage (num) {
		reader.getPage(num, function (page) {
			var canvas = document.getElementById('mainCanvas');
			canvas.style.width = '100%';
			page.render(canvas);
		})
	}
	readpage(currentPageNum)

	/**
	 * CLASS: ReaderController
	 */

	var ReaderController = function (selector) {
		this.elem = jQuery(selector);
		this.elem.delegate('.rc-btn', 'mouseover', this.handlers.onSubbtnsMouseover);
		this.elem.delegate('.rc-btn', 'mouseout', this.handlers.onSubbtnsMouseout);
		this.elem.delegate('.prev-btn', 'click', this.handlers.onPrevbtnClick);
		this.elem.delegate('.list-btn', 'click', this.handlers.onListbtnClick);
		this.elem.delegate('.next-btn', 'click', this.handlers.onNextbtnClick);
		this.elem.delegate('.toggle-btn', 'click', this.handlers.onTogglebtnClick);
	}

	ReaderController.prototype.handlers = {
		onSubbtnsMouseover: function (e) {
			jQuery(this).addClass('hover').children('i').addClass('icon-white');
		},
		onSubbtnsMouseout: function (e) {
			jQuery(this).removeClass('hover').children('i').removeClass('icon-white');
		},
		onPrevbtnClick: function (e) {
			if (currentPageNum > 1) {
				readpage(--currentPageNum);
			}
		},
		onListbtnClick: function (e) {
			// TODO
		},
		onNextbtnClick: function (e) {
			if (currentPageNum < reader.info.numPages-1) {
				readpage(++currentPageNum);
			}
		},
		onTogglebtnClick: function (e) {
			// TODO
		}
	}

	var rc = new ReaderController('#reader-controller');

})