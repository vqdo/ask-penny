define(
  ['vendor/tpl!/templates/bullion/current_value.html', 
  'model/bulliontype', 
  'canvasjs'], 
  function (template, BullionType) {
  var BullionGraph = Backbone.View.extend({
    template: template,
    id: "current-value-" + this.cid,

    initialize: function(options) {
      this.options = options || {};      
      this.model = this.model || new BullionType();

      if(this.options.bullionType) 
        this.model.set('bullionType', options.bullionType);

      this.model.fetch();      
      this.model.on('change', this.render, this);
    },

    render: function() {
      var addDecoration = function(value) {
        return ((+value > 0)? '+' : '-') + value + '%';
      }
      
      if(this.model) {
        var attr = this.model.attributes;
        attr.changeOverall = addDecoration(attr.changeOverall);
        attr.changeDaily = attr.changeDaily && addDecoration(attr.changeDaily);        
      
        attr.valueBoxWidth = (attr.changeDaily)? 'col-xs-6' : 'col-xs-12';
      }


      this.$el.html(this.template(this.model.attributes));
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