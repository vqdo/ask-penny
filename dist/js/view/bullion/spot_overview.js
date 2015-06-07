<<<<<<< HEAD
define([
  'vendor/tpl!/templates/bullion/spot_overview.html', 
  'model/bulliontypes',
  'model/inventory',
  'app'], 

  function (spotTemplate, BullionTypes, Inventory, app) {
  var SpotOverview = Backbone.View.extend({
    template: spotTemplate,

    initialize: function(options) {

      this.collection = this.collection || new BullionTypes();

      this.collection.fetch();      
      this.collection.on('change', this.render, this);

      this.inventory = this.inventory || new Inventory();
      this.inventory.fetch({}, true).then(function(stuff) {
        console.log(stuff);
      });
      this.inventory.on('change', this.render, this);      

      this.options = options;
    },

    setInventory: function(inventory) {
      if(!this.collection.attributes) return;

      // var self = this;
      // console.log(inventory);
      // console.log(this.collection);      
      // var getModel = function(metal) {
      //   var model = null;
      //   _.each(self.collection.attributes, function(item) {
      //     if(item.name === metal) {
      //       model = item;
      //     }
      //   });

      //   return model;
      // }

      // var models = [];
      // _.each(inventory, function(item) {
      //   var attr = item.attributes;
      //   var metal = attr.metal;
      //   var model = getModel(metal);
      //   console.log(metal);
      //   console.log(attr);
      //   console.log(model);

      //   model.qty += attr.qty || 0;
      //   model.ounces += attr.bullion_ozpu || 0;
      //   models.push(model);
      // });

      // this.collection.set(model);
      // console.log(this.collection);
    },

    render: function(arg) {    
      this.$el.children().remove();
      var inventory = app.getSharedVariable('inventory');
      console.log(inventory);
      var process = function(item) {
        if(isNaN(item.spot.change)) 
          return item.spot.change;

        if(+item.spot.change > 0) {
          item.spot.change = '+' + item.spot.change;
          item.changeIndicatorClass = 'value-positive';
        } else if(+item.spot.change < 0) {
          item.changeIndicatorClass = 'value-negative';
        } else {
          item.changeIndicatorClass = '';
        }
        
        return item;
      }

      var currentSpot = app.getSharedVariable('spots') || {};
      _.each(this.collection.attributes, function(item) {
        if(this.options.id) {
          if(item.name !== this.options.id) {
            return;
          }
          //PURPOSE?
        }
        item.ounces = inventory[item.name].count || 0;
        item.total = (item.ounces * item.spot.bid / 0.95).toFixed(2);
        currentSpot[item.name] = item;

        item.displayName = (this.options.id)? 'Current Spot' : item.name;
        this.$el.append(this.template(process(item)));
      }, this);

      // Cache for later
      app.setSharedVariable('spots', currentSpot);

      return this;
    },

    // switchTemplate: function(template) {
    //   if(template === "stack") {
    //     this.template = stackTemplate;
    //     console.log("Switching to stack template");
    //   } else {
    //     this.template = spotTemplate;
    //   }

    //   this.render();
    // },

    close: function() {
      this.remove();
      this.unbind();

      if(this.collection) {
        this.collection.unbind("change", this.collectionChanged);
      }
    }    
  });                 

  return SpotOverview;
});
=======
define(["vendor/tpl!/templates/bullion/spot_overview.html","model/bulliontypes","model/inventory","app"],function(a,b,c,d){var e=Backbone.View.extend({template:a,initialize:function(a){this.collection=this.collection||new b,this.collection.fetch(),this.collection.on("change",this.render,this),this.inventory=this.inventory||new c,this.inventory.fetch({},!0).then(function(a){console.log(a)}),this.inventory.on("change",this.render,this),this.options=a},setInventory:function(a){!this.collection.attributes},render:function(a){this.$el.children().remove();var b=d.getSharedVariable("inventory");console.log(b);var c=function(a){return isNaN(a.spot.change)?a.spot.change:(+a.spot.change>0?(a.spot.change="+"+a.spot.change,a.changeIndicatorClass="value-positive"):+a.spot.change<0?a.changeIndicatorClass="value-negative":a.changeIndicatorClass="",a)},e=d.getSharedVariable("spots")||{};return _.each(this.collection.attributes,function(a){if(this.options.id){if(a.name!==this.options.id)return;a.name="Current Spot"}a.ounces=b[a.name].count||0,a.total=(a.ounces*a.spot.bid/.95).toFixed(2),e[a.name]=a,this.$el.append(this.template(c(a)))},this),d.setSharedVariable("spots",e),this},close:function(){this.remove(),this.unbind(),this.collection&&this.collection.unbind("change",this.collectionChanged)}});return e});
>>>>>>> fe14298115419e2e088d5129a389dff29ee47deb
