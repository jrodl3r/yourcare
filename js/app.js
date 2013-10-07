/*global angular*/
// ==========================================================================
// YourCare App Module
// ==========================================================================

var YC_App = angular.module('YC_App', ['ngRoute']);

YC_App.config( function( $routeProvider ) {
  $routeProvider.when( '/home',
    {
      // controller  : 'HomeCtrl',
      templateUrl : 'views/home.html'
    })
  .when( '/health',
    {
      // controller  : 'HealthCtrl',
      templateUrl : 'views/health.html'
    })
  .when( '/goals',
    {
      // controller  : 'GoalsCtrl',
      templateUrl : 'views/goals.html'
    })
  .when( '/calendar',
    {
      // controller  : 'CalCtrl',
      templateUrl : 'views/calendar.html'
    })
  .when( '/community',
    {
      // controller  : 'ComCtrl',
      templateUrl : 'views/community.html'
    })
  .otherwise({ redirectTo: '/home' });
});

YC_App.controller('NavCtrl', function( $scope, $location ) {
  $scope.isActive = function( route ) {
    return route === $location.path();
  };
  $scope.isNotActive = function( route ) {
    return route !== $location.path();
  };
});

// YC_App.controller('HomeCtrl', function( /* $scope */ ) {
//   // TODO
// });

// YC_App.controller('HealthCtrl', function( /* $scope */ ) {
//   // TODO
// });

// YC_App.controller('GoalsCtrl', function( /* $scope */ ) {
//   // TODO
// });

// YC_App.controller('CalCtrl', function( /* $scope */ ) {
//   // TODO
// });

// YC_App.controller('ComCtrl', function( /* $scope */ ) {
//   // TODO
// });
