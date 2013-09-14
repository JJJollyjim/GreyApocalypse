define([
	'evaluator/commands/increase',
	'evaluator/commands/moveLeft',
	'evaluator/commands/moveRight',
	'evaluator/commands/moveUp',
	'evaluator/commands/moveDown'], function (
		increaseCommand,
		moveLeftCommand,
		moveRightCommand,
		moveUpCommand,
		moveDownCommand) {
	return function (command, p) {
		switch (command.tag) {
			case 'increase': {
				return increaseCommand(command, p);
			}
			case 'moveLeft': {
				return moveLeftCommand(command, p);
			}
			case 'moveRight': {
				return moveRightCommand(command, p);
			}
			case 'moveUp': {
				return moveUpCommand(command, p);
			}
			case 'moveDown': {
				return moveDownCommand(command, p);
			}
		}
	}
})