
/* dependencies */

var everyauth = require('everyauth')
var flashDB = require('flashDB')
var authUtils = require('./utils')
var conf = require('./config')

var usersById = {}
var nextUserId = 0

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
    var promise = this.Promise()
    var user = {
      email: login,
      password: password
    }
    authUtils.uncode(user, function(err, user) {
      if (err) return promise.fulfill([err])
      usersById[user.id = ++nextUserId] = user
      promise.fulfill(user)
    })
    return promise
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
    if (authUtils.isExisted(newUserAttrs))
      errors.push('用户名/邮箱已存在')
    if (newUserAttrs.password !== app.req.body.confirmPassword)
      errors.push('两次密码输入不正确')
    if (!newUserAttrs.role) {
      newUserAttrs.role = 1
    }
    return errors
  })
  .registerUser(function(newUserAttrs) {
    var promise = new this.Promise()
    authUtils.encode(newUserAttrs, function(err, user) {
      // encode password
      user.password = authUtils.encodePassword(user)
      // push it to flashDB, local and fast RAM
      flashDB.users.add(user)
      // push it to databse, MongoDB
      Models.use('User').add(user)
      // done
      promise.fulfill(user)
    })
    return promise
  })

  .loginSuccessRedirect('/')
  .registerSuccessRedirect('/')


/* exports */

module.exports = everyauth