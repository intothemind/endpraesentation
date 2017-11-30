
var rocket = null;
var planets = [];
var nrPlanets = 100;
var stars = [];
var nrStars = 10000;


var universeWidth = 200;
var universeHeight = 50000;

var rocketimg = null;
var planetimgs = [];
var starImg = null;

var dt = 0.1;
var clipDist = 100;
var earthDiameter = 3000;
var earthX = universeWidth / 2;
var earthY = -0.138 * earthDiameter;

//timer
var startTime;
var endTime;

var lastLap;
var lapDuration = 100; //millis

//how long does the neurofeedback go. (in milliseconds) 
var duration = 1*60*1000;

var padding = 50;

//scoring
var threshold = 0;
var maxThres = Number.MIN_VALUE;
var altitude = 0;
var thetaValues = [];
var alphaValues = [];
var betaValues = [];


function initRocketView(){
	rocket = createRocket(universeWidth / 2, 0, rocketimg);

	for (var i = 0; i < nrPlanets; i++) {
		var p = createPlanet(random(0, universeWidth), random(0, universeHeight), planetimgs[floor(random(0, planetimgs.length))]);
		planets.push(p);
	}

	for (var i = 0; i < nrStars; i++) {
		var s = createStar(random(0, universeWidth), random(0, universeHeight), starImg);
		stars.push(s);
	}

	startTime = millis();
	lastLap = millis();

	maxThres = Number.MIN_VALUE;
	altitude = 0;

}

function drawRocketView(){
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

	//console.log(alpha_relative);

	//var alphaMean = (alpha_relative.leftEar + alpha_relative.rightEar + alpha_relative.leftFront + alpha_relative.rightFront)/4;
	//var betaMean = (beta_relative.leftEar + beta_relative.rightEar + beta_relative.leftFront + beta_relative.rightFront)/4;
/*
	if (frameCount > 1000) {
		maxTheta = theta_relative.mean > maxTheta ? theta_relative.mean : maxTheta;
		maxAlpha = alpha_relative.mean > maxAlpha ? alpha_relative.mean : maxAlpha;
		minBeta = beta_relative.mean < minBeta ? beta_relative.mean : minBeta;
	}

	actualThetaBuffer.push(theta_relative.mean);
	actualAlphaBuffer.push(alpha_relative.mean);
	actualBetaBuffer.push(beta_relative.mean);

	if(actualThetaBuffer.length > bufferLength){
		actualThetaBuffer.shift();
	}
	if(actualAlphaBuffer.length > bufferLength){
		actualAlphaBuffer.shift();
	}
	if(actualBetaBuffer.length > bufferLength){
		actualBetaBuffer.shift();
	}*/

	//collect data every now and then
	if(millis()-lastLap > lapDuration){
		thetaValues.push(theta_relative.mean);
		alphaValues.push(alpha_relative.mean);
		betaValues.push(beta_relative.mean);

		lastLap = millis();
	}


	var score = alphaTheta(theta_relative.mean, alpha_relative.mean, beta_relative.mean); //beta(alphaMean,betaMean);//alphaBeta(alphaMean,betaMean);
	 threshold = thresh.threshold(score);

	maxThres = max(maxThres,threshold);

	var feedback = score - threshold;
	//console.log('score: ' + score);

	//console.log('feedback: ' + feedback);

	var power = map(feedback, -1, 1, -30, 30);
	//console.log('power ' + power);
	rocket.thrust(power);


	//update rocket positions
	rocket.update(dt);


	//elapsed time
	var elapsed = millis()-startTime;
	if(elapsed>duration){
		//time is up
		setState(STATE_DASHBOARD);
	}


	//draw stars
	stars.forEach(function(p) {
		var sx = map(p.pos.x, rocket.pos.x - clipDist, rocket.pos.x + clipDist, 0, width);
		var sy = map(p.pos.y, rocket.pos.y - clipDist, rocket.pos.y + clipDist, height, 0);

		if (sx > 0 && sx < width && sy > 0 && sy < height) {
			//fill(0);
			//ellipse(sx,sy,50,50);
			p.draw(sx, sy);
		}
	});

	//draw planets
	planets.forEach(function(p) {
		var sx = map(p.pos.x, rocket.pos.x - clipDist, rocket.pos.x + clipDist, 0, width);
		var sy = map(p.pos.y, rocket.pos.y - clipDist, rocket.pos.y + clipDist, height, 0);

		if (sx > 0 && sx < width && sy > 0 && sy < height) {
			//fill(0);
			//ellipse(sx,sy,50,50);
			p.draw(sx, sy);
		}
	});

	//draw the earth
	/*var sEarthx = map(earthX, rocket.pos.x - clipDist, rocket.pos.x + clipDist, 0, width);
	var sEarthy = map(earthY, rocket.pos.y - clipDist, rocket.pos.y + clipDist, height, 0);
	fill(0);
	//console.log(sEarthy,sEarthy);
	ellipse(sEarthx,sEarthy,earthDiameter,earthDiameter);*/


	//draw rocket
	var sx = map(rocket.pos.x, rocket.pos.x - clipDist, rocket.pos.x + clipDist, 0, width);
	var sy = map(rocket.pos.y, rocket.pos.y - clipDist, rocket.pos.y + clipDist, height, 0);
	rocket.draw(sx, sy);


	//draw altitude information
	textSize(24);
	textAlign(RIGHT,TOP);
	altitude = floor(rocket.pos.y)
	text(altitude, width - padding, 50);

	//draw elapsed time
	var elapsedNice = formatTime(elapsed);
	textAlign(LEFT,TOP);
	text(elapsedNice,padding,50);

	if(debug){
		drawDebugInfo();
}

	//credits
	textSize(16);
	textAlign(RIGHT,CENTER);
	text('rocket and planets by lastspark from The Noun Project', width - padding, height - 50)

	//headband status
	var badValue = 3;
	var leftEar = horse.leftEar || badValue;
	var rightEar = horse.rightEar || badValue;
	var leftFront = horse.leftFront || badValue;
	var rightFront = horse.rightFront || badValue;

	push();
	translate(padding,height-50);
	drawHorseShoeStatus([leftEar,leftFront,rightFront,rightEar]);
	pop();

}

