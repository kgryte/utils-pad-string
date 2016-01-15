'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' );
var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );
var ceil = require( 'math-ceil' );
var floor = require( 'math-floor' );
var abs = require( 'math-abs' );
var repeat = require( 'utils-repeat-string' );
var lpad = require( 'utils-left-pad-string' );
var rpad = require( 'utils-right-pad-string' );
var validate = require( './validate.js' );


// CONSTANTS //

var MAX_SAFE_INTEGER = 9007199254740991; // 2**53 - 1


// PAD //

/**
* FUNCTION: pad( str, len[, options] )
*	Pads a string such that the padded string has a length of `len`.
*
* @param {String} str - string to pad
* @param {Number} len - string length
* @param {Object} [options] - function options
* @param {String} [options.lpad=''] - string used to left pad
* @param {String} [options.rpad=' '] - string used to right pad
* @param {Boolean} [options.centerRight=false] - boolean indicating whether to center right in the event of a tie
* @returns {String} padded string
*/
function pad( str, len, options ) {
	var nright;
	var nleft;
	var isodd;
	var right;
	var left;
	var opts;
	var err;
	var tmp;
	var n;
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( 'invalid input argument. Second argument must be a nonnegative integer. Value: `' + len + '`.' );
	}
	if ( len > MAX_SAFE_INTEGER ) {
		throw new RangeError( 'invalid input argument. Output string length exceeds maximum allowed string length.' );
	}
	opts = {};
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( opts.lpad && opts.rpad ) {
		n = ( len-str.length ) / 2;
		if ( n === 0 ) {
			return str;
		}
		tmp = floor( n );
		if ( tmp !== n ) {
			isodd = true;
		}
		if ( n < 0 ) {
			n = floor( abs( n ) );
			nleft = n;
			nright = str.length - n;

			// If |len-str.length| is an odd number, take away an additional character from one side...
			if ( isodd ) {
				if ( opts.centerRight ) {
					nright -= 1;
				} else {
					nleft += 1;
				}
			}
			return str.substring( nleft, nright );
		}
		nleft = ceil( n / opts.lpad.length );
		left = repeat( opts.lpad, nleft );

		nright = ceil( n / opts.rpad.length );
		right = repeat( opts.rpad, nright );

		// If (len-str.length) is an odd number, give one side one extra character...
		n = tmp;
		nleft = n;
		nright = n;
		if ( isodd ) {
			if ( opts.centerRight ) {
				nleft += 1;
			} else {
				nright += 1;
			}
		}
		left = left.substring( 0, nleft );
		right = right.substring( 0, nright );
		return left + str + right;
	}
	if ( opts.lpad ) {
		tmp = lpad( str, len, opts.lpad );
		return tmp.substring( tmp.length-len );
	}
	if ( opts.rpad ) {
		return ( rpad( str, len, opts.rpad ) ).substring( 0, len );
	}
	if ( opts.rpad === void 0 ) {
		return ( rpad( str, len, ' ' ) ).substring( 0, len );
	}
	throw new RangeError( 'invalid input argument. At least one padding option must have a length greater than 0. Left padding: \'' + opts.lpad + '\'. Right padding: \'' + opts.rpad + '\'.' );
} // end FUNCTION pad()


// EXPORTS //

module.exports = pad;
