/**
 * Draws the calibration 
 */
function drawCalibration() {
  
  background('white');
  
  
  
  heart();

  
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
  

  //Be Focused
  push();
  translate(50, 100);
  fill(68, 67, 67);
  textSize(50);
  textFont(myFont);
  text('BE FOCUSED', 0, 0);
  pop();
  
  //Calibration
  push();
  translate(width / 2, height / 2 - 320);
  textFont(myFont);
  textAlign(CENTER);
  textSize(20);
  text('Calibration', 0, 0);
  pop();
  
  //horseshoe 
  var electrodes = [leftEar, rightEar]; //leftFront, rightFront
  push();
  translate(width / 2 -20, height / 2 - 300); //width / 2 - 40
  rectMode(CENTER);
  var r = 20;
  var gap = 10;
  for(var i=0; i<electrodes.length; i++){
    var el = electrodes[i];
    var col = getColor(el);
    noStroke();
    fill(col);
    var x = i*(r+gap);
    rect(x,0,r,r);
  }
  pop();
  
  //text
  
  push();
  translate(window.innerWidth/2, window.innerHeight/2 + 270);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(15);
  var lines ="HERZLICH WILLKOMMEN BEIM SENSOMOTORISCHEN TRAINING!\nMIT HILFE DIESES TRAININGS TRAINIERST DU DEINE\nFEINMOTORIK VERSUCHE DICH IN DEN NÄCHSTEN DREI MINUTEN ZU\nFOKUSSIEREN UND BLENDE UNWICHTIGES AUS. ZIEL IST ES,\n DAS HERZ MIT BLUT FÜLLEN UND ZUM PULSIEREN ZU BRINGEN ";
  textLeading(20);
  text(lines, 0, 0);
  pop();
  
  var readyToGo = (leftEar + rightEar) <= 4; //rightFront + leftFront

  var msg = 'Das Muse Headband sitzt noch nicht richtig!';
  if (readyToGo) {
    msg = 'Los gehts!';
  }
  push();
  translate(width / 2, height / 2 + 360);
  textAlign(CENTER, CENTER);
  textSize(18);
  textFont(myFont);
  noStroke(68, 67, 67);
  fill('black');
  text(msg, 0, 0);
  pop();
  
  //ellipse(width/2,height/2,30,30);
  
  if (readyToGo) {
    startButton.show();
  }
  else {
    startButton.hide();
  }
}


function getColor(val) {
  if(val == 1){
    return 'green';
  }
  else if(val == 2){
    return 'yellow';
  }
  else if(val >= 3){
    return 'red';
  }
  else return 'red';
}
