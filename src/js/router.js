define(["backbone", "app"], function(Backbone, app) {
    var APRouter = Backbone.Router.extend({

      routes: {    
        "":                            "login",   
        "login(/)":                    "login", 
        "dashboard(/)":                "dashboard",  
        "dashboard/add":               "add",
        "dashboard/stack/:bullion":    "stack"
      }

    });

    var router = new APRouter();

    /**
     * Dashboard routing
     */
    require([
      //- dependencies
      'view/loginprompt',
      'view/dashboard', 
      'view/dash_summary',
      'view/add_item',
      'view/dash_stack'
    ], 
    function(LoginPrompt, Dashboard, DashSummary, AddPanel, DashStack) {    

      router.on('route:login', function() {
        app.changeView(LoginPrompt);
      });
      router.on('route:dashboard', function(id) {    
        app.changeView(Dashboard);
        app.getView().setContentView(DashSummary);
        this.navigate("dashboard", {trigger: true});
      });

      router.on('route:add', function(id) {     
        app.changeView(Dashboard);
        app.getView().setContentView(AddPanel);
        this.navigate("dashboard/add", {trigger: true});
      });  

      router.on('route:stack', function(bullionType) {     
        app.changeView(Dashboard);
        app.getView().setContentView(DashStack);
        this.navigate("dashboard/stack/" + bullionType, {trigger: true});
      });     

      Backbone.history.start();

    });

    return APRouter;
});