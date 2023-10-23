// The D6Animator class
function D6Animator(id, baseUrl, key) {
	if ((typeof id != "string") || !id) return; // allows a dummy object to be created without causing errors below.
	this.id = id;
	if ((typeof key != "string") || !key) key = id;
	D6Animator.animators[id] = this;
	if (document.getElementById) {
		var targetElem = document.getElementById(id);
		if (!targetElem) {
			this.nope("Debug: The tag with specified id (" + id + ") was not found in the document.");
		} else {
			if (targetElem.nodeName.toLowerCase() == 'img') {
				this.useImages = true;
				this.targetImg = targetElem;
				var imageBank = D6Animator.getImageBank(key, baseUrl);
				this.blank = imageBank.blank;
				var i;
				for (i=1; i<7; ++i) {
					var whichDie = "die" + i;
					this[whichDie] = imageBank[whichDie];
				}
			} else {
				this.useImages = false;
				this.dieSpan = targetElem;
			}
		}
		this.seedMod = Math.round(Math.random() * 100);
		this.seedModInc = Math.round(Math.random() * 100) + 89;
		this.initSeed();
		this.args = 0;
		this.interval = 50;
		if (!this.useImages) this.interval = 10;
	} else {
		this.nope(0);
	}
}

D6Animator.animators = [];

D6Animator.get = function(id) {
	if (D6Animator.animators[id]) return D6Animator.animators[id];
	return new D6Animator(id);
}

D6Animator.imageBanks = new Object();

D6Animator.getImageBank = function(key, baseUrl) {
	var imageBank = D6Animator.imageBanks[key];
	if (!imageBank) {
		D6Animator.imageBanks[key] = new Object();
		imageBank = D6Animator.imageBanks[key];
		if (typeof baseUrl != "string")
			baseUrl = D6Animator.baseUrl;
		if (typeof baseUrl != "string") baseUrl = "";
		imageBank.blank = new Image();
		imageBank.blank.src = baseUrl + "green.png";
		var i;
		for (i=1; i<7; ++i) {
			whichDie = "die" + i;
			imageBank[whichDie] = new Object();
			imageBank[whichDie].die = new Image();
			imageBank[whichDie].die.src = baseUrl + "die-" + i + ".gif";
			imageBank[whichDie].side = new Image();
			imageBank[whichDie].side.src = baseUrl + "dices-" + i + ".gif";
			imageBank[whichDie].top = new Image();
			imageBank[whichDie].top.src = baseUrl + "dicet-" + i + ".gif";
		}
	}
	return imageBank;
}

D6Animator.prototype.setInterval = function(interval) {
	if (!interval) {
		if (this.useImages)
			interval = 50;
		else
			interval = 10;
	}
	this.interval = interval;
}

D6Animator.prototype.setCallback = function(callback, args) {
	if (typeof callback != 'function')
		return this.nope("Debug: The first argument to the setCallback method of the D6Animator class must be of type 'function'.");
	this.callback = callback;
	this.args = args;
}

D6Animator.prototype.start = function(result) {
	var targetElem = document.getElementById(this.id);
	if (!targetElem) {
		this.nope("Debug: The tag with specified id (" + this.id + ") was not found in the document.");
	} else {
		var sequence = [];
		var bgimage = $("#" + this.id).css("background-image");
		var imgend = bgimage.slice(-3,-2);
//		console.log("Background-image length: " + bgimage.length + " " + imgend);
		var state = "top";
		if (imgend === "g") {
			this.hold = false;
			if (!result || result < 1 || result > 6) result = this.randomBaseOne(6);
			var sequence = [];
			if (this.random(2) == 1) state = "side";
			var seqCount = this.random(3) + this.random(3) + this.random(3) + 2;
			if (!this.useImages) seqCount += 2;
			var thisRoll = 0;
			var i=0;
			for ( ; i<seqCount; ++i) {
				thisRoll += this.randomBaseOne(5);
				thisRoll = thisRoll % 6;
				if (!thisRoll) thisRoll = 6;
				sequence[i] = thisRoll;
			}
		}
		else {
			this.hold = true;
			result = this.oldresult;
			var i=0;
		}
	}
//	console.log("D6prototype.start dice id = " + this.id + " hold = " + this.hold + " target result = " + result);
	sequence[i] = result;
	this.result = result;
	this.animate(sequence, state);
}

