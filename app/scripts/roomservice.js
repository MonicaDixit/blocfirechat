'use strict' ;
angular.module('firechatApp')
  .factory('Rooms' , ['$firebase' , 'FBURL',  function RoomFactory($firebase, FBURL){

  var ref = new Firebase(FBURL);
  //var rooms = $firebase(ref.child('rooms')).$asArray();

  return {
    all: function(){
      return rooms;
    }
  }
}])