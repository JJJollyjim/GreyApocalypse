// This module initialises and resets the environment.
// It should be run whenever the programs need to be restarted.

// parameters program1source, program2source: these two parameters are two
// strings that the user has entered. They will be parsed and the result will be
// stored in evaluator/env.

// returns: nothing

define(['evaluator/env', 'parser/parser'], function (env, parser) {
	return function (program1source, program2source) {
		env.environment = {
			program1: {
				sourceString: '',
				ast: [],
				instructionPointer: 0,
				x: 0,
				y: 0,
				finished: false,
				loopStack: [],
				programNumber: 1,
				cyclePauseCount: 0 // Number of cycles this program is busy
			},
			program2: {
				sourceString: '',
				ast: [],
				instructionPointer: 0,
				x: 5,
				y: 5,
				finished: false,
				loopStack: [],
				programNumber: 2,
				cyclePauseCount: 0
			},
			stepCount: 0,
			maxStepCount: 2500,
			sum: 0,
			gameState: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			],
			getValueAtPosition: function (x, y) {
				if (x < 0 || x > 9 || y < 0 || y > 9) {
					return 0;
				}
				return env.environment.gameState[x][y];
			},
			setValueAtPosition: function (x, y, val) {
				if (x < 0 || x > 9 || y < 0 || y > 9) {
					console.error('Tried to set value at x:' + x + ' y:' + y + ' val:' + val)
					return;
				}
				env.environment.gameState[x][y] = val;
			},
			updateValueAtPositionWithDelta: function (x, y, delta) {
				var previousValue = env.environment.getValueAtPosition(x, y);
				var newValue = previousValue + delta;
				env.environment.setValueAtPosition(x, y, newValue);
			}
		};

		env.environment.program1.sourceString = program1source;
		env.environment.program2.sourceString = program2source;

		env.environment.program1.ast = parser(program1source);
		env.environment.program2.ast = parser(program2source);
	}
});