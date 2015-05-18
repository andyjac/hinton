'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ['*.js', 'routes/**/*.js', 'test/**/*.js', 'lib/**/*.js', 'models/**/*.js']
      },

      options: {
        jshintrc: true
      }
    },

    simplemocha: {
      dev: {
        src: ['test/**/*.js']
      }
    },

    watch: {
      files: ['<%= jshint.dev.src %>', '.jshintrc'],
      tasks: ['default']
    }
  });

  grunt.registerTask('lint', ['jshint:dev']);
  grunt.registerTask('test', ['simplemocha:dev']);
  grunt.registerTask('default', ['lint', 'test']);
};
