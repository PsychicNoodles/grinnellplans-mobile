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

  $scope.username = PlansFactory.username;

  $scope.selected = function(href) {
    return $location.path() == ('/app/' + href);
  }
})

// Controller for all plan content.
.controller('PlanReadCtrl', function($scope, $stateParams, $ionicPopup, $ionicModal, $http) {
  $scope.planData = {};

  $scope.update = function() {
    $http.post('https://www.grinnellplans.com/api/1/?task=read', {
      data: { username: $stateParams.username }
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

  $scope.$on('$ionicView.enter', function() {
    $scope.username = $stateParams.username;
    $scope.update();
  })
})

.controller('PlanSearchCtrl', function($scope, $state) {
  $scope.search = function(searchname) {
    // TODO: make a $http.post request to the search endpoint
    $state.go('^.read', { username: searchname });
  }
})

.controller('SearchCtrl', function($scope, $stateParams) {
  $scope.search = function() {
    //$http.post to search endpoint using $scope.searchname
  }
})

// Controller for the auto finger list.
.controller('AutoFingerListCtrl', function($scope) {

})

// Controller for app options.
.controller('OptionsCtrl', function($scope) {

});
