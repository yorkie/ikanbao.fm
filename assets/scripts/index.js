
/* config */

var prefix = ''

seajs.config({
	alias: {
		'jquery': prefix + '/scripts/lib/jquery.min',
		'bootstrap': prefix + '/scripts/lib/bootstrap.min.js'
	},
	vars: {
		// TODO
	},
	preload: [
		'jquery',
		'bootstrap'
	],
	plugins: [
		'shim',
		'text',
		'combo'
	],
	comboSyntax: ['?', '&'],
	shim: {
		// TODO
	},
	base: '/scripts/',
	debug: true
})

/* startup */

seajs.use([], function() {
	
	// TODO

})