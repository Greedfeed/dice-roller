<html>
<head>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="js/dice.js"></script>

</head>
<body>

	<form id="dice_combo" action="" method="POST">
		<a id="more_dice" href="javascript:void(0);" onclick="add_dice(dice_sides);">Add more</a>
		<input id="roll_dice" type="submit" value="Roll"/>
	</form>

	<div id="roll_result"></div>
</body>
</html>