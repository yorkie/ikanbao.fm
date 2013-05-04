var util = require('util')
var fs = require('fs')
var flashDB = require('flashDB')

Models.define('Issue', function(out, Db, cache) {

	// define variables
	var connStr = 'mongodb://127.0.0.1:27017/LashDB'
	var db
	
	// define Models
	var IssueSchema = new Db.Schema({
		id: String,				// id
		title: String,		// 标题
		type: Number,			// 标示主刊/副刊
		content: String,	// 主刊：HTML, 副刊：PDF
		date: Date,				// 发布时间
		kanId: String,		// 所属的报刊
	})
	IssueSchema.index({ kan: 1 })
	IssueSchema.set('toObject', { getters: true })
	Db.model('Issue', IssueSchema)

	/**
	 * Constructor
	 */

	out._constructor = function(option) {
		// TODO
	}

	/**
	 * 在某一个报刊种，创建期刊
	 */

	out.create = function(issue, fn) {

		var db = Db.createConnection(connStr)
		Models.use('Kan').findOne_noConnection(db, { 'name': issue.kanId }, function(err, kan) {
			
			// 设置issueNum
			if (!kan.issuesNum) {
				kan.issuesNum = 1
			} else {
				kan.issuesNum += 1
			}

			// 设置issue的Id、转存文件夹
			var oldpath = util.format('%s/assets%s', app.get('root'), issue.content)
			var newpath = util.format('%s/assets/upload-files/pdf/%s.%s.pdf', app.get('root'), issue.kanId, kan.issuesNum)
			var reader = fs.createReadStream(oldpath)
			var writer = fs.createWriteStream(newpath)
			reader.pipe(writer)
			reader.on('end', function() {
				fs.unlinkSync(oldpath)
			});
			issue.id = issue.content = util.format('%s.%s', issue.kanId, kan.issuesNum)

			// 保存设置并插入issue
			kan.save(function(err) {
				if (err) throw err;
				db.model('Issue').create(issue, function(err, issue) {
					if (err) throw err;
					fn.call(this, issue)
					db.close()
				})
			})

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
		db.model('Issue').find(criterion).exec(function(err, issues) {
			if (err) throw err
			db.close()
			fn(err, issues)
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