var overallScore = 0;

var thetaRollingAvg = [];
var alphaRollingAvg = [];
var betaRollingAvg = [];

var dPadding = 100;



function initDashboard(){
	overallScore = floor(maxThres*altitude);
	//altitude = 12345;
	thetaRollingAvg = [0.5,0.7,0.3,0.8,0.1];
	//maxThres = Number.MIN_VALUE;

	thetaRollingAvg = rollingAvg(thetaValues,5);
	alphaRollingAvg = rollingAvg(alphaValues,5);
	betaRollingAvg = rollingAvg(betaValues,5);
	//console.log(thetaRollingAvg);
}

function drawDashboard(){

	console.log('drawDashboard');
	background('white');
	

	//score
	push();
	translate(width/2,100);
	textSize(48);
	fill('black');
	textAlign(RIGHT,TOP);
	textStyle(BOLD);
	text('Score',0,0);
	textAlign(LEFT,TOP);
	textStyle(NORMAL);
	text(overallScore,30,0);
	pop();

	//altitude
	push();
	translate(dPadding,200);
	textAlign(LEFT,TOP);
	textSize(32);
	textStyle(BOLD);
	fill('black');
	text('Altitude ',0,0);
	textStyle(NORMAL);
	text(altitude,150,0);
	pop();

	//charts
	push();
	translate(dPadding,300);
	push();
	lineChart('Theta',thetaRollingAvg,400,40);
	pop();
	pop();


	push();
	translate(dPadding,400);
	push();
	lineChart('Alpha',alphaRollingAvg,400,40);
	pop();
	pop();


		push();
	translate(dPadding,500);
	push();
	lineChart('Beta',betaRollingAvg,400,40);
	pop();
	pop();

	noLoop();
}

function cleanupDashboard(){
	
}

function lineChart(title,arr,w,h){

	var maxY = 0.6;

	//title
	push();
	translate(0,h);
	textStyle(BOLD);
	textSize(24);
	textAlign(LEFT,BASELINE);
	fill('black');
	noStroke();
	text(title,0,0);
	pop();

	//line 
	push();
	translate(100,0);
	noStroke();
	fill('white');
	//rect(0,0,w,h);
	noFill();
	stroke('red');
	fill('red');
	beginShape();
	vertex(0,h);
	for(var i=0; i<arr.length; i++){
		var x = map(i,0,arr.length-1,0,w);
		var y = map(arr[i],0,maxY,h,0);
		vertex(x,y);
	}
	vertex(x,h)
	endShape(CLOSE);
		//max point
	var maxVal = Number.MIN_VALUE;
	var maxIndex = -1;
	for(var i=0; i<arr.length; i++){
		var val = arr[i];
		if(val>maxVal){
			maxVal = val;
			maxIndex = i;
		}
	}

	var x = map(maxIndex,0,arr.length-1,0,w);
	var y = map(maxVal,0,maxY,h,0);
	noStroke();
	fill('black');
	ellipseMode(CENTER);
	ellipse(x,y,7,7);
	pop();

	//max value in the end
	push();
	translate(w+120,h);
	
	var percentMax = floor(maxVal*100);
	textSize(24);
	fill('black');
	noStroke();
	textAlign(LEFT,BASELINE);
	text(percentMax + ' %',0,0);
	pop();



}

function rollingAvg(arr,n){

	var avgArr = [];
	for(var i=n; i<arr.length; i++){
		var sum = 0;
		for(var j=0; j<n; j++){
			var val = arr[i-j];
			sum+=val;
		}
		var avg = sum/n;
		avgArr.push(avg);
	}
	return avgArr;

}