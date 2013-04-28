
/* 用于整合 UEditor */

define(function(require, exports, module) {

	require('./ueditor/editor_config.js?seajs-nocache')
	require('./ueditor/editor_all.js?-seajs-nocache')
	module.exports = exports = UE.ui.Editor

})