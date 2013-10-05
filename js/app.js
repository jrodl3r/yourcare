/*global angular*/
// ==========================================================================
// YourCare App Module
// ==========================================================================

var YC_App = angular.module('YC_App', ['ngRoute']);

YC_App.config( function( $routeProvider ) {

  $routeProvider.when( '/home',
      {
        templateUrl : 'partials/home.html',
        controller  : 'MainController'
      })
    .when( '/health',
      {
        templateUrl : 'partials/health.html',
        controller  : 'MainController'
      })
    .when( '/goals',
      {
        templateUrl : 'partials/goals.html',
        controller  : 'MainController'
      })
    .when( '/calendar',
      {
        templateUrl : 'partials/calendar.html',
        controller  : 'MainController'
      })
    .when( '/community',
      {
        templateUrl : 'partials/community.html',
        controller  : 'MainController'
      })
    .otherwise({ redirectTo: '/home' });
});

YC_App.controller('MainController', function( /* $scope */ ) {
  // TODO
});

YC_App.controller('NavController', function( $scope, $location ) {
    $scope.isActive = function( route ) {
      return route === $location.path();
    };
    $scope.isNotActive = function( route ) {
      return route !== $location.path();
    };
});
