define([
	'evaluator/commands/increase',
	'evaluator/commands/moveLeft',
	'evaluator/commands/moveRight',
	'evaluator/commands/moveUp',
	'evaluator/commands/moveDown',
	'evaluator/commands/sleep',
	'evaluator/commands/infiniteLoopStart',
	'evaluator/commands/infiniteLoopEnd',
	'evaluator/commands/whileLoopStart',
	'evaluator/commands/whileLoopEnd',
	'evaluator/commands/repeatLoopStart',
	'evaluator/commands/repeatLoopEnd'], function (
		increaseCommand,
		moveLeftCommand,
		moveRightCommand,
		moveUpCommand,
		moveDownCommand,
		sleepCommand,
		infiniteLoopStartCommand,
		infiniteLoopEndCommand,
		whileLoopStartCommand,
		whileLoopEndCommand,
		repeatLoopStartCommand,
		repeatLoopEndCommand) {
	return function (command, p) {
		switch (command.tag) {
			case 'increase': 
				return increaseCommand(command, p);
			case 'moveleft': 
				return moveLeftCommand(command, p);
			case 'moveright': 
				return moveRightCommand(command, p);
			case 'moveup': 
				return moveUpCommand(command, p);
			case 'movedown': 
				return moveDownCommand(command, p);
			case 'sleep': 
				return sleepCommand(command, p);
			case 'infiniteloop': 
				return infiniteLoopStartCommand(command, p);
			case 'endinfiniteloop': 
				return infiniteLoopEndCommand(command, p);
			case 'while': 
				return whileLoopStartCommand(command, p);
			case 'endwhile': 
				return whileLoopEndCommand(command, p);
			case 'repeatloop': 
				return repeatLoopStartCommand(command, p);
			case 'endrepeatloop': 
				return repeatLoopEndCommand(command, p);

			default: 
				var errorMessage = 'Unknown command: ' + command.tag;
				console.error(errorMessage);
				throw new Error(errorMessage);
		}
	}
})