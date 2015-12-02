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
    var self = {};
    $scope.loading = true;
    $scope.data = {
      type : "Power Sum",
    }

    $scope.headers = ['Country', 'Resources', 'Military', 'Population', 'Ally Strength', 'Power Sum'];
    $scope.countries = [];

    // Subscriptions
    self.subscription = $meteor.subscribe('countries');
    self.subscription.then(function() {
      var countries = $meteor.collection(Countries);
      // Process ALL RECORDS in local DB
      $scope.updateCountries( countries );
      // Done loading when records processed
      $scope.loading=false;
    });


    // update the chart with new shit
    $scope.updateCountries = function (countries) {
      console.log("update countries!");
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
            c.PowerSum = self._format_variable (c.PowerSum);
            c.Resources = self._format_variable (c.Resources);
            c.Military = self._format_variable (c.Military);
            c.Population = self._format_variable (c.Population);
            c.AllyStrength = self._format_variable (c.AllyStrength);

            // add to data array
            $scope.pie.data.push(c.PowerSum);
          }
      }
      // Set countries to available within scope
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
            c.PowerSum = self._random_change(c.PowerSum);
            c.Resources = self._random_change(c.Resources);
            c.Military = self._random_change(c.Military);
            c.Population = self._random_change(c.Population);

            // add to data array
            new_data.push(c.PowerSum);
          }
      }
      $scope.pie.data = new_data;
    }

    self._format_variable = function (v) {
      // convert to float
      v = parseFloat(v);// * 10.0;
      v = parseFloat(v.toFixed(2));
      return v;
    }

    self._random_change= function (v) {
      // increase power by 10 for visual effect
      var min = -0.2;
      var max = 0.2;
      // If value less than 5, put them back in the game
      if (v < 6.0) max = max * 2;
      // if value GREATER than 29, reduce power
      if (v > 30.0) min = min * 3;

      // and the formula is:
      var random = Math.random() * (max - min) + min;
      console.log("----");
      console.log(v);
      console.log(random);
      v = v*(1+random);
      console.log(v);
      return parseFloat(v.toFixed(2));
    }

    $scope.toggle = function () {
      $scope.pie.type = $scope.pie.type === 'Pie' ?
        'PolarArea' : 'Pie';
    };

}]);
