define(['jquery', 'ui/loadPrograms', 'ui/gameState', 'ui/updateGameState'], function ($, loadPrograms, gs, updateGameState) {
	return function () {
		$('#startButton').click(function () {
			var programErrors = false;
			if (gs.gameState == -1 || gs.gameState == 0 || gs.gameState == 3) { 
				// if game is stopped or if game is over
				// Game has already ended, load programs and start
				programErrors = !loadPrograms();
			}
			if (!programErrors) {
				updateGameState(1);
			}
		})
	}
});