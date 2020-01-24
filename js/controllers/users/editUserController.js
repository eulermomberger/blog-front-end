blogClient.controller('EditUserController', function ($scope, $http, $routeParams) {
	$scope.method = "PUT";

	$scope.user = [];

	function getUser(){
		$http.get('http://localhost:3000/users/'+$routeParams.id)
		.then(function successCallback(response) {
        	$scope.user = response.data;
  		})	
	}

	$scope.updateUser = function(user) {
		$http.put('http://localhost:3000/users/'+$routeParams.id, user)
		.then(function successCallback(response) {
      		delete $scope.user;
      		delete $scope.error;
      		window.location.replace('/blog-client/#!/users');
		}, function errorCallback(response) {
      		console.log(response)
    	});
	}

	getUser();
})