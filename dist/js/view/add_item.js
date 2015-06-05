define(['vendor/tpl!../../templates/add_item.html', 'app', 'facebook'], function (template) {
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

    sendToParse: function(evt) {
      evt.preventDefault();
      console.log(evt);
      console.log('Sending to parse!');
      var Bullion = Parse.Object.extend("Bullion");
      var item = new Bullion();
      item.set("uid", sessionStorage.uid);
      item.set("metal", $(".metal_type").html());
      item.set("type", $(".coin_type").val());
      item.set("purchase_date", $(".purch_date").val());
      item.set("qty", parseFloat($(".qty").val()));
      item.set("premium", $(".premium").val());
      item.set("unit_price", parseFloat($(".unit_price").val()));
      var percent = parseFloat($(".percent").val());
      item.set("bullion_percent", percent);
      var weight = parseFloat($(".weight").val());
      item.set("weight_per_unit", weight);
      var gpu = parseFloat((percent * weight).toFixed(2));
      item.set("bullion_gpu", gpu);
      var ozpu = parseFloat(((percent * weight)/31.3).toFixed(2));
      item.set("bullion_ozpu", ozpu);

      console.log(FB.getUserID())
      console.log(item)
      var self = this;
      item.save(null, {
        success: function(item) {
          console.log("success: " + item.id)
          window.location.replace('#/dashboard/stack/' + self.options.pageId);
        },
        failure: function(item, error) {
          console.log("failure: " + error)
        }
      })
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