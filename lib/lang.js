
/* enhance the language */

var Lang = function(scope) {
	this.scope = scope || global
	this.value = scope
}

Lang.prototype.scope = 0
Lang.prototype.value = 0
Lang.prototype.checkable = 0
Lang.prototype.ok = function() {}
Lang.prototype.worse = function() {}
Lang.prototype.$ = function(selector, defaultValue) {
	return !this.scope ?
		(defaultValue || '') :
		(this.scope[selector] || defailtValue || '')
}
Lang.prototype.set = function(state, fn) {
	this.checkable = 1
	this[state] = fn || function() {}
	return this
}
Lang.prototype.check = function() {
	
	(this.checkable
		&& (this.value && (this.ok.call(this, this.$) || 1) || (this.worse.call(this, this.$) || 1)))
		|| (
			function(text) { throw text	}
		)( "errors on lang.js" );
	return this
}

exports.context = function(scope) {

	var lang = new Lang(scope);
	return {
		isOk: function(fn) {
			return lang.set('ok', fn)
		},
		isWorse: function(fn) {
			return lang.set('worse', fn)
		}

	}
}
