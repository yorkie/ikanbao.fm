
/* dependencies */

var everyauth = require('everyauth')
var flashDB = require('../db/flashDB')
var conf = require('./config')
var util = require('./util')


var usersById = {}

/* code start */
everyauth.everymodule.findUserById(function (id, fn) {
  fn(false, usersById[id])
})

everyauth.everymodule.logoutPath('/logout/')
everyauth.everymodule.logoutRedirectPath('/')

/**
 * password auth
 */

everyauth.password

  // login partion
  .loginWith('email')
  .getLoginPath('/login/')
  .postLoginPath('/login/')
  .loginView(__dirname + '/../../views/login.jade')
  .authenticate(function(login, password, app) {

    var user = Models.use('User', [login, password])
    if (!user.isAuthenticated) {
      return ['Login failed']
    }
    var result = user.toJSON()
    usersById[result.id] = result
    return result
    
  })

  // register partion
  .getRegisterPath('/register/')
  .postRegisterPath('/register/')
  .registerView(__dirname + '/../../views/register.jade')
  .extractExtraRegistrationParams(function(req) {
    return {
      name: req.body.name,
      confirmPassword: req.body.confirmPassword
    }
  })
  .validateRegistration(function(newUserAttrs, errors) {

    if (newUserAttrs.password !== newUserAttrs.confirmPassword) {
      errors.push('两次密码输入不正确')
    }

    if (flashDB)

    /*
    var body = app.req.body
    if (body.password != body.confirm) {
      errors.push('两次密码输入不正确')
    }

    var name = newUserAttrs.name
    var mail = newUserAttrs.email
    if (flashDB.users[name] || flashDB.users) {
      errors.push('帐号已存在')
    }

    var name = app.req.body.name
    var confirm = app.req.body.confirmPassword
    var email = newUserAttrs.email
    var password = newUserAttrs.password
    
    */
    
    console.log(newUserAttrs)
    return false;
  })
  .registerUser(function(newUserAttrs) {

    //console.log(arguments)
    //var login = newUserAttrs[this.loginKey()]
    //return usersByLogin[login] = addUser(newUserAttrs)
    return 1
  })

  .loginSuccessRedirect('/')
  .registerSuccessRedirect('/')


/* exports */

module.exports = everyauth