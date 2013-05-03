
/* homepage */

seajs.use([], function() {

	/**
	 * Homepage Render Class
	 */

	function HomepageRender() {
		this.nav = $('#homepage-nav')
		this.container = $('#homepage-container')
	}

	HomepageRender.prototype.select = function(i) {
		this.nav.find('ul.nav>li').removeClass('active').eq(i).addClass('active')
		this.container.children().hide().eq(i).show()
	}

	/**
	 * Info/Kans/Subscribe Renders Process
	 */

	function userProfileRender() {
		var _render = new HomepageRender()
		_render.select(0)
	}

	function userKansRender() {
		var _render = new HomepageRender()
		_render.select(1)
	}

	function userSubscribeRender() {
		var _render = new HomepageRender()
		_render.select(2)
	}

	/* Start */

	var pageType = location.pathname.match(/(kan|subscribe)\/{0,1}$/)
	if (!pageType || !pageType[1])
		return userProfileRender()
	if (pageType[1] === 'kan')
		return userKansRender()
	if (pageType[1] === 'subscribe')
		return userSubscribeRender()

	/* End */

})