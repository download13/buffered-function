var slice = Array.prototype.slice;


function createBufferedFunction(fn) {
	var ready = false;

	var pendingCalls = [];


	function handleCall() {
		if(ready) {
			return fn.apply(this, arguments);
		} else {
			pendingCalls.push({
				self: this,
				args: slice.call(arguments)
			});
		}
	}

	function setReady() {
		if(!ready) {
			pendingCalls.forEach(function(call) {
				fn.apply(call.self, call.args);
			});

			ready = true;
		}
	};


	handleCall.ready = setReady;


	return handleCall;
}


module.exports = createBufferedFunction;
