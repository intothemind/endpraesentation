function initDashboard() {

}

function drawDashboard() {

  imageMode(CORNER);
  background(bgImg);

  //Funktionen der Missionen 

  //Mission 3
  push();
  translate(0, 60);
  scale(0.93);
  dashboardMission3();
  pop();


  //Mission 1
  push();
  translate(width / 2, height / 2 + 100);
  scale(0.45);
  dashboardMission1();
  pop();



  //Alle Beschriftungen des Dashboards
  //Braininterface
  push();
  fill(204, 255, 204);
  translate(5, 950);
  textSize(16);
  noStroke();
  textAlign(LEFT, TOP);
  textFont(myFontBold);
  text('BRAININTERFACE', 0, 0);
  pop();

  //Ergebnis
  push();
  fill(204, 255, 204);
  translate(width - 10, 950);
  textSize(16);
  noStroke();
  textAlign(RIGHT, TOP);
  textFont(myFontBold);
  text('ERGEBNIS:', 0, 0);
  pop();

  //Ergebnis Punktestand
  push();
  fill(204, 255, 204);
  translate(width - 10, 965);
  textSize(40);
  textStyle(BOLD);
  noStroke();
  textAlign(RIGHT, TOP);
  textFont(myFontBold);
  text(starCounter * 5 + floor(map(finaleDistanz, 300, 0, 0, 375)) + '/750', 0, 0);
  pop();

  //Mission 1
  push();
  fill(204, 255, 204);
  translate(10, 880);
  textSize(16);
  noStroke();
  textAlign(LEFT, TOP);
  textFont(myFontBold);
  text('MISSION 1 ', 0, 0);
  textSize(32);
  text('ENTSPANNUNG ', 0, 20);
  pop();

  //Mission 1 Punkte
  push();

  translate(width - 10, 870);
  textSize(16);
  fill(204, 255, 204);
  textAlign(RIGHT, TOP);
  textFont(myFont);
  text(starCounter + ' von 75 Sternen', 0, 0);
  textFont(myFontBold);
  textSize(40);
  text('+ ' + starCounter * 5, 0, 20);
  pop();

  //Mission 3
  push();
  fill(204, 255, 204);
  translate(10, height / 2 - 60);
  textSize(16);
  noStroke();
  textAlign(LEFT, TOP);
  textFont(myFontBold);
  text('MISSION 3 ', 0, 0);
  textSize(32);
  text('Fokus ', 0, 20);
  pop();


  //Mission 3 Punkte
  push();

  translate(width - 10, height / 2 - 60);
  textSize(16);
  fill(204, 255, 204);
  textAlign(RIGHT, TOP);
  textFont(myFontBold);
  textFont(myFont);
  text('noch ' + floor(finaleDistanz) + ' bis zum Ziel', 0, 0);
  textFont(myFontBold);
  textSize(32);
  text('+ ' + floor(map(finaleDistanz, 300, 0, 0, 375)), 0, 20);
  pop();


  //Linien um die Missionen
  //Mission 1
  push();
  stroke(204, 255, 204);
  noFill();
  translate(5, height / 2);
  rect(0, 0, width - 10, height / 2 - 90);
  pop();

  //Mission 3
  push();
  stroke(204, 255, 204);
  noFill();
  translate(5, 5);
  rect(0, 20, width - 10, height / 2 - 20);
  pop();

  //TITEL DES DASHBOARDS
  push();

  translate(width / 2, 30);
  textSize(32);
  fill(204, 255, 204);
  textAlign(CENTER, TOP);
  textFont(myFontBold);

  text('MISSIONSREPORT', 0, 0);

  pop();


  //PUNKTE OBEN RECHTS
  push();
  fill(204, 255, 204);
  translate(width - 10, 40);
  textSize(16);
  noStroke();
  textAlign(RIGHT, TOP);
  textFont(myFontBold);
  text('PUNKTE ', 0, 0);

  pop();



  //Ranking
  push();
  fill(204, 255, 204);
  translate(10, 40);
  textSize(16);
  noStroke();
  textAlign(LEFT, TOP);
  textFont(myFontBold);
  text('RANKING', 0, 0);
  textSize(16);
  textFont(myFont);
  text('JOSEF  300', 0, 30);
  text('BJÖRN  140', 0, 50);
  text('JAMES  110', 0, 70);

  pop();



  /*


    
    
     //die position der erde und der Ringe wird hier durch  mouseX bestimmt
    //nachher kannst du diesen wert via muse daten steuern.
    var earthPosition = map(mouseX, 0, width, 0, 200);
    push();
    translate(width / 2, earthPosition)
      //image(img2,50,-150,1253/4,1019/4);
    imageMode(CENTER);
    image(earthImg, 0, 0, 1253 / 12, 1019 / 12);

    noFill();
    stroke(227,227,227,20);
    ellipse(0, 0, 100, 100);
    ellipse(0, 0, 200, 200);
    ellipse(0, 0, 300, 300);
    ellipse(0, 0, 400, 400);

    pop();
    
    //Rocket Display
    imageMode(CENTER);
    image(rocketImg, 200, 250, 536 / 8, 574 / 8);*/
  noLoop();
}

