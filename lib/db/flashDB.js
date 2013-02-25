
/* flashDB.js */

exports.field = function(name, type) {
	
	if (!name) {
		return null
	}
	try {
		this[name] = type ? (new type()) : {}
	}
	catch(e) {
		throw 'flashDB failed: unknown type'
	}

	return this

}.bind(exports)