
/* tools for authentication */

var util = require('util')
var crypto = require('crypto')
var flashDB = require('flashDB')
var hash = require('./pass').hash

/**
 * encode a user
 */

function encode(user, fn) {
	var pass = encodePassword(user)
	hash(pass, function(err, salt, hash) {
		if (err) throw err
		user.salt = salt
		user.hash = hash
		user.password = pass
		fn(user)
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
	hash(pass,  function(err, hash) {
		if (err) return fn(err)
    if (hash == user.hash) return fn(null, user)
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
	return users.get(user.name, 'name') || users.get(user.email, 'email')
}

exports.encode = encode
exports.uncode = uncode
exports.encodePassword = encodePassword
exports.isExisted = isExisted