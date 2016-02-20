Grinnell Plan Mobile
===

This is an [Ionic](http://ionicframework.com) based mobile app project for [Grinnell Plans](http://grinnellplans.com). This is, for now, purely a fun side project that solves an existing problem, namely a mobile interface to Plans.

To run, do the following:

* Install the necessary build toolchain
```bash
$ npm install -g ionic cordova
```

* Either build for a platform or serve it as a web project locally
```bash
# build for Android
$ ionic build android
$ ionic emulate android
# build for iOS
$ ionic build ios
$ ionic emulate ios
# serve locally
$ ionic serve
```

## (Currently) Supported Platforms
* iOS
* Android
* browser

## Current Goals
* display a plan (including links) in a readable fashion
* display a list of plans in a concise fashion
* display an editable interface to a plan in a clean fashion
* ~~come up with more synonyms for readable~~
* build out options
* add notifications for planlove
* allow styling
* add silly easter eggs/references
* add more functionality to the Plans JSON api/enable CORS
