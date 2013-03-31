var flashDB = require('flashDB')

Models.define('PhotoStorage', function(out, Db, cache) {
	
	// define variables
	var connStr = 'mongodb://127.0.0.1:27017/LashDB'
	var db

	out._constructor = function(option) {
		// TODO
	}

	out.add = function(user, source) {
		Db.use('mongodb', function(mongodb) {
			// TODO
		})
	}

})