blogClient.controller('ShowController', function($scope, $http, $routeParams, postService, usersService ) {
  $scope.post = [];

  function getPost() {
    postService.getPost().then(function (response) {
      $scope.post = response.data;
    })
  }

  usersService.getUsers().then(function (response){
    $scope.users = response.data;
  })
 
  $scope.postComment = function (comment, id, comment_id) {
    if(!comment_id)
      var url = 'http://localhost:3000/posts/'+id+'/comments';
    else
      var url = 'http://localhost:3000/posts/'+id+'/comments/'+comment_id+'/comments';
    $http.post(url, comment)
    .then(function successCallback(response) {
      delete $scope.text;
      delete $scope.comment_id;
      getPost();
      $scope.commentForm.$setPristine();
    }, function errorCallback(response) {
        
    });
  }

  $scope.respond = function (comment_id) {
    document.getElementById('comment').focus();
    $scope.comment_id = comment_id;
  }

  $scope.deleteComment = function (post_id, comment_id) {
    let option = confirm('Deseja realmente deletar esse comentário?');
    if(option) {
      $http.delete('http://localhost:3000/posts/'+post_id+'/comments/'+comment_id)
      .then(function successCallback(response) {
        window.location.replace('/blog-client/#!/post/'+post_id);
        getPost();
      })
    }
    else {
      window.location.replace('/blog-client/#!/post/'+post_id);
    }
  }

  getPost();
})