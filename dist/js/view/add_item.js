define(['vendor/tpl!../../templates/add_item.html', 'app'], function (template) {
  var AddItemPanel = Backbone.View.extend({
    template: template,
    id: "add",

    initialize: function() {
      // optional ctor
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