define(['evaluator/commands/increase'], function (increaseCommand) {
	return function (command, p) {
		switch (command.tag) {
			case 'increase': {
				return increaseCommand(command, p);
			}
		}
	}
})