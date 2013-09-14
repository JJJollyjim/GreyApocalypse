// This module validates programas using the PEG.js parser

// parameter programSource: A string that contains the source code of the program that will be validated

// returns: nothing if validation succeeds, of an error object that contains more information.
// If an error occurs, the returned object has the following properties:
//  .line      Line number
//  .column    Coloumn number
//  .message   A message describing the error

define(['parser/parser'], function (parser) {
	return function (programSource) {
		try {
			parser(programSource);
			return;
		} catch (err) {
			return err;
		}
	}
});