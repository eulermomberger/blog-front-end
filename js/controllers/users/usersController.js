blogClient.controller('UsersController', function ($scope, $http, usersService) {
	$scope.users = [];

	function getUsers() {
		usersService.getUsers().then(function (response) {
			$scope.users = response.data;
		})
	}

	$scope.deleteUser = function (id){
		let option = confirm('Deseja realmente deletar esse usuário? (Isso excluirá todos os posts e comentários vinculados)');
		if(option) {
			$http.delete('http://localhost:3000/users/'+id)
      		.then(function successCallback(response) {
        		window.location.replace('/blog-client/#!/users');
        		getUsers();
      		})
		} else {
			window.location.replace('/blog-client/#!/users');
		}
	}

	getUsers();
})