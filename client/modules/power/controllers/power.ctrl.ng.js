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
    $scope.data = {
      type : "Power Sum",
    }

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

      $scope.countriesInvolved.push({use:false, name: 'Jordan'});
      $scope.countriesInvolved.push({use:false, name: 'Yemen'});
      $scope.countriesInvolved.push({use:false, name: 'Kuwait'});
      $scope.countriesInvolved.push({use:false, name: 'Egypt'});
      $scope.countriesInvolved.push({use:false, name: 'Afghanistan'});
      $scope.countriesInvolved.push({use:false, name: 'Turkey'});
    });

    $scope.news_sources = [
      {use:true, name: 'CNN' },
      {use:false, name: 'MSNBC' },
      {use:false, name: 'ABC News' },
      {use:true, name: 'Fox News' },
      {use:false, name: 'Wall Street Journal' },
      {use:true, name: 'Al Jazeera' },
    ];

  }]);
