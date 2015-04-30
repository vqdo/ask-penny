requirejs.config({
    //By default load any module IDs from js/
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
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

});