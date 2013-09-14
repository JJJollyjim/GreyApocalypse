define([], function () {
	return function (command, p) {
		return {
			command: command,
			program: p.programNumber,
			gameStateChanges: {
				x: 0,
				y: 0,
				delta: 0
			},
			commandLength: 1,
			instructionPointerDelta: 1
		};
	}
})