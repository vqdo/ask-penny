define(["app"],function(a){var b=Backbone.Model.extend({initialize:function(){},fetch:function(a){var b=Parse.Object.extend("Bullion"),c=new Parse.Query(b),d=new jQuery.Deferred,e=this;return c.get(a,{success:function(a){console.log("Fetched from Parse!"),console.log(a),e.set(a.attributes),d.resolve()},error:function(a,b){console.log("failure: "+b)}}),d.promise()},del:function(a){var b=Parse.Object.extend("Bullion"),c=new Parse.Query(b),d=new jQuery.Deferred;return c.get(a,{success:function(a){console.log("Fetched from Parse!"),console.log(a),a.destroy({success:function(a){d.resolve(),console.log("The bullion was destroyed.")},error:function(a,b){console.log("Error: "+b)}})},error:function(a,b){console.log("failure: "+b)}}),d.promise()},update:function(a){var b=Parse.Object.extend("Bullion"),c=new Parse.Query(b),d=new jQuery.Deferred,e=this;return c.get(a,{success:function(a){console.log("Fetched from Parse!"),console.log(a),a.set("purchase_date",$("#purch_date_det").val()),a.set("qty",parseFloat($("#qty_det").val())),a.set("premium",$("#premium_det").val()),a.set("unit_price",parseFloat($("#unit_price_det").val())),console.log(a),a.save(null,{success:function(a){d.resolve(),console.log("The bullion was updated."),window.location.replace("#/dashboard/stack/"+e.options.pageId)},error:function(a,b){console.log("Error: "+b)}})},error:function(a,b){console.log("failure: "+b)}}),d.promise()}});return b});