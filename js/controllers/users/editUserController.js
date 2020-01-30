blogClient.controller('EditUserController', function ($scope, $http, $location, $routeParams) {
	$scope.action = "Editar"

	$scope.user = [];

	function getUser(){
		$http.get('http://localhost:3000/users/'+$routeParams.id)
		.then(function successCallback(response) {
        	$scope.user = response.data;
  		})	
	}

	$scope.postUser = function(user) {
		$http.put('http://localhost:3000/users/'+$routeParams.id, user)
		.then(function successCallback(response) {
      		delete $scope.user;
      		delete $scope.error;
      		$location.url('/user');
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

	getUser();
})