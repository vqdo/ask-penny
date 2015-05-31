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

      console.log(this.options);
    },

    sendToParse: function() {
      console.log('Sending to parse!');
      
      Parse.initialize("pgIVxlWiJTswWbYnHqclimNwHZwdShkL48VmHZ8G", "Km1O6v0inoToEdisAMV80HoxEKIMwMUB3Yt5G1TG");
      var Bullion = Parse.Object.extend("Bullion");
      var item = new Bullion();
      item.add("metal", $(".metal_type").value);
      item.add("type", $(".type").value);
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