
/* dependencies */

var everyauth = require('everyauth')
var flashDB = require('../db/flashDB')
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
  .validateRegistration(function(newUserAttrs, errors, app) {
    
    /*
    var body = app.req.body
    if (body.password != body.confirm) {
      errors.push('Password can not match the 2nd Password')
    }

    var login = newUserAttrs.login
    if (usersByLogin[login]) 
      errors.push('Login already taken')
    return errors;
    */

    var body = app.req.body
    if (body.password != body.confirm) {
      errors.push('Password can not match the 2nd Password')
    }

    var name = newUserAttrs.name
    var mail = newUserAttrs.email
    if (fla)

    var name = app.req.body.name
    var confirm = app.req.body.confirmPassword
    var email = newUserAttrs.email
    var password = newUserAttrs.password
    

    

    return false;
  })
  .registerUser(function(newUserAttrs) {
    //var login = newUserAttrs[this.loginKey()]
    //return usersByLogin[login] = addUser(newUserAttrs)
    return 1
  })

  .loginSuccessRedirect('/')
  .registerSuccessRedirect('/')


/* exports */

module.exports = everyauth