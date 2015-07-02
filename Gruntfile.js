'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    jshint: {
      options: {
        node: true
      },
      server: {
        src: ['*.js', 'routes/**/*.js', 'models/**/*.js', 'controllers/**/*.js', 'lib/**/*.js']
      },
      client: {
        src: ['app/**/*.js'],
        options: {
          globals: {
            angular: true
          }
        }
      },
      mocha: {
        src: ['test/*test.js'],
        options: {
          globals: {
            describe: true,
            it: true,
            before: true,
            beforeEach: true,
            after: true,
            afterEach: true
          }
        }
      }
    },

    simplemocha: {
      dev: {
        src: ['test/**/*.js']
      }
    },

    watch: {
      jshint: {
        files: ['<%= jshint.dev.src %>', '.jshintrc'],
        tasks: ['default']
      },
      client: {
        files: ['./app/**/*.js', './app/**/*.html'],
        tasks: ['build']
      }
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

  grunt.registerTask('lint', ['jshint:server', 'jshint:client', 'jshint:mocha']);
  grunt.registerTask('test', ['simplemocha:dev']);
  grunt.registerTask('build', ['jshint:client', 'webpack:client', 'copy:html']);
  grunt.registerTask('default', ['lint', 'test']);
};