D6Animator.prototype.animate = function(sequence, state) {
	if (!sequence) return this.nope("Debug: The sequence passed to the animate method of D6Animator was invalid.");
	if (typeof sequence != 'object') {
		return this.nope("Debug: The sequence passed to the animate method of D6Animator was invalid.");
	}
	var numNumbers = sequence.length;
	if (!numNumbers || numNumbers < 1)
		return this.nope("Debug: The sequence passed to the animate method of D6Animator contained no values.");
	if (state != 'top' && state != 'side') state = 'die';
	this.showImg(sequence[0], state);
	var ind = 0;
	if (state == 'die') {
		if (numNumbers == 1) {
			window.setTimeout("D6Animator.callAnimatorCallback('" + this.id + "')", this.interval);
			return true;
		}
		state = "side";
		if (this.random(2) == 0) state = "top";
		ind = 1;
	} else {
		state = "die";
	}
	var nextCall = "D6Animator.animate('" + this.id + "', ['" + sequence[ind];
	for (var i=ind+1; i<numNumbers; ++i) {
		nextCall += "','" + sequence[i];
	}
	nextCall += "'], '" + state + "')";
	window.setTimeout(nextCall, this.interval);
}

D6Animator.callAnimatorCallback = function(id) {
	var animator = D6Animator.animators[id];
	if (animator && (typeof animator == "object") && (typeof animator.callback == "function"))
		animator.callback(animator.args);
}

D6Animator.animate = function(id, sequence, state) {
	var animator = D6Animator.animators[id];
	if (animator && (typeof animator == "object") && (typeof animator.animate == "function"))
		animator.animate(sequence, state);
}

D6Animator.prototype.showImg = function(number, state) {
	if (number < 1 || number > 6 || !state) {
		if (this.useImages) {
			this.targetImg.src = this.blank.src;
		} else {
			this.dieSpan.innerHTML = "";
		}
		return;
	}
	if (this.useImages) {
		var whichDie = "die" + number;
		var dieObj = this[whichDie];
		if (!dieObj) return this.nope("Debug: The specified number (" + number + ") is not a valid number for the D6Animator.");
		var dieImg = dieObj[state];
		if (!dieImg) return this.nope("Debug: The specified state (" + state + ") is not a valid state for the D6Animator.");
		this.targetImg.src = dieImg.src;
	} else {
		this.dieSpan.innerHTML = "[" + number + "]";
	}
}

D6Animator.prototype.nope = function(msg) {
	if (msg) {
		alert(msg + "\n\n(If you're not the developer for this application, please contact the owner of this website!)");
	} else {
		alert("Either your browser can't handle this application, or there's a bug.\nEither way, you're out of luck right now.\nIf you think this is a bug, please contact the owner of this site!");
	}
	return false;
}

D6Animator.prototype.randomBaseOne = function(n) {
	var m = this.random(n);
	return m+1;
}

D6Animator.prototype.random = function(n) {
	if (!this.seed) this.reInitSeed();
	this.seed = (0x015a4e35 * this.seed) % 0x7fffffff;
	return (this.seed >> 16) % n;
}

D6Animator.prototype.initSeed = function() {
	var now = new Date();
	this.seed = (this.seedMod + now.getTime()) % 0xffffffff;
}

D6Animator.prototype.reInitSeed = function() {
	this.seedMod += this.seedModInc;
	this.initSeed();
}

