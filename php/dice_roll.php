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

{
    "dice1": {
        "title": "example glossary",
		"GlossDiv": {
            "title": "S",
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
                    },
					"GlossSee": "markup"
                }
            }
        }
    }
}


$dice_sides = array(
	4, 6, 8, 10, 12, 20, 100
);

{
	"dice1":[
	{
		"dice_amount":		"1",
		"dice_sides":		"20",
		"dice_modifier":	"4",
		"roll_result":		"18",
		"total":			"22"
	}],
	"dice2":[
	{
		"dice_amount":		"1",
		"dice_sides":		"20",
		"dice_modifier":	"4",
		"roll_result":		"18",
		"total":			"22"
	}],

	"grand_total":			"44"
			
}*/
?>


