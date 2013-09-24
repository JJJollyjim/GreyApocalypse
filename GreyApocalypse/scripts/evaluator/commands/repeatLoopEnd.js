define([], function () {
	return function (command, p) {
		var startingLoopCommand = p.ast[p.instructionPointer + command.startIndexDelta];
		var instructionPointerDelta = 0;
		if (startingLoopCommand.currentIteration++ >= startingLoopCommand.iterationCount) {
			// Exit
			instructionPointerDelta = 1;
		} else {
			// Repeat
			instructionPointerDelta = command.startIndexDelta + 1;
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