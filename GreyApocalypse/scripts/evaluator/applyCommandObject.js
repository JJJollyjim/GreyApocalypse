// A command object looks like this:
// {
//    command: the command from the generated abstract syntax tree
//    program: an integer that identifies the program
//    gameStateChanges { // changes to game state that this command will do 
//       x: 3
//       y: 7
//       delta: -42
//    },
//    instructionPointerDelta: 1,
//    commandLength: 1
// }

define(['evaluator/env'], function (e) {
	return function (commandObject) {
		var env = e.environment;
		var c = commandObject;

		env.updateValueAtPositionWithDelta(
			c.gameStateChanges.x, 
			c.gameStateChanges.y, 
			c.gameStateChanges.delta);

		var p = c.program == 1 ? env.program1 : env.program2;
		p.instructionPointer += c.instructionPointerDelta;
		p.cyclePauseCount += c.commandLength;
	};
})