define(['jquery', 'evaluator/validateProgram'], function ($, validateProgram) {
	return function () {
		$('#validateButton').click(function () {
			var p1 = $('#p1textarea').val();
			var p2 = $('#p2textarea').val();

			var err = validateProgram(p1);
			if (err) {
				alert('Program 1 has an error (line ' + err.line + ', col ' + err.column + '):\n' + err.message);
				return;
			}
			err = validateProgram(p2);
			if (err) {
				alert('Program 2 has an error (line ' + err.line + ', col ' + err.column + '):\n' + err.message);
				return;
			}
			alert('No errors found!');
		});
	};
});