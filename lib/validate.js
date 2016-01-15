'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );
var isBoolean = require( 'validate.io-boolean-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} [options.lpad] - string used to left pad
* @param {String} [options.rpad] - string used to right pad
* @param {Boolean} [options.centerRight] - boolean indicating whether to center right in the event of a tie
* @returns {Null|Error} error object or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'lpad' ) ) {
		opts.lpad = options.lpad;
		if ( !isString( opts.lpad ) ) {
			return new TypeError( 'invalid option. Left padding option must be a string primitive. Option: `' + opts.lpad + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'rpad' ) ) {
		opts.rpad = options.rpad;
		if ( !isString( opts.rpad ) ) {
			return new TypeError( 'invalid option. Right padding option must be a string primitive. Option: `' + opts.rpad + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'centerRight' ) ) {
		opts.centerRight = options.centerRight;
		if ( !isBoolean( opts.centerRight ) ) {
			return new TypeError( 'invalid option. Option specifying whether to center right in the event of a tie must be a boolean primitive. Option: `' + opts.centerRight + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
