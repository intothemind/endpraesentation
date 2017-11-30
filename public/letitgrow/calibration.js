/**
 * Draws the calibration 
 */
 
 var titel_calib;
 
function drawCalibration() {
  
  background('white');

  var horseshoe = muse.get('/muse/elements/horseshoe');

  var badSignal = 3;
  var leftEar = horseshoe.leftEar || badSignal;
  var rightEar = horseshoe.rightEar || badSignal;
  var leftFront = horseshoe.leftFront || badSignal;
  var rightFront = horseshoe.rightFront || badSignal;

  leftEar = constrain(leftEar, 1, 3);
  rightEar = constrain(rightEar, 1, 3);
  leftFront = constrain(leftFront, 1, 3);
  rightFront = constrain(rightFront, 1, 3);

  var images = getImages(leftEar, leftFront, rightFront, rightEar);

  //title
  push();
  imageMode(CENTER);
  translate(width / 2, 80);
  image(schriftzug, 0, 0, 450, 57);
  pop();
  
  push();
  translate(width / 2, height / 2 - 200);
  textAlign(CENTER, CENTER);
  textSize(18);
  text('Wenn alle Punkte richtig sitzen kann es los gehen!', 0, 0);
  pop();

  //horseshoe img
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(hsBase, 0, 0);
  
  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    image(img, 0, 0);
  }
  pop();

  //message
  var readyToGo = (leftEar + rightEar + rightFront + leftFront) <= 4;

  var msg = 'Headband sitzt nicht richtig';
  if (readyToGo) {
    msg = 'Entspanne dich und';
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
    startButton.show();
  }
  else {
    startButton.hide();
  }
}
/*
function mousePressed(){
  if(SimStarted === 0 && readyToGo){
    startRealtime(); 
  }
}*/


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