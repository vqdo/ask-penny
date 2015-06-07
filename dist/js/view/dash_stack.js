<<<<<<< HEAD
define(
  [
    'vendor/tpl!../../templates/dash_stack.html', 
    'view/bullion/graph',
    'view/bullion/spot_overview',
    'view/bullion/current_value',
    'model/inventory',
    'app',
    'facebook' 
  ],


  function (template, BullionGraph, SpotOverview, CurrentValue, Inventory) {
  var StackPanel = Backbone.View.extend({
  
    events: {
      'click .tabular': function() { 
        this.setActive($('#bullion-coll'), $('.btn.tabular'))
      },
      'click .graph': function() { 
        this.setActive($('#bullion-graph'), $('.btn.graph'), this.subviews.graph)
      }
    
    },
    template: template,
    id: "dashboard-stack",
    subviews: {},
    pageId: "",
    data: {},

    // queryParse: function() {
    //   var query = new Parse.Query('Bullion');
    //   var self = this;
    //   query.equalTo("metal", self.options.pageId).equalTo("uid", FB.getUserID()).find({
    //   //query.equalTo("metal", self.options.pageId).find({  
    //     success: function(results) {
    //       self.renderCollection(results);
    //       self.subviews.currentValue.setInventory(results);   
    //     },
    //     error: function(error) {
    //       console.log('You done fucked up');
    //     }
    //   }); 
    // }, 

    initialize: function(options) {
      this.options = options;
    
      // Initialize views
      this.subviews.spotOverview = new SpotOverview({id: options.pageId});
      this.subviews.currentValue = new CurrentValue({
        bullionType: options.pageId,
        detailView: 'detail-view'
      });

      this.collection = this.collection || new Inventory();
      this.collection.fetch({ metal: options.pageId, uid: sessionStorage.uid});
      this.collection.on('change', this.onCollection, this);
      console.log(this.collection)
      //this.queryParse();

    },

    onCollection: function(data) {
      console.log(data);
      this.subviews.currentValue.setInventory(data.attributes);
      this.renderCollection(data.attributes);
      this.inventory = data.attributes;
      //this.render();


      if(this.subviews.graph) this.subviews.graph.close();

      this.subviews.graph = new BullionGraph({
        el: this.$el.find('#bullion-graph'),
        pageId: this.options.pageId,
        inventory: data.attributes
      });          
      

    },

    renderCollection: function(data) {
      var table = $('.collection');
      var rowCount = $('.collection tr').length;

      for (var i = rowCount - 1; i > 0; i--) {
        $('.collection tr:last').remove();
      }

      _.each(data, function(obj) {
        var newRow = '<tr>' +  '<td class="hidden-xs col-image">' + 
          '<a href="#/dashboard/stack/' + this.options.pageId + '/view/' + obj.id + '"">' +
          '<span class="glyphicon glyphicon-picture"></span></a></td>' + 
          '<td class="col-item">' + obj.get("type") + '</td>' +
          '<td class="col-qty">' + obj.get("qty") + '</td>' + 
          '<td class="col-weight">' + obj.get("weight_per_unit") + '</td>' + 
          '<td class="col-percent">' + obj.get("bullion_percent") + '</td>' +
          '<td class="col-value"><a href="#/dashboard/stack/' + this.options.pageId + '/view/' + obj.id + '"">' +
            obj.get("unit_price") + '</a></td></tr>';
        table.append(newRow);
      }, this);

    },

    render: function() {
      this.$el.html(this.template());
      
      if(!this.initialized) {
        this.subviews.spotOverview.$el
          .appendTo(this.$el.find('#bullion-summaries'));
        this.subviews.currentValue.$el
          .appendTo(this.$el.find('#current-value'));                
        //this.subviews.graph.render();

        this.subviews.graph = new BullionGraph({
          el: this.$el.find('#bullion-graph'),
          pageId: this.options.pageId,
          inventory: this.inventory
        });            

        this.initialized = true;
      } else {
        $.each(this.subviews, function(k, subview) {
          subview.render();
        });
      } 

      //this.queryParse();
      //this.renderGraph();

      //console.log(this.subviews.spotOverview.collection.attributes)
      this.setActive(this.$el.find('#bullion-coll'), this.$el.find('.btn.tabular'));
      return this;
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

    setActive: function($el, $buttonEl, view) {
      var activeClass = 'active-panel';
      if(this.$activePanel) {
        this.$activePanel.removeClass(activeClass);
      }
      this.$activePanel = $el.addClass(activeClass);

      $('.btn.selected').removeClass('selected');
      $buttonEl.addClass('selected');

      // Ideally pass in just one arg, the view - but good enough
      if(view) {
        view.render();
      }
    },

    graphActive: function() {

      //this.$activePanel = $('.active-panel');
      this.$activePanel.removeClass('active-panel');
      
      var $bullionGraph = this.$el.find('#bullion-graph');
      $bullionGraph.addClass("active-panel");

      //this.renderGraph();
    },

    collActive: function() {
      var $activePanel = $('.active-panel');
      $activePanel.removeClass('active-panel');
      
      var $bullionColl = this.$el.find('#bullion-coll');
      $bullionColl.addClass("active-panel");

    }

  });                 

  return StackPanel;
});
=======
define(["vendor/tpl!../../templates/dash_stack.html","view/bullion/graph","view/bullion/spot_overview","view/bullion/current_value","model/inventory","app","facebook"],function(a,b,c,d,e){var f=Backbone.View.extend({events:{"click .tabular":function(){this.setActive($("#bullion-coll"),$(".btn.tabular"))},"click .graph":function(){this.setActive($("#bullion-graph"),$(".btn.graph"),this.subviews.graph)}},template:a,id:"dashboard-stack",subviews:{},pageId:"",data:{},initialize:function(a){this.options=a,this.subviews.spotOverview=new c({id:a.pageId}),this.subviews.currentValue=new d({bullionType:a.pageId,detailView:"detail-view"}),this.collection=this.collection||new e,this.collection.fetch({metal:a.pageId,uid:sessionStorage.uid}),this.collection.on("change",this.onCollection,this),console.log(this.collection)},onCollection:function(a){console.log(a),this.subviews.currentValue.setInventory(a.attributes),this.renderCollection(a.attributes),this.inventory=a.attributes,this.subviews.graph&&this.subviews.graph.close(),this.subviews.graph=new b({el:this.$el.find("#bullion-graph"),pageId:this.options.pageId,inventory:a.attributes})},renderCollection:function(a){for(var b=$(".collection"),c=$(".collection tr").length,d=c-1;d>0;d--)$(".collection tr:last").remove();_.each(a,function(a){var c='<tr><td class="hidden-xs col-image"><a href="#/dashboard/stack/'+this.options.pageId+"/view/"+a.id+'""><span class="glyphicon glyphicon-picture"></span></a></td><td class="col-item">'+a.get("type")+'</td><td class="col-qty">'+a.get("qty")+'</td><td class="col-weight">'+a.get("weight_per_unit")+'</td><td class="col-percent">'+a.get("bullion_percent")+'</td><td class="col-value"><a href="#/dashboard/stack/'+this.options.pageId+"/view/"+a.id+'"">'+a.get("unit_price")+"</a></td></tr>";b.append(c)},this)},render:function(){return this.$el.html(this.template()),this.initialized?$.each(this.subviews,function(a,b){b.render()}):(this.subviews.spotOverview.$el.appendTo(this.$el.find("#bullion-summaries")),this.subviews.currentValue.$el.appendTo(this.$el.find("#current-value")),this.subviews.graph=new b({el:this.$el.find("#bullion-graph"),pageId:this.options.pageId,inventory:this.inventory}),this.initialized=!0),this.setActive(this.$el.find("#bullion-coll"),this.$el.find(".btn.tabular")),this},close:function(){this.subviews.spotOverview&&(this.subviews.spotOverview.close(),this.subviews.spotOverview=null),this.subviews.graph&&(this.subviews.graph.close(),this.subviews.graph=null),this.remove(),this.unbind(),this.model&&this.model.unbind("change",this.modelChanged)},setActive:function(a,b,c){var d="active-panel";this.$activePanel&&this.$activePanel.removeClass(d),this.$activePanel=a.addClass(d),$(".btn.selected").removeClass("selected"),b.addClass("selected"),c&&c.render()},graphActive:function(){this.$activePanel.removeClass("active-panel");var a=this.$el.find("#bullion-graph");a.addClass("active-panel")},collActive:function(){var a=$(".active-panel");a.removeClass("active-panel");var b=this.$el.find("#bullion-coll");b.addClass("active-panel")}});return f});
>>>>>>> fe14298115419e2e088d5129a389dff29ee47deb
