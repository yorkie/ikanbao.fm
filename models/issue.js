var flashDB = require('flashDB')

Models.define('Issue', function(out, Db, cache) {

	// define variables
	var connStr = 'mongodb://127.0.0.1:27017/LashDB'
	var db
	
	// define Models
	var IssueSchema = new Db.Schema({
		title: String,
		type: Boolean,		// 标示主刊/副刊
		content: String,	// 主刊：HTML, 副刊：PDF
		date: Date
	})
	IssueSchema.index()
	Db.model('Issue', IssueSchema)

	out._constructor = function(option) {
		// TODO
	}

	out.create = function(kan) {
		// TODO
	}

})