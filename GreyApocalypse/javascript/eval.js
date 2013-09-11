var env = {
	loaded: false
};

var initPrograms = function (program1, program2, keepScore) {
	var prevSum = [0, 0];
	if (keepScore) {
		prevSum = env.sum;
	}
	env = {
		program1: {
			sourceString: program1,
			ast: [],
			index: 0,
			x: 0,
			y: 0,
			finished: false,
			loopStack: []
		},
		program2: {
			sourceString: program2,
			ast: [],
			index: 0,
			x: 5,
			y: 5,
			finished: false,
			loopStack: []
		},
		nextProgram: 1,
		stepCount: 0,
		maxStepCount: 2500,
		sum: [0, 0],
		currentSum: function() { return env.sum[env.stage-1]; },
		loaded: true,
		gameState: [[], [], [], [], [], [], [], [], [], []],
		stage: 1 // Game runs twice. Stage 1: normal, stage 2: programs swapped
	};
	env.sum = prevSum;
	env.program1.ast = parser.parse(env.program1.sourceString);
	env.program2.ast = parser.parse(env.program2.sourceString);
	for (var i = 0; i < 10; ++i) {
		env.gameState[i] = [127, 127, 127, 127, 127, 127, 127, 127, 127, 127];
	}
};

var validateProgram = function (sourceString) {
	try {
		parser.parse(sourceString);
		return;
	} catch (err) {
		return err;
	}
}

var validateProgramsAndShowErrors = function () {
	var p1 = $('#p1textarea').val();
	var p2 = $('#p2textarea').val();
	var err = validateProgram(p1);
	if (err) {
		alert('Program 1 has an error (line ' + err.line + ', col ' + err.column + '):\n' + err.message);
		return false;
	}
	err = validateProgram(p2);
	if (err) {
		alert('Program 2 has an error (line ' + err.line + ', col ' + err.column + '):\n' + err.message);
		return false;
	}
	return true;
}

/*
Programming language:
<v>^: move
=: setToAverage
+: increase
*/
var stepProgram = function (programNumber) {
	// Returns: whether another command will need to be run for the current program
	/*
	GA Loop skipping
	
	+ : skip
	- : don't skip

	If statement
	    Start
	        Condition true: -
	        Condition false: -
	    End
	        +
	
	While loops
	    Start
	        Condition true: -
	        Condition false: -
	    End
	        Condition true: +
	        Condition false: -
	
	Repeat loops
	    Start
	        Not finished yet: -
	        Finished: -
	    End
	        Not finished yet: +
	        Finished: -
	
	Infinite loops
	    Start: -
	    End: +
	*/
	var executeNextCommandImmediately = false;
	var p = getProgramObject(programNumber);
	if (p.finished)
		return;
	var currentCommand = p.ast[p.index];
	switch (currentCommand.tag) {
		case 'moveleft':
			eval_moveleft(programNumber);
			p.index++;
		break;
		case 'moveright':
			eval_moveright(programNumber);
			p.index++;
		break;
		case 'moveup':
			eval_moveup(programNumber);
			p.index++;
		break;
		case 'movedown':
			eval_movedown(programNumber);
			p.index++;
		break;
		case 'setToAverage':
			eval_setToAverage(programNumber);
			p.index++;
		break;
		case 'increase':
			eval_increase(programNumber);
			p.index++;
		break;
		case 'sleep':
			p.index++;
		break;
		case 'infiniteloop':
			p.index++;
			executeNextCommandImmediately = false;
		break;
		case 'endinfiniteloop':
			// Add 1 to skip infiniteloop command
			p.index += currentCommand.startIndexDelta + 1;
			executeNextCommandImmediately = true;
		break;
		case 'if':
			if (checkCondition(programNumber, currentCommand.condition, { x:p.x, y:p.y })) {
				p.index++;
			} else {
				p.index += currentCommand.endIndexDelta + 1;
			}
			executeNextCommandImmediately = false;
		break;
		case 'endif':
			p.index++;
			executeNextCommandImmediately = true;
		break;
		case 'while':
			var currentLocation = { x:p.x, y:p.y };
			if (checkCondition(programNumber, currentCommand.condition, currentLocation)) {
				p.loopStack.push(currentLocation);
				p.index++;
			} else {
				p.index += currentCommand.endIndexDelta + 1;
			}
			executeNextCommandImmediately = false;
		break;
		case 'endwhile':
			var locationFromLoopStack = p.loopStack.pop();
			if (checkCondition(programNumber, currentCommand.condition, locationFromLoopStack)) {
				// condition succeeded, push value back and jump to first command (one after start of while loop)
				p.loopStack.push(locationFromLoopStack); // no .peek() method
				p.index += currentCommand.startIndexDelta + 1;
				executeNextCommandImmediately = true;
			} else {
				// condition failed, continue. Loop stack is already popped.
				p.index++;
				executeNextCommandImmediately = false;
			}
		break;
		case 'repeatloop':
		    currentCommand.currentIteration = 1;
			if (currentCommand.iterationCount <= 0) {
				// Skip loop
				p.index += currentCommand.endIndexDelta + 1;
			} else {
				p.index++;
			}
			executeNextCommandImmediately = false;
		break;
		case 'endrepeatloop':
			var startingLoopCommand = p.ast[p.index + currentCommand.startIndexDelta];
			if (startingLoopCommand.currentIteration++ >= startingLoopCommand.iterationCount) {
				// Exit
				p.index++;
				executeNextCommandImmediately = false;
			} else {
				// Repeat
				p.index += currentCommand.startIndexDelta;
				p.index++;
			}
		break;
		default:
			throw new Error('Unknown command!');
		break;
	}
	if (p.index >= p.ast.length) {
		p.finished = true;
	}
	return executeNextCommandImmediately;
};

