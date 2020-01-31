blogClient.controller('LoginController', function($scope, $http, $location, $localStorage, userService) {
	document.getElementById("scrollHeader").style.display = "none";
	$scope.login = function (user) {
		$http.post('http://localhost:3000/auth/login', user)
		.then(function successCallback(response) {
			$localStorage.currentUser = {
				id: response.data.id,
				username: response.data.username,
				token: response.data.token
			}
			document.getElementById("scrollHeader").style.display = "block";
			$http.defaults.headers.common.Authorization = response.data.token;
			$location.url('/posts');
		}, function errorCallback(response) {
			console.log(response.data)
			$scope.error = response.data.error;
			switch($scope.error){
				case 'user not found': $scope.error = "Usuário não encontrado"; break;
				case 'password incorrect': $scope.error = "Senha incorreta"; break;
			}
		})
	}
})