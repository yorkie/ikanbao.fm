
/* dependencies */

var everyauth = require('everyauth')
var conf = require('./config')


var usersById = {}

/* code start */
everyauth.everymodule.findUserById(function (id, callback) {
  callback(null, usersById[id])
})

everyauth.everymodule.logoutPath('/logout/')
everyauth.everymodule.logoutRedirectPath('/')
everyauth.debug = true

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
    //console.log(app.req.body)
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