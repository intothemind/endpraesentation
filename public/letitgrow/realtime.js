/**
 * Draws the real time visualisation
 */
var muse;
var schriftzug;
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
var schubkarre_echtzeit;
var karotte_gepflueckt;

var dt = dynamicThreshold();

var growthValue = 0;
var harvestValue = 50;


function drawRealtimeVis() {
  //COLLECT DATA
  //get the current value for alpha_relative
  var alpha_relative = muse.get('/muse/elements/alpha_relative');

  if (!alpha_relative.mean) {
    return;
  }

  if (frameCount % 115 == 0) {
    alpha_values.push(alpha_relative.mean);
  }

  var score = alpha_relative.mean;
  var threshold = dt.threshold(score);
  var feedback = score - threshold;
  //console.log('feedback:'+ feedback);

  if (feedback < 0) {
    feedback = 0;
  }

  growthValue = growthValue + feedback;
  //console.log('growthValue:'+ growthValue);

  if (growthValue > harvestValue) {
    growthValue = 0;
    harvestCounter++;
  }

  var index = map(growthValue, 0, harvestValue, 0, karottenarr.length);
  index = floor(index);

  /*
  if(frameCount%500==0){
    //4320
  alpha_index.push(index);
  }
  console.log('index',index, karottenarr.length,alpha_relative.mean);
  */

  //if there is no valid data, don't do anything
  /* if (!alpha_relative.mean) {
      return;
    }
	
  var alpha_value = alpha_relative.mean;

    //store the current value into an array for later use in the dashboard (recording)
    alpha_values.push(alpha_value);

    //see if the current alpha_value is superior to the current alphaMax
    alphaMax = max(alphaMax, alpha_value);*/

  // DRAW REAL TIME VISUALISATION


  //draw a background
  background('white');
  
  //add a title and description
  push();
  imageMode(CENTER);
  translate(width / 2, 80);
  image(schriftzug, 0, 0, 450, 57);
  pop();
  
  push();
  translate(90, 210);
  image(karottenarr[index], 50, -675, 1000, 1600);
  pop();

  push();
  translate(-300, 280);
  translate(0,0);
  //image(schubkarre_echtzeit, 0, 0, 1024, 768);
  image(schubkarre_echtzeit, 0, 0, 1900, 700);
  pop();
}