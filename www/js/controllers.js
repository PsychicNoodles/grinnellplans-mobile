angular.module('grinnellplans-mobile.controllers', ['grinnellplans-mobile.factories', 'ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, PlansFactory, $ionicLoading, $location) {
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    PlansFactory.login($scope.loginData.username, $scope.loginData.password)
    .then(function() {
      $scope.closeLogin();
      $ionicLoading.hide();
    });
    $ionicLoading.show({
      template: 'Logging in...'
    });
  };

  $scope.loggedIn = PlansFactory.loggedIn;

  $scope.logout = PlansFactory.logout;

  $scope.selected = function(href) {
    return $location.path() == ('/app/' + href);
  }
})

// Controller for all plan content.
.controller('PlanCtrl', function($scope, $stateParams, PlansFactory) {
  $scope.username = null;
  $scope.loginName = PlansFactory.username;
})

// Controller for the My Plan view.
.controller('MyPlanCtrl', function($scope, $ionicModal) {
  $scope.testChanges = null;

  $scope.edit = function() {
    $ionicModal.fromTemplateUrl('templates/editplan.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      modal.show();
    });
  }

  $scope.discard = function() {
    $scope.modal.remove();
  }
  $scope.username = 'tester'
})

// Controller for other plan views.
.controller('ReadPlanCtrl', function($scope, $stateParams) {
  $scope.username = $stateParams.username
})

.controller('SearchCtrl', function($scope) {

})

// Controller for the auto finger list.
.controller('AutoFingerListCtrl', function($scope) {

})

// Controller for app options.
.controller('OptionsCtrl', function($scope) {

});
