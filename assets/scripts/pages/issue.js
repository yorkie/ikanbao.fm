
seajs.use(['utils/pdf-reader', 'utils/hash'], function(PDFReader, Hash) {

	// PDF related codes
	var args = location.pathname.slice(1).split('/');
	var path = '/upload-files/pdf/' + args[1] + '.' + args[2].slice(0, -2) + '.pdf';
	var currentPageNum = 1;

	/**
	 * CLASS: ReaderController
	 */

	var ReaderController = function (selector) {

		var self = this;
		var handlers = {
			onSubbtnsMouseover: function (e) {
				jQuery(this).addClass('hover').children('i').addClass('icon-white');
			},
			onSubbtnsMouseout: function (e) {
				jQuery(this).removeClass('hover').children('i').removeClass('icon-white');
			},
			onPrevbtnClick: function (e) {
				if (currentPageNum > 1) {
					Hash.go(currentPageNum - 1)
				}
			},
			onListbtnClick: function (e) {
				// TODO
			},
			onNextbtnClick: function (e) {
				if (currentPageNum < reader.info.numPages) {
					Hash.go(currentPageNum + 1)
				}
			},
			onTogglebtnClick: function (e) {
				// TODO
			}
		}

		this.elem = jQuery(selector);
		this.elem.delegate('.rc-btn', 'mouseover', handlers.onSubbtnsMouseover);
		this.elem.delegate('.rc-btn', 'mouseout', handlers.onSubbtnsMouseout);
		this.elem.delegate('.prev-btn', 'click', handlers.onPrevbtnClick);
		this.elem.delegate('.list-btn', 'click', handlers.onListbtnClick);
		this.elem.delegate('.next-btn', 'click', handlers.onNextbtnClick);
		this.elem.delegate('.toggle-btn', 'click', handlers.onTogglebtnClick);
	}

	ReaderController.prototype.read = function (num) {
		reader.getPage(num, function (page) {
			var canvas = document.getElementById('mainCanvas');
			canvas.style.width = '100%';
			page.render(canvas);
			// 更新页面导航
			var pageNav = jQuery('#rc-page-nav');
			pageNav.html(num + '/' + reader.info.numPages);
			scrollTo(0);
		})
	}

	var reader = new PDFReader(path);
	var rc = new ReaderController('#reader-controller');

	Hash.pushState(true);
	Hash.on('', function (path) {
		var parts = path.match(/([0-9]*)$/);
		console.log(parts)
		if (parts[1] && parts[9] !== '') {
			currentPageNum = Number(parts[1]);	
		}
		rc.read(currentPageNum);
	})

})