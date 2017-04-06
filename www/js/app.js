// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}) 

.controller('ListController', function($scope, $http, $state,$ionicPopup){

  $http.get('js/data.json').success(function(data){
      
   $scope.rooms = data;
  
   $scope.whichrooms = $state.params.aId;  
   
  //visa popup för bekräftning
    $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Tack för er bokning!',
     template: 'Välkommen till det lilla hotellet med den stora charmen'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
 };
      
  })
}) 
 //kontroll av tabs
.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
         

      .state('tabs', {
        url : '/tab' ,
        abstract: true,
        templateUrl : 'templates/tabs.html'
      })

      .state('tabs.list', {
        url : '/list:aId',
        views : {
          'list-tab' : {
            templateUrl: 'templates/list.html',
            controller : 'ListController'
          }
        }
      })

      .state('tabs.home', {
        url : '/home',
        views : {
          'home-tab' : {
            templateUrl: 'templates/home.html'
          }
        }
      })
      .state('tabs.detail', {
         url: '/list/:aId', 
         views: { 
           'list-tab' : {
            templateUrl: 'templates/detail.html', 
            controller: 'ListController'
           }
        }
      })
      .state('tabs.reservation',{
        url: '/reservation',
        views:{
          'reservation-tab' : {
           templateUrl: 'templates/reservation.html',
           controller: 'ListController'
          }
        }
      })
      


      $urlRouterProvider.otherwise('/tab/home');
})