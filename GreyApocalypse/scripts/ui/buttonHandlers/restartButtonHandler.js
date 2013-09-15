define(['jquery', 'ui/loadPrograms', 'ui/updateGameState'], function ($, loadPrograms, updateGameState) {
	return function () {
		$('#restartButton').click(function () {
			loadPrograms();
			updateGameState(1);
		})
	}
});