var isGameOver = function () {
	if (!env.loaded)
		return true;
	if (env.program1.finished && env.program2.finished)
		return true;
	if (env.stepCount >= env.maxStepCount)
		return true;
	return false;
}

var currentWinner = function () {
	if (!isGameOver()) {
		return -1;
	}
	if (env.currentSum() > 0)
		return 1;
	if (env.currentSum() < 0)
		return 2;
	return 0;
}

var winner = function () {
	if (!isGameOver()) {
		return -1;
	}
	if (env.sum[0] + env.sum[1] > 0)
		return 1;
	if (env.sum[0] + env.sum[1] < 0)
		return 2;
	return 0;
}

var step = function () {
	// stepProgram returns true if a loop was evaluated.
	// Therefore I can use a while loop in my evaluator to avoid performance 
	// penalties when users want to use loops in the programming language.
	for (var i = 0; i < 10; ++i) { if (stepProgram(1)) break; }
	for (var i = 0; i < 10; ++i) { if (stepProgram(2)) break; }
	//while (stepProgram(1)) {}
	//while (stepProgram(2)) {}
	env.stepCount++;
	swapProgramsIfGameOver();
	return isGameOver();
}

var swapProgramsIfGameOver = function () {
	if (isGameOver()) {
		if (env.stage == 1) {
			swapProgramsAndReset();
			return true;
		}
	}
	return false;
}

var swapProgramsAndReset = function () {
	initPrograms(env.program2.sourceString, env.program1.sourceString, true); // 'true' as third parameter keeps score
	env.stage = env.stage == 1 ? 2 : 1;
}

var getValAtPos = function (x, y) {
	if (x < 0 || x > 9 || y < 0 || y > 9) // This is important for the '=' command
		return 127;
	return env.gameState[x][y];
};
var setValAtPos = function (x, y, val) {
	env.gameState[x][y] = val;
};

