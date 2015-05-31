define(['app'], function (app) {
  var BullionType = Backbone.Model.extend({
    
    initialize: function() {

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
    },
    del: function(id) {
      var Bullion = Parse.Object.extend("Bullion");
      var query = new Parse.Query(Bullion);
      var dfd = new jQuery.Deferred();
      var self = this;

      query.get(id, {
        success: function(data) {
          console.log("Fetched from Parse!");
          console.log(data);
          data.destroy({
            success: function(data) {
              dfd.resolve();
              console.log("The bullion was destroyed.");
            },
            error: function(data, error) {
              console.log("Error: " + error);
            }
          });
        },
        error: function(data, error) {
          console.log("failure: " + error);
        }
      });

      return dfd.promise();
    },
    update: function(id) {
      var Bullion = Parse.Object.extend("Bullion");
      var query = new Parse.Query(Bullion);
      var dfd = new jQuery.Deferred();
      var self = this;

      query.get(id, {
        success: function(data) {
          console.log("Fetched from Parse!");
          console.log(data);
          data.set("purchase_date", $("#purch_date_det").val());
          data.set("qty", parseFloat($("#qty_det").val()));
          data.set("premium", $("#premium_det").val());
          data.set("unit_price", parseFloat($("#unit_price_det").val()));
          console.log(data);
          data.save(null, {
            success: function(data) {
              dfd.resolve();
              console.log("The bullion was updated.");
              window.location.replace('#/dashboard/stack/' + self.options.pageId);
            },
            error: function(data, error) {
              console.log("Error: " + error);
            }
          });
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