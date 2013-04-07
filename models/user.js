var flashDB = require('flashDB')

/* define a model 'User' */
Models.define('User', function(out, Db, cache) {

	// define variables
	var connStr = 'mongodb://127.0.0.1:27017/LashDB'
	var db = {}
	var nextUserId = 0

	// define Models
	var UserSchema = new Db.Schema({
		name: String,				// registerRequired
		email: String,			// registerRequired
		password: String,		// registerRequired
		role: String				// auto generated or assigned by Yorkie
	})
	UserSchema.index({ name: 1, role: 1 })
	Db.model('User', UserSchema)

	// constructor
	out._constructor = function(name, password) {

		var user = flashDB.users[name]
		if (user && user.password === password) {
			cache.name = user.name
			cache.email = user.email
			cache.password = user.password
			cache.role = user.role
			out.isAuthenticated = true
		}
		return out

	}

	out.toJSON = function() {
		return {
			id: ++nextUserId,
			name: cache.name,
			email: cache.email,
			password: cache.password,
			role: cache.role,
			isAuthenticated: out.isAuthenticated
		}
	}

	// define getter
	// define setter
	

	/**
	 * add a user
	 * @param user
	 */

	out.add = function(user) {
		db = Db.createConnection(connStr)
		db.model('User').create(user, function(err, user) {
			if (err) throw 'Type Error'
			db.close()
		})
		return user
	}


	/**
	 * user homepage
	 */

	out.homepage = function(username, fn) {

		var db = Db.createConnection(connStr)
		db.model('User').findOne({
			name: username
		}).exec(function(err, d1) {
			if (err) throw err
			if (!d1) return
			Models.use('Kan').find({ user: username }, function(err, d2) {
				db.close()
				fn(err, {
					host: {
						'email': d1.email,
						'name': d1.name,
						'role': d1.role,
						'kans': d2
					}
				})
			})
		})

	}

	return

})

