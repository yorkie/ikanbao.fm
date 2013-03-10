var flashDB = require('flashDB')

// 时事新闻、政府政治、经济财经、科普教育、历史地理、体育竞技、生活时尚
// 游戏动漫、IT/互联网/数码、艺术、军事、文学、健康保健、其他

Models.define('Group', function(out, Db, cache) {
	
	// variables
	var connStr = 'mongodb://127.0.0.1:27017/LashDB'
	var db = {}
	var groups, is_update

	// define Model
	var GroupSchema = new Db.Schema({
		groupid: Number,
		name: String
	})
	// 初始化原始数据库时，运行一次
	GroupSchema.methods.initData = function() {
		var _groups = []
		_groups[0]  = '时事新闻'
		_groups[1]  = '政府政治'
		_groups[2]  = '经济财经'
		_groups[3]  = '科普教育'
		_groups[4]  = '历史地理'
		_groups[5]  = '体育竞技'
		_groups[6]  = '生活时尚'
		_groups[7]  = '游戏动漫'
		_groups[8]  = 'IT/互联网'
		_groups[9]  = '艺术文学'
		_groups[10] = '军事前沿'
		_groups[11] = '健康养生'
		_groups[12] = '综合'
	}
	Db.model('Group', GroupSchema)

	// constructor
	out._constructor = function() {

		db = Db.createConnection(connStr)
		db.model('Group').find({}, function(err, result) {
			groups = result
			db.close()
		})
		return out
	
	}

	out.find = function(id, fn) {
		// body
	}

	out.add = function(name) {
		// body
	}

	out.test = function() {
		return groups
	}

})