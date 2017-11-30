function initMission3() {
  //make sure viewport width to height ratio is equal to width to height ratio of canvas
  //so this viewport will be as wide as the universe, the height is matching the canvas proportions
  var vpWidth = universeWidth;
  var vpHeight = ((height / width) * vpWidth);

  //create a viewport at the rocket position with the previously calculated with and height
  viewport = createViewport(rocket.x, rocket.y, vpWidth, vpHeight);


  for (var i = 0; i < starsNr; i++) {
    var star = {
      px: random(0, universeWidth),
      py: random(0, universeHeight),
      pr: random(3, 10)
    };

    stars.push(star);

  }
}

function drawMission3() {
  imageMode(CORNER);
  background(bgImg);
  //get the current value for alpha_relative
  var alpha_relative = muse.get('/muse/elements/alpha_relative');
  // console.log(alpha_relative.leftEar);

  //get the current value for beta_relative
  var beta_relative = muse.get('/muse/elements/beta_relative');

  var theta_relative = muse.get('/muse/elements/theta_relative');

  var horse = muse.get('/muse/elements/horseshoe');


  //Threshold
  var score = thetaBeta(theta_relative.mean, beta_relative.mean);

  var threshold = dt.threshold(score);

  var feedback = score - threshold;

  if (feedback < 0) {
    feedback = 0;
  }



  // console.log('feedback ' + feedback);
  //console.log('score ' + score);
  //  console.log('threshold ' + threshold);
  //  console.log('earth ',  earth);
  //  console.log('rocket', rocket);


  var positionErde = createVector(earth.x, earth.y);
  var positionRocket = createVector(rocket.x, rocket.y);
  var distanceV = p5.Vector.sub(positionErde, positionRocket);
  var distance = distanceV.mag();
  finaleDistanz = distance;



  // console.log('distance ', distance);



  //calculate a reasonable speed based on alpha value
  // var speed = map(alpha_relative.mean, 0, 1, 0, -1);
  var speed = map(feedback, 0, 0.1, 0, -0.1);
  // console.log('speed', speed);

  //check if speed is a valid number (if no value was measured from muse, e.g. when muse is not on the head, then speed will be NaN)
  if (isNaN(speed)) {
    //set speed to 0 if speed is not a number (NaN)
    speed = 0;
  }
  rocket.vy = speed;

  //update the rocket position based on its current speed
  //you might want to change this into a somewhat more elaborate formula containing 
  //accelaration and velocity to calculate the new position at each frame.
  updateRocket(rocket);

  //set the viewport position to the rocket position (in universe coordinates)
  viewport.x = rocket.x;

  //verschieben der viewport y position in bezug auf die rocket position
  viewport.y = rocket.y - viewport.h / 3;

  //update the bounds of the viewport based on the new position (-> left,right,top,bottom)
  updateViewportBounds(viewport);

  //draw stars
  fill(255);
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    //ich habe eine funktion drawStar(star,viewport) gemacht,dann wird das ganze übersichtlicher
    drawStar(star, viewport);
  }

  //draw the earth with rings
  drawEarth(earth, viewport);

  //draw rocket with help of the viewport
  drawRocket(rocket, viewport);



  /*
    fill('#FFDF4E');
    ellipse(50, 450, 150, 150);
    ellipse(350, 450, 150, 150);

    fill('#4F44FF');
    ellipse(200, 50, 200, 200);
  */

  fill('red');
  if (mouseIsPressed) {
    rocket.vy = -1;
    //updateRocket(rocket);
    print(mouseIsPressed);
  } else {
    rocket.vy = 0;
  }

  //die position der erde und der Ringe wird hier durch  mouseX bestimmt
  //nachher kannst du diesen wert via muse daten steuern.
  /* var earthPosition = map(mouseX, 0, width, 0, 200);
   //var earthPosition = map(alphaR, 0, 1, 0, 50);
   
   push();
   translate(width / 2, earthPosition)
     //image(img2,50,-150,1253/4,1019/4);
   imageMode(CENTER);
   image(img2, 0, 0, 1253 / 8, 1019 / 8);

   noFill();
   stroke(227,227,227,20);
   ellipse(0, 0, 100, 100);
   ellipse(0, 0, 300, 300);
   ellipse(0, 0, 500, 500);
   ellipse(0, 0, 700, 700);

   pop();*/

  push();
  fill('white');
  translate(10, 950);
  textSize(20);
  noStroke();
  //text() braucht noch zwei argumente für die position (x,y), darum hats nicht geklappt
  textAlign(LEFT, TOP);
  text('BRAININTERFACE', 0, 0);


  var w = 20;
  var gap = 10;
  var x = 0;
  var y = 0;
  // Horseshoe anzeige Kontakt!! 
  translate(10, 40);
  //col = ('green');
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

  push();
  translate(width - 10, 950);
  textSize(20);
  noStroke();
  //text() braucht noch zwei argumente für die position (x,y), darum hats nicht geklappt
  textAlign(RIGHT, TOP);
  fill('white');
  text('DISTANCE TO EARTH: ' + floor(distance), 0, 0);
  translate(0, 0);
  //text('PUNKTE: ' + floor(map(distance,300,0,0,375)),0,0);
  pop();

  push();
  translate(width - 10, 40);
  textSize(20);
  noStroke();
  //text() braucht noch zwei argumente für die position (x,y), darum hats nicht geklappt
  textAlign(RIGHT, TOP);
  fill('white');
  translate(0, 0);
  text('PUNKTE: ' + floor(map(distance, 300, 0, 0, 375)), 0, 0);

  pop();



  if (distance < 10) {
    startDashboard();
  }


}

