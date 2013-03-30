
// API Router

var req, res;
module.exports = function(_req, _res) {

	req = _req
	res = _res

	switch (req.params.api) {
		case 'upload': Upload(); break;
	}

	res.end()

}

/**
 * upload
 */

function Upload() {
	
	var fileInfo = req.files.Filedata
	if (req.params[0] = 'temp') {
		res.write(JSON.stringify({
			path: fileInfo.path.replace(app.get('root') + '/assets', '')
		}))
	}

}