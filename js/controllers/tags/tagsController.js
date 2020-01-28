blogClient.controller('TagsController', function($scope, $http, tags) {
	$scope.tags = tags.data;

	$scope.deleteTag = function(id) {
		let option = confirm('Deseja realmente deletar essa tag?');
		if(option) {
      		$http.delete('http://localhost:3000/tags/'+id)
      		.then(function successCallback(response) {
				function find(element) {
					return element.id != id
				}
				var filtered = $scope.tags.filter(find)
				$scope.tags = filtered;
      		})
    	}
	}
})