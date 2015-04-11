/*
* 	author: domenjeric
*   github: https://github.com/domenjeric	
*/
app.factory('PushNotification', function($ionicPlatform, $q, config) {
	var ionicReady = $q.defer();

	$ionicPlatform.ready(function(device) {
		ionicReady.resolve(device);
	});


	var pushObj = {
		//register device for push notifications
		registerDevice: function() {
			var deferred = $q.defer();
			ionicReady.promise.then(function(device) {
				//Insert your google project number and pushapps token:
				PushNotification.registerDevice("YOUR_GOOGLE_PROJECT_NUMBER", "PUSHAPPS_APP_TOKEN", function(pushToken) {
					deferred.resolve(pushToken);
				}, function(error) {
					deferred.reject(error);
				});
			});
			return deferred.promise;
		},

		//unregister device
		unRegisterDevice: function() {
			var deferred = $q.defer();
			ionicReady.promise.then(function(device) {
				PushNotification.unRegisterDevice(function() {
					deferred.resolve();
				}, function(error) {
					deferred.reject(error);
				});
			});
			return deferred.promise;
		},


		//get PushApps Device id - read more at https://wiki.pushapps.mobi/pages/viewpage.action?pageId=2785298
		getDeviceId: function() {
			var deferred = $q.defer();
			ionicReady.promise.then(function(device) {
				PushNotification.getDeviceId(function(deviceId) {
						deferred.resolve(deviceId);
					},
					function(error) {
						deferred.reject(error);
					});
			});
			return deferred.promise;
		},

		//set tags - read more at https://wiki.pushapps.mobi/pages/viewpage.action?pageId=2785298
		setTags: function(iden, value) {
			var deferred = $q.defer();
			ionicReady.promise.then(function(device) {
				PushNotification.setTags([{
					identifier: iden,
					value: value
				}], function() {
					deferred.resolve();
				}, function(error) {
					deferred.reject(error);
				});
			});
			return deferred.promise;
		},
		
		//remove tags - read more at https://wiki.pushapps.mobi/pages/viewpage.action?pageId=2785298
		removeTags: function(idens) {
			var deferred = $q.defer();
			ionicReady.promise.then(function(device) {
				PushNotification.removeTags(idens, function() {
					deferred.resolve;
				}, function(error) {
					deferred.reject(error);
				});
			});
			return deferred.promise;
		}
	}

	return pushObj;

})