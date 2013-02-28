
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

    /* 用正则表达式判断login是name/email/... */

    /*
    var user = Models.use('User', [login, password])
    if (!user.isAuthenticated) {
      return ['Login failed']
    }
    var result = user.toJSON()
    usersById[result.id] = result
    return result
    */
    var promise = this.Promise()
    var user = {
      name: '',
      email: '',
      password: password
    }
    authUtils.uncode(user, function() {
      
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
    authUtils.encode(newUserAttrs, function(user) {
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