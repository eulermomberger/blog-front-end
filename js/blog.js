var blogClient = angular.module('blogClient',["ngRoute"]);

blogClient.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/blog-client/views/posts.html",
      controller: 'BlogController'
    })
    .when("/posts", {
      templateUrl: "/blog-client/views/posts.html",
      controller: 'BlogController'
    })
    .when("/post/:id", {
      templateUrl: "/blog-client/views/show.html",
      controller: 'ShowController'
    })
    .when("/posts/new", {
      templateUrl: "/blog-client/views/form.html",
      controller: 'BlogController'
    })
    .when("/post/edit/:id", {
      templateUrl: "/blog-client/views/form.html",
      controller: 'BlogController'
    })
});

blogClient.controller('BlogController', ['$scope', '$http', function($scope, $http) {
  $scope.posts = [];
  $scope.tags = [];
  $scope.users = [];

  $scope.getPosts = function() {
  	$http({
  		method: 'GET',
  		url: 'http://localhost:3000/posts',
  	}).then(function successCallback(response) {
  		$scope.posts = response.data;
  	})
  }

  $scope.postPost = function(post) {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/posts',
      data: post
    }).then(function successCallback(response) {
      delete $scope.post
      window.location.replace('/blog-client/#!/posts');
    })
  };

  $scope.getTags = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/tags'
    }).then(function successCallback(response) {
      $scope.tags = response.data;
    })
  }

  $scope.getUsers = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/users'
    }).then(function successCallback(response){
      $scope.users = response.data;
    })
  }

  $scope.deletePost = function (id) {
    let option = confirm('Deseja realmente deletar esse post?');
    if(option) {
      $http({
        method: 'DELETE',
        url: 'http://localhost:3000/posts/'+id
      }).then(function successCallback(response) {
        window.location.replace('/blog-client/#!/posts');
        $scope.getPosts();
      })
    }
    else {
      window.location.replace('/blog-client/#!/posts');
    }
  }

  $scope.getPosts();
  $scope.getTags();
  $scope.getUsers();

}]);

blogClient.controller('ShowController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $scope.post = [];

  $scope.getPost = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/posts/'+$routeParams.id
    }).then(function successCallback(response) {
      $scope.post = response.data;
    })
  }

  $scope.postComment = function (comment, id, comment_id) {
    if(!comment_id)
      var url = 'http://localhost:3000/posts/'+id+'/comments';
    else
      var url = 'http://localhost:3000/posts/'+id+'/comments/'+comment_id+'/comments';
    $http({
      method: 'POST',
      url: url,
      data: comment
    }).then(function successCallback(response) {
      delete $scope.text;
      $scope.getPost();
      $scope.commentForm.$setPristine();
    })
  }

  $scope.deleteComment = function (post_id, comment_id) {
    let option = confirm('Deseja realmente deletar esse comentário?');
    if(option) {
      $http({
        method: 'DELETE',
        url: 'http://localhost:3000/posts/'+post_id+'/comments/'+comment_id
      }).then(function successCallback(response) {
        window.location.replace('/blog-client/#!/post/'+post_id);
        $scope.getPost();
      })
    }
    else {
      window.location.replace('/blog-client/#!/post/'+post_id);
    }
  }

  $scope.getPost();
}])