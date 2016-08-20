angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('bloodBank', {
    url: '/',
    templateUrl: 'templates/bloodBank.html',
    controller: 'bloodBankCtrl'
  })

  .state('login', {
    url: '/page3',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page4',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('profile', {
    url: '/page5/:_id',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })

  .state('adminAddUser', {
    url: '/page6',
    templateUrl: 'templates/adminAddUser.html',
    controller: 'adminAddUserCtrl'
  })

  .state('adminListOfUsers', {
    url: '/page7',
    templateUrl: 'templates/adminListOfUsers.html',
    controller: 'adminListOfUsersCtrl'
  })

  .state('administrator', {
    url: '/page8',
    templateUrl: 'templates/administrator.html',
    controller: 'administratorCtrl'
  })

$urlRouterProvider.otherwise('/')

  

});