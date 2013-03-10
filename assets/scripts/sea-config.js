/* config */

var prefix = ''

seajs.config({
	alias: {
		'jquery': prefix + '/scripts/lib/jquery-1.7.2.js',
		'bootstrap': prefix + '/scripts/lib/bootstrap.min.js',
		'holder': prefix + '/scripts/lib/holder.js'
	},
	vars: {
		// TODO
	},
	preload: [
		'jquery',
		'bootstrap',
		'holder'
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