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
      var spotPrices = this.$el.find('#bullion-graph').CanvasJSChart( 
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
          { x: new Date(2014, 6, 0), y: 1210.94},
          { x: new Date(2014, 7, 0), y: 1213.27},
          { x: new Date(2014, 8, 0), y: 1216.57},
          { x: new Date(2014, 9, 0), y: 1218.00},
          { x: new Date(2014, 10, 0), y: 1220.89},
          { x: new Date(2014, 11, 0), y: 1217.98},
          { x: new Date(2015, 0, 0), y: 1215.64},
          { x: new Date(2015, 1, 0), y: 1216.45},
          { x: new Date(2015, 2, 0), y: 1217.09},
          { x: new Date(2015, 3, 0), y: 1220.04},
          { x: new Date(2015, 4, 0), y: 1218.04},
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
          { x: new Date(2014, 6, 0), y: 14.92},
          { x: new Date(2014, 7, 0), y: 16.14},
          { x: new Date(2014, 8, 0), y: 16.73},
          { x: new Date(2014, 9, 0), y: 16.80},
          { x: new Date(2014, 10, 0), y: 17.02},
          { x: new Date(2014, 11, 0), y: 17.22},
          { x: new Date(2015, 0, 0), y: 17.10},
          { x: new Date(2015, 1, 0), y: 16.95},
          { x: new Date(2015, 2, 0), y: 16.60},
          { x: new Date(2015, 3, 0), y: 16.47},
          { x: new Date(2015, 4, 0), y: 16.22},
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
          { x: new Date(2014, 6, 0), y: 1011.03},
          { x: new Date(2014, 7, 0), y: 1005.38},
          { x: new Date(2014, 8, 0), y: 1012.22},
          { x: new Date(2014, 9, 0), y: 1016.41},
          { x: new Date(2014, 10, 0), y: 1014.90},
          { x: new Date(2014, 11, 0), y: 1010.15},
          { x: new Date(2015, 0, 0), y: 1008.66},
          { x: new Date(2015, 1, 0), y: 1000.32},
          { x: new Date(2015, 2, 0), y: 997.98},
          { x: new Date(2015, 3, 0), y: 994.09},
          { x: new Date(2015, 4, 0), y: 990.00},
          ]    
        }]
      });

      //spotPrices.render();
    },

    close: function() {
      this.remove();
      this.unbind();
      if(this.model) {
        this.model.unbind("change", this.modelChanged);
      }
    }
  });                 

  return SummaryPanel;
});