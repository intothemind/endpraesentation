//states to indicate the application states. 
var STATE_CALIBRATION = 'STATE_CALIBRATION';
var STATE_REALTIME = 'STATE_REALTIME';
var STATE_REALTIME2 = 'STATE_REALTIME2';
var STATE_DASHBOARD = 'STATE_DASHBOARD';
var STATE_TITELSEITE = 'STATE_TITELSEITE';
var STATE_COUNTDOWN1 = 'STATE_COUNTDOWN1';
var STATE_KONZENTRATION = 'STATE_KONZENTRATION';
var STATE_ENTSPANNUNG = 'STATE_ENTSPANNUNG';
var STATE_COUNTDOWN2 = 'STATE_COUNTDOWN2';


//this variable serves to define if we are in real time mode or dashboard mode
var state = STATE_CALIBRATION;

//variable for the muse data object
var muse;

//to record alpha values over time
var alpha_values = [];
var beta_values = [];
var theta_values = [];

var alphaMean = 0;
var betaMean = 0;
var thetaMean = 0;

//keep track of the maximum alpha value 
var alphaMax = 0;
var betaMax = 0;
var thetaMax = 0;

//images for horsehoe
var calImg = [];
var imgIds = ['leftEar', 'leftFront', 'rightFront', 'rightEar'];
var hsBase = null;

//////////////////////////////////////////////////////////////////////////////////////////
//DOMINIQUE START variablen

//data for multiple line chart
var someValueArray = [
  [23, 59, 81, 85, 88, 76, 40, 50, 56, 40, 32, 30, 12],
  [17, 5, 20, 24, 29, 15, 76, 80, 72, 78, 77, 93, 85],
];
var categories2 = ['Beta | Konzentration', '(Alpha + Theta)/2 | Entspannung'];
var colors2 = ['#70328D', '#1A459A'];


var xarr = [30, 80, 120, 250, 370, 420, 560];

//Wechsel Variablen
var sizeChangeB = 100;
var sizeChangeA = 300;
var posChangeB = 140;
var posChangeA = 467.5;

//BILD UND SCHRIFT
var img;

//DOMINIQUE END

//////////////////////////////////////////////////////////////////////////////////////////
//BETTINA START variablen
var p = [];
var spring = 0.0001;

//number of particles
var n = 1;

//Allgemein
var imgEV1;
var imgEV2;
var imgZeit;
var imgMuse;

var font, fontTitel;

// Color für alle angezeigten Elemente
var colorValue = 255 // 0 -> Schwarz, 255 -> Weiss (Farbe für Punkte)

var startCenterRatio = 0.08; // Je kleiner dieser Wert -> Je kleiner die Definition von "Mitte"
var changingRate = 0.03; // Je kleiner dieser Wert -> Je mehr Punkte in der Mitte

var hirnaktivitaet = 1; // Zwischen 0 und 1 -> Wenn Wert kleiner als 0.5, Punkte werden gelöscht, wenn Wert grösser als 0.5, Punkte werden erstellt
var counter = 0; // Counter für das Hinzufügen von neuen Punkten
var counterLimit = 2; // Je kleiner dieser Wert, je schneller werden die Punkte zur Szene hinzugefügt
var pointAddInterval = null; // Intervall für das Hinzufügen von Punken
var pointAddInterval2 = null; // Intervall für das Hinzufügen von Punken
var dt = dynamicThreshold();


var startTime = Date.now(); // Uhrzeit, um welche die Präsentation gestartet wird
var currentTimeInSeconds = 0; // Abgelaufene Zeit seit dem Beginn der Präsentation.
//BETTINA END


