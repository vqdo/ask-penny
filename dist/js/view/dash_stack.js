define(
  [
    'vendor/tpl!../../templates/dash_stack.html', 
    'view/bullion/graph',
    'view/bullion/spot_overview',
    'app' 
  ],


  function (template, BullionGraph, SpotOverview) {
  var StackPanel = Backbone.View.extend({
  

    template: template,
    id: "dashboard-stack",
    subviews: {},
    pageId: "",

    initialize: function(options) {
      this.options = options;
      var activePanel = this.$el.find('#bullion-coll');
      activePanel.className += " active-panel";

      // if(!this.collection) {
      //   this.collection = new BullionTypes();
      //   this.collection.fetch();
      // }
      // console.log(this.pageId);


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
      if(!this.subviews.graph) {
        this.subviews.graph = new BullionGraph({
          el: this.$el.find('#bullion-graph'),
          pageId: this.options.pageId
        });
      } else {
        this.subviews.graph.render();
      }
    },
       
    close: function() {
      if(this.subviews.spotOverview) {
        this.subviews.spotOverview.close();
        this.subviews.spotOverview = null;
      }

      if(this.subviews.graph) {
        this.subviews.graph.close();
        this.subviews.graph = null;
      }
      this.remove();      

      this.unbind();
      if(this.model) {
        this.model.unbind("change", this.modelChanged);
      }
    }

    graphActive: function() {
      var bullionColl = this.$el.find('#bullion-coll');
      bullionColl.className = bullionColl.className.replace( /(?:^\s)active-panel(?!\S)/g, '');
      var bullionGraph = this.$el.find('#bullion-graph');
      bullionGraph.className += " active-panel";
    }

    collActive: function() {
      var bullionGraph = this.$el.find('#bullion-graph');
      bullionGraph.className = bullionGraph.className.replace( /(?:^\s)active-panel(?!\S)/g, '');
      var bullionColl = this.$el.find('#bullion-coll');
      bullionColl.className += " active-panel";
    }
  });                 

  return StackPanel;
});