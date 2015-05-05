define(['vendor/tpl!../../templates/dashboardpanel.html', 'app'], function (template) {
  var Panel = Backbone.View.extend({
    template: template,
    id: "ap-home",

    initialize: function() {

    },

    render: function() {
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

  return Panel;
});