//////////////////////////////////////////////////////////////////////////////////////////
//preload
//////////////////////////////////////////////////////////////////////////////////////////


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
      var im = loadImage('assets/' + filename);

      calImg[id][j] = im;
    }
  }

  hsBase = loadImage('assets/horseshoe_base.png');


  //DOMINIQUE START
  img = loadImage('img/BG_Dashboard.png');
  img1 = loadImage('img/Interface_DB.png');
  pokal = loadImage('img/pokal.png');

  font = loadFont("font/PrestigeEliteStd-Bd.otf");
  fontTitel = loadFont("font/aero_matics_stencil/Aero Matics Stencil Regular.ttf");
  //DOMINIQUE END

  //BETTINA START
  imgEV1 = loadImage("img/EV_Hintergrundbild1.png");
  imgEV2 = loadImage("img/EV_Hintergrundbild2.png");
  imgZeit = loadImage("img/symbol_zeit.png");
  imgMuse = loadImage("img/muse.png");
  imgDashboard = loadImage("img/Dashboard_Printscreen.png");
  //BETTINA END
}



function setup() {
  createCanvas(1024, 768);
  //console.log(img);

  //use this line to use dummy data (ideal for development)
  //muse = museData().dummyData();

  //use this line to make a real connection to muse
  muse = museData().connection(getHost());

  
  //muse = museData().connection('http://127.0.0.1:1373');

  //only alpha_relative + beta_relative is looked at in this example
  muse.listenTo('/muse/elements/alpha_relative');
  muse.listenTo('/muse/elements/beta_relative');
  muse.listenTo('/muse/elements/theta_relative');
  muse.listenTo('/muse/elements/horseshoe');

  //start muse data collection
  muse.start();

  //add a start button for the calibration state
  textFont(font)
  startButton = createButton('Start!');
  startButton.position(width / 2 - 50, height / 2 + 270);
  startButton.size(100, 30);
  startButton.mousePressed(startCountdown1);

  //BETTINA START
  frameRate(30);
  //BETTINA END
}

function draw() {

  //draw calibration, realtime visualisation or dashboard depending on the application state
  if (state == STATE_CALIBRATION) {
    drawCalibration();
  } else if (state == STATE_COUNTDOWN1) {
    drawCountdown1();
  } else if (state == STATE_KONZENTRATION) {
    drawKonzentration();
  } else if (state == STATE_REALTIME) {
    drawRealtimeVis();
  } else if (state == STATE_ENTSPANNUNG) {
    drawEntspannung();
  } else if (state == STATE_REALTIME2) {
    drawRealtime2Vis();
  } else if (state == STATE_COUNTDOWN2) {
    drawCountdown2();
  } else if (state == STATE_DASHBOARD) {
    drawDashboardVis();
  }
}


/*
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
  }*/



function processData() {
  alphaMean = mean(alpha_values);
  alphaMax = max(alpha_values);
  //console.log('alphaMean', alphaMean);
  betaMean = mean(beta_values);
  betaMax = max(beta_values);
  //console.log('betaMean', betaMean);
  thetaMean = mean(theta_values);
  thetaMax = max(theta_values);
  //console.log('thetaMean', thetaMean);
}


function startCountdown1() {

  //make button invisible
  startButton.hide();

  //set the state to STATE_COUNTDOWN1
  state = STATE_COUNTDOWN1;

  //call a function after x millisecods in order to change state from Countdown1 to Konzentration
  setTimeout(startKonzentration, 10000);
}

function startKonzentration() {

  //set the state to STATE_KONZENTRATION
  state = STATE_KONZENTRATION

  //call a function after x millisecods in order to change state from Konzentration to Realtime
  setTimeout(startRealtime, 3000);
}

function startRealtime() {

  //set the state to STATE_REALTIME
  state = STATE_REALTIME;

  //call a function after x millisecods in order to change state from realtime to entspannung
  setTimeout(startEntspannung, 180000/3);

}

function startEntspannung() {

  //set the state to STATE_ENTSPANNUNG
  state = STATE_ENTSPANNUNG;

  //call a function after x millisecods in order to change state from Entspannung to Realtime2
  setTimeout(startRealtime2, 3000);
}

function startRealtime2() {

  //set the state to STATE_REALTIME2
  state = STATE_REALTIME2;

  //call a function after x millisecods in order to change state from Realtime2 to Countdown2
  setTimeout(startCountdown2, 180000/3);
}


function startCountdown2() {

  //set the state to STATE_COUNTDOWN2
  state = STATE_COUNTDOWN2;

  //call a function after x millisecods in order to change state from realtime to countdown2
  setTimeout(startDashboard, 10000);

}

function startDashboard() {
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