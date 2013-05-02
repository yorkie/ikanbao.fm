var flashDB = require('flashDB')

Models.define('Issue', function(out, Db, cache) {

	// define variables
	var connStr = 'mongodb://127.0.0.1:27017/LashDB'
	var db
	
	// define Models
	var IssueSchema = new Db.Schema({
		title: String,		// 标题
		type: Boolean,		// 标示主刊/副刊
		content: String,	// 主刊：HTML, 副刊：PDF
		date: Date,				// 发布时间
		kanId: String,		// 所属的报刊

	})
	IssueSchema.index({kan: 1})
	Db.model('Issue', IssueSchema)

	out._constructor = function(option) {
		// TODO
	}

	/**
	 * 创建期刊
	 */

	out.create = function(issue) {
		var db = Db.createConnection(connStr)
		db.model('Issue').create(kan, function(err, kan) {
			if (err) throw err
			db.close()
		})
	}

	/**
	 * 删除期刊
	 */

	out.destory = function(issueName, fn) {
		// TODO
	}

	/**
	 * 修改已有的期刊
	 */

	out.update = function(issue, fn) {
		// TODO
	}

	/**
	 * 查询期刊
	 */

	out.find = function(criterion, fn) {
		var db = Db.createConnection(connStr)
		db.model('Issue').find(criterion).exec(function(err, issue) {
			if (err) throw err
			db.close()
			fn(err, issue)
		})
	}

	/**
	 * 查询期刊(One)
	 */

	out.findOne = function(criterion, fn) {
		var db = Db.createConnection(connStr)
		db.model('Issue').findOne(criterion).exec(function(err, issue) {
			if (err) throw err
			db.close()
			fn(err, issue)
		})
	}

})