seajs.config({
	base: '/scripts/',
	alias: {
		$: 'lib/jquery.min'
	}
})
seajs.use(['$'], function() {

		console.log('hello World')

})
