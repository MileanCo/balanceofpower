'use strict';
/**
 * @ngdoc function
 * @name app.charts.controller:GoogleChartCtrl
 * @description
 * # GoogleChartCtrl
 * Controller of the Google Charts
 */
angular.module('app.power') // TO-DO: ONLY ADD CHARTS.JS HERE & MODULARIZE
  .controller('ResultsCtrl', ['$scope', '$rootScope', '$meteor', function ($scope, $rootScope, $meteor) {

    $scope.loading = true;
    $scope.headers = ['Country', 'Resources', 'Military', 'Population', 'Ally Strength', 'Power Sum'];

    $scope.countries = [];

    // Subscriptions
    var subscription = $meteor.subscribe('countries');
    subscription.then(function() {
      var countries = $meteor.collection(Countries);
      // Process ALL RECORDS in local DB
      $scope.updateCountries( countries );
      // Done loading when records processed
      $scope.loading=false;
    });


    // update the chart with new shit
    $scope.updateCountries = function (countries) {
      // PIE CHART
      $scope.pie = {};
      $scope.pie.labels = [];
      $scope.pie.data = [];
      $scope.pie.type = 'Pie';

      for (var i = 0; i < countries.length; i++) {
          var c = countries[i];
          // insert data
          if (c.PowerSum) {
            $scope.pie.labels.push(c.Faction);

            // format variables
            c.PowerSum = $scope._format_variable (c.PowerSum);
            c.Resources = $scope._format_variable (c.Resources);
            c.Military = $scope._format_variable (c.Military);
            c.Population = $scope._format_variable (c.Population);
            c.AllyStrength = $scope._format_variable (c.AllyStrength);

            // add to data array
            $scope.pie.data.push(c.PowerSum);
          }
      }
      $scope.countries = countries;
      $scope.loading=false;
    }

    $scope.randomizeData = function () {
      // reset data
      var new_data = [];

      for (var i = 0; i < $scope.countries.length; i++) {
          var c = $scope.countries[i];

          // insert data
          if (c.PowerSum) {
            // format variables
            var p = $scope.random_change (c.PowerSum);
            console.log(c.Faction + 'pwersum:');
            console.log(p);

            // add to data array
            new_data.push(p);
          }
      }
      $scope.pie.data = new_data;
    }

    $scope._format_variable = function (v) {
      // increase power by 10 for visual effect
      v = parseFloat(v) * 10.0;
      v = parseFloat(v.toFixed(2));
      return v;
    }

    $scope.random_change = function (v) {
      // increase power by 10 for visual effect
      var min = -0.017;
      var max = 0.016;
      // and the formula is:
      var random = Math.random() * (max - min + 1) + min;
      v = v*(1+random);
      return parseFloat(v.toFixed(2));
    }

    $scope.toggle = function () {
      $scope.pie.type = $scope.pie.type === 'Pie' ?
        'PolarArea' : 'Pie';
    };

}]);
