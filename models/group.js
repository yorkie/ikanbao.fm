var flashDB = require('flashDB')

// 时事新闻、政府政治、经济财经、科普教育、历史地理、体育竞技、生活时尚
// 游戏动漫、IT/互联网/数码、艺术、军事、文学、健康保健、其他

Models.define('Groups', function(out, Db, cache) {
	
	// variables
	var connStr = 'mongodb://127.0.0.1:27017/LashDB'
	var db = {}

	// define Model
	var GroupSchema = new Db.Schema({
		content: [ String ]
	}, {
		collection: 'groups'
	})
	Db.model('Groups', GroupSchema)

	// constructor
	out._constructor = function() {
		// body
		return out
	}

	out.getList = function(fn) {
		db = Db.createConnection(connStr)
		db.model('Groups').findOne().exec(function(err, result) {
			fn.call(null, err, result.content)
			db.close()
		})
	}

	out.add = function(name) {
		// body
	}

})