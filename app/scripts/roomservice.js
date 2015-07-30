'use strict' ;
// angular.module('firechatApp')
//   .factory('Rooms' , ['$firebase' , 'FBURL',  function RoomFactory($firebase, FBURL){

//   var ref = new Firebase(FBURL);
//   //var rooms = $firebase(ref.child('rooms')).$asArray();

//   return {
//     all: function(){
//       return rooms;
//     }
//   }
// }])

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

// myApp.controller('firstController', ['$scope', 'myService',
//     function firstController($scope, myService) {

//         var setData = function (data) {
//             myService.setData(data);
//         }

//     }
// ]);

// myApp.controller('secondController', ['$scope', 'myService',
//     function secondController($scope, myService) {

//         myService..registerVisitor(this);

//         this.visit = function () {
//             $scope.data = myService.getData();
//         }

//         $scope.data = myService.getData();
//     }
// ]);