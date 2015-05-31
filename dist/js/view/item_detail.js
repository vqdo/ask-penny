define([
  'vendor/tpl!../../templates/item_detail.html', 
  'model/item',
  'app',
  'facebook'], function (template, Item) {
  var ItemDetailPanel = Backbone.View.extend({
    events: {
      'click .delete-btn' : 'deleteToParse',
      'click .update-btn' : 'updateToParse'
    },
    template: template,

    initialize: function(options) {
      // optional ctor
      Parse.initialize("pgIVxlWiJTswWbYnHqclimNwHZwdShkL48VmHZ8G", "Km1O6v0inoToEdisAMV80HoxEKIMwMUB3Yt5G1TG");
      this.options = options;
      this.model = new Item(options.dbID);
      var self = this;
      this.model.fetch(options.itemId).then(function() {
        console.log(this)
        self.render();
      });
      this.model.on('change', this.render, this);

      var uniqueId = this.options.itemId;
        //prase init
      // var object = Parse.getById(uniqueId);
    },

    deleteToParse: function(evt) {
      var self = this;
      evt.preventDefault();
      console.log(evt);
      console.log('Deleting to parse!');
      this.model.del(self.options.itemId).then(function() {
        console.log(this);
        window.location.replace('#/dashboard/stack/' + self.options.pageId);
      });
    },

    updateToParse: function(evt) {
      var self = this;
      evt.preventDefault();
      console.log(evt);
      console.log('Updating to parse!');
      this.model.update(self.options.itemId).then(function() {
        console.log(this);
        window.location.replace('#/dashboard/stack/' + self.options.pageId);
      });
    },

    render: function() {
      // this.model.attributes.name
      if (!$.isEmptyObject(this.model.attributes)) {
        console.log(this.model.attributes);
        this.$el.html(this.template(this.model.attributes));
      }
      

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
  });                 

  return ItemDetailPanel;
});