define(['ui/drawUI', 'evaluator/env', 'ui/updateGameState'], function (drawUI, e, setGameState) {
	return function () {
		var env = e.environment;

		drawUI();

		var winnerMessage = "Game over! ";
		var winnerProgram = (env.sum[0]-env.sum[1])>0?1:(env.sum[0]-env.sum[1])==0?0:2;
		if (winnerProgram == 0) {
			winnerMessage += 'It\' a draw! ';
		} else {
			winnerMessage += 'Player ' + winnerProgram + ' won the game! ';
		}

		alert(winnerMessage);

		setGameState(3); // game over
	};
});