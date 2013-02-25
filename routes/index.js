
/* module dependencies */

function AsyncTestcase (fn) {
	fn()
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
	AsyncTestcase(function() {
		res.end('DONE')
	})
}

/**
 * GET settings
 */

exports.settings = function(req, res) {
	res.end('settings')
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
	res.end('username: ' + req.params.username)
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
	res.end('api[post]')
}



