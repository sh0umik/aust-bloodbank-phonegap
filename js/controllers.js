angular.module('app.controllers', [])
  
.controller('bloodBankCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope', '$state', '$stateParams', '$ionicPopover', 'UserService', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $ionicPopover, UserService) {

 // .fromTemplate() method
  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Message</h1> </ion-header-bar> <ion-content> {{ message }} </ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

	$scope.openPopover = function($event, cred) {
	if ( cred.username == "admin" && cred.password == "admin"){
		$state.go("administrator");
	}else{
		$scope.message = "Not valid info"
		$scope.popover.show($event);
	}

  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('profileCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('adminAddUserCtrl', ['$scope', '$stateParams', 'UserService', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UserService) {

	UserService.initDB();

	$scope.addUser = function(user){
		UserService.adduser(user);
	}

}])
   
.controller('adminListOfUsersCtrl', ['$scope', '$stateParams', 'UserService', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UserService) {

	UserService.initDB();

	$scope.users = UserService.getdata();
}])
   
.controller('administratorCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 