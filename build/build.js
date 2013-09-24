({
	baseUrl: '../GreyApocalypse/scripts',
	paths: {
		// the left side is the module ID,
		// the right side is the path to
		// the jQuery file, relative to baseUrl.
		// Also, the path should NOT include
		// the '.js' file extension.
		jquery: 'lib/jquery-1.10.2.min',
		pegjs: 'parser/pegjs'
	},
	shim: {
		// Used for libraries that don't support require.js
		'pegjs': {
			exports: 'parser'
		}
	},
	name: 'main',
	out: 'main-built.js'
})