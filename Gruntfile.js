'use strict';

/**
 * Grunt Module
 */
module.exports = function(grunt) {

  /**
   * Load Grunt plugins
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);  
 
	/**
	 * Configuration
	 */
	grunt.initConfig({
		/**
		 * Get package meta data
		 */
		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Set project object
		 */
		project: {
		  src: {
        root: 'src',
        assets: 'src/assets',
        css: ['<%= project.src.assets %>/scss'],
        js: ['src/js']
      },
      dest: {
        root: 'dist',
        assets: 'dist/assets',
        css: ['<%= project.dest.assets %>/css'],
        js: ['dist/js']
      }
		},		

    /**
     * Sass
     */
    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: true
        },
        files: {
          '<%= project.dest.assets %>/css/style.css': '<%= project.src.css %>/style.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          compass: true
        },
        files: {
          '<%= project.dest.assets %>/css/style.css': '<%= project.src.css %>'
        }
      }
    },    

    /**
     * Watch
     */
    watch: {
      sass: {
        files: '<%= project.src.css %>/{,*/}*.{scss,sass}',
        tasks: ['sass:dev']
      },

      // I think this is buggy, but it kind of works
      includes: {
        files: ['<%= project.src.root %>/**/*.html'],
        tasks: ['includes:build']        
      }
    },   


    // Build the site using grunt-includes
    includes: {
      build: {
        cwd: 'src',
        src: [ '*.html', 'pages/{,*/}*.html', 'tests/{,*/}*.html' ],
        dest: 'dist/',
        options: {
          flatten: true,
          includePath: 'src/layout',
          banner: '<!-- Spring 2015 - CSE 134B -->\n'
        }
      }
    }

  });

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'sass:dev',
    //'includes',
    'watch'
  ]);

  grunt.loadNpmTasks('grunt-includes');  
};
