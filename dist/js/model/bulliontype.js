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
    url: function(data) {
      console.log(this);
      console.log(this.get('bullionType'));
      return '/bullion'
        + '/' + encodeURIComponent(this.get('user') || "someuser")
        + '/' + encodeURIComponent(this.get('bullionType') || "all");
    },
    initalize: function() {

    }
  });

  return BullionType;
});