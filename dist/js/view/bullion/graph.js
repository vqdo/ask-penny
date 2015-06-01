define(
  ['vendor/tpl!/templates/bullion/graph.html', 'model/graphdataset', 'canvasjs'], 
  function (template, GraphDataSet) {
  var BullionGraph = Backbone.View.extend({
    template: template,
    id: "bullion-graph-" + this.cid,

    initialize: function(options) {
      this.collection = this.collection || new GraphDataSet();

      this.collection.fetch({
        success: function(m, data) {
          console.log(data);
        },
        error: function(m, data) {
          console.error(data);
        }
      });      
      this.collection.on('change', this.render, this);

      this.options = options;     
      console.log(this.options);
    },

    createCanvasGraph: function() {
      var graph = this.$el;
      console.log(this.collection);

      if(!this.collection.attributes) return;

      var dataSet = [];
      _.each(this.collection.attributes, function(data) {
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

        if(self.options) {
          var graphTotalData = {
            type: "splineArea",
            showInLegend: true,
            lineThickness: 2,
            name: "Total " + data.name , 
            color: data.color,
            markerType: "square",
            dataPoints: []
          };

          //graphData.color = "white";
        }

        _.each(data.dataPoints, function(point) {
          graphData.dataPoints.push({
            x: new Date(point.x),
            y: +point.y
          });

          if(graphTotalData) {           
            //var qty;

            var qty = _.values(self.options.inventory).reduce(function(acc, metal_data) {
              var value = 0;
              if (metal_data.attributes.metal ===  data.name.toLowerCase()) {
                value = metal_data.attributes.qty;
              }
              acc += isNaN(value)? 0 : value;
              return acc;
            }, 0);
            graphTotalData.dataPoints.push({
              x: new Date(point.x),
              y: point.y * qty
            });

          }
        });

        dataSet.push(graphData);

        if(graphTotalData) {

          dataSet.push(graphTotalData);
        }

      }, this);

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
      console.log(this.options.inventory);
      if(!this.canvasGraph) {
        this.createCanvasGraph();
      }

      // Set height
      // console.log("Match height: " + this.options.matchHeight.height());
      // var targetHeight = Math.min(Math.max(300, (this.options.matchHeight || 0) && this.options.matchHeight.height()), $(window).height());
      // this.canvasGraph.options.height = targetHeight;
      // this.$el.height(targetHeight);
      // console.log("Setting height to " + targetHeight);      
      this.canvasGraph.render();      

      return this;
    },

    close: function() {
      this.$el.children().remove();
      this.unbind();

      if(this.collection) {
        this.collection.unbind("change", this.collectionChanged);
      }
    }    
  });                 

  return BullionGraph;
});