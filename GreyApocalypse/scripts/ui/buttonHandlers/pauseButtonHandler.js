define(['jquery', 'ui/updateGameState'], function ($, updateGameState) {
	return function () {
		$('#pauseButton').click(function () {
			updateGameState(2); // Pause
		})
	}
});