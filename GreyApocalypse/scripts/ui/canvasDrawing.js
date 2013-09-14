define(['ui/colourConverter', 'evaluator/env'], function (colourConverter, env) {
	return function (ctx) {
		// Fills the canvas with 127-grey
		// This is used as background and border
		ctx.fillStyle = colourConverter(0);
		ctx.fillRect(0, 0, 320, 320);

		// Iterate over every byte of memory, and draw it individually
		for (var i = 0; i < 10; ++i) {
			for (var j = 0; j < 10; ++j) {
				var currentValue = env.environment.gameState[i][j];
				var colour = colourConverter(currentValue);
				ctx.fillStyle = colour;
				ctx.fillRect(i*30 + 10, j*30 + 10, 30, 30);
			}
		}

		// The squares that will show the programs' locations 
		// should have a thick border
		ctx.lineWidth = 5;

		// player 1's location, shown by a square
		ctx.strokeStyle = 'white';
		ctx.strokeRect(
			env.environment.program1.x*30 + 10, 
			env.environment.program1.y*30 + 10, 
			30, 
			30);

		// player 2's location, shown by a square
		ctx.strokeStyle = 'black';
		ctx.strokeRect(
			env.environment.program2.x*30 + 10, 
			env.environment.program2.y*30 + 10, 
			30, 
			30);
	}
});