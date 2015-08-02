'use strict';

/**
 * @ngdoc overview
 * @name firechatApp
 * @description
 * # firechatApp
 *
 * Main module of the application.
 */
angular.module('firechatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.utils',
    'simpleLogin',
    'ui.router',
    'ui.bootstrap',
    'ngCookies'
  ])
  .run(['$cookies', '$modal', 
    function($cookies, $modal){
    if(!$cookies.blocChatCurrentUser || $cookies.blocChatCurrentUser === ''){
        var modalInstance = $modal.open({
          //animation: $scope.animationsEnabled,
          templateUrl: '/views/usermodalcontent.html',
          controller: function($scope, $modalInstance)
          {
              $scope.ok = function ()
               {
                 $cookies.blocChatCurrentUser = $scope.username;
                 $modalInstance.close();
               }

           }
        });
    }
    else{
        console.log('$cookies.blocChatCurrentUser', $cookies.blocChatCurrentUser);
    }

  }]);
