var primaryCircle = document.getElementById('primary-circle'),
	runTime = 10 * 60, // 10 minutes
	breakTime = 2 * 60, // 2 minutes...
//			runTime = 10, // 10 minutes
//			breakTime = 3, // 2 minutes...
	runColor = '#700',
	breakColor = '#070',
	timer = 0,
	primaryInterval,
	progress = 0,
	onBreak = 0,
	cycleCounter = 1,
	muted = 0,
	paused = 0,
	title = document.title;

var bellSound = new Audio('assets/bell.mp3');

var primaryTimer = new ProgressBar.Circle(primaryCircle, {
	duration: 100,
	color: runColor,
	trailColor: "#ddd",
	text: {
		style: {
			fontSize: '40pt'
		}
	}
});


var updateFavico = function() {

	Piecon.setProgress(Math.floor(progress * 100));
};

var updateTitle = function() {
	document.title = getFormattedTime() + ' ' + title;
};

var animateTimerProgress = function() {
	primaryTimer.animate(progress, function() {
		primaryTimer.setText(getFormattedTime());
	});
};

var getFormattedTime = function() {
	if (onBreak) {
		return moment().minutes(0).seconds(breakTime - timer).format('m:ss');
	} else {
		return moment().minutes(0).seconds(runTime - timer).format('m:ss');
	}
};

var updateProgress = function() {
	if (onBreak) {
		progress = 1 - ((breakTime - timer) / breakTime);
	} else {
		progress = timer / runTime;
	}
};

var reset = function() {
	timer = 0;
	onBreak = 0;
	progress = 0;
	updateCycleCounter(runColor);
	setColorOptions(runColor);
	animateTimerProgress();
	if (! paused) {
		startInterval();
	}
};

var advanceTimer = function(){
	if (onBreak) {
		timer--;
	} else {
		timer++;
	}
	updateProgress();
	manageBreakTime();
};

var setColorOptions = function(color) {
	Piecon.setOptions({ color: color });
	primaryTimer.path.setAttribute('stroke', color);
	primaryTimer.text.style.color = color;
};

var updateCycleCounter = function() {
	document.getElementById('cycle-counter').innerHTML = cycleCounter;
};

var manageBreakTime = function() {
	if (timer <= 0) {
		onBreak = 0;
		timer = 0;
		setColorOptions(runColor);
		cycleCounter += 1;
		updateCycleCounter();
		playSound();
	} else if (timer >= runTime) {
		onBreak = 1;
		timer = breakTime;
		setColorOptions(breakColor);
		playSound();
	}
};

var playSound = function() {
	if (!muted) {
		bellSound.play();
	}
};

var mute = function() {
	muted = true;
	document.getElementById('mute-button').style.display = 'none';
	document.getElementById('unmute-button').style.display = 'block';
};

var unmute = function() {
	muted = false;
	document.getElementById('unmute-button').style.display = 'none';
	document.getElementById('mute-button').style.display = 'block';
};

var pause = function() {
	clearInterval(primaryInterval);
	paused = 1;
	document.getElementById('pause-button').style.display = 'none';
	document.getElementById('unpause-button').style.display = 'block';
};

var unpause = function() {
	paused = 0;
	startInterval();
	document.getElementById('unpause-button').style.display = 'none';
	document.getElementById('pause-button').style.display = 'block';
};

var displayIntervalControls = function() {
	document.getElementById('run-time').value = runTime / 60;
	document.getElementById('break-time').value = breakTime / 60;
	document.getElementById('interval-controls').style.display = 'block';
	document.getElementById('display-interval-controls').style.display = 'none';
};

var saveChangesAndHideControls = function() {
	runTime = parseInt(document.getElementById('run-time').value) * 60;
	breakTime = parseInt(document.getElementById('break-time').value) * 60;
	document.getElementById('interval-controls').style.display = 'none';
	document.getElementById('display-interval-controls').style.display = 'inline-block';
};


var startInterval = function() {
	clearInterval(primaryInterval);
	cycleCounter = 1;
	primaryInterval = setInterval(function(){
		advanceTimer();
		animateTimerProgress();
		updateFavico();
		updateTitle();
	}, 1000);
};

startInterval();

// twitter buttons
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-2686685-5', 'auto');
ga('send', 'pageview');
