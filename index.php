<html>
<head>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="js/dice.js"></script>
	<script>
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
						console.log(dice.dice_roll[0]['roll_total']);
						//alert(dice);
					}
				});

			});
		});
	</script>

</head>
<body>

	<form id="dice_combo" action="" method="POST">
		<a id="more_dice" href="javascript:void(0);" onclick="add_dice(dice_sides);">Add more</a>
		<input id="roll_dice" type="submit" value="Roll"/>
	</form>

	<div id="roll_result"></div>
</body>
</html>