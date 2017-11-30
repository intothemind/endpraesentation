/**
 * REAL TIME - DASHBOARD
 * 
 * This basic example shows how to coordinate relatime visualisation with dashboard.
 * While the real time visualisation is running, data has to be stored which then is processed and
 * used in the dashboard. 
 * 
 */

//Bildvariablen
var bg_cali;


//states to indicate the application states. 
//there are two states. one for the real time visualisation and one for the dashboard
var STATE_CALIBRATION = 'STATE_CALIBRATION';
var STATE_REALTIME = 'STATE_REALTIME';
var STATE_DASHBOARD = 'STATE_DASHBOARD';

//this variable serves to define if we are in real time mode or dashboard mode
var state = STATE_CALIBRATION;

//variable for the muse data object
var muse;

//to record alpha values over time
var alpha_values = [];
var alphaMean = 0;

//keep track of the maximum alpha value 
var alphaMax = 0;

//images for horsehoe
var calImg = [];
var imgIds = ['leftEar', 'leftFront', 'rightFront', 'rightEar'];
var hsBase = null;

//PRERACE*********************************

var bg;
//text size
var H1 = 32;
var H2 = 16;
var H3 = 11;
var TEXTFILL = '#767676';

var timeresult = 0;



  //bilder, fonts und zeit
  var cabin;
  var station;
  var hintergrund;
  var s;
  var millisecond;
  var m;
  var myfont;

  //dynamic threshold object
  var dt = dynamicThreshold();

  //A basic gondola has a position and a velocity
  var gondola = {
  //position
  pos: null,
  //velocity
  vel: null
};

//hier werden die masten gespeichert
var masts = [];
var firstMast;
var secondMast;
var thirdMast;
var fourthMast;
var fifthMast;
var sixthMast;

//hier werden die rohen csv daten gespeichert.
var csv;

//PRERACE_END*********************************

function preload() {

  var cols = ['Green', 'Yellow', 'Red'];
  for (var i = 0; i < imgIds.length; i++) {
    var id = imgIds[i];
    if (!calImg[id]) {
      calImg[id] = [];
    }
    for (var j = 0; j < cols.length; j++) {
      var c = cols[j];
      var filename = id + c + '.png';
      var img = loadImage('assets/' + filename);

      calImg[id][j] = img;
    }
  }

  hsBase = loadImage('assets/horseshoe_base.png');
  bg_cali = loadImage('assets/bg_cali.png');
  ailerons = loadFont('assets/ailerons.otf');
  cabin = loadImage('assets/cabin.png');
  station = loadImage('assets/ski_station.png');
  hintergrund = loadImage('assets/background_pre.png')
  myfont = loadFont('assets/ailerons.otf');

//PRERACE*********************************

  //laden der masten
  csv = loadTable("assets/liftmasten.csv", "csv", "header");

//PRERACE_END*********************************

//dashboard
    bg = loadImage('assets/background.png');
  myfont = loadFont('assets/Ailerons-Typeface.otf');
  //dashboard-end

}

function setup() {
  createCanvas(1024, 768);

  //use this line to use dummy data (ideal for development)
 //muse = museData().dummyData();

  //use this line to make a real connection to muse
  muse = museData().connection(getHost());

  //only alpha_relative is looked at in this example
  muse.listenTo('/muse/elements/alpha_relative');
  muse.listenTo('/muse/elements/horseshoe');

  //start muse data collection
  muse.start();

  //add a start button for the calibration state
  startButton = createButton('Start!');
  startButton.position(width / 2 - 50, height / 2 + 140);
  startButton.size(100, 30);
  startButton.mousePressed(startPrerace);

  //prerace************************



  //x,y daten der liftmasten in das Array 'masts' speichern
  for (var i = 0; i < csv.getRowCount(); i++) {

    //read x,y coordinates from csv
    var x = +csv.getString(i, 'x');
    var y = +csv.getString(i, 'y');

    //create a vector from x,y
    var v = createVector(x, y);

    //add vector to vertices
    masts.push(v);


    //console.log('v', x, y);
  }

  firstMast = masts[0];
  secondMast = masts[1];
  thirdMast = masts[2];
  fourthMast = masts[3];
  fifthMast = masts[4];
  sixthMast = masts[5];

  gondola.pos = createVector(firstMast.x, firstMast.y);
  //set the velocity of the gondola
  gondola.vel = createVector((secondMast.x - firstMast.x) / 100, (secondMast.y - firstMast.y) / 100);
  gondola.vel.setMag(1);


  frameRate(30);

}

function draw() {

  //draw calibration, realtime visualisation or dashboard depending on the application state
  if (state == STATE_CALIBRATION) {
    drawCalibration();
  } else if (state == STATE_REALTIME) {
    drawRealtimeVis();
  } else if (state == STATE_DASHBOARD) {
    drawDashboardVis();
  }
}

function keyTyped() {
  if (key == 'd') {
    //process the data, e.g calculate average alpha value, before displaying dashboard
    processData();
    state = STATE_DASHBOARD;
  } else if (key == 'r') {
    //reset alpha_values array
    alpha_values = [];
    state = STATE_REALTIME;
  }
}

function processData() {
  alphaMean = mean(alpha_values);
  alphaMax = max(alpha_values);
  console.log('alphaMean', alphaMean);
}

function startPrerace(){
 
  //make button invisible
  startButton.hide();

  startTime = millis();

  //set the state to STATE_REALTIME
  state = STATE_REALTIME;



}

function startDashboard(){
   console.log('startDashboard');
  //process the data, e.g calculate average alpha value, before displaying dashboard
  processData();
  state = STATE_DASHBOARD;

}

/**
 * Calculates the mean value of an array
 */
function mean(arr) {
  var sum = 0;

  arr.forEach(function(d) {
    sum += d;
  });

  return sum / arr.length;

}