define([
	'evaluator/commands/increase',
	'evaluator/commands/moveLeft',
	'evaluator/commands/moveRight',
	'evaluator/commands/moveUp',
	'evaluator/commands/moveDown',
	'evaluator/commands/sleep'], function (
		increaseCommand,
		moveLeftCommand,
		moveRightCommand,
		moveUpCommand,
		moveDownCommand,
		sleepCommand) {
	return function (command, p) {
		switch (command.tag) {
			case 'increase': {
				return increaseCommand(command, p);
			}
			case 'moveleft': {
				return moveLeftCommand(command, p);
			}
			case 'moveright': {
				return moveRightCommand(command, p);
			}
			case 'moveup': {
				return moveUpCommand(command, p);
			}
			case 'movedown': {
				return moveDownCommand(command, p);
			}
			case 'sleep': {
				return sleepCommand(command, p);
			}
		}
	}
})