define(['vendor/tpl!../../templates/item_detail.html', 'app'], function (template) {
  var ItemDetailPanel = Backbone.View.extend({
    template: template,

    initialize: function(options) {
      // optional ctor
      this.options = options;
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

  return ItemDetailPanel;
});