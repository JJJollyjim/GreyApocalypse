define(['evaluator/checkCondition'], function (checkCondition) {
	return function (command, p) {
		var currentLocation = { x:p.x, y:p.y };
		var instructionPointerDelta = 0;
		if (checkCondition(p.programNumber, command.condition, currentLocation)) {
			p.loopStack.push(currentLocation);
			instructionPointerDelta = 1;
		} else {
			instructionPointerDelta = currentCommand.endIndexDelta + 1;
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