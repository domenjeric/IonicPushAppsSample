/*
* 	author: domenjeric
*   github: https://github.com/domenjeric	
*/
var app = angular.module('PushAppsSample', ['ionic'])

.run(function($ionicPlatform, $rootScope, PushNotification, config, $ionicLoading, $ionicPopup) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});

	$rootScope.registered = (localStorage.getItem("registered") === "true") ? true: false;

	if ($rootScope.registered) {
		$ionicLoading.show({
			template: 'Connecting to PushApps server...'
		});
		$rootScope.status = {};
		//register device on app start
		PushNotification.registerDevice().then(function(pushToken) {
			$ionicLoading.hide();
			$rootScope.status.pushToken = pushToken;
			$rootScope.status.text = "Device is now ready to receive push notifications.";
			$rootScope.registered = true;
		}, function(error) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: "Error",
				template: error
			});

		});
	}
	
	//listener for push notifications - show alert
	document.addEventListener('pushapps.message-received', function(event) {
		var notification = event.notification;
		var alertPopup = $ionicPopup.alert({
			title: "Message",
			template: notification.Message
		});
	});
	
});