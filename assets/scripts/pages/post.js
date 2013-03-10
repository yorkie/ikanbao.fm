
/* post */

seajs.use([], function() {

	var $kan = $('#kan')
	var $issue = $('#issue')

	if (location.hash === '#kan') {
		$kan.show()
		$issue.hide()
	}

	if (location.hash === '#issue') {
		$kan.hide()
		$issue.show()
	}

})