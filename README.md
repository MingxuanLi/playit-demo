## Quick Start

checkout this project into your local repository, then you can run the project by the following commands:

Install cordova plugins add org.apache.cordova.inappbrowser
Go to the project root folder and install the plugin
```bash
$ cordova plugins add org.apache.cordova.inappbrowser
```

Simulate IOS:
```bash
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
Open conference.xcodeproj in the conference/platforms/ios directory
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
