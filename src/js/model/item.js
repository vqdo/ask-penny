define(['app'], function (app) {
  var BullionType = Backbone.Model.extend({
    defaults: {
      name: 'this is default data',
      total: 5000,
      spot: {
        bid : 1206,
        ask : 1207,
        change: 23
      },
      value: 18234.10,
    },
    initalize: function() {

    },
    fetch: function(id) {
      // Parse
      var dfd = new jQuery.Deferred();
      
      Parse.query(id, function(data) {
        this.set(data);
        dfd.resolve();
      }

      return dfd.promise();
    }
  });

  return BullionType;
});