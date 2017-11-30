
/**
 * Draws the real time visualisation
 */
function drawRealtimeVis() {

 background('white');

  // DATA
  //get data from muse
  var rawfft0 = muse.get('/muse/elements/raw_fft0');
  var rawfft4 = muse.get('/muse/elements/raw_fft3');
 // var smrValue = muse.get('/muse/elements/beta_relative');


  if (!rawfft0.id || !rawfft4.id) {
    background('red');
    return;
  }
  
  
  var smrLeft = getSMR(rawfft0.values);
  var smrRight = getSMR(rawfft4.values);
  //ausrechnen wieviele prozent das Herz gefüllt werden soll, basierend auf dem smrValue
  var smr = (smrLeft + smrRight) / 2;
  
  var score = smr;
  var threshold = dt.threshold(score);
  var feedback = score - threshold;
  
  /*
  push();
  text('feedback:'+ feedback, 50, 200);
  text('smr:'+ smr, 50, 300);
  pop();
  
  text('smrLeft '+smrLeft,100,100);
    text('smrRight '+smrRight,100,150);
    text('smr '+smr,100,200);
     text('score '+score,100,250);
       text('threshold '+threshold,100,300);
        text('feedback '+feedback,100,350);
  */
  
  smrValues.push(smr);
 // console.log('smr:',smr);
  
  if (feedback < 0){
    feedback = 0;
  }
  
  //horseshoe 
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
  
  
  var electrodes = [leftEar, rightEar];
  push();
  translate(70, window.innerHeight - 110);
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
  
  
  var fillPercentage = map(feedback, -0.01, 0.03, 0, 1);//feedback
  //var fillPercentage = map(smr, 0, 0.12, 0, 1);       //original
  //var fillPercentage = map(smrValue.mean, 0, 0.2, 0, 1);
  var isBeating = false;
  if (fillPercentage > 0.999) {
    //falls der fillPercentage eine bestimmte Schwelle überschreitet, soll das Herz schlagen
    isBeating = true;
  }

  //das herz zeichnen, abhänging von füllmenge und ob es schlagen soll oder nicht.
  heart(fillPercentage, isBeating);
  
  //Threshold
  
  
  //var r = map(feedback, -1, 0.1, 0, 200);
  /*
  if(feedback > 0){
    fill('green');
  }else{
    fill('steelblue');
  }*/
  
  //ellipse(width/2, height/2, r, r);
 // console.log('feedback:' + feedback);
}

function heart(perc, isBeating) {

  var s = 1;
  if (isBeating) {
    a = a + 0.08;
    s = cos(a) * 1.2;
    if (s < 1.0) {
      s = 1.0;
    }
  }

  //Füllhöhe von Prozent in Pixel mappen.
  var fillHeight = map(perc, 0, 1, 0, pg.height);
 // console.log('pg.height:'+ pg.height);
 // console.log('fillHeight:' + fillHeight);
  //var fillHeight_2 = map(perc, 0, 1, 50, pg.height);
  //Füllmenge in offline canvas zeichnen.
  pg.clear();
  //der halb transparente hintergrund erlaubt, dass die Gefässe den Hintergrund durchscheinen lassen (Rippen etc.)
  pg.background('rgba(0,0,0, 0.05)');
  //c = color('rgba(149, 206, 226, 0.7)');
  pg.fill(234,34,7); //149, 206, 226
  pg.noStroke();
  pg.rect(0, 0, pg.width, fillHeight);
  //pg.rect(0, 0, 450, fillHeight_2);

  //füllmengenzeichnung als p5.Image kopieren
  var pgImg = pg.get(0, 0, pg.width, pg.height);

  //maskieren mit dem herz, so dass nur der Bereich der Herzgefässe sichtbar ist. 
  pgImg.mask(Herz);

  push();
  imageMode(CENTER);
  translate(width / 2, height / 2);
  scale(s);
  image(pgImg, 0, -30);
  //image(he);
  pop();
}
