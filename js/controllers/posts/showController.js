blogClient.controller('ShowController', function($scope, $http, $routeParams, $localStorage, postService ) {
  $scope.post = [];

  function getPost() {
    postService.getPost().then(function (response) {
      $scope.post = response.data;
    })
  }

  getPost();

  $scope.postComment = function (comment, id) {
    comment.user_id = $localStorage.currentUser.id
    if(!$routeParams.comment_id)
      var url = 'http://localhost:3000/posts/'+id+'/comments';
    else
      var url = 'http://localhost:3000/posts/'+id+'/comments/'+$routeParams.comment_id+'/comments';
    $http.post(url, comment)
    .then(function successCallback(response) {
      delete $scope.text;
      delete $scope.comment_id;
      $scope.commentForm.$setPristine();
      getPost();
    }, function errorCallback(response) {
        
    });
  }
})