define(["backbone", "app"], function(Backbone, app) {
    var APRouter = Backbone.Router.extend({

      routes: {
        "dashboard/gold(/)":  "viewGold",        
        "dashboard(/)":       "dashboard",  
        "dashboard/add":      "add"
      }

    });

    var router = new APRouter();

    /**
     * Dashboard routing
     */
    require([
      //- dependencies
      'view/dashboard', 
      'view/dash_summary',
      'view/add_item'
    ], 
    function(Dashboard, DashSummary, AddPanel) {    

      router.on('route:dashboard', function(id) {    
        app.changeView(Dashboard);
        app.getView().setContentView(DashSummary);
        this.navigate("dashboard");
      });

      router.on('route:add', function(id) {     
        app.changeView(Dashboard);
        app.getView().setContentView(AddPanel);
        this.navigate("dashboard/add");
      });      

    });

    Backbone.history.start();

    return APRouter;
});