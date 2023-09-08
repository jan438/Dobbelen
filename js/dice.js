
$(document).ready(function() {
	var hmturncount = 0;
	var hmrollcount = 0;
	var history = [];
	var dice0 = $('#dice__cube0');
	var dice1 = $('#dice__cube1');
	var dice2 = $('#dice__cube2');
	var dice3 = $('#dice__cube3');
	var dice4 = $('#dice__cube4');
	var animationSpeed = dice0.css('transition-duration').split(',')[0].replace(/[^-\d\.]/g, '') * 1000;

	$("#diceform").hide();
	document.getElementById("dicebutton").click();
	setTimeout(function() {
		$('#dicebutton').trigger('click');
	}, 30000);


	$('#uppersec tbody td:nth-child(1)').click(function() {
		console.log("HTML" + $(this).html() + "Cell Index:" + $(this).index() + "Row Index:" + $(this).closest('tr').index());
		$('tr').removeClass('active-row');
		$(this).parent().addClass('active-row');
	});

	$('#lowersec tbody td:nth-child(1)').click(function() {
		console.log("HTML" + $(this).html() + "Cell Index:" + $(this).index() + "Row Index:" + $(this).closest('tr').index());
		$('tr').removeClass('active-row');
		$(this).parent().addClass('active-row');
	});

	$(".dice__scene" ).on("click", function() {
		$( this ).toggleClass( "selected" );
	});

	function selectaidice(p) {
		$("#dice"+ p).css("background-image", "url('./assets/images/dieselected.gif')");
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
		number = randomizeNumber(1, 6);
		if (number == 1) { rollDice(dice1, 'front'); }
		else if (number == 2) { rollDice(dice1, 'back'); }
		else if (number == 3) { rollDice(dice1, 'right'); }
		else if (number == 4) { rollDice(dice1,'left'); }
		else if (number == 5) { rollDice(dice1, 'top'); }
		else if (number == 6) { rollDice(dice1, 'bottom'); }
		number = randomizeNumber(1, 6);
		if (number == 1) { rollDice(dice2, 'front'); }
		else if (number == 2) { rollDice(dice2, 'back'); }
		else if (number == 3) { rollDice(dice2, 'right'); }
		else if (number == 4) { rollDice(dice2,'left'); }
		else if (number == 5) { rollDice(dice2, 'top'); }
		else if (number == 6) { rollDice(dice2, 'bottom'); }
		number = randomizeNumber(1, 6);
		if (number == 1) { rollDice(dice3, 'front'); }
		else if (number == 2) { rollDice(dice3, 'back'); }
		else if (number == 3) { rollDice(dice3, 'right'); }
		else if (number == 4) { rollDice(dice3,'left'); }
		else if (number == 5) { rollDice(dice3, 'top'); }
		else if (number == 6) { rollDice(dice3, 'bottom'); }
		number = randomizeNumber(1, 6);
		if (number == 1) { rollDice(dice4, 'front'); }
		else if (number == 2) { rollDice(dice4, 'back'); }
		else if (number == 3) { rollDice(dice4, 'right'); }
		else if (number == 4) { rollDice(dice4,'left'); }
		else if (number == 5) { rollDice(dice4, 'top'); }
		else if (number == 6) { rollDice(dice4, 'bottom'); }
		var element = document.getElementById("dice__scene0");
		console.log(element.classList);
		element.classList.add("selected");
		console.log(element.classList);
		selectaidice(3);
		setTimeout(function () { $("#dicebutton").trigger('click'); }, 30000);

		soundEffect();
	});
});