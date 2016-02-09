var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var results = document.getElementById("results");

var madeChoice = false;

var registerVote = function() {
	if (!madeChoice) {
		madeChoice = true;
		var choice = this.id.substr(6);
		console.log(choice);
		

		//Ajax
	 	var xhttp = new XMLHttpRequest();
 		xhttp.onreadystatechange = function() {
		    if (xhttp.readyState == 4 && xhttp.status == 200) {
		    	console.log("replied");
				displayResults(xhttp);

				// console.log(xhttp);
		    }
		};
		xhttp.open("GET", "poll_results.json" + "?option="+ choice, true);
		xhttp.send();
			
	}
};

var displayResults = function(xhttp) {
	var jsonObj = JSON.parse(xhttp.responseText);
	var appleVotes = jsonObj.apples;
	var orangeVotes = jsonObj.oranges;
	var total = appleVotes + orangeVotes;

	var applesString = "Apples: " + Math.round((appleVotes/total) * 100) + "%";
	var orangesString = "Oranges: " + Math.round((orangeVotes/total) * 100) + "%";
	var resultStr = "<p class='fadeIn'>" + applesString + "<br>" + orangesString + "</p>";
	results.innerHTML += resultStr;
	results.classList.add("spinIn");
};

option1.addEventListener("click", registerVote, false);
option2.addEventListener("click", registerVote, false);