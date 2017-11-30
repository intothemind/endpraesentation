/**
 * Draws the dashboard
 */
function drawDashboardVis() {
  background('0');

  background(0);
  //console.log('img:' + img);
  image(img, 0, 0);
  image(img, 0, 0);
  image(img1, 0, 0);



  //*************************************************************************************************************
  //PLANETENGRÖSSE VARIABLEN
  //var sizeWechsel = 100 //DURCHSCHN. ZEIT FÜR WECHSEL
  var sizeBeta = map(betaMean, 0, 1, 0, 500); //VIOLETT - KONZENTRATION - BETA
  var sizeAlpha = map(alphaMean, 0, 1, 0, 500); //BLAU - ENTSPANNUNG - ALPHA/TETA 

  //Durschnittsgrösse alpha, blau
  //calculate percentage value (0.65 -> 65)
  var percA = map(alphaMean, 0, 1, 0, 100);
  var percB = map(betaMean, 0, 1, 0, 100);

  //cut off the decimal values, check out the reference what floor() does
  percA = floor(percA);
  percB = floor(percB);

  //*************************************************************************************************************
 

  /********************************************************************************************
    PLANETEN
  ********************************************************************************************/
  textFont(fontTitel);
  textSize(50);
  textAlign(LEFT);
  fill('white');
  text('IM ALL', 100, 70);

  //KONZENTRATIONS-PLANET - BETA - VIOLETT
  push();
  translate(200, 100);

  colorMode(RGB, 255, 255, 255, 1);
  fill(147, 94, 207, 0.7);
  noStroke();
  ellipse(100, 100, sizeBeta, sizeBeta); //ACHTUNG GRÖSSE VARIABEL

  textSize(40);
  fill(255);
  textAlign(CENTER);
  text(percB + '%', 100, 100); //ACHTUNG TEXT VARIABEL

  pop();

  //ENTSPANNUNGS-PLANET - ALPHA/TETA - BLAU
  push();
  translate(640, 100);
  colorMode(RGB, 255, 255, 255, 1);
  fill(120, 170, 244, 0.7);
  noStroke();
  ellipse(100, 100, sizeAlpha, sizeAlpha); //ACHTUNG GRÖSSE VARIABEL

  textSize(40);
  fill(255);
  textAlign(CENTER);
  text(percA + '%', 100, 100); //ACHTUNG TEXT VARIABEL

  pop();


  textSize(25);
  textAlign(LEFT);
  noStroke();
  fill(147, 94, 207);
  text("KONZENTRATION", 100, 280);
  fill(120, 170, 244);
  text("ENTSPANNUNG", 427.5, 280);

  /********************************************************************************************
    DIAGRAMM
  ********************************************************************************************/

  //draw a multiple line chart
  push();
  translate(70, 260);
  //function multiLineChart(values, yMin, yMax, w, h, categories, colors) {
  multiLineChart([beta_values, alpha_values], 0, 1, 806, 300, categories2, colors2);
  pop();
  //Restcode von Diagramm zu unterst an Code


  //DIAGRAMM ACHSEN STATISCH
  stroke(255)
  strokeWeight(1);
  //schlusslinie vertikal
  line(875, 520, 875, 260);
  // Linie Phasenwechsel vertikal
  line(417.5, 520, 417.5, 260);
  /*
  //linie idealwert horizontal
  strokeWeight(0.4);
  line(90, 370, 955, 370)*/

  //ZEITSTRAHL MINUTEN UNTEN
  textFont(font);
  fill('white');
  textSize(14);
  //ticks
  line(90, 520, 90, 545)
  text('1‘', 200, 540);
  line(221, 520, 221, 545)
  text('2‘', 327, 540);
  line(352, 520, 352, 545)
  text('3‘', 463, 540);
  line(483, 520, 483, 545)
  text('4‘', 594, 540);
  line(614, 520, 614, 545)
  text('5‘', 725, 540);
  line(745, 520, 745, 545)
  text('6‘', 856, 540);
  line(876, 520, 876, 545)


  //Diagrammbeschriftung
  textFont(font);
  textSize(12);
  fill('white');
  text('gutes \nErgebnis', 885, 310);
  text('nicht \nausreichendes \nErgebnis', 885, 440);
  text('Phasenwechsel', 885, 520);
  text('Minuten', 885, 540);

  noLoop();
}




