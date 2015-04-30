define(["backbone", "app"], function(Backbone) {
    var APRouter = Backbone.Router.extend({

      routes: {
        "dashboard(/)":            "dashboard"    // #help
      }

    });

    var router = new APRouter();

    router.on('route:dashboard', function(id) {
      require(['view/dashboard'], function(Dashboard) {        
        var dashboard = new Dashboard({
          el: $('#frame')
        });

        dashboard.render();
      });
    });

    Backbone.history.start();

    return APRouter;
});