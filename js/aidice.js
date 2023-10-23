var aiturncount = 0;
var airollcount = 0;
var YAHTZEE = {};
var airesults = [];
YAHTZEE.info = {};
AIYahtzee = {
	choosencategories : [false,false,false,false,false,false,false,false,false,false,false,false,false],
	dices : [],
	combinations : [],
	ones : false,
	twos : false,
	threes : false,
	fours : false,
	sixes : false,
	three_of_a_kind : false,
	four_of_a_kind : false,
	full_house : false,
	small_straight : false,
	large_straight : false,
	yahtzee : false,
	chance : false,
	scoreones : 0,
	scoretwos : 0,
	scorethrees : 0,
	scorefours : 0,
	scorefives : 0,
	scoresixes : 0,
	scorethree_of_a_kind : 0,
	scorefour_of_a_kind : 0,
	scorefull_house : 0,
	scoresmall_straight : 0,
	scorelarge_straight : 0,
	scoreyahtzee : 0,
	scorechance : 0,
	scoreuppergrid : 0,
	scorelowergrid : 0,
	bonusuppergrid : 0,
	bonuslowergrid : 0,
	countyahtzee : 0,
	gameover : false,
	disabled : 0
}
HMYahtzee = {
	dices : [],
	combinations : [],
	ones : false,
	twos : false,
	threes : false,
	fours : false,
	sixes : false,
	three_of_a_kind : false,
	four_of_a_kind : false,
	full_house : false,
	small_straight : false,
	large_straight : false,
	yahtzee : false,
	chance : false,
	scoreones : 0,
	scoretwos : 0,
	scorethrees : 0,
	scorefours : 0,
	scorefives : 0,
	scoresixes : 0,
	scorethree_of_a_kind : 0,
	scorefour_of_a_kind : 0,
	scorefull_house : 0,
	scoresmall_straight : 0,
	scorelarge_straight : 0,
	scoreyahtzee : 0,
	scorechance : 0,
	scoreuppergrid : 0,
	scorelowergrid : 0,
	bonusuppergrid : 0,
	bonuslowergrid : 0,
	countyahtzee : 0,
	gameover : false,
	disabled : 0
}
function selectaidice(p) {
	var bgimage = $("#dice" + p).css("background-image");
	var imgend = bgimage.slice(-3,-2);
	if (imgend === "g") {
		$("#dice"+ p).css("background-image", "url('./assets/images/dieselected.gif')");
	}
}

