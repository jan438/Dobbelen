
$(document).ready(function() {
  var history = [];
  var dice = $('#dice__cube0');
  var animationSpeed = dice.css('transition-duration').split(',')[0].replace(/[^-\d\.]/g, '') * 1000;

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

		if (number == 1) { rollDice(dice, 'front'); }
		else if (number == 2) { rollDice(dice, 'back'); }
		else if (number == 3) { rollDice(dice, 'right'); }
		else if (number == 4) { rollDice(dice,'left'); }
		else if (number == 5) { rollDice(dice, 'top'); }
		else if (number == 6) { rollDice(dice, 'bottom'); }

		soundEffect();
	});
});