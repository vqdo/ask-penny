define(['app'], function (app) {
  var BullionType = Backbone.Model.extend({
    
    initalize: function() {

    },
    fetch: function(id) {
      var Bullion = Parse.Object.extend("Bullion");
      var query = new Parse.Query(Bullion);
      var dfd = new jQuery.Deferred();
      var self = this;

      query.get(id, {
        success: function(data) {
          console.log("Fetched from Parse!");
          console.log(data);
          self.set(data.attributes);
          dfd.resolve();
        },
        error: function(data, error) {
          console.log("failure: " + error);
        }
      });

      return dfd.promise();
    }
  });

  return BullionType;
});