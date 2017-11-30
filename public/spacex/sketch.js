var muse;

//initialize museData
var dummy = false;

var done = false;

//var host = '127.0.0.1';
//var port = 3000;

//states
var STATE_CALIBRATION = 0;
var STATE_ROCKETVIEW = 1;
var STATE_DASHBOARD = 2;
var state = STATE_CALIBRATION;

//TODO make dynamicThreshold.js
var thresh = dynamicThreshold();

var maxTheta = Number.MIN_VALUE;
var maxAlpha = Number.MIN_VALUE;
var minBeta = Number.MAX_VALUE;

var actualThetaBuffer = [];
var actualAlphaBuffer = [];
var actualBetaBuffer = [];

var bufferLength = 100;

var debug = false;

function preload() {
	rocketimg = loadImage("assets/rocket.png");
	planetimgs.push(loadImage("assets/planet1.png"));
	planetimgs.push(loadImage("assets/planet2.png"));
	planetimgs.push(loadImage("assets/planet3.png"));
	planetimgs.push(loadImage("assets/planet4.png"));
	planetimgs.push(loadImage("assets/planet5.png"));
	starImg = loadImage("assets/star.png");

	var cols = ['Green','Yellow','Red'];
	for(var i=0; i<imgIds.length; i++){
		var id = imgIds[i];
		if(!calImg[id]){
			calImg[id] = [];
		}
		for(var j=0; j<cols.length; j++){
			var c = cols[j];
			var filename = id + c + '.png';
			var img = loadImage('assets/' + filename);

			calImg[id][j] = img;
		}
	}

	hsBase = loadImage('assets/horseshoe_base.png');
	frontImg[1] = loadImage('assets/frontBlack.png');
	frontImg[0] = loadImage('assets/frontBlank.png');
}


function setup() {

	//TODO check if on ipad or not somehow
	createCanvas(window.innerWidth,window.innerHeight);
	//createCanvas(window.innerWidth, window.innerHeight);
	
	console.log('calImg',calImg);
	//data connection to muse with sampling rate of muse
	if (dummy) {
		console.log('using dummy data');
		muse = museData().dummyData();
	} else {
		
		//var museAddress = 'http://'+host+':'+port;// 'http://10.0.1.2:8081';
		var museAddress = getHost();
		console.log('trying to connect to muse on ' + museAddress);
		muse = museData().connection(museAddress);
	}

	//listen to the messages we are interested in 
	muse.listenTo('/muse/elements/alpha_relative');
	muse.listenTo('/muse/elements/beta_relative');
	muse.listenTo('/muse/elements/theta_relative');
	muse.listenTo('/muse/elements/horseshoe');
	muse.listenTo('/muse/elements/touching_forehead');

	muse.start();


	//set the font
	textFont('HelveticaNeue-Light');

	initCalibrationView();
	initRocketView();


	frameRate(30);
	imageMode(CENTER);
	ellipseMode(CENTER);

	//setState(STATE_DASHBOARD);

	frameRate(30);
}


function draw() {
console.log('hi');
	switch(state){
		case STATE_CALIBRATION: drawCalibrationView(); break;
		case STATE_ROCKETVIEW: drawRocketView(); break;
		case STATE_DASHBOARD: drawDashboard(); break;
		default: drawErrorState();
	}

	
}

function windowResized() {
	console.log('windowResized')
	resizeCanvas(window.innerWidth, window.innerHeight);
	console.log('width', width, 'height', height);
}


function alphaTheta(thetaMean, alphaMean, betaMean) {
	//return alphaMean - betaMean;

	return thetaMean + alphaMean - betaMean;
}

function alphaBeta(alphaValue, betaValue) {


	//console.log(alphaMean,betaMean)
	return alphaValue - betaValue;
}

function beta(alphaValue, betaValue) {
	return betaValue - alphaValue;
}

function createStar(x, y, img) {
	var p = {
		pos: createVector(x, y),
		image: img,
		rotation: random(0, TWO_PI),
		size: random(3, 20),
		draw: function(x, y) {
			push();
			translate(x, y);
			rotate(this.rotation);
			image(this.image, 0, 0, this.size, this.size);
			pop();
		}
	};

	return p;
}

function createPlanet(x, y, img) {
	var p = {
		pos: createVector(x, y),
		image: img,
		rotation: random(0, TWO_PI),
		size: random(50, 100),
		draw: function(x, y) {
			push();
			translate(x, y);
			rotate(this.rotation);
			image(this.image, 0, 0, this.size, this.size);
			pop();
		}
	};

	return p;
}

function createRocket(x, y, img) {

	var rock = {
		pos: createVector(x, y),
		vel: 0,
		acc: 0,
		maxVel: 50,
		friction: 0.98,
		thrust: function(d) {
			this.acc = d;
			//console.log(d, this.acc);
		},
		update: function(dt) {

			//console.log('this.acc: ' + this.acc);
			this.vel = this.vel + this.acc * dt;
			this.vel = this.vel * this.friction;
			this.vel = constrain(this.vel, 0, this.maxVel);
			this.pos.y = this.pos.y + dt * this.vel;
		},
		image: img,
		draw: function(x, y) {
			push();
			translate(x, y);
			image(this.image, 0, 0);
			pop();
		}
	};


	return rock;
}

function windowResized() {
	console.log('windowResized')
	resizeCanvas(window.innerWidth, window.innerHeight);
	console.log('width', width, 'height', height);
	console.log(select('#chart'));
}

function keyPressed() {
	console.log('keyPressed');
	console.log('key:' + key);
	if (key == 'Q') {
		rocket.thrust(-1);
	} else if (key == 'W') {

		rocket.thrust(10);
	} else if (key == 'R') {
		rocket.thrust(0);
	}
}

function keyReleased() {
	console.log('keyReleased');
	rocket.thrust(0);
}

function setState(st){

	//cleanup current state
	switch(state){
		case STATE_CALIBRATION: cleanupCalibrationView(); break;
		case STATE_ROCKETVIEW: cleanupRocketView(); break;
		case STATE_DASHBOARD: cleanupDashboard(); break;
	}

	state = st;
	//init new state
	switch(state){
		case STATE_CALIBRATION: initCalibrationView(); break;
		case STATE_ROCKETVIEW: initRocketView(); break;
		case STATE_DASHBOARD: initDashboard(); break;
	}
}

//this needs to be part of a helper library together with sum and mean maybe median also
function mean(arr) {
	var sum = 0;

	arr.forEach(function(d) {
		sum += d;
	});

	return sum / arr.length;

}


function dynamicThreshold(val) {

	var values = [];
	var thres = val || 0;

	var step = 0.01;
	//how many measurements to take into account
	var n = 500;

	function my() {

	}

	my.threshold = function(val) {
		if (val) {
			values.push(val);
		}

		//console.log('values',values);

		while (values.length > n) {
			values.shift();
		}

		/*if(values.length<n){
			return thres;
		}*/

		var _mean = mean(values);
		//console.log('mean',_mean);
		/*
				if(_mean>thres){
					thres+=step;
				}
				else if(_mean<thres){
					thres-=step;
				}*/


		thres = 0.85 * _mean;
		return thres;
	}

	return my;
}