// The D6AnimGroup class
function D6AnimGroup(id, animators, isSequenced) {  // The animators argument is an array of D6Animator and/or D6AnimGroup objects.
	if ((typeof id != "string") || !id) return; // allows a dummy object to be created without causing errors below.
	this.id = id;
	this.roll = 0;
	this.bestSelection = null;
	this.bestEValue = -1.0;
	this.categoryHasBeenChosen = new Array();
	this.setBestSelection = function(selection) {
		this.bestSelection = selection;
	}
	this.getBestSelection = function() {
		return this.bestSelection;
	}
	this.allSelections = new HashMap();
	for (d0 = 0; d0 <= 1; d0++) {
			for (d1 = 0; d1 <= 1; d1++) {
				for (d2 = 0; d2 <= 1; d2++) {
					for (d3 = 0; d3 <= 1; d3++) {
						for (d4 = 0; d4 <= 1; d4++) {
							var arr = new Array(5);
							arr[0] = (d0 == 0) ? 0 : 1;
							arr[1] = (d1 == 0) ? 0 : 1;
							arr[2] = (d2 == 0) ? 0 : 1;
							arr[3] = (d3 == 0) ? 0 : 1;
							arr[4] = (d4 == 0) ? 0 : 1;
							var combo = new D6DiceSelection(arr);
							this.allSelections.put(arr[0].toString() + arr[1].toString() + arr[2].toString() + arr[3].toString() + arr[4].toString(), combo);
						}
					}
				}
			}
		}
	D6AnimGroup.animgroups[id] = this;
	this.animators = animators;
	this.length = animators.length;
	this.args = 0;
	this.isSequenced = isSequenced;
}

D6AnimGroup.animgroups = [];

D6AnimGroup.get = function(id) {
	return D6AnimGroup.animgroups[id];
}
function D6DiceSelection(arr) {
	this.arr = arr;
	this.evalue = 0.0;
	this.logprivatevariables = function() {
//		console.log(" arr: " + this.arr + " evalue: "+ this.evalue);
	}
	this.resetEValue = function() {
		this.evalue = 0.0;
	}
	this.addEValue = function(evalprm) {
		this.evalue = this.evalue + evalprm;
	}
	this.getEValue = function() {
		return this.evalue;
	}
}
function D6DiceCombination(arr) {
	this.arr = arr;
	this.category = 0;
	this.score = 0;
	this.probability = 0.0;
	this.evalue = 0.0;
	this.updateCombination = function(category, score, selectedDice) {
		this.category = category;
		this.score = score;
		var diceRerolled = 0;
		for (i = 0; i < selectedDice.length; i++) {
			if (selectedDice[i] == 1)
				diceRerolled++;
		}
		this.probability = Math.pow((1.0/6.0), diceRerolled);
		this.evalue = this.probability * score;
	}
	this.getNonmatchingDiceForReroll = function(dice) {
	}
	this.getCombination = function() {
	}
	this.getEValue = function() {
		return this.evalue;
	}
}

