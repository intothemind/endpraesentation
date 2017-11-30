/**
 * Draws the countdown2 
 */

var countdownValue2 = 0;
var offset2 = null;

function drawCountdown2() {

  if (offset2 == null) {
    offset2 = Date.now();
  }

  countdownValue2 = 10 - Math.round((Date.now() - offset2) / 1000);

  background(imgEV2, 50);
  
  textFont(font);
  textSize(50);
  textAlign(CENTER, CENTER);
  text('Dein Flug wird analysiert.\nWarte auf Dein Ergebnis.', 500, 200);

  textFont(fontTitel);
  textSize(180);
  fill(219, 208, 243);
  textAlign(CENTER)
  text(countdownValue2, 500, 450)

}