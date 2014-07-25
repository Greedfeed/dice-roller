
set_dice();
get_presets();

document.getElementById('roll_dice').onclick = function() {
	event.preventDefault();

	var data = serialize(document.getElementById('dice_combo'));

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 ) {
			if (xmlhttp.status==200) {
				dice = JSON.parse(xmlhttp.responseText);
				/*
					dice.dice_roll[i]['dice_amount']	//The amount of dice used in that set's roll
					dice.dice_roll[i]['dice_sides']		//The number of sides on the dice face used in that set's roll
					dice.dice_roll[i]['dice_modifier']	//The modifiers to be added to the dice used in that set's roll
					dice.dice_roll[i]['roll_total']		//The total of that set's roll without modifiers
					dice.dice_roll[i]['total']			//The total of that set's roll with modifiers
					dice.grand_total					//The total of all sets rolled with modifiers
				*/

				var roll_result = document.getElementById('roll_result');
				roll_result.innerHTML = '';

				for(var i=0; i<dice.dice_roll.length;i++) {
					var roll_html = '<div id="roll'+i+'" class="roll_result"><p>Roll #<span class="roll_number"></span></p><p><span class="roll_amount"></span>D<span class="roll_sides"></span> = <span class="roll_total"></span>+<span class="roll_modifier"></span> = <span class="total"></span></p></div>';
					roll_result.innerHTML = roll_result.innerHTML + roll_html;

					var current_die = document.getElementById('roll'+i);

					var roll_number 	= current_die.getElementsByClassName('roll_number')[0];
					var dice_amount 	= current_die.getElementsByClassName('roll_amount')[0];
					var dice_sides 		= current_die.getElementsByClassName('roll_sides')[0];
					var roll_total		= current_die.getElementsByClassName('roll_total')[0];
					var dice_modifier	= current_die.getElementsByClassName('roll_modifier')[0];
					var total 			= current_die.getElementsByClassName('total')[0];

					roll_number.innerHTML 	= (i+1);
					dice_amount.innerHTML 	= dice.dice_roll[i]['dice_amount'];
					dice_sides.innerHTML 	= dice.dice_roll[i]['dice_sides'];
					roll_total.innerHTML 	= dice.dice_roll[i]['roll_total'];
					dice_modifier.innerHTML = dice.dice_roll[i]['dice_modifier'];
					total.innerHTML 		= dice.dice_roll[i]['total'];
				}

				roll_result.innerHTML = roll_result.innerHTML + '<div id="grand_total"><p>Grand Total: '+dice.grand_total+'</p></div>';
			}
			else  {
				alert('You need at least Internet Explorer 8 or better to roll dice. Embrace change you luddite.');
			}
		}
	}
	
	xmlhttp.open('POST','php/dice_roll.php',true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	xmlhttp.send(data);
}

/**
	sets dice to the play field
*/
function set_dice(dice_amount, dice_side, dice_modifier, dice_sides_override) {
	//default set of dice
	var dice_sides = [4, 6, 8, 10, 12, 20, 100];

	//make sure values are defined, otherwise use default values
	dice_amount 	= typeof dice_amount !== 'undefined' ? dice_amount : 1;
	dice_side 		= typeof dice_side !== 'undefined' ? dice_side : dice_sides[0];
	dice_modifier 	= typeof dice_modifier !== 'undefined' ? dice_modifier : 0;
	dice_sides 		= typeof dice_sides_override !== 'undefined' ? dice_sides_override : dice_sides;

	dice_total = document.getElementsByClassName('dice_amount').length + 1;

	var dice_values = '';
	//creating the list of dice available
	for(var i=0; i<dice_sides.length;i++) {
		if (dice_side == dice_sides[i]) {
			dice_values += '<option value="'+dice_sides[i]+'" selected="selected">'+dice_sides[i]+'</option>';

		} else {
			dice_values += '<option value="'+dice_sides[i]+'">'+dice_sides[i]+'</option>';
		}
	}

	var dice_removal_link = '';
	if(dice_total > 1){
		dice_removal_link = ' <a href="javascript:void(0);" class="remove_dice" onclick="remove_dice('+(document.getElementsByClassName('dice_amount').length)+');">Remove die</a> ';
	}

	//constructing the HTML and preset values
	var new_dice = '<fieldset id="dice'+(dice_total-1)+'" class="dice">'
		+'<legend class="dice_title">Dice # '+dice_total+'</legend>'
		+'<input name="dice_amount[]" class="dice_amount" type="number" value="'+dice_amount+'" min="1" max="9" />'
		+' D '
		+'<select name="dice_sides[]"  class="dice_sides">'
			+dice_values
		+'</select>'
		+' + '
		+'<input name="dice_modifier[]" class="dice_modifier" type="number" value="'+dice_modifier+'" />'
		+dice_removal_link
		+'</fieldset>';

	var set_dice = document.getElementById('set_dice');
	set_dice.insertAdjacentHTML('beforebegin', new_dice);
}

