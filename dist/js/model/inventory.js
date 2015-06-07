<<<<<<< HEAD
define(
['app', 'model/item'], 

function (app, Item) {
  var Inventory = Backbone.Model.extend({
    model: Item,
    initialize: function() {
      Parse.initialize("pgIVxlWiJTswWbYnHqclimNwHZwdShkL48VmHZ8G", "Km1O6v0inoToEdisAMV80HoxEKIMwMUB3Yt5G1TG");      
    },

    fetch: function(attr, getCached) {
      attr = attr || {};

      var dfd = new jQuery.Deferred();    

      if(getCached) {
        var items = app.getSharedVariable('inventory');
        if(items) {
          // return if it has all items or the requested metal
          if(items.length >= 3 || items[attr.metal]) {
            var result = (attr.metal)? items[attr.metal] : items;
            dfd.resolve(result);
          }
        }
      }    

      if(!attr.uid)
        console.warn("Inventory init: No user id passed in.");      
      var query = new Parse.Query('Bullion');
      var self = this;

      // Add constraints
      if(attr.metal)  query = query.equalTo('metal', attr.metal);
      query = query.equalTo('uid', attr.uid || sessionStorage.uid);

      query.find({
        success: function(results) {
          //console.log(results);

          // TODO: Should work if no metal selected
          //if(attr.metal) {
            // Save to app for later access
            var inventory = app.getSharedVariable('inventory') || {};


            var getCount = function(d) {
              if(!$.isArray(d)) return console.error("not an array!", d);
              return d.reduce(function(acc, item) {
                var multiplier = (+item.attributes.qty || 0) * (+item.attributes.bullion_ozpu || 0);
                return acc + multiplier;
              }, 0);
            }

            if(attr.metal) {
              // Save each item with its count
              inventory[attr.metal] = {
                items: results,
                count: getCount(results)
              }
            } else {
              $.each(inventory, function(i, items) { items.items = []});

              $.each(results, function(i, result) {
                console.log(inventory);
                console.log(result.attributes.metal);
                var items = inventory[result.attributes.metal].items;
                items.push(result);
              });

              $.each(inventory, function(i, items) {
                items.count = getCount(items.items)
              });

              console.log(inventory);
            }

            app.setSharedVariable('inventory', inventory);
            //if(getCached) dfd.resolve(inventory);            
          //}

          // TODO: return inventory instead lol
          dfd.resolve(results);       
          self.set(results);             
        },
        error: function(error) {
          console.error(error);
          dfd.reject(error);
        }
      }); 

      return dfd.promise();
    }
  });

  return Inventory;
});
=======
define(["app","model/item"],function(a,b){var c=Backbone.Model.extend({model:b,initialize:function(){Parse.initialize("pgIVxlWiJTswWbYnHqclimNwHZwdShkL48VmHZ8G","Km1O6v0inoToEdisAMV80HoxEKIMwMUB3Yt5G1TG")},fetch:function(b,c){b=b||{};var d=new jQuery.Deferred;if(c){var e=a.getSharedVariable("inventory");if(e&&(e.length>=3||e[b.metal])){var f=b.metal?e[b.metal]:e;d.resolve(f)}}b.uid||console.warn("Inventory init: No user id passed in.");var g=new Parse.Query("Bullion"),h=this;return b.metal&&(g=g.equalTo("metal",b.metal)),g=g.equalTo("uid",b.uid||sessionStorage.uid),g.find({success:function(c){var e=a.getSharedVariable("inventory")||{},f=function(a){return $.isArray(a)?a.reduce(function(a,b){var c=(+b.attributes.qty||0)*(+b.attributes.bullion_ozpu||0);return a+c},0):console.error("not an array!",a)};b.metal?e[b.metal]={items:c,count:f(c)}:($.each(e,function(a,b){b.items=[]}),$.each(c,function(a,b){var c=e[b.attributes.metal].items;c.push(b)}),$.each(e,function(a,b){b.count=f(b.items)}),console.log(e)),a.setSharedVariable("inventory",e),d.resolve(c),h.set(c)},error:function(a){console.error(a),d.reject(a)}}),d.promise()}});return c});
>>>>>>> fe14298115419e2e088d5129a389dff29ee47deb
