
// dependences

var fs = require('fs')

// API Router

var req, res;
module.exports = function(_req, _res) {

	req = _req
	res = _res

	switch (req.params.api) {
		case 'upload': Upload(); break;
		case 'kan'   : Kan(); break;
		case 'issue' : Issue(); break;
	}

}

/**
 * upload
 */

function Upload() {
	
	var fileInfo = req.files.image
	res.write(JSON.stringify({
		path: fileInfo.path.replace(app.get('root') + '/assets', ''),
		name: fileInfo.name
	}))
	res.end()

}

/**
 * Kan
 */

function Kan() {

	if (req.route.method == 'post') {
		var kan = Models.use('Kan')
		var data = req.body
		data.user = req.user.name
		kan.create(data, function() {
			// TODO
			res.end()
		})
	}

	if (req.route.method == 'get') {
		var kan = Models.use('Kan')
		kan.find(req.query, function(err, result) {
			res.json(200, result)
			res.end()
		})
	}

	res.end()

}

/**
 * Issue
 */

function Issue() {

	if (req.route.method == 'post') {
		var issue = Models.use('Issue')
		var data = req.body
		data.user = req.user.name
		issue.create(data, function() {
			// TODO
			res.end()
		})
	}

	if (req.route.method == 'get') {
		var issue = Models.use('Issue')
		issue.find(req.query, function(err, result) {
			res.json(200, result)
			res.end()
		})
	}
	
}