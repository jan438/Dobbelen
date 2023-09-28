var aiturncount = 0;
var airollcount = 0;
var YAHTZEE = {};
var airesults = [];
YAHTZEE.info = {};
var SMALL_STRAIGHT_MASK1 = (1 << 0) + (1 << 1) + (1 << 2) + (1 << 3);
var SMALL_STRAIGHT_MASK2 = (1 << 1) + (1 << 2) + (1 << 3) + (1 << 4);
var SMALL_STRAIGHT_MASK3 = (1 << 2) + (1 << 3) + (1 << 4) + (1 << 5);
var LARGE_STRAIGHT_MASK1 = (1 << 0) + (1 << 1) + (1 << 2) + (1 << 3) + (1 << 4);
var LARGE_STRAIGHT_MASK2 = (1 << 1) + (1 << 2) + (1 << 3) + (1 << 4) + (1 << 5);

YAHTZEE.callback = function(total, info, results) {
	airesults = results;
	console.log("Callback total: " + total + " results: " + results + " aiturncount: " + aiturncount + " airollcount: " + airollcount);
	YAHTZEE.sort_results(airesults);
	YAHTZEE.findCombinations(results);
	var mask = 0;
	for (let i = 0; i < 5; i++) {
		mask = mask | (1 << (results[i] - 1));
	}
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
