'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ['*.js', 'routes/**/*.js', 'test/**/*.js', 'lib/**/*.js', 'models/**/*.js', 'admin/**/*.js', 'app/**/*.js']
      },

      options: {
        jshintrc: true,
        ignores: [
          'admin/bootstrap-combobox.js'
        ]
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
    },

    webpack: {
      client: {
        // webpack options
        entry: __dirname + '/app/js/client.js',
        output: {
            path: 'build/',
            filename: 'bundle.js'
        },
        module: {
          loaders: []
        }
      }
    },

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    }

  });

  grunt.registerTask('lint', ['jshint:dev']);
  grunt.registerTask('test', ['simplemocha:dev']);
  grunt.registerTask('build', ['webpack:client', 'copy:html']);
  grunt.registerTask('default', ['lint', 'test']);
};
