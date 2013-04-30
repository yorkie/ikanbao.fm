/* config */

var prefix = ''

seajs.config({
	alias: {
		'jquery': prefix + '/scripts/lib/jquery-1.7.2.js',
		'bootstrap': prefix + '/scripts/lib/bootstrap.min.js',
		'holder': prefix + '/scripts/lib/holder.js'
	},
	base: '/scripts',
	vars: {
		// TODO
	},
	preload: [
		'jquery',
		'bootstrap',
		'holder',
		'plugins/plugin-shim',
		'plugins/plugin-text',
		'plugins/plugin-nocache'
	],
	plugins: [
		// TODO
	],
	comboSyntax: ['?', '&'],
	comboExclueds: /widgets\/ueditor\.js/,
	shim: {
		// TODO
	},
	debug: true
});