
// API Router

var req, res;
module.exports = function(_req, _res) {

	req = _req
	res = _res

	switch (req.params.api) {
		case 'upload': Upload(); break;
		case 'kan'   : Kan(); break;
	}

}

/**
 * upload
 */

function Upload() {
	
	var fileInfo = req.files.image
	if (req.params[0] = 'temp') {
		res.write(JSON.stringify({
			path: fileInfo.path.replace(app.get('root') + '/assets', ''),
			name: fileInfo.name
		}))
	}

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
		})
	}

	if (req.route.method == 'get') {
		var kan = Models.use('Kan')
		kan.find(req.query, function(err, result) {
			res.json(200, result)
		})
	}

}