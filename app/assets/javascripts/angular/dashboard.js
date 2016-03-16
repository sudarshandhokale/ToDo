var app = angular.module('todo');
app.controller('dashboardController', ['$scope', '$location', 'DashUser', 'Projects',
  function($scope, $location, DashUser, Projects){
    $scope.users = DashUser.users();
    $scope.projects = Projects.all();
    $scope.chartObject = {};
    $scope.chartObject.type = "PieChart";
    $scope.chartObject.data = {};

    $scope.chartObject.options = {
      'slices': [{color:'#994499'}, {color:'#E67300'}, {color:'#316395'}]
    };

    $scope.showGraph = function(project){
      $scope.chartObject.options['title'] = project.name + " ==> todo's status";
      $scope.chartObject.data = {"cols": [
          {id: "t", label: "Topping", type: "string"},
          {id: "s", label: "Slices", type: "number"}
      ], "rows": [
          {c: [
              {v: "Done"},
              {v: project.done_todos.length},
          ]},
          {c: [
              {v: "In Progress"},
              {v: project.in_progress_todos.length}
          ]},
          {c: [
              {v: "New"},
              {v: project.new_todos.length},
          ]}
      ]};
    };
}]);