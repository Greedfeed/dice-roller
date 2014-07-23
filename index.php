<html>
<head>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="js/dice.js"></script>

</head>
<body>

	<select id="dice_presets" onchange="set_preset($('#dice_presets').val());">
		<option>Select from a saved preset below</option>
	</select>

	<form id="dice_combo" action="" method="POST">
		<a id="set_dice" href="javascript:void(0);" onclick="set_dice();">Add more</a>
		<a id="save_preset" href="javascript:void(0);" onclick="save_preset();">Save dice</a>
		<input id="roll_dice" type="submit" value="Roll"/>
	</form>

	<div id="roll_result"></div>
</body>
</html>