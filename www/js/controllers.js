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

  $scope.menuItems = [
    { href: 'plan/my', text: 'My Plan' },
    { href: 'autofingerlist', text: 'Auto-Finger List' },
    { href: 'plan/read', text: 'Read a List' }
  ];

  $scope.selected = function(href) {
    return $location.path() == ('/app/' + href);
  }
})

// Controller for all plan content.
.controller('PlanCtrl', function($scope) {
})

// Controller for the My Plan view.
.controller('MyPlanCtrl', function($scope) {
  $scope.editing = false;
})

// Controller for other plan views.
.controller('ReadPlanCtrl', function($scope) {

})

// Controller for the auto finger list.
.controller('AutoFingerListCtrl', function($scope) {

})

// Controller for app options.
.controller('OptionsCtrl', function($scope) {

});
