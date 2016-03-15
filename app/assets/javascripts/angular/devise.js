var app = angular.module('todo');
app.controller('deviseController', ['$scope', '$location',
  function($scope, $location){
  $scope.signInDiv = true;
  $scope.signUpDiv = false;
  $scope.signInForm = function(){
    $scope.signInDiv = true;
    $scope.signUpDiv = false;
  };
  $scope.signUpForm = function(){
    $scope.signInDiv = false;
    $scope.signUpDiv = true;
  };
}]);

app.controller('signInCtrl', ['Auth', '$scope', '$location', 'Flash', '$window',
  function(Auth, $scope, $location, Flash, $window) {

  this.signIn = function() {
    // Code to use 'angular-devise' component
    Auth.login(this.credentials).then(function(user) {
      $window.location.href = "/";
    }, function(error) {
      Flash.create('danger', error.data.error, 'custom-class');
    });
  }
}]);

app.controller('signUpCtrl', ['Auth', '$scope', '$location', 'Flash', 'Role', '$window',
  function(Auth, $scope, $location, Flash, Role, $window) {
  $scope.roles = Role.all();
  this.signUp = function() {
    // Code to use 'angular-devise' component
    if (this.credentials.role_id != undefined){
      this.credentials.role_id = this.credentials.role_id.id;
    }
    Auth.register(this.credentials).then(function(user) {
      var msg = 'User register Successfully'
      Flash.create('success', msg, 'custom-class');
      $window.location.href = "/";
    }, function(error) {
      angular.forEach(error.data.errors, function(errors, key) {
        angular.forEach(errors, function(e) {
          $scope.registerForm[key].$dirty = true;
          $scope.registerForm[key].$setValidity(e, false);
        });
      });
    });
  };

  $scope.errorClass = function(name) {
    var s = $scope.registerForm[name];
    return s.$invalid && s.$dirty ? 'has-error' : '';
  };

  $scope.errorField = function(name) {
    var s = $scope.registerForm[name];
    return s.$invalid && s.$dirty ? true : false;
  };

  $scope.errorMessage = function(name) {
    result = [];
    angular.forEach($scope.registerForm[name].$error, function(key, value) {
      result.push(value);
    });
    return result.join(", ");
  };
}]);

app.controller('sessionCtrl', ['Auth', '$scope', '$location', '$window',
  function(Auth, $scope, $location, $window) {
  $scope.admin = gon.admin;
  $scope.developer = gon.developer;
  // Check on load if user signed in
  Auth.currentUser().then(function(user) {
    $scope.isAuthenticated = true;
    $scope.user = user;
  }, function(error) {
    $scope.isAuthenticated = false;
  });

  this.logout = function() {
    Auth.logout().then(function(oldUser) {
      $window.location.href = "/";
    }, function(error) {
      console.log(error);
    });
  };
}]);