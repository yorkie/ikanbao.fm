
/**
 * Sets.Table
 */

define(function(require, exports, module) {
	
	var Table, _tables

	/**
	 * constructor
	 */

	Table = function(name) {
		this._id_ = name + '_' + (+new Date())
		this._set = []
		this._source = ''
	}

	/**
	 * add
	 * @param value
	 */

	Table.prototype.add = function(value) {
		this._set.push(value)
		this._source = this._set.join('_')
	}

	/**
	 * del
	 * @param i
	 */

	Table.prototype.del = function(index) {
		delete this._set[index]
	}

	/**
	 * get
	 * @param i
	 */

	Table.prototype.get = function(index) {
		return this._set[index]
	}

	module.exports = Table

})