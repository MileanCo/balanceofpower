angular.module("app.core").run(function ($rootScope, $state, $window ) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === 'AUTH_REQUIRED') {
      $state.go('core.home');
    }
  });
  var SITENAME = "Balance of Power";

  // Set page title in rootscope
  $rootScope.page = {
        setTitle: function(title) {
            this.title = SITENAME + " - " + title ;
        }
  }
  // Change Title on stateChangeSuccess
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      // Change title
      if ($state.current.data) {
        $rootScope.page.setTitle($state.current.data.pageTitle );
      } else {
        $rootScope.page.setTitle(""); // no title if none specified
      }
      // Scroll to top of page on refresh
      $window.scrollTo(0, 0);
  });
});

angular.module("app.core")
    //take all whitespace out of string
    .filter('nospace', function () {
      return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
      };
    })
    //replace uppercase to regular case
    .filter('humanizeDoc', function () {
      return function (doc) {
        if (!doc) return;
        if (doc.type === 'directive') {
          return doc.name.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
          });
        }

        return doc.label || doc.name;
      };
    });

angular.module("app.core").config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  //
/**  $ocLazyLoad.load({
      name:'arank',
      files:[
        'client/modules/core/main.ctrl.ng.js'
      ]
  });
*/


  $stateProvider
    .state('core', {
      templateUrl: 'client/modules/core/views/main.ng.html',
      controller: 'SidemenuCtrl as vm',
    })
    .state('core.home', {
      url: '/',
      templateUrl: 'client/modules/core/views/home.ng.html',
      data : { pageTitle: 'Home' },
      //controller: 'LoginCtrl',
    })

    // FORMS
    .state('core.power', {
      url:'/power',
      controller: 'PowerCtrl',
      data : { pageTitle: 'Forms' },
      templateUrl: 'client/modules/power/views/power.ng.html',
    })
      .state('core.power.start', {
        url:'/start',
        data : { pageTitle: 'Middle East' },
        templateUrl: 'client/modules/power/views/start.ng.html',
      })
      .state('core.power.results', {
        url:'/results',
        controller: "ResultsCtrl",
        data : { pageTitle: 'Results' },
        templateUrl: 'client/modules/power/views/results.ng.html',
      })


    // DASHBOARD /////// /////// //////// //////////
    .state('core.dashboard', {
      url: '/dashboard',
      templateUrl: 'client/modules/dashboard/views/dashboard.ng.html',
      controller: 'DashboardCtrl',
      data: {
        pageTitle: 'Dashboard',
        'selectedTab': -1,
      },
      resolve: {
        "currentUser": function($meteor){
          // Resolves the promise successfully if a user is authenticated and rejects otherwise.
          return $meteor.requireUser();
        }
      }
    })
        .state('core.dashboard.profile', {
          url: '/profile',
          templateUrl: 'client/modules/dashboard/views/profile.ng.html',
          data: {
            pageTitle: 'Dashboard',
            'selectedTab': 0,
          },
        })
        .state('core.dashboard.instances', {
          url: '/instances',
          templateUrl: 'client/modules/dashboard/views/instances.ng.html',
          data: {
            pageTitle: 'Dashboard',
            'selectedTab': 1,
          },
        })
        .state('core.dashboard.mytimes', {
          url: '/mytimes',
          templateUrl: 'client/modules/dashboard/views/mytimes.ng.html',
          data: {
            pageTitle: 'Dashboard',
            'selectedTab': 2,
          },
        })


    // AUTH /////// /////// //////// //////////
    .state('core.login', {
      url: '/login',
      templateUrl: 'client/modules/auth/views/login.ng.html',
      controller: 'LoginCtrl',
      data : { pageTitle: 'Login' },
      controllerAs: 'lc'
    })
    .state('core.register',{
      url: '/register',
      templateUrl: 'client/modules/auth/views/register.ng.html',
      controller: 'RegisterCtrl',
      data : { pageTitle: 'Register' },
      controllerAs: 'rc'
    })
    .state('core.resetpw', {
      url: '/resetpw',
      templateUrl: 'client/modules/auth/views/reset-password.ng.html',
      controller: 'ResetCtrl',
      data : { pageTitle: 'Reset Password' },
      controllerAs: 'rpc'
    })
    .state('core.logout', {
      url: '/logout',
      resolve: {
        "logout": function($meteor, $state) {
          return $meteor.logout().then(function(){
            $state.go('core.home');
          }, function(err){
            console.log('logout error - ', err);
          });
        }
      }
    });
  // SHOULD GO TO 404
  $urlRouterProvider.otherwise("/home");
});
