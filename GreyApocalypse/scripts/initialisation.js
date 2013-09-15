// This module creates and returns a function that initialises the game

define(['evaluator/initialiseEnvironment', 'ui/buttonHandlers/initButtonHandlers', 'ui/drawUI'], function (initEnv, initButtonHandlers, drawUI) {
	return function () {
		//initEnv('infinite { +> }', 'infinite { repeat (10) { +> } v }')
		initEnv('.', '.');

		initButtonHandlers();
		drawUI();
	}
})