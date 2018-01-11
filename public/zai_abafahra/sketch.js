  var dashboard = 'dashboard';
  var echtzeit = 'echtzeit';
  var einleitung = 'einleitung';

  var state = 'einleitung';

  //VERBINDUNG ZU MUSEGERÄT AUFBAUEN
  var muse = musedata.connect(getHost());
  //var muse = musedata.fake();
  var tresh = dynamicThreshold(200, 0.95);

  //STARTBILDSCHIRM
  var startbildschirm;

  //SKIPISTE
  //var n = 130;
  var n = 150;
  var endpunkte = [];
  var vel_fluchtpunkt;
  var fluchtpunkt;
  var skipiste;
  var acc;
  var friction = 0.97;
  var force = 0.02;
  /*var slider;
  var wertSlider;*/

  //SCHNEE
  var snow;

  //SKI
  var linkerSki9;
  var rechterSki9;
  var rotationLinks = 10;
  var rotationRechts = -10;
  var winkelLinkerSki = 0;
  var winkelRechterSki = 0;

  var dir_ski = 0;
  var speed_ski = 0.05;
  var dir_ski_r = 0;
  var speed_ski_r = 0.05;

  //SZENERIE
  var mountains;
  var y_mountains;
  var vel_mountains = 5;
  var dir_mountains;
  var y_sky = 0;
  var dir_sky = 0;
  var vel_sky = 10;
  var sky7;
  var stop;

  //BRILLE
  var goggles;

  //DASHBOARD
  var alphaWerte = [];
  var SummeAlphaWerte;
  var fitnessGrenze = 0;
  var Titel_Feedback;
  var SehrEntspannt_Feedback;
  var MittelEntspannt_Feedback;
  var Unentspannt_Feedback;
  var barometer;
  var barometer_bg;
  var barometer_text;


  function preload() {
    startbildschirm = loadImage('img/startbildschirm3.jpg');

    linkerSki9 = loadImage('img/ski_zai_v11.png');
    rechterSki9 = loadImage('img/ski_zai_v11.png');
    mountains = loadImage('img/mountain_bg.png');
    sky7 = loadImage('img/sky_v7.png');
    goggles = loadImage('img/goggles.png');
    stop = loadImage('img/stop.png');

    Titel_Feedback = loadImage('img/abafahra_titel.png');
    SehrEntspannt_Feedback = loadImage('img/SehrEntspannt2.png');
    MittelEntspannt_Feedback = loadImage('img/MittelEntspannt2.png');
    Unentspannt_Feedback = loadImage('img/Unentspannt2.png');
    barometer = loadImage('img/barometer.png');
    barometer_bg = loadImage('img/barometer_weiss.png');
    barometer_text = loadImage('img/barometer_text.png');
  }


  function setup() {
    //BASICS
    createCanvas(1024, 768);
    frameRate(30);
    imageMode(CENTER);
    angleMode(DEGREES);

    //SKY EINBETTEN
    y_sky = 384;
    dir_sky = 0;

    //BERGKETTE
    y_mountains = 550;
    dir_mountains = 0;

    //ENDPUNKTE SKIPISTE GENERIEREN
    for (var i = 0; i < n; i++) {
      //var x = map(i,0,n,-1400,width+1400);
      var x = map(i, 0, n, -6300, width + 6300);
      var y = height;
      var p = createVector(x, y);
      endpunkte.push(p);
    }

    //VEKTOREN KREIEREN
    vel_fluchtpunkt = createVector(0, 0);
    fluchtpunkt = createVector(width / 2, height / 2);
    vel_mountains = 0;
    mountains_hoehe = 0;
    acc = createVector(0, 0);

    //SCHNEE
    snow = snowMachine(200);
    //center of the point force, um die Bewegunsrichtung zu setzen
    snow.setCenter(width / 2, height / 2);

    //set the flake min size and max size
    snow.setFlakeSize(1.5, 10);

    //SKI
    scale_ski = 0.5;

    //SLIDER
    /*slider = createSlider (0,0.7,0.1,0);
    slider.position(30,60);
    slider.style('width','200px');*/

  }


  function draw() {
    if (state == 'einleitung') {
      drawEinleitung();
    } else if (state == 'echtzeit') {
      drawEchtzeit();
    } else if (state == 'dashboard') {
      drawDashboard();
    }
  }


  //Wechsel des States
  function mousePressed() {
    if (state == 'einleitung') {
      y_sky = 384;
      dir_sky = 0;
      y_mountains = 550;
      dir_mountains = 0;
      vel_fluchtpunkt = createVector(0, 0);
      fluchtpunkt = createVector(width / 2, height / 2);
      vel_mountains = 0;
      mountains_hoehe = 0;
      alphaWerte = [];
      state = 'echtzeit';
    } else if (state == 'echtzeit') {
      state = 'dashboard';
    } else if (state == 'dashboard') {
      alphaWerte = [];
      SummeAlphaWerte = 0;
      state = 'einleitung';
    }
  }


  function drawEinleitung() {
    image(startbildschirm, width / 2, height / 2);
  }


  function drawEchtzeit() {
    //BASICS
    background('#d7eef9');
    fill('white');

    //SLIDER
    //wertSlider = slider.value();


    //ALPHA-WERTE HOLEN
    var _alpha = muse.getAlpha();
    //var _alpha = wertSlider;
    var threshold = tresh.threshold(_alpha);
    var fitness = (_alpha - threshold);

    acc.set(0, 1 * fitness);
    vel_fluchtpunkt.add(acc);
    vel_fluchtpunkt.mult(0.99);
    //Widerstand eingebaut durch mult - sobald keine acc mehr geht vel weg bis 0
    fluchtpunkt.add(vel_fluchtpunkt);

    if (fluchtpunkt.y < 0) {
      fluchtpunkt.y = 0;
      vel_fluchtpunkt.set(0, 0);
    } else if (fluchtpunkt.y > height - 150) {
      fluchtpunkt.y = height - 150;
      vel_fluchtpunkt.set(0, 0);
    }

    y_sky = map(fluchtpunkt.y, 0, height - 150, 1100, -354);
    image(sky7, 512, y_sky);

    y_mountains = map(fluchtpunkt.y, 0, height - 150, 600, 500);
    image(mountains, 512, y_mountains);

    //Speichern der AlphaWerte für Dashboard
    if (fitness >= fitnessGrenze) {
      alphaWerte.push(1);
    } else {
      alphaWerte.push(0);
    }

    /*text('Max. AlphaWert ' + wertSlider,20,90);
    fill('purple');
    text('Alpha ' + _alpha*100,30,60);
    text('Dyn. Schwelle ' + threshold*100,30,90);
    text('Fitness ' + fitness*100,30,110);*/


    //HINTERGRUND SKIPISTE
    var v = p5.Vector.lerp(endpunkte[0], fluchtpunkt, map(fluchtpunkt.y, 0, height - 150, 0.5, 1));
    fill('#fcfcfc');
    noStroke();
    rect(0, v.y, width, height - v.y);


    //SKI-RILLEN ZEICHNEN
    stroke('#edefef');
    strokeWeight(2.8);
    for (var i = 0; i < endpunkte.length; i++) {
      var aktuellerEndpunkt = endpunkte[i];
      var v = p5.Vector.lerp(aktuellerEndpunkt, fluchtpunkt, map(fluchtpunkt.y, 0, height - 150, 0.5, 1));
      line(v.x, v.y, aktuellerEndpunkt.x, aktuellerEndpunkt.y);
    }


    //SCHNEEFLOCKEN
    //point force um Forwärtsgeschwindigkeit zu simulieren
    //snow.setFlakeSize(map(fluchtpunkt.y,0,height-150,5,1.5),map(fluchtpunkt.y,0,height-150,12,8));
    var pforce = map(fluchtpunkt.y, 0, height - 150, 0, 1);
    snow.setPointForce(pforce);
    snow.setCenter(width / 2, fluchtpunkt.y);
    snow.draw();

    /*fill('purple');
    text('Fluchtpunkt.y ' + fluchtpunkt.y, 30,130);
    text('V.y ' + v.y, 30,160);*/

    //SKI ROTATION
    push();
    translate(475, 943);
    rotationLinks = map(fluchtpunkt.y, 0, height - 150, 40, 0);
    var xCorrection = constrain(xCorrection, -199, 0);
    xCorrection = -rotationLinks * 5;
    var yCorrection = constrain(yCorrection, -100, 0);
    yCorrection = -rotationLinks * 3;
    translate(xCorrection, yCorrection);
    rotate(rotationLinks);
    image(linkerSki9, 0, 0);
    pop();


    push();
    translate(549, 943);
    rotationRechts = map(fluchtpunkt.y, 0, height - 150, -40, 0);
    var xCorrectionRechts = constrain(xCorrectionRechts, 0, 199);
    xCorrectionRechts = -rotationRechts * 5;
    var yCorrectionRechts = constrain(yCorrectionRechts, -100, 0);
    yCorrectionRechts = rotationRechts * 3;
    translate(xCorrectionRechts, yCorrectionRechts);
    rotate(rotationRechts);
    image(rechterSki9, 0, 0);
    pop();


    //SKIBRILLE
    image(goggles, 512, 384);
    /*fill('red');
    ellipse(fluchtpunkt.x,fluchtpunkt.y,10,10);*/

    drawHorseshoe(55, 75);

    if (alphaWerte.length >= 800) {
      image(stop, 924, 80);
    }

  }


  function drawHorseshoe(left, top) {
    //console.log('drawHorseshoe');
    var horseshoe = muse.get('/muse/elements/horseshoe');
    // console.log(horseshoe);

    var vals = [horseshoe.leftEar, horseshoe.leftFront, horseshoe.rightFront, horseshoe.rightEar];
    var gap = 20;
    var d = 10;
    push();
    translate(left, top);

    //leftEar
    for (var i = 0; i < vals.length; i++) {
      var x = i * gap
      var sensorVal = vals[i];
      var col = getColor(sensorVal);
      noStroke();
      fill(col);
      ellipse(x, 0, d, d);
    }

    pop();

  }


  function getColor(val) {
    if (val == 1) {
      return 'green';
    } else if (val == 2) {
      return 'orange';
    } else if (val >= 3) {
      return 'red';
    } else return 'black';
  }


  function drawDashboard() {
    //BASICS
    background('#d7eef9');
    fill('white');

    //BERECHNUNG DES DURCHSCHNITTLICHEN RUNTERFAHREN-ZUSTANDS
    var SummeAlphaWerte = 0;
    for (var i = 0, n = alphaWerte.length; i < n; i++) {
      SummeAlphaWerte = SummeAlphaWerte + alphaWerte[i];
    }

    var MaxEntspannt = alphaWerte.length * 1;
    var SehrEntspannt = (alphaWerte.length * 1) * 0.85;
    var MittelEntspannt = (alphaWerte.length * 1) * 0.4;

    fluchtpunkt = createVector(width / 2, map(SummeAlphaWerte, 0, MaxEntspannt, 0, height - 150));

    if (SummeAlphaWerte >= SehrEntspannt) {
      image(sky7, 512, -354);
      image(mountains, 512, 500);
    } else if (SummeAlphaWerte >= MittelEntspannt && SummeAlphaWerte < SehrEntspannt) {
      image(sky7, 512, 727);
      image(mountains, 512, 550);
    } else {
      image(sky7, 512, 1100);
      image(mountains, 512, 600);
    }

    //HINTERGRUND SKIPISTE
    var v = p5.Vector.lerp(endpunkte[0], fluchtpunkt, map(fluchtpunkt.y, 0, height - 150, 0.5, 1));
    fill('#fcfcfc');
    noStroke();
    rect(0, v.y, width, height - v.y);


    //SKI-RILLEN ZEICHNEN
    stroke('#edefef');
    strokeWeight(2.8);
    for (var i = 0; i < endpunkte.length; i++) {
      var aktuellerEndpunkt = endpunkte[i];
      var v = p5.Vector.lerp(aktuellerEndpunkt, fluchtpunkt, map(fluchtpunkt.y, 0, height - 150, 0.5, 1));
      line(v.x, v.y, aktuellerEndpunkt.x, aktuellerEndpunkt.y);
    }

    //DURCHSCHNITTSWERT SKIPISTE - HORIZONT LINIE
    stroke('#d89a9a');
    line(0, v.y, width, v.y);


    //SCHNEEFLOCKEN
    var pforce = map(fluchtpunkt.y, 0, height - 150, 0, 1);
    snow.setPointForce(pforce);
    snow.setCenter(width / 2, fluchtpunkt.y);
    snow.draw();

    //FEEDBACK AN USER
    image(Titel_Feedback, width / 2, 100);
    if (SummeAlphaWerte >= SehrEntspannt) {
      image(SehrEntspannt_Feedback, 512, 140);
    } else if (SummeAlphaWerte >= MittelEntspannt && SummeAlphaWerte < SehrEntspannt) {
      image(MittelEntspannt_Feedback, 512, 150);
    } else {
      image(Unentspannt_Feedback, 512, 140);
    }

    //BAROMETER
    image(barometer_bg, 970, height / 2);
    strokeWeight(1);
    //stroke('#5d5f5e');
    noStroke();
    fill('#dadada');
    rect(957, 378, 10, 240, 20);
    //image(barometer,975,400);
    /*stroke('#575756');
    fill('#575756');*/
    fill('#575756');
    textSize(12);
    text('0%', 972, 388);
    text('100%', 972, 618);
    textSize(12);
    //text('Entspannigsbarometer',895,360);
    image(barometer_text, 957, 360);
    stroke('#d89a9a');
    fill('#d89a9a');
    ellipse(962, v.y, 10, 10);

    //BERECHNUNG ENTSPANNUNGSWERT
    var UserEntspannt = round(SummeAlphaWerte / alphaWerte.length * 100);
    noStroke();
    text(UserEntspannt + '%', 919, v.y);


    //SKI ROTATION
    push();
    translate(475, 943);
    rotationLinks = map(fluchtpunkt.y, 0, height - 150, 40, 0);
    var xCorrection = constrain(xCorrection, -199, 0);
    xCorrection = -rotationLinks * 5;
    var yCorrection = constrain(yCorrection, -100, 0);
    yCorrection = -rotationLinks * 3;
    translate(xCorrection, yCorrection);
    rotate(rotationLinks);
    image(linkerSki9, 0, 0);
    pop();


    push();
    translate(549, 943);
    rotationRechts = map(fluchtpunkt.y, 0, height - 150, -40, 0);
    var xCorrectionRechts = constrain(xCorrectionRechts, 0, 199);
    xCorrectionRechts = -rotationRechts * 5;
    var yCorrectionRechts = constrain(yCorrectionRechts, -100, 0);
    yCorrectionRechts = rotationRechts * 3;
    translate(xCorrectionRechts, yCorrectionRechts);
    rotate(rotationRechts);
    image(rechterSki9, 0, 0);
    pop();


    //SKIBRILLE
    image(goggles, 512, 384);
    fill('red');
    console.log('Summe AlphaWerte ' + SummeAlphaWerte + ' / ' + 'Anz. Werte ' + alphaWerte.length);
    //ellipse(fluchtpunkt.x,fluchtpunkt.y,10,10);

  }
