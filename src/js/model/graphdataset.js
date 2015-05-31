define(['app', 'model/graphdata'], function (app, GraphData) {
  var GraphDataSet = Backbone.Model.extend({
    model: GraphData,
    url: '/bullion/alldata',

 //    function() {

 //    var formatDate = function(time) {
	//   var date = new Date(time);
	//   var day = date.getDate();
	//   var mo = date.getMonth();
	//   var yr = date.getFullYear();

	//   if (day < 10) {
	//     day = '0' + day;
	//   }

	//   if (mo < 10) {
	//     mo = '0' + mo;
	//   }

	//   return yr + '-' + mo + '-' + day;
	// }

 //    var metal = 'gold';
	//   var host = 'www.quandl.com';
	//   var path = '/api/v1/datasets/WSJ/';

	//   switch (metal) {
	//     case 'gold':
	//       path += 'AU_EIB';
	//       break;
	    
	//     case 'silver':
	//       path += 'AG_EIB';
	//       break;
	    
	//     case 'platinum':
	//       path += 'PL_MKT';
	//       break;
	//   }

	//   //my auth token
	//   path += '.csv?auth_token=3FgBQeN2QPtndN3e8_TK';


	//   var today = new Date();
	//   var mo_ago = new Date().setDate(today.getDate()-30);

	//   console.log('from: ' + formatDate(mo_ago));
	//   console.log('to: ' + formatDate(today));
	//   path += '&trim_start="' + formatDate(mo_ago) +'&trim_end=' + formatDate(today);
	  
	//   var options = {
	//     host: host,
	//     path: path
	//   };
	//   console.log(host + path);
	//   return 'http://' + host + path;
 //    },/*'/data/bullionprices.json',*/  	
    initalize: function() {

    }
  });

  return GraphDataSet;
});