function updateRocket(r) {
  r.x = r.x + r.vx;
  r.y = r.y + r.vy;
}

function drawRocket(r, vp) {

  //so wie du das hier machst nimmt man nicht auf den viewport (vp) Rücksicht
  // image(img,r.x,r.y,536/4,574/4);


  //var rSize = 50;

  var screenX = map(r.x, vp.left, vp.right, 0, width);
  var screenY = map(r.y, vp.top, vp.bottom, 0, height);
  var sc = width / (vp.right - vp.left);

  var w = 536 / 7.5;
  var h = 574 / 7.5;
  var screenW = sc * w;
  var screenH = sc * h;
  //fill('black');
  //ellipse(screenX, screenY, 100, 100);

  imageMode(CENTER);
  image(rocketImg, screenX, screenY, screenW / 2, screenH / 2);

}

function drawStar(s, vp) {
  var sc = width / (vp.right - vp.left);
  var screenX = map(s.px, vp.left, vp.right, 0, width);
  var screenY = map(s.py, vp.top, vp.bottom, 0, height);
  ellipse(screenX, screenY, sc * s.pr);
}


function drawEarth(e, vp) {

  //scale factor to scale the radius properly to the viewport
  var sc = width / (vp.right - vp.left);

  //calculate screen postion of earth based on the earths position in the unverse and the viewport
  var screenX = map(e.x, vp.left, vp.right, 0, width);
  var screenY = map(e.y, vp.top, vp.bottom, 0, height);

  var ratio = earthImg.height / earthImg.width;
  var screenW = sc * e.width;
  var screenH = ratio * screenW;

  //var earthPosition = map(mouseX, 0, width, 0, 200);
  //var earthPosition = map(alphaR, 0, 1, 0, 50);

  push();
  //translate(width / 2, earthPosition)
  translate(screenX, screenY);
  //image(img2,50,-150,1253/4,1019/4);
  imageMode(CENTER);
  // image(img2, 0, 0, 1253 / 8, 1019 / 8);
  image(earthImg, 0, 0, screenW, screenH);

  noFill();
  stroke(227, 227, 227, 20);
  /*ellipse(0, 0, 100, 100);
  ellipse(0, 0, 300, 300);
  ellipse(0, 0, 500, 500);
  ellipse(0, 0, 700, 700);*/
  //Draw the rings
  for (var i = 0; i < e.rings.length; i++) {
    var r = sc * e.rings[i];
    ellipse(0, 0, r, r);
  }

  pop();
}



function createViewport(_x, _y, _w, _h) {
  var vp = {
    x: _x,
    y: _y,
    w: _w,
    h: _h,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  };
  updateViewportBounds(vp);
  return vp;
}

function updateViewportBounds(vp) {
  vp.left = vp.x - 0.5 * vp.w;
  vp.right = vp.x + 0.5 * vp.w;
  vp.top = vp.y - 0.5 * vp.h;
  vp.bottom = vp.y + 0.5 * vp.h;
}

function thetaBeta(t, b) {
  //return 0.8 * t + 0.2 * b;
  return -t + b;
}