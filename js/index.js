D7Animator.baseUrl = './assets/images/';
var animators = [new D7Animator("die0", null, "dice"), new D7Animator("die1", null, "dice"), new D7Animator("die2", null, "dice"), new D7Animator("die3", null, "dice"), new D7Animator("die4", null, "dice")];
var yahtzee = new D7AnimGroup('dice', animators, true);

var YAHTZEE = {};

YAHTZEE.info = {result_string: "", results_id: "__results"};

YAHTZEE.callback = function(total, info, results) {
}

callback = function() {

	var dices = [yahtzee.results[0],yahtzee.results[1],yahtzee.results[2],yahtzee.results[3],yahtzee.results[4]];

}

D6.dice(5, YAHTZEE.callback, YAHTZEE.info);

function roll() {
	D7AnimGroup.get('dice').clear();
	D7AnimGroup.get('dice').setCallback(callback, null)
	D7AnimGroup.get('dice').start(yahtzee.results);
}

window.onload = roll;