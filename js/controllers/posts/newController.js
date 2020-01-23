blogClient.controller('NewController', function($scope, $http, usersService, tagsService) {
  $scope.tags = [];
  $scope.users = [];
  $scope.method = 'POST'
    
  tagsService.getTags().then(function (response) {
    $scope.tags = response.data;
  })

  usersService.getUsers().then(function (response){
    $scope.users = response.data;
  })

  $scope.postPost = function(post) {
    $http.post('http://localhost:3000/posts', post)
    .then(function successCallback(response) {
      delete $scope.post;
      delete $scope.error;
      window.location.replace('/blog-client/#!/posts');
    }, function errorCallback(response) {
      $scope.error = response.data.title.toString();
      switch($scope.error){
        case 'has already been taken': $scope.error = "Já há um post com esse título"
      }
    });
  };

})