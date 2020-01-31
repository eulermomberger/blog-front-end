blogClient.controller('NewUserController', function ($scope, $http, $location) {
  document.getElementById("scrollHeader").style.display = "none";

  $scope.action = "Cadastrar";

	$scope.postUser = function(user) {
		$http.post('http://localhost:3000/users',user)
		.then(function successCallback(response) {
  		delete $scope.user;
  		delete $scope.error;
  		$location.url('/login');
		}, function errorCallback(response) {   
      switch(response.data.errors.shift()){
        case "Password confirmation doesn't match Password": $scope.error = "As senhas não combinam!"; break;
        case "Name has already been taken": $scope.error = "Já já um usuário com esse nome!"; break;
        case "Username has already been taken": $scope.error = "Já já um usuário com esse username!"; break;
        case "Email has already been taken": $scope.error = "Já já um usuário com esse email!"; break;
        case "Password is too short (minimum is 6 characters)": $scope.error = "Senha muito curta"; break;
      }
  	});
	}
})