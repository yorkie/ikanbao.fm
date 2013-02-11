
/**
 * Module dependencies.
 */

var 
  express = require('express'),
  http = require('http'),
  path = require('path'),
  util = require('util'),
  models = require('express-model'),
  routes = require('./routes'),
  handlers = require('./lib/handlers'),
  db = require('./lib/db')

var 
  app = express(),
  server, fn

app.configure(function() {

  app.set('port', process.env.PORT || 3000)
  app.set('view engine', 'jade')
  app.set('views', __dirname + '/views')
  app.set('root', __dirname)

  app.use(express.logger('dev'))
  app.use(express.cookieParser('some secret here'))
  app.use(express.session())
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.static(__dirname + '/assets'))
  app.use(app.router)
  
  app.get('/', routes.home)
  app.get('/api/', routes.handler)

  global.app = app;
  global.Models = models(__dirname + '/models')

})

app.configure('development', function(){
  app.use(express.errorHandler())
})

/* 启动HTTP服务器 */
http.createServer(app).listen(app.get('port'), function() {
  console.log(util.format('Express server runs on PORT:%s,\n - Please press ENTER to stop the running server - !', app.get('port')))
})

/* 启动数据库服务器　*/
db.createServer()

/* process - move to new module later */
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', function(chunk) {
  console.log('Server stoped\n')
  process.exit()
})

