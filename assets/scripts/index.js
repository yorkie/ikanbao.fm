var prefix = 1 ? 'http://stk.ikanbao.fm:3000' : ''

seajs.config({
	alias: {
		'jquery': prefix + '/scripts/lib/jquery.min',
		'bootstrap': prefix + '/scripts/lib/bootstrap.min.js'
	},
	preload: [
		'jquery'
	],
	base: '/scripts/'
})

seajs.use(['bootstrap'], function() {

})