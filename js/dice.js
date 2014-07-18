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