

/* called when new weather arrives */

function callbackFunction(data) {
	var pgh = document.getElementById("forecast");
    	pgh.textContent = JSON.stringify(data);
}


