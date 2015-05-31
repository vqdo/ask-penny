define([
  'vendor/tpl!../../templates/item_detail.html', 
  'model/item',
  'app'], function (template, Item) {
  var ItemDetailPanel = Backbone.View.extend({
    template: template,

    var object = null;
    initialize: function(options) {
      // optional ctor
      this.options = options;
      this.model = new Item(options.dbID);
      this.model.fetch(options.itemId).then(function() {
        this.render();
      });
      this.model.on('change', this.render, this);

      var uniqueId = this.options.dbID;
        //prase init
        object = parse.getById(uniqueId)
    },

    render: function() {
      // this.model.attributes.name
      this.$el.html(this.template(this.model.attributes));

      //$('.asdasd').
      return this;
    },

    close: function() {
      this.remove();
      this.unbind();
      if(this.model) {
        this.model.unbind("change", this.modelChanged);
      }
    }

    update: funciton() {
      var uniqueId = this.options.dbID;

    }    
  });                 

  return ItemDetailPanel;
});