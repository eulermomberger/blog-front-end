blogClient.controller('TagsController', function($scope, $http, tagsService) {
	$scope.tags = [];

	function getTags() {
		tagsService.getTags().then(function (response) {
			$scope.tags = response.data;
		})
	}

	$scope.deleteTag = function(id) {
		let option = confirm('Deseja realmente deletar essa tag?');
		if(option) {
      		$http.delete('http://localhost:3000/tags/'+id)
      		.then(function successCallback(response) {
        		window.location.replace('/blog-client/#!/tags');
        		getTags();
      		})
    	} else {
      		window.location.replace('/blog-client/#!/tags');
    	}
	}

	getTags();
})