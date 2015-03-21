module.exports = (function () {
	var o = {
		phSelector: '.mkc-placeholder'
	};

	require('./dataset-polyfill.js');
	var pym          = require('pym.js');
	var randomstring = require('randomstring');

	function _getURL (dataIndex) {
		/**
		 * TODO: Outsource targets table
		 */
		var index = {
			'2015-cantons-et-candidats': {
				url: 'http://makinacorpus.github.io/elections/departementales-2015/app/public/'
			},
			'2015-resultats-departementales': {
				url: 'http://makinacorpus.github.io/elections/departementales-2015/app/public/departement.html'
			}
		}
		var result = index[dataIndex];
		return (result && result.url) ? result.url : 'about:blank';
	}

	function _browserContext () {
		return (typeof window !== 'undefined');
	}

	function _findPlaceholders () {
		return document.querySelectorAll(o.phSelector);
	}

	function _eachPlaceholder (placeholder) {
		var newID      = 'mkc-' + randomstring.generate(8);
		placeholder.id = newID;
		var dataIndex  = placeholder.dataset.source;

		var pymParent  = new pym.Parent(newID, _getURL(dataIndex), {});

		pymParent.onMessage('event', function (message) {
			if (message === 'ready') {
				pymParent.sendMessage('data', JSON.stringify(placeholder.dataset));
			}
		});
	}

	function _init () {
		var placeholders = _findPlaceholders();
		[].forEach.call(placeholders, _eachPlaceholder);
	}
	return {
		init: _init
	}
}());
