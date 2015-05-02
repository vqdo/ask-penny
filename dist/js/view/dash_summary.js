define(['vendor/tpl!../../templates/dash_summary.html', 'app'], function (template) {
  var SummaryPanel = Backbone.View.extend({
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
      this.remove();
      this.unbind();
      if(this.model) {
        this.model.unbind("change", this.modelChanged);
      }
    }    
  });                 

  return SummaryPanel;
});