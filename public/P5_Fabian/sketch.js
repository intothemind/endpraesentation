//Eigenes Projekt

var muse = musedata.connect(getHost());
//var muse = musedata.fake();

var pos;
var dir;
var points = [];
var img;
var wolke1;
var wolke2;
var wolkebewegung1 = 600;
var wolkebewegung2 = 1200;
var wolkebewegung3 = -150;
var nebel_unten;
var Nebelbewegung = 0;
var fitnesswerte = [];
//var status = "echtzeit";
var status = "nebeldorf";
var hoehe = 0;
//var time = [1];
//var blau = 149;

//variable storing dynamic threshold
var thresh = dynamicThreshold();


//Nach etwa 10 Sekunden läuft die Grafik ab
var startZeitMillis = 10 * 1000;

function preload() {
    img = loadImage("images/Landschaft.png");
    wolke1 = loadImage("images/wolke1.png");
    wolke1x = loadImage("images/wolke1x.png");
    wolke2 = loadImage("images/wolke2.png");
    wolke3 = loadImage("images/wolke3.png");
    wolke4 = loadImage("images/wolke4.png");
    wolke5 = loadImage("images/wolke5.png");
    wolke6 = loadImage("images/wolke6.png");
    nebel_unten = loadImage("images/Nebel_unten.png");
    //nebeldorf = loadImage("Nebeldorf.png");
}


function setup() {
    var cnv = createCanvas(1024, 768);

    pos = createVector(1024, 650);
    dir = createVector(4, 0);

    var p1 = createVector(0, pos.y);
    //var p2 = createVector(1024, pos.y);
    points.push(p1);
    //points.push(p2);

    frameRate(28);
}

function draw() {
    if (status == "nebeldorf") {
        drawnebeldorf();
    } else if (status == 'echtzeit') {
        drawEchtzeit();
    } else if (status == 'dashboard') {
        drawDashboard();
    }
}

function drawnebeldorf() {

    // background(255);
    // push();
    // translate(width - pos.x, height - pos.y - 650);
    // translate(-350, 0)
    //     //Hintergrundbild
    // image(img, 0, 0);
    // pop();

    //szene zeichnen
    push();
    //szene so verschieben dass der neuest punkt immer am 
    //rechten bildrand ist. 
    translate(0, -500);
    drawLandscape();
    drawClouds();
    pop();

    //time = time + 1;
    //background(0);
    //was macht millis? -> https://p5js.org/reference/#/p5/millis
    if (millis() > startZeitMillis) {
        status = "echtzeit";
    }
}


function drawEchtzeit() {

    background(250);

    //pos und point array updaten
    updatePoints();

    //szene zeichnen
    push();
    //szene so verschieben dass der neuest punkt immer am 
    //rechten bildrand ist. 
    translate(width - pos.x, height - pos.y - 650);
    drawLandscape();
    drawClouds();
    pop();

    if (pos.x >= /*6500*/ 7000) {
        status = "dashboard";
    }
    
    hoehe = map(pos.y, 650, 100, 500, 5200);
    
    fill(0);
    textSize(30);
    text(hoehe, 100, 70);
    noStroke();
    fill(rot, grün, blau);
    rect(165,15,300, 70);
    fill(0);
    text("Meter", 170, 70);
    
}



function drawDashboard() {
    background(255);

    //first and last points allow us to get minimum and maximum x value
    var firstPoint = points[0];
    var lastPoint = points[points.length - 1];

    var sc = width / img.width;

    push();
    scale(sc, sc);
    drawLandscape(translate(0, 1000));
        
    var boden = color(28,29,32);
    fill(boden);
    noStroke();
    rect(0,1300, 7000, 3000);
    
    var himmel = color(rot, grün, blau);
    fill(himmel);
    noStroke();
    rect(0,-1000, 7000, 1000);
    
    fill(28,29,32)
    textSize(250);
    text("DASHBOARD", 700, 0);
    
    fill(255)
    textSize(100);
    text("DEINE BERGE SIND DURCHSCHNITTLICH 2300 METER HOCH!", 700, 1800);
    
    
    // push();
    // translate(-350, 0)
    //     //Hintergrundbild
    // image(img, 0, 0);
    // pop();

    // push();
    // fill('blue');

    // noStroke();
    // beginShape();
    // vertex(0, -250);
    // for (var i = 0; i < points.length; i++) {
    //     var p = points[i];
    //     vertex(p.x, p.y); //Punkt innerhalb von beginShape und endShape
    //     //move(camX, camY);
    // }
    // vertex(pos.x, -250);
    // endShape(CLOSE);
    // pop();
    pop();

}

