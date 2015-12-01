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

    // Subscriptions
    var subscription = $meteor.subscribe('countries');
    subscription.then(function() {
      $scope.countries = $meteor.collection(Countries);
      // Done loading when records processed
      $scope.loading=false;
    });


  }]);
