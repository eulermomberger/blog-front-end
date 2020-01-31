blogClient.controller('PostsController', function($scope, $http, $location, postsService, tags, posts) {
  $scope.posts = posts.data;
  $scope.tags = tags.data;

  $scope.filter = function(option, value) {
    postsService.getPosts(option, value).then(function(response) {
      $scope.posts = response.data;
    })
    delete $scope.value
  }

  $scope.cancel = function() {
    $scope.posts = posts.data;
    delete $scope.option;
    delete $scope.value;
  }

  $scope.deletePost = function (id) {
    let option = confirm('Deseja realmente deletar esse post?');
    if(option) {
      $http.delete('http://localhost:3000/posts/'+id)
      .then(function successCallback(response) {
        $scope.posts = posts.data;
        $location.url("/posts")
      })
    }
    else {
      $location.url("/posts")
    }
  }
});