D6AnimGroup.prototype.generateDiceCombinations = function(selections, dice) {
	var countDiceCombinations = 0;
	var result=[];
	var lb0 = (selections[0] == 0 ? dice[0] : 1);
	var ub0 = (selections[0] == 0 ? dice[0] : 6);
	for (d0 = lb0; d0 <= ub0; d0++) {
		var lb1 = (selections[1] == 0 ? dice[1] : 1);
		var ub1 = (selections[1] == 0 ? dice[1] : 6);
		for (d1 = lb1; d1 <= ub1; d1++) {
			var lb2 = (selections[2] == 0 ? dice[2] : 1);
			var ub2 = (selections[2] == 0 ? dice[2] : 6);
			for (d2 = lb2; d2 <= ub2; d2++) {
				var lb3 = (selections[3] == 0 ? dice[3] : 1);
				var ub3 = (selections[3] == 0 ? dice[3] : 6);
				for (d3 = lb3; d3 <= ub3; d3++) {
					var lb4 = (selections[4] == 0 ? dice[4] : 1);
					var ub4 = (selections[4] == 0 ? dice[4] : 6);
					for (d4 = lb4; d4 <= ub4; d4++) {
						var arr = [ d0, d1, d2, d3, d4 ];
						var combo = new D6DiceCombination(arr);
						result.push(combo);
						countDiceCombinations++;
					}
				}
			}
		}
	}
//	console.log("CountDiceCombinations: " + countDiceCombinations);
	return result;
}
D6AnimGroup.prototype.chooseBestCategory = function(combination) {
	var categoryIndex = 0;
	var highestScore = -1;
	var animatorgroup = D6AnimGroup.get("dice_0");
	for (category = 0; category < 13; category++) {
		if (animatorgroup.categoryHasBeenChosen[category] === "false") {
			var isValid = this.isDiceValidForCategory(combination, category);
			var score = 0;
			if (isValid) score = this.calculateCategoryScore(category, combination);
			if (score > highestScore) {
				highestScore = score;
				categoryIndex = category;
			}
		}
	}
	return categoryIndex;
}
D6AnimGroup.prototype.calculateCategoryScore = function(category, dice) {
	const ONES = 0;
	const TWOS = 1;
	const THREES = 2;
	const FOURS = 3;
	const FIVES = 4;
	const SIXES = 5;
	const THREE_OF_A_KIND = 6;
	const FOUR_OF_A_KIND = 7;
	const FULL_HOUSE = 8;
	const SMALL_STRAIGHT = 9;
	const LARGE_STRAIGHT = 10;
	const YAHTZEE = 11;
	const CHANCE = 12;
	const FULL_HOUSE_SCORE = 25;
	const SMALL_STRAIGHT_SCORE = 30;
	const LARGE_STRAIGHT_SCORE = 40;
	const YAHTZEE_SCORE = 50;
	switch (category) {
		case ONES:
		case TWOS:
		case THREES:
		case FOURS:
		case FIVES:
		case SIXES:
			return this.sumDice(dice, category + 1);
		case THREE_OF_A_KIND:
			return this.sumDice(dice, 0);
		case FOUR_OF_A_KIND:
			return this.sumDice(dice, 0);
		case FULL_HOUSE:
			return FULL_HOUSE_SCORE;
		case SMALL_STRAIGHT:
			return SMALL_STRAIGHT_SCORE;
		case LARGE_STRAIGHT:
			return LARGE_STRAIGHT_SCORE;
		case YAHTZEE:
			return YAHTZEE_SCORE;
		case CHANCE:
			return this.sumDice(dice, 0);
		default:
			return 0;
	}

}
D6AnimGroup.prototype.sumDice = function(dice, dieValueRequirement) {
	var result = 0;
	for (i = 0; i < 5; i++) {
		if (dieValueRequirement == 0) {
			result = result + dice[i];
		} else {
			if (dice[i] == dieValueRequirement)
				result = result + dice[i];
		}
	}
	return result;
}
D6AnimGroup.prototype.isDiceValidForCategory = function(combination, category) {
	const ONES = 0;
	const SIXES = 5;
	const THREE_OF_A_KIND = 6;
	const FOUR_OF_A_KIND = 7;
	const FULL_HOUSE = 8;
	const SMALL_STRAIGHT = 9;
	const LARGE_STRAIGHT = 10;
	const YAHTZEE = 11;
	const CHANCE = 12;
	var tempboolean = false;
	tempboolean = (category >= ONES && category <= SIXES);
	if (tempboolean == true) {
		for (i = 0; i < 5; i++) {
			if ((combination[i] - 1) == category) return true;
		}
	}
	switch (category) {
		case THREE_OF_A_KIND:
			return this.isNOfAKind(3, combination, false);
		case FOUR_OF_A_KIND:
			return this.isNOfAKind(4, combination, false);
		case FULL_HOUSE:
			return (this.isNOfAKind(3, combination, true) && this.isNOfAKind(2, combination, true));
		case SMALL_STRAIGHT:
			return (this.isSmallStraight(combination) || this.isLargeStraight(combination));
		case LARGE_STRAIGHT:
			return this.isLargeStraight(combination);
		case YAHTZEE:
			return this.isNOfAKind(5, combination, false);
		case CHANCE:
			return true;
		default:
			return false;
	}
	return tempboolean;
}
D6AnimGroup.prototype.isSmallStraight = function(dice) {
	const SSM1 = 15;
	const SSM2 = 30;
	const SSM3 = 60;
	var mask = 0;
	for (i = 0; i < 5; i++) {
		mask = mask | (1 << (dice[i] - 1));
	}
	if ((mask & SSM1) == SSM1) {
		return true;
	} else if ((mask & SSM2) == SSM2) {
		return true;
	} else if ((mask & SSM3) == SSM3) {
		return true;
		}
	return false;
}
D6AnimGroup.prototype.isLargeStraight = function(dice) {
	const LSM1 = 31;
	const LSM2 = 62;
	var mask = 0;
	for (i = 0; i < 5; i++) {
		mask = mask | (1 << (dice[i] - 1));
	}
	if ((mask & LSM1) == LSM1) {
		return true;
	} else if ((mask & LSM2) == LSM2) {
		return true;
	}
	return false;
}
D6AnimGroup.prototype.isNOfAKind = function(n, dice, exact) {
	var result = false;
	var equals = new Array(0,0,0,0,0,0);
	for (i = 0; i < 5; i++) {
		equals[dice[i] - 1]++;
	}
	for (i = 0; i < equals.length; i++) {
		if (exact) {
			if (equals[i] == n)
				return true;
		} else {
			if (equals[i] >= n)
				return true;
		}
	}
	return result;
}
D6AnimGroup.prototype.start = function(results) {
	this.results = results;
	this.completions = [];
	var i;
	for (i=0; i<this.length; ++i) {
		var args = {'id': this.id, 'index' : i};
		this.animators[i].setCallback(D6AnimGroup.animgroupCallback, args);
		this.completions[i] = 0;
	}
	for (i=0; i<this.length; ++i) {
		if (!i || !this.isSequenced) {
			this.animators[i].start(this.results[i]);
		}
	}
//	console.log("D6 AnimGroup: " + this.id + " results: " + results);
	this.categoryHasBeenChosen = [false,false,false,false,false,false,false,false,false,false,false,false,false];
	this.categoryHasBeenChosen[0] = $('#aione').hasClass('aihighlight');
	this.categoryHasBeenChosen[1] = $('#aitwo').hasClass('aihighlight');
	this.categoryHasBeenChosen[2] = $('#aithree').hasClass('aihighlight');
	this.categoryHasBeenChosen[3] = $('#aifour').hasClass('aihighlight');
	this.categoryHasBeenChosen[4] = $('#aifive').hasClass('aihighlight');
	this.categoryHasBeenChosen[5] = $('#aisix').hasClass('aihighlight');
	this.categoryHasBeenChosen[6] = $('#aithreeofak').hasClass('aihighlight');
	this.categoryHasBeenChosen[7] = $('#aifourofak').hasClass('aihighlight');
	this.categoryHasBeenChosen[8] = $('#aifullhouse').hasClass('aihighlight');
	this.categoryHasBeenChosen[9] = $('#aismallstreet').hasClass('aihighlight');
	this.categoryHasBeenChosen[10] = $('#ailargestreet').hasClass('aihighlight');
	this.categoryHasBeenChosen[11] = $('#aiyahtzee').hasClass('aihighlight');
	this.categoryHasBeenChosen[12] = $('#aichance').hasClass('aihighlight');
	var bestSelectionroll = this.getBestSelection();
	console.log('bestSelection: ' + JSON.stringify(bestSelectionroll));
	var bestEValueroll = this.bestEValue;
	var values = this.allSelections.toArray();
	for (i = 0; i < values.length; i++) {
		var selectionCombo = values[i];
		var selectedDice = selectionCombo['arr'];
		var selectedDicename = JSON.stringify(selectedDice);
//		console.log(selectedDice);
		selectionCombo.resetEValue();
		this.allCombinations = this.generateDiceCombinations(selectionCombo['arr'], this.results);
//		console.log("generateAllCombinations length: " + this.allCombinations.length);
		for (j = 0; j < this.allCombinations.length; j++) {
			combinationclass = this.allCombinations[j];
			combination = combinationclass['arr'];
			var category = this.chooseBestCategory(combination);
			var isValid = this.isDiceValidForCategory(combination, category);
			var score = 0;
			if (isValid) score = this.calculateCategoryScore(category, combination);
			combinationclass.updateCombination(category, score, selectedDice);
			var evalue = combinationclass.getEValue();
			selectionCombo.addEValue(evalue);
		}
		if (selectionCombo.getEValue() > bestEValueroll) {
			bestSelectionroll = selectionCombo;
			bestEValueroll = selectionCombo.getEValue();
		}
		selectionCombo.logprivatevariables();
	}
	if (bestSelectionroll != null) {
		bestSelectionroll.logprivatevariables();
		this.setBestSelection(bestSelectionroll);
		var holdinfo = bestSelectionroll['arr'];
		if (holdinfo[0] == 0) {
			$("#dice1").css("background-image", "url('./assets/images/dieselected.gif')");
		}
		else {
			$("#dice1").css("background-image", "url('./assets/images/green.png')");
		}
		if (holdinfo[1] == 0) {
			$("#dice2").css("background-image", "url('./assets/images/dieselected.gif')");
		}
		else {
			$("#dice2").css("background-image", "url('./assets/images/green.png')");
		}
		if (holdinfo[2] == 0) {
			$("#dice3").css("background-image", "url('./assets/images/dieselected.gif')");
		}
		else {
			$("#dice3").css("background-image", "url('./assets/images/green.png')");
		}
		if (holdinfo[3] == 0) {
			$("#dice4").css("background-image", "url('./assets/images/dieselected.gif')");
		}
		else {
			$("#dice4").css("background-image", "url('./assets/images/green.png')");
		}
		if (holdinfo[4] == 0) {
			$("#dice5").css("background-image", "url('./assets/images/dieselected.gif')");
		}
		else {
			$("#dice5").css("background-image", "url('./assets/images/green.png')");
		}
	}
}

