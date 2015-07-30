'use strict' ;

angular.module('firechatApp').service('roomService', function($firebase, FBURL) {

    var ref = new Firebase(FBURL);
    var rooms = $firebase(ref.child('rooms')).$asArray();

    var addnewroom = function (newroom) {
        console.log('in add room service');
        rooms.$add(newroom);
    }

    var getrooms = function () {
        return rooms;
    }

    return {
        addnewroom: addnewroom,
        getrooms: getrooms
    };
})
