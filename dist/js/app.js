"use strict";

requirejs.config({
    //By default load any module IDs from js/
    baseUrl: 'js',
    paths: {
        tpl: './vendor/tpl',
        jquery: ['//code.jquery.com/jquery-2.1.4.min'],
        bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone'

    },

    shim: {
        'bootstrap' : ['jquery'],
        'backbone' : {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'underscore' : {
            exports: '_'
        }
    }
});

// Start the main app logic.
define(['backbone'],
function   (Backbone) {

    // Initialize router
    require(['router']);

    var APCtrl = function() {
        this.currentView = null;
        var frame = $('#frame');

        var self = this;

        /**
         * Initialize app view
         */
        this.init = function() {
          if(this.currentView) {
            console.warn("Already initialized!");
            return;
          }

          // for now, always prompt login
          require(['view/loginprompt'], function(LoginPrompt) {
            var prompt = new LoginPrompt({ 
  
            });
          
            prompt.render().$el.appendTo(frame);
            self.currentView = prompt;
          });
        }

        this.changeView = function(View) {
          if(this.currentView) {
            // If already on this screen, ignore call
            if(View.prototype.isPrototypeOf(this.currentView)) {
              return;  
            }

            this.currentView.close();
          }

          this.currentView = new View({
            //el: frame
          });
          this.currentView.render().$el.appendTo(frame);


          //console.log(this.currentView);          
         
        }

        this.getView = function() {
          return this.currentView;
        }

        // this.updateDashboard = function(View) {
        // var wrapper = $('#wrapper');
        //   if(this.currentView) {
        //     // this.currentView.close();
        //   }

        //   // this.currentView = 
        //   var view = new View({
        //     el: wrapper
        //   });
        //   view.render();

        //   // console.log(this.currentView); 
        // }

        this.updateView = function(data) {

        } 
    }

    var controller = new APCtrl();

    return controller;

});