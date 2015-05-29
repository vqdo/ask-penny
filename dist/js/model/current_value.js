define(['app'], function (app) {
  var CurrentValue = Backbone.Model.extend({
    defaults: {
      label: 'My Total Stack Value',
      value: 24000,
      change: 3.5,

      // Only used in bullion view
      overallChange: 3.5
    },
    initalize: function() {

    }
  });

  return CurrentValue;
});