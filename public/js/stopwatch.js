var time;
var theInterval;

var	stopWatch = function() {

	// initial
	var	startTime = elapseTime = 0;

 	// return current time in milliseconds
	var	currentTime	= function() {
		var theTime = new Date().getTime();
		return theTime;
	};

	// start or resume state
	this.start = function() {
		startTime = startTime ? startTime : currentTime();
	};

	// pause state
	this.pause = function() {
		elapseTime = startTime ? elapseTime + currentTime() - startTime : elapseTime;
		startTime = 0;
	};

	// reset state
	this.reset = function() {
		elapseTime = startTime = 0;
	};

	// calculate duration
	this.time = function() {
		return elapseTime + (startTime ? currentTime() - startTime : 0); 
	};
};

var stopwatch = new stopWatch();

// display time units
function displayTime() {
	time = document.getElementById('time');
	updateTime();
}

// update time
function updateTime() {
	time.innerHTML = stringBuilder(stopwatch.time());
}

//	start stopwatch
function start() {
	theInterval = setInterval("updateTime()", 1);
	stopwatch.start();
}

// pause stopwatch
function pause() {
	stopwatch.pause();
	clearInterval(theInterval);
}

// reset stopwatch
function reset() {
	pause();
	stopwatch.reset();
	updateTime();
}

// construct a string of units of time
function stringBuilder(time) {
	var hours = minutes = seconds = milli_seconds = 0;
	var timeUpdate = '';

	hours = Math.floor( time / (60 * 60 * 1000));
	time = time % (60 * 60 * 1000);
	minutes = Math.floor( time / (60 * 1000));
	time = time % (60 * 1000);
	seconds = Math.floor( time / 1000 );
	milli_seconds = time % 1000;
	micro_seconds = time % 1000000;

	timeUpdate = "<div class='digits-large'>" + "<b class='time-unit-title'>Hrs</b>" + separate(hours, 2) + '&nbsp;'+
						"<b class='time-unit-title'>Mins</b>" + separate(minutes, 2) + '&nbsp;'+
						"<b class='time-unit-title'>Secs</b>" + separate(seconds, 2) + "</div>" + 
			  	"<div class='digits-small'>" + separate(milli_seconds, 3) + "<b class='time-unit-title'>ms</b>" + '&nbsp;'+ 
			  			"<b class='time-unit-title'>&micro;s</b>" + separate(micro_seconds, 6) + "</div>"; 
	return timeUpdate;
}

function separate(unit, unit_size) {
	var size = "000000" + unit;
	return size.substr(size.length - unit_size);
}