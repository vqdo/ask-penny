# Ask Penny

<<<<<<< HEAD
## How to Run

Run locally: npm install, npm start, and go to localhost:8080

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
- **Parse** - BaaS
- **Quandl** - Stock price data
- **Facebook Login** - Keeps track of users
- **Grunt** - Helps with development.

## Development Notes

### CRUD + Backend
We chose to use Parse to handle the backend of our app. When a user wants to add an item we create a Bullion object and add the appropriate attributes to it (metal_type, quantity, premium, etc) and send it to Parse. We append the unique object IDs to url path in order to identify the object from the backend when we need to read, update, or delete it. 

### Fetch current and historical price of gold
As suggested we used Quandl to obtain the spot prices of gold, silver, and platinum. Specifically we used the Wall Street Journal's precious metal data. We set the time range from the current day to 30 days before. We use the most recent data for the spot price, and use the rest of the datapoints for the graphs to track the changes. 

### User log in
We are using Facebook login to keep track of users. We associate their Facebook loginid with their bullion items so we know only to retrieve their items for display in their collection and to prevent them from accessing/modifying other user's items. 
