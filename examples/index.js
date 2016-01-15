'use strict';

var round = require( 'math-round' );
var pad = require( './../lib' );

var str = 'boop';
var out;
var len;
var i;

for ( i = 0; i < 100; i++ ) {
	len = round( Math.random()*10 ) + str.length;
	out = pad( str, len, {
		'lpad': 'beep',
		'rpad': 'p'
	});
	console.log( '%s. %d. %d.', out, len, out.length );
}
