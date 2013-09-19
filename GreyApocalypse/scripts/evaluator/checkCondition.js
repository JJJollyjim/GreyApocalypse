define(['evaluator/env'], function (e) {
	return function (programNumber, cond, location) {
		// Checks a condition.
		// Note: From both player's point of view, they are trying to increase the value to 255. So p2 needs to be inverted.

		var env = e.environment;

		var value1 = (programNumber == 1 ? 1 : -1) * env.getValueAtPosition(location.x, location.y);
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
})