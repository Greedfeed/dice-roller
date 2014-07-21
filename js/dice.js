var dice_sides = [4, 6, 8, 10, 12, 20, 100];
		
$(document).ready(function()
{
	add_dice(dice_sides);

	$('#roll_dice').bind('click', function(event) {
		event.preventDefault();

		var data = $('#dice_combo').serialize();

		$.ajax({
			url: 'php/dice_roll.php', 
			type: 'POST',
			data: data,
			dataType: 'json',
			success: function (dice) {
				/*
					dice.dice_roll[i]['dice_amount']	//The amount of dice used in that set's roll
					dice.dice_roll[i]['dice_sides']		//The number of sides on the dice face used in that set's roll
					dice.dice_roll[i]['dice_modifier']	//The modifiers to be added to the dice used in that set's roll
					dice.dice_roll[i]['roll_total']		//The total of that set's roll without modifiers
					dice.dice_roll[i]['total']			//The total of that set's roll with modifiers
					dice.grand_total					//The total of all sets rolled with modifiers
				*/
				$('#roll_result').empty();

				for(i=0; i<dice.dice_roll.length;i++) {
					var roll_html = $('<div id="roll'+i+'" class="roll_result"><p>Roll #<span class="roll_number"></span></p><p><span class="roll_amount"></span>D<span class="roll_sides"></span> = <span class="roll_total"></span>+<span class="roll_modifier"></span> = <span class="total"></span></p></div>');
					$('#roll_result').append(roll_html);

					$('#roll'+i+' .roll_number').append((i+1));
					$('#roll'+i+' .roll_amount').append(dice.dice_roll[i]['dice_amount']);
					$('#roll'+i+' .roll_sides').append(dice.dice_roll[i]['dice_sides']);
					$('#roll'+i+' .roll_total').append(dice.dice_roll[i]['roll_total']);
					$('#roll'+i+' .roll_modifier').append(dice.dice_roll[i]['dice_modifier']);
					$('#roll'+i+' .total').append(dice.dice_roll[i]['total']);
				}
				
				$('#roll_result').append('<div id="grand_total"><p>Grand Total: '+dice.grand_total+'</p></div>');
			}
		});

	});
});


function add_dice(dice_sides) {
	dice_total = $('.dice_amount').length + 1;
	var dice_values = '';

	for(var i=0; i<dice_sides.length;i++) {
		dice_values += '<option value="'+dice_sides[i]+'">'+dice_sides[i]+'</option>';
	}

	var new_dice = $('<fieldset>'
		+'<legend>Dice # '+dice_total+'</legend>'
		+'<input name="dice_amount[]" class="dice_amount" type="number" value="1" min="1" max="9" />'
		+' D '
		+'<select name="dice_sides[]">'
			+dice_values
		+'</select>'
		+' + '
		+'<input name="dice_modifier[]" type="number" value="0" />');

	$('#more_dice').before(new_dice);
}