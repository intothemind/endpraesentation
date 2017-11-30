var startTime = 0;
var endTime = 0;
var elapsed = 0;
var stationReached = false;

//images for horsehoe
var calImg = [];
var imgIds = ['leftEar', 'leftFront', 'rightFront', 'rightEar'];
var hsBase = null;

function drawRealtimeVis() {

    //get the current value for alpha_relative and horseshoe
  var horseshoe = muse.get('/muse/elements/horseshoe');  
  var alpha_relative = muse.get('/muse/elements/alpha_relative');
  //console.log(alpha_relative.mean);

  //=======EXERCISE========
  //create a feedback value with alpha_relative, theta_relative and a dynamicThreshold

  var score = alpha_relative.mean;

  var badSignal = 3;
  var leftEar = horseshoe.leftEar || badSignal;
  var rightEar = horseshoe.rightEar || badSignal;
  var leftFront = horseshoe.leftFront || badSignal;
  var rightFront = horseshoe.rightFront || badSignal;

  var threshold = dt.threshold(score);

  var feedback = score - threshold;
  s = second();
  millisecond = millis();
  m = minute();


  //get the current value for alpha_relative
  //var alpha_relative = muse.get('/muse/elements/alpha_relative');

  if (!alpha_relative.mean) {
    return;
  }

  //set the velocity of the gondola

   if (gondola.pos.x >= fifthMast.x) {
    //die position muss nicht neu gesetzt werden, nur die Geschwindigkeit 
    //gondola.pos = createVector(fifthMast.x, fifthMast.y);
    gondola.vel = createVector((sixthMast.x - fifthMast.x) / 100, (sixthMast.y - fifthMast.y) / 100);
    
  } else if (gondola.pos.x >= fourthMast.x) {
    // gondola.pos = createVector(fourthMast.x, fourthMast.y);
    gondola.vel = createVector((fifthMast.x - fourthMast.x) / 100, (fifthMast.y - fourthMast.y) / 100);
    
  } else if (gondola.pos.x >= thirdMast.x) {
    //gondola.pos = createVector(thirdMast.x, thirdMast.y);
    gondola.vel = createVector((fourthMast.x - thirdMast.x) / 100, (fourthMast.y - thirdMast.y) / 100);
    
  } else if (gondola.pos.x >= secondMast.x) {
    //gondola.pos = createVector(secondMast.x, secondMast.y);
    gondola.vel = createVector((thirdMast.x - secondMast.x) / 100, (thirdMast.y - secondMast.y) / 100);
    
  }

  var speed = map(feedback, -0.1, 0.1, 0, 1);
  if (feedback < 0) {
    speed = 0;
  }
   if (gondola.pos.x >= sixthMast.x && gondola.pos.x < sixthMast.x + 10){
    speed = 0;
    stationReached = true;
    

  }
  gondola.vel.setMag(speed);


  //console.log('feedback'+ feedback);




  background('white');
  image(hintergrund,0,0,width,height);

  if (stationReached == true) {
  

      endTime = millis();

      if(elapsed == 0){
      elapsed = endTime - startTime;
      setTimeout(startDashboard, 5000);
    }

  var secs = elapsed/1000;
  var mins = floor(secs/60);
  var restsecs = floor(secs % 60);

  //console.log(mins,secs,restsecs);
  timeresult = nf(mins,2,0) + ":" + nf(restsecs,2,0);
  //var result = floor(timeresult);


  push();
  translate(width-200, height-130);
  fill('white');
  textFont(myfont);
  textSize(30);
  text("Time: \n" + timeresult,  50, 50);
  pop();


  }

  //console.log(m,s,millisecond);




  //draw masts
 // for (var i = 0; i < masts.length; i++) {
 //   var mast = masts[i];
 //   fill('red');
 //   noStroke();
 //   ellipse(mast.x, mast.y, 10, 10);
 //  }

  //console.log('gondola.pos', gondola.pos);

  //update gondola position
  gondola.pos.add(gondola.vel);






  //draw gondola
  //fill(0);
  //ellipse(gondola.pos.x, gondola.pos.y, 20, 20);
  push();
  translate(-615/55,-70/55);
  image(cabin, gondola.pos.x, gondola.pos.y,(cabin.width)/55,(cabin.height)/55);
  pop();

  image(station,0,0,width,height);

  //horseshoe 
  var electrodes = [leftEar,leftFront,rightFront,rightEar];
  push();
  translate(50, height - 45);
  ellipseMode(CENTER);
  var r = 20;
  var gap = 10;
  for(var i=0; i<electrodes.length; i++){
    var el = electrodes[i];
    var col = getColor(el);
    noStroke();
    fill(col);
    var x = i*(r+gap);
    ellipse(x,0,r,r);
  }
  pop();

  


}


function getColor(val) {
  if(val == 1){
    return color(139,174,167);
  }
  else if(val == 2){
    return color(244,237,209);
  }
  else if(val >= 3){
    return color(184,93,81);
  }
  else return 'red';
}