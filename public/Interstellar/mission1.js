function drawMission1() {
  background('black');
  imageMode(CORNER);
  image(bgImg, 0, 0, 3201 / 3, 4267 / 3);
  image(rocketImg, 310, 750, 536 / 4, 574 / 4);

  //get the current value for alpha_relative
  var alpha_relative = muse.get('/muse/elements/alpha_relative');
  // console.log(alpha_relative.leftEar);

  //get the current value for beta_relative
  var beta_relative = muse.get('/muse/elements/beta_relative');

  var theta_relative = muse.get('/muse/elements/theta_relative');

  var horse = muse.get('/muse/elements/horseshoe');


  //draw circle corresponding to the alpha value (mean of all electrodes)
  //map the alpha value to a value which makes sense for number of stars
  var alphaR = map(alpha_relative.mean, 0, 1, 0, 50);

  //create a feedback value with alpha_relative, theta_relative and a dynamicThreshold

  //var score = 0.8*alpha_relative.mean + 0.2*theta_relative.mean;
  //var score = 0.8*alpha_relative.mean + 0.2*theta_relative.mean - beta_relative.mean;
  var score = alphaTheta(alpha_relative.mean, theta_relative.mean);

  var threshold = dt.threshold(score);


  // console.log('alphaR ' , alphaR);



  //  console.log('score' + score);
  //  console.log('threshold' + threshold); 

  noFill();
  stroke(227, 227, 227, 40);
  strokeWeight(1);


  /*push();
  translate(200, 0);
  for (var i = 0; i < circleRadius.length; i++) {
    var r = circleRadius[i];
    ellipse(0, 0, 2 * r, 2 * r);
  }
  pop();*/

  push();
  translate(384, 0);
  for (var i = 0; i < circleRadius.length; i++) {
    var r = circleRadius[i];
    ellipse(0, 0, 2 * r, 2 * r);
  }



  fill('#E3E3E3');

  //die Anzahl Sterne kannst du dann via muse daten steuern.
  //jetzt werden die anzahl sterne mal via mouseX gesteuert. 
  // var nrStars = floor(map(mouseX, 0, width, 0, 100));
  // var nrStars = floor(map(alphaR, 0, 1, 0, 50)); 
  //var nrStars = floor(map(thresholdStar, 0, 1, 0, 50));

  /* randomSeed(21);
  for (var i = 0; i < nrStars; i++) {

    //zufallsmässig einer der Kreisradien auswählen. floor() rundet die dezimal zahl ab
    var radiusIndex = floor(random(0, circleRadius.length));
    var r = circleRadius[radiusIndex];

    //zufalls winkel, damit der punkt inrgenwo auf dem kreis verteilt werden kann
    var angle = radians(random(0, 180));
    var v = createVector(r, 0);
    v.rotate(angle);

    push();
    translate(200, 0);
    ellipse(v.x, v.y, 5, 5);
    pop();
  } */
  noFill();
  color('white');
  for (i = 0; i < starPositions.length; i++) {
    var ra = starPositions[i].r;

    var angle = radians(starPositions[i].a);
    var v = createVector(ra, 0);
    v.rotate(angle);


    ellipse(v.x, v.y, 10, 10);
  }

  fill('white');

  var ellapsed = millis() - startTime;
  if (ellapsed > 2500) {
    // console.log('jetzt messen');
    if (score > threshold) {
      starCounter = starCounter + 1;
    }
    startTime = millis();

  }

  starCounter = constrain(starCounter, 0, starPositions.length);
  for (i = 0; i < starCounter; i++) {
    var ra = starPositions[i].r;

    var angle = radians(starPositions[i].a);
    var v = createVector(ra, 0);
    v.rotate(angle);


    ellipse(v.x, v.y, 10, 10);

  }
  pop();


  /*  var r = circleRadius[0];
    
    var angle = circle1_starPosition[0];
    var v = createVector(r, 0);
    v.rotate(angle);
    
    push();
    translate(200, 0);
    ellipse(v.x, v.y, 5, 5);
    pop(); */



  push();
  translate(5, 950);
  textSize(20);
  noStroke();
  //text() braucht noch zwei argumente für die position (x,y), darum hats nicht geklappt
  textAlign(LEFT, TOP);
  fill('white')
  text('BRAININTERFACE', 0, 0);


  var w = 20;
  var gap = 10;
  var x = 0;
  var y = 0;
  // Horseshoe anzeige Kontakt!! 
  translate(10, 40);
 // col = ('green');
  //draw left ear
  var col = getColor(horse.leftEar);
  //console.log('col',col);
  fill(col);
  ellipse(x, y, w, w);

  //draw left front
  var col = getColor(horse.leftFront);
  fill(col);
  x = w + gap;
  ellipse(x, y, w, w);

  //draw right front
  var col = getColor(horse.rightFront);
  fill(col);
  x = 2 * (w + gap)
  ellipse(x, y, w, w);

  //draw right ear
  var col = getColor(horse.rightEar);
  fill(col);
  x = 3 * (w + gap);
  ellipse(x, y, w, w);


  pop();

  //anzahl sterne rechts unten 
  push();
  translate(width - 10, 950);
  textSize(20);
  noStroke();
  //text() braucht noch zwei argumente für die position (x,y), darum hats nicht geklappt
  textAlign(RIGHT, TOP);
  fill('white');
  text('STARS: ' + starCounter * 5, 0, 0);

  pop();

}


function alphaTheta(a, t) {
  return 0.5 * a + 0.5 * t;
}