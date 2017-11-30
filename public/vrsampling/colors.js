var colorScheme = ['#9CBE10','#FF8200','#FFBF29','#09A0CC','#CB213C'];

function getColor(theKey){
	console.log('getColor: ' + ' theKey: ' + theKey);
	if(theKey == 'Delta'){
		//console.log('in the delta');
		return colorScheme[0];
	}
	else if(theKey == 'Theta'){
		//console.log('in the theta');
		return colorScheme[1];
	}
	else if(theKey == 'Alpha'){
		//console.log('in the alpha');
		return colorScheme[2];
	}
	else if(theKey == 'Beta'){
		//console.log('in the beta ' + theKey);
		return colorScheme[3];
		
	}
	else if(theKey == 'Gamma'){
		//console.log('in the gamma ' + theKey);
		return colorScheme[4];
	}
	else return 'black';
}