angular.module('grinnellplans-mobile.factories', [])

.constant('apiUrl', 'https://www.grinnellplans.com/api/1/')
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}])
.factory('PlansFactory', ['apiUrl', '$http', '$log', '$timeout', function(apiUrl, $http, $log, $timeout) {
  loggedIn = false;
  username = null;
  return {
    login: function(username, password) {
      return $http.post(apiUrl, { username: username, password: password }, {
        params: { task: 'login' }
      }).then(function(res) {
        if(res.data.success) loggedIn = true;
        return res;
      }).then(function(res) {
        $log.log(res.data);
        $log.log(res.headers);
        return res;
      });
    },
    logout : function() {
      // need to test if removing from $cookie or something else will delete
      // browser cookies since they aren't managed by JS
      loggedIn = false;
    },
    autoFingerList: function() {

    },
    read: function(username) {

    },
    loggedIn: function() { return loggedIn; },
    username: function() { return username; }
  }
}]);
