define(['vendor/tpl!../../templates/dash_summary.html', 'view/bullion/spot_overview', 'app'], function (template, SpotOverview) {
  var SummaryPanel = Backbone.View.extend({
    template: template,
    id: "ap-home",
    subviews: {},

    initialize: function() {
      // if(!this.collection) {
      //   this.collection = new BullionTypes();
      //   this.collection.fetch();
      // }

    },

    render: function() {
      this.$el.html(this.template());

      //TODO: Buggy
      if(!this.subviews.spotOverview) {
        this.subviews.spotOverview = new SpotOverview({

        });
        this.subviews.spotOverview.$el
          .appendTo(this.$el.find('#bullion-summaries'));
      } else {
        this.subviews.spotOverview.render();
      }

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

  return SummaryPanel;
});