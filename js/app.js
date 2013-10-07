/*global angular*/
// ==========================================================================
// YourCare App Module
// ==========================================================================

var YC_App = angular.module('YC_App', ['ngRoute']);

YC_App.config( function( $routeProvider ) {

  $routeProvider.when( '/home',
    {
      templateUrl : 'views/home.html',
      controller  : 'AppCtrl'
    })
  .when( '/health',
    {
      templateUrl : 'views/health.html',
      controller  : 'AppCtrl'
    })
  .when( '/goals',
    {
      templateUrl : 'views/goals.html',
      controller  : 'AppCtrl'
    })
  .when( '/calendar',
    {
      templateUrl : 'views/calendar.html',
      controller  : 'AppCtrl'
    })
  .when( '/community',
    {
      templateUrl : 'views/community.html',
      controller  : 'AppCtrl'
    })
  .otherwise({ redirectTo: '/home' });
});

YC_App.controller('AppCtrl', function( /* $scope */ ) {
  // TODO
});

YC_App.controller('NavCtrl', function( $scope, $location ) {
    $scope.isActive = function( route ) {
      return route === $location.path();
    };
    $scope.isNotActive = function( route ) {
      return route !== $location.path();
    };
});
