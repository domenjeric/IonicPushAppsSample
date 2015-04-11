/*
* 	author: domenjeric
*   github: https://github.com/domenjeric	
*/
app.controller('HomeCtrl', function($rootScope, $scope, PushNotification, $ionicLoading, $ionicPopup) {
	//register device on button click
	$scope.registerDevice = function() {
		$ionicLoading.show({
			template: 'Connecting to PushApps server...'
		});
		PushNotification.registerDevice().then(function(pushToken) {
			$scope.status = {};
			$ionicLoading.hide();
			$scope.status.pushToken = pushToken;
			$scope.status.text = "Device is now ready to receive push notifications.";
			localStorage.setItem("registered", "true");
			$rootScope.registered = true;
		}, function(error) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: "Error",
				template: error
			});
		});
	}
	//unregister device on button click
	$scope.unRegisterDevice = function() {
		$ionicLoading.show({
			template: 'Connecting to PushApps server...'
		});
		$scope.status = {};
		PushNotification.unRegisterDevice().then(function(data) {
			$ionicLoading.hide();
			localStorage.removeItem("registered");
			$scope.status.text = "Device unregistered";
		}, function(error) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: "Error",
				template: error
			});
		});
	}

});