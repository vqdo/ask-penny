# Coin & Bullion Investing App

## Team 
Andrew Wilson, Danny Hsiung, Eric Fonseca, Victoria Do, Nate Bradbury

## Requirements

**Ruby** and gems Compass and SASS.

**NodeJS**. 

## Setting up the project
1. Install [Ruby](https://www.ruby-lang.org/en/). If you have a Mac, you probably already have Ruby.
1. Install the Compass and SASS gems.

	```
	$ gem update system
	$ gem install sass
	$ gem install compass
	```

1. Install [NodeJS](https://nodejs.org/download/).
2. Clone the respository. 
3. Go to the root directory and type 

	```
    $ npm install
    $ npm start
    ```

4. Open your browser and navigate to **localhost:8080**. 
5. You should see a basic webpage.

## Updating the project
1. Open the site in your browser.
2. Type

	```
	$ grunt
	```

3. Go to the src/ directory and make changes. Refresh the site to see changes.

## Making Changes

### SASS
SASS is a [CSS extension language](http://sass-lang.com). We're using SCSS, so you can write it exactly the same way as regular CSS. You can also take advantage of its great features such as variables, mixins, functions, etc. 

### Folders
3. Go to the src/ directory and make changes. Refresh the site to see changes.

### SASS
style.scss concatenates all the CSS files together.

If you're not sure, add CSS to breakpoints/_base.scss

### HTML
Partials (reusable blocks) go in src/layout. Pages to in pages/, except for index.html
