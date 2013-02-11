
/* for managing Database */
var cp = require('child_process')
var mongodb = require('../../node_modules/express-model/node_modules/mongodb')

exports.createServer = function() {

	var child = cp.spawn('mongod')
	child.stdout.on('data', function() {
		console.log('mongoDB Server runs successfully - !')
	})
	
	// exit
	process.on('exit', function() {
		child.kill()
	})

}