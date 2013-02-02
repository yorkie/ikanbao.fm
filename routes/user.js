
/*
 * GET users listing.
 */

exports.index = function(req, res) {
	var path = req.path.match(/[0-9a-zA-Z-_]+/gi)
	if (path.length == 1) {
		if (checkoutUser(path[0])) {
			timeline.apply(this, arguments)
		}
	}
	else if (path.length > 1) {
		if (checkoutUser(path[0])) {
			reader.apply(this, arguments)
		}
	}
	else {

	}
	res.end()
}


function checkoutUser(username) {
	return username == 'yorkie'
}

function reader(req, res) {
	res.render('reader')
}

function timeline(req, res) {
	//res.render()
}