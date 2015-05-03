define(
  ['vendor/tpl!/templates/bullion/graph.html', 'model/graphdataset', 'canvasjs'], 
  function (template, GraphDataSet) {
  var BullionGraph = Backbone.View.extend({
    template: template,
    id: "bullion-graph-" + this.cid,

    initialize: function(options) {
      this.collection = this.collection || new GraphDataSet();

      this.collection.fetch();      
      this.collection.on('change', this.render, this);

      this.options = options;
      console.log(this.options);
    },

    createCanvasGraph: function() {
      var graph = this.$el;

      var dataSet = [];
      _.each(this.collection.attributes, function(data) {
        
        if(this.options.pageId && this.options.pageId !== data.name.toLowerCase()) {
          return;
        }

        var graphData = {
          type: "splineArea",
          showInLegend: true,
          lineThickness: 2,
          name: data.name, 
          color: data.color,
          markerType: "square",
          dataPoints: []
        };

        _.each(data.dataPoints, function(point) {
          graphData.dataPoints.push({
            x: new Date(point.x),
            y: point.y
          });
        });

        dataSet.push(graphData);

      }, this);

        console.log(dataSet);
      graph.CanvasJSChart( 
      {
        animationEnabled: true,

        axisX: {
          gridColor: "Black",
          tickColor: "Black",
          valueFormatString: "DD/MMM"
        },

        toolTip: {
          shared: true
        },

        axisY: {
          gridColor: "Black",
          tickColor: "Black"
        },

        legend: {
          verticalAlign: "top",
          horixontalAlight: "left"
        },

        data: dataSet
      });
      this.canvasGraph = graph.CanvasJSChart();

    },

    render: function() {
      console.log(this.collection);
      if(!this.canvasGraph) {
        this.createCanvasGraph();
      }
      this.canvasGraph.render();

      return this;
    },

    close: function() {
      this.remove();
      this.unbind();

      if(this.collection) {
        this.collection.unbind("change", this.collectionChanged);
      }
    }    
  });                 

  return BullionGraph;
});