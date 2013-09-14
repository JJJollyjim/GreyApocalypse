// -1: stopped (first run)
// 0: stopped (reset)
// 1: running
// 2: paused
// 3: game over

define(['ui/gameState', 'jquery'], function (gameState, $) {
	return function (state) {
		gameState.gameState = state;
		switch (state) {
			case -1: // game stopped (first run)
				$('#startButton').removeAttr('disabled');
				$('#pauseButton').attr('disabled', 'disabled');
				$('#stepButton').attr('disabled', 'disabled');
				$('#restartButton').attr('disabled', 'disabled');
				$('#resetButton').attr('disabled', 'disabled');
				$('#validateButton').removeAttr('disabled');
				$('#p1textarea').removeAttr('disabled');
				$('#p2textarea').removeAttr('disabled');
				$('#roundLength').removeAttr('disabled');
			break;
			case 0: // game stopped
				$('#startButton').removeAttr('disabled');
				$('#pauseButton').attr('disabled', 'disabled');
				$('#stepButton').attr('disabled', 'disabled');
				$('#restartButton').attr('disabled', 'disabled');
				$('#resetButton').attr('disabled', 'disabled');
				$('#validateButton').removeAttr('disabled');
				$('#p1textarea').removeAttr('disabled');
				$('#p2textarea').removeAttr('disabled');
				$('#roundLength').removeAttr('disabled');
			break;
			case 1: // running
				$('#startButton').attr('disabled', 'disabled');
				$('#pauseButton').removeAttr('disabled');
				$('#stepButton').attr('disabled', 'disabled');
				$('#restartButton').removeAttr('disabled');
				$('#resetButton').removeAttr('disabled');
				$('#validateButton').attr('disabled', 'disabled');
				$('#p1textarea').attr('disabled', 'disabled');
				$('#p2textarea').attr('disabled', 'disabled');
				$('#roundLength').attr('disabled', 'disabled');
			break;
			case 2: // paused
				$('#startButton').removeAttr('disabled');
				$('#pauseButton').attr('disabled', 'disabled');
				$('#stepButton').removeAttr('disabled');
				$('#restartButton').removeAttr('disabled');
				$('#resetButton').removeAttr('disabled');
				$('#validateButton').attr('disabled', 'disabled');
				$('#p1textarea').attr('disabled', 'disabled');
				$('#p2textarea').attr('disabled', 'disabled');
				$('#roundLength').attr('disabled', 'disabled');
			break;
			case 3: // game over
				$('#startButton').attr('disabled', 'disabled');
				$('#pauseButton').attr('disabled', 'disabled');
				$('#stepButton').attr('disabled', 'disabled');
				$('#restartButton').removeAttr('disabled');
				$('#resetButton').removeAttr('disabled');
				$('#validateButton').removeAttr('disabled');
				$('#p1textarea').removeAttr('disabled');
				$('#p2textarea').removeAttr('disabled');
				$('#roundLength').removeAttr('disabled');
			break;
		}
	};
});