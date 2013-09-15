define([
	'ui/buttonHandlers/startButtonHandler',
	'ui/buttonHandlers/pauseButtonHandler',
	'ui/buttonHandlers/stepButtonHandler', 
	'ui/buttonHandlers/restartButtonHandler',
	'ui/buttonHandlers/resetButtonHandler',
	'ui/buttonHandlers/validateButtonHandler'], 
	function (startButtonHandler, pauseButtonHandler, stepButtonHandler, restartButtonHandler, resetButtonHandler, validateButtonHandler) {
	return function () {
		startButtonHandler();
		pauseButtonHandler();
		stepButtonHandler();
		restartButtonHandler();
		resetButtonHandler();
		validateButtonHandler();
	};
});