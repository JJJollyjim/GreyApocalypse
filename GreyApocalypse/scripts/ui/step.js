define(['evaluator/executeCommand', 'ui/handleGameOver', 'ui/drawUI'], function (executeCommand, handleGameOver, drawUI) {
	return function () {
		if (executeCommand()) {
			// executeCommand() returns true when game is over
			handleGameOver();
			return true;
		} else {
			drawUI();
			return false;
		}
	};
});