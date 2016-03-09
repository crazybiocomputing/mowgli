module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
            src:  'javascripts/<%= pkg.name %>.js',
            dest: 'javascripts/<%= pkg.name %>.min.js'
        }
    },
    concat: {
        dist: {
            src: ['src/**/*.js'],
            dest: 'javascripts/<%= pkg.name %>.js'
        }
    },
   jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        browser:true,
        strict:false,
        globals: {
            jQuery: false,
            console: true,
            module: true
        }
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true,
          data : function(dest, src) {
            // Return an object of data to pass to templates
            return require('./views/json/navbar.json');
          }
        },
        files: {
          './mowgli.html': './views/mowgli.jade'
        }
      }
    }
  });
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  // Default and other tasks.
  grunt.registerTask('default',['concat','uglify']);
  grunt.registerTask('views','Convert Jade templates into html templates', ['jade']);
};

