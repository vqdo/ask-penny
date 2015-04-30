define(["backbone", "app"], function(Backbone, app) {
    var APRouter = Backbone.Router.extend({

      routes: {
        "dashboard/gold(/)":  "viewGold",        
        "dashboard(/)":       "dashboard",  
        "dashboard/add":  "add" 

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

    router.on('route:add', function(id) {
      require(['view/add_item'], function(View) {        
        app.updateDashboard(View);
      });
    });

    Backbone.history.start();

    return APRouter;
});