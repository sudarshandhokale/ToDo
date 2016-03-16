var app = angular.module('todo');
app.controller('todoController', ['$scope', '$route', 'Todos', 'Flash',
  function($scope, $route, Todos, Flash){
    $scope.todo = { summary: '', user_id: '' };

    $scope.createTodo = function(project_id){
      $scope.todo['project_id'] = project_id;
      if ($scope.todo.user_id != undefined){
        $scope.todo.user_id = $scope.todo.user_id.id;
      }
      Todos.create({ todo: $scope.todo }, function(){
        var msg = 'Todo added successfully';
        Flash.create('success', msg, 'custom-class');
        $route.reload();
      }, function(error){
        angular.forEach(error.data, function(errors, key) {
          angular.forEach(errors, function(e) {
            $scope.todoForm[key].$dirty = true;
            $scope.todoForm[key].$setValidity(e, false);
          });
        });
      });
    }

    $scope.errorClass = function(name) {
      var s = $scope.todoForm[name];
      return s.$invalid && s.$dirty ? 'has-error' : '';
    };

    $scope.errorField = function(name) {
      var s = $scope.todoForm[name];
      return s.$invalid && s.$dirty ? true : false;
    };

    $scope.errorMessage = function(name) {
      result = [];
      angular.forEach($scope.todoForm[name].$error, function(key, value) {
        result.push(value);
      });
      return result.join(", ");
    };
}]);

app.controller('todoCtrl', ['$scope', '$route', 'Todos', 'Todo',
  function($scope, $route, Todos, Todo){
    $scope.todos = Todos.all();

    $scope.changeStatus = function(todo, type){
      if(type == 'progress'){
        todo.new = false;
        todo.done = false;
      } else if (type == 'done'){
        todo.new = false;
        todo.in_progress = false;
      }else {
        todo.in_progress = false;
        todo.done = false;
      }
      if (todo.new || todo.in_progress || todo.done){
        Todo.update(todo, function(){
          $route.reload();
        }, function(error){
          console.log(error);
        });
      }else{
        $route.reload();
      }
    };
}]);
