var http = require('http');
var fs = require('fs');


// 404 response
var sendError = function(response) {
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write('Error 404: Page eaten by goblins');
	response.end();
};

// Has to be function(request, response) CANNOT be (response, request)
var serverResponse = function(request, response){
	console.log("got a request");
	console.log(request.url);
	if (request.method == 'GET' && request.url == '/') {

		fs.readFile(__dirname + "/css/stylesheet.css", function(err, data){
			if (err) {
				console.log(err);
			}
			else {
				console.log('/css/stylesheet.css: fs.readFile is successful');
                response.setHeader("Content-Length", data.length);
                response.setHeader("Content-Type", 'text/css');
                response.statusCode = 200;
                
			}
		});
		fs.readFile(__dirname + "/js/script.js", function(err, data){
			if (err) {
				console.log(err);
			}
			else {
				console.log('/js/script.js: fs.readFile is successful');
                response.setHeader("Content-Length", data.length);
                response.setHeader("Content-Type", 'text/javascript');
                response.statusCode = 200;
                
			}
		});
		response.end(data);
		response.writeHead(200, {"Content-Type":"text/html"});
		// fs.createReadStream("./main.html").pipe(response);
		// response.write("")

	}
	else {
		sendError(response);
	}
};

http.createServer(serverResponse).listen(3000);

