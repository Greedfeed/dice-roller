<?php

if($_POST) {
	$grand_total = 0;

	$dice_json = '{';
		$dice_json .= '"dice_roll":[';

	for($i=0;$i<count($_POST['dice_amount']);$i++){
		$roll_total = roll($_POST['dice_amount'][$i], $_POST['dice_sides'][$i]);
		$total = $roll_total + $_POST['dice_modifier'][$i];
		
		$grand_total = $grand_total + $total;
		$dice_json .= '{';

			$dice_json .= '"dice_amount":		"'.$_POST['dice_amount'][$i].'",';
			$dice_json .= '"dice_sides":		"'.$_POST['dice_sides'][$i].'",';
			$dice_json .= '"dice_modifier":	"'.$_POST['dice_modifier'][$i].'",';
			$dice_json .= '"roll_total":		"'.$roll_total.'",';
			$dice_json .= '"total":			"'.$total.'"';

		$dice_json .= '}';

		if ($i != (count($_POST['dice_amount']) - 1) ) {
			$dice_json .= ',';
		}

	}

	$dice_json .= '],';
	$dice_json .= '"grand_total":	"'.$grand_total.'"';
	$dice_json .= '}';

	echo $dice_json;
}

function roll($amount, $sides){
	$total = 0;

	for($i=0;$i<$amount;$i++){
		$die_roll = rand(1, $sides);
		$total = $total + $die_roll;
	}

	return $total;
}



/*
$dice_sides = array(
	4, 6, 8, 10, 12, 20, 100
);

{
	"dice_roll":[
	{
		"dice_amount":		"1",
		"dice_sides":		"4",
		"dice_modifier":	"0",
		"roll_total":		"1",
		"total":			"1"
	},
	{
		"dice_amount":		"1",
		"dice_sides":		"8",
		"dice_modifier":	"0",
		"roll_total":		"3",
		"total":			"3"
	},
	{
		"dice_amount":		"1",
		"dice_sides":		"20",
		"dice_modifier":	"0",
		"roll_total":		"4",
		"total":			"4"
	}],
	"grand_total":		"8"
}
*/
?>