//DIAGRAMM-FUNKTION
function multiLineChart(values, yMin, yMax, w, h, categories, colors) {
  var border = 20;
  var legendHeight = 40;
  var innerWidth = w - border;
  var innerHeight = h - legendHeight;

  //draw the lines
  push();
  translate(border, 0)
  for (var i = 0; i < values.length; i++) {
    stroke(colors[i]);
    strokeWeight(3);
    noFill();
    drawLine(values[i], yMin, yMax, innerWidth, innerHeight);
  }
  pop();

  //draw the xAxis
  push();
  translate(border, innerHeight);
  stroke(200);
  strokeWeight(1);
  line(0, 0, innerWidth, 0);

  /*
    //ticks, Unterteilungen für Anzahl Minuten
    var nTicks = values[0].length;
    for (var i = 0; i < nTicks; i++) {
      var x = map(i, 0, nTicks - 1, 0, innerWidth);
      var y0 = -2;
      var y1 = 6;
      stroke(200);
      strokeWeight(1.5);
      line(x, y0, x, y1);
    }
  */
  pop();

  //draw the yAxis
  push();
  translate(border, 0);
  stroke(200);
  strokeWeight(1);
  line(0, 0, 0, innerHeight);

  var maxTick = map(yMax, yMin, yMax, innerHeight, 0);
  var minTick = map(yMin, yMin, yMax, innerHeight, 0);

  var ticks = [minTick, maxTick];
  var tickVals = [yMin, yMax];

  for (var i = 0; i < ticks.length; i++) {
    push();
    translate(-10, 0);
    var x0 = 4;
    var x1 = 7;
    var y = ticks[i]
    stroke(200);
    line(x0, y, x1, y);
    textAlign(RIGHT, CENTER);
    textSize(14);
    noStroke();
    fill(200);
    text(tickVals[i], 0, y);
    pop();
  }

  pop();

}

function drawLine(values, yMin, yMax, w, h) {
  beginShape();
  for (var i = 0; i < values.length; i++) {
    var x = map(i, 0, values.length - 1, 0, w);
    var y = map(values[i], yMin, yMax, h, 0);
    vertex(x, y);
  }
  endShape();
}












//RAUSWURF

/*
  //WECHSEL-PLANET - WEISS
  push();
  translate(100, 100);
  colorMode(RGB, 255, 255, 255, 1);
  fill(254, 254, 254, 0.7);
  noStroke();
  ellipse(100, 60, sizeWechsel, sizeWechsel); //ACHTUNG GRÖSSE VARIABEL

  textSize(30);
  fill(0);
  textAlign(CENTER);
  text("1:03", 100, 72); //ACHTUNG TEXT VARIABEL

  textSize(14);
  fill(255);
  text("Ø Zeit für Wechsel", 100, 160);
  pop();
*/



//ZEITBALKEN UNTEN VARIABEL

/*
  //VIOLETT
  fill(112, 50, 141);
  noStroke();
  rect(90, 510, sizeChangeB, 18);
  //BLAU
  fill(26, 69, 154);
  rect(417.5, 510, sizeChangeA, 18);*/
/*
  //Ergänzungsbalken
  //VIOLETT
  colorMode(RGB, 255, 255, 255, 1);
  noStroke();
  fill(112, 50, 141, 0.4);
  rect(90, 510, 327.5, 18);
  //BLAU
  fill(26, 69, 154, 0.4);
  rect(417.5, 510, 458.5, 18);
  
  textSize(14);
  textAlign(CENTER);
  textFont(font);
  fill('white');
  text("1:10 Min.", posChangeB, 518);
  text("2:10 Min.", posChangeA, 518);*/