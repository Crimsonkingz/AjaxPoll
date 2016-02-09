var http = require('http');
var url = require('url');
var fs = require('fs');
var jsonStream = require('JSONStream');
var mime = require('mime');

var scriptsLoaded = false;
var i = 0;

http.createServer(function(request, response) {
    i++;
    console.log('Request #' + i + ': '+ request.url);
    console.log('MIME:' + mime.lookup(request.url));
    var mimeType = mime.lookup(request.url);

    if (request.url.indexOf('main.html') !== -1) { 
        console.log('HTML');
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
    else if (request.url.indexOf('script.js') !== -1) {
        console.log('JAVASCRIPT');
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
    else if (request.url.indexOf('.css') !== -1) {
        console.log('CSS');
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
    else if (request.url.indexOf('json') !== -1) {
        console.log('JSON');
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
                    pollData.apples++;
                    console.log("apples incremented");
                }
                else if (optionChosen === '2') {
                    pollData.oranges++;
                    console.log("oranges incremented");
                }
                appleCount = pollData.apples;
                orangeCount = pollData.oranges;

                var updatedData = {
                    "apples": appleCount,
                    "oranges": orangeCount
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
    else if (request.url.match(/jpg|gif|png/)) {
        console.log('IMAGE');
        fs.readFile(__dirname + request.url, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {

                console.log('image: fs.readFile is successful');
                response.writeHead(200, {'Content-Type': mimeType});
                response.write(data);
                response.end();              
                
            }
        });
    }
   else if(request.url.indexOf('ico') !== -1) {
        console.log('ICONS');
   }
}).listen(3000);