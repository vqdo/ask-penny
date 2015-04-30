define(['vendor/tpl!../../dashboard.html', 'app'], function (template) {
  var Dashboard = Backbone.View.extend({
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

  return Dashboard;
});