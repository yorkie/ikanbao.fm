
/* module dependencies */
var combo = require('../lib/handlers').combo

/* routers management */
exports.user = require('./user')
exports.reader = require('./reader')

/*
 * GET home page.
 */

exports.home = function(req, res) {
   	
	res.render('home', { title: 'Express', test: 'test' });
	return;	
	
}

/*
 * GET hanlders
 */

exports.handler = function(req, res) {
		
	combo.all(req.query, function(err, one) {
		if (err) {
			res.status(404)			
			return;
		}
		res.status(one.isCached ? 301 : 200)
		res.set(one.headers)
		res.send(one.body)
	})
}
