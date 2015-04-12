## Ionic PushApps push notifications Sample##
A sample mobile app build with [Ionic](http://ionicframework.com/) to demonstrate how to register and receive push notifications with [PushApps](http://www.pushapps.mobi/) service on Android and iOS.

Running sample project
-------
Download project and go to www/js/config.js . Insert in your google project id and PushApps id. 

**Android** <br>
A guide for obtaining Google Project id and PushApps can be found here: [Android getting started](https://wiki.pushapps.mobi/display/PUSHAPPS/Android+Getting+Started). 
After you do that open command line and go to the root of the project. Then execute following command:

    ionic platform add android

**iOS** <br>
A guide for iOS can be found here: [iOS getting started](https://wiki.pushapps.mobi/display/PUSHAPPS/iOS+Getting+Started). 
After you do that open command line and go to the root of the project. Then execute following command:

    ionic platform add ios

If you're supporting iOS, please open the Xcode project you've just created, and add the following code to your AppDelegate.m file:

```objective-c
#import "PushApps.h"
 
#pragma mark - Push Notifications
  
#ifdef __IPHONE_8_0
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
    [[PushAppsManager sharedInstance] didRegisterUserNotificationSettings:notificationSettings];
}
  
- (void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier forRemoteNotification:(NSDictionary *)userInfo completionHandler:(void(^)())completionHandler
{
    [[PushAppsManager sharedInstance] handleActionWithIdentifier:identifier forRemoteNotification:userInfo  
        completionHandler:completionHandler];
}
#endif
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    // Notify PushApps of a successful registration.
    [[PushAppsManager sharedInstance] updatePushToken:deviceToken];
}
  
// Gets called when a remote notification is received while app is in the foreground.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
    [[PushAppsManager sharedInstance] handlePushMessageOnForeground:userInfo];
}
  
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    // keeps you up to date with any errors during push setup.
    [[PushAppsManager sharedInstance] updatePushError:error];
}
```


After that  you can run it. **If you are testing on an emulator - set the target of the emulator to Google APIs. Push notifications will not work on an emulator, you must try them on a real device.**

Commands:

    ionic run android
    ionic run ios


Integrating into your project
=============================

Pre-requisites
-----
This plugins must be installed for push notifications to work properly:

    cordova plugin add org.apache.cordova.device
    cordova plugin add https://github.com/PushAppsService/PushAppsPhonegap.git

I suggest you to add them as a cordova hooks. I've done this in sample project, you can find it here: 
[hooks/before_platform_add/010_install_plugins.js](https://github.com/domenjeric/IonicPushAppsSample/blob/master/hooks/before_platform_add/010_install_plugins.js)


Download  PushNotification.factory.js into your project and link it from your index.html. Open it and insert your google project id and PushApps id. If you are supporting iOS, please take a look at steps mentioned under running sample project/iOS. 


Handle incoming notifications
-------
PushApps will raise an HTML event, every time an incoming notification is received. In order to bind a function to this event, all you need is:
```javascript
document.addEventListener('pushapps.message-received', function(event) {
	var notification = event.notification;
	// This is the entire object, just take the wanted property
	console.log(notification);
});
```


API Usage
-------
**Register device**
```javascript
PushNotification.registerDevice().then(function(pushToken) {
	//Device registered
}, function(error) {
	//error occurred
});
```

**Unregister device**

```javascript
PushNotification.unRegisterDevice().then(function(data) {
	//Device unregistered
}, function(error) {
	//error occurred
});
```

**Get device id**

```javascript
PushNotification.getDeviceId().then(function(deviceId) {
	//do sth...
}, function(error) {
	//error occurred
});
```

**Set tags**

For more tag options look at: [Phonegap API](https://wiki.pushapps.mobi/pages/viewpage.action?pageId=2785298)

```javascript
// Add string tag
var str = document.getElementById("cityNameInput").value;
var iden = "City";

PushNotification.setTags(iden, value).then(function(data) {
	//tag set
}, function(error) {
	//error occurred
});
```

**Remove tags**
```javascript
var idens = [ "Age", "Birthday", "City" ];

PushNotification.removeTags(idens).then(function(data) {
	//tags removed
}, function(error) {
	//error occurred
});
```
