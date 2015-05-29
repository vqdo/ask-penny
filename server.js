var express = require('express');
var app = express();

// Hardcoded data, remove eventually
var dataBullionTypes = require('./src/data/bulliontypes.json');
var dataBullionPrices = require('./src/data/bullionprices.json'); 

// Use the public/ folder for resource files (css, js, images)  
app.use(express.static(__dirname + '/dist'));

/**
 * Display index.html when the user visits the root page 
 */
app.get('/', function (req, res) {
  res.sendFile( __dirname + '/dist/');
});

var server = app.listen(process.env.PORT || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);

  app.get('/bullion/:user/:bullionType?', function (req, res) {
    var type = req.params.bullionType;
    console.log("Getting bullion type " + type + ' for user ' + req.params.user);    

    // TODO: Insert parse code here
    // 
    // Then remove/replace all this:
    var data = dataBullionTypes;

    res.writeHead("200", {'content-type': 'application/json'});    
    if(!type) {
      res.end(JSON.stringify(data));
    } else if (type === "all") {
      // Dashboard main - make up something
      res.end(JSON.stringify({
        name: "Stack",
        total: "24502.40",
        change: "5",
        changeOverall: "5",
      }));
    } 
    else {
      var types = dataBullionTypes;     
      for(var i = 0; i < types.length; i++) {
        var current = types[i];
        if(current.name === type) {
          data = current;
          break;
        }
      }

      //res.writeHead("200", {'content-type': 'application/json'});
      res.end(JSON.stringify(data));
    }
  });

}); // end server callback
