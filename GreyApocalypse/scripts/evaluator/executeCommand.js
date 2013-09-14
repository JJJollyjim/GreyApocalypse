// This module executes the commands necessary for one cycle
// Each program will run one command by default, but loop unwrapping
// can cause a program to run up to 10 commands
//
// This module does this in two steps:
//  1 - Commands for both programs are converted to a commands object
//      that will be pushed on to the commands array
//  2 - The two commands are executed
//
// These two steps can and will repeat as long as there are more
// commands that need to be run because of loop unwrapping.
// 
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
//

define(['evaluator/env', 'evaluator/convertCommandToCommandObject', 'evaluator/applyCommandObject'], function (e, convert, applyCommandObject) {
	return function () {

		var commands = [];
		
		// Returns: true if another command can be executed, false if no more commands should be executed
		var tryQueueNextCommandForProgram = function (p) {
			if (p.finished) {
				return false;
			}

			if (p.cyclePauseCount >= 1) {
				return false;
			}

			if (p.instructionPointer >= p.ast.length) {
				p.finished = true;
				return false;
			}

			var currentCommand = p.ast[p.instructionPointer];
			var cmdObject = convert(currentCommand, p);
			commands.push(cmdObject);
			return cmdObject.commandLength == 0;
		}

		var env = e.environment;

		env.stepCount++;

		var p1 = env.program1;
		var p2 = env.program2;

		if (p1.cyclePauseCount >= 1) {
			p1.cyclePauseCount--;
		}
		if (p2.cyclePauseCount >= 1) {
			p2.cyclePauseCount--;
		}

		var queueAndExecuteCommands = function () {
			tryQueueNextCommandForProgram(p1);
			tryQueueNextCommandForProgram(p2);
			if (commands.length == 0) {
				return false;
			}
			while (commands.length != 0) {
				applyCommandObject(commands.shift());
			}
			return true;
		}

		while (queueAndExecuteCommands() == true) { }

		return p1.finished && p2.finished;
	}
});