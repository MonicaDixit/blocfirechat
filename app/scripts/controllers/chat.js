'use strict';
/**
 * @ngdoc function
 * @name blocchatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('firechatApp')
  .controller('ChatCtrl', function ($scope, $timeout, roomService, $cookies, $firebase, FBURL) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10

    //$scope.messages = $firebaseArray(Ref.child('messages').limitToLast(10));
    var ref = new Firebase(FBURL);
    $scope.messages = $firebase(ref.child('messages')).$asArray();

    
    // display any errors
    //$scope.messages.$loaded().catch(alert);

    $scope.rooms = roomService.getrooms();
    $scope.room = '';
    
    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      
      if( newMessage && $cookies.roomid) {
        console.log('room' ,$scope.room);

        // push a message to the end of the array
        var messagerow= {
          sender: $cookies.blocChatCurrentUser,
          roomid: $scope.room.$id,
          roomname: $scope.room.$value,
          text: newMessage,
          sentat: timeTodayDateElse(new Date())
         } 

        $scope.messages.$add(messagerow)
          // display any errors
          .catch();
      }
      else{
        console.log('room in else', $cookies.roomid);
        alert('Please select a room');
        return;
      }
    };

    $scope.setCurrentRoom = function(room){
      $scope.room = room;
      $cookies.roomid = $scope.room.$id;
    }
    
    $scope.exitCurrentRoom = function(){
      $scope.room = '';
    }

    $scope.isCurrentRoomMessage = function(message){
      return (message.roomid === $scope.room.$id);
    }

    function timeTodayDateElse(date){
    moment.locale('en', {
        'calendar' : {
            'lastDay' : 'D MMMM',
             'sameDay' : 'h:mmA',
            'nextDay' : 'D MMMM',
            'lastWeek' : 'D MMMM',
            'nextWeek' : 'D MMMM',
            'sameElse' : 'D MMMM'
       }
    });

    return moment(date).calendar();
}

    // function alert(msg) {
    //   $scope.err = msg;
    //   $timeout(function() {
    //     $scope.err = null;
    //   }, 5000);
    // }
  });