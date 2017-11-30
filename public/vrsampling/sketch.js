var muse;

//initialize museData
var dummy = false;

var done = false;

//var host = '127.0.0.1';
//var port = 3000;

//states
var STATE_CALIBRATION = 0;
var STATE_MEASUREVIEW = 1;
var STATE_DASHBOARD = 2;
var state = STATE_CALIBRATION;

//TODO make dynamicThreshold.js
//var thresh = dynamicThreshold();
/*
var maxTheta = Number.MIN_VALUE;
var maxAlpha = Number.MIN_VALUE;
var minBeta = Number.MAX_VALUE;
*/
/*
var actualThetaBuffer = [];
var actualAlphaBuffer = [];
var actualBetaBuffer = [];
*/
var bufferLength = 100;

var debug = false;

function preload() {

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
	muse.listenTo('/muse/elements/gamma_relative');
	muse.listenTo('/muse/elements/delta_relative');
	muse.listenTo('/muse/elements/horseshoe');
	muse.listenTo('/muse/elements/touching_forehead');

	muse.start();


	//set the font
	textFont('HelveticaNeue-Light');

	initCalibrationView();
	initMeasureView();


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
		case STATE_MEASUREVIEW: drawMeasureView(); break;
		case STATE_DASHBOARD: drawDashboard(); break;
		default: drawErrorState();
	}

	
}

function windowResized() {
	console.log('windowResized')
	resizeCanvas(window.innerWidth, window.innerHeight);
	console.log('width', width, 'height', height);
}

function keyPressed() {
	console.log('keyPressed');
	console.log('key:' + key);
}

function keyReleased() {
	console.log('keyReleased');
}

function setState(st){

	//cleanup current state
	switch(state){
		case STATE_CALIBRATION: cleanupCalibrationView(); break;
		case STATE_MEASUREVIEW: cleanupMeasureView(); break;
		case STATE_DASHBOARD: cleanupDashboard(); break;
	}

	state = st;

	//init new state
	switch(state){
		case STATE_CALIBRATION: initCalibrationView(); break;
		case STATE_MEASUREVIEW: initMeasureView(); break;
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
