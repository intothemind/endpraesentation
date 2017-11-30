function drawCalibrate() {
  background(bgImg);
  background(calibrateImg);
  
  
  var horse = muse.get('/muse/elements/horseshoe');
  //console.log('hores',horse);
  
  var w = 20;
  var gap = 10;
  var x =0;
  var y =0;
  
 
  
  push();
  translate(384,512);
  
  noStroke();
  textSize(30);
  fill('white');
  textAlign(CENTER);
  //text('CALIBRATION',0,0);
  
  translate(0,30);
  textSize(14);
 // text('Hier kommt noch Text und erklärt \n wie das Spiel funktioniert',0,0);
  
  translate(-50,30);
  
  //draw left ear
  var col = getColor(horse.leftEar);
  //console.log('col',col);
  fill(col);
  ellipse(x,y,w,w);
  
  //draw left front
  var col = getColor(horse.leftFront);
  fill(col);
  x = w+gap;
  ellipse(x,y,w,w);
  
    //draw right front
  var col = getColor(horse.rightFront);
  fill(col);
  x = 2*(w+gap)
  ellipse(x,y,w,w);
  
    //draw right ear
  var col = getColor(horse.rightEar);
  fill(col);
  x = 3*(w+gap);
  ellipse(x,y,w,w);
  
  pop();
  

}

//translate number values for horseshoe (1,2,3) into colors
function getColor(val){
 // console.log('val',val);
  if(val == 1){
    return color(204,255,204);
  }
  else if(val == 2){
    return 'yellow';
  }
  else if(val >= 3){
    return color(221,150,144);
  }
  else return color(221,150,144);
}