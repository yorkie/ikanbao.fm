
/* for managing Database */
var cp = require('child_process')
var mongodb = require('../../node_modules/express-model/node_modules/mongodb')
var mongoose = require('../../node_modules/express-model/node_modules/mongoose')

exports.createServer = function() {

	var child = cp.spawn('mongod')
	child.stdout.once('data', function() {
		console.log(' - mongoDB Server runs successfully - !')
		//initialMongoDB_byMongoose()
	})
	
	// exit
	process.on('exit', function() {
		child.kill()
	})

}

function initialMongoDB_byMongoose() {

	
	var UserSchema = mongoose.Schema({
		username: String,
		password: String
	})

	UserSchema.index({
		username: 1
	})

	var User = mongoose.model('User', UserSchema)
	var yorkie = new User({
		username: 'yorkie',
		password: 'lyz900422'
	})

	mongoose.connect('127.0.0.1', 'test')
	yorkie.save(function() {
		console.log('saved')
	})
}