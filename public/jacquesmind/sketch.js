/***  Muse-Anbindung auf Zeilen 93/94  ***/

// Status-Definitionen 
var state_calibration = 'STATE_CALIBRATION';
var state_realtime = 'STATE_REALTIME';
var state_dashboard = 'STATE_DASHBOARD';

// aktueller Applications-Status
var state = state_calibration;

// Muse-Objekt
var muse;

// Variablen zur Daten-Speicherung
var alpha_values = [];
var alpha_mean;
var beta_values = [];
var beta_mean;
var theta_values = [];
var theta_mean;
var tree_states = [];

var alphaThetaThreshold_values = [];
var fog_values = [];

// Variablen für Schwellenwerte
var dt = dynamicThreshold();

// Variablen für Bilder
var bgRed;
var bgBlue;
var bgGrey;
var ranking;
var ground;
var bgRedGround;
var bgBlueGround;
var bgGreyGround;

// Variablen für Fonts
var font_josefin;
var font_coneria;
var font_halfback;

// Horseshoe
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
  font_sans = loadFont('./fonts/SourceSansPro-Light.otf');
  font_coneria = loadFont('./fonts/Demo_ConeriaScript.ttf');
  font_halfback = loadFont('./fonts/Halfback.otf');
}

// Vorbereitungen für L-System (Baum)
var axiom = "F";
var tree = axiom;
var iterations = 7;
var drawIterations = 0;

var rules = [];

rules[0] = {
  a: "F",
  b: "F[-F][+F]"
}

var angle;
var len;
var strokeW;

// p5 Grundfunktionen //

function setup() {
  
 // frameRate(30); 
  // createCanvas(1024,768);
  createCanvas(window.innerWidth,window.innerHeight);

  // Anbindung an Muse
 // muse = museData().dummyData();
   muse = museData().connection(getHost());
  
  muse.listenTo('/muse/elements/alpha_relative');
  muse.listenTo('/muse/elements/theta_relative');
  muse.listenTo('/muse/elements/beta_relative');
  muse.listenTo('/muse/elements/horseshoe');
  // Starten der Muse-Connection
  muse.start();
  
  // Laden der Bilder
  bgRed = loadImage("images/bg_alpha.jpg");
  bgBlue = loadImage("images/bg_theta.jpg");
  bgGrey = loadImage("images/bg_beta.jpg");
  bgRedGround = loadImage("images/bg_alpha.png");
  bgBlueGround = loadImage("images/bg_theta.png");
  bgGreyGround = loadImage("images/bg_beta.png");
  ranking = loadImage("images/ranking.png");
  ground = loadImage("images/ground.png");

  // Button für den Calibration-Status
  startButton = createButton('Start!');
  startButton.position(width/2 - 30, (height/6)*5.3);
  startButton.size(60, 30);
  startButton.mousePressed(startRealtime);
  
  // Button für den Realtime-Status
  endButton = createButton('>>');
  endButton.position(width-30, 0);
  endButton.size(30, 25);
  endButton.mousePressed(startDashboard);
  endButton.hide();
  
  angle = radians(5);
  
  // Erstellen eines Baum-Strings
  createTree();

  frameRate(30);
}

function draw() {
  // Aufrufen der Draw-Funktion für Calibration, Realtime Visualisation oder Dashboard
  // abhängig vom aktuellen Applications-Status
  if (state == state_calibration) {
    drawCalibration();
  } else if (state == state_realtime) {
    drawRealtime();
  } else if (state == state_dashboard) {
    drawDashboard();
  }
}


// Diverse Funktionen //

function createTree () {
  for (var i=0; i<iterations; i++) {
    var extendedTree = "";
    for (var j=0; j<tree.length; j++) {
      var current = tree.charAt(j);
      var found = false;
      for (var k=0; k<rules.length; k++) {
        if (current == rules[k].a) {
          found = true;
          extendedTree += rules[k].b;
          break;
        }
      }
      if (!found) {
        extendedTree += current;
      }
    }
    tree = extendedTree;
  }
  
  var stretchedTree = "";
  var rand;
  for (var l=0; l<tree.length; l++) {
    var current2 = tree.charAt(l);
    if (current2 == "F") {
      rand = random(25,35);
      for (var o=0; o<rand; o++) {
        stretchedTree += "F";
      }
    } else if (current2 == "+") {
      rand = random(0,9);
      for (var m=0; m<rand; m++) {
        stretchedTree += "+";
      }
    } else if (current2 == "-") {
      rand = random(1,9);
      for (var n=0; n<rand; n++) {
        stretchedTree += "-";
      }
    } else {
      stretchedTree += current2;
    }
  }
  tree = stretchedTree;
}


function windowResized() {
	console.log('windowResized')
	resizeCanvas(window.innerWidth, window.innerHeight);
	console.log('width', width, 'height', height);
}


function keyTyped() {
  if (key == 'd') {
    // Verstecken der Buttons
    startButton.hide();
    endButton.hide();
    // Deckkraft wiederherstellen
    tint(255, 255);
    startDashboard();
  } else if (key == 'r') {
    startRealtime();
  }
}

function startRealtime() {
  // startButton verstecken
  startButton.hide();
  // endButton anzeigen
  endButton.show();
  // Aufrufen der nachfolgenden Dashboard-Funktion nach einer bestimmten Zeit (3 Minuten)
  setTimeout(startDashboard,180000/3);      // 3 Minuten
  // Aktualisieren des Status
  state = state_realtime;
}

function processData() {
  // Vorbereiten der Daten fürs Dashboard
  alphaMean = mean(alpha_values);
  betaMean = mean(beta_values);
  thetaMean = mean(theta_values);
}

function startDashboard() {
  // Deckkraft wiederherstellen
  tint(255, 255);
  // endButton verstecken
  endButton.hide();
  // Vorbereiten der Daten fürs Dashboard
  processData();
  // Akualisieren des Status
  state = state_dashboard;
}

// Berechnen der Durchschnittswerte
function mean(arr) {
  var sum = 0;
  arr.forEach(function(d) {
    sum += d;
  });
  return sum / arr.length;
}