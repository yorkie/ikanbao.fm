
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
	res.locals.page.name = 'history'
	res.end('history')
}

/**
 * GET settings
 */

exports.settings = function(req, res) {
	res.locals.page.name = 'settings'
	res.render('settings')
}

/**
 * GET post
 */

exports.post = function(req, res) {

	if (!req.user) {
		res.redirect('/')
	}

	var groups = Models.use('Groups')
	groups.getList(function(err, list) {

		res.locals.groups = list
		if (req.params.type == 'kan') {
			res.render('post_kan')
		}
		else if (req.params.type == 'issue') {
			res.render('post_issue')
		}
		else {
			res.redirect(301, '/')
		}

	})

	
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

	Models.use('User').homepage(req.params.username, function(err, data) {
		if (err) throw err
		res.render('user_homepage', data)
	})

}

/**
 * GET {username}/{kanID}
 */

exports.KAN = function(req, res) {
	res.end('username: ' + req.params.username + '<br/>kanID: ' + req.params.kanID)
}

/**
 * GET {username}/{kanID}/{issue}/
 */

exports.issue = function(req, res) {
	res.end('username: ' + req.params.username + '<br/>kanID: ' + req.params.kanID + '<br/>issue: ' + req.params.issue)
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



