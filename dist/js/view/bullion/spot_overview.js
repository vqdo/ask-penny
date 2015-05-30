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