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
    }
  });                 

  return LoginPrompt;
});