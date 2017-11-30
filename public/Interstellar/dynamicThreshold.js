
//this needs to be part of a helper library together with sum and mean maybe median also
function dtmean(arr) {
	var sum = 0;

	arr.forEach(function(d) {
		sum += d;
	});

	return sum / arr.length;
 //testcomment
}


function dynamicThreshold(startThres,_n,_difficulty) {

	var values = [];
	var thres = startThres || 0;
	var difficulty = _difficulty || 0.85;
	//how many measurements to take into account
	var n = _n || 500;

	//fill the array with some values
	for(var i=0; i<10; i++){
		values.push(thres);
	}

	function my() {

	}

	my.threshold = function(val) {
		if (val) {
			values.push(val);
		}

		while (values.length > n) {
			values.shift();
		}

		var _mean = dtmean(values);

		thres = difficulty * _mean;
		return thres;
	}

	return my;
}