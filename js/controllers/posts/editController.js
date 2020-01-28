blogClient.controller('EditController', function($scope, $http, $routeParams, postService, users, tags) {
  $scope.users = users.data;
  $scope.tags = tags.data;

  postService.getPost().then(function (response) {
      $scope.post = response.data;
  })

  $scope.send = function(post) {
    $http({
      method: 'PUT',
      url: 'http://localhost:3000/posts/'+$routeParams.id,
      data: post
    }).then(function successCallback(response) {
      delete $scope.post;
      delete $scope.error;
      window.location.replace('/blog-client/#!/posts');
    }, function errorCallback(response) {
      $scope.error = response.data.title.toString();
      switch($scope.error){
          case 'has already been taken': $scope.error = "Já há um post com esse título"
        }
    });
  }
})