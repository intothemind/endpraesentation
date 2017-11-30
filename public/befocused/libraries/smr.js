function getSMR(rawfft) {

  //get the smr ranges from 12.5 – 15.5 Hz
  // var hzBin = 0.859375; //herz per bin in muse 220hz/256bins;

  //bins which are in
  // var smrbins = [15,16,17,18,19]; //12.03125 - 16.328125
  // console.log('hzBin',hzBin);

  //var minSMR = 12.5;
  //var maxSMR = 15.5;

  //get rid of frequencies above Gamma (44Hz)
    //console.log('rawfft',rawfft);
  var totalarr = rawfft.slice(0, 52);

  //normalize total array
  var minVal = Number.MAX_VALUE;
  var maxVal = Number.MIN_VALUE;

  totalarr.forEach(function(d) {
    if (d < minVal) {
      minVal = d;
    }
    if (d > maxVal) {
      maxVal = d;
    }
  });

  totalarr = totalarr.map(function(d) {
    return map(d, minVal, maxVal, 0, 1);
  });

  //bins for smr are at index 15,16,17,18,19, which corresponds to 12.03125 - 16.328125hz
  var smrarr = totalarr.slice(15, 20);

  var totalsum = sum(totalarr);
  var smrsum = sum(smrarr);

  var ratio = smrsum / totalsum;
  // console.log(smrsum,totalsum,ratio);

  return ratio;

  function sum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }

  /*
    var arr = rawfft.values;
    //get the bins which are relevant for smr
    for(var i=0; i<arr.length; i++){
      var upper = i*hzBin;
      var lower = upper - hzBin;

      if(upper>minSMR && lower<maxSMR){
      //  console.log('this bin is in: ',i,lower + ' - ' + upper);
      }

      if(upper<44){
        console.log('this bin is in: ', i , lower + ' - ' + upper );
      }


    }*/

}