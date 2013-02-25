/* define a model 'User' */
Models.define('User', function(out, db, cache) {

	// define variables
	var TIMEOUT = 3000
	var connectionStr = 'mongodb://127.0.0.1:27017/LashDB'

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


	db.use('mongolian', function(Mongolian) {

		var server = new Mongolian()
		var db;

		out.login = function() {
			db = server.db('LashDB')
			console.log(db.collection('users').find())
		}
	})



	return;

})

