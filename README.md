## Quick Start

checkout this project into your local repository, then you can run the project by the following commands:

Install cordova plugins 
Go to the project root folder and install the plugins
```bash
$ cordova plugins add org.apache.cordova.device
$ cordova plugins add com.ionic.keyboard
$ cordova plugins add org.apache.cordova.console
$ cordova plugins add org.apache.cordova.inappbrowser
$ cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git
```

Simulate IOS:
```bash
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
Open playit-demo.xcodeproj in the playit-demo/platforms/ios directory
In Xcode, run the application on a device connected to your computer or in the iOS emulator
```

Simulate or run Android:
```bash
$ ionic platform add android
$ ionic build android
$ ionic emulate android
$ ionic run android
```

## User Manual

- The default page is Crickets, which lists 10 cricket tournaments, you can click each one to view the details
- Then click the menu toggle icon on the top left, you can toggle between different tabs
- Facebook login: click 'LogIn' tab and log into Facebook, then you can go to 'Profile' to see your picture and name
