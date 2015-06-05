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