define(
  [
    'vendor/tpl!../../templates/dash_summary.html', 
    'view/bullion/spot_overview', 
    'app', 
    'canvasjs'
  ], 

  function (template, SpotOverview) {
  
  var SummaryPanel = Backbone.View.extend({
    template: template,
    id: "ap-home",
    subviews: {},

    initialize: function() {
      // if(!this.collection) {
      //   this.collection = new BullionTypes();
      //   this.collection.fetch();
      // }

    },

    render: function() {
      this.$el.html(this.template());

      console.log(this.subviews.spotOverview);
      //TODO: Buggy!!!!!
      if(!this.subviews.spotOverview) {
        this.subviews.spotOverview = new SpotOverview({

        });
        this.subviews.spotOverview.$el
          .appendTo(this.$el.find('#bullion-summaries'));
      } else {
        this.subviews.spotOverview.render();
      }

      this.renderGraph();

      return this;
    },

    renderGraph: function() {
      //if(!this.canvasGraph) {
        var graph = this.$el.find('#bullion-graph');
        graph.CanvasJSChart( 
        {
          title: {
            text: "Bullion Prices",
            fontSize: 30
          },

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

          data: [
          {
            type: "splineArea",
            showInLegend: true,
            lineThickness: 2,
            name: "Gold",
            markerType: "square",
            color: "#FFD700",
            dataPoints: [
              { x: new Date(2014, 5, 0), y: 1215.15},
              { x: new Date(2014, 6, 0), y: 1280.94},
              { x: new Date(2014, 7, 0), y: 1313.27},
              { x: new Date(2014, 8, 0), y: 1316.57},
              { x: new Date(2014, 9, 0), y: 1318.00},
              { x: new Date(2014, 10, 0), y: 1290.89},
              { x: new Date(2014, 11, 0), y: 1217.98},
              { x: new Date(2015, 0, 0), y: 1155.64},
              { x: new Date(2015, 1, 0), y: 1116.45},
              { x: new Date(2015, 2, 0), y: 1077.09},
              { x: new Date(2015, 3, 0), y: 1000.04},
              { x: new Date(2015, 4, 0), y: 975.04},
            ]    
          },

          {
            type: "splineArea",
            showInLegend: true,
            lineThickness: 2,
            name: "Silver",
            markerType: "square",
            color: "#808080",
            dataPoints: [
            { x: new Date(2014, 5, 0), y: 15.50},
            { x: new Date(2014, 6, 0), y: 18.92},
            { x: new Date(2014, 7, 0), y: 22.14},
            { x: new Date(2014, 8, 0), y: 16.73},
            { x: new Date(2014, 9, 0), y: 24.80},
            { x: new Date(2014, 10, 0), y: 17.02},
            { x: new Date(2014, 11, 0), y: 17.22},
            { x: new Date(2015, 0, 0), y: 18.10},
            { x: new Date(2015, 1, 0), y: 25.95},
            { x: new Date(2015, 2, 0), y: 30.60},
            { x: new Date(2015, 3, 0), y: 25.47},
            { x: new Date(2015, 4, 0), y: 20.22},
            ]    
          },

          {
            type: "splineArea",
            showInLegend: true,
            lineThickness: 2,
            name: "Platinum",
            markerType: "square",
            color: "#E5E4E2",
            dataPoints: [
            { x: new Date(2014, 5, 0), y: 1010.45},
            { x: new Date(2014, 6, 0), y: 1061.03},
            { x: new Date(2014, 7, 0), y: 1105.38},
            { x: new Date(2014, 8, 0), y: 1162.22},
            { x: new Date(2014, 9, 0), y: 1196.41},
            { x: new Date(2014, 10, 0), y: 1114.90},
            { x: new Date(2014, 11, 0), y: 1010.15},
            { x: new Date(2015, 0, 0), y: 999.66},
            { x: new Date(2015, 1, 0), y: 959.32},
            { x: new Date(2015, 2, 0), y: 920.98},
            { x: new Date(2015, 3, 0), y: 900.09},
            { x: new Date(2015, 4, 0), y: 878.00},
            ]    
          }]
        });
        this.canvasGraph = graph.CanvasJSChart();
        console.log(this.canvasGraph);

        var self = this;
        setTimeout(function() {
          self.canvasGraph.render();
        }, 0)        
      //}

    },

    close: function() {
      this.remove();
      if(this.subviews.spotOverview) {
        this.subviews.spotOverview.close();
        this.subviews.spotOverview = null;
      }
      this.unbind();
      if(this.model) {
        this.model.unbind("change", this.modelChanged);
      }
    }
  });                 

  return SummaryPanel;
});