var fs = require('fs')
var util = require('util')

exports.write = function() {
	var filename = __dirname + '/logs/dev/' + (+new Date) % 57600000 + '.log';
	fs.appendFile(filename, '#\s' + util.format.apply(this, arguments) + '\n', function() {
			// Nothing
	})
}
