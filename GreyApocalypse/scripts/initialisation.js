// This module creates and returns a function that initialises the game

define(['evaluator/initialiseEnvironment', 'ui/buttonHandlers/initButtonHandlers', 'ui/drawUI', 'jquery'], function (initEnv, initButtonHandlers, drawUI, $) {
	return function () {
		initEnv('.', '.');

		initButtonHandlers();
		drawUI();

		if (localStorage.program1)
			$('#p1textarea').val(localStorage.program1);
		if (localStorage.program2)
			$('#p2textarea').val(localStorage.program2);
	};
});