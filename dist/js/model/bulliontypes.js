define(
['app', 'model/bulliontype'], 

function (app, BullionType) {
  var BullionTypes = Backbone.Model.extend({
    model: BullionType,
    url: '/bullion/someuser',
    initalize: function() {

    }
  });

  return BullionTypes;
});