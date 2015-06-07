<<<<<<< HEAD
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
        console.log('TOTAL CALC');
        console.log(this.inventory);
        attr.total = _.values(this.inventory).reduce(function(acc, data) {
          var type = data.attributes.metal;
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
=======
define(["vendor/tpl!/templates/bullion/current_value.html","model/bulliontype","canvasjs"],function(a,b,c){var d=Backbone.View.extend({template:a,id:"current-value-"+this.cid,initialize:function(a){this.options=a||{},this.model=this.model||new b,this.options.bullionType&&this.model.set("bullionType",a.bullionType),this.model.fetch({cache:!0}),this.model.on("change",this.render,this)},toggleView:function(a){this.options.detailView=a,this.render()},render:function(){var a=function(a){return isNaN(a)?a:(+a>0?"+":"")+(+a).toFixed(2)+"%"},b=_.clone(this.model.attributes);if(b.detailView=this.options.detailView,b.valueBoxWidth="detail-view"===b.detailView?"col-xs-6":"col-xs-12",!$.isEmptyObject(b)&&this.inventory){var c=b.spots||{};b.spots||(c[this.options.bullionType]=b.spot),b.total=_.values(this.inventory).reduce(function(a,b){var d=b.attributes.metal,e=1.05263*b.attributes.qty*c[d].bid;return a+=isNaN(e)?0:e},0),b.total=b.total.toFixed(2)}return b.changeOverall=a(b.total?b.changeOverall||0:0),b.changeDaily=a(b.total?b.changeDaily||0:0),this.$el.html(this.template(b)),this},setInventory:function(a){this.inventory=a,this.render()},close:function(){this.remove(),this.unbind(),this.model&&this.model.unbind("change",this.modelChanged)}});return d});
>>>>>>> fe14298115419e2e088d5129a389dff29ee47deb
