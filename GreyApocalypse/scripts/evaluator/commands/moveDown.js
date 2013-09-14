define([], function () {
	return function (command, p) {
		p.y++;
		if (p.y > 9) {
			p.x = 0;
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