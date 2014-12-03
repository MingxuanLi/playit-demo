// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'ionicApp', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    console.log("Started playit-demo");
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	db = $cordovaSQLite.openDB({name: "playit.demo"});
	$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS cricket (tournament_id integer primary key, tournament_name text, status text, tournament_type text, date_start text, date_end text, total_teams integer)");
	console.log("The DB playit.demo created for this demo");
  });
})

.config(function($stateProvider, $urlRouterProvider) {
	openFB.init({appId: '600280400117203'});

  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

	.state('app.profile', {
  url: "/profile",
  views: {
      'menuContent' :{
          templateUrl: "templates/profile.html",
          controller: "ProfileCtrl"
      }
  }
})

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.crickets', {
      url: "/crickets",
      views: {
        'menuContent' :{
          templateUrl: "templates/crickets.html",
          controller: 'CricketsCtrl'
        }
      }
    })

    .state('app.cricket', {
        url: "/crickets/:cricketId",
        views: {
          'menuContent' :{
            templateUrl: "templates/cricket.html",
            controller: 'CricketCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/crickets');
});

