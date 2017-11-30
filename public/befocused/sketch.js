/**
 * REAL TIME - DASHBOARD
 * 
 * This basic example shows how to coordinate relatime visualisation with dashboard.
 * While the real time visualisation is running, data has to be stored which then is processed and
 * used in the dashboard. 
 * 
 */

//states to indicate the application states. 
//there are two states. one for the real time visualisation and one for the dashboard
var STATE_CALIBRATION = 'STATE_CALIBRATION';
var STATE_REALTIME = 'STATE_REALTIME';
var STATE_DASHBOARD = 'STATE_DASHBOARD';

//this variable serves to define if we are in real time mode or dashboard mode
var state = STATE_CALIBRATION;

//variable for the muse data object
var muse;

var a = 0.0;
var bg;
var img;
var smrValues = [];
//Durchschnitt für Line Chart
var smrMean = 0;
var pg;
var Herz;

//Schrift
var myFont;
//dynamic threshold object
var dt = dynamicThreshold();

//images for horsehoe
var calImg = [];
var imgIds = ['leftEar', 'leftFront', 'rightFront', 'rightEar'];
var hsBase = null;

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
  //wenn du die bilder in preload lädst, bist du sicher das die bilder geladen sind, sobald der sketch läuft. 
  //preload wird einmal, ganz am anfang, vor setup und draw aufgerufen
  //bg = loadImage("heart_chest.jpg");

  //ich habe aus hear_full ein kleineres Bild gemacht, so dass das Herz das ganze Bild ausfüllt. 
  //so spart man ressourcen beim verrechnen der pixel.
  //he = loadImage("Heart_empty.png");
  Herz = loadImage("Heart_small.png");
  myFont = loadFont("assets/OratorStd.otf");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  //createCanvas(768, 1024);
  
  pg = createGraphics(Herz.width, Herz.height);
  //use this line to use dummy data (ideal for development)
 // muse = museData().dummyData();

  //use this line to make a real connection to muse
  muse = museData().connection(getHost()); //127.0.0.1:8081 = Localhost ansonsten IP von Mac angeben http://10.0.1.2:8081

  //only alpha_relative is looked at in this example
  //muse.listenTo('/muse/elements/alpha_relative');
  muse.listenTo('/muse/elements/horseshoe');
  muse.listenTo('/muse/elements/beta_relative');
  muse.listenTo('/muse/elements/raw_fft0');
  muse.listenTo('/muse/elements/raw_fft3');

  //start muse data collection
  muse.start();
  
  frameRate(30);

  //add a start button for the calibration state
  
  
  
  push();
  translate(window.innerWidth/2, window.innerHeight/2);
  startButton = createButton('Start');
  startButton.position(window.innerWidth/2-60,window.innerHeight/2 + 400);
  startButton.size(136, 26);
  startButton.mousePressed(startRealtime);
  pop();
  
  /* 
  beendenButton = createButton('Beenden');
  beendenButton.position(50, 130);
  beendenButton.size(136, 26);
  beendenButton.mousePressed(drawCalibration);
  
  startNochmal = createButton('Nochmal');
  startNochmal.position(254, 131);
  startNochmal.size(136, 26);
  startNochmal.mousePressed(drawRealtimeVis);
  */
  
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
  smrMean = mean(smrValues);
}

function startRealtime(){
 
  //make button invisible
  startButton.hide();
  //startButton();
  //set the state to STATE_REALTIME
  state = STATE_REALTIME;

  //call a function after x millisecods in order to change state from realtime to dashboard
  setTimeout(startDashboard,180000/3);

}

function startDashboard(){
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

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}