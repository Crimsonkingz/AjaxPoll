var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var results = document.getElementById("results");

var madeChoice = false;

var registerVote = function() {
		madeChoice = true;
		var choice = this.id.substr(6);
		console.log(choice);
		

		//Ajax
	 	var xhttp = new XMLHttpRequest();
 		xhttp.onreadystatechange = function() {
		    if (xhttp.readyState == 4 && xhttp.status == 200) {
		    	console.log(JSON.parse(xhttp.responseText));
				displayResults(xhttp);
		    }
		};
		xhttp.open("GET", "poll_results.json", true);
		xhttp.send();
			

};

var displayResults = function(xhttp) {
	var jsonObj = JSON.parse(xhttp.responseText);
	var resultStr = "Red: " + jsonObj.red + " " + "Blue: " + jsonObj.blue;
	results.innerHTML = resultsStr;
	results.style.visibility = "visible";
};

option1.addEventListener("click", registerVote, false);
option2.addEventListener("click", registerVote, false);