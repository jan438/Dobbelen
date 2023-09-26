var aiturncount = 0;
var airollcount = 0;
var YAHTZEE = {};
var airesults = [];
YAHTZEE.info = {};
YAHTZEE.callback = function(total, info, results) {
	airesults = results;
//	console.log("Callback total: " + total + " results: " + results + " aiturncount: " + aiturncount + " airollcount: " + airollcount);
	YAHTZEE.sort_results(airesults);
}
YAHTZEE.findCombinations = function(results) {
	console.log("Findcombination: " + results);
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
