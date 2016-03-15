var app = angular.module('todo');
app.controller('dashboardController', ['$scope', '$location', 'DashUser',
  function($scope, $location, DashUser){
    $scope.admin = gon.admin;
    $scope.developer = gon.developer;
    $scope.users = DashUser.users();
    $scope.projects = DashUser.projects();
}]);