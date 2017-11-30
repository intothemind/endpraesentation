//muse data will be available through this variable
var muse;

//dynamic threshold object
var dt = dynamicThreshold();

//state variables to manage the application state (mission1, mission3, dashboard)
var STATE_CALIBRATE = 0;
var STATE_MISSION1 = 1;
var STATE_MISSION3 = 2;
var STATE_DASHBOARD = 3;
var STATE_WELCOME = 4;
var STATE_DESC1 = 5;
var STATE_DESC3 = 6;
var STATE_MISSION3END = 7;
var state = STATE_WELCOME;

//=======variables for mission1=======
var rocketImg;
var bgImg;
var desc1Img;
var calibrateImg;
var desc1Img;


var myFont;
var myFontBold;

var starCounter = 0;


var circleRadius = [600, 500, 400, 300, 200, 100];



var starPositions = [{
  'a': 128,
  'r': 600
}, {
  'a': 125,
  'r': 600
}, {
  'a': 122,
  'r': 600
}, {
  'a': 119,
  'r': 600
}, {
  'a': 116,
  'r': 600
}, {
  'a': 113,
  'r': 600
}, {
  'a': 110,
  'r': 600
}, {
  'a': 107,
  'r': 600
}, {
  'a': 104,
  'r': 600
}, {
  'a': 101,
  'r': 600
}, {
  'a': 98,
  'r': 600
}, {
  'a': 95,
  'r': 600
}, {
  'a': 92,
  'r': 600
}, {
  'a': 89,
  'r': 600
}, {
  'a': 86,
  'r': 600
}, {
  'a': 83,
  'r': 600
}, {
  'a': 80,
  'r': 600
}, {
  'a': 77,
  'r': 600
}, {
  'a': 74,
  'r': 600
}, {
  'a': 71,
  'r': 600
}, {
  'a': 68,
  'r': 600
}, {
  'a': 65,
  'r': 600
}, {
  'a': 62,
  'r': 600
}, {
  'a': 59,
  'r': 600
}, {
  'a': 56,
  'r': 600
}, {
  'a': 53,
  'r': 600
}, {
  'a': 136,
  'r': 500
}, {
  'a': 130,
  'r': 500
}, {
  'a': 124,
  'r': 500
}, {
  'a': 118,
  'r': 500
}, {
  'a': 112,
  'r': 500
}, {
  'a': 106,
  'r': 500
}, {
  'a': 100,
  'r': 500
}, {
  'a': 94,
  'r': 500
}, {
  'a': 88,
  'r': 500
}, {
  'a': 82,
  'r': 500
}, {
  'a': 76,
  'r': 500
}, {
  'a': 70,
  'r': 500
}, {
  'a': 64,
  'r': 500
}, {
  'a': 58,
  'r': 500
}, {
  'a': 52,
  'r': 500
}, {
  'a': 46,
  'r': 500
}, {
  'a': 150,
  'r': 400
}, {
  'a': 142,
  'r': 400
}, {
  'a': 134,
  'r': 400
}, {
  'a': 126,
  'r': 400
}, {
  'a': 118,
  'r': 400
}, {
  'a': 110,
  'r': 400
}, {
  'a': 102,
  'r': 400
}, {
  'a': 94,
  'r': 400
}, {
  'a': 86,
  'r': 400
}, {
  'a': 78,
  'r': 400
}, {
  'a': 70,
  'r': 400
}, {
  'a': 64,
  'r': 400
}, {
  'a': 56,
  'r': 400
}, {
  'a': 48,
  'r': 400
}, {
  'a': 40,
  'r': 400
}, {
  'a': 32,
  'r': 400
}, {
  'a': 170,
  'r': 300
}, {
  'a': 154,
  'r': 300
}, {
  'a': 138,
  'r': 300
}, {
  'a': 122,
  'r': 300
}, {
  'a': 106,
  'r': 300
}, {
  'a': 90,
  'r': 300
}, {
  'a': 74,
  'r': 300
}, {
  'a': 58,
  'r': 300
}, {
  'a': 42,
  'r': 300
}, {
  'a': 26,
  'r': 300
}, {
  'a': 10,
  'r': 300
}, {
  'a': 170,
  'r': 200
}, {
  'a': 138,
  'r': 200
}, {
  'a': 106,
  'r': 200
}, {
  'a': 74,
  'r': 200
}, {
  'a': 42,
  'r': 200
}, {
  'a': 10,
  'r': 200
}, {
  'a': 170,
  'r': 200
}, {
  'a': 138,
  'r': 100
}, {
  'a': 106,
  'r': 100
}, {
  'a': 74,
  'r': 100
}, {
  'a': 42,
  'r': 100
}, {
  'a': 10,
  'r': 100
}];


