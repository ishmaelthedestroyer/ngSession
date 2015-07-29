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
      Auth: 'dist/Auth.js',
      Session: 'dist/Session.js',
      _module: 'dist/_module.js',
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

      Auth: {
        options: {
          // stripBanners: true
          banner: '',
          footer: '',
        },
        src: (function() {
          var cwd = config.src.dir;

          return files.Auth.map(function(path) {
            return cwd + path;
          });
        })(),
        dest: config.dist.Auth
      },

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

      module: {
        options: {
          // stripBanners: true
          banner: '',
          footer: '',
        },
        src: (function() {
          var cwd = config.src.dir;

          return files._module.map(function(path) {
            return cwd + path;
          });
        })(),
        dest: config.dist._module
      },

      ngSession: {
        options: {
          // stripBanners: true
          separator: '',
          footer: '',
        },
        src: (function() {
          return [
            config.dist.Auth,
            config.dist.Session,
            config.dist._module
          ];
        })(),
        dest: config.dist.ngSession
      }
    },


    /** uglify (javascript minification) config */
    uglify: {
      Auth: {
        options: {},
        files: [
          {
            src: config.dist.Auth,
            dest: (function() {
              var split = config.dist.Auth.split('.');
              split.pop(); // removes `js` extension
              split.push('min'); // adds `min` extension
              split.push('js'); // adds `js` extension

              return split.join('.');
            })()
          }
        ]
      },

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

      module: {
        options: {},
        files: [
          {
            src: config.dist._module,
            dest: (function() {
              var split = config.dist._module.split('.');
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