"use strict";

var express = require('express');
var app = express();

// Hardcoded data, remove eventually
var dataBullionTypes = require('./src/data/bulliontypes.json');
var dataBullionPrices = require('./src/data/bullionprices.json'); 

//query quandl for prices
var spotPrices = [];
var dailySpot = [];
getSpotPrice('gold');
getSpotPrice('silver');
getSpotPrice('platinum');

function getSpotPrice(metal) {
  var http = require('http');

  var host = 'www.quandl.com';
  var path = '/api/v1/datasets/WSJ/';

  switch (metal) {
    case 'gold':
      path += 'AU_EIB';
      break;
    
    case 'silver':
      path += 'AG_EIB';
      break;
    
    case 'platinum':
      path += 'PL_MKT';
      break;
  }

  //my auth token
  path += '.csv?auth_token=3FgBQeN2QPtndN3e8_TK';


  var today = new Date();
  var mo_ago = new Date().setDate(today.getDate()-30);

  console.log('from: ' + formatDate(mo_ago));
  console.log('to: ' + formatDate(today));
  path += '&trim_start="' + formatDate(mo_ago) +'&trim_end=' + formatDate(today);
  
  var options = {
    host: host,
    path: path
  };

  var callback = function(response) {
    var str = '';

    response.on('data', function(chunk) {
      str += chunk;
    });

    response.on('end', function() {
      console.log('spot prices for ' + metal + '\n' + str);
      var type = null;
      var color = null;
      switch(metal) {
        case 'gold':
          type = "Gold";
          color = "#F2EAD0"
          break;
    
        case 'silver':
          type = "Silver";
          color = "#CCCCCC"
          break;
      
        case 'platinum':
          type = "Platinum";
          color = "#D1E3E6"
          break;
      }

      var original = chopData(str);
      var datapoints = [];

      for(var i = 0; i < original.length; i++) {
        if(original[i].y) {
          datapoints.push(original[i]);
        }
      }
      var bid = (datapoints[0].y*0.95).toFixed(2);
      var ask = (datapoints[0].y*1.05).toFixed(2);
      var change = (datapoints[0].y - datapoints[1].y).toFixed(2); 
      var changeDaily = ((datapoints[0].y - datapoints[1].y)/datapoints[0].y).toFixed(2);
      var changeOverall = ((datapoints[0].y - datapoints[datapoints.length-1].y)/datapoints[0].y).toFixed(2);
      spotPrices[spotPrices.length] = {"name":type, "color":color, "dataPoints": datapoints};
      dailySpot[dailySpot.length] = {"name":metal, "total": datapoints[0].y, "spot":{"bid": bid ,"ask": ask, "change": change}, "ounces":10, "changeDaily": changeDaily, "changeOverall": changeOverall}
      console.log('latest' + datapoints[0].y);
      console.log('next' + datapoints[1].y);
      console.log('first' + datapoints[datapoints.length -1].y);
    });
  }

  http.request(options, callback).end();
}

function chopData(str) {
  var lines = str.split(/\r\n|\n/);
  var json = [];

  console.log('chopping' + str);

  for (var i=1; i < lines.length; i++) {
    var vals = lines[i].split(',');
    console.log(String(vals[0]));
    json.push({"x":vals[0], "y": vals[1]});
  }
  return json;
}

function formatDate(time) {
  var date = new Date(time);
  var day = date.getDate();
  var mo = date.getMonth() +1;
  var yr = date.getFullYear();

  if (day < 10) {
    day = '0' + day;
  }

  if (mo < 10) {
    mo = '0' + mo;
  }

  return yr + '-' + mo + '-' + day;
}

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

  app.get('/bullion/dailyspot', function (req, res) {
    var data = dataBullionTypes;
    res.writeHead("200", {'content-type': 'application/json'});
    res.end(JSON.stringify(data));
  });
  
  app.get('/bullion/allspots', function (req, res) {
    console.log('DATADATADATA');
    var data = spotPrices;
    console.log(data);
    res.writeHead("200", {'content-type': 'application/json'});
    res.end(JSON.stringify(data));
  });

  app.get('/bullion/:user/:bullionType?', function (req, res) {
    var type = req.params.bullionType;

    console.log("Getting bullion type " + type + ' for user ' + req.params.user);    

    // TODO: Insert parse code here
    // 
    // Then remove/replace all this:


    var data = dailySpot;

    res.writeHead("200", {'content-type': 'application/json'});    
    if(!type) {
      res.end(JSON.stringify(data));
    } 
    else if (type === "all") {
      console.log("ALL");
      var spots = {};
      for(var i = 0; i < data.length; i++) {
        var current = data[i];
        spots[current.name] = current.spot;
      }

      res.end(JSON.stringify({
        name: "Stack",
        spots: spots
      }));
    } 
    else {
      var types = dailySpot;     
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
