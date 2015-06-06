define(["vendor/tpl!/templates/bullion/graph.html","model/graphdataset","canvasjs"],function(a,b){var c=Backbone.View.extend({template:a,id:"bullion-graph-"+this.cid,initialize:function(a){this.collection=this.collection||new b,this.collection.fetch({success:function(a,b){},error:function(a,b){console.error(b)}}),this.collection.on("change",this.render,this),this.options=a},createCanvasGraph:function(){var a=this.$el;if(this.collection.attributes){var b=[];_.each(this.collection.attributes,function(a){if(!this.options.pageId||this.options.pageId===a.name.toLowerCase()){var c=("gold"===this.options.pageId||"silver"===this.options.pageId||"platinum"===this.options.pageId,{type:"splineArea",showInLegend:!0,lineThickness:2,name:a.name,color:a.color,markerType:"square",dataPoints:[]}),d=this;if(d.options)var e={type:"splineArea",showInLegend:!0,lineThickness:2,name:"Total "+a.name,color:a.color,markerType:"square",dataPoints:[]};_.each(a.dataPoints,function(b){if(c.dataPoints.push({x:new Date(b.x),y:+b.y}),e){var f=_.values(d.options.inventory).reduce(function(b,c){var d=0;return c.attributes.metal===a.name.toLowerCase()&&(d=c.attributes.qty),b+=isNaN(d)?0:d},0);e.dataPoints.push({x:new Date(b.x),y:b.y*f})}}),b.push(c),e&&b.push(e)}},this),a.CanvasJSChart({animationEnabled:!0,axisX:{gridColor:"white",tickColor:"white",valueFormatString:"DD/MMM",labelFontSize:14},toolTip:{shared:!0},axisY:{gridColor:"white",tickColor:"white",labelFontSize:14},legend:{verticalAlign:"top",horixontalAlight:"left"},data:b}),this.canvasGraph=a.CanvasJSChart()}},render:function(){return this.canvasGraph||this.createCanvasGraph(),this.canvasGraph.render(),this},close:function(){this.$el.children().remove(),this.unbind(),this.collection&&this.collection.unbind("change",this.collectionChanged)}});return c});