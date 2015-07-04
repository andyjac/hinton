'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');

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
      },

      karma: {
        src: ['test/karma_tests/*test.js'],
        options: {
          globals: {
            angular: true,
            describe: true,
            it: true,
            expect: true,
            before: true,
            after: true,
            beforeEach: true,
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
      },
      karma_test: {
        entry: __dirname + '/test/karma_tests/test_entry.js',
        output: {
          path: 'test/karma_tests/',
          file: 'bundle.js'
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
    },

    karma: {
      test: {
        configFile: 'karma.conf.js'
      }
    },

  });

  grunt.registerTask('lint', ['jshint:server', 'jshint:client', 'jshint:mocha']);
  grunt.registerTask('test', ['simplemocha:dev']);
  grunt.registerTask('build', ['jshint:client', 'webpack:client', 'copy:html']);
  grunt.registerTask('karmatest', ['jshint:karma', 'webpack:karma_test', 'karma:test']);
  grunt.registerTask('default', ['lint', 'test']);
};
