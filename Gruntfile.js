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
      images: {
        files: '<%= project.src.assets %>/images/*',
        tasks: ['copy:main']
      },
      jade: {
        files: "<%= project.src.root %>/**/*.jade",
        tasks: ['jade:compile']
      }
    },   

    copy: {
      main: {
        images: [
          // includes files within path
          {expand: true, src: ['<%= project.src.assets %>/images/*'], dest: '<%= project.dest.assets %>/images'},
        ]
      }
    },

    jade: {
      compile: {
        options: {
          pretty: true,
          compileDebug: true,
          data: function(dest, src) {
            return {
              from: src, 
              to: dest
            }
          }
        },
        files: [{
            cwd: "<%= project.src.root %>",
            dest: "<%= project.dest.root %>",
            src: ["**/*.jade", "!templates/*"],
            expand: true,
            ext: ".html"
          
        }]
      }
    }

  });

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'sass:dev',
    'copy:main',
    'jade:compile',
    'watch'
  ]);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');  
};
