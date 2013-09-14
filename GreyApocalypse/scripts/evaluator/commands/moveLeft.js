define(['evaluator/env'], function (e) {
	return function (command, p) {
		var env = e.environment;

		p.x--;
		if (p.x < 0) {
			p.x = 9;
		}

		return {
			command: command,
			program: p.programNumber,
			gameStateChanges: {
				x: 0,
				y: 0,
				delta: 0
			},
			commandLength: 2,
			instructionPointerDelta: 1
		};
	}
})