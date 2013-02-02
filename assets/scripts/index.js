seajs.config({
	base: '/scripts/',
	alias: {
		$: 'http://stk.ikanbao.fm:3000/scripts/lib/jquery.min'
	}
})
seajs.use(['$'], function() {

		console.log('hello World')

})
