define(["vendor/tpl!/templates/bullion/spot_overview.html","model/bulliontypes","model/inventory","app"],function(a,b,c,d){var e=Backbone.View.extend({template:a,initialize:function(a){this.collection=this.collection||new b,this.collection.fetch(),this.collection.on("change",this.render,this),this.inventory=this.inventory||new c,this.inventory.fetch({},!0).then(function(a){console.log(a)}),this.inventory.on("change",this.render,this),this.options=a},setInventory:function(a){!this.collection.attributes},render:function(a){this.$el.children().remove();var b=d.getSharedVariable("inventory");console.log(b);var c=function(a){return isNaN(a.spot.change)?a.spot.change:(+a.spot.change>0?(a.spot.change="+"+a.spot.change,a.changeIndicatorClass="value-positive"):+a.spot.change<0?a.changeIndicatorClass="value-negative":a.changeIndicatorClass="",a)},e=d.getSharedVariable("spots")||{};return _.each(this.collection.attributes,function(a){if(!this.options.id||a.name===this.options.id){var d=0,f=0;_.each(b[a.name].items,function(a){d+=a.attributes.bullion_ozpu*a.attributes.qty,f+=parseFloat(a.attributes.premium)*a.attributes.qty},this),a.ounces=d||0,a.total=(d*a.spot.bid+f).toFixed(2),e[a.name]=a,a.displayName=this.options.id?"Current Spot":a.name,this.$el.append(this.template(c(a)))}},this),d.setSharedVariable("spots",e),this},close:function(){this.remove(),this.unbind(),this.collection&&this.collection.unbind("change",this.collectionChanged)}});return e});