define(
  [
    'vendor/tpl!../../templates/dash_summary.html', 
    'view/bullion/spot_overview', 
    'view/bullion/graph',
    'app' 
    //,'canvasjs'
  ], 

  function (template, SpotOverview, BullionGraph) {
  
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
      if(!this.subviews.graph) {
        this.subviews.graph = new BullionGraph({
          el: this.$el.find('#bullion-graph')
        });
      }
    },

    close: function() {
      this.remove();
      if(this.subviews.spotOverview) {
        this.subviews.spotOverview.close();
        this.subviews.spotOverview = null;
      }
      if(this.subviews.graph) {
        this.subviews.graph.close();
        this.subviews.graph = null;
      }      
      this.unbind();
      if(this.model) {
        this.model.unbind("change", this.modelChanged);
      }
    }
  });                 

  return SummaryPanel;
});