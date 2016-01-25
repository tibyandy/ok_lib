window.OK = window.OK || {};
window.OK.fullscreen = (function (D, B) {
	var MODULE = {};

	var fnameEnterFullscreen = getTheFunctionThatWorks(B, 'requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen');
	var fnameExitFullscreen = getTheFunctionThatWorks(D, 'exitFullscreen', 'mozCancelFullscreen', 'webkitExitFullscreen', 'msExitFullscreen');
	var fnameCheckFullscreenElement = getTheFunctionThatWorks(D, 'fullscreenElement', 'mozFullScreenElement', 'webkitFullscreenElement', 'msFullscreenElement');

	function getTheFunctionThatWorks(elem) {
		var i, fnName;
		var argsLen = arguments.length;
		for (i = 1; i < argsLen; i++) {
			fnName = arguments[i];
			if (typeof elem[fnName] != 'undefined') {
				return fnName;
			}
		}
	}

	var _lastFullscreenState = false;
	var _fnOnEnterCallback = null;
	var _fnOnExitCallback = null;

	function isFullscreen() {
		return getFullscreenElement() != null;
	}

	function getFullscreenElement() {
		return D[fnameCheckFullscreenElement];
	}

	function fnFullscreenToggleEventHandler() {
		var isActive = isFullscreen();
		if (isActive != _lastFullscreenState) {
			if (isActive) {
				if (_fnOnEnterCallback) {
					_fnOnEnterCallback();
				}
			} else {
				if (_fnOnExitCallback) {
					_fnOnExitCallback();
				}
			}
			_lastFullscreenState = isActive;
		}
	}

	MODULE.turnOn = function () { B[fnameEnterFullscreen](); };
	MODULE.turnOff = function () { D[fnameExitFullscreen](); };
	MODULE.isActive = isFullscreen;
	MODULE.onEnter = function (callbackFn) {
		_fnOnEnterCallback = callbackFn;
	};
	MODULE.onExit = function (callbackFn) {
		_fnOnExitCallback = callbackFn;
	};

	document.addEventListener("fullscreenchange", fnFullscreenToggleEventHandler);
	document.addEventListener("webkitfullscreenchange", fnFullscreenToggleEventHandler);
	document.addEventListener("mozfullscreenchange", fnFullscreenToggleEventHandler);
	document.addEventListener("MSFullscreenChange", fnFullscreenToggleEventHandler);

	return MODULE;

})(document, document.body);
