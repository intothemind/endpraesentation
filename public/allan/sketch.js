var vec1 = [];
var vec2 = [];
var vec3 = [];
var vec4 = [];
var slider;

function preload() {
  res1 = loadStrings('points/points1.txt');
  res2 = loadStrings('points/points2.txt');
  res3 = loadStrings('points/points3.txt');
  res4 = loadStrings('points/points4.txt');
}

function setup() {

  // Retina Display
  pixelDensity(2);
  colorMode(RGB, 255);
  frameRate(15);

  //check if portrait or landscape
	if(windowWidth>windowHeight){
		var div = createCanvas(470,200);
    div.parent('p5');
	}
	else {
		var div = createCanvas(200,470);
    div.parent('p5');
	}

  // var div = createCanvas(1280, 338);

  for(let i = 0; i<res1.length; i++) {
    var str = res1[i];
    str = str.replace(/{/g, '').replace(/}/g, '');
    str = str.split(", ");
    var v = createVector(float(str[0]), float(str[1]), float(str[2]));
    vec1.push(v);
  }

  for(let i = 0; i<res2.length; i++) {
    var str = res2[i];
    str = str.replace(/{/g, '').replace(/}/g, '');
    str = str.split(", ");
    var v = createVector(float(str[0]), float(str[1]), float(str[2]));
    vec2.push(v);
  }

  for(let i = 0; i<res3.length; i++) {
    var str = res3[i];
    str = str.replace(/{/g, '').replace(/}/g, '');
    str = str.split(", ");
    var v = createVector(+str[0], +str[1], +str[2]);
    vec3.push(v);
  }

  for(let i = 0; i<res4.length; i++) {
    var str = res4[i];
    str = str.replace(/{/g, '').replace(/}/g, '');
    str = str.split(", ");
    var v = createVector(+str[0], +str[1], +str[2]);
    vec4.push(v);
  }

}

function draw() {

  background('#212121');
  noStroke();
  fill((mouseX/2) * 255, (mouseY/2) * 255, 0, 25);


  // Morphing
  var morphAmt = random(0,1); // slider.value();
  var m1 = [];
  var m2 = [];

  for(let i=0;i<vec1.length;i++) {
    var v1 = vec1[i];
    var v2 = vec2[i];
    var v3 = vec3[i];
    var v4 = vec4[i];
    var vm1 = p5.Vector.lerp(v1, v3, morphAmt);
    var vm2 = p5.Vector.lerp(v2, v4, morphAmt);
    m1.push(vm1);
    m2.push(vm2);
  }

  push();
    translate(width/1.9, 0);
    rotate(radians(180));
    scale(3.7);
    beginShape(TRIANGLE_STRIP);
      for(let i=0;i<m1.length;i++) {
        var mv1 = m1[i];
        var mv2 = m2[i];
        vertex(mv1.x, mv1.y);
        vertex(mv2.x, mv2.y);
      }
    endShape();
  pop();


}
