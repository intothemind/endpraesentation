/**
 * Draws the real time visualisation
 */
function drawRealtime2Vis() {
  if (pointAddInterval2 == null) {
    pointAddInterval2 = startAddingPoints2();
  }

  //////////////////////////////////////////////////////////////////////////////  
  //ALPHA + THETA
  //////////////////////////////////////////////////////////////////////////////
  //get the current value for alpha_relative
  var alpha_relative = muse.get('/muse/elements/alpha_relative');
  var theta_relative = muse.get('/muse/elements/theta_relative');

  //if there is no valid data, don't do anything
  if (!alpha_relative.mean) {
    return;
  }

  if (!theta_relative.mean) {
    return;
  }

  var alpha_value = alpha_relative.mean;
  var theta_value = theta_relative.mean;

  //store the current value into an array for later use in the dashboard (recording)
  alpha_values.push(alpha_value);
  theta_values.push(theta_value);

  //feedback = map(alpha_value,0,0.4,-1,1);
  //hirnaktivitaet = map(alpha_value, 0, 0.5, 0, 1);


  var score2 = (alpha_value + theta_value) / 2;


  //////////////////////////////////////////////////////////////////////////////  
  //BETA
  //////////////////////////////////////////////////////////////////////////////  
  //get the current value for beta_relative
  var beta_relative = muse.get('/muse/elements/beta_relative');

  //if there is no valid data, don't do anything
  if (!beta_relative.mean) {
    return;
  }

  var beta_value = beta_relative.mean;

  //store the current value into an array for later use in the dashboard (recording)
  beta_values.push(beta_value);

  //feedback = map(alpha_value,0,0.4,-1,1);
  //hirnaktivitaet = map(alpha_value, 0, 0.5, 0, 1);

  var score = beta_value;





  var threshold = dt.threshold(score2);

  feedback2 = (6*(score2 - threshold))-0.1;
  //console.log(feedback2);
  //console.log(feedback2)
  //console.log(beta_value)
  //feedback2= map(mouseX,0,width,-1,1);
  //console.log('feedback2 ' + feedback2);


  // DRAW REAL TIME 2 VISUALISATION

  //draw a background
  background(imgEV2, 50, 100, 100);
/*
  text('Alpha: ' + alpha_value, 100, 100);
  text('Theta: ' + theta_value, 100, 150);
  text('score2: ' + score2, 100, 200);
  text('threshold: ' + threshold, 100, 250);
  text('feedback2: ' + feedback2, 100, 300);
*/

  //var beta_relative = muse.get('/muse/elements/beta_relative');
  //var alpha_relative = muse.get('/muse/elements/alpha_relative');
  //var theta_relative = muse.get('/muse/elements/theta_relative');

  //betaValues.unshift(beta_relative.mean);
  //alphaValues.unshift(alpha_relative.mean);
  //thetaValues.unshift(theta_relative.mean);



  for (var i = 0; i < p.length; i++) {
    p[i].move();

    if (p[i].x < 0) {
      p[i].x = width;
    } else if (p[i].x > width) {
      p[i].x = 0;
    }

    if (p[i].y < 0) {
      p[i].y = height;
    } else if (p[i].y > height) {
      p[i].y = 0;
    }

    for (var j = i + 1; j < p.length; j++) {
      springTo(p[i], p[j]);
    }
    p[i].display();
  }

}




////////////////////////////////////////////////////////////////////////////////////
//FUNKTIONEN FÜR PUNKTE BEI ECHTZEITVISUA
////////////////////////////////////////////////////////////////////////////////////
/*
function springTo(p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  var dst = sqrt(dx * dx + dy * dy);

  if (dst < 100) {
    var ax = dx * spring;
    var ay = dy * spring;
    var alph = 10 + (dst / 100) * 200;

    p1.vx += ax;
    p1.vy += ay;
    p2.vx -= ax;
    p2.vy -= ay;

    //the alph value needs to be adjusted, made a quick fix with multiplying by 0.2
    stroke(colorValue, 100);
    line(p1.x, p1.y, p2.x, p2.y);
  }
}*/

function startAddingPoints2() {
  // Loop, um neue Punkte hinzuzufügen
  /* return setInterval(function() {
     // Speed ist ein Wert, mit dem ermittelt wird, wie schnell Punkte hinzugefügt oder entfernt werden
     var speed2 = feedback2;  //(hirnaktivitaet - 0.5) * 2;

     if (speed2 < 0) {
       // Punkte hinzufügen
       counter += speed2;

       if (counter < -counterLimit) {
         var particle = addParticle();
         p.push(particle);
         counter = 0;
       }

     } else if (speed2 > 0) {
       // Punkte entfernen

       counter += speed2;

       if (counter > counterLimit) {
         p.splice(0, 1);
         counter = 0;
       }

     }
   }, 100);*/

  //console.log('startAddingPOints2');

  return setInterval(removePoints, 100);
}

function removePoints() {
  // Speed ist ein Wert, mit dem ermittelt wird, wie schnell Punkte hinzugefügt oder entfernt werden
  var speed2 = feedback2; //(hirnaktivitaet - 0.5) * 2;

  if (speed2 < 0) {
    // Punkte hinzufügen
    //console.log('punkte hinzufügen');
    counter += speed2;

    if (counter > -counterLimit) {
      var particle = addParticle();
      p.push(particle);
      counter = 0;
    }

  } else if (speed2 > 0) {
    // Punkte entfernen
    //console.log('punkte entfernen');
    counter += speed2;

    if (counter < counterLimit) {
      p.splice(0, 1);
      counter = 0;
    }

  }
}

function addParticle() {
  if (startCenterRatio < 1) {
    startCenterRatio += changingRate;
  }

  var part = new Particle(random(width * startCenterRatio) + (width / 2 - (width * startCenterRatio) / 2), random(height * startCenterRatio) + (height / 2 - (height * startCenterRatio) / 2), random(9, 24));
  return part;
}

function Particle(_x, _y, _r) {
  this.x = _x;
  this.y = _y;
  this.vx = 0;
  this.vy = 0;
  this.r = _r;
  this.c = color('hsba(255, 255, 255, 80%)')
    //this.c = color(colorValue);

  this.display = function() {
    fill(this.c);
    noStroke(10);
    ellipse(this.x, this.y, this.r, this.r);
  }

  this.move = function() {
    this.x += this.vx;
    this.y += this.vy;
  }
}