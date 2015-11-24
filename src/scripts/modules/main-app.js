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

		var hostPrefix  = 'http://cartes-elections.makina-corpus.net/';

		var index = {
			'2015-cantons-et-candidats': {
				url: 'departementales-2015/app/public/'
			},
			'2015-resultats-departementales': {
				url: 'departementales-2015/app/public/departement.html'
			},
		}
		var result = index[dataIndex];

		if (result && result.url) {
			return hostPrefix + result.url;
		}

		// Defaut behavior, embed what you can.

		if (dataIndex.indexOf('_') === -1) {
			return hostPrefix + dataIndex + '/';
		} else {
			return hostPrefix + dataIndex.split('_')[0] + '/' + dataIndex.split('_')[1] + '.html';
		}
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

				if (this.iframe && this.iframe.setAttribute) {
					this.iframe.setAttribute('allowfullscreen', '');
				}
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
