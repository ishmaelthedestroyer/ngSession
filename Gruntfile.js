/**
 * configuration for grunt tasks
 * @module Gruntfile
 */

module.exports = function(grunt) {
  /** load tasks */
  require('load-grunt-tasks')(grunt);

  /** config for build paths */
  var config = {
    dist: {
      dir: 'dist/',
      Session: 'dist/Session.js',
      ngSession: 'dist/ngSession.js'
    },
    src: {
      dir: 'src/'
    },
    tmp: {
      dir: 'tmp/'
    }
  };

  /** paths to files */
  var files = {

    /** src files */
    Auth: [
      'Auth.js'
    ],

    /** src files */
    Session: [
      'Session.js'
    ],

    /** src files */
    _module: [
      '_module.js'
    ]
  };

  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */

  /** config for grunt tasks */
  var taskConfig = {

    /** concatentation tasks for building the source files */
    concat: {
      Session: {
        options: {
          // stripBanners: true
          banner: '',
          footer: '',
        },
        src: (function() {
          var cwd = config.src.dir;

          return files.Session.map(function(path) {
            return cwd + path;
          });
        })(),
        dest: config.dist.Session
      },

      ngSession: {
        options: {
          // stripBanners: true
          separator: '',
          footer: '',
        },
        src: (function() {
          return [
            config.dist.Session,
          ];
        })(),
        dest: config.dist.ngSession
      }
    },


    /** uglify (javascript minification) config */
    uglify: {
      Session: {
        options: {},
        files: [
          {
            src: config.dist.Session,
            dest: (function() {
              var split = config.dist.Session.split('.');
              split.pop(); // removes `js` extension
              split.push('min'); // adds `min` extension
              split.push('js'); // adds `js` extension

              return split.join('.');
            })()
          }
        ]
      },

      ngSession: {
        options: {},
        files: [
          {
            src: config.dist.ngSession,
            dest: (function() {
              var split = config.dist.ngSession.split('.');
              split.pop(); // removes `js` extension
              split.push('min'); // adds `min` extension
              split.push('js'); // adds `js` extension

              return split.join('.');
            })()
          }
        ]
      }
    }
  };

  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */

  // register default & custom tasks

  grunt.initConfig(taskConfig);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify'
  ]);

};