
/* define a model 'User' */
Models.define('User', function(out, db, cache) {

	// if u wanna use specilized db, such as mysql, u can declear by this.
	db.use('mysql', function(db) {
		// body
		//console.log(db)
	})

	// constructor
	out._constructor = function(username) {

		// connect to the special database for querying...
		/*
		db.connect('db').query('query tables', function(doc) {
			username = doc.username
			password = doc.password
			nickname = doc.nickname
		})
		*/
		db.createConnection('mongodb://127.0.0.1:27017/test')

		var PersonSchema = new db.Schema({
			username: String,
			password: String,
			nickname: String
		})
		var me = db.model('yorkie', PersonSchema)

		cache.username = username || 'Yorkie'
		cache.password = 'test'
		cache.nickname = ''
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


	return;

})

