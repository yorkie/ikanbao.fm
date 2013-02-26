var flashDB = require('../lib/db/flashDB')

/* define a model 'User' */
Models.define('User', function(out, Db, cache) {

	// define variables
	var connectionStr = 'mongodb://127.0.0.1:27017/LashDB'
	var nextUserId = 0

	// define Models
	var UserSchema = new Db.Schema({
		name: String,				// registerRequired
		email: String,			// registerRequired
		password: String,		// registerRequired
		role: String				// auto generated or assigned by Yorkie
	})
	UserSchema.index({ name: 1, role: 1 })
	var User = Db.model('User', UserSchema)

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
	

	// login
	out.login = function(username, password) {
		return flashDB.users[username]
	}
	// register
	out.register = function(name, email, password) {
		if (!user.username) {
			throw 'Type Error'
		}
		flashDB.users[name] = new User({
			name: 		name,
			email: 		email,
			password: password,
			role: 		0
		})
		
	}


	return;

})

