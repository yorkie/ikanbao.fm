
/* 用于整合 UEditor */

define('ueditor', function(require, exports, module) {

	require('lib/ueditor/editor_config.js')
	require('lib/ueditor/editor_all.js')
	module.exports = exports = UE.ui.Editor

})