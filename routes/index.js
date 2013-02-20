
/* module dependencies */
var combo = require('../lib/handlers').combo

/* routers management */
//exports.user = require('./user')
//exports.reader = require('./reader')
//exports.test = require('./test')

/*
 * GET home page.
 */

exports.home = function(req, res) {

	/*
	var model = Models.use('User', 'yorkie', function() {
		this.title = 'Express'
		this.forTestString = 'TestString'
	})

	res.render('home', model)
	*/
	//res.clearCookie('name')
	//req.session['test'] = 1
	//res.cookie('name', 'haha123')
	res.end('')
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
 * GET login
 */

exports.login = function(req, res) {
	res.render('login')
}

/**
 * GET reg
 */

exports.register = function(req, res) {
	res.render('register')
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



