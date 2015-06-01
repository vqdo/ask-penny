define([
  'vendor/tpl!/templates/bullion/spot_overview.html', 
  'model/bulliontypes'], 

  function (spotTemplate, BullionTypes) {
  var SpotOverview = Backbone.View.extend({
    template: spotTemplate,

    initialize: function(options) {

      this.collection = this.collection || new BullionTypes();

      this.collection.fetch();      
      this.collection.on('change', this.render, this);

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
      var process = function(item) {
        if(+item.spot.change > 0) {
          item.spot.change = '+' + item.spot.change;
          item.changeIndicatorClass = 'value-positive';
        } else {
          item.changeIndicatorClass = 'value-negative';
        }
        
        return item;
      }
      _.each(this.collection.attributes, function(item) {
        if(this.options.id) {
          if(item.name !== this.options.id) {
            return;
          }

          item.name = "Current Spot";
        }

        this.$el.append(this.template(process(item)));
      }, this);

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