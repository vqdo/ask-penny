define(
['app', 'model/item'], 

function (app, Item) {
  var Inventory = Backbone.Model.extend({
    model: Item,
    initialize: function() {

      Parse.initialize("pgIVxlWiJTswWbYnHqclimNwHZwdShkL48VmHZ8G", "Km1O6v0inoToEdisAMV80HoxEKIMwMUB3Yt5G1TG");      
    },

    fetch: function(attr) {

      console.log(attr)
      attr = attr || {};
      if(!attr.uid)
        console.warn("Inventory init: No user id passed in.");          

      var dfd = new jQuery.Deferred();    
      var query = new Parse.Query('Bullion');
      var self = this;

      // Add constraints
      console.log(this.metal);
      if(attr.metal)  query = query.equalTo('metal', attr.metal);
      if(attr.uid) query = query.equalTo('user', attr.uid);

      query.find({
        success: function(results) {
          self.set(results);
          dfd.resolve(results);
        },
        error: function(error) {
          dfd.reject(error);
        }
      }); 

      return dfd.promise();
    }
  });

  return Inventory;
});