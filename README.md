Pad
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Pad a string.


## Installation

``` bash
$ npm install utils-pad-string
```


## Usage

``` javascript
var pad = require( 'utils-pad-string' );
```

#### pad( str, len[, opts] )

Pads a `string` such that the padded `string` has a `length` of `len`.


``` javascript
var str = pad( 'a', 5 );
// returns 'a    '
```

The `function` accepts the following `options`:
*	__lpad__: `string` used to left pad. Default: `''`.
*	__rpad__: `string` used to right pad. Default: `' '`.
*	__centerRight__: `boolean` indicating whether to center `right` in the event of a tie. Default: `false` (i.e., center `left`).

By default, an input `string` is padded with `spaces`. To pad with a different character or sequence of characters, provide a `pad` string.

``` javascript
var str = pad( 'a', 10, {
	'lpad': 'b' 
});
// returns 'bbbbbbbbba'

str = pad( 'a', 12, {
	'rpad': 'b'
});
// returns 'abbbbbbbbbbb'
```

To center an input `string`, provide both `lpad` and `rpad` options.

``` javascript
var opts = {
	'lpad': 'a',
	'rpad': 'c'
};

var str = pad( 'b', 11, opts );
// returns 'aaaaabccccc'
```

When both `lpad` and `rpad` are specified and `len-str.length` is __odd__, left and right padding cannot equally split the available padding space. By default, right padding receives the extra character (i.e., the input `string` is centered `left`).

``` javascript
str = pad( 'b', 10, opts );
// returns 'aaaabccccc'
```

To center `right`, set the `centerRight` option.

``` javascript
opts.centerRight = true;

str = pad( 'b', 10, opts );
// returns 'aaaaabcccc'
```


## Notes

* In contrast to [utils-left-pad-string][utils-left-pad-string] and [utils-right-pad-string][utils-right-pad-string], any padding which does not evenly divide available space is trimmed such that the returned `string` length is __always__ `len`.

	``` javascript
	var opts = {
		'lpad': 'boop',
		'rpad': 'woot'
	};
	var str = pad( 'beep', 10, opts );
	// returns 'boobeepwoo'
	```
* Similarly, if `len < str.length`, the input `string` is trimmed.

	``` javascript
	// Pad right, trim right:
	var str = pad( 'beep', 2 );
	// returns 'be'

	// Pad left, trim left:
	str = pad( 'beep', 2, {
		'lpad': 'b'
	});
	// returns 'ep'

	// Pad both, trim both:
	str = pad( 'beep', 2, {
		'lpad': '@',
		'rpad': '!'
	});
	// returns 'ee'

	// Pad both, trim both starting from left:
	str = pad( 'abcdef', 3, {
		'lpad': '@',
		'rpad': '!'
	});
	// returns 'cde'

	// Pad both, trim both starting from right:
	str = pad( 'abcdef', 3, {
		'lpad': '@',
		'rpad': '!',
		'centerRight': true
	});
	// returns 'bcd'
	```


## Examples

``` javascript
var round = require( 'math-round' );
var pad = require( 'utils-pad-string' );

var str = 'boop';
var out;
var len;
var i;

for ( i = 0; i < 100; i++ ) {
	len = round( Math.random()*10 ) + str.length;
	out = pad( str, len, {
		'pad': 'beep',
		'rpad': 'p'
	});
	console.log( '%s. %d. %d.', out, len, out.length );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g utils-pad-string
```


### Usage

``` bash
Usage: padstr [options] str --len length

Options:

  -h,    --help                Print this message.
  -V,    --version             Print the package version.
         --len length          String length.
         --lpad str            String used to left pad. Default: ''.
         --rpad str            String used to right pad. Default: ' '.
         --cright              Center right in the event of a tie.
```


### Examples

``` bash
$ padstr beep --len 10 --lpad b --rpad p
# => bbbbeepppp
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-pad-string.svg
[npm-url]: https://npmjs.org/package/utils-pad-string

[build-image]: http://img.shields.io/travis/kgryte/utils-pad-string/master.svg
[build-url]: https://travis-ci.org/kgryte/utils-pad-string

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/utils-pad-string/master.svg
[coverage-url]: https://codecov.io/github/kgryte/utils-pad-string?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-pad-string.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-pad-string

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-pad-string.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-pad-string

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-pad-string.svg
[github-issues-url]: https://github.com/kgryte/utils-pad-string/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[utils-left-pad-string]: https://github.com/kgryte/utils-left-pad-string
[utils-right-pad-string]: https://github.com/kgryte/utils-right-pad-string
