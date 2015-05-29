define(
  ['vendor/tpl!/templates/bullion/graph.html', 
  'model/bulliontype', 
  'canvasjs'], 
  function (template, BullionType) {
  var BullionGraph = Backbone.View.extend({
    template: template,
    id: "current-value-" + this.cid,

    initialize: function(options) {
      this.model = this.model || new BullionType();

      this.model.fetch({ id: options.id || "gold"});      
      this.model.on('change', this.render, this);

      this.options = options;
    },

    render: function() {

      return this;
    },

    close: function() {
      this.remove();
      this.unbind();

      if(this.model) {
        this.model.unbind("change", this.modelChanged);
      }
    }    
  });                 

  return BullionGraph;
});