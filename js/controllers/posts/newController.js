blogClient.controller('NewController', function($scope, $http, $localStorage, tags) {
  $scope.tags = tags.data;

  $scope.send = function(post) {
    post.user_id = $localStorage.currentUser.id;
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