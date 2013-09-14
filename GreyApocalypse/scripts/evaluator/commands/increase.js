define(['evaluator/env', 'evaluator/gaussianFunction'], function (e, gaussianFunction) {
	return function (command, p) {
		var env = e.environment;

		var currentValue = env.getValueAtPosition(p.x, p.y);

		var delta = gaussianFunction(currentValue, 18, 0, 30, 2); // range 2 to 20, centered at 0, "width" of 30

		delta = Math.ceil(delta);

		if (p.programNumber == 2) {
			delta *= -1;
		}

		return {
			command: command,
			program: p.programNumber,
			gameStateChanges: {
				x: p.x,
				y: p.y,
				delta: delta
			},
			commandLength: 3,
			instructionPointerDelta: 1
		};
	}
})