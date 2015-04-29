var assert = require('assert');

var bufferedFn = require('../buffered-function');


describe('BufferedFunction', function() {
	var fn;

	var outerState = {};

	it('should create a BufferedFunction', function() {
		fn = bufferedFn(function(key, value, cb) {
			outerState[key] = value;

			cb();
		});
	});

	it('should be a function', function() {
		assert.equal(typeof fn, 'function');
	});

	it('should have ready method', function() {
		assert(fn.ready);
	});

	it('should be able to call the buffered function without it firing', function(done) {
		fn('test', 2, function() {
			if(!outerState.done) {
				throw new Error('Fired prematurely');
			}
		});

		setTimeout(done, 20);
	});

	it('should signal the function is ready', function() {
		outerState.done = true;

		fn.ready();
	});

	it('should have set the test value when ready was called', function() {
		assert.equal(outerState.test, 2);
	});

	it('should be able to call immediately now', function(done) {
		fn('test', 0, done);
	});

	it('updated the test value correctly', function() {
		assert.equal(outerState.test, 0);
	});
});
