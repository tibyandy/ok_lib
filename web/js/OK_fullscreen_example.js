(function (D) {
	var toggler = D.getElementById('fs_toggler');

	toggler.onclick = function () {
		if (!OK.fullscreen.isActive()) {
			OK.fullscreen.turnOn();
		} else {
			OK.fullscreen.turnOff();
		}
	};

	OK.fullscreen.onEnter(function () {
		toggler.innerHTML = 'Fullscreen ON!<br>Click to exit fullscreen';
	});

	OK.fullscreen.onExit(function () {
		toggler.innerHTML = 'Fullscreen OFF!<br>Click to enter fullscreen';
	});
})(document);