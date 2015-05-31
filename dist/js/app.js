"use strict";

requirejs.config({
    //By default load any module IDs from js/
    baseUrl: 'js',

    paths: {
        tpl: './vendor/tpl',
        text: './vendor/text',   
        fetch_cache: './vendor/fetch-cache.min',
        jquery: ['//code.jquery.com/jquery-2.1.4.min'],
        bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone',
        canvasjs: './vendor/canvas/jquery.canvasjs.min',
        typekit: '//use.typekit.net/ppz4eaa',
        facebook: '//connect.facebook.net/en_US/sdk'
    },

    shim: {
        'bootstrap' : ['jquery'],
        'backbone' : {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'underscore' : {
            exports: '_'
        },
        'canvasjs' : {
            deps: ['jquery']
        },
        'facebook' : {
          exports: 'FB'
        },
        'fetch_cache' : {
          deps: ['backbone', 'underscore']
        }
    }
});

// Start the main app logic.
define(['backbone', 'typekit', 'facebook'],
function   (Backbone) {

    // Initialize typekit
    try{Typekit.load();}catch(e){
      console.err(e);
    }     

    // Initialize router
    require(['router', 'fetch_cache']);

    // window.fbAsyncInit = function() {
      FB.init({
        appId      : '480458555443308',
        xfbml      : true,
        version    : 'v2.3'
      });
    // };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


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
    }

    var controller = new APCtrl(); 

    return controller;

});