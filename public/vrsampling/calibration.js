var calImg = [];
var imgIds = ['leftEar', 'leftFront', 'rightFront', 'rightEar'];
var hsBase = null;

var frontImg = [];

var goButton = null;


function initCalibrationView() {
	if (!goButton) {
		goButton = createButton('Go!');
	}
	goButton.position(width / 2 - 50, height / 2 + 240);
	goButton.mousePressed(loadMeasureView);
	goButton.size(100, 30);
	goButton.hide();
}

function drawCalibrationView() {

	background('white');

	/*	noStroke();
		fill('black');
		text('displayWidth x displayHeight : ' + displayWidth + ' x ' + displayHeight,30,50);
		text('innerWidth x innerHeight : ' + window.innerWidth + ' x ' + window.innerHeight,30,100);
		text('width x height :' + width + ' x ' + height,30,150);*/

	var horseshoe = muse.get('/muse/elements/horseshoe');
	var touching_forehead = muse.get('/muse/elements/touching_forehead');
	//console.log('touching_forehead',touching_forehead);
	//console.log(horseshoe);

	var badForhead = 0;
	var forehead = touching_forehead.value || badForhead;


	var badSignal = 3;
	var leftEar = horseshoe.leftEar || badSignal;
	var rightEar = horseshoe.rightEar || badSignal;
	var leftFront = horseshoe.leftFront || badSignal;
	var rightFront = horseshoe.rightFront || badSignal;

	leftEar = constrain(leftEar, 1, 3);
	rightEar = constrain(rightEar, 1, 3);
	leftFront = constrain(leftFront, 1, 3);
	rightFront = constrain(rightFront, 1, 3);

	//console.log(leftEar,leftFront,rightFront,rightEar);


	var images = getImages(leftEar, leftFront, rightFront, rightEar);
	//console.log(images);
	/*
		var leftEarImg = getImage(leftEar);
		var leftFrontImg = getImage(leftFront);
		var rightFrontImg = getImage(rightFront);
		var */

	//title
	push();
	translate(width / 2, height / 2 - 200);
	textAlign(CENTER, CENTER);
	textSize(32);
	text('Calibration', 0, 0);
	pop();

	//horseshoe img
	push();
	translate(width / 2, height / 2);
	image(hsBase, 0, 0);
	image(frontImg[forehead], 0, 0);
	imageMode(CENTER);
	for (var i = 0; i < images.length; i++) {
		var img = images[i];

		image(img, 0, 0);

	}
	pop();

	//message
	var readyToGo = (leftEar + rightEar + rightFront + leftFront) <= 4;

	var msg = 'Headband not sitting properly';
	if (readyToGo) {
		msg = 'You are ready to go!';
	}
	push();
	translate(width / 2, height / 2 + 200);
	textAlign(CENTER, CENTER);
	textSize(18);
	noStroke();
	fill('black');
	text(msg, 0, 0);
	pop();

	if (readyToGo) {
		goButton.show();
	}
	else {
		goButton.hide();
	}

}

function cleanupCalibrationView() {
	goButton.hide();
	goButton.remove();
	goButton = null;
}

function getImages(le, lf, rf, re) {
	var leftEarImg = getImage('leftEar', le);
	var leftFrontImg = getImage('leftFront', lf);
	var rightFrontImg = getImage('rightFront', rf);
	var righEarImg = getImage('rightEar', re);

	return [leftEarImg, leftFrontImg, rightFrontImg, righEarImg];
}

function getImage(id, val) {
	var valIndex = val - 1;
	return calImg[id][valIndex];
}

function loadMeasureView() {
	setState(STATE_MEASUREVIEW);
}