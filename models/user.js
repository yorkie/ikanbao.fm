
var modelHelper = require('../lib/mvc/modelSupport')

exports.User = modelHelper.define({

	username: function(state) {
		// get
	},
	password: function(state) {
		// get
	},
	nick: function(state) {
		// get
	},

	set_username: false,
	set_password: false

})

// Sample
var user = new Models.User({ 
	username: 'yorkie', 
	password: 'lyz900422' 
})
user.nick()
user.password()
user.map(['username', 'password'])

user.setUsername('Yorkie-u')	// will returns a error
user.setPassword('l900422')		// will returns a error
user.setNick('lash')
user.set({
	username: 'kk',
	password: 'qk-wd',
	nick: 'nono'
})