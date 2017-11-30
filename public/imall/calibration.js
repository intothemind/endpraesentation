/**
 * Draws the calibration 
 */
function drawCalibration() {

  background(0);

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
  textSize(50);
  textFont(fontTitel);
  fill(219, 208, 243);
  text('«IM ALL» | Muse-Kalibration', 0, 0);
  pop();

  //erklärung
  push();
  translate(width / 2, height / 2 - 230);
  textAlign(CENTER);
  textFont(font);
  textSize(18);
  fill(255);
  text("Der ganze Trainingsflug dauert 6 Minuten. Du durchfliegst\nzwei Phasen. Du erkennst sie an den Farben:", 0, 0);
  fill(112, 50, 141);
  textSize(22);
  text("violett für Konzentration", 0, 50);
  fill(26, 69, 154);
  text("blau für Entspannung", 0, 75);
  textSize(18);
  fill(255);
  text("Deine Verbindung zum Muse - Gerät wird jetzt überprüft:", 0, 140);
  pop();


  //horseshoe img
  push();
  translate(width / 2, height / 2 + 55);
  imageMode(CENTER);
  image(hsBase, 0, 0);

  for (var i = 0; i < images.length; i++) {
    var img = images[i];

    image(img, 0, 0);

  }
  pop();

  //message
  var readyToGo = (leftEar + rightEar + rightFront + leftFront) <= 4;

  var msg = 'Headband not sitting properly';
  if (readyToGo) {
    textFont(font)
    msg = 'Du bist bereit für den Flug!';
  }
  push();
  translate(width / 2, height / 2 + 220);
  textAlign(CENTER, CENTER);
  textSize(18);
  noStroke();
  fill('white');
  text(msg, 0, 0);
  pop();

  if (readyToGo) {
    startButton.show();
  } else {
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