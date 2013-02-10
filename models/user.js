var Models = require('express-model')

/* define a model 'User' */
Models.define('User', function(out, db) {

	var username, password, nickname;

	// constructor
	out.constructor = function(username) {

		// connect to the special database for querying...
		db.connect('db').query('query tables', function(doc) {
			username = doc.username
			password = doc.password
			nickname = doc.nickname
		})

	}


	// define getter
	out.username = function() {
		return username
	}
	out.password = function() {
		return password
	}
	out.nickname = function() {
		return nickname
	}

	// define setter
	out.setUsername = function(username) {
		db.connect('db').update('username', username)
	}
	out.setPassword = function(password) {
		db.connect('db').update('password', password)
	}
	out.setNickname = function(nickname) {
		db.connect('db').update('nickname', nickname)
	}

	// define others
	out.forTestOtherOperators = function() {
		db.connect('db')
	}


	return;

})

