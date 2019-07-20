/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = config => {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard', groups: [ 'undo', 'clipboard' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'paragraph', groups: [ 'list', 'blocks', 'indent', 'align', 'bidi', 'paragraph' ] }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript,Cut,Copy,Paste,PasteText,PasteFromWord,Link,Unlink,Anchor,SpecialChar,Table,Maximize,Source,About,Styles,Format,Outdent,Indent'

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre'

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced'

	config.removePlugins = 'floatingspace, maximize, resize'
	
	config.extraPlugins = 'divarea, sharedspace, sourcedialog'
};