D6AnimGroup.prototype.setCallback = function(callback, args) {
	if (typeof callback != 'function')
		return alert("Debug: The first argument to the setCallback method of the D6AnimGroup class must be of type 'function'.");
	this.callback = callback;
	this.args = args;
}

D6AnimGroup.prototype.notify = function(args) {
	var argsstr = JSON.stringify(args);
	var whichAnim = args.index;
	var animator = this.animators[whichAnim];
	var result = this.results[whichAnim];
	if (argsstr.indexOf("dice_0") > 0) {
		if (animator.hold == false) {
			animator.oldresult = result;
		}
		else {
			result = animator.oldresult;
		}
//		console.log("D6notify " + animator.id + " oldresult = " + animator.oldresult + " result = " + result);
	}
	this.completions[whichAnim]++;
	var numNonZero = 0;
	for (var i=0; i<this.length; ++i) {
		if (this.completions[i])
			numNonZero++;
	}
	if (numNonZero == this.length) {
		this.callback(this.args);
	} else if (this.isSequenced) {
		this.animators[1 + whichAnim].start(this.results[1 + whichAnim]);
	}
}

D6AnimGroup.animgroupCallback = function(args) {
	var id = args.id;
	var animGroup = D6AnimGroup.animgroups[id];
	if (!animGroup) return false;
	animGroup.notify(args);
}

