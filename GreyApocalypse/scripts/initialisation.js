// This module creates and returns a function that initialises the game

define(['evaluator/initialiseEnvironment'], function (initEnv) {
	return function () {
		//initEnv('infinite { +> }', 'infinite { repeat (10) { +> } v }')
		initEnv('+++', '++++');
	}
})