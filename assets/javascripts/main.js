console.log('main.js linked')	

var clock;
$('.date').text($.format.date(new Date(), "ddd MMMM dd, yyyy"));

$(document).ready(function() {
	// FLIP CLOCK
	clock = $('#clock').FlipClock({
		clockFace: 'TwelveHourClock'
	});
	setInterval(function() {
		$('.date').text($.format.date(new Date(), "ddd MMMM dd, yyyy"));
		clock.setTime(new Date())
	},60*1000)

	$('#clock').click(function(e) {
		if (clock.clockFace === "TwelveHourClock") {
			clock.loadClockFace("TwentyFourHourClock")
		} else {
			clock.loadClockFace("TwelveHourClock")
		}
		
		
	})


});