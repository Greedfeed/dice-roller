var dice_sides = [4, 6, 8, 10, 12, 20, 100];
		
$(document).ready(function()
{
	add_dice(dice_sides);
	get_presets();

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

/**
	Adds additional dice to the play field
*/
function add_dice(dice_sides) {
	dice_total = $('.dice_amount').length + 1;
	var dice_values = '';

	for(var i=0; i<dice_sides.length;i++) {
		dice_values += '<option value="'+dice_sides[i]+'">'+dice_sides[i]+'</option>';
	}

	var new_dice = $('<fieldset id="dice'+(dice_total-1)+'" class="dice">'
		+'<legend>Dice # '+dice_total+'</legend>'
		+'<input name="dice_amount[]" class="dice_amount" type="number" value="1" min="1" max="9" />'
		+' D '
		+'<select name="dice_sides[]"  class="dice_sides">'
			+dice_values
		+'</select>'
		+' + '
		+'<input name="dice_modifier[]" class="dice_modifier" type="number" value="0" />'
		+'</fieldset>');

	$('#more_dice').before(new_dice);
}

/**
	Allows you to save certain dice combinations as presets
*/
function save_preset() {
	var preset_name = window.prompt('Please create a name for your preset:');
	var dice_total = $('.dice_amount').length;

	var dice_preset = {
		"preset_name":	preset_name
	};
	
	for(i=0;i<dice_total;i++) {
		preset_amount		= $('#dice'+i+' .dice_amount').val();
		preset_sides 		= $('#dice'+i+' .dice_sides').val();
		preset_modifier 	= $('#dice'+i+' .dice_modifier').val();

		dice_preset[i] = {
			"dice_amount": 		preset_amount,
			"dice_side": 		preset_sides,
			"dice_modifier":	preset_modifier
		};
	}

	if(typeof(Storage) !== "undefined") {
		dice_present_name = 'dice_preset_'+dice_preset.preset_name;
		stringy_dice_preset = JSON.stringify(dice_preset);

		localStorage.setItem(dice_present_name ,stringy_dice_preset);
	} 
	else {
		alert('Bummer! You can\'t save date with this browser, please use a real browser like Chrome or Firefox.');
	}

	console.log(localStorage.getItem(dice_present_name));

	get_presets();
}

/**
	Returns a list of preset dice combinations
*/
function get_presets() {
	//Clear everything but the first value to 'refresh' the list
	$('#dice_presets option:gt(0)').empty();

	//this is how we know that the saved data is a dice preset and not another value
	preset_prefix = 'dice_preset_';

	for(var i=0; i<localStorage.length; i++) {
		var preset_key = localStorage.key(i);

		//verify that this is a preset die and not another preset
		if(preset_key.indexOf(preset_prefix) > -1)
		{
			preset_option = '<option value="'+preset_key+'">'+preset_key.replace(preset_prefix, "")+'</option>';
			$('#dice_presets').append(preset_option);
		}
	}
}

function set_preset(selected_preset) {
	var selected_dice = JSON.parse(localStorage.getItem(selected_preset));
	var dice_values = '';

	$('.dice').remove();

	for(var i=1;i<Object.keys(selected_dice).length;i++){
		var dice_amount 	=  selected_dice[(i-1)].dice_amount;
		var dice_side 		=  selected_dice[(i-1)].dice_side;
		var dice_modifier 	=  selected_dice[(i-1)].dice_modifier;

		//creating the list of dice available
		for(var j=0; j<dice_sides.length;j++) {
			if (dice_side == dice_sides[j]) {
				dice_values += '<option value="'+dice_sides[j]+'" selected="selected">'+dice_sides[j]+'</option>';
			}
			else {
				dice_values += '<option value="'+dice_sides[j]+'">'+dice_sides[j]+'</option>';
			}
		}


		var new_dice = $('<fieldset id="dice'+(i-1)+'" class="dice">'
			+'<legend>Dice # '+i+'</legend>'
			+'<input name="dice_amount[]" class="dice_amount" type="number" value="'+dice_amount+'" min="1" max="9" />'
			+' D '
			+'<select name="dice_sides[]" class="dice_sides">'
				+dice_values
			+'</select>'
			+' + '
			+'<input name="dice_modifier[]" class="dice_modifier" type="number" value="'+dice_modifier+'" />'
			+'</fieldset>');

		$('#more_dice').before(new_dice);
	}
}