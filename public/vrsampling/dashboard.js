var overallScore = 0;

var thetaRollingAvg = [];
var alphaRollingAvg = [];
var betaRollingAvg = [];
var gammaRollingAvg = [];
var deltaRollingAvg = [];

var dPadding = 100;

function initDashboard(){
	thetaRollingAvg = rollingAvg(thetaValues,5);
	alphaRollingAvg = rollingAvg(alphaValues,5);
	betaRollingAvg = rollingAvg(betaValues,5);
	deltaRollingAvg = rollingAvg(deltaValues,5);
	gammaRollingAvg = rollingAvg(gammaValues,5);
}

function drawDashboard(){

	console.log('drawDashboard');
	background('white');

	//charts
	push();
	translate(dPadding,100);
	push();
	lineChart('Delta',deltaRollingAvg,400,40,getColor('Delta'));
	pop();
	pop();


	push();
	translate(dPadding,200);
	push();
	lineChart('Theta',thetaRollingAvg,400,40,getColor('Theta'));
	pop();
	pop();


	push();
	translate(dPadding,300);
	push();
	lineChart('Alpha',alphaRollingAvg,400,40,getColor('Alpha'));
	pop();
	pop();


		push();
	translate(dPadding,400);
	push();
	lineChart('Beta',betaRollingAvg,400,40,getColor('Beta'));
	pop();
	pop();

			push();
	translate(dPadding,500);
	push();
	lineChart('Gamma',gammaRollingAvg,400,40,getColor('Gamma'));
	pop();
	pop();


	noLoop();
}

function cleanupDashboard(){
	
}

function lineChart(title,arr,w,h,col){

	var maxY = 0.6;

	//title
	push();
	translate(0,h);
	//textStyle(BOLD);
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
	stroke(col);
	fill(col);
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

	//avg value in the end
	push();
	translate(w+120,h);
	
	var theavg = avg(arr);
	var percentAvg = nf(theavg*100,null,2);
	textSize(24);
	fill('black');
	noStroke();
	textAlign(LEFT,BASELINE);
	text(percentAvg + ' %',0,0);
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

function avg(arr){
	var sum = 0;
	for(var i=0; i<arr.length; i++){
		sum+=arr[i];
	}
	return sum/arr.length;
}