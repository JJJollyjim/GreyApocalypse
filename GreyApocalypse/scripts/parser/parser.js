// This module is a wrapper around the PEG.js parser function, 
// which is used for parsing user-entered code, and for converting that code into an AST.

// parameter input: A user-entered string that contains GA source code

// returns: The generated abstract syntax tree

define(['pegjs'], function (parser) {
	return function (input) {
		return parser.parse(input);
	};
});