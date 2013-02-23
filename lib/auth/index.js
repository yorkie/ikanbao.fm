
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

/**
 * weibo auth
 */

/*
everyauth.weibo
    .appId(conf.weibo.appId)
    .appSecret(conf.weibo.appSecret)
    .findOrCreateUser( function (session, accessToken, accessTokenExtra, weiboUser){
      return usersByWeiboId[weiboUser.uid] ||
        (usersByWeiboId[weiboUser.uid] = addUser('weibo', weiboUser));
    })
    .redirectPath("/");
*/

/**
 * password auth
 */

everyauth.password

  // login partion
  .loginWith('email')
  .getLoginPath('/login/')
  .postLoginPath('/login/')
  .loginView(__dirname + '/../../views/login.jade')
  .authenticate(function(login, password) {
	  var errors = [];
	  if (isEmpty(login)) errors.push('Missing login')
	  if (isEmpty(password)) errors.push('Missing password')
    if (errors.length) return errors

    var user = usersByLogin[login];
    if (isEmpty(user)) return ['Login failed']
    if (user.password !== password) return ['Login failed']
    return user
  })

  // register partion
  .getRegisterPath('/register/')
  .postRegisterPath('/register/')
  .registerView(__dirname + '/../../views/register.jade')
  .validateRegistration(function(newUserAttrs, errors) {
    var login = newUserAttrs.login
    if (usersByLogin[login]) 
      errors.push('Login already taken')
    return errors;
  })
  .registerUser(function(newUserAttrs) {
    var login = newUserAttrs[this.loginKey()]
    return usersByLogin[login] = addUser(newUserAttrs)
  })

  .loginSuccessRedirect('/')
  .registerSuccessRedirect('/')


/* exports */

module.exports = everyauth