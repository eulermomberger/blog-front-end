blogClient.controller('PostsController', function($scope, $http, postsService, tagsService) {
  $scope.posts = [];
  $scope.tags = [];

  getPosts();

  $scope.filter = function(option, value) {
    postsService.getPosts(option, value).then(function(response) {
      $scope.posts = response.data;
    })
    delete $scope.value
  }

  $scope.cancel = function() {
    getPosts();
    delete $scope.option;
    delete $scope.value;
  }

  function getPosts() {
    postsService.getPosts().then(function(response) {
      $scope.posts = response.data;
    })
  }

  tagsService.getTags().then(function (response) {
    $scope.tags = response.data;
  })

  $scope.deletePost = function (id) {
    let option = confirm('Deseja realmente deletar esse post?');
    if(option) {
      $http.delete('http://localhost:3000/posts/'+id)
      .then(function successCallback(response) {
        window.location.replace('/blog-client/#!/posts');
        getPosts();
      })
    }
    else {
      window.location.replace('/blog-client/#!/posts');
    }
  }
});