var app = angular.module('todo');
app.controller('projectsController', ['$scope', '$route', 'Projects',
  'Project', 'Flash',
  function($scope, $route, Projects, Project, Flash){
    $scope.newProject = false;
    $scope.projects = Projects.all();

    $scope.addProject = function(){
      $scope.newProject = true;
    }

    $scope.cancelForm = function(){
      $scope.newProject = false;
    };

    $scope.deleteProject = function(id){
      Project.destroy({id: id}, function(){
        var msg = 'Project deleted successfully';
          Flash.create('success', msg, 'custom-class');
        $route.reload();
      }, function(error){
        console.log(error);
      });
    };
}]);

app.controller('newProjectsCtrl', ['$scope', '$route', 'Projects', 'Flash',
  function($scope, $route, Projects, Flash){
    $scope.project = { name: '', description: '' }

    $scope.createProject = function(){
      Projects.create({ project: $scope.project }, function(){
        var msg = 'Project added successfully';
        Flash.create('success', msg, 'custom-class');
        $route.reload();
      }, function(error){
        angular.forEach(error.data, function(errors, key) {
          angular.forEach(errors, function(e) {
            $scope.projectForm[key].$dirty = true;
            $scope.projectForm[key].$setValidity(e, false);
          });
        });
      });
    }

    $scope.errorClass = function(name) {
      var s = $scope.projectForm[name];
      return s.$invalid && s.$dirty ? 'has-error' : '';
    };

    $scope.errorField = function(name) {
      var s = $scope.projectForm[name];
      return s.$invalid && s.$dirty ? true : false;
    };

    $scope.errorMessage = function(name) {
      result = [];
      angular.forEach($scope.projectForm[name].$error, function(key, value) {
        result.push(value);
      });
      return result.join(", ");
    };
}]);

app.controller('projectsShowCtrl', ['$scope', '$route', 'Project', 'Flash',
  '$routeParams', 'User', '$http', 'Todo',
  function($scope, $route, Project, Flash, $routeParams, User, $http, Todo){
    $scope.project = Project.show({ id: $routeParams.id });
    $scope.users = User.all();

    $scope.addDeveloper = function(developer){
      var parameters = { id: $routeParams.id, developer_id: developer.id };
      $http.post('/projects/project_developer.json',
        parameters).then(function(data){
          $route.reload();
      });
    };

    $scope.removeDeveloper = function(devId){
      var parameters = { id: $routeParams.id, developer_id: devId };
      $http.post('/projects/remove_developer.json',
        parameters).then(function(data){
          $route.reload();
      });
    };

    $scope.deleteTodo = function(id){
      Todo.destroy({id: id}, function(){
        var msg = 'Todo deleted successfully';
          Flash.create('success', msg, 'custom-class');
        $route.reload();
      }, function(error){
        console.log(error);
      });
    };
}]);