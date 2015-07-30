'use strict' ;
angular.module('firechatApp')
  .controller('RoomCtrl', [ '$scope', '$firebase', 'FBURL', '$modal', '$log', 'roomService' , function($scope, $firebase, FBURL, $modal , $log, roomService){

  // Rooms.all()
  //  .success(function(data){
   //  $scope.rooms = data;
  //   });

  $scope.open = function (size) {
    console.log('in open function');
    //open a modal window to create a new room
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/views/modalcontent.html',
      controller: function($scope, $modalInstance, roomService){
       $scope.ok = function () {
        roomService.addnewroom($scope.newroom);
         $modalInstance.close($scope.newroom);


  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

      },
      size: size,
      resolve: {
        newroom: function () {
          return $scope.newroom;
        }
      }
    });

     modalInstance.result.then(function (selectedItem) {
      $scope.newroom = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);