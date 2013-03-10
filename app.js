
/**
 * Module dependencies.
 */

var 
  express = require('express'),
  path = require('path'),
  util = require('util'),
  combo = require('combo'),
  models = require('express-model'),
  routes = require('./routes'),
  auth = require('./lib/auth'),
  bootstrap = require('./lib/bootstrap')

var 
  app = express(),
  server, fn

app.configure(function() {

  app.set('port', process.env.PORT || 3000)
  app.set('view engine', 'jade')
  app.set('views', __dirname + '/views')
  app.set('root', __dirname)
  
  app.use(express.cookieParser())
  app.use(express.session({ secret: 'htuayreve'}))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.logger('dev'))
  app.use(express.static(__dirname + '/assets'))
  app.use(filterHandler)
  app.use(localsHandler)
  app.use(auth.middleware())
  app.use(afterAuthenticatedHandler)
  
  function filterHandler(req, res, next) {
    if (!/\/$/.test(req.path))
      res.redirect(req.path + '/')
    else
      next()
  }

  function localsHandler(req, res, next) {
    res.locals.loginFormFieldName = auth.password.loginFormFieldName()
    res.locals.passwordFormFieldName = auth.password.passwordFormFieldName()
    res.locals.user = { isAuthenticated: false }
    res.locals.page = {}
    next()
  }

  function afterAuthenticatedHandler(req, res, next) {
    console.log(req.user)
    if (req.user) {
      res.locals.user = req.user
    }
    next()
  }

  app.use(app.router)
  app.get('/scripts/lib', combo.combine({rootPath: __dirname + '/assets/scripts/lib' }), function(req, res) {
    res.end(res.body)
  })
  app.get('/', routes.home)
  app.get('/history/*', routes.history)
  app.get('/settings/*', routes.settings)
  app.get('/post/:type/', routes.post)
  app.get('/go/*', routes.go)
  app.get('/extend/*', routes.extend)
  app.get('/:username/', routes.user)
  app.get('/:username/:kanID', routes.KAN)
  app.get('/:username/:kanID/:issue/', routes.issue)

  app.post('/api/*', routes.api)

  // route demos
  // - http://ikanbao.fm
  // - http://ikanbao.fm/settings/
  // - http://ikanbao.fm/store/
  // - http://ikanbao.fm/api/
  // - http://ikanbao.fm/go/
  // - http://ikanbao.fm/test/
  // - http://ikanbao.fm/login/
  // - http://ikanbao.fm/signup/
  // - http://ikanbao.fm/others/

  global.app = app;
  global.Models = models(__dirname + '/models')

})

app.configure('development', function(){
  app.use(express.errorHandler())
})

// 启动其他服务
bootstrap.init()
