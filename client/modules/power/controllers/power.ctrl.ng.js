'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('app.power') // TO-DO: ONLY ADD CHARTS.JS HERE & MODULARIZE
  .controller('PowerCtrl', ['$scope', '$state', '$meteor', function ($scope, $state, $meteor) {
    var self = {};
    $scope.formData = {};
    $scope.loading = true;
    // List for Checkboxes of countries to use
    $scope.countriesInvolved = [];
    $scope.headers = ['Country', 'Resources', 'Military', 'Population', 'Ally Strength', 'Power Sum'];
    $scope.countries = [];
    $scope.data = {
      type : "Power Sum",
    }
    // Chart
    $scope.pie = {};
    $scope.pie.labels = [];
    $scope.pie.data = [];

    // Subscriptions (gets data to/from Database)
    self.subscription = $meteor.subscribe('countries');
    self.subscription.then(function() {
      // Set countries to Minimongo's view of countries
      $scope.countries = $meteor.collection(Countries);

      // Make list for Checkboxes (ng-repeat)
      for (var i = 0; i < $scope.countries.length; i++) {
          var c = $scope.countries[i];
          $scope.countriesInvolved.push({use:false, name: c.Faction});
      }
      // Add some more countries to display
      $scope.countriesInvolved.push({use:false, name: 'Jordan'});
      $scope.countriesInvolved.push({use:false, name: 'Yemen'});
      $scope.countriesInvolved.push({use:false, name: 'Kuwait'});
      $scope.countriesInvolved.push({use:false, name: 'Egypt'});
      $scope.countriesInvolved.push({use:false, name: 'Afghanistan'});
      $scope.countriesInvolved.push({use:false, name: 'Turkey'});

      // Done loading when records processed
      $scope.loading=false;
    });

    // News sources to use
    $scope.news_sources = [
      {use:true, name: 'CNN' },
      {use:false, name: 'MSNBC' },
      {use:false, name: 'ABC News' },
      {use:true, name: 'Fox News' },
      {use:false, name: 'Wall Street Journal' },
      {use:true, name: 'Al Jazeera' },
    ];


    // update the chart with new shit (Per PAGE LOAD)
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
            $scope.pie.data.push(self.getDataTypeToDisplay(c));
          }
      }
      // Set countries to available within scope
      $scope.countries = countries;
      $scope.loading=false;
    }
    // Determine which DataType to display on chart based on data_type picked
    self.getDataTypeToDisplay = function (country) {
      if ($scope.data.type == "Power Sum") {
        return country.PowerSum;
      } else if ($scope.data.type == "Population") {
        return country.Population;
      } else if ($scope.data.type == "Resources") {
        return country.Resources;
      } else if ($scope.data.type == "Ally Strength") {
        return country.AllyStrength;
      } else if ($scope.data.type == "Military") {
        return country.Military;
      }
    }
    // Randomize Countries data in Database
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
            new_data.push(self.getDataTypeToDisplay(c));
          }
      }
      $scope.pie.data = new_data;
    }
    // Format value so it's nice to display
    self._format_variable = function (v) {
      // convert to float
      v = parseFloat(v);// * 10.0;
      v = parseFloat(v.toFixed(2));
      return v;
    }

    // Change value by random percent
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
    // Toggle pie chart to other type
    $scope.toggle = function () {
      $scope.pie.type = $scope.pie.type === 'Pie' ?
        'PolarArea' : 'Pie';
    };

    // function to process the form
    $scope.postResults = function () {
      console.log("Post results!");
      $scope.loading=true;
      var valid_msg = $scope.validateFormData($scope.formData ) ;
      if ( valid_msg.indexOf("yes") > -1) {
        // navigate to next pg
        $state.go("core.power.results");
        $scope.updateCountries($scope.countries);
      } else {
        $scope.loading=false;
        console.log(valid_msg);
      }
    }

    $scope.validateFormData = function (formData ) {
      // validate user input
      return 'yes';
    }

  }]);
