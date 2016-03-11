module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
    build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    concat: {
      js: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      dist: {
        src: ['src/**/README.md'],
        dest: 'doc/README.md'
      }
    },
    jsdoc : {
        dist : {
            src: ['src/**/*.js','doc/README.md'],
            options: {
                configure: 'doc/jsdoc/config.json',
                destination: 'gh-pages/doc/core/'
            }
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsdoc');
  

  // Default task(s).
  grunt.registerTask('default', ['concat','uglify']);

  // this would be run by typing "grunt doc" on the command line
  grunt.registerTask('doc', ['jsdoc']);

};
