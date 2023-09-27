var aiturncount = 0;
var airollcount = 0;
var YAHTZEE = {};
var airesults = [];
YAHTZEE.info = {};
YAHTZEE.callback = function(total, info, results) {
	airesults = results;
	console.log("Callback total: " + total + " results: " + results + " aiturncount: " + aiturncount + " airollcount: " + airollcount);
	YAHTZEE.sort_results(airesults);
	YAHTZEE.findCombinations(results);
}
YAHTZEE.findCombinations = function(results) {
	console.log("Findcombination: " + results);
	var equals = new Array(0,0,0,0,0,0);
	var combis = new Array(0,0,0,0,0,0);
	for (let i = 0; i < 6; i++) {
		if (i < 6) {
			combis[i] = results[i];
		}
		if ((i > 0) && (combis[i-1] == combis[i])) {
			++equals[combis[i] - 1];
		}
	}
	console.log(equals);
	return equals;
}
YAHTZEE.sort_results = function(results) {
  var sorted = results;
  var temp;
  for (i = sorted.length - 1; i >= 1; --i) {
    for (j = 0; j < i; ++j) {
	if ( sorted[j] > sorted[j + 1] ) {
           temp = sorted[j];
           sorted[j] = sorted[j + 1];
           sorted[j + 1] = temp;
       }
    }
  }
}
D6.dice(5, YAHTZEE.callback, YAHTZEE.info);
