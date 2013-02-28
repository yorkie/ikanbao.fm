
/* dependencies */

var everyauth = require('everyauth')
var flashDB = require('flashDB')
var authUtils = require('./utils')
var conf = require('./config')


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
      name: req.body.name
    }
  })
  .validateRegistration(function(newUserAttrs, errors, app) {
    var users = flashDB.users
    if (users.get(newUserAttrs.name, 'name') || users.get(newUserAttrs.email, 'email'))
      errors.push('用户名/邮箱已存在')
    if (newUserAttrs.password !== app.req.body.confirmPassword)
      errors.push('两次密码输入不正确')
    return errors;
  })
  .registerUser(function(newUserAttrs) {
    // push it to flashDB, local and fast RAM
    authUtils.encode(newUserAttrs, function(user) {
      flashDB.users.add(user)
    })
    // push it to databse, MongoDB
    // body
    return 1
  })

  .loginSuccessRedirect('/')
  .registerSuccessRedirect('/')


/* exports */

module.exports = everyauth