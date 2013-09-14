define(['ui/canvasDrawing', 'evaluator/env', 'jquery'], function (canvasDrawing, e, $) {
	return function () {
		var env = e.environment;

		var ctx = document.getElementById('gameStateCanvas').getContext('2d');
		canvasDrawing(ctx);

		var formatScore = function (score) {
			return '' + (score < 0 ? -score : score);
		};

		$('#progressBar').attr('value', env.stepCount);
		$('#gameSum').html(formatScore(env.sum));
		$('#winner').html(env.sum>0?'Program 1':env.sum==0?'Tie':'Program 2');
	}
});