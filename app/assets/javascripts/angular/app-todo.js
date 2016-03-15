var myApp = angular.module('todo', [
  'ngRoute',
  'ngResource',
  'Devise',
  'flash'
]);

myApp.config(['$routeProvider', '$httpProvider', '$locationProvider',
  function($routeProvider, $httpProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/users/sign_in', {
    templateUrl: '/templates/devise/index.html',
    controller: 'deviseController'
  });
  $routeProvider.when('/projects', {
    templateUrl: '/templates/projects/index.html',
    controller: 'projectsController'
  });
  $routeProvider.when('/projects/:id', {
    templateUrl: '/templates/projects/show.html',
    controller: 'projectsShowCtrl'
  });
  $routeProvider.when('/todos', {
    templateUrl: '/templates/todos/index.html',
    controller: 'todoCtrl'
  });
  $routeProvider.when('/', {
    templateUrl: '/templates/dashboard/index.html',
    controller: 'dashboardController'
  });
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);

myApp.factory('Role', ['$resource',function($resource){
 return $resource('/roles.json', {},{
   all: { method: 'GET', isArray: true }
 })
}]);

myApp.factory('User', ['$resource',function($resource){
 return $resource('/users.json', {},{
   all: { method: 'GET', isArray: true }
 })
}]);

myApp.factory('DashUser', ['$resource',function($resource){
 return $resource('/dashboard.json', {},{
   users: { method: 'GET', isArray: true },
   projects: { method: 'POST', isArray: true }
 })
}]);

myApp.factory('Projects', ['$resource',function($resource){
 return $resource('/projects.json', {},{
   all: { method: 'GET', isArray: true },
   create: { method: 'POST' }
 })
}]);

myApp.factory('Project', ['$resource',function($resource){
 return $resource('/projects/:id.json', {},{
   show: { method: 'GET', params:{ id: '@id' } },
   destroy: { method: 'DELETE', params:{ id: '@id' } }
 })
}]);

myApp.factory('Todos', ['$resource',function($resource){
 return $resource('/todos.json', {},{
   all: { method: 'GET' },
   create: { method: 'POST' }
 })
}]);

myApp.factory('Todo', ['$resource',function($resource){
 return $resource('/todos/:id.json', {},{
   update: { method: 'PATCH', params:{ id: '@id' } },
   destroy: { method: 'DELETE', params:{ id: '@id' } }
 })
}]);

myApp.directive('capitalizeFirst', function (uppercaseFilter, $parse) {
  return {
    require: 'ngModel',
    scope: {
      ngModel: "="
    },
    link: function (scope, element, attrs, modelCtrl) {
      scope.$watch("ngModel", function () {
        scope.ngModel = scope.ngModel.replace(/^(.)|\s(.)/g, function(v){ return v.toUpperCase( ); });
      });
    }
  };
});
