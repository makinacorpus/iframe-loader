module.exports = (function () {
	var o = {
		phSelector: '.mkc-placeholder'
	};


	function _browserContext () {
		return (typeof window !== 'undefined');
	}

	function _findPlaceholders () {
		return document.querySelectorAll(o.phSelector);
	}

	function _eachPlaceholder (placeholder) {
		console.log('p', placeholder);
	}

	function _init () {
		console.log(_browserContext() ? 'Browser !' : 'Not in browser :(');

		var placeholders = _findPlaceholders();
		[].forEach.call(placeholders, _eachPlaceholder);
	}
	return {
		init: _init
	}
}());
