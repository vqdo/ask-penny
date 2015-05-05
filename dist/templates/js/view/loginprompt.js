define(['vendor/tpl!../../templates/login.html', 'app'], function (template) {
  var LoginPrompt = Backbone.View.extend({
    template: template,
    id: "dashboard",

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

  return LoginPrompt;
});