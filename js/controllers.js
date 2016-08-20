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
	}else if ( cred.username == "smita" && cred.password == "pass"){
		$state.go("profile");
	}else if ( cred.username == "fahim" && cred.password == "pass"){
		$state.go("profile");
	}
	else{
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
   
.controller('profileCtrl', ['$scope', '$stateParams', '$ionicModal', 'UserService', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, UserService) {

		// Initialize the modal view.
	$ionicModal.fromTemplateUrl('give-feedback.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	UserService.getuser($stateParams._id).then(function(user){
		$scope.user = user;
	});

	$scope.giveFeedback = function(user){
		$scope.modal.show();
	}

	$scope.search = function(str){
		UserService.search(str.str);
	}

	$scope.saveFeedback = function(feedback){

	}

}])
   
.controller('adminAddUserCtrl', ['$scope', '$state', '$stateParams', 'UserService', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, UserService) {

	UserService.initDB();

	$scope.addUser = function(user){
		UserService.adduser(user);
		$state.go('adminListOfUsers')
	}

}])
   
.controller('adminListOfUsersCtrl', ['$scope', '$stateParams', '$ionicModal', 'UserService', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, UserService) {

	// Initialize the modal view.
	$ionicModal.fromTemplateUrl('edit-user.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	UserService.initDB();

	UserService.getdata().then(function(users) {
		$scope.users = users;
	});

	$scope.editUser = function(user){
		$scope.user = user;
		$scope.modal.show();
	}

	$scope.saveUser = function(user){
		UserService.updateuser(user);
		$scope.modal.hide();
	}

	$scope.deleteUser = function(user){
		UserService.deleteuser(user);
		$scope.modal.hide();
	}

}])
   
.controller('administratorCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 