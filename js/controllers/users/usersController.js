blogClient.controller('UsersController', function ($scope, $http, users) {
	$scope.users = users.data;

	$scope.deleteUser = function (id){
		let option = confirm('Deseja realmente deletar esse usuário? (Isso excluirá todos os posts e comentários vinculados)');
		if(option) {
			$http.delete('http://localhost:3000/users/'+id)
      		.then(function successCallback(response) {
        		function find(element) {
					return element.id != id
				}
				var filtered = $scope.users.filter(find)
				$scope.users = filtered;
      		})
		}
	}
})