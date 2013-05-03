
/* sidebar and content */

seajs.use(['utils/fixed'], function(Fixed) {
	
	// fixed
	Fixed('#home-sidebar', 20)

	// navigator
	;(function homeSidebarProcess(elems, c1, c2) {
		elems.filter('.active').removeClass(c1).find('i').removeClass(c2)
		elems.eq(ENV.pageID || 0).addClass(c1).find('i').addClass(c2)
	}(
		$('#home-sidebar>li'),
		'active',
		'icon-white'
	))

})