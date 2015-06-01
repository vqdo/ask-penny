define(['app', 'model/graphdata'], function (app, GraphData) {
  var GraphDataSet = Backbone.Model.extend({
    model: GraphData,
    url: '/bullion/allspots',

    initalize: function() {

    }
  });

  return GraphDataSet;
});