define(function(require, exports, module) {

	module.exports = function() {

		var pathname = location.pathname
		var hash 		 = location.hash
		var script   = pathname + hash.replace('#', '')
		console.log(script)

	}

})