# buffered-function

```javascript
var bufferedFn = require('buffered-function');


var somefunction = bufferedFn(_somefunction);

// _somefunction does not get called yet
somefunction('with', 'arguments', 'if you want');

somefunction();

// Wait for something to load or whatever
setTimeout(function() {
	somefunction.ready();

	// Those queued calls to _somefunction now go through in the order they were made
}, 500);


function _somefunction() {
	/* ... */
}
```
