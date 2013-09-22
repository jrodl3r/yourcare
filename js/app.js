/*global angular*/
// ==========================================================================
// YourCare App Module
// ==========================================================================

var YC_App = angular.module('YC_App', ['ngRoute']);

YC_App.config( function( $routeProvider ) {

  $routeProvider
    .when( '/home',
      {
        //controller  : 'MainController',
        templateUrl : 'partials/home.html'
      })
    .when( '/health',
      {
        templateUrl : 'partials/health.html'
      })
    .when( '/goals',
      {
        templateUrl : 'partials/goals.html'
      })
    .when( '/calendar',
      {
        templateUrl : 'partials/calendar.html'
      })
    .when( '/community',
      {
        templateUrl : 'partials/community.html'
      })
    .otherwise({ redirectTo: '/home' });
});

//YC_App.controller( 'MainController', function ( /* $scope */ ) {
  // $scope.views = [
  //   { home   : 'home' },
  //   { health : 'health' }
  // ];
//});
