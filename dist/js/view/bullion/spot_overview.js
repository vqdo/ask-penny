define(["vendor/tpl!/templates/bullion/spot_overview.html","model/bulliontypes","model/inventory","app"],function(a,b,c,d){var e=Backbone.View.extend({template:a,initialize:function(a){this.collection=this.collection||new b,this.collection.fetch(),this.collection.on("change",this.render,this),this.inventory=this.inventory||new c,this.inventory.fetch({},!0).then(function(a){console.log(a)}),this.inventory.on("change",this.render,this),this.options=a},setInventory:function(a){!this.collection.attributes},render:function(a){this.$el.children().remove();var b=d.getSharedVariable("inventory");console.log(b);var c=function(a){return isNaN(a.spot.change)?a.spot.change:(+a.spot.change>0?(a.spot.change="+"+a.spot.change,a.changeIndicatorClass="value-positive"):+a.spot.change<0?a.changeIndicatorClass="value-negative":a.changeIndicatorClass="",a)},e=d.getSharedVariable("spots")||{};return _.each(this.collection.attributes,function(a){if(this.options.id){if(a.name!==this.options.id)return;a.name="Current Spot"}a.ounces=b[a.name].count||0,a.total=(a.ounces*a.spot.bid/.95).toFixed(2),e[a.name]=a,this.$el.append(this.template(c(a)))},this),d.setSharedVariable("spots",e),this},close:function(){this.remove(),this.unbind(),this.collection&&this.collection.unbind("change",this.collectionChanged)}});return e});