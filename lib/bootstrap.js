
var cp = require('child_process')
var http = require('http')
var mongolian = require('express-model/mongolian')
var authUtils = require('./auth/utils')
var flashDB = require('flashDB')


/* bootstrap.js */

exports.init = function() {
	ready()
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
 * ready workers
 */

function ready() {
	var db = new mongolian('127.0.0.1:27017/LashDB')
	var users = flashDB.create('users', ['email', 'name'])
	db.collection('users').find().forEach(function(user) {
		authUtils.encode(user, function(user) {
			users.add(user)
		})
	})
}