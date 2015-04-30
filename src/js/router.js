define(["backbone", "app"], function(Backbone, app) {
    var APRouter = Backbone.Router.extend({

      routes: {
        "dashboard/gold(/)":  "viewGold",        
        "dashboard(/)":       "dashboard"    
      }

    });

    var router = new APRouter();

    // router.on('route', function() {
    //   if(!app.currentView) {
    //     app.init();
    //   }
    // });

    router.on('route:dashboard', function(id) {
      require(['view/dashboard'], function(Dashboard) {        
        app.changeView(Dashboard);
      });
    });

    Backbone.history.start();

    return APRouter;
});