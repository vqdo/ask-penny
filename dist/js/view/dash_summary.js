<<<<<<< HEAD
define(
  [
    'vendor/tpl!../../templates/dash_summary.html', 
    'view/bullion/spot_overview', 
    'view/bullion/current_value', 
    'view/bullion/graph',
    'model/inventory',
    'app',
    'facebook' 
    //,'canvasjs'
  ], 

  function (template, SpotOverview, CurrentValue, BullionGraph, Inventory) {
  
  var SummaryPanel = Backbone.View.extend({
    template: template,
    id: "ap-home",
    subviews: {},
    currentPage: 0,

    initialize: function() {
      var self = this;


      // Initialize views
      this.subviews.spotOverview = new SpotOverview({});
      this.subviews.currentValue = new CurrentValue({
        bullionType: "all",
        detailView: 'simple-view'
      });

      this.collection = this.collection || new Inventory();
      this.collection.fetch({  uid: sessionStorage.uid});
      this.collection.on('change', this.onCollection, this);      

      this.$el.on('click', '#graph-link', function() {
        self.toggleDisplay('graph');
      });

      this.$el.on('click', '#stack-link', function() {
        self.toggleDisplay('stack');
      });

      this.$el.on('click', '.mobile-toggle', function(evt) {
        evt.preventDefault();
        self.subviews.currentValue.toggleView('detail-view');        
        self.toggleDisplay('stack');
      });

    },

    onCollection: function(results) {
      this.subviews.currentValue.setInventory(results.attributes);
      this.renderGraph(results.attributes);
      this.subviews.spotOverview.setInventory(results.attributes);
    },

    render: function() {
      this.$el.html(this.template());

      // Add current spot prices of each bullion
      if(!this.initialized) {
        this.subviews.spotOverview.$el
          .appendTo(this.$el.find('#bullion-summaries'));
        this.subviews.currentValue.$el
          .appendTo(this.$el.find('#current-value'));

        this.initialized = true;
      } else {
        // Render each subview
        $.each(this.subviews, function(k, subview) {
          subview.render();
        });
      }

      this.renderGraph();

      return this;
    },

    // ugh
    // TODO: Convert to backbone views
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

    renderGraph: function(inventory) {
      if(this.subviews.graph) this.subviews.graph.close();

      console.log("!");
      this.subviews.graph = new BullionGraph({
        el:     this.$el.find('#bullion-graph'),
        matchHeight: this.$el.find('.my-stack'),
        inventory: inventory
      });      
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
=======
define(["vendor/tpl!../../templates/dash_summary.html","view/bullion/spot_overview","view/bullion/current_value","view/bullion/graph","model/inventory","app","facebook"],function(a,b,c,d,e){var f=Backbone.View.extend({template:a,id:"ap-home",subviews:{},currentPage:0,initialize:function(){var a=this;this.subviews.spotOverview=new b({}),this.subviews.currentValue=new c({bullionType:"all",detailView:"simple-view"}),this.collection=this.collection||new e,this.collection.fetch({uid:sessionStorage.uid}),this.collection.on("change",this.onCollection,this),this.$el.on("click","#graph-link",function(){a.toggleDisplay("graph")}),this.$el.on("click","#stack-link",function(){a.toggleDisplay("stack")}),this.$el.on("click",".mobile-toggle",function(b){b.preventDefault(),a.subviews.currentValue.toggleView("detail-view"),a.toggleDisplay("stack")})},onCollection:function(a){this.subviews.currentValue.setInventory(a.attributes),this.renderGraph(a.attributes),this.subviews.spotOverview.setInventory(a.attributes)},render:function(){return this.$el.html(this.template()),this.initialized?$.each(this.subviews,function(a,b){b.render()}):(this.subviews.spotOverview.$el.appendTo(this.$el.find("#bullion-summaries")),this.subviews.currentValue.$el.appendTo(this.$el.find("#current-value")),this.initialized=!0),this.renderGraph(),this},toggleDisplay:function(a){var b=this.$el.find(".my-stack");"spot"===a?(b.removeClass("summary-panel-stack").removeClass("summary-panel-graph"),b.addClass("summary-panel-main")):"stack"===a?(b.removeClass("summary-panel-main").removeClass("summary-panel-graph"),b.addClass("summary-panel-stack")):"graph"===a&&(b.removeClass("summary-panel-main").removeClass("summary-panel-stack"),b.addClass("summary-panel-graph"),this.renderGraph())},renderGraph:function(a){this.subviews.graph&&this.subviews.graph.close(),console.log("!"),this.subviews.graph=new d({el:this.$el.find("#bullion-graph"),matchHeight:this.$el.find(".my-stack"),inventory:a})},close:function(){this.remove(),this.$el.unbind("click"),this.subviews.spotOverview&&(this.subviews.spotOverview.close(),this.subviews.spotOverview=null),this.subviews.graph&&(this.subviews.graph.close(),this.subviews.graph=null),this.unbind(),this.model&&this.model.unbind("change",this.modelChanged)}});return f});
>>>>>>> fe14298115419e2e088d5129a389dff29ee47deb
