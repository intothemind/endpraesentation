function drawDashboard() {
  
  background(bgBlue);
  var padding = width/30;
  var paddingH = height/20;
  
  // Dashboard-Titel
  fill(0);
  noStroke();
  push();
  translate(padding*1.5, paddingH*2.5);
  textFont(font_coneria);
  textSize(padding*0.9);
  text("Kreativitätsindex", 0, 0);
  // Untertitel
  textFont(font_sans);
  textSize(padding/1.8);
  text("Trainingsverlauf:", 5, paddingH*0.9);
  pop();
  
  // Zeichnen der Kurven
  push();
  translate(padding, 0);

  // alpha- und theta-Werte
  fill(235, 245, 235, 230);  // theta: weiss
  curveChart(theta_values, width-2*padding, height*(2/3)-paddingH*1.6, 0.7);
  fill(10, 45, 80, 158); // alpha: dunkelblau
  curveChart(alpha_values, width-2*padding, height*(2/3)-paddingH*1.6, 0.7);
  
  // Line entsprechend des Schwellenwertes
  /*
  noFill();
  strokeWeight(1);
  stroke(10, 45, 80, 255);
  lineChart(alphaThetaThreshold_values, width-2*padding, height*(2/3)-paddingH*1.5, 0.7);
  */
  
  // beta-Nebel-Kurve
  noStroke();
  fill(75, 80, 80); 
  curveChart(fog_values, width-2*padding, height*(2/3)-paddingH*1.6, 3);
  noFill();
  stroke(255);
  strokeWeight(2);
  // lineChart(fog_values, width-2*padding, height*(2/3)-paddingH, 0.7);
  
  // Baum-Wachstums-Kurve
  fill(0, 0, 0, 50);
  var valueCount = tree_states.length;
  var lastValue = tree_states[valueCount-1];
  // curveChart(tree_states, width-2*padding, height*(2/3)-paddingH*1.6, lastValue);
  pop();
  
  // Ermitteln des aktuellen Wachstums-Status
  var mousePosX = constrain(mouseX, padding, width-padding);
  var currentIndex = round(map(mousePosX, padding, width-padding, 0, valueCount-1));
  var currentTreeIterations = tree_states[currentIndex];
  
  // Zeichnen des Sliders
  push();
  translate(0, height*(2/3)-paddingH*1.6);
  stroke(0);
  strokeWeight(1);
  line(padding, 0, width-padding, 0);
  // Zeichnen der Pfeilchen
  fill(0);
  noStroke();
  beginShape();
    vertex(mousePosX-padding, (-paddingH/2)*0.9);
    vertex(mousePosX-padding*1.2, (-paddingH/2)*0.6);
    vertex(mousePosX-padding, (-paddingH/2)*0.3);
  endShape();
  beginShape();
    vertex(mousePosX+padding, (-paddingH/2)*0.9);
    vertex(mousePosX+padding*1.2, (-paddingH/2)*0.6);
    vertex(mousePosX+padding, (-paddingH/2)*0.3);
  endShape();
  pop();
  
  // Einfügen des Ranking-Bildes
  push();
  translate(padding, height*(2/3)-2*paddingH);
  image(ranking, 0,0, width-2*padding, height/3+3*paddingH);
  pop();
  
  // Legende: Kurvendiagramm
  push();
  fill(0);
  noStroke();
  textFont(font_sans);
  translate(padding*1.7, height*(2/3)-paddingH*0.9);
  textSize(padding/2.5);
  text("Inspiration", ((padding/3.1)*2.5), 0);
  text("Entspannung", ((width-padding)*(0.95/8))+((padding/3.1)*2.5), 0);
  text("Nebelzonen (Ablenkungsphasen)", ((width-padding)*(2/8))+((padding/3.1)*2.5), 0);
  text("Wachstums-Schwelle", ((width-padding)*(3.9/8))+((padding/3.1)*2.5), 0);
  fill(235, 245, 235, 230);         // theta
  rect(0, -(padding/3.4), (padding/3.1)*1.5, padding/3.1);
  fill(10, 45, 80, 158);            // alpha
  rect((width-padding)*(0.95/8), -(padding/3.4), (padding/3.1)*1.5, padding/3.1);
  fill(75, 80, 80);                 // beta
  rect((width-padding)*(2/8), -(padding/3.4), (padding/3.1)*1.5, padding/3.1);
  noFill();
  stroke(10, 45, 80, 255);
  strokeWeight(1);
  beginShape();
    curveVertex((width-padding)*(3.9/8), -(padding/3.4));
    curveVertex((width-padding)*(3.9/8), -(padding/3.4));
    curveVertex(((width-padding)*(3.9/8))+((padding/3.1)/2), (-(padding/3.4))+2);
    curveVertex(((width-padding)*(3.9/8))+(padding/3.1), (-(padding/3.4))+8);
    curveVertex(((width-padding)*(3.9/8))+((padding/3.1)*1.5), (-(padding/3.4))+10);
    curveVertex(((width-padding)*(3.9/8))+((padding/3.1)*1.5), (-(padding/3.4))+10);
  endShape();
  pop();
  
  // Beschriftung: Ranking
  push();
  fill(0);
  noStroke();
  textFont(font_sans);
  translate(padding*1.7, height-paddingH*1.7);
  textSize(padding/1.8);
  text("Vergleich vorherige Trainings:", 0, 0);
  textSize(padding/2.5);
  text("Prozentuale Ablenkung pro Training", padding*3.5, paddingH*0.95);
  pop();
  
  // Zeichnen des entsprechenden Baumes
  push();
  // Translate zur aktuellen MouseX-Position auf der Slider-Linie
  var treePosX = constrain(mouseX, padding, width-padding);
  translate(treePosX, height*(2/3)-paddingH*1.6);
  fill(0);
  noStroke();
  ellipse(0, 0, 7, 7);
  // Setzen der Anfangswerte
  strokeW = 32*(2/3);
  len = 4*(2/3);
  // Zeichnungs-Schleife
  stroke(0);
  for (var i=0; i<currentTreeIterations; i++) {
    var current = tree.charAt(i);
    strokeWeight(strokeW);
    if (current == "F") {
      line(0,0,0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current =="-") {
      rotate(-angle);
    } else if (current == "[") {
      strokeW = strokeW/2;
      len -= 0.2;
      push();
    } else if (current == "]") {
      strokeW = strokeW*2;
      len += 0.2;
      pop();
    }
  }
  pop();

}

function curveChart(arr, w, h, mapValue){
  beginShape();
  var x;
  var y;
  
  // Punkt unten rechts von lineChart (zum Verbinden und Füllen)
  x = map(arr.length-1,0,arr.length-1,0,w);
  y = map(0,0,1,h,0);
  vertex(x,y);
  
  // Punkt unten links von lineChart (zum Verbinden und Füllen)
  x = map(0,0,arr.length-1,0,w);
  y = map(0,0,1,h,0);
  vertex(x,y);
    
  for(var i=0; i < arr.length; i++){
    x = map(i,0,arr.length-1,0,w);
    y = map(arr[i],0,mapValue,h,0);
    vertex(x,y);
  }

  endShape(CLOSE);
}

function lineChart(arr, w, h, mapValue){
  beginShape();
  var x;
  var y;
    
  for(var i=0; i < arr.length; i++){
    x = map(i,0,arr.length-1,0,w);
    y = map(arr[i],0,mapValue,h,0);
    vertex(x,y);
  }
  endShape();
}



