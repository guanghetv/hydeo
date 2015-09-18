/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  //$stateProvider
  //.state('Home', {
    //url: '/',
    //controller: 'HomeController as home',
    //templateUrl: 'index.html',
    //title: 'Home'
  //});

  $urlRouterProvider.otherwise('/');
}

module.exports = OnConfig;
