define(['jquery', 'ui/step'], function ($, step) {
	return function () {
		$('#stepButton').click(step);
	}
});