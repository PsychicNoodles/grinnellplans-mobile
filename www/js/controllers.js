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
.controller('PlanCtrl', function($scope, $stateParams, $ionicPopup, PlansFactory, $http, $sanitize) {
  $scope.shared = {}
  $scope.loginName = PlansFactory.username;
  $scope.planData = {};

  $scope.update = function() {
    $http.post('https://www.grinnellplans.com/api/1/?task=read', {
      data: { username: $scope.shared.username }
    }).then(function(res) {
      if(res.data.success) {
        console.log(res.data.plandata)
        $scope.planData = res.data.plandata;
      } else {
        $ionicPopup.alert({
          title: 'Read plan error',
          template: 'Message: ' + res.data.message
        });
      }
    }, function(err) {
      $ionicPopup.alert({
        title: 'Read plan error',
        template: 'Error: ' + err
      })
    });
  };

  $scope.parseBody = function(body) {
    // Change links to use internal search
    if(typeof body !== 'undefined')
      return body.replace(/(<a\b[^>]*href=")read.php\?searchname=([^"]*)"/g, '$1#/app/search/$2"');
  };

  $scope.$watch('$scope.shared.username', function() {
    $scope.update();
  });
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

  // Needed to update every time the view is entered, not just on init.
  $scope.$on('$ionicView.enter', function() {
    $scope.shared.username = 'tester';
  })
})

// Controller for other plan views.
.controller('ReadPlanCtrl', function($scope, $stateParams) {
  // Needed to update every time the view is entered, not just on init.
  $scope.$on('$ionicView.enter', function() {
    $scope.shared.username = $stateParams.username;
  })
})

.controller('SearchCtrl', function($scope, $stateParams) {
  $scope.param = $stateParams.str;
})

// Controller for the auto finger list.
.controller('AutoFingerListCtrl', function($scope) {

})

// Controller for app options.
.controller('OptionsCtrl', function($scope) {

});
