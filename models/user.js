var Fiber = require('fibers')

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
	out._constructor = function(username) {

		cache.username = username || 'Yorkie'
		cache.password = 'test'
		cache.nickname = ''

		/*
		var yorkie = new User({
			username: 'yorkie',
			password: 'lyz900422',
			nickname: 'nick'
		})

		yorkie.save(function(err) {
			console.log(arguments)
		})
		*/

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
		
	}
	// register
	out.register = function(user, fn) {

	}


	return;

})

