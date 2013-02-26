var flashDB = require('../lib/db/flashDB')

/* define a model 'User' */
Models.define('User', function(out, Db, cache) {

	// define variables
	var connectionStr = 'mongodb://127.0.0.1:27017/LashDB'
	var nextUserId = 0

	// define Models
	var UserSchema = new Db.Schema({
		email: String,
		username: String,
		password: String,
		role: String,
		mask: String
	})
	var User = Db.model('User', UserSchema)

	// constructor
	out._constructor = function(username, password) {

		var user = flashDB.users[username]
		if (user && user.password === password) {
			cache.username = user.username
			cache.nickname = user.nickname
			cache.password = user.password
			out.isAuthenticated = true
		}
		return out

	}

	out.toJSON = function() {
		return {
			id: ++nextUserId,
			name: cache.username,
			nick: cache.nickname,
			isAuthenticated: out.isAuthenticated
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
	out.login = function(username, password) {
		return flashDB.users[username]
	}
	// register
	out.register = function(user) {
		if (!user.username) {
			throw 'Type Error'
		}
		flashDB.users[user.username] = new User(user)
		console.log(flashDB.users[user.username])
	}


	return;

})

