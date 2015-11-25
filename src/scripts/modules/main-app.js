module.exports = (function () {
	var o = {
		phSelector: '.mkc-placeholder'
	};

	require('./dataset-polyfill.js');
	var pym = require('pym.js');

	function uniqid(prefix, more_entropy) {
		//  discuss at: http://phpjs.org/functions/uniqid/
		// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		//  revised by: Kankrelune (http://www.webfaktory.info/)
		//        note: Uses an internal counter (in php_js global) to avoid collision
		//        test: skip
		//   example 1: uniqid();
		//   returns 1: 'a30285b160c14'
		//   example 2: uniqid('foo');
		//   returns 2: 'fooa30285b1cd361'
		//   example 3: uniqid('bar', true);
		//   returns 3: 'bara20285b23dfd1.31879087'

		if (typeof prefix === 'undefined') {
			prefix = '';
		}

		var retId;
		var formatSeed = function(seed, reqWidth) {
			seed = parseInt(seed, 10)
				.toString(16); // to hex str
			if (reqWidth < seed.length) {
				// so long we split
				return seed.slice(seed.length - reqWidth);
			}
			if (reqWidth > seed.length) {
				// so short we pad
				return Array(1 + (reqWidth - seed.length))
					.join('0') + seed;
			}
			return seed;
		};

		// BEGIN REDUNDANT
		if (!this.php_js) {
			this.php_js = {};
		}
		// END REDUNDANT
		if (!this.php_js.uniqidSeed) {
			// init seed with big random int
			this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
		}
		this.php_js.uniqidSeed++;

		// start with prefix, add current milliseconds hex string
		retId = prefix;
		retId += formatSeed(parseInt(new Date()
			.getTime() / 1000, 10), 8);
		// add seed hex string
		retId += formatSeed(this.php_js.uniqidSeed, 5);
		if (more_entropy) {
			// for more entropy we add a float lower to 10
			retId += (Math.random() * 10)
				.toFixed(8)
				.toString();
		}

		return retId;
	}


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
		var newID      = uniqid('mkc-');
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
