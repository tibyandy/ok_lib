(function (D) {
	var toggler = D.getElementById('fs_toggler');

	var ontap = typeof document.documentElement.ontouchend != 'undefined' ? 'ontouchend' : 'onclick';

	toggler[ontap] = function () {
		navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
		if (!OK.fullscreen.isActive()) {
	  		navigator.vibrate([30, 10, 30]);
			OK.fullscreen.turnOn();
		} else {
	  		navigator.vibrate([30]);
			OK.fullscreen.turnOff();
		}
	};

	OK.fullscreen.onEnter(function () {
		toggler.innerHTML = 'Fullscreen ON!<br>Click to exit fullscreen';
	});

	OK.fullscreen.onExit(function () {
		toggler.innerHTML = 'Fullscreen OFF!<br>Click to enter fullscreen';
	});

	if (window.matchMedia('(display-mode: standalone)').matches) {
	    toggler.innerHTML = 'App in standalone mode! Fullscreen on ';
	}

	if (window.navigator.standalone) {
		toggler.innerHTML = 'App in iOS standalone mode!';
	} else {
		toggler.innerHTML = toggler.innerHTML + ontap;
	}
})(document);