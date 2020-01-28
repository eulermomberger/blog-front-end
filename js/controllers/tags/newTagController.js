blogClient.controller('NewTagController', function ($scope, $http) {
	
	$scope.postTag = function(tag) {
		$http.post('http://localhost:3000/tags', tag)
		.then(function successCallback(response) {
      		delete $scope.tag;
      		delete $scope.error;
      		window.location.replace('/blog-client/#!/tags');
		}, function errorCallback(response) {
      		$scope.error = response.data.title.toString();
      		switch($scope.error){
    			case 'has already been taken': $scope.error = "Já há uma tag com esse nome"
      		}
    	});
	}
})