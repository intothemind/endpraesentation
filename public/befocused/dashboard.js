/**
 * Draws the dashboard
 */
var decisionPositiv = 'BESTANDEN!';
var decisionNegativ = 'DURCHGEFALLEN!';
var schwelle = 0.8;


function drawDashboardVis() {
  background('white');
  var fillPercentage = map(smrMean, 0, 0.13, 0, 1);
  var isBeating = false;
  //var yMax = max(smrValues); 
  //var yMin = min(smrValues);

  heart(fillPercentage, isBeating);
  // console.log('smrMean:'+ smrMean);
  var chartWidth = 667;
  var chartHeight = 100;

  push(); //neues Koordinatensystem
  translate(width / 2, height / 2 + 350); //positionierung des Koordinatensystems
  translate(-chartWidth / 2, 0);
  fill(68, 67, 67);
  //textAlign(LEFT);
  textSize(16);
  textFont(myFont);
  text('SENSOMOTORISCHER BEREICH', 20, -20);
  fill(234, 34, 7);
  noStroke();
  var balkenHeight = map(schwelle, 0, 1, chartHeight, 0);
  rectMode(CENTER);
  rect(chartWidth / 2 + 10, balkenHeight, chartWidth - 20, 20); //  chartHeight/2 - 20
  noFill();

  lineChart2(smrValues, 0, 0.15, chartWidth, chartHeight, [], []);
  //lineChart(smrValues, chartWidth, chartHeight);
  pop();

  var feedbackMsg;
  var feedbackColor;
  if (fillPercentage > schwelle) {
    feedbackMsg = decisionPositiv;
    feedbackColor = 'green';
  } else {
    feedbackMsg = decisionNegativ;
    feedbackColor = 'red';
  }

  //Be Focused
  push();
  translate(50, 100);
  fill(68, 67, 67);
  textSize(50);
  textFont(myFont);
  text('BE FOCUSED', 0, 0);
  textSize(20);
  textAlign(CENTER);
  text(feedbackMsg, 150, 35);
  noFill();
  stroke(feedbackColor);
  rectMode(CENTER);
  rect(150, 27, 290, 30); //status
  pop();

  //Fokus
  push();
  translate(55, window.innerHeight / 2 - 250);
  fill(68, 67, 67);
  textFont(myFont);
  textSize(20);
  text('FOKUS', 0, 0);
  //text(smrMean, 0, 50);
  //text('yMin:' + yMin, 0, 150);
  //text('yMax:' + yMax, 0, 200);
  pop();

  //Text Prozent
  push();
  translate(width / 2, height / 2);
  translate(0, -Herz.height / 2);
  var fillHeight = map(fillPercentage, 0, 1, 0, Herz.height);
  textSize(30);
  textFont(myFont);
  fill(234, 34, 7);
  //var textPercent = map(fillPercentage, 0, Herz.height, 0, 100);
  text(nfc(fillPercentage * 100, 1, 1) + '%', width / 2 - 150, fillHeight - 30);
  pop();

  noLoop();
}


function lineChart2(values, yMin, yMax, w, h, xTickValues, yTickValues) {

  var border = 20;
  var innerWidth = w - border;
  var innerHeight = h - border;

  //draw the line 
  push();
  translate(border, 0);
  noFill();
  stroke(68, 67, 67);
  strokeWeight(1.5);
  beginShape();
  for (var i = 0; i < values.length; i++) {
    var x = map(i, 0, values.length - 1, 0, innerWidth);
    var y = map(values[i], yMin, yMax, innerHeight, 0);
    vertex(x, y);
  }
  endShape();
  pop();

  //draw the xAxis
  push();
  translate(border, innerHeight);
  strokeWeight(1);
  stroke(68, 67, 67);
  line(0, 0, innerWidth, 0);

  //ticks
  /*
  var nTicks = values.length;
  for (var i = 0; i < nTicks; i++) {
    var x = map(i, 0, nTicks - 1, 0, innerWidth);
    var y0 = 2;
    var y1 = 4;
    stroke(200);
    line(x, y0, x, y1);
  }*/

  pop();

  //draw the yAxis
  push();
  translate(border, 0);
  stroke(68, 67, 67);
  line(0, 0, 0, innerHeight);

  var minTick = map(yMin, yMin, yMax, innerHeight, 0);
  var maxTick = map(yMax, yMin, yMax, innerHeight, 0);

  var yTicks = [minTick, maxTick];
  var yTickVals = [yMin, yMax];

  for (var i = 0; i < yTicks.length; i++) {

    push();
    translate(-10, 0);
    var x0 = 3;
    var x1 = 7;
    //var y = yTicks[i];
    //line(x0, y, x1, y);
    textAlign(RIGHT, CENTER);
    noStroke();
    fill(100);
    //text(yTickVals[i], 0, y);
    pop();
  }
  pop();

}