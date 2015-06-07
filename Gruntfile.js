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
          '<%= project.dest.assets %>/css/style.css': '<%= project.src.css %>/style.scss'
        }
      }
    },    

    /**
     * Watch
     */
    watch: {
      sass: {
        files: '<%= project.src.css %>/{,*/}*.{scss,sass}',
        tasks: ['sass:dist']
      },
      copy: {
        files: ['<%= project.src.root %>/**/*.{html,csv}', '<%= project.src.assets %>/images/*', '<%= project.src.js %>/**/*'],
        tasks: ['copy:main']
      }
      // ,jade: {
      //   files: "<%= project.src.root %>/**/*.jade",
      //   tasks: ['jade:compile']
      // }
    },

    uglify: {
      my_target: {
        files: {
          '<%= project.dest.js%>/view/add_item.js' : ['<%= project.src.js%>/view/add_item.js'],
          '<%= project.dest.js%>/view/dash_stack.js' : ['<%= project.src.js%>/view/dash_stack.js'],
          '<%= project.dest.js%>/view/dash_summary.js' : ['<%= project.src.js%>/view/dash_summary.js'],
          '<%= project.dest.js%>/view/dashboard.js' : ['<%= project.src.js%>/view/dashboard.js'],
          '<%= project.dest.js%>/view/item_detail.js' : ['<%= project.src.js%>/view/item_detail.js'],
          '<%= project.dest.js%>/view/loginprompt.js' : ['<%= project.src.js%>/view/loginprompt.js'],
          '<%= project.dest.js%>/view/sidebar.js' : ['<%= project.src.js%>/view/sidebar.js'],
          '<%= project.dest.js%>/view/bullion/current_value.js' : ['<%= project.src.js%>/view/bullion/current_value.js'],
          '<%= project.dest.js%>/view/bullion/graph.js' : ['<%= project.src.js%>/view/bullion/graph.js'],
          '<%= project.dest.js%>/view/bullion/spot_overview.js' : ['<%= project.src.js%>/view/bullion/spot_overview.js'],
          '<%= project.dest.js%>/model/bulliontype.js' : ['<%= project.src.js%>/model/bulliontype.js'],
          '<%= project.dest.js%>/model/bulliontypes.js' : ['<%= project.src.js%>/model/bulliontypes.js'],
          '<%= project.dest.js%>/model/graphdata.js' : ['<%= project.src.js%>/model/graphdata.js'],
          '<%= project.dest.js%>/model/graphdataset.js' : ['<%= project.src.js%>/model/graphdataset.js'],
          '<%= project.dest.js%>/model/inventory.js' : ['<%= project.src.js%>/model/inventory.js'],
          '<%= project.dest.js%>/model/item.js' : ['<%= project.src.js%>/model/item.js'],
          '<%= project.dest.js%>/vendor/text.js' : ['<%= project.src.js%>/vendor/text.js'],
          '<%= project.dest.js%>/vendor/tpl.js' : ['<%= project.src.js%>/vendor/tpl.js'],
          '<%= project.dest.js%>/app.js' : ['<%= project.src.js%>/app.js'],
          '<%= project.dest.js%>/router.js' : ['<%= project.src.js%>/router.js']
        }
      }
    },

    // requirejs: {
    //   compile: {
    //     options: {
    //       baseUrl: "./",
    //       paths: { jquery: ['http://code.jquery.com/jquery-2.1.4.min']},
    //       mainConfigFile: "<%= project.src.js %>/app.js",
    //       name: "<%= project.src.js %>/view/*.js",
    //       // include: "<%= project.src.js.view.bullion %>/*.js",
    //       out: "<%= project.src.js %>/optimized.js"
    //     }
    //   }
    // },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: '<%= project.src.root %>',
            src: ['**/*.js'],
            dest: '<%= project.dest.root %>/'
          },
          {
            cwd: '<%= project.src.root %>',            
            expand: true, 
            src: ['images/*'], 
            dest: '<%= project.dest.assets %>/images'
          },
          {
            cwd: '<%= project.src.root %>',            
            expand: true, 
            src: ['**/*.html'], 
            dest: '<%= project.dest.root %>'
          },
          {
            cwd: '<%= project.src.root %>',            
            expand: true, 
            src: ['data/*'], 
            dest: '<%= project.dest.root %>'
          }          
        ] // end files
      }
    }

    // ,jade: {
    //   compile: {
    //     options: {
    //       pretty: true,
    //       compileDebug: true,
    //       data: function(dest, src) {
    //           return require('./data.json');
    //       }
    //     },
    //     files: [{
    //         cwd: "<%= project.src.root %>",
    //         dest: "<%= project.dest.root %>",
    //         src: ["**/*.jade", "!templates/*"],
    //         expand: true,
    //         ext: ".html"
          
    //     }]
    //   }
    // }

  });

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'sass:dev',
    'copy:main',
    'uglify',
    // 'requirejs',
    //'jade:compile',
    'watch'
  ]);

  grunt.loadNpmTasks('grunt-contrib-copy'); 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-requirejs');
};
