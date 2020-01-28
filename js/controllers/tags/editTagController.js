blogClient.controller('EditTagController', function ($scope, $http, $routeParams) {
	$scope.tag = [];

	function getTag(){
		$http.get('http://localhost:3000/tags/'+$routeParams.id)
		.then(function successCallback(response) {
        	$scope.tag = response.data;
  		})	
	}

	$scope.postTag = function(tag) {
		$http.put('http://localhost:3000/tags/'+$routeParams.id, tag)
		.then(function successCallback(response) {
      		delete $scope.tag;
      		delete $scope.error;
      		window.location.replace('/blog-client/#!/tags');
		}, function errorCallback(response) {
      		$scope.error = response.data.name.toString();
      		switch($scope.error){
          		case 'has already been taken': $scope.error = "Já há uma tag com esse nome!"
        	}
    	});
	}

	getTag();
})