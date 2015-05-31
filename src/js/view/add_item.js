define(['vendor/tpl!../../templates/add_item.html', 'app'], function (template) {
  var AddItemPanel = Backbone.View.extend({
    events: {
      'click .submit-btn' : 'sendToParse'
    },

    template: template,
    id: "add",

    initialize: function(options) {
      // optional ctor
      this.options = options;
      Parse.initialize("pgIVxlWiJTswWbYnHqclimNwHZwdShkL48VmHZ8G", "Km1O6v0inoToEdisAMV80HoxEKIMwMUB3Yt5G1TG");
      console.log(this.options);
    },

    sendToParse: function() {
      console.log('Sending to parse!');
      var Bullion = Parse.Object.extend("Bullion");
      var item = new Bullion();
      item.add("metal", $(".metal_type").val());
      item.add("type", $(".coin_type").val());
      //item.add("purchase_date", $(".purch_date").val());
      //item.add("qty", $("#qty").val());
      //item.add("premium", $("#premium").val());
      //item.add("unit_price", $("#unit_price").val());
      // item.add("bullion_percent", 0.999);
      // item.add("weight_per_unit", 1.244);
      item.add("bullion_gpu", "ddddd");
      // item.add("bullion_ozpu", 0.04);

      item.save(null, {
        success: function(item) {
          console.log("success: " + item.id)
        },
        failure: function(item, error) {
          console.log("failure: " + error)
        }
      })
      item.save();
    },

    render: function() {
      this.$el.html(this.template({
          // hardcoded attrs
      }));
      return this;
    },

    close: function() {
      this.remove();
      this.unbind();
      if(this.model) {
        this.model.unbind("change", this.modelChanged);
      }
    }    
  });                 

  return AddItemPanel;
});