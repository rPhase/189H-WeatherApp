/* called when button is pushed */

function getNewPlace() {
	// get what the user put into the textbox
	var newPlace = document.getElementById("zipBox").value;

	// make a new script element
	var script = document.createElement('script');

	// start making the complicated URL
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+newPlace+"')&format=json&callback=callbackFunction"

	script.id = "jsonpCall";

	// remove old script
	var oldScript = document.getElementById("jsonpCall");
	if (oldScript != null) {
		document.body.removeChild(oldScript);
	}

	// put new script into DOM at bottom of body
	document.body.appendChild(script);
}

/* called when new weather arrives */

function callbackFunction(data) {
	// parse the JSON string
	var weatherJSON = JSON.stringify(data);
	weatherObj = JSON.parse(weatherJSON);

	// Check for errors, show pop-up, and return early
	if (weatherObj.hasOwnProperty("error")){
		// Probably empty string
		alert(weatherObj.error.description);
		return;
	} else if (weatherObj.query.results === null) {
		// location not found
		alert("Invalid Input.");
		return;
	}

	// Put various objects into variables
	locationObj = weatherObj.query.results.channel.location;
	conditionObj = weatherObj.query.results.channel.item.condition;
	windObj = weatherObj.query.results.channel.wind;
	atmObj weatherObj.query.results.channel.atmosphere;
	forecastArray = weatherObj.query.results.channel.item.forecast;
	dateString = conditionObj.date.slice(0,-3);
	dateObj = new Date(dateString);

	var location = locationObj.city+ "," + locationObj.region;
	date = formatDate(dateObj);
	time = formatTime(dateObj);

	currLoc = document.getElementById("location");
	currLoc.textContent = location;
	currTime = document.getElementById("time");
	currTime.textContent = "Today " + time;
	currDate = document.getElementById("date");
	currDate.textContent = date;


}

// format the date: Month day, year
function formatDate(date){
	// Create an array of Month names
	var months = ["January", "February", "March", "April", "May", "June", "July",
								"August", "September", "October", "November", "December"];

	// Create variables to hold parts of date
	var month = months[date.getMonth()];
	var day = date.getDate();
	var year = date.getFullYear();

	// Return the formatted string
	return month + " " + day + ", " + year;
}

// format the time like 2:15pm
function formatTime(date){
	var timeString = date.toLocaleTimeString().toLowerCase();
	var index = timeString.lastIndexOf(':');
	// Remove seconds and whitespace
	return timeString.slice(0,index) + timeString.slice(index+4);
}
