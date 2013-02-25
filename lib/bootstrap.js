
var cp = require('child_process')
var http = require('http')
var Fiber = require('fibers')
var Future = require('fibers/future')
var mongolian = require('express-model/mongolian')
//var flashDB = require('./db/flashDB')


/* bootstrap.js */

exports.init = function() {
	ready()
	exec_mongod()
	exec_http()
}


/**
 * Http Server
 */

function exec_http() {
	http.createServer(app).listen(app.get('port'), function() {
	  console.log(' - Http Server [Express] runs on [%s] successfully - !', app.get('port'))
	})
}

/**
 * MongoDB Server
 */

function exec_mongod(fn) {
	var child = cp.spawn('mongod')
	child.stdout.once('data', function() {
		console.log(' - mongoDB Server runs on [%s] successfully - !', 27017)
	})
	process.on('exit', function() {
		child.kill()
	})
}

function ready() {

	var db = new mongolian('127.0.0.1:27017/LashDB', {
		debug: false
	})
	var users = db.collection('users').find()

	users.forEach(function(user) {
		console.log(user)
	})

	
}



