var aiturncount = 0;
var airollcount = 0;
var YAHTZEE = {};
var airesults = [];
YAHTZEE.info = {};
YAHTZEE.callback = function(total, info, results) {
	airesults = results;
//	console.log("Callback total: " + total + " results: " + results + " aiturncount: " + aiturncount + " airollcount: " + airollcount);
}
YAHTZEE.findCombinations = function(results) {
	console.log("Findcombination: " + results);
}
D6.dice(5, YAHTZEE.callback, YAHTZEE.info);
