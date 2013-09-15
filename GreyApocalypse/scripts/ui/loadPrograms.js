// This module loads programs from the textareas

// returns: true is the programs don't have errors, false if there is an error

define(['evaluator/initialiseEnvironment', 'evaluator/env', 'evaluator/validateProgram', 'jquery'], function(initialiseEnvironment, e, validateProgram, $) {
	return function () {
		var env = e.environment;

		var p1 = $('#p1textarea').val();
		var p2 = $('#p2textarea').val();

		localStorage.program1 = p1;
		localStorage.program2 = p2;

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

		initialiseEnvironment(p1, p2);

		env.maxStepCount = parseInt($('#roundLength>option:selected').text());

		$('#progressBar').attr('max', env.maxStepCount);

		return true;
	}
})