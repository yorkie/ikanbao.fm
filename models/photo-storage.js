var flashDB = require('flashDB')
var fs = require('fs')

Models.define('PhotoStorage', function(out, Db, cache) {
	
	// define variables
	var connStr = 'mongodb://127.0.0.1:27017/LashDB'
	var db, gridfs

	// constructor
	out._constructor = function(option) {
		// TODO
	}

	// add a photo to database 
	out.add = function(user, path) {
		
		Db.use('mongolian', function(mongolian) {
			var db = new Mongolian(connStr)
			var gridfs = db.gridfs()
			var file = gridfs.create({
				user: user
			})
			fs.createReadStream(path).pipi(file.writeStream())
		})
		
	}

})