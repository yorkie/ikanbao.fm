/* flashDB.js */


/**
 * Global Data Pool.
 * It's a map only consisted of any number of arrays, 
 * and even users can NOT access any data here directly,
 * so the 'global' variable is not public.
 */

var globalFlashPool = {}

/**
 * FlashSegment Constructor.
 * @param name -> the name of the segment
 * @param keys -> the keys of the segment, like this: ['name', 'email']
 */

var FlashSegment = function(name, keys) {
	this.name = name
	this.keys = keys
	this.freelist = [0]
	this.pointers = {}
	globalFlashPool[name] = []
	return this
}

/**
 * get a value in globalFlashPool by @by & @key.
 * @param key
 * @param by
 */

FlashSegment.prototype.get = function(key, by) {
	var ii = -1
	by = by || this.defaultKey
	ii = this.pointers[by][key]
	return globalFlashPool[this.name][ii]
}

/**
 * set a value within a number of keys.
 * @param value
 */

FlashSegment.prototype.set = function(value) {
	var i = this.freelist[0]
	this.freelist = [i + 1]
	globalFlashPool[this.name][i] = value

	for (var j=0; j<this.keys.length; j++) {
		var key = this.keys[j]
		if (j === 0) {
			this.defaultKey = key
		}
		if (!this.pointers[key]) {
			this.pointers[key] = {}
		}
		this.pointers[key][value[key]] = i
	}
	return this
}

/**
 * isExisted
 */

FlashSegment.prototype.isExisted = function(flashLike) {
	// TODO
}

/**
 * Export
 */

var Export = {}

/**
 * An shortcut of the 'new FlashSegment()' method.
 */

Export.create = function(name, keys) {
	if (name == 'createFlash') {
		throw 'name conflict'
	}
	return Export[name] = new FlashSegment(name, keys)
}

/**
 * define the field in @Export for lookupping @globalFlashPool,
 * It's unwritable.
 */

Object.defineProperty(Export, 'global', {
	value: function() {
		return globalFlashPool
	},
	writable: false
})

module.exports = Export
