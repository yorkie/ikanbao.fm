
/* For authoring users */

var mongodb = require('mongodb')
var pass = require('./pass')


function getUsers (filters) {
	//mongodb.user.find()
}

function User(option) {

}

User.prototype = {

	'username': null,
	'password': null,
	'ispassed': false

}

/**
 * valid a user
 */
User.prototype.valid = function(username, password) {
	// TODO
}

/**
 * check a username whether existed.
 */
User.prototype.existed = function() {
	TODO
}



