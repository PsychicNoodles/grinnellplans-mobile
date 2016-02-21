angular.module('grinnellplans-mobile', ['ionic', 'grinnellplans-mobile.controllers', 'grinnellplans-mobile.factories'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // Parent menu view. Holds all other views.
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  // Base plan content view. Handles features like styling and links.
  // All child views add footer content.
  .state('app.plan', {
    url: '/plan',
    abstract: true,
    views: {
      'menuContent': {
        templateUrl: 'templates/plan.html',
        controller: 'PlanCtrl'
      }
    }
    // resolve: {
    //   username: ['$stateParams', function($stateParams) {
    //     return $stateParams.username;
    //   }]
    // }
  })

  // Special nav content for My Plan with specific features (ie. editing).
  // TODO: disallow access when not logged in
  .state('app.plan.self', {
    url: '/self',
    views: {
      'navContent': {
        templateUrl: 'templates/plan.my.html',
        controller: 'MyPlanCtrl'
      }
    }
  })

  // General nav content for reading other plans with specific features
  // (ie. add to auto finger list).
  .state('app.plan.read', {
    url: '/read/:username',
    views: {
      'navContent': {
        templateUrl: 'templates/plan.read.html',
        controller: 'ReadPlanCtrl'
      }
    }
  })

  .state('app.autofingerlist', {
    url: '/autofingerlist',
    views: {
      'menuContent': {
        templateUrl: 'templates/autofingerlist.html',
        controller: 'AutoFingerListCtrl'
      }
    }
  })

  .state('app.search', {
    url: '/search/:str',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('app.options', {
    url: '/options',
    views: {
      'menuContent': {
        templateUrl: 'templates/options.html',
        controller: 'OptionsCtrl'
      }
    }
  });

  // Should probably eventually be the front page of Plans. Will be switched
  // once the format for that api page is determined.
  $urlRouterProvider.otherwise('/app/plan/my');
});

// All requests to the actual Grinnell Plans api must be mocked since
// Access-Control-Allow-Origin header is not set, preventing all XMLHttpRequests.
// All requests that should go to the Grinnell Plans api return samples taken
// on 2/18.
angular.module('grinnellplans-mobile-dev', ['grinnellplans-mobile', 'ngMockE2E'])
.run(function($httpBackend) {
  // For logins.
  $httpBackend.whenPOST('https://www.grinnellplans.com/api/1/?task=login').respond(function() {
    return [200, '{"message":"","success":true,"autofingerList":[{"level":"1","usernames":["barattat17"]},{"level":"2","usernames":["martinr"]},{"level":"3","usernames":["stone"]}]}',
    {'Set-Cookie': 'PHPSESSID=something; path=/, pe=reallylongstring; expires=Sat, 20-Feb-2016 05:38:24 GMT; path=/; domain=grinnellplans.com; httponly, ps=mediumlengthstring; expires=Sat, 20-Feb-2016 05:38:24 GMT; path=/; domain=grinnellplans.com; httponly'},
    'OK'];
  });
  // For autofingerlist.
  $httpBackend.whenGET('https://www.grinnellplans.com/api/1/?task=autofingerlist')
  .respond('{"message":"","success":true,"autofingerList":[{"level":"1","usernames":["barattat17"]},{"level":"2","usernames":["martinr"]},{"level":"3","usernames":["stone"]}]}');
  // For read.
  $httpBackend.whenPOST('https://www.grinnellplans.com/api/1/?task=read')
  .respond('{"message":"","success":true,"plandata":{"username":"birnbaum","last_login":"2\\/18\\/16, 10:23 PM","last_updated":"2\\/19\\/16, 10:12 AM","pseudo":"","partial":false,"plan":"<p class=\\"sub\\">Mattori Lee Birnbaum, class of 2019\\r<br>intended Computer Science major, East Asian Studies concentration\\r<br>917 414 4285\\r<br>https:\\/\\/www.linkedin.com\\/in\\/mattori-birnbaum-221451a3\\r<br>Github: PsychicNoodles\\r<br>Steam (currently used infrequently): PsychicNoodles\\r<br>Battle.net: PsychicNoodl#1744\\r<br>[<a href=\\"read.php?searchname=appdev\\" class=\\"planlove\\">appdev<\\/a>]\\r<br>he\\/him\\/his\\r<br>\\r<br>2\\/19\\/2016\\r<br>Bubble tea time in the Chinese house later. Hopefully my conversational Chinese is not too awful.\\r<br>\\r<br>[<a href=\\"read.php?searchname=bown\\" class=\\"planlove\\">bown<\\/a>] I figured there was a group already on a mobile app, though I\'m not certain where to find them, but I mostly wanted a good excuse to toy around with Ionic. Not dead set on necessarily using it or doing my own thing.\\r<br>\\r<br>===\\r<br>\\r<br>2\\/18\\/2016\\r<br>I\'ve never been able to maintain anything resembling a blog before, but I\'ve wanted to try writing things regularly anyway so I\'ll try my best to share non-mundane on-goings.\\r<br>\\r<br>Also, shoutout to [<a href=\\"read.php?searchname=martinr\\" class=\\"planlove\\">martinr<\\/a>] for getting me on here, and cheers to [<a href=\\"read.php?searchname=dixonpet\\" class=\\"planlove\\">dixonpet<\\/a>], [<a href=\\"read.php?searchname=hallpell\\" class=\\"planlove\\">hallpell<\\/a>], and [<a href=\\"read.php?searchname=stone\\" class=\\"planlove\\">stone<\\/a>] for the welcomes! [<a href=\\"read.php?searchname=martinr\\" class=\\"planlove\\">martinr<\\/a>] also had the idea for a Plans mobile app which I\'ve decided to play around with instead of just playing video games (or studying).\\r<br>\\r<br>I\'ve decided to use Ionic (http:\\/\\/ionicframework.com), a JS framework for hybrid mobile web apps, because it seems neat and the project is simple enough, at least in theory, that a hybrid mobile web app is probably fine. If it were bigger it might get slow or overly complicated, but since it\'s kinda a glorified CSS re-work as I don\'t intend to really add much other than notifications (maybe) I think it\'s safe to choose the fun, weird path. Feel free to reach out if you want to help\\/advise\\/explain why this is a bad idea. I\'ll throw it on Github once I have some semi-significant progress.\\r<br>\\r<br>===\\r<br>\\r<br>2\\/17\\/2016\\r<br>Does having a plan as a first year make me cool?<\\/p>"}}')
  // because ngMockE2E unfortunately does not allow passThrough() by default, so
  // every template page must be manually allowed.
  var routes = ['templates/playlist.html', 'templates/playlists.html', 'templates/browse.html', 'templates/search.html', 'templates/menu.html', 'templates/login.html', 'templates/plan.html', 'templates/plan.my.html', 'templates/plan.read.html', 'templates/autofingerlist.html', 'templates/options.html', 'templates/editplan.html'];
  for(var i in routes) {
    $httpBackend.whenGET(routes[i]).passThrough();
  }
});