function dashboardMission1() {

  noFill();
  stroke(227, 227, 227, 20);
  for (var i = 0; i < circleRadius.length; i++) {
    var r = circleRadius[i];
    ellipse(0, 0, 2 * r, 2 * r);
  }



  fill('#E3E3E3');

  noFill();
  stroke('white');

  // console.log('starPositions: ' + starPositions.length);
  for (i = 0; i < starPositions.length; i++) {
    var ra = starPositions[i].r;

    var angle = radians(starPositions[i].a);
    var v = createVector(ra, 0);
    v.rotate(angle);

    ellipse(v.x, v.y, 10, 10);
  }


  fill('white');



  for (i = 0; i < starCounter; i++) {
    var ra = starPositions[i].r;

    var angle = radians(starPositions[i].a);
    var v = createVector(ra, 0);
    v.rotate(angle);


    ellipse(v.x, v.y, 10, 10);

  }



}



function dashboardMission3() {
  imageMode(CORNER);
  //background(bgImg);

  var dashWidth = width;
  var dashHeight = height / 2;

  //set the viewport to the upper rectangle from the dymensions
  var vpWidth = 3 * universeWidth;
  var vpHeight = ((dashHeight / dashWidth) * vpWidth);

  //create a viewport at the rocket position with the previously calculated with and height
  viewport = createViewport(rocket.x, rocket.y, vpWidth, vpHeight);



  //  console.log('earth ', earth);
  //  console.log('rocket', rocket);


  var positionErde = createVector(earth.x, earth.y);
  var positionRocket = createVector(rocket.x, rocket.y);
  var distanceV = p5.Vector.sub(positionErde, positionRocket);
  var distance = distanceV.mag();



  //  console.log('distance ', distance);



  //calculate a reasonable speed based on alpha value
  // var speed = map(alpha_relative.mean, 0, 1, 0, -1);
  var speed = 0;
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
    drawStarDashboard(star, viewport, dashWidth, dashHeight);
  }

  //draw the earth with rings
  drawEarthDashboard(earth, viewport, dashWidth, dashHeight);

  //draw rocket with help of the viewport
  drawRocketDashboard(rocket, viewport, dashWidth, dashHeight);


}



function drawRocketDashboard(r, vp, w, h) {

  //so wie du das hier machst nimmt man nicht auf den viewport (vp) Rücksicht
  // image(img,r.x,r.y,536/4,574/4);


  //var rSize = 50;

  var screenX = map(r.x, vp.left, vp.right, 0, w);
  var screenY = map(r.y, vp.top, vp.bottom, 0, h);
  var sc = w / (vp.right - vp.left);

  var w = 536 / 7.5;
  var h = 574 / 7.5;
  var screenW = sc * w;
  var screenH = sc * h;
  //fill('black');
  //ellipse(screenX, screenY, 100, 100);

  imageMode(CENTER);
  image(rocketImg, screenX, screenY, screenW / 2, screenH / 2);

}

function drawStarDashboard(s, vp, w, h) {
  var sc = w / (vp.right - vp.left);
  var screenX = map(s.px, vp.left, vp.right, 0, w);
  var screenY = map(s.py, vp.top, vp.bottom, 0, h);

  if (screenX < 0 || screenX > w || screenY < 0 || screenY > h) {
    return;
  }
  ellipse(screenX, screenY, sc * s.pr);
}


function drawEarthDashboard(e, vp, w, h) {

  //scale factor to scale the radius properly to the viewport
  var sc = w / (vp.right - vp.left);

  //calculate screen postion of earth based on the earths position in the unverse and the viewport
  var screenX = map(e.x, vp.left, vp.right, 0, w);
  var screenY = map(e.y, vp.top, vp.bottom, 0, h);

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