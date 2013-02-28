
/* tools for authentication */

var util = require('util')
var crypto = require('crypto')
var hash = require('./pass').hash

/**
 * common token for encoding users
 * It's private
 */

var token = '3858f62230ac3c915f300c664312c63f'

/**
 * encode a user
 */

function encode(user, fn) {
	hash(token, function(err, salt, hash) {
		if (err) throw err
		user.salt = salt
		user.hash = hash
		fn(user)
	})
}

/**
 * encode password
 */

function encodePassword(user) {
	//body
}



exports.encode = encode
exports.encodePassword = encodePassword