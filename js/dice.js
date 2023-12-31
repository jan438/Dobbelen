
$(document).ready(function() {
	var history = [];
	var dice0 = $('#dice__cube0');
	var dice1 = $('#dice__cube1');
	var dice2 = $('#dice__cube2');
	var dice3 = $('#dice__cube3');
	var dice4 = $('#dice__cube4');
	var animationSpeed = dice0.css('transition-duration').split(',')[0].replace(/[^-\d\.]/g, '') * 1000;
	var turncounter = 0;
	var val;
	var hmresults = [0,0,0,0,0];
	var hmdicetabel = [1,6,4,3,2,5];
	var dicesides = ['front','back','right','left','top','bottom'];
	var random = Math.floor((Math.random() * 6));
	rollDice(dice0, dicesides[random]);
	random = Math.floor((Math.random() * 6));
	rollDice(dice1, dicesides[random]);
	random = Math.floor((Math.random() * 6));
	rollDice(dice2, dicesides[random]);
	random = Math.floor((Math.random() * 6));
	rollDice(dice3, dicesides[random]);
	random = Math.floor((Math.random() * 6));
	rollDice(dice4, dicesides[random]);

	$("#diceform").hide();
	$("#dice1").css("background-image", "url('./assets/images/green.png')");
	$("#dice2").css("background-image", "url('./assets/images/green.png')");
	$("#dice3").css("background-image", "url('./assets/images/green.png')");
	$("#dice4").css("background-image", "url('./assets/images/green.png')");
	$("#dice5").css("background-image", "url('./assets/images/green.png')");

	$("#dicebutton").click();

	$('#uppersec tbody td:nth-child(1)').click(function() {
//		console.log("Upper HTML " + $(this).html() + " Cell Index: " + $(this).index() + " Row Index: " + $(this).closest('tr').index());
		$('tr').removeClass('active-row');
		$(this).parent().addClass('active-row');
	});

	$('#lowersec tbody td:nth-child(1)').click(function() {
//		console.log("Lower HTML " + $(this).html() + " Cell Index: " + $(this).index() + " Row Index: " + $(this).closest('tr').index());
		$('tr').removeClass('active-row');
		$(this).parent().addClass('active-row');
	});

	$('#uppersec tbody td:nth-child(2)').click(function() {
//		console.log("Upper HTML " + $(this).html() + " Cell Index: " + $(this).index() + " Row Index: " + $(this).closest('tr').index());
	});

	$('#lowersec tbody td:nth-child(2)').click(function() {
//		console.log("Lower HTML " + $(this).html() + " Cell Index: " + $(this).index() + " Row Index: " + $(this).closest('tr').index());
	});

	$(".dice__scene" ).on("click", function() {
		$( this ).toggleClass( "selected" );
	});

	function switchturnhmind(p) {
		$('#turnhm' + p).css("background-color", "yellow");
		$("#turnhm" + p).fadeOut(0.5);
		$("#turnhm" + p).fadeIn(5000);
		turncounter++;
	}
	function switchturnaiind(p) {
		$('#turnai' + p).css("background-color", "yellow");
		$("#turnai" + p).fadeOut(0.5);
		$("#turnai" + p).fadeIn(5000);
		turncounter++;
	}

	function randomizeNumber(low, high) {
		var random = Math.floor((Math.random() * high) + low);
		return random;
	}

	function rollDice(diceprm, side) {
		var currentClass = diceprm.attr('class').split(' ')[0];
		var newClass = 'show-' + side;

		diceprm.removeClass();

    if (currentClass == newClass) {
			diceprm.addClass(newClass + ' show-same');

      setTimeout(function() {
        diceprm.removeClass('show-same');
      }, animationSpeed);
		} else {
      diceprm.addClass(newClass);
    }

    history.push(side);
	}

	function soundEffect() {
		var audio = $("#dice__audio")[0];
		audio.pause();
		audio.currentTime = 0;
		audio.play();
	}

	$('#dice__btn').on('click ', function() {
		var number = randomizeNumber(1, 6);

		if (number == 1) { rollDice(dice0, 'front'); }
		else if (number == 2) { rollDice(dice0, 'back'); }
		else if (number == 3) { rollDice(dice0, 'right'); }
		else if (number == 4) { rollDice(dice0,'left'); }
		else if (number == 5) { rollDice(dice0, 'top'); }
		else if (number == 6) { rollDice(dice0, 'bottom'); }
		hmresults[0] = hmdicetabel[number-1];
		number = randomizeNumber(1, 6);
		if (number == 1) { rollDice(dice1, 'front'); }
		else if (number == 2) { rollDice(dice1, 'back'); }
		else if (number == 3) { rollDice(dice1, 'right'); }
		else if (number == 4) { rollDice(dice1,'left'); }
		else if (number == 5) { rollDice(dice1, 'top'); }
		else if (number == 6) { rollDice(dice1, 'bottom'); }
		hmresults[1] = hmdicetabel[number-1];
		number = randomizeNumber(1, 6);
		if (number == 1) { rollDice(dice2, 'front'); }
		else if (number == 2) { rollDice(dice2, 'back'); }
		else if (number == 3) { rollDice(dice2, 'right'); }
		else if (number == 4) { rollDice(dice2,'left'); }
		else if (number == 5) { rollDice(dice2, 'top'); }
		else if (number == 6) { rollDice(dice2, 'bottom'); }
		hmresults[2] = hmdicetabel[number-1];
		number = randomizeNumber(1, 6);
		if (number == 1) { rollDice(dice3, 'front'); }
		else if (number == 2) { rollDice(dice3, 'back'); }
		else if (number == 3) { rollDice(dice3, 'right'); }
		else if (number == 4) { rollDice(dice3,'left'); }
		else if (number == 5) { rollDice(dice3, 'top'); }
		else if (number == 6) { rollDice(dice3, 'bottom'); }
		hmresults[3] = hmdicetabel[number-1];
		number = randomizeNumber(1, 6);
		if (number == 1) { rollDice(dice4, 'front'); }
		else if (number == 2) { rollDice(dice4, 'back'); }
		else if (number == 3) { rollDice(dice4, 'right'); }
		else if (number == 4) { rollDice(dice4,'left'); }
		else if (number == 5) { rollDice(dice4, 'top'); }
		else if (number == 6) { rollDice(dice4, 'bottom'); }
		hmresults[4] = hmdicetabel[number-1];
//		console.log("Human results: " + hmresults);
		$("#dicebutton").click();
		var element = document.getElementById("dice__scene0");
//		console.log(element.classList);
		element.classList.add("selected");
//		console.log(element.classList);
		val = (turncounter % 6);
		switch( val ) {
			case 0: switchturnhmind(1);
			break;
			case 1: switchturnhmind(2);
			break;
			case 2: switchturnhmind(3);
			break;
			case 3: switchturnaiind(1);
			break;
			case 4: switchturnaiind(2);
			break;
			case 5: switchturnaiind(3);
			break
			default:
		}
		soundEffect();
	});
});