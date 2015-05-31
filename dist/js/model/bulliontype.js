define(['app'], function (app) {
  var BullionType = Backbone.Model.extend({
    defaults: {
      name: 'this is default data',
      total: 0,
      spot: {
        bid : 0,
        ask : 0,
        change: 0
      },
      value: 0,
    },
    url: function(data) {
      console.log(this);
      console.log(this.get('bullionType'));
      return '/bullion'
        + '/' + encodeURIComponent(this.get('user') || "someuser")
        + '/' + encodeURIComponent(this.get('bullionType') || "all");
    },
    initialize: function() {

    }
  });

  return BullionType;
});