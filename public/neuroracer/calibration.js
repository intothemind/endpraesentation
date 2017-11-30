var bg;
var ailerons
/**
 * Draws the calibration 
 */
function drawCalibration() {


  background(bg_cali);

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
  translate(width / 2, height / 2 - 300);
  textAlign(CENTER, CENTER);
  textSize(45);
  textFont(ailerons);
  text('Kalibrierung', 0, 0);
  pop();

  //horseshoe img
  push();
  translate(width / 2, height / 2-100);
  imageMode(CENTER);
  image(hsBase, 0, 0);
  
  for (var i = 0; i < images.length; i++) {
    var img = images[i];

    image(img, 0, 0);

  }
  pop();

  //message
  var readyToGo = (leftEar + rightEar + rightFront + leftFront) <= 4;

  var msg = 'Das Headband sitzt nicht richtig.';
  if (readyToGo) {
    msg = 'Du bist bereit. Ab auf die Piste!';
  }
  push();
  translate(width / 2, height / 2 + 100);
  textAlign(CENTER, CENTER);
  textSize(20);
  textFont(ailerons);
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