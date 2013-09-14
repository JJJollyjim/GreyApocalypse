define([], function () {
	return function (command, p) {
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