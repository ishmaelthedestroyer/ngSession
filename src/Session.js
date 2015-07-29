angular.module('ngSession', [])
.service('Session', [
  '$log',
  '$rootScope',
  '$cacheFactory',
  function($log, $rootScope, $cacheFactory) {

    /* ==========================================================================
       Internal & scope variables
       ========================================================================== */

    var

      /**
       * prefix for emitted events
       * @type {String}
       */
      prefix = 'session',

      /**
       * cache for storing sessions
       * @type {Object}
       */
      cache = $cacheFactory(prefix);

      /**
       * active session data
       * @type {Object}
       */
      session = null,

      /**
       * specifies whether or not a user is logged in
       * @type {Boolean}
       */
      isAuthenticated = false,

      /**
       * default scope for emitting events
       */
      scope = $rootScope,

      /**
       * log identifier
       * @type {string}
       */
      TAG = 'Session::';

    /* ==========================================================================
       Helper / Private functions
       ========================================================================== */

    /**
     * safe application / emission of a function & event
     * @param emit {String} string to emit
     * @param fn {Function} function to apply
     */
    function update(emit, fn) {
      if (scope.$$phase || scope.$root.$$phase) {
        fn();
      } else {
        scope.$apply(fn);
      }

      if (session) {
        store.set(prefix + ':session', session);
        $log.debug('Cached session.');
      } else {
        store.remove('session:session');
        $log.debug('Removed cached session.', session);
      }

      scope.$emit(prefix + ':' + emit, session);

      if (emit !== 'loaded') {
        return scope.$emit(prefix + ':loaded', session);
      }
    }

    /* ==========================================================================
       Exposed functions
       ========================================================================== */

    /**
     * function exposed during initialization
     * @return {Object}
     */
    this.$get = function() {
      return {
        config: this.config
      };
    };

    /**
     * used to configure the session service
     * @param options {Object} configuration params
     */
    this.config = function(options) {
      if (!options) {
        return false;
      }

      if (options.prefix) prefix = options.prefix;
      if (options.scope) scope = options.scope;

      return options;
    };

    /**
     * checks if the user is logged in
     * @return {Boolean}
     */
    this.isAuthenticated = function() {
      return isAuthenticated;
    };

    /**
     * starts a session with an object reference
     * @param obj
     */
    this.start = function(obj) {
      update('login', function() {
        session = obj;
        isAuthenticated = true;
      });

      return this;
    };

    /**
     * ends a session
     */
    this.end = function() {
      update('logout', function() {
        session = null;
        isAuthenticated = false;
      });

      return this;
    };

    /**
     * used to refresh session from cache
     */
    this.load = function() {
      update('loaded', function() {
        session = store.get(prefix + ':session');

        if (session) {
          isAuthenticated = true;
        }
      });

      return this;
    };

    /**
     * calls `loadSession` with no override
     * @param refresh {Boolean} specifies fresh session should be loaded + ignore cache
     * @returns {*}
     */
    this.get = function(key) {
      return session[key];
    };

    /**
     * stores data in the user's session
     * @param key {String}
     * @param val {*}
     */
    this.set = function(key, val) {
      $log.debug(TAG + 'set', 'Updating ' + key, val);

      update('updated:' + key, function() {
        session[key] = val;
      });

      return this;
    };

    /**
     * stores data in the user's session (multiple keys)
     * @param obj {Object} object whose values to update the session w/
     */
    this.setAll = function(obj) {
      $log.debug(TAG + 'setAll', obj);

      update('updated', function() {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            session[key] = obj[key];
          }
        }
      });

      return this;
    };

    /* ==========================================================================
       Initialization logic
       ========================================================================== */

    return this;
  }
]);