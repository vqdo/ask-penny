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

      this.model.fetch(); 
      this.model.on('change', this.render, this);


    },

    toggleView: function(isDetailView) {
      this.options.detailView = isDetailView;
      this.render();
    },

    render: function() {
      var addDecoration = function(value) {
        if(isNaN(value)) return value;

        return ((+value > 0)? '+' : '') + value + '%';
      }
      
      var attr = this.model.attributes;
      attr.detailView = this.options.detailView;
      attr.valueBoxWidth = (attr.detailView === 'detail-view')? 'col-xs-6' : 'col-xs-12';      
      
      if(this.model && this.inventory) {     
        var spots = attr.spots || {};
        if(!attr.spots) {
          spots[this.options.bullionType] = attr.spot;
        }

        var total = _.values(this.inventory).reduce(function(acc, data) {
          var type = data.attributes.metal;
          var value = data.attributes.qty * spots[type].bid;
          acc += isNaN(value)? 0 : value;
          return acc;
        }, 0);
      
        attr.changeOverall = addDecoration(attr.changeOverall);
        attr.changeDaily = attr.changeDaily && addDecoration(attr.changeDaily); 
        attr.total = total;      
      }

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