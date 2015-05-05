define(
['app', 'model/bulliontype'], 

function (app, BullionType) {
  var BullionTypes = Backbone.Model.extend({
    model: BullionType,
    url: '/data/bulliontypes.json',
    initalize: function() {

    }
  });

  return BullionTypes;
});