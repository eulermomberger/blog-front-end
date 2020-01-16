var blogClient = angular.module('blogClient',[]);

blogClient.controller('BlogController', ['$scope', '$http', function($scope, $http) {
  $scope.posts = [];

  $scope.getPosts = function() {
  	$http({
  		method: 'GET',
  		url: 'http://localhost:3000/posts',
  	}).then(function successCallback(response) {
  		$scope.posts = response.data;
  	})
  }

  $scope.getPosts();

}]);