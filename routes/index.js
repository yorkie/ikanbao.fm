
/**
 * NULL
 */

exports.redirect = function(req, res) {
	res.redirect(req.path + '/')
}

/*
 * GET home page.
 */

exports.home = function(req, res) {
	if (!req.user) {
		res.render('welcome')
	} else {
		res.render('welcomeAuthenticated')
	}
}

/**
 * GET history
 */

exports.history = function(req, res) {

	if (!req.user) {
		res.redirect('/')
		return
	}

	res.locals.page.name = 'history'
	res.end('history')
}

/**
 * GET /groups
 */

exports.groups = function(req, res) {

	if (!req.user) {
		res.redirect('/')
		return
	}

	Models.use('Groups').view_groups(function(err, data) {
		if (err) throw err
		res.render('groups', {
			groups: data
		})
	})
	
}

/**
 * GET settings
 */

exports.settings = function(req, res) {

	if (!req.user) {
		res.redirect('/')
		return
	}

	res.locals.page.name = 'settings'
	res.render('settings')
}

/**
 * GET post
 */

exports.post = function(req, res) {

	if (!req.user) {
		res.redirect('/')
		return
	}

	switch (req.params.type) {
		case 'kan':   post_kan(); break;
		case 'issue': post_issue(); break;
		default: res.redirect(301); break;
	}

	/* post kan */
	function post_kan() {
		Models.use('Groups').getList(function(err, list) {
			res.render('post_kan', {
				'groups': list
			})
		})
	}

	/* post issue */
	function post_issue() {
		Models.use('Kan').find({'user': req.user.name}, function(err, list) {
			res.render('post_issue', {
				'kans': list
			})
		})
	}

}

/**
 * GET go
 */

exports.go = function(req, res) {
	res.end('It is for redirecting a specified url')
}

/**
 * GET extend
 */

exports.extend = function(req, res) {
	res.end('extend')
}

/**
 * GET {username}
 */

exports.user = function(req, res) {

	Models.use('User').view_homepage(req.params.username, function(err, data) {
		if (err) throw err
		res.render('user_homepage', data)
	})

}

/**
 * GET {username}/{kanID}
 */

exports.KAN = function(req, res) {
	res.render('kan', null)
}

/**
 * GET {username}/{kanID}/{issue}/
 */

exports.issue = function(req, res) {
	res.render('issue', null)
}

/**
 * GET 404
 */

exports._404 = function(req, res) {
	res.end('404')
}


// ==========================================
// ====== POST ==============================
// ==========================================

/** 
 * POST api
 */

exports.api = function(req, res) {
	require('./api')(req, res)
}



