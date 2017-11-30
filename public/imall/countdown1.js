/**
 * Draws the countdown1 
 */
var countdownValue = 0;
var offset = null;

function drawCountdown1() {

  if (offset == null) {
    offset = Date.now();
  }

  countdownValue = 10 - Math.round((Date.now() - offset) / 1000);

  background(0);


  textSize(180);
  fill(219, 208, 243);
  textAlign(CENTER);
  textFont(fontTitel);
  text(countdownValue, 500, 400);
}