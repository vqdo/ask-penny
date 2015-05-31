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

    initialize: function(options) {
      this.options = options;
      Parse.initialize("pgIVxlWiJTswWbYnHqclimNwHZwdShkL48VmHZ8G", "Km1O6v0inoToEdisAMV80HoxEKIMwMUB3Yt5G1TG");
      // Initialize views
      this.subviews.spotOverview = new SpotOverview({id: options.pageId});
      this.subviews.currentValue = new CurrentValue({bullionType: options.pageId});

      // if(!this.collection) {
      //   this.collection = new BullionTypes();
      //   this.collection.fetch();
      // }
      // console.log(this.pageId);
      var query = new Parse.Query('Bullion');
      var self = this;
      query.equalTo("metal", options.pageId).find({
        success: function(results) {
          self.renderCollection(results);
        },
        error: function(error) {
          console.log('You done fucked up');
        }
      });

    },

    renderCollection: function(data) {
      var arrLength = data.length;
      //alert('we found' + arrLength + ' matches');
      var table = $('.collection');
      for (var i = 0; i < arrLength; i++) {
        var obj = data[i];
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
      }
    },

    render: function() {
      this.$el.html(this.template());
      
      if(!this.initialized) {
        this.subviews.spotOverview.$el
          .appendTo(this.$el.find('#bullion-summaries'));
        this.subviews.currentValue.$el
          .appendTo(this.$el.find('#current-value'));  

        this.subviews.graph = new BullionGraph({
          el: this.$el.find('#bullion-graph'),
          pageId: this.options.pageId
        });                
        //this.subviews.graph.render();

        this.initialized = true;
      } else {
        $.each(this.subviews, function(k, subview) {
          subview.render();
        });
      }


      //this.renderGraph();

      //console.log(this.subviews.spotOverview.collection.attributes)
      this.setActive(this.$el.find('#bullion-coll'), this.$el.find('.btn.tabular'));
      return this;
    },
    
    // renderGraph: function() {
    //   if(!this.subviews.graph) {
    //     this.subviews.graph = new BullionGraph({
    //       el: this.$el.find('#bullion-graph'),
    //       pageId: this.options.pageId
    //     });
    //   } else {
    //     this.subviews.graph.render();
    //   }
    // },
       
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