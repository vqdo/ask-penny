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

      if(!this.collection.attributes) return;

      var dataSet = [];
      _.each(this.collection.attributes, function(data) {
        console.log(data);
        if(this.options.pageId && this.options.pageId !== data.name.toLowerCase()) {
          return;
        }

        var bullionTotals = this.options.pageId === "gold" || this.options.pageId ==="silver" || this.options.pageId === "platinum";

        var graphData = {
          type: "splineArea",
          showInLegend: true,
          lineThickness: 2,
          name: data.name, 
          color: data.color,
          markerType: "square",
          dataPoints: []
        };

        // if (this.options && this.options.pageId) {
        //   var graphTotalData = {
        //     type: "splineArea",
        //     showInLegend: true,
        //     lineThickness: 2,
        //     name: "My total " + data.name + "value", 
        //     color: "#333333",
        //     markerType: "square",
        //     dataPoints: []
        //   };
        // }


        var self = this;

        if(self.options && self.options.pageId) {
          var graphTotalData = {
            type: "splineArea",
            showInLegend: true,
            lineThickness: 2,
            name: "My total " + data.name + " value", 
            color: data.color,
            markerType: "square",
            dataPoints: []
          };

          graphData.color = "white";
        }

        _.each(data.dataPoints, function(point) {
          graphData.dataPoints.push({
            x: new Date(point.x),
            y: point.y
          });

          if(graphTotalData) {
            graphTotalData.dataPoints.push({
              x: new Date(point.x),
              y: point.y * 10
            });
          }
        });

        dataSet.push(graphData);

        if(graphTotalData) {
          console.log(graphTotalData);
          dataSet.push(graphTotalData);
        }

      }, this);

      console.log(dataSet);
      graph.CanvasJSChart( 
      {
        animationEnabled: true,

        axisX: {
          gridColor: "white",
          tickColor: "white",
          valueFormatString: "DD/MMM",
          labelFontSize: 14
        },

        toolTip: {
          shared: true
        },

        axisY: {
          gridColor: "white",
          tickColor: "white",
          labelFontSize: 14
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
      console.log("RENDERING!");
      if(!this.canvasGraph) {
        this.createCanvasGraph();
      }

      // Set height
      this.canvasGraph.options.height = Math.max(300, (this.options.matchHeight || 0) && this.options.matchHeight.height());
      console.log("Setting height to " + this.canvasGraph.options.height);      
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