var flashDB = require('../lib/db/flashDB')

/* define a model 'User' */
Models.define('User', function(out, Db, cache) {

	// define variables
	var connectionStr = 'mongodb://127.0.0.1:27017/LashDB'

	// define Models
	var UserSchema = new Db.Schema({
		username: String,
		password: String,
		nickname: String
	})
	var User = Db.model('User', UserSchema)

	// constructor
	out._constructor = function(username, password) {

		var user = flashDB.users[username]
		if (user) {
			out.isAuthenticated = true
		}
		return out

	}

	out.toJSON = function() {
		return {
			username: cache.username,
			nickname: cache.nickname
		}
	}

	// define getter
	out.username = function() {
		return cache.username
	}
	out.password = function() {
		return cache.password
	}
	out.nickname = function() {
		return cache.nickname
	}

	// define setter
	out.setUsername = function(username) {
		//db.connect('db').update('username', username)
	}
	out.setPassword = function(password) {
		//db.connect('db').update('password', password)
	}
	out.setNickname = function(nickname) {
		//db.connect('db').update('nickname', nickname)
	}

	// login
	out.login = function(username, password, fn) {
		return flashDB.users[username]
	}
	// register
	out.register = function(user, fn) {

	}


	return;

})

