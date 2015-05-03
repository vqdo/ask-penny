define(["backbone", "app"], function(Backbone, app) {
    var APRouter = Backbone.Router.extend({

      routes: {    
        "":                            "login",   
        "login(/)":                    "login", 
        "dashboard(/)":                "dashboard",  
        "dashboard/stack/:bullion/add": "add",
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

      router.on('route:add', function(bullionType) {     
        app.changeView(Dashboard);
        app.getView().setContentView(AddPanel, {
          pageId: bullionType
        });
        this.navigate("dashboard/stack/" + bullionType + "/add", {trigger: true});
      });  

      router.on('route:stack', function(bullionType) {     
        app.changeView(Dashboard);
        app.getView().setContentView(DashStack, {
          pageId: bullionType
        });
        this.navigate("dashboard/stack/" + bullionType, {trigger: true});
      });     

      Backbone.history.start();

    });

    return APRouter;
});