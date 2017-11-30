//timer
var startTime;
var endTime;

var lastLap;
var lapDuration = 100; //millis

//how long does the neurofeedback go. (in milliseconds) 
var duration = 10*3 * 60 * 1000;

var padding = 50;

//scoring
var threshold = 0;
var maxThres = Number.MIN_VALUE;
var altitude = 0;
var thetaValues = [];
var alphaValues = [];
var betaValues = [];
var deltaValues = [];
var gammaValues = [];

var fitness = 0;

function initMeasureView() {

	startTime = millis();
	lastLap = millis();
}

function drawMeasureView() {
	background(255);

	if (frameCount < 30) {
		background('black');
		return;
	}

	if (frameCount % 100 == 0) {
		console.log('frameRate: ' + frameRate());
	}

	var horse = muse.get('/muse/elements/horseshoe');
	var theta_relative = muse.get('/muse/elements/theta_relative');
	var alpha_relative = muse.get('/muse/elements/alpha_relative');
	var beta_relative = muse.get('/muse/elements/beta_relative');
	var gamma_relative = muse.get('/muse/elements/gamma_relative');
	var delta_relative = muse.get('/muse/elements/delta_relative');

	//collect data every now and then
	if (millis() - lastLap > lapDuration) {
		console.log('lap');
		thetaValues.push(theta_relative.mean);
		alphaValues.push(alpha_relative.mean);
		betaValues.push(beta_relative.mean);
		deltaValues.push(delta_relative.mean);
		gammaValues.push(gamma_relative.mean);

		lastLap = millis();
	}

	// rolling averages
	var rollingSteps = 100;
	var rollingAlpha = rollingAverage(alphaValues, rollingSteps);
	var rollingBeta = rollingAverage(betaValues, rollingSteps);
	var rollingTheta = rollingAverage(thetaValues, rollingSteps);
	var rollingGamma = rollingAverage(gammaValues, rollingSteps);
	var rollingDelta = rollingAverage(deltaValues, rollingSteps);

	fitness = calcFitness(rollingDelta,rollingTheta,rollingAlpha,rollingBeta,rollingGamma);

	var rollingData = [{
		label: 'Delta',
		value: rollingDelta
	}, {
		label: 'Theta',
		value: rollingTheta
	}, {
		label: 'Alpha',
		value: rollingAlpha
	}, {
		label: 'Beta',
		value: rollingBeta
	}, {
		label: 'Gamma',
		value: rollingGamma
	},{
		label: 'Fitness',
		value: fitness
	}];

	push();
	//translate(padding,400);
	translate(width / 2, height / 2);
	var gap = 20;
	var rectWidth = 70;
	var chartHeight = 300;
	var chartWidth = rollingData.length * (rectWidth + gap);
	translate(-chartWidth / 2, -chartHeight / 2);
	/*
		noFill();
		stroke(0);
		rect(0,0,chartWidth,chartHeight);*/

	var maxVal = 0.5;
	//bars
	for (var i = 0; i < rollingData.length; i++) {
		var data = rollingData[i];
		var x = i * (rectWidth + gap);
		var h = map(data.value, 0, maxVal, 0, chartHeight);
		var y = chartHeight - h;
		var c = getColor(data.label);

		console.log('color: ' + data.label + ' - ' + c);
		fill(c);
		noStroke();
		rect(x, y, rectWidth, h);
	}

	//labels
	for (var i = 0; i < rollingData.length; i++) {
		var data = rollingData[i];
		var x = i * (rectWidth + gap);
		var h = map(data.value, 0, maxVal, 0, chartHeight);
		var y = chartHeight - h;
		fill('black');
		noStroke();
		text(data.label, x, chartHeight + 10);
	}

	//numbers
	for (var i = 0; i < rollingData.length; i++) {
		var data = rollingData[i];
		var x = i * (rectWidth + gap);
		var h = map(data.value, 0, maxVal, 0, chartHeight);
		var y = chartHeight - h;
		fill('black');
		noStroke();
		var percValue = data.value * 100;
		var percValueF = nf(percValue, null, 2) + ' %';
		text(percValueF, x, y - 2);
	}

	pop();

	//headband status
	var badValue = 3;
	var leftEar = horse.leftEar || badValue;
	var rightEar = horse.rightEar || badValue;
	var leftFront = horse.leftFront || badValue;
	var rightFront = horse.rightFront || badValue;

	push();
	translate(padding + 10, height - 50);
	drawHorseShoeStatus([leftEar, leftFront, rightFront, rightEar]);
	pop();



	//elapsed time
	var elapsed = millis() - startTime;
	if (elapsed > duration) {
		//time is up
		setState(STATE_DASHBOARD);
	}

	push();
	var elapsedNice = formatTime(elapsed);
	textAlign(LEFT, TOP);
	text(elapsedNice, padding, 50);
	pop();



}

function cleanupMeasureView() {

}

function drawHorseShoeStatus(arr) {
	rectMode(CORNER);
	ellipseMode(CENTER);

	var gap = 10;
	var w = 20;
	for (var i = 0; i < arr.length; i++) {
		var val = arr[i];
		var c = getStatusCol(val);

		var x = i * (w + gap);
		fill(c);
		noStroke();
		ellipse(x, 0, w, w);
	}
}

function getStatusCol(val) {
	switch (val) {
		case 1:
			return 'green';
			break;
		case 2:
			return 'yellow';
			break;
		case 3:
			return 'red';
			break;
		default:
			return 'red';
	}
}

function drawDebugInfo() {
	textSize(16);
	fill('black');
	text('Vel: ' + nf(rocket.vel, null, 1), 20, height - 120);
	text('Acc: ' + nf(rocket.acc, null, 1), 20, height - 100);
	text('Threshold: ' + nf(threshold, null, 2), 20, height - 80);
	text('Max Theta: ' + nf(maxTheta * 100, null, 0) + ' %', 20, height - 60);
	fill('grey');
	text(nf(mean(actualThetaBuffer) * 100, null, 0) + ' %', 150, height - 60);
	fill('black');
	text('Max Alpha: ' + nf(maxAlpha * 100, null, 0) + ' %', 20, height - 40);
	fill('grey');
	text(nf(mean(actualAlphaBuffer) * 100, null, 0) + ' %', 150, height - 40);
	fill('black');
	text('Min Beta: ' + nf(minBeta * 100, null, 0) + ' %', 20, height - 20);
	fill('grey');
	text(nf(mean(actualBetaBuffer) * 100, null, 0) + ' %', 150, height - 20);

}

function rollingAverage(arr, steps) {
	var sum = 0;
	var n = arr.length <= steps ? arr.length : steps;
	for (var i = arr.length - 1; i >= arr.length - n; i--) {
		sum += arr[i];
	}
	var avg = sum / n;
	return avg;
}

function formatTime(millis) {
	var totalsecs = floor(millis / 1000);
	var mins = floor(totalsecs / 60);
	var secs = totalsecs - mins * 60;
	return nf(mins, 2, null) + ':' + nf(secs, 2, 0);
}

function calcFitness(delta,theta,alpha,beta,gamma){
	return 0.5*alpha + 0.5*beta - 0.2*theta;
}