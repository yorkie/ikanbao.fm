
seajs.use(['utils/pdf-reader', 'utils/hash'], function(PDFReader, Hash) {

	// PDF related codes
	var args = location.pathname.slice(1).split('/');
	var path = '/upload-files/pdf/' + args[1] + '.' + args[2].slice(0, -2) + '.pdf';
	var currentPageNum = 1;
	var isRendered = false;

	/**
	 * CLASS: ReaderController
	 */

	var ReaderController = function (selector) {

		var self = this;
		var handlers = {
			onSubbtnsMouseover: function (e) {
				jQuery(this).addClass('hover').children('i').addClass('icon-white');
			},
			onSubbtnsMouseenter: function (e) {
				jQuery(this).tooltip('show');
			},
			onSubbtnsMouseout: function (e) {
				jQuery(this).removeClass('hover').children('i').removeClass('icon-white');
			},
			onListbtnClick: function (e) {
				Hash.go('tableofcontents')
			},
			onPrevbtnClick: function (e) {
				if (currentPageNum > 1) {
					Hash.go(currentPageNum - 1);
				}
			},
			onNextbtnClick: function (e) {
				if (currentPageNum < reader.info.numPages) {
					Hash.go(currentPageNum + 1);
				}
			},
			onTogglebtnClick: function (e) {
				
			}
		}

		this.elem = jQuery(selector);
		this.elem.delegate('.rc-btn', 'mouseover', handlers.onSubbtnsMouseover);
		this.elem.delegate('.rc-btn', 'mouseenter', handlers.onSubbtnsMouseenter);
		this.elem.delegate('.rc-btn', 'mouseout', handlers.onSubbtnsMouseout);
		this.elem.delegate('.prev-btn', 'click', handlers.onPrevbtnClick);
		this.elem.delegate('.list-btn', 'click', handlers.onListbtnClick);
		this.elem.delegate('.next-btn', 'click', handlers.onNextbtnClick);
		this.elem.delegate('.toggle-btn', 'click', handlers.onTogglebtnClick);

		this.modalElem = jQuery('#issue-modal');
		this.modalElem.on('hidden', function (e) {
			Hash.go(currentPageNum);
		})
		this.modalElem.delegate('canvas.page', 'mouseenter', function (e) {
			jQuery(this).tooltip('show')
		})
		this.modalElem.delegate('canvas.page', 'click', function (e) {
			Hash.go(jQuery(this).data('pageNum'))
		})
	}

	ReaderController.prototype.read = function (num) {
		reader.getPage(num, function (page) {
			// 更新canvas
			var canvas = document.getElementById('mainCanvas');
			canvas.style.width = '100%';
			page.render(canvas);
			isRendered = true;

			// 更新页面导航
			var pageNav = jQuery('#rc-page-nav');
			pageNav.html(num + '/' + reader.info.numPages);
			scrollTo(0);
		})
	}

	ReaderController.prototype.tableofcontents = function () {
		
		/* main codes */
		this.modalElem.modal('show');
		var self = this;
		var c = this.modalElem.children('.modal-body');
		if (!this.modalElem.data('isloaded')) {
			c.empty();
			getPageAsync(1, c, cb);
		}

		/* 异步的 GetPage */
		function getPageAsync (i, c, fn) {
			reader.getPage(i, function (page) {
				var canvas = document.createElement('canvas');
				page.render(canvas);
				canvas = jQuery(canvas);
				canvas.addClass('page ' + (i === currentPageNum ? 'current' : ''));
				canvas.attr('data-toggle', 'tooltip');
				canvas.attr('data-original-title', '第'+i+'页');
				canvas.data('pageNum', i);
				c.append(canvas);
				fn(i);
			})
		}

		/* 回调 */
		function cb (i) {
			if (i < reader.info.numPages) {
				getPageAsync(i+1, c, cb);
			}
			self.modalElem.data('isloaded', true)
		}

	}

	var reader = new PDFReader(path);
	var rc = new ReaderController('#reader-controller');

	Hash.pushState(true);
	Hash.on('', function (path) {
		var parts = path.match(/th\/(\d*|tableofcontents)$/i);
		if (!parts) {
			location.href = '/pages/404';
			return;
		}
		if (parts[1] == 'tableofcontents') {
			if (!isRendered) rc.read(currentPageNum);
			rc.tableofcontents();
			return;
		} else {
			var pageNum = Number(parts[1]);
			currentPageNum = pageNum;
		}
		rc.read(currentPageNum);
		rc.modalElem.find('.modal-body>.page').removeClass('current').eq(currentPageNum-1).addClass('current');
	})

})