
/* modular dependency */
var Fiber = require('fibers')
var Future = require('fibers/future')
var wait = Future.wait

/* define a model 'User' */
Models.define('User', function(out, db, cache) {

	// if u wanna use specilized db, such as mysql, u can declear by this.
	db.use('mysql', function(db) {
		// body
		//console.log(db)
	})

	// define Models
	var UserSchema = new db.Schema({
		username: String,
		password: String,
		nickname: String
	})
	var User = db.model('User', UserSchema)

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
	out.all = function() {
		var fiber;
		db.connect('mongodb://127.0.0.1:27017/LashDB')
		fiber = Fiber(function() {
			var Find = Future.wrap(User.find.bind(User), 0)
			var result = Find().wait()
			console.log(result)
			//Fiber.yield(result)
		})
		return fiber.run()
	}
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

	// define others
	out.forTestOtherOperators = function() {
		//db.connect('db')
	}


	return;

})