function deselectaidice(p) {
	var bgimage = $("#dice" + p).css("background-image");
	var imgend = bgimage.slice(-3,-2);
	if (imgend === "f") {
		$("#dice"+ p).css("background-image", "url('./assets/images/green.png')");
	}
}
var SMALL_STRAIGHT_MASK1 = (1 << 0) + (1 << 1) + (1 << 2) + (1 << 3);
var SMALL_STRAIGHT_MASK2 = (1 << 1) + (1 << 2) + (1 << 3) + (1 << 4);
var SMALL_STRAIGHT_MASK3 = (1 << 2) + (1 << 3) + (1 << 4) + (1 << 5);
var LARGE_STRAIGHT_MASK1 = (1 << 0) + (1 << 1) + (1 << 2) + (1 << 3) + (1 << 4);
var LARGE_STRAIGHT_MASK2 = (1 << 1) + (1 << 2) + (1 << 3) + (1 << 4) + (1 << 5);
YAHTZEE.callback = function(total, info, results) {
	airesults = results;
//	console.log("CC: " + AIYahtzee.choosencategories);
//	console.log("Callback total: " + total + " results: " + results + " aiturncount: " + aiturncount + " airollcount: " + airollcount);
	YAHTZEE.sort_results(airesults);
	deselectaidice(1);
	deselectaidice(2);
	deselectaidice(3);
	deselectaidice(4);
	deselectaidice(5);
	AIYahtzee.ones = false;
	AIYahtzee.twos = false;
	AIYahtzee.threes = false;
	AIYahtzee.fours = false;
	AIYahtzee.fives = false;
	AIYahtzee.sixes = false;
	AIYahtzee.pair = false;
	AIYahtzee.three_of_a_kind = false;
	AIYahtzee.full_house = false;
	AIYahtzee.small_straight = false;
	AIYahtzee.large_straight = false;
	AIYahtzee.four_of_a_kind = false;
	AIYahtzee.yahtzee = false;
	AIYahtzee.chance = true;
	AIYahtzee.scoreones = 0;
	AIYahtzee.scoretwos = 0;
	AIYahtzee.scorethrees = 0;
	AIYahtzee.scorefours = 0;
	AIYahtzee.scorefives = 0;
	AIYahtzee.scoresixes = 0;
	AIYahtzee.scorechance = 0;
	var equals = YAHTZEE.findCombinations(airesults);
	var sum = 0;
	for (let i = 0; i < 5; i++) {
		switch(airesults[i]) {
			case 1: AIYahtzee.ones = true;
				AIYahtzee.scoreones = AIYahtzee.scoreones + 1;
				AIYahtzee.scorechance = AIYahtzee.scorechance + 1;
				break;
			case 2: AIYahtzee.twos = true;
				AIYahtzee.scoretwos = AIYahtzee.scoretwos + 2;
				AIYahtzee.scorechance = AIYahtzee.scorechance + 2;
				break;
			case 3: AIYahtzee.threes = true;
				AIYahtzee.scorethrees = AIYahtzee.scorethrees + 3;
				AIYahtzee.scorechance = AIYahtzee.scorechance + 3;
				break;
			case 4: AIYahtzee.fours = true;
				AIYahtzee.scorefours = AIYahtzee.scorefours + 4;
				AIYahtzee.scorechance = AIYahtzee.scorechance + 4;
				break;
			case 5: AIYahtzee.fives = true;
				AIYahtzee.scorefives = AIYahtzee.scorefives + 5;
				AIYahtzee.scorechance = AIYahtzee.scorechance + 5;
				break;
			case 6: AIYahtzee.sixes = true;
				AIYahtzee.scoresixes = AIYahtzee.scoresixes + 6;
				AIYahtzee.scorechance = AIYahtzee.scorechance + 6;
				break;
			}
		}
		for (let i = 0; i < 6; i++) {
			sum = sum + equals[i];
		}
		for (let i = 0; i < 6; i++) {
			if (equals[i] > 0) {
				switch(equals[i]) {
					case 1: AIYahtzee.pair = true;
						if (AIYahtzee.three_of_a_kind == true) AIYahtzee.full_house = true;
						break;
					case 2: AIYahtzee.three_of_a_kind = true;
						if (AIYahtzee.pair == true) AIYahtzee.full_house = true;
						break;
					case 3: AIYahtzee.three_of_a_kind = true;
						AIYahtzee.four_of_a_kind = true;
						break;
					case 4: AIYahtzee.three_of_a_kind = true;
						AIYahtzee.four_of_a_kind = true;
						AIYahtzee.yahtzee = true;
						break;
				}
			}
		}
	var mask = 0;
	for (let i = 0; i < 5; i++) {
		mask = mask | (1 << (airesults[i] - 1));
	}
	if( (mask & LARGE_STRAIGHT_MASK1) == LARGE_STRAIGHT_MASK1 ) {
		AIYahtzee.large_straight = true;
		AIYahtzee.small_straight = true;
	} else if( (mask & LARGE_STRAIGHT_MASK2) == LARGE_STRAIGHT_MASK2 ) {
		AIYahtzee.large_straight = true;
		AIYahtzee.small_straight = true;
	} else if( (mask & SMALL_STRAIGHT_MASK1) == SMALL_STRAIGHT_MASK1 ) {
		AIYahtzee.small_straight = true;
	} else if( (mask & SMALL_STRAIGHT_MASK2) == SMALL_STRAIGHT_MASK2  ) {
		AIYahtzee.small_straight = true;
	} else if( (mask & SMALL_STRAIGHT_MASK3) == SMALL_STRAIGHT_MASK3  ) {
		AIYahtzee.small_straight = true;
	}
//	console.log("AI LS: " + AIYahtzee.large_straight + " SS: " + AIYahtzee.small_straight + " FH: " + AIYahtzee.full_house + " TK: " + AIYahtzee.three_of_a_kind + " FK; " + AIYahtzee.four_of_a_kind);
}
YAHTZEE.findCombinations = function(results) {
//	console.log("Findcombination: " + results);
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
//	console.log(equals);
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
