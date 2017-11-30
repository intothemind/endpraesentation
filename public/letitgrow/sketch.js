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

//to record alpha values over time
var alpha_values = [];
var alpha_index = [];
var alphaMean = 0;

//keep track of the maximum alpha value 
var alphaMax = 0;

//global variable
var SimStarted = 0;

//images for horsehoe
var calImg = [];
var imgIds = ['leftEar', 'leftFront', 'rightFront', 'rightEar'];
var hsBase = null;

var anzahlkarotten = 0;
var karottenarr = [];
var harvestCounter = 0;

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
  
  schriftzug = loadImage("assets/schriftzug.png");
  karotte_1 = loadImage("assets/eins.png");
  karotte_2 = loadImage("assets/zwei.png");
  karotte_3 = loadImage("assets/drei.png");
  karotte_4 = loadImage("assets/vier.png");
  karotte_5 = loadImage("assets/fuenf.png");
  karotte_6 = loadImage("assets/sechs.png");
  karotte_7 = loadImage("assets/sieben.png");
  karotte_8 = loadImage("assets/acht.png");
  karotte_9 = loadImage("assets/neun.png");
  karotte_10 = loadImage("assets/zehn.png");
  karotte_1_neu = loadImage("assets/eins.png");
  karotte_2_neu = loadImage("assets/zwei.png");
  karotte_3_neu = loadImage("assets/drei.png");
  karotte_4_neu = loadImage("assets/vier.png");
  karotte_5_neu = loadImage("assets/fuenf.png");
  karotte_6_neu = loadImage("assets/sechs.png");
  karotte_7_neu = loadImage("assets/sieben.png");
  karotte_8_neu = loadImage("assets/acht.png");
  karotte_9_neu = loadImage("assets/neun.png");
  karotte_10_neu = loadImage("assets/zehn.png");
  gross_k = loadImage("assets/acht.png");
  schubkarre_hinten = loadImage("assets/schubkarre_hinten.png");
  schubkarre_vorne = loadImage("assets/schubkarre_vorne.png");
  schubkarre_echtzeit= loadImage("assets/schubkarre_echtzeit.png");
  grossekarottekiste = loadImage("assets/gross.png");
  ueberschrift = loadImage("assets/ueberschrift.png");
  korb_eins = loadImage("assets/korb_eins.png");
  korb_zwei = loadImage("assets/korb_zwei.png");
  korb_drei = loadImage("assets/korb_drei.png");
  korb_vier = loadImage("assets/korb_vier.png");
  korb_fuenf = loadImage("assets/korb_fuenf.png");
  korb_sechs = loadImage("assets/korb_sechs.png");
  korb_sieben = loadImage("assets/korb_sieben.png");
  korb_acht = loadImage("assets/korb_acht.png");
  korb_neun = loadImage("assets/korb_neun.png");
  korb_zehn = loadImage("assets/korb_zehn.png");
  korb_elf = loadImage("assets/korb_elf.png");
  korb_zwoelf = loadImage("assets/korb_zwoelf.png");
  korb_dreizehn = loadImage("assets/korb_dreizehn.png");
  korb_vierzehn = loadImage("assets/korb_vierzehn.png");
  korb_fuenfzehn = loadImage("assets/korb_fuenfzehn.png");
  korb_null = loadImage("assets/korb_null.png");
  karotte_gepflueckt = loadImage("assets/karotte_gepflueckt.png");
  legende = loadImage("assets/legende.png");
  erfolg = loadImage("assets/erfolg.png");
  titel_calib = loadImage("assets/schriftzug.png");
  score_display0 = loadImage("assets/score_display0.png");
  score_display1 = loadImage("assets/score_display1.png");
  score_display2 = loadImage("assets/score_display2.png");
  score_display3 = loadImage("assets/score_display3.png");
  score_display4 = loadImage("assets/score_display4.png");
  score_display5 = loadImage("assets/score_display5.png");
  score_display6 = loadImage("assets/score_display6.png");
  score_display7 = loadImage("assets/score_display7.png");
  score_display8 = loadImage("assets/score_display8.png");
  score_display9 = loadImage("assets/score_display9.png");
  score_display10 = loadImage("assets/score_display10.png");
  score_display11 = loadImage("assets/score_display11.png");
  score_display12 = loadImage("assets/score_display12.png");
  score_display13 = loadImage("assets/score_display13.png");
  score_display14 = loadImage("assets/score_display14.png");
  score_display15 = loadImage("assets/score_display15.png");
}

function setup() {
  createCanvas(1024, 768);
  
  karottenarr = [karotte_1, karotte_2, karotte_3, karotte_4, karotte_5, karotte_6, karotte_7, karotte_8, karotte_9, karotte_10];
  score_display = [score_display0, score_display1, score_display2, score_display3, score_display4, score_display5, score_display6, score_display7, score_display8, score_display9, score_display10, score_display11, score_display12, score_display13, score_display14, score_display15];

  //use this line to use dummy data (ideal for development)
 // muse = museData().dummyData();

  //use this line to make a real connection to muse
   muse = museData().connection(getHost());

  //only alpha_relative is looked at in this example
  muse.listenTo('/muse/elements/alpha_relative');
  muse.listenTo('/muse/elements/horseshoe');

  //start muse data collection
  muse.start();

  //add a start button for the calibration state
  startButton = createButton("Los!");
  startButton.position(width / 2 - 50, height / 2 + 240);
  
  startButton.class("button");
  startButton.mousePressed(startRealtime);
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

/*function windowResized() {
	console.log('windowResized')
	resizeCanvas(window.innerWidth, window.innerHeight);
	console.log('width', width, 'height', height);
}*/
function keyTyped() {
  if (key == 'd') {
    //process the data, e.g calculate average alpha value, before displaying dashboard
    processData();
    state = STATE_DASHBOARD;
  } else if (key == 'r') {
    //reset alpha_values array
    alpha_values = [];
    state = STATE_CALIBRATION;
  }
}

function processData() {
  alphaMean = mean(alpha_values);
  alphaMax = max(alpha_values);
  console.log('alphaMean', alphaMean);
}

function startRealtime(){
 
  //make button invisible
  startButton.hide();
  //SimStarted++;

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