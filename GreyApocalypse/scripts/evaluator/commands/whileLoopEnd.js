define(['evaluator/checkCondition'], function (checkCondition) {
	return function (command, p) {
		var currentLocation = { x:p.x, y:p.y };
		var instructionPointerDelta = 0;
		var locationFromLoopStack = p.loopStack.pop();
		if (checkCondition(p.programNumber, command.condition, currentLocation)) {
			// condition succeeded, push value back and jump to first command (one after start of while loop)
			p.loopStack.push(locationFromLoopStack); // no .peek() method
			instructionPointerDelta = command.startIndexDelta + 1;
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