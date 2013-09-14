// This module converts a value from memory to a color that will be shown in the canvas

// parameter value: value from memory that will need to be converted into a colour

// returns: A string representing a colour that will be used when drawing the canvas

define(function () {
	return function (value) {
		var brightness = value + 127;
		return 'rgb(' + brightness + ',' + brightness + ',' + brightness + ')';
	};
});