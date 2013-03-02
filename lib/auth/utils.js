
/* tools for authentication */

var util = require('util')
var crypto = require('crypto')
var flashDB = require('flashDB')
var hash = require('./pass').hash

/**
 * encode a user
 */

function encode(user, fn) {
	hash(user.password, function(err, salt, hash) {
		if (err) {
			return fn(err, null)
		}
		user.salt = salt
		user.hash = hash
		fn(err, user)
	})
}

/**
 * uncode a user
 */

function uncode(user, fn) {
	var __u_ = isExisted(user)
	var pass = encodePassword(user)
	if(!__u_) {
		fn(new Error('cannot find user'))
	}
	hash(pass, __u_.salt, function(err, hash) {
		if (err) return fn(err)
    if (hash == __u_.hash) return fn(null, __u_)
    fn(new Error('invalid password'))
	})
}

/**
 * encode password
 */

function encodePassword(user) {
	var md5 = crypto.createHash('md5')
	md5.update(user.password || user, 'ascii')
	return md5.digest('base64')
}

/**
 * is existed
 */

function isExisted(user) {
	var users = flashDB.users
	var ubn = users.get(user.name, 'name')
	var ube = users.get(user.email, 'email')
	if (ubn) return ubn;
	if (ube) return ube;
	return false
}

exports.encode = encode
exports.uncode = uncode
exports.encodePassword = encodePassword
exports.isExisted = isExisted