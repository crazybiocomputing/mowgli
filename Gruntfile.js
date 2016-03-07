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
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    jsdoc : {
        dist : {
            src: ['src/**/*.js','src/**/README.md'],
            options: {
                configure: 'doc/jsdoc/config.json',
                destination: 'gh-pages/doc'
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
