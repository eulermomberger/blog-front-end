var blogClient = angular.module('blogClient',["ngRoute", 'angularUtils.directives.dirPagination']);

blogClient.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/blog-client/views/posts.html",
      controller: 'PostsController'
    })
    .when("/posts", {
      templateUrl: "/blog-client/views/posts.html",
      controller: 'PostsController',
    })
    .when("/post/:id", {
      templateUrl: "/blog-client/views/show.html",
      controller: 'ShowController'
    })
    .when("/posts/new", {
      templateUrl: "/blog-client/views/form.html",
      controller: 'NewController',
    })
    .when("/post/edit/:id", {
      templateUrl: "/blog-client/views/form.html",
      controller: 'EditController'
    })
});

blogClient.service('postsService', function($http, $routeParams){
  this.getPosts = function(option, value) {
    switch(option) {
      case 'tag' : return $http.get('http://localhost:3000/posts/?tag='+value);
      case 'title': return $http.get('http://localhost:3000/posts/?title='+value);
      case 'description': return $http.get('http://localhost:3000/posts/?description='+value);
      case 'comment': return $http.get('http://localhost:3000/posts/?comment='+value);
    }
    return $http.get('http://localhost:3000/posts');   
  }
})

blogClient.service('postService', function($http, $routeParams){
  this.getPost = function() {
    return $http.get('http://localhost:3000/posts/'+$routeParams.id);
  }
})

blogClient.service('usersService', function($http) {
  this.getUsers = function() {
    return $http.get('http://localhost:3000/users');
  }
})

blogClient.service('tagsService', function($http) {
  this.getTags = function() {
    return $http.get('http://localhost:3000/tags');
  }
})

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

blogClient.controller('EditController', function($scope, $http, $routeParams, postService, usersService, tagsService) {
  $scope.method = 'PUT';

  postService.getPost().then(function (response) {
      $scope.post = response.data;
  })

  usersService.getUsers().then(function (response){
    $scope.users = response.data;
  })

  tagsService.getTags().then(function (response) {
    $scope.tags = response.data;
  })

  $scope.editPost = function(post) {
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