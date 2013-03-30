
/**
 * tags input
 */

define(function(require, exports, module) {

	require('/css/utils/tags-input.css')

	var tagsTable = {}
	var containerStyles = {}

	$.fn.tagsInput = function(option) {

		var self = this
		var cont = $('<div class="tags-container"><input /></div>')
		var thisPos = this.position()
		var x = parseInt(this.css('padding')) + parseInt(this.css('margin'))

		;(cont.innerInput = cont.children('input'))
			.attr('placeholder', this.attr('placeholder'))

		containerStyles.top = thisPos.top + x
		containerStyles.left = thisPos.left + x
		containerStyles.height = this.height() + 2
		containerStyles.width = this.width()
		cont.css(containerStyles).insertAfter(this)


		/* listeners */

		cont.delegate(':not(span)', 'click', function() {
			cont.innerInput.focus()
		})

		cont.delegate('span', 'click', function() {
			var _this = $(this)
			if (!_this.data('is_selected')) {
				cont.children('span').data('is_selected', false).removeClass('selected')
				_this.data('is_selected', true).addClass('selected')
				self.focus()
			}
			else {
				_this.data('is_selected', false).removeClass('selected')
			}
		})

		cont.innerInput.on('focus', function() {
			cont.children('span').data('is_selected', false).removeClass('selected')
		})

		cont.innerInput.on('keydown', function(e) {
			if (e.keyCode == 13) {
				addTag()
			}
			if (e.keyCode == 8 && $(this).val() === '') {
				cont.children('span:last').data('is_selected', true).addClass('selected')
				self.focus()
			}
		})

		self.on('keydown', function(e) {
			if (e.keyCode == 13) {
				cont.children('span.selected').data('is_selected', false).removeClass('selected')
				cont.innerInput.focus()
			}
			if (e.keyCode == 8) {
				delTag()
			}
		})

		/**
		 * add a tag
		 */

		function addTag() {
			var one = cont.innerInput.val()
			var err
			var innerSpan = $('<span></span>&nbsp;')

			if ($.trim(one) == '') {
				err = '不能添加空标签'
			}
			if (one.length >= 7) {
				err = '标签不能超过6个字'
			}
			if (tagsTable[one]) {
				err = '标签已存在'
			}

			if (err) {
				var errorDom = $('<i></i>').text(err + ';')
				innerSpan.html(errorDom)
			}
			else {
				innerSpan.text(one + ';')
				tagsTable[one] = one
			}
			innerSpan.insertBefore(cont.innerInput)
			cont.innerInput.val('')
		}

		/**
		 * delete a tag
		 */

		function delTag() {
			var selectedSpan = cont.children('span.selected')
			delete tagsTable[selectedSpan.text().slice(0, -1)]
			selectedSpan.remove()
			cont.innerInput.focus()
		}

	}

	module.exports = null

})