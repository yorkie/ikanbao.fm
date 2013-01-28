
var fs = require('fs')
var lang = require('../lang')

// ikanbao.fm/handler/:timestamp/?assets[scripts]=sea$main
var Combo = function(args, fn) {
	
	var self = this
	var error = false
	var files = []
	
	lang.context(args.assets).isOk(function($) {

		var sct = $.call(this, 'scripts')
		sct.replace(/[a-z0-9_\/\.]+/gi, function(item) {
			var path = app.get('root') + '/assets/scripts/' + item + '.js'
			return files.push(fs.readFileSync(path, 'utf8'))
		})
		var temp = self.reqsTree.assets.scripts = files.join('')
		self.headers = {
			'Content-Type': 'text/javascript',
			'Content-Length': temp.length
		}
	}).check()

	lang.context(args.actions).isOk(function($) {
		// TODO
	}).check()

	fn.call(self, error, {
		isCached: self.cached,
		headers: self.headers,
		body: self.reqsTree.create()
	})
	
}

Combo.prototype.isCached = false
Combo.prototype.headers = {}
Combo.prototype.reqsTree = {
	assets: {},
	actions: {}
}

Combo.prototype.reqsTree.create = function() {
	return this.assets.scripts
}

exports.all = function(args, fn) {
	return (new Combo(args, fn))
}
