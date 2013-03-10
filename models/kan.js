var flashDB = require('flashDB')

Models.define('Kan', function(out, Db, cache) {
	
	// define variables
	var connStr = 'mongodb://127.0.0.1:27017/LashDB'
	
	// define Models
	var KanSchema = new Db.Schema({
		name: String,
		group: Number,
		tags: String,
		description: String,
		cover: String
	})
	KanSchema.index({name: 1, group: 1})
	Db.model('Kan', KanSchema)

	out._constructor = function(option) {
		// TODO
	}

	out.create = function() {
		// TODO
	}

})