// The D6AnimBuilder class
function D6AnimBuilder(id, results, locations, baseUrl, groupsize, interval, useImages) {
//	console.log("D6AnimBuilder" + id + " results " + JSON.stringify(results));
	if (!id) return; // allows a dummy object to be created without causing errors
	this.id = id;
	D6AnimBuilder.animBuilders[id] = this;
	this.results = results;
	if (!locations || (typeof locations != 'object') || !locations.length) locations = [];
	for (var c=locations.length; c<results.length; ++c) {
		locations[c] = "die" + (c+1);
	}
	this.locations = locations;
	if (!baseUrl) baseUrl = "./assets/images/";
	this.baseUrl = baseUrl;
	this.groupsize = groupsize;
	this.numGroups = Math.floor(results.length / groupsize);
	this.interval = interval;
	this.useImages = useImages;
	this.callback = null;
	this.callbackData = null;
}

D6AnimBuilder.animBuilders = [];

D6AnimBuilder.get = function(id) {
	return D6AnimBuilder.animBuilders[id];
}

D6AnimBuilder.prototype.reset = function() {
//	console.log("D6prototype.reset " + JSON.stringify(this.results));
	var i;
	for (i=0; i<this.results.length; ++i) {
		this.results[i] = 0;
	}
	for (i=0; i<this.layout.length; ++i) {
		var dieSpan = document.getElementById("sidebar_" + i);
		dieSpan.innerHTML = "";
	}
}

