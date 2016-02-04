var http = require('http');
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
    else if (request.url.indexOf('.js') != -1) {
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
            if (err) console.log(err);
            else {
                console.log('/css/stylesheet.css: fs.readFile is successful');
                response.writeHead(200, {'Content-Type': 'text/css'});
                response.write(data);
                response.end();              
                
            }
        });
    }
    else if (request.url.indexOf('.json') != -1) {
    
    var file = fs.createWriteStream('poll_results.json');
    file.on('finish', function(){
        console.log("file written");
    });       
    var out = jsonStream.stringifyObject();          
    out.pipe(file);                                    

    obj = { a:5, b:0 };                                    
    for (key in obj) {
        console.log(key + ": " + obj[key]);
        out.write([key, obj[key]]);
    }                                                                               
    out.end();
    }
   
}).listen(3000);