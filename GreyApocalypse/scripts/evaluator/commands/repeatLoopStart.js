define([], function () {
	return function (command, p) {
		command.currentIteration = 1;
		var instructionPointerDelta = 0;
		if (command.iterationCount <= 0) {
			// Skip loop
			instructionPointerDelta = command.endIndexDelta + 1;
		} else {
			instructionPointerDelta = 1;
		}

		return {
			command: command,
			program: p.programNumber,
			gameStateChanges: {
				x: 0,
				y: 0,
				delta: 0
			},
			commandLength: 1,
			instructionPointerDelta: instructionPointerDelta
		};
	};
});