var checkCondition = function (programNumber, cond, location) {
	// checks a condition.
	// NOTE: From both player's point of view, they are trying to increase the value to 255. So p2 needs to be inverted.
	var value1 = programNumber == 1 ? getValAtPos(location.x, location.y) : 255 - getValAtPos(location.x, location.y);
	var value2 = cond.number;
	var comparator = cond.comparator;
	if (comparator == '>') {
		if (value1 > value2) {
			return true;
		}
	}
	if (comparator == '<') {
		if (value1 < value2) {
			return true;
		}
	}
	return false;
}

var getProgramObject = function (program) {
	return program === 1 ? env.program1 : env.program2;
};
var wrapCoordinate = function (x) {
	if (x < 0)
		x = 9;
	if (x > 9)
		x = 0;
	return x;
};
var wrapCoords = function () {
	env.program1.x = wrapCoordinate(env.program1.x);
	env.program1.y = wrapCoordinate(env.program1.y);
	env.program2.x = wrapCoordinate(env.program2.x);
	env.program2.y = wrapCoordinate(env.program2.y);
};

var eval_moveup = function (program) {
	getProgramObject(program).y--;
	wrapCoords();
};
var eval_movedown = function (program) {
	getProgramObject(program).y++;
	wrapCoords();
};
var eval_moveleft = function (program) {
	getProgramObject(program).x--;
	wrapCoords();
};
var eval_moveright = function (program) {
	getProgramObject(program).x++;
	wrapCoords();
};
var eval_setToAverage = function (program) {
	var p = getProgramObject(program);
	var p1 = { x: wrapCoordinate(p.x+1), y: wrapCoordinate(p.y  ) };
	var p2 = { x: wrapCoordinate(p.x-1), y: wrapCoordinate(p.y  ) };
	var p3 = { x: wrapCoordinate(p.x  ), y: wrapCoordinate(p.y+1) };
	var p4 = { x: wrapCoordinate(p.x  ), y: wrapCoordinate(p.y-1) };
	var v1 = getValAtPos(p1.x, p1.y);
	var v2 = getValAtPos(p2.x, p2.y);
	var v3 = getValAtPos(p3.x, p3.y);
	var v4 = getValAtPos(p4.x, p4.y);
	var values = [v1, v2, v3, v4];
	var ignoredValue = program === 1 ? Math.min.apply(null, values) : Math.max.apply(null, values);
	var sum = v1 + v2 + v3 + v4 - ignoredValue;
	var newValue = sum / 3;
	if (program === 1) // p1 tries to get highest value
		newValue = Math.ceil(newValue);
	if (program === 2) // p2 tries to get lowest value
		newValue = Math.floor(newValue);
	// Increase sum
	var originalValue = getValAtPos(p.x, p.y);
	var difference = newValue - originalValue;
	env.sum[env.stage-1] += difference;
	setValAtPos(p.x, p.y, newValue);
};
var eval_increase = function (program) {
	var p = getProgramObject(program);
	var currentValue = getValAtPos(p.x, p.y);
	var delta = gaussianFunction(currentValue, 18, 127, 30, 2); // range 2 to 20, centered at 127, "width" of 30
	delta = Math.ceil(delta);
	if (program == 1) {
		currentValue += delta;
	} else {
		currentValue -= delta;
	}
	if (currentValue > 255) {
		currentValue = 255;
	}
	if (currentValue < 0) {
		currentValue = 0;
	}
	var difference = currentValue - getValAtPos(p.x, p.y);
	env.sum[env.stage-1] += difference;
	setValAtPos(p.x, p.y, currentValue);
};

// from http://en.wikipedia.org/wiki/Gaussian_function
// a: height of curve, 
// b: center position, 
// c: width of bell curve
// d: constant minimum height
var gaussianFunction = function (x, a, b, c, d) {
	var e = 2.7182818;
	return d + (a * Math.pow(e, -(((x-b)*(x-b))/(2*(c*c)))));
}