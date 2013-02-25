
/* dependencies */

var everyauth = require('everyauth')
var conf = require('./config')

/* code start */

var usersById = {}
var nextUserId = 0


function addUser(source, sourceUser) {
	var user
	// password-based
	if (arguments.length = 1) {
		user = sourceUser = source
		user.id = ++nextUserId
		return usersById[nextUserId] = user
	}
	// non-password-based
	user = usersById[++nextUserId] = {id: nextUserId}
	user[source] = sourceUser
	return user
}

function isEmpty(str) {
	return !str || str == ''
}


var usersByFbId = {}
var usersByGhId = {}
var usersByGoogleId = {}
var usersByWeiboId = {}
var usersByLogin = {
  'l900422@vip.qq.com': addUser({ login: 'l900422@vip.qq.com', password: 'lyz900422'})
}

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
	  var errors = [];
	  if (isEmpty(login)) 
      errors.push('Missing login')
	  if (isEmpty(password)) 
      errors.push('Missing password')
    if (errors.length) 
      return errors
    //if (isEmpty(user)) 
      //return ['Login failed']

    Models.use('User').login(login, password, function() {
      // body
    })
    // To block request, it must be return 'false'
    return true
    
  })

  // register partion
  .getRegisterPath('/register/')
  .postRegisterPath('/register/')
  .registerView(__dirname + '/../../views/register.jade')
  .validateRegistration(function(newUserAttrs, errors, app) {
    //console.log(app.req.body)

    var body = app.req.body
    if (body.password != body.confirm) {
      errors.push('Password can not match the 2nd Password')
    }

    var login = newUserAttrs.login
    if (usersByLogin[login]) 
      errors.push('Login already taken')
    return errors;
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