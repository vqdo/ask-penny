# Ask Penny

## Technical Notes
### Frameworks and Libraries
- **BackboneJS** - Front-end framework used for page routing in a single page app architecture and for organizing views. 
    - **Underscore** - Backbone dependency. Underscore templates are used for rendering partial views with Backbone's built-in router.
- **RequireJS** - Loads JS files asynchronously. Useful for separating Backbone views from the actual HTML templates. 
    - **RequireJS/text.js** and **[tpl.js](https://github.com/ZeeAgency/requirejs-tpl)** for integrating Underscore template files. 
- **JQuery** - Used for the CanvasJS plugin, Bootstrap, and general DOM manipulation (not much in HW3). 
- **Bootstrap** - Responsive grid system. The plugin library is included but not used. 

### Other Tools
- **SASS** - Compiles to CSS, with useful functionality like variables and functions.
- **NodeJS** - Web server. 
- **Grunt** - Helps with development.

## Development Notes
- **Optimization**: There is no minification or optimization of code. As a result there are over a dozen JS files included on the HTML page. In a production environment, we would concatenate our application code into one or two files. The initial page load time might be somewhat log. 

### Validation
Unfortunately, since the page elements are added dynamically, it's not easy to validate. We personally validated our site by using a site inspector (disabling interfering extensions) and copy and pasting the code into the W3 validator. 

:( Sorry!!!!

### Backbone Integration
BackboneJS is a front-end MVC framework, which we chose for its native support of single page applications. 

There is a single HTML page (index.html) with a single JS entry point (app.js). We needed to dynamically fetch partial HTML pages from our file server and render them on the page. We decided to separate the JS views from the HTML templates. 