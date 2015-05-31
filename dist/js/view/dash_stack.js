define(
  [
    'vendor/tpl!../../templates/dash_stack.html', 
    'view/bullion/graph',
    'view/bullion/spot_overview',
    'view/bullion/current_value',
    'app' 
  ],


  function (template, BullionGraph, SpotOverview, CurrentValue) {
  var StackPanel = Backbone.View.extend({
  
    events: {
      'click .tabular': 'collActive',
      'click .graph': 'graphActive'
    
    },
    template: template,
    id: "dashboard-stack",
    subviews: {},
    pageId: "",

    initialize: function(options) {
      this.options = options;

      // Initialize views
      this.subviews.spotOverview = new SpotOverview({id: options.pageId});
      this.subviews.currentValue = new CurrentValue({bullionType: options.pageId});

      // if(!this.collection) {
      //   this.collection = new BullionTypes();
      //   this.collection.fetch();
      // }
      // console.log(this.pageId);


    },

    render: function() {
      this.$el.html(this.template());
      
      if(!this.initialized) {
        this.subviews.spotOverview.$el
          .appendTo(this.$el.find('#bullion-summaries'));
        this.subviews.currentValue.$el
          .appendTo(this.$el.find('#current-value'));          

        this.initialized = true;
      } else {
        $.each(this.subviews, function(k, subview) {
          subview.render();
        });
      }

      this.renderGraph();

      //dynamically add rows to graph
      var collTable = document.getElementById("collection-table");
      



      console.log(this.subviews.spotOverview.collection.attributes)
      // this.renderGraph();
      var $activePanel = this.$el.find('#bullion-coll');
      $activePanel.addClass("active-panel");
      // wishful thinking
      $(".tabular").css("background", "darkGray");
      $(".graph").css("background", "white");
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
    },

    graphActive: function() {
      $(".graph").css("background", "darkGray");
      $(".tabular").css("background", "white");

      var $activePanel = $('.active-panel');
      $activePanel.removeClass('active-panel');
      
      var $bullionGraph = this.$el.find('#bullion-graph');
      $bullionGraph.addClass("active-panel");

      this.renderGraph();
    },

    collActive: function() {
      var $activePanel = $('.active-panel');
      $activePanel.removeClass('active-panel');
      
      var $bullionColl = this.$el.find('#bullion-coll');
      $bullionColl.addClass("active-panel");

      // TODO: fix
      $(".tabular").css("background", "darkGray");
      $(".graph").css("background", "white");
    }

  });                 

  return StackPanel;
});