var startTime = 0;



//========variables for mission3==========
var rocket = {
  x: 100,
  y: 4500,
  vx: 0,
  vy: -1
};


var finaleDistanz = 0;

//create an object for the earth
var earth = {
  x: 100,
  y: 4200,
  width: 90, //width
  rings: [100, 300, 500, 700] // hier kannst du die radien der ringe ändern
};

var universeWidth = 200;
var universeHeight = 5000;

var stars = [];
var starsNr = 100

var viewport;

var earthImg;


//Punkte
//hier die Punkte speichern für Mission1, damit diese Variable im Dashboard aufgerunfen werden kann
//var scoreMission1 = starsMission1;

var scoreMission2 = 0;

//hier die Punkte speichern für Mission3, damit diese Variable im Dashboard aufgerunfen werden kann
var scoreMission3 = 0;

var totalScore = 0;
var welcomeImg;

function preload() {
  rocketImg = loadImage('rocket.png');
  bgImg = loadImage('background.png');
  earthImg = loadImage('erde.png');
  welcomeImg = loadImage('Text_Start.jpg');
  desc1Img = loadImage('desc1.jpg');
  calibrateImg = loadImage('calibrate.jpg');
  desc3Img = loadImage('desc3.jpg');

  myFont = loadFont('Gotham/Gotham-Light.otf');
  myFontBold = loadFont('Gotham/Gotham-Medium.otf');

}



function setup() {
  createCanvas(768, 1024);
  //createCanvas(window.innerWidth,window.innerHeight);

  //======initialize variables for mission3=======
  initMission3();



  //=========initialize muse===================
  //use this line to use dummy data (ideal for development)
  //muse = museData().dummyData();

  //use this line to make a real connection to muse
  muse = museData().connection(getHost());

  //listen to the messages we are interested in 
  muse.listenTo('/muse/elements/alpha_relative');
  muse.listenTo('/muse/elements/beta_relative');
  muse.listenTo('/muse/elements/theta_relative');

  muse.listenTo('/muse/elements/horseshoe');

  //start muse data collection
  muse.start();


  //add a start button for the calibration state

  /* fiveButton = createButton('Zum Dashboard!');
   fiveButton.position(width / 2 - 50, height / 2 + 240);
   fiveButton.size(100, 30);
   fiveButton.mousePressed(startDashboard); */

  /* fourthButton = createButton('4!');
   fourthButton.position(width / 2 - 50, height / 2 + 240);
   fourthButton.size(100, 30);
   fourthButton.mousePressed(startMission3); */

  thirdButton = createButton('Start');
  thirdButton.position(width / 2 - 180, height / 2 + 240);
  thirdButton.size(350, 50);
  thirdButton.mousePressed(startRealtime);

  secondButton = createButton('Weiter');
  secondButton.position(width / 2 - 180, height / 2 + 240);
  secondButton.size(350, 50);
  secondButton.mousePressed(startDesc1);

  firstButton = createButton('Weiter');
  firstButton.position(width / 2 - 180, height / 2 + 240);
  firstButton.size(350, 50);
  firstButton.mousePressed(startCalibrate);

  /* startButton = createButton('Start!');
  startButton.position(width / 2 - 50, height / 2 + 240);
  startButton.size(100, 30);
  startButton.mousePressed(startRealtime); */

  textFont(myFont);
  //textFont(myFontBold);
  frameRate(30);

}

