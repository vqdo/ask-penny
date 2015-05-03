define(
  [
    'vendor/tpl!../../templates/dash_stack.html', 
    'view/bullion/graph',
    'app' 
  ],

  function (template, BullionGraph) {
  
  var SummaryPanel = Backbone.View.extend({
    template: template,
    id: "dashboard-stack",
    subviews: {},
    pageId: "",

    initialize: function(options) {
      // if(!this.collection) {
      //   this.collection = new BullionTypes();
      //   this.collection.fetch();
      // }
      this.options = options;
      console.log(this.pageId);

    },

    render: function() {
      this.$el.html(this.template());
      this.renderGraph();
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
      this.remove();
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