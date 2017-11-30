function drawRealtime() {

  // Empfangen der Daten
  var alpha_relative = muse.get('/muse/elements/alpha_relative');
  var alpha_value = alpha_relative.mean;
  var theta_relative = muse.get('/muse/elements/theta_relative');
  var theta_value = theta_relative.mean;
  var beta_relative = muse.get('/muse/elements/beta_relative');
  var beta_value = beta_relative.mean;

  // Stop bei Fehler
  if (!alpha_relative.mean) {
    return;
  }

  // Definieren der Schwellenwerte
  var alphaThetaScore = alphaTheta(alpha_relative.mean, theta_relative.mean, beta_relative.mean);
  var alphaThetaThreshold = dt.threshold(alphaThetaScore);
  var alphaThetaFeedback = alphaThetaScore - alphaThetaThreshold;

  // Speichern der aktuellen Daten ins entsprechende Array (Recording)
  alpha_values.push(alpha_value);
  theta_values.push(theta_value);
  beta_values.push(beta_value);
  // alphaThreshold laufend speichern
  alphaThetaThreshold_values.push(alphaThetaThreshold);
  // Nebelwerte wenn Beta über Schwellenwert liegt - sonst 0
  if (alphaThetaFeedback < 0) {
    fog_values.push(beta_value);
  } else {
    fog_values.push(0);
  }

  // Deckkraft heruntersetzen für Fade-Effekte
  tint(255, 100);

  // Hintergrund setzen
  if(alphaThetaFeedback < 0) {
    background(bgGreyGround);
  } else if (theta_relative.mean > alpha_relative.mean) {
    background(bgBlueGround);
  } else {
    background(bgRedGround);
  }

  // Deckkraft wiederherstellen
  tint(255, 255);

  // Baum-Wachstum
  if (alphaThetaFeedback >= 0) {
    newBranch();
  }
  // Zeichnen des Baumes
  drawTree();

  // Speichern des aktuellen Baum-Wachstums-Standes
  tree_states.push(drawIterations);
}


function alphaTheta(alphaValue, thetaValue, betaValue) {
  var thetaAlphaDifference = constrain(thetaValue - alphaValue, 0, 1);
  return 0.3 * alphaValue + 0.3 * thetaValue + thetaAlphaDifference - 0.3 * betaValue;
}


function newBranch() {

  drawIterations += 1;
  while (tree.charAt(drawIterations) != "F") {
    drawIterations += 1;
  }
}


function drawTree() {

  push();
  translate(width / 2, (height / 10) * 9);
  // stroke(60, 40, 30);
  stroke(0);
  strokeW = 32;
  len = 4;

  for (var i = 0; i < drawIterations; i++) {
    var current = tree.charAt(i);
    strokeWeight(strokeW);
    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "[") {
      strokeW = strokeW / 2;
      len -= 0.2;
      push();
    } else if (current == "]") {
      strokeW = strokeW * 2;
      len += 0.2;
      pop();
    }
  }
  pop();
}