define(['vendor/tpl!../../templates/dashboard.html', 'app'], function (template) {
  var Dashboard = Backbone.View.extend({
    template: template,
    id: "dashboard",

    initialize: function(viewClass) {
      this.currentView = null;
    },

    render: function() {
      this.$el.html(this.template({
          // hardcoded attrs
      }));

      // Container for subviews
      this.contentFrame = this.$el.find('#wrapper');
      console.log(this.$el);
      console.log(this.contentFrame);

      return this;
    },

    setContentView: function(View) {
      if(this.currentView) {
        //TODO: dont close if its the same view

        this.currentView.close();
      }

      this.currentView = new View({
      });

      this.currentView.render().$el.appendTo(this.contentFrame);
    },

    getContentView: function() {
      return this.currentView;
    },

    close: function() {
      this.children().remove();
      this.unbind();
      this.model.unbind("change", this.modelChanged);
    }    
  });                 

  return Dashboard;
});