define([
	'ui/buttonHandlers/stepButtonHandler', 
	'ui/buttonHandlers/startButtonHandler',
	'ui/buttonHandlers/pauseButtonHandler',
	'ui/buttonHandlers/validateButtonHandler'], 
	function (stepButtonHandler, startButtonHandler, pauseButtonHandler, validateButtonHandler) {
	return function () {
		stepButtonHandler();
		startButtonHandler();
		pauseButtonHandler();
		validateButtonHandler();
	};
});