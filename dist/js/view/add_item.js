define(['vendor/tpl!../../templates/add_item.html', 'app'], function (template) {
  var AddItemPanel = Backbone.View.extend({
    template: template,
    id: "add",

    initialize: function() {
      // optional ctor
    },

    render: function() {
      console.log("are you here?");
      console.log(this.$el);
      console.log(this.template);

      this.$el.html(this.template({
          // hardcoded attrs
      }));
      return this;
    },

    close: function() {
      this.children().remove();
      this.unbind();
      this.model.unbind("change", this.modelChanged);
    }    
  });                 

  return AddItemPanel;
});