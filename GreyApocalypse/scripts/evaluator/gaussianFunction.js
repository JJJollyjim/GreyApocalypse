// This module implements a gaussian function that is used for the + command

// from http://en.wikipedia.org/wiki/Gaussian_function
// a: height of curve, 
// b: center position, 
// c: width of bell curve
// d: constant minimum height

define([], function () {
	return function (x, a, b, c, d) {
		var e = 2.7182818;
		return d + (a * Math.pow(e, -(((x-b)*(x-b))/(2*(c*c)))));
	}
})