function cleanupRocketView(){
	
}

function drawHorseShoeStatus(arr){
	rectMode(CORNER);
	ellipseMode(CENTER);

	var gap = 10;
	var w = 20;
	for(var i=0; i<arr.length; i++){
		var val = arr[i];
		var c = getStatusCol(val);
		
		var x = i*(w+gap);
		fill(c);
		noStroke();
		ellipse(x,0,w,w);
	}
}

function getStatusCol(val){
	switch(val){
		case 1: return 'green'; break;
		case 2: return 'yellow'; break;
		case 3: return 'red'; break;
		default: return 'red';
	}
}

function drawDebugInfo(){
		textSize(16);
	fill('black');
	text('Vel: ' + nf(rocket.vel, null, 1), 20, height - 120);
	text('Acc: ' + nf(rocket.acc, null, 1), 20, height - 100);
	text('Threshold: ' + nf(threshold, null, 2), 20, height - 80);
	text('Max Theta: ' + nf(maxTheta * 100, null, 0) + ' %' , 20, height - 60);
	fill('grey');
	text(nf(mean(actualThetaBuffer) * 100, null, 0) + ' %' , 150, height - 60);
	fill('black');
	text('Max Alpha: ' + nf(maxAlpha * 100, null, 0) + ' %', 20, height - 40);
	fill('grey');
	text(nf(mean(actualAlphaBuffer) * 100, null, 0) + ' %', 150, height - 40);
	fill('black');
	text('Min Beta: ' + nf(minBeta * 100, null, 0) + ' %', 20, height - 20);
	fill('grey');
	text(nf(mean(actualBetaBuffer) * 100, null, 0) + ' %', 150, height - 20);

}

function formatTime(millis){
	var totalsecs = floor(millis/1000);
	var mins = floor(totalsecs/60);
	var secs = totalsecs - mins*60;
	return nf(mins,2,null) + ':' + nf(secs,2,0);
}