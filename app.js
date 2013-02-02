
/**
 * Module dependencies.
 */

var 
  express			     = require('express'),
  http			  	   = require('http'),
  path			  	   = require('path'),
  routes		  	   = require('./routes'),
  handlers	       = require('./lib/handlers')

var 
  app = express(),
  server, fn

app.configure(function(){
  app.set('port', process.env.PORT || 3000)
	app.set('view engine', 'jade')
  app.set('views', __dirname + '/views')
	app.set('root', __dirname)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
	app.use(express.methodOverride())
  app.use(app.router)
})

app.configure('development', function(){
  app.use(express.errorHandler())
})

// ikanbao.fm/profile
app.use(function(req, res, next) {
  if (req.subdomains.indexOf('stk') !== -1) {
    express.static(__dirname + '/assets').apply(this, arguments)
  }
  else {
    if (req.path == '/') {
      routes.home.apply(this, arguments)
    }
    else if (/^\/api\//i.test(req.path)) {
      routes.handler.apply(this, arguments)
    }
    else {
      routes.user.index.apply(this, arguments)
    }
  }
})

global.app = app

/* create http server and related something */
server = http.createServer(app)
fn = function() {
  console.log("> Express server listening on port " + app.get('port'))
  process.stdout.write("> please press ENTER for stoping this server\n> ")
}
server.listen(app.get('port'), fn)

/* process - move to new module later */
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', function(chunk) {

  if (chunk == '\n' || chunk == 'quit\n') {
	console.log('> server stoped\n')
	process.exit(1)
  } else if (chunk == 'http -close\n') {
	process.stdout.write('> server closed, to ready for reopenning\n> ')
    server.close()
  } else if (chunk == 'http -listen\n') {
	server.listen(app.get('port'), fn)
  } else if (chunk == 'help\n') {
	process.stdout.write('> helps for express\n> ')
  } else {
	process.stdout.write('> could not found the command\n')
	process.stdout.write('> data is:\n')
	process.stdout.write('> ' + chunk)
	process.stdout.write('> ')
  }

})