function drawLandscape() {
    background(0);


    push();
    translate(0, 0)
        //Hintergrundbild
    image(img, 0, 0);
    pop();


    //berge
    //blau = blau + 1;
    rot = map(pos.y, 650, 100, 101, 33);
    grün = map(pos.y, 650, 100, 130, 114);
    blau = map(pos.y, 650, 100, 174, 237);
    //unten = color(255, 0, 0, 1);
    //oben = color(0, 0, 255, 1);
    //c1 = lerpColor(unten, oben, .33);
    //c2 = lerpColor(unten, oben, .66);
    //for (var f = 0; f < 15; f++) {
    fill(rot, grün, blau);


    noStroke();
    beginShape();
    vertex(0, -250);
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        vertex(p.x, p.y); //Punkt innerhalb von beginShape und endShape
        //move(camX, camY);
    }
    vertex(pos.x, -250);
    endShape(CLOSE);
    //pop();
}


function drawClouds() {
    Nebelvertikal = map(pos.y, 650, 100, 760, 810);

    Nebelbewegung = Nebelbewegung + 0.09;

    push();
    translate(Nebelbewegung, Nebelvertikal)
        //Hintergrundbild
    image(nebel_unten, 0, 0);
    pop();

    wolkebewegung1 = wolkebewegung1 - 0.09;
    wolkebewegung2 = wolkebewegung2 - 0.4;
    wolkebewegung3 = wolkebewegung3 + 0.2;

    push();
    translate(wolkebewegung1, 200)
        //Hintergrundbild
    image(wolke4, 0, 0);
    pop();


    push();
    translate(wolkebewegung2, 100)
        //Hintergrundbild
    image(wolke2, 0, 0);
    pop();


    push();
    translate(wolkebewegung3, 250)
        //Hintergrundbild
    image(wolke3, 0, 0);
    pop();

    push();
    translate(wolkebewegung2 + 300, 90)
        //Hintergrundbild
    image(wolke6, 0, 0);
    pop();

    push();
    translate(wolkebewegung1 + 500, 200)
        //Hintergrundbild
    image(wolke4, 0, 0);
    pop();

    push();
    translate(wolkebewegung2 + 1000, 90)
        //Hintergrundbild
    image(wolke5, 0, 0);
    pop();

    push();
    translate(wolkebewegung1 + 1400, 50)
        //Hintergrundbild
    image(wolke4, 0, 0);
    pop();


    push();
    translate(wolkebewegung2 + 1600, 20)
        //Hintergrundbild
    image(wolke6, 0, 0);
    pop();


    push();
    translate(wolkebewegung2 + 2000, 150)
        //Hintergrundbild
    image(wolke2, 0, 0);
    pop();

    push();
    translate(wolkebewegung1 + 3100, 100)
        //Hintergrundbild
    image(wolke2, 0, 0);
    pop();

    push();
    translate(wolkebewegung2 + 3400, 90)
        //Hintergrundbild
    image(wolke5, 0, 0);
    pop();

    push();
    translate(wolkebewegung1 + 3800, 120)
        //Hintergrundbild
    image(wolke2, 0, 0);
    pop();

    push();
    translate(wolkebewegung1 + 4000, 20)
        //Hintergrundbild
    image(wolke4, 0, 0);
    pop();

    push();
    translate(wolkebewegung1 + 4600, 20)
        //Hintergrundbild
    image(wolke2, 0, 0);
    pop();

    push();
    translate(wolkebewegung2 + 4900, 750)
    rotate(180)
        //Hintergrundbild
    image(wolke2, 0, 0);
    pop();

    push();
    translate(wolkebewegung2 + 5555, 50)
        //Hintergrundbild
    image(wolke6, 0, 0);
    pop();

    push();
    translate(wolkebewegung1 + 6000, 80)
        //Hintergrundbild
    image(wolke4, 0, 0);
    pop();

}


function updatePoints() {
    var a = muse.getAlpha();
    var threshold = thresh.threshold(a);
    //console.log(threshold);

    var fitness = (a - threshold);

    fitnesswerte.push(fitness);
    if (fitnesswerte.length > 25) {
        fitnesswerte.shift();
    }

    var summe = 0;

    for (var i = 0; i < fitnesswerte.length; i++) {
        summe = summe + fitnesswerte[i];
    }

    var durchschnitt = summe / fitnesswerte.length;

    pos.y = map(durchschnitt, -0.027, 0.18, 600, 150);
    pos.x = pos.x + 3;

    points.push(pos.copy());
}