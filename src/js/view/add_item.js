define(['vendor/tpl!../../templates/add_item.html', 'app'], function (template) {
  var AddItemPanel = Backbone.View.extend({
    events: {
      'click: .submit-btn' : 'sendToParse'
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
      /*
      Parse.initialize("pgIVxlWiJTswWbYnHqclimNwHZwdShkL48VmHZ8G", "Km1O6v0inoToEdisAMV80HoxEKIMwMUB3Yt5G1TG");
      var TestObject = Parse.Object.extend("TestObject");
      var testObject = new TestObject();
      testObject.save({foo: "bar"}).then(function(object) {
        alert("yay! it worked");
      });
      */
    },

    render: function() {
      this.$el.html(this.template({
          // hardcoded attrs
      }));

      //$(".submit-btn").addEventListener("click", sendToParse);
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