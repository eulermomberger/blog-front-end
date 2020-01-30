blogClient.controller('UsersController', function ($scope, $http, $localStorage, $location, userService) {
	$scope.user = [];

	function getUser() {
		if($localStorage.currentUser) {
			userService.getUser($localStorage.currentUser.id)
			.then(function successCallback(response) {
				$scope.user = response.data;
			})
		}
	}

	getUser();

	$scope.deleteUser = function (id){
		let option = confirm('Deseja realmente deletar esse usuário? (Isso excluirá todos os posts e comentários vinculados)');
		if(option) {
			$http.delete('http://localhost:3000/users/'+id)
      		.then(function successCallback(response) {
        		
      		})
		}
	}

	$scope.logout = function() {
		let option = confirm("Deseja realmente sair?")
		if (option) {
  			delete $localStorage.currentUser;
      		$http.defaults.headers.common.Authorization = '';
      		$location.url('/login');
  		}
    }
})