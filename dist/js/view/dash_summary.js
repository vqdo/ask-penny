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
    currentPage: 0,

    initialize: function() {
      var self = this;

      this.$el.on('click', '#graph-link', function() {
        self.toggleDisplay('graph');
      });

      this.$el.on('click', '#stack-link', function() {
        self.toggleDisplay('stack');
      });

      this.$el.on('click', '.mobile-toggle', function(evt) {
        evt.preventDefault();
        self.toggleDisplay('stack');
      });

    },

    render: function() {
      this.$el.html(this.template());

      if(!this.subviews.spotOverview) {
        this.subviews.spotOverview = new SpotOverview({

        });
        this.subviews.spotOverview.$el
          .appendTo(this.$el.find('#bullion-summaries'));
      } else {
        this.subviews.render();
      }

      this.renderGraph();

      return this;
    },

    // ugh
    // TODO: Convert to bootstrap views
    toggleDisplay: function(page) {
      var $target = this.$el.find('.my-stack');
      if(page === "spot") {

        $target.removeClass('summary-panel-stack')
          .removeClass('summary-panel-graph');
        $target.addClass('summary-panel-main');

      } else if(page === "stack") {

        $target.removeClass('summary-panel-main')
          .removeClass('summary-panel-graph');
        $target.addClass('summary-panel-stack');

      } else if(page === "graph") {

        $target.removeClass('summary-panel-main')
          .removeClass('summary-panel-stack');
        $target.addClass('summary-panel-graph');

        this.renderGraph();

      }
    },

    renderGraph: function() {
      if(!this.subviews.graph) {
        this.subviews.graph = new BullionGraph({
          el: this.$el.find('#bullion-graph')
        });
      } else {
        this.subviews.graph.render();
      }
    },

    renderView: function() {

    },

    close: function() {
      this.remove();
      this.$el.unbind('click');

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