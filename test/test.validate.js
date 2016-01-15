'use strict';

// MODULES //

var test = require( 'tape' );
var validate = require( './../lib/validate.js' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof validate === 'function', 'main export is a function' );
	t.end();
});

test( 'if provided an `options` argument which is not an object, the function returns an error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, values[ i ] );
		t.ok( err instanceof TypeError, 'returns TypeError' );
	}
	t.end();
});

test( 'if provided an invalid `lpad` option, the function returns an error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'lpad': values[ i ]
		});
		t.ok( err instanceof TypeError, 'returns TypeError' );
	}
	t.end();
});

test( 'if provided an invalid `rpad` option, the function returns an error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'rpad': values[ i ]
		});
		t.ok( err instanceof TypeError, 'returns TypeError' );
	}
	t.end();
});

test( 'if provided an invalid `centerRight` option, the function returns an error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'centerRight': values[ i ]
		});
		t.ok( err instanceof TypeError, 'returns TypeError' );
	}
	t.end();
});

test( 'if all options are valid, the function returns null', function test( t ) {
	var err = validate( {}, {
		'lpad': 'a',
		'rpad': 'b',
		'centerRight': true
	});
	t.equal( err, null, 'returns null' );
	t.end();
});

test( 'the function ignores unrecognized options', function test( t ) {
	var err = validate( {}, {
		'beep': 'boop',
		'a': null,
		'b': 5
	});
	t.equal( err, null, 'returns null' );
	t.end();
});

