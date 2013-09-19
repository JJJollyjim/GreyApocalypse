define(['jquery', 'ui/updateGameState', 'evaluator/initialiseEnvironment', 'ui/drawUI'], 
	function ($, loadPrograms, updateGameState, initialiseEnvironment, drawUI) {
	return function () {
		$('#restartButton').click(function () {
			initialiseEnvironment('.', '.');
			updateGameState(1);
			drawUI();
		})
	}
});