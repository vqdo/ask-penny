define(['vendor/tpl!../../templates/home.html', 'app'], function (template) {
  var HomePanel = Backbone.View.extend({
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

  return HomePanel;
});