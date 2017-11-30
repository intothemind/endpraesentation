/**
 * Draws the dashboard
 */

var schriftzug;
var schubkarre_hinten;
var schubkarre_vorne;
var gross_k;
var karotte_1;
var karotte_2;
var karotte_3;
var karotte_4;
var karotte_5;
var karotte_6;
var karotte_7;
var karotte_8;
var karotte_9;
var karotte_10;
var korb_null, korb_eins, korb_zwei, korb_drei, korb_vier, korb_fuenf, korb_sechs, korb_sieben, korb_acht, korb_neun, korb_zehn, korb_elf, korb_zwoelf, korb_dreizehn, korb_vierzehn, korb_fuenfzehn;
var legende;
var karottenarr = [];


function drawDashboardVis() {
  background('white');

  //add a title and description
  //push();
  //translate(30, 70);
  //image(schriftzug, 380, -50, 220, 35);
  //pop();
  
  push();
  imageMode(CENTER);
  translate(width / 2, 80);
  image(schriftzug, 0, 0, 450, 57);
  pop();

  push();
  translate(30, 70);
  image(schubkarre_hinten, -15, 100, 954, 241);
  pop();

  /*push();
  translate(400,210);
  var karottenphase = [karotte_1_neu, karotte_2_neu, karotte_3_neu, karotte_4_neu, karotte_5_neu, karotte_6_neu, karotte_7_neu, karotte_8_neu , karotte_9_neu, karotte_10_neu];
  pop();*/

  push();
  translate(250, 220);
  // var arr = [0.1,0.2,0.3,0.4,0.2,0.6,0.7,0.8,0.9,0.2,0.1,0.5];
  //console.log(alpha_values);
  karottendiagramm(alpha_values, 500, 120);
  pop();

  // var arr = [0.1,0.2,0.3,0.4,0.2,0.6,0.7,0.8,0.9,0.2,0.1,0.5];

  push();
  translate(30, 70);
  image(schubkarre_vorne, 65, 125, 740, 138);
  pop();

  //var korbindex = floor(map(harvestCounter,0,15,0,korb.length));
  //console.log('harvestcounter',harvestCounter);
  var korb = [korb_null, korb_eins, korb_zwei, korb_drei, korb_vier, korb_fuenf, korb_sechs, korb_sieben, korb_acht, korb_neun, korb_zehn, korb_elf, korb_zwoelf, korb_dreizehn, korb_vierzehn, korb_fuenfzehn];
  
  push();
  translate(30, 70);
  image(korb[harvestCounter], 150, 450, 200, 110);
  pop();

  push();
  translate(30, 70);
  image(score_display[harvestCounter], 360, 450, 155, 50);
  pop();

  push();
  translate(30, 70);
  image(legende, 630, 430, 250, 156);
  pop();

  push();
  translate(30, 70);
  image(erfolg, 150, 570, 50, 21);
  pop();

  noLoop();
}

function karottendiagramm(alpha_values, _w, _h) {
  for (var i = 0; i < alpha_values.length; i++) {
    var index = floor(map(alpha_values[i], 0, 0.5, 0, karottenarr.length-1));
    index = constrain(index,0,karottenarr.length-1);
    var ratio = karottenarr[index].width / karottenarr[index].height;
    //var w = _w/alpha_values.length;
    var x = map(i, 0, alpha_values.length - 1, 0, _w);
    var y = 0;
    var h = map(alpha_values[i], 0, 0.5, 0, _h);

    imageMode(CENTER);
    image(karottenarr[index], x, y, h * ratio, h);
    /*throw new Error("my error message");*/
  }
}