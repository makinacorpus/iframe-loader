module.exports = (function () {
	function _init () {
		if (typeof window === 'undefined') {
			throw {
				message: 'This should be run only in browser',
				name: 'Invalid context'
			};
		} else if (typeof window.makinaLoader !== 'undefined') {
			throw {
				message: 'Makina Loader as already been loaded',
				name: 'Already loaded'
			};
		}
	}
	return {
		init: _init
	}
}());
