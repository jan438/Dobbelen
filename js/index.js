
var YAHTZEE = {};

YAHTZEE.info = {result_string: "", results_id: "__results"};

YAHTZEE.callback = function(total, info, results) {
}

D6.dice(5, YAHTZEE.callback, YAHTZEE.info);
