define(
  [
    'vendor/tpl!../../templates/dash_stack.html', 
    'view/bullion/spot_overview',
    'app' 
  ],

  function (template, SpotOverview) {
  
  var SummaryPanel = Backbone.View.extend({
    template: template,
    id: "dashboard-stack",
    subviews: {},
    pageId: "",

    initialize: function(options) {
      this.options = options;

      // if(!this.collection) {
      //   this.collection = new BullionTypes();
      //   this.collection.fetch();
      // }
      // console.log(this.pageId);
      console.log(this);


    },

    render: function() {
      this.$el.html(this.template());
      
      if(!this.subviews.spotOverview) {
        this.subviews.spotOverview = new SpotOverview({
          id: this.options.pageId
        });
        this.subviews.spotOverview.$el
          .appendTo(this.$el.find('#bullion-summaries'));
      } else {
        this.subviews.spotOverview.render();
      }

      this.renderGraph();

      console.log(this.subviews.spotOverview.collection.attributes)
      // this.renderGraph();
      return this;
    },

    renderGraph: function() {
      var graph = this.$el.find('#bullion-graph');
      graph.CanvasJSChart( 
      {
        // title: {
        //   text: "Gold Prices",
        //   fontSize: 30
        // },

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
          name: "1 oz",
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
          name: "My Gold Total",
          markerType: "square",
          color: "#FFD700",
          dataPoints: [
            { x: new Date(2014, 5, 0), y: 12151.50},
            { x: new Date(2014, 6, 0), y: 12809.40},
            { x: new Date(2014, 7, 0), y: 13132.70},
            { x: new Date(2014, 8, 0), y: 13165.70},
            { x: new Date(2014, 9, 0), y: 13180.00},
            { x: new Date(2014, 10, 0), y: 12908.90},
            { x: new Date(2014, 11, 0), y: 12179.80},
            { x: new Date(2015, 0, 0), y: 11556.40},
            { x: new Date(2015, 1, 0), y: 11164.50},
            { x: new Date(2015, 2, 0), y: 10770.90},
            { x: new Date(2015, 3, 0), y: 10000.40},
            { x: new Date(2015, 4, 0), y: 9750.40},
          ]   
        }]
      });
      var canvasGraph = graph.CanvasJSChart();
      
      setTimeout(function() {
        canvasGraph.render();
      }, 0)

    },
       
    close: function() {
      if(this.subviews.spotOverview) {
        this.subviews.spotOverview.close();
        this.subviews.spotOverview = null;
      }

      this.remove();
      this.unbind();
      if(this.model) {
        this.model.unbind("change", this.modelChanged);
      }
    }
  });                 

  return SummaryPanel;
});