D6AnimBuilder.prototype.genDiceHtml = function(layout, callback, callbackData) {
//	console.log("D6prototype.genDiceHtml");
	this.layout = layout;
	this.callback = callback;
	this.callbackData = callbackData;
	var dieCount = 0;
	var genHtml = "";
	var numTotalImgs = this.groupsize * this.numGroups;
	for (var i=0; i<layout.length; ++i) {
		if (dieCount >= numTotalImgs) break;
		genHtml += "<div id='" + this.id + "_diceGroup_" + i + "' class='diceGroup'>";
		var imgsThisRow = layout[i] * this.groupsize;
		for (var j=0; j<imgsThisRow; ++j) {
			++dieCount;
			if (dieCount > numTotalImgs) break;
			if (this.useImages) {
				genHtml += "<img id='" + this.id + dieCount + "' class='die' src='" + this.baseUrl + "green.png' />";
			} else {
				genHtml += "<span id='" + this.id + dieCount + "' class='dieNumber'>&nbsp;</span> ";
			}
		}
		genHtml += " <span id='sidebar_" + i + "' class='sidebar'></span>";
		genHtml += "</div>\n";
	}
	return genHtml;
}

D6AnimBuilder.prototype.start = function() {
//	console.log("D6prototype.start");
	D6Animator.baseUrl = this.baseUrl;
	var animGroups = [];
	var resultsGroups = [];
	var dieCount = 0;
	var animators = [];
	var resultsGroup = [];
	for (var j=0; j<5; ++j) {
		++dieCount;
//		console.log("D6prototype.start " + this.id + dieCount);
		var oldanimator = D6Animator.get(this.id + dieCount);
		if (oldanimator) {
			animators[j] = oldanimator;
		}
		else {
			animators[j] = new D6Animator(this.id + dieCount);
		}
		animators[j].setInterval(this.interval);
		resultsGroup[j] = this.results[j];
		if (!resultsGroup[j]) {
			resultsGroup[j] = animators[j].randomBaseOne(6);
			this.results[j] = resultsGroup[j];
		}
	}
	var oldanimatorgroup = D6AnimGroup.get(this.id + "_" + 0);
	if (oldanimatorgroup) {
		animGroups[0] = oldanimatorgroup;
	}
	else {
		animGroups[0] = new D6AnimGroup(this.id + "_" + 0, animators, false);
	}
	resultsGroups[0] = resultsGroup;
	this.animGroups = animGroups;
	this.resultsGroups = resultsGroups;
	var animTopGroup = new D6AnimGroup(this.id, this.animGroups, true);
	if (this.callback)
		animTopGroup.setCallback(this.callback, this.callbackData);
	animTopGroup.start(this.resultsGroups);
}

function D6() {}

D6.dice = function(numDice, callback, callbackData) {
//	console.log("D6Dice");
	D6.numDice = 5;
	D6.numDiceShown = 5;
	var results = [];
	var i;
	for (i=0; i<5; ++i) {
		results[i] = 0;
	}
	var builder = new D6AnimBuilder("dice", results, null, "", 5, 50, true);
	D6.builder = builder;
	var layout = [1];
	if (!callbackData) callbackData = null;
	var middleManData = {
		"id" : "dice",
		"callback" : callback,
		"callbackData" : callbackData
	};
	var genHtml = "<div id='diceall'>" + builder.genDiceHtml(layout, D6.middleManCallback, middleManData);
	genHtml += "<div id='diceform'><form><input type='button' id='dicebutton' value='Roll Dice' onclick='D6AnimBuilder.get(\"dice\").reset(); D6AnimBuilder.get(\"dice\").start()' /></form></div>";
	D6.genHtml = genHtml;
	document.getElementById('smalldices').innerHTML = genHtml;
}

D6.middleManCallback = function(middleManData) {
//	console.log("D6middleManCallback");
	var callback = middleManData.callback;
	if (typeof callback != "function") {
		return;
	}
	var id = middleManData.id;
	var callbackData = middleManData.callbackData;
	var results = [];
	var resultsTotal = 0;
	var i;
	for (i=0; i<D6.numDiceShown; ++i) {
		j = i + 1;
		var animator = D6Animator.get(id + j);
		var result = animator.result;
		results[i] = result;
		resultsTotal += results[i];
	}
	callback(resultsTotal, callbackData, results);
}
