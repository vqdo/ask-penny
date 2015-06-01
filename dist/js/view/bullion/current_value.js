define(
  ['vendor/tpl!/templates/bullion/current_value.html', 
  'model/bulliontype', 
  'canvasjs'], 
  function (template, BullionType, GraphData) {
  var BullionGraph = Backbone.View.extend({
    template: template,
    id: "current-value-" + this.cid,

    initialize: function(options) {
      this.options = options || {};      
      this.model = this.model || new BullionType();

      if(this.options.bullionType) 
        this.model.set('bullionType', options.bullionType);

      this.model.fetch({cache: true}); 
      this.model.on('change', this.render, this);


    },

    toggleView: function(isDetailView) {
      this.options.detailView = isDetailView;
      this.render();
    },

    render: function() {
      var addDecoration = function(value) {
        //console.log(value + " " + isNaN(value));
        if(isNaN(value)) return value;

        return ((+value > 0)? '+' : '') + (+value).toFixed(2) + '%';
      }
      
      var attr = _.clone(this.model.attributes);

      // Display Daily+Overall or simple view
      attr.detailView = this.options.detailView;
      attr.valueBoxWidth = (attr.detailView === 'detail-view')? 'col-xs-6' : 'col-xs-12';      
      
      //var total = attr.total || 0;
      if(!$.isEmptyObject(attr) && this.inventory) {     
        var spots = attr.spots || {};

        // Create object containing current spot prices
        if(!attr.spots) {
          spots[this.options.bullionType] = attr.spot;
        }

        attr.total = _.values(this.inventory).reduce(function(acc, data) {
          var type = data.attributes.metal;
          //console.log(type);
          var value = data.attributes.qty * (spots[type].bid * 1.05263);
          acc += isNaN(value)? 0 : value;
          return acc;
        }, 0);
        attr.total = attr.total.toFixed(2);
      }
      //attr.total = total;       
      attr.changeOverall = attr.total ? addDecoration(attr.changeOverall || 0) : addDecoration(0);
      attr.changeDaily =  attr.total ? addDecoration(attr.changeDaily || 0) : addDecoration(0);    

      this.$el.html(this.template(attr));
      return this;
    },

    setInventory: function(inventory) {
      this.inventory = inventory;
      this.render();
    },

    close: function() {
      this.remove();
      this.unbind();

      if(this.model) {
        this.model.unbind("change", this.modelChanged);
      }
    }    
  });                 

  return BullionGraph;
});