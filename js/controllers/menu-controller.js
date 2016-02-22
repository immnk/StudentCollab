// angular.module('studentcollab.controllers')
app.components.controller('MenuCtrl', ['$scope', '$rootScope',
  function($scope, rootScope){
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