function draw() {

  if (state == STATE_CALIBRATE) {
    // console.log('state == STATE_CALIBRATE');
    drawCalibrate();
  } else if (state == STATE_MISSION1) {
    //  console.log('state == STATE_MISSION1');
    drawMission1();
  } else if (state == STATE_MISSION3) {
    //console.log('state == STATE_MISSION3');
    drawMission3();
  } else if (state == STATE_DASHBOARD) {
    //  console.log('state == STATE_DASHBOARD');
    drawDashboard();
  } else if (state == STATE_WELCOME) {
    //  console.log('state == STATE_WELCOME');
    drawWelcome();
  } else if (state == STATE_DESC1) {
    //  console.log('state == STATE_DESC1');
    drawDesc1();
  } else if (state == STATE_DESC3) {
    // console.log('state == STATE_DESC3');
    drawDesc3();
  } else if (state == STATE_MISSION3END) {
    //    console.log('state == STATE_MISSION3END');
    drawDescEnd();
  } else {

    console.log('error');
    background('red');
  }



}

function drawWelcome() {
  background(welcomeImg);
  thirdButton.hide();
  secondButton.hide();
}

function drawDesc1() {
  background(desc1Img);

}

function drawDesc3() {
  background(welcomeImg);
}

function drawDescEnd() {
  background(welcomeImg);
}

function startCalibrate() {
  console.log('startCalibrate');
  //make button invisible
  firstButton.hide();
  // secondButton.show();
  setTimeout(showSecondButton, 1000);

  //set the state to STATE_REALTIME
  state = STATE_CALIBRATE;

  //call a function after x millisecods in order to change state from realtime to dashboard
  //setTimeout(startMission3,10000);
}

function showSecondButton() {
  console.log('showSecondButton');
  secondButton.show();
}

function showThirdButton() {
  console.log('showThirdButton');
  thirdButton.show();
}

function startDesc1() {

  console.log('startDesc1');
  //make button invisible
  secondButton.hide();
  setTimeout(showThirdButton, 1000);

  //thirdButton.show();

  //set the state to STATE_REALTIME
  state = STATE_DESC1;

  //call a function after x millisecods in order to change state from realtime to dashboard
  //setTimeout(startMission3,10000);
}

function startRealtime() {
  console.log('startRealtime');
  //make button invisible
  thirdButton.hide();
  // fourthButton.hide();
  //  fiveButton.hide();

  //set the state to STATE_REALTIME
  state = STATE_MISSION1;

  //call a function after x millisecods in order to change state from realtime to dashboard
  setTimeout(startMission3, 180000/3);
  //setTimeout(startMission3,10000);

}
/* function startDesc3(){
   //make button invisible
  //secondButton.hide();
  fourthButton.show();

  //set the state to STATE_REALTIME
  state = STATE_DESC3;

  //call a function after x millisecods in order to change state from realtime to dashboard
  //setTimeout(startMission3,10000);
} */

function startMission3() {

  //make button invisible
  //fourthButton.hide();

  //set the state to STATE_REALTIME
  state = STATE_MISSION3;

  //call a function after x millisecods in order to change state from realtime to dashboard
  setTimeout(startDashboard, 180000/3);

}
/*

function startDescEnd(){
   //make button invisible
  fourthButton.hide();
  fiveButton.show();
  

  //set the state to STATE_REALTIME
  state = STATE_DESC1;

  //call a function after x millisecods in order to change state from realtime to dashboard
  //setTimeout(startMission3,10000);
}
*/

function startDashboard() {

  //make button invisible
  //fiveButton.hide();

  //set the state to STATE_REALTIME
  state = STATE_DASHBOARD;

  //call a function after x millisecods in order to change state from realtime to dashboard
  // setTimeout(startDashboard,10000);

}

function keyTyped() {
  if (key == '0') {
    state = STATE_CALIBRATE;
  } else if (key == '1') {
    state = STATE_MISSION1;
    startTime = millis();
  } else if (key == '2') {
    state = STATE_MISSION3;
  } else if (key == '3') {
    state = STATE_DASHBOARD;
  } else if (key == '4') {
    state = STATE_WELCOME;
  } else if (key == '5') {
    state = STATE_DESC1;
  } else if (key == '6') {
    state = STATE_DESC3;
  }
}