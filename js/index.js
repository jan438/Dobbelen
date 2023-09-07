
var YAHTZEE = {};

YAHTZEE.info = {};

YAHTZEE.callback = function(total, info, results) {
	console.log("Callback total: " + total + " results: " + results);
}

D6.dice(5, YAHTZEE.callback, YAHTZEE.info);
