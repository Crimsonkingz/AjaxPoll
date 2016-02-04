var http = require('http');
var url = require('url');
var fs = require('fs');
var jsonStream = require('JSONStream');

var scriptsLoaded = false;
var i = 0;

http.createServer(function(request, response) {
    i++;
    console.log('Request #'+i+': '+request.url);

    if (request.url.indexOf('main.html') != -1) { 

      fs.readFile(__dirname + '/main.html', function (err, data) {
        if (err) {
            console.log(err);
        }
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
      });

    }
    // Specified script.js as opposed to .js due to crossover
    // with .json
    else if (request.url.indexOf('script.js') != -1) {
        fs.readFile(__dirname + '/js/script.js', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('/js/script.js: fs.readFile is successful');
                scriptsLoaded = true;
                response.writeHead(200, {'Content-Type': 'text/javascript'});
                response.write(data);
                response.end();
                
                
            }
        });
    }
    else if (request.url.indexOf('.css') != -1) {
        fs.readFile(__dirname + '/css/stylesheet.css', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('/css/stylesheet.css: fs.readFile is successful');
                response.writeHead(200, {'Content-Type': 'text/css'});
                response.write(data);
                response.end();              
                
            }
        });
    }
    else if (request.url.indexOf('json') != -1) {
        var redCount = 0,
            blueCount = 0,
            pollData = {};

            // For getting query strings
            var url_parts = url.parse(request.url, true);
            var query = url_parts.query;
            // do query.QUERYKEY            
            var optionChosen = query.option;
            console.log("User chose option " + optionChosen);

       var readJSON = fs.readFile(__dirname + '/poll_results.json', function (err, data) {
             if (err) {
                console.log(err);
            }
            else {
                pollData = JSON.parse(data);
                console.log(pollData);
                if (optionChosen === '1') {
                    pollData.red++;
                    console.log("red incremented");
                }
                else if (optionChosen === '2') {
                    pollData.blue++;
                    console.log("blue incremented");
                }
                redCount = pollData.red;
                blueCount = pollData.blue;

                var updatedData = {
                    "red": redCount,
                    "blue": blueCount
                };
                response.on("finish", function(){
                    // Stringify the data when writing to JSON, parse when reading
                    fs.writeFile(__dirname + '/poll_results.json', JSON.stringify(updatedData), function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("JSON written!");
                        }
                    });
                });

                response.write(JSON.stringify(pollData));
                response.end();
            }
        });

        
        
    }
   
}).listen(3000);