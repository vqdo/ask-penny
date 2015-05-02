define(['vendor/tpl!/templates/bullion/spot_overview.html', 'model/bulliontypes'], function (template, BullionTypes) {
  var SpotOverview = Backbone.View.extend({
    template: template,

    initialize: function() {
      this.collection = this.collection || new BullionTypes();

      this.collection.fetch();      
      this.collection.on('change', this.render, this);
    },

    render: function() {
      //this.template = template(this.collection.toJSON());   
      //this.$el.append(this.template(this.collection.toJSON()));
      _.each(this.collection.attributes, function(item) {
        //console.log(template(JSON.stringify(item)));
        //template(item);
        this.$el.append(template(item));
      }, this);
      console.log(this.$el);

      return this;
    },

    close: function() {
      this.remove();
      this.unbind();

      if(this.collection) {
        this.collection.unbind("change", this.collectionChanged);
      }
    }    
  });                 

  return SpotOverview;
});