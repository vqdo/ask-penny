define(['vendor/tpl!../../templates/login.html', 'app', 'facebook'], function (template) {
  var LoginPrompt = Backbone.View.extend({
    events: {
      'click .login-button' : 'login',
      'click .signup-button' : 'login'
    },
    template: template,
    id: "dashboard",

    initialize: function() {

      console.log(sessionStorage)
      // optional ctor
      if(sessionStorage.uid)
        window.location.href = "#/dashboard"

    },

    render: function() {
      this.$el.html(this.template({
          // hardcoded attrs
      }));


      return this;
    },

    login: function() {
      FB.login(function(response) {
        if (response.authResponse) {
          window.location.href = "#/dashboard";
          sessionStorage.uid = FB.getUserID();
          console.log("The session storage ID is: "+sessionStorage.uid);
          var client = new Keen({
                projectId: "5570c019e08557070092c4a2",
                writeKey: "754f9c57839666c4666712c16eae8dc9b077a0d47fb8e7af5c9ba544b693b11836f8be6fa3271845521cbfd24d57532ccf5bcc1417ecf9505fefa28a171290c2867e058c28635b89b03dd6fcd1efb42153b42522bc25c89d92b502f6c4dae53cb3d85c40b42ed1462681eca179b7d4f1",
                readKey: "6eca6d305595ca4a909116672f1cdd286b295d6b43686e757ed01b434e586203fca09981cff6cf2ca942a16bbf8f034a68d8a2174b5adf58eeddf31b1d0cde603c840defb1fb08445325d6fc894153861c6f83236bc9decfa4648e495eff2830f63c03e8cc7e3215b5d3cc8327f9a372",
                protocol: "https",
                host: "api.keen.io/3.0", 
                requestType: "jsonp" 
              });
              var loginEvent = { 
                user_id: sessionStorage.uid,
                keen: {
                  timestamp: new Date().toISOString()
                }
              };
              client.addEvent("login", loginEvent, function(err, res){
                  if (err) {
                    console.log("event did not load into keen...error!");
                  }
                  else {
                    console.log("event added");
                  }
              });
        } else {
          console.error("unable to login")
        }
      });
    },

    close: function() {
      this.remove();
      this.unbind();
      if(this.model) {
        this.model.unbind("change", this.modelChanged);
      }
    }
  });                 


  return LoginPrompt;
});