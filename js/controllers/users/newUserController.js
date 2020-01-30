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
  		var nome = ""
      for (var [key, value] of Object.entries(response.data)) {
        $scope.error = value.toString();
        nome = key
      }      
      switch($scope.error){
        case 'has already been taken': $scope.error = "Já há um usuário com esse "+nome;
      }
  	});
	}
})