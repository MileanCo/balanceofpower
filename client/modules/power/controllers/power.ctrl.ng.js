'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('app.power') // TO-DO: ONLY ADD CHARTS.JS HERE & MODULARIZE
  .controller('PowerCtrl', ['$scope', '$rootScope', '$meteor', function ($scope, $rootScope, $meteor) {

    $scope.loading = true;
    $scope.countries = [];
    // List for Checkboxes of countries to use
    $scope.countriesInvolved = [];

    // Subscriptions
    var subscription = $meteor.subscribe('countries');
    subscription.then(function() {
      $scope.countries = $meteor.collection(Countries);
      // Done loading when records processed
      $scope.loading=false;

      // Make list for Checkboxes (ng-repeat)
      for (var i = 0; i < $scope.countries.length; i++) {
          var c = $scope.countries[i];
          $scope.countriesInvolved.push({use:false, name: c.Faction});
      }

    });


  }]);
