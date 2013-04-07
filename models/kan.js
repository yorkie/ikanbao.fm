var flashDB = require('flashDB')

Models.define('Kan', function(out, Db, cache) {
	
	// define variables
	var connStr = 'mongodb://127.0.0.1:27017/LashDB'
	var db
	
	// define Models
	var KanSchema = new Db.Schema({
		user: String,
		name: String,
		group: String,
		tags: String,
		description: String,
		cover: String
	})
	KanSchema.index({name: 1, group: 1})
	Db.model('Kan', KanSchema)

	out._constructor = function(option) {
		// TODO
	}

	/**
	 * 创建新刊
	 */

	out.create = function(kan, fn) {
		var db = Db.createConnection(connStr)
		db.model('Kan').create(kan, function(err, kan) {
			if (err) throw err
			db.close()
		})
	}

	/**
	 * 删除报刊
	 */

	out.destory = function(kname, fn) {
		// TODO
	}

	/**
	 * 修改已有报刊参数
	 */

	out.update = function(kan, fn) {
		// TODO
	}


	/**
	 * 查询报刊 by Name
	 */

	out.findByName = function(kname, fn) {
		// TODO
	}

	/**
	 * 查询报刊 by Group
	 */

	out.findByGroup = function(group, fn) {
		// TODO
	}

	/**
	 * 查询报刊 by tags
	 */

	out.findByTag = function(group, fn) {
		// TODO
	}

})