blogClient.controller('UsersController', function ($scope, $http, users) {
	$scope.users = users.data;

	$scope.deleteUser = function (id){
		let option = confirm('Deseja realmente deletar esse usuário? (Isso excluirá todos os posts e comentários vinculados)');
		if(option) {
			$http.delete('http://localhost:3000/users/'+id)
      		.then(function successCallback(response) {
        		$scope.users = users.data;
      		})
		} else {
			window.location.replace('/blog-client/#!/users');
		}
	}
})