/**
	Removes unwanted dice from the set
*/
function remove_dice(dice_number_removed) {
	document.getElementById('dice'+dice_number_removed).parentNode.removeChild(document.getElementById('dice'+dice_number_removed));

	var total_dice = document.getElementsByClassName('dice_amount').length;
	for (var i=0; i<=total_dice; i++) {
		var dice = document.getElementById('dice'+i);
		
		if(i>dice_number_removed && dice != null ) {
			//must change these before the ID or ruin the selection
			dice.getElementsByClassName('dice_title')[0].innerHTML =  'Dice # '+i;
			dice.getElementsByClassName('remove_dice')[0].setAttribute('onclick', 'remove_dice('+(i-1)+')');

			document.getElementById('dice'+i).setAttribute('id', 'dice'+(i-1));
		}
	}
}

/**
	Allows you to save certain dice combinations as presets
*/
function save_preset() {
	var preset_name = window.prompt('Please create a name for your preset:');
	var dice_total = document.getElementsByClassName('dice_amount').length;

	if (preset_name != null)
	{
		var dice_preset = {
			"preset_name":	preset_name
		};
		
		for(var i=0;i<dice_total;i++) {
			var dice = document.getElementById('dice'+i);

			preset_amount		= dice.getElementsByClassName('dice_amount')[0].value;
			preset_sides 		= dice.getElementsByClassName('dice_sides')[0].value;
			preset_modifier 	= dice.getElementsByClassName('dice_modifier')[0].value;

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

		get_presets(preset_name);
	}
}

/**
	Returns a list of preset dice combinations
*/
function get_presets(preset_name) {
	//Clear everything but the first value to 'refresh' the list

	preset_name 	= typeof preset_name !== 'undefined' ? preset_name : undefined;

	//this is how we know that the saved data is a dice preset and not another value
	var preset_prefix = 'dice_preset_';

	var preset_option = '<option>Select from a saved preset below</option>'
	for(var i=0; i<localStorage.length; i++) {
		var preset_key = localStorage.key(i);

		//verify that this is a preset die and not another preset
		if(preset_key.indexOf(preset_prefix) > -1)
		{
			if (preset_name != undefined)
			{
				preset_option += '<option value="'+preset_key+'" selected="selected">'+preset_key.replace(preset_prefix, "")+'</option>';
			}
			else {
				preset_option += '<option value="'+preset_key+'">'+preset_key.replace(preset_prefix, "")+'</option>';
			}
		}
	}
	var preset_total = document.getElementById('dice_presets').length;
	document.getElementById('dice_presets').innerHTML = preset_option;
}


/**
	Sets the list of preset dice combinations
*/
function set_preset(selected_preset) {
	var dice = document.getElementsByClassName('dice');

	//before changing the dice make sure you can retrieve the value
	if (JSON.parse(localStorage.getItem(selected_preset)) != null)
	{
		var selected_dice = JSON.parse(localStorage.getItem(selected_preset));
		var dice_values = '';

		while(dice[0]) {
			dice[0].parentNode.removeChild(dice[0]);
		}

		for(var i=1;i<Object.keys(selected_dice).length;i++){
			var dice_amount 	=  selected_dice[(i-1)].dice_amount;
			var dice_side 		=  selected_dice[(i-1)].dice_side;
			var dice_modifier 	=  selected_dice[(i-1)].dice_modifier;

			set_dice(dice_amount, dice_side, dice_modifier);
		}
	}
	else {
		while(dice[0]) {
			dice[0].parentNode.removeChild(dice[0]);
		}

		set_dice();
	}
}

/**
	super simple function to clear localStorage
*/
function clear_presets() {
	localStorage.clear();
	get_presets();
}

/**
	basic function to replicate jQuery's serialize
*/
function serialize(form_id) {
	var form_string = [];
	
	for ( var i = 0; i < form_id.elements.length; i++ ) {
		var e = form_id.elements[i];
		if(e.name != ''){
			form_string.push(encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value));
		}
	}

	var data = form_string.join('&');
	return data;
}