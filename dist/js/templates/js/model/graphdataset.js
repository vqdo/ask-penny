define(['app', 'model/graphdata'], function (app, GraphData) {
  var GraphDataSet = Backbone.Model.extend({
    model: GraphData,
    url: '/data/bullionprices.json',  	
    initalize: function() {

    }
  });

  return GraphDataSet;
});