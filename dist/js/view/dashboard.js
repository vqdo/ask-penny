define(['vendor/tpl!../../templates/dashboard.html', 'app', 'facebook'], function (template) {
  var Dashboard = Backbone.View.extend({
    template: template,
    id: "dashboard",

    initialize: function() {
      this.currentView = null;
      this.options = {};
    },

    render: function() {
      this.$el.html(this.template({
          // hardcoded attrs
      }));

      // Container for subviews
      this.contentFrame = this.$el.find('#wrapper');

      return this;
    },

    _setActiveLink: function(pageId) {
      // Remove currently active links
      $('#menu .active').removeClass('active');

      var target = "#link-" + (pageId? pageId : "home");
      console.log(target);
      
      $(target).addClass('active');
    },

    setContentView: function(View, options) {
      console.log("set content view");
      var self = this;
      if(this.currentView) {
        this.currentView.close();
      }

      this.options = options || this.options;
      this.render();       
      console.log(this.options);

      //NO
      //this.options = {};

      this.currentView = new View(options);
      this.currentView.render().$el.appendTo(this.contentFrame);

      this._setActiveLink(options && options.pageId);     

    },

    getContentView: function() {
      return this.currentView;
    },

    close: function() {
      this.$el.children().remove();
      this.unbind();
      this.model.unbind("change", this.modelChanged);
    }    
  });                 

  return Dashboard;
});