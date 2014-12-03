angular.module('ionicApp', ['ngResource'])

.factory('Cricket', function ($resource) {
         return $resource('http://localhost:5000/crickets/:cricketId');
});