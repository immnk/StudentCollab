angular.module('codaglobal.controllers')
.controller('MenuCtrl', ['$scope', '$state', '$rootScope',
  function($scope, $state, rootScope){
    init();

    function init(){
      console.log('Menu is initializing...');
      rootScope.menuClick = false;
    }

    $scope.pushMenu = function(){
    	console.log('menu clicked...');
    	rootScope.menuClick = !rootScope.menuClick;
    }

}]);