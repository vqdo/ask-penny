define(['app'], function (app) {
  var BullionType = Backbone.Model.extend({
    defaults: {
      name: 'Name',
      spot: {
        bid : 1206,
        ask : 1207,
        change: 23
      },
      value: 18234.10,
      dailyChange: 3.5,
      overallChange: 1.2
    },
    initalize: function() {

    }
  });

  return BullionType;
});