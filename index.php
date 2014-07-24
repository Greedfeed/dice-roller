<html>
<head>
	

</head>
<body>

	<select id="dice_presets" onchange="set_preset( document.getElementById('dice_presets').value );">
		<option>Select from a saved preset below</option>
	</select>

	<form id="dice_combo" action="" method="POST">
		<a id="set_dice" href="javascript:void(0);" onclick="set_dice();">Add more</a>
		<a id="save_preset" href="javascript:void(0);" onclick="save_preset();">Save dice</a>
		<input id="roll_dice" type="submit" value="Roll"/>
	</form>

	<div id="roll_result"></div>
</body>
	<script src="js/dice.js"></script>
</html>