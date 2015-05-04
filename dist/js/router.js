define(["backbone", "app"], function(Backbone, app) {
    var APRouter = Backbone.Router.extend({

      routes: {    
        "":                                     "login",   
        "login(/)":                             "login", 
        "dashboard(/)":                         "dashboard",
        "dashboard/stack/:bullion":             "stack",  
        "dashboard/stack/:bullion/add":         "add",        
        "dashboard/stack/:bullion/view/:id(/)":      "view"
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
      'view/item_detail',   
      'view/dash_stack'
    ], 
    function(LoginPrompt, Dashboard, DashSummary, AddPanel, ItemDetailPanel, DashStack) {    

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

      router.on('route:view', function(bullionType, id) {
        app.changeView(Dashboard);
        app.getView().setContentView(ItemDetailPanel, {
          itemId: id,
          pageId: bullionType
        });
        this.navigate("dashboard/stack/" + bullionType + "/view/" + id, {trigger: true});
      }); 

      Backbone.history.start();

    });

    return APRouter;
});