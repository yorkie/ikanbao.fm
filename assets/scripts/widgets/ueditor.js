
/* 用于整合 UEditor */

define('widgets/ueditor', null, function(require, exports, module) {

	require('lib/ueditor/editor_config.js')
	require('lib/ueditor/editor_all.js')
	module.exports = exports = UE.ui.Editor

})