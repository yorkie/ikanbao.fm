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
		cover: String,
		issuesNum: Number
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
			fn.call(this, kan)
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
	 * @param criterion 筛选条件，选择出需要更新的Kan
	 * @param values 要更新的数据
	 */

	out.update = function(criterion, values) {
		var db = Db.createConnection(connStr)
		findOne_noConnection(db, criterion, function (err, kan) {
			if (err) throw err
			for (var key in values) {
				kan[key] = values[key];
			}
			kan.save(function () {
				db.close()
			})
		})
	}

	/**
	 * 查询报刊 继承连接
	 */

	var find_noConnection =
	out.find_noConnection = function (db, criterion, fn) {
		db.model('Kan').find(criterion).exec(function(err, kan) {
			if (err) throw err;
			fn(err, kan);
		})
	}

	/**
	 * 查询报刊(One) 继承连接
	 */

	var findOne_noConnection = 
	out.findOne_noConnection = function (db, criterion, fn) {
		db.model('Kan').findOne(criterion).exec(function(err, kan) {
			if (err) throw err;
			fn(err, kan);
		})
	}

	/**
	 * 查询报刊
	 */

	out.find = function(criterion, fn) {
		var db = Db.createConnection(connStr)
		find_noConnection(db, criterion, function (err, kan) {
			fn(err, kan)
			db.close()
		})
	}

	/**
	 * 查询报刊(One)
	 */

	out.findOne = function (criterion, fn) {
		var db = Db.createConnection(connStr)
		findOne_noConnection(db, criterion, function (err, kan) {
			fn(err, kan)
			db.close()
		})
	}

})