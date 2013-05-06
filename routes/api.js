
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

		var kan = Models.use('Kan');
		var data = req.body;
		if (!req.params[0] || req.params[0] == '') {
			data.user = req.user.name;											// 创建新刊物
			kan.create(data, function () {
				res.end();
			})
		}
		else {
			kan.update({ 'name': req.params[0] }, data);		// 修改已有刊物信息
			res.end();
		}
		
	}

	else if (req.route.method == 'get') {
		var kan = Models.use('Kan')
		kan.find(req.query, function(err, result) {
			res.json(200, result)
			res.end();
		})
	}

	else {
		res.end();
	}

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