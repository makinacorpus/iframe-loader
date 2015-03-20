module.exports = (function () {
	var o = {
		phSelector: '.mkc-placeholder'
	};

	var pym          = require('pym.js');
	var randomstring = require('randomstring');


	function _browserContext () {
		return (typeof window !== 'undefined');
	}

	function _findPlaceholders () {
		return document.querySelectorAll(o.phSelector);
	}

	function _eachPlaceholder (placeholder) {
		var newID      = 'mkc-' + randomstring.generate(8);
		placeholder.id = newID;

		var pymParent = new pym.Parent(newID, 'http://www